H.add('widget~RandomBox', function( HLG ) { 	
	var S = KISSY;
	    var $ = S.all,
		Event = S.Event;
		var DefaultCfg = {
				rollTimes:4,
				cls:"sel-item",
				duration:40,
				speedSteps:[1,2,5],
				probability :[]
			};
		
		function RandomBox(cfg,callback){
			var self = this;
				if(!(self instanceof RandomBox)){	//确保this指向RandomBox实例
					return new RandomBox();
				}
				//合并配置
				self.config = S.mix(DefaultCfg,cfg);				
				//id 数组
				self.list = self.config.list;
				//dom数量
				self.domNum = self.list.length;
				//旋转圈数
				self.rollTimes = self.config.rollTimes;
				//样式类名
				self.cls = self.config.cls;
				//其实索引
				self.beginIndex = 0;
				//正常速度
				self.duration = self.config.duration;
				//速度倍率
				self.speedSteps = self.config.speedSteps;
				//初始化
				self._init();
				//定义回调函数
				self.callback = typeof callback == "function" ? callback : undefined;
		}
		
		S.augment(RandomBox,{
			_init:function(){
				var self = this,
					domNum = self.domNum;
				
				self.$domList = [];
				
				self.curRollTimes = 0;
				//构建对象数组
				for(var i = 0; i < domNum; i++){
					self.$domList[i] = $(self.list[i]);
				}
				//获取变化次数
				self.changeTimes = domNum *  self.rollTimes;
				if(self.config.finalId){
					self.finalId = self.config.finalId;
					self.finalNum = self.changeTimes + self.indexOfArray(self.list,self.finalId)+1;
				}else{
					self.finalNum = 1000000
				}
				
				

			},
			//控制旋转		
			rolling:function(){
				var self = this;
				
				self.choose(self.$domList[self.beginIndex % self.domNum]);	
				
				self.beginIndex += 1;

				//每次选择节点控制一次
				self.start();	
				
				if(self.beginIndex == self.finalNum){
					self._clearInterval();
					//调用回调函数
					self.callback(self.curTarget);
				}
			},
			//设置定时器
			_setInterval:function(duration){
				var self = this;
				self.interval = setInterval(function(){self.rolling();}, duration);
			},
			//清除定时器
			_clearInterval:function(){
				var self = this;
				 clearInterval(self.interval);
			},
			/**
			 * TODO 控制旋转速度
			 * @returns
			 */
			start:function(){
				var self = this,
					duration = self.duration,
					speedSteps = self.speedSteps;
				//停止旋转
				self.stop();
				if(self.beginIndex < self.finalNum){								
					if(self.beginIndex > self.finalNum - 10){
						self._setInterval(duration * speedSteps[2]);
					}
					else if(self.beginIndex <= self.finalNum - 10 && self.beginIndex >= self.finalNum - 20){
						self._setInterval(duration * speedSteps[1]);
					}else{
						self._setInterval(duration * speedSteps[0]);
					}
				}
			},
			stop:function(){
				var self = this;
				self._clearInterval();
				
			},
			/**
			 * TODO 重置
			 * @returns
			 */
			reset:function(){
				var self = this,
					$domList = self.$domList,
					domNum = self.domNum,
					cls = self.cls;
					//停止
					self.stop();
					self.beginIndex = 0;
					self._init();
					//样式重置
					for(var i = 0,len = domNum;i<len;i++){
						$domList[i].hasClass(cls) ? $domList[i].removeClass(cls) : null;
					}
			},
			/**
			 * TODO 选中某个元素
			 * @param $obj
			 * @returns
			 */
			choose:function($obj){
				var self = this;
				S.each(self.$domList,function(i){
					i.removeClass(self.cls);
				});
				$obj.addClass(self.cls);
				self.curTarget = "#" + $obj.attr("id") || "";
			},
			indexOfArray:function(arr,str){
				for(var i = 0,len = arr.length;i < len; i++){
					if(arr[i] == str){
						return i;
					}
				}
				return -1;
			}
		});
	H.widget.RandomBox = RandomBox;
});	
H.add('SMART', function(HLG) {
	var S = KISSY,DOM = S.DOM,Event = S.Event;
	//促销活动模块
	var smart = {        
        //tab切换
        active_tab: function(container) {
            //团购tab 页切换
            new S.Tabs('#J_Smart', {
                navCls: 'ks-switchable-nav',
                contentCls: 'ks-switchable-content',
                activeTriggerCls: 'current',
                autoplay:true
            });
			return this;
		},
		//将日期 2011-6-27 10:22:30 格式 转为  Date 
		StringToDate: function(DateStr) {
			 if(typeof DateStr=="undefined")
				 return new Date();
			 if(typeof DateStr=="date")
				 return DateStr;
			 var converted = Date.parse(DateStr);
			 var myDate = new Date(converted);
			 if(isNaN(myDate)){
				 DateStr=DateStr.replace(/:/g,"-");
				 DateStr=DateStr.replace(" ","-");
				 DateStr=DateStr.replace(".","-");
				 var arys= DateStr.split('-');
				 switch(arys.length){
				 	case 7 : 
					 	myDate = new Date(arys[0],--arys[1],arys[2],arys[3],arys[4],arys[5],arys[6]);
				        break;
				 	case 6 : 
					 	myDate = new Date(arys[0],--arys[1],arys[2],arys[3],arys[4],arys[5]);
					 	break;
					default: 
						myDate = new Date(arys[0],--arys[1],arys[2]);
						break;
				};
			 };
			 return myDate;
		},
		shareToQzone : function(item_id, title){
			url = 'http://item.taobao.com/item.htm?id='+item_id;
			window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+encodeURIComponent(url)+'&title'+encodeURIComponent(title));
			return false;
		},
		shareToSina : function(item_id,title){
			url = 'http://item.taobao.com/item.htm?id='+item_id;
			void((function(s,d,e){try{}catch(e){}
			var f='http://v.t.sina.com.cn/share/share.php?',u=url,p=['url=',e(u),'&title=',e(title),'&appkey=1226626340'].join
				('');function a(){if(!window.open([f,p].join(''),'mb',['toolbar=0,status=0,resizable=1,width=620,height=450,left=',(s.width-
				620)/2,',top=',(s.height-450)/2].join('')))u.href=[f,p].join('');};if(/Firefox/.test(navigator.userAgent)){setTimeout(a,0)}
				else{a()}})(screen,document,encodeURIComponent));
		},		
		shareToQq : function(item_id, title){
			url = 'http://item.taobao.com/item.htm?id='+item_id;
			window.open( 'http://v.t.qq.com/share/share.php?url='+encodeURIComponent(url)+'&appkey=&site=&title='+encodeURI(title),'', 'width=700, height=680, top=0, left=0, toolbar=no,menubar=no, scrollbars=no, location=yes, resizable=no, status=no' );
			return false;
		},
		shareToRenren : function(item_id, title){
			url = 'http://item.taobao.com/item.htm?id='+item_id;
			void((function(s,d,e){
				if(/xiaonei\.com/.test(url))return;
				var f='http://share.xiaonei.com/share/buttonshare.do?link=',
					u=url,l=title,p=[e(u),'&title=',e(l)].join('');
				function a(){
					if(!window.open([f,p].join(''),'xnshare',['toolbar=0,status=0,resizable=1,width=626,height=436,left=',(s.width-626)/2,',top=',(s.height-436)/2].join('')))u.href=[f,p].join('');};if(/Firefox/.test(navigator.userAgent))setTimeout(a,0);else a();})(screen,document,encodeURIComponent));
		},
		shareToKaixin : function(item_id, title){
			var url = 'http://item.taobao.com/item.htm?id='+item_id;
			d=document;t=d.selection?(d.selection.type!='None'?d.selection.createRange().text:''):
				(d.getSelection?d.getSelection():'');void(kaixin=window.open('http://www.kaixin001.com/~repaste/repaste.php?&rurl='+escape
				(url)+'&rtitle='+escape(title)+'&rcontent='+escape(d.title),'kaixin'));kaixin.focus();

		},
		shareToDouban : function(item_id, title){
			var url = 'http://item.taobao.com/item.htm?id='+item_id;
			void(function(){var 
				d=document,e=encodeURIComponent,s1=window.getSelection,s2=d.getSelection,s3=d.selection,s=s1?s1():s2?s2():s3?s3.createRange
				().text:'',r='http://www.douban.com/recommend/?url='+e(url)+'&title='+e(title)+'&sel='+e(s)+'&v=1',x=function
				(){if(!window.open(r,'douban','toolbar=0,resizable=1,scrollbars=yes,status=1,width=700,height=680'))
				location.href=r+'&r=1'};if(/Firefox/.test(navigator.userAgent)){setTimeout(x,0)}else{x()}})()
		},
		shareToBaidu : function(item_id, title){
			url = 'http://item.taobao.com/item.htm?id='+item_id;
			window.open('http://apps.hi.baidu.com/share/?title='+encodeURIComponent(title.substring(0,76))+'&url='+encodeURIComponent(url));
			return false;
		},
		getItemVolume : function(uri, id, nick, mode){
			var	infoHandle = function(result){
				DOM.html('#'+id,result.payload);
			}
			var	errorHandle = function(result){
				DOM.html('#'+id,'0');
			}
			var data ="item_id="+id.substr(9)+"&nick="+nick+"&mode="+mode;
			new H.widget.asyncRequest().setURI(uri).setMethod("GET").setHandle(infoHandle).setErrorHandle(errorHandle).setData(data).send();
		},

		getItemCollect : function(uri, id){
			var	infoHandle = function(result){
				DOM.html('#'+id,result.payload);
			}
			var	errorHandle = function(result){
				DOM.html('#'+id,'0');
			}
			var data ="item_id="+id.substr(10);
			new H.widget.asyncRequest().setURI(uri).setMethod("GET").setHandle(infoHandle).setErrorHandle(errorHandle).setData(data).send();
		}
	};
	//对外接口
	if( !H.app.smart ) H.app.smart = smart;
});