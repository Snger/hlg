/* HLG.Dialog 简易模拟窗口
 * 
 * @creator     hlg<xiaohu@taobao.com>
 * @date		2011.05.21
 * @version		1.0
 */

H.add('widget~Dialog', function( HLG ) {
	var S = KISSY, DOM = S.DOM, Event = S.Event, doc = document, IE = S.UA.ie,
		DP = Dialog.prototype, _id_counter = 0,
/* 默认HTML
<div class="ui-dialog ui-dialog-dd">
	<div class="ui-dialog-hd">hd</div>
	<div class="ui-dialog-bd">bd</div>
	<div class="ui-dialog-ft"><a class="close" href="#close" title="关闭"></a></div>
</div>
<div class="ui-dialog-mask"></div>
*/	
		defConfig = {
			ID: null,
			head: 'Title',
			body: '<div class="ui-dialog-loading">正在加载，请稍候...</div>',
			foot: '',
			center: true,
			width: '580px',
			zIndex: '1000002',
			keypress: true,
			mask: false,
			drag: false,
			maskClassName: 'ui-dialog-mask',
			close: true,
			className: 'ui-dialog',
			classNameHd: 'ui-dialog-hd',
		    classNameBd: 'ui-dialog-bd',
			classNameFt: 'ui-dialog-ft',
			scroll : true
		},
		/**
		 * 所有自定义事件列表
		 */
		CHANGE_HEADER = "changeHeader",	//修改hd
		CHANGE_BODY = "changeBody",		//修改bg
		CHANGE_FOOTER = "changeFooter",	//修改ft
		CENTER = "center",					//center后
		BEFORE_SHOW = "beforeShow",		//show之前
		SHOW = "show",						//show
		BEFORE_HIDE = "beforeHide",		//hide之前
		HIDE = "hide";						//hide

	function Dialog (config) {
		var self = this; 
        if (!(self instanceof Dialog)) { 
            return new Dialog(config); 
        }		
		this.config = S.merge(defConfig, config || {});
		var self = this, cfg = self.config, k ,DD;
		self._createHTML();
		if(true === cfg.keypress) Event.on(doc, 'keypress', function(evt) {
			if (27 === evt.keyCode && 200 === self._status) {
				self.hide();
			}
		});
	}
	//
	S.mix(DP, S.EventTarget);
	S.mix(DP, {
		/*
		 * 内部状态码 400为hide, 200为show
		 *
		 * */
		_status: 400,

		/**
		 * 居中 return this
		 */
		center: function() { 
			var self = this, elem = this.elem, x, y,
				elemWidth = elem.offsetWidth,
				elemHeight = elem.offsetHeight,
				viewPortWidth = DOM.viewportWidth(),
                viewPortHeight = DOM.viewportHeight();
               
            if (elemWidth < viewPortWidth) {
                x = (viewPortWidth / 2) - (elemWidth / 2) + DOM.scrollLeft();
            } else {
                x = DOM.scrollLeft();
            }
            if (elemHeight < viewPortHeight) {
                y = (viewPortHeight / 2) - (elemHeight / 2) + DOM.scrollTop();
            } else {
                y = DOM.scrollTop();
			}
            DOM.css(elem, { left: x, top: y });
			DOM.css(self.mask, 'height', DOM.docHeight() + 'px');
            self.fire( CENTER );
            return self;
		},
		/*** setHeader */
		setHeader: function(str) {
            var self = this;
            str = str + "";
			self.elemHead.innerHTML = str;	
			self.fire( CHANGE_HEADER );
			return self;
		},
		/*** setbody */
		setBody: function(str) {
            var self = this;
            if(str.nodeType) { // 如果是节点元素, 清空elemBody, 再插入节点元素
				self.elemBody.innerHTML = '';
				self.elemBody.appendChild(str);
			} else {
				str = str + "";
				self.elemBody.innerHTML = str;
            }
			self.fire( CHANGE_BODY );
			return self;
		},
		
		/**
		 * setFooter
		 */
		setFooter: function(str) {
            var self = this;
            str = str + "";
			self.elemFoot.innerHTML = str;
			self.fire( CHANGE_FOOTER );
			return self;
        },

		/*** show*/
        show: function() {
            var self = this, cfg = this.config;
            self.fire( BEFORE_SHOW );
			DOM.css(self.elem, "visibility", "");
			DOM.css(self.elem, "display", "");
			if(true === cfg.center) self.center();
			DOM.css(self.mask, "visibility", "");
			if(IE && 6 === IE) {
				DOM.addClass(doc.body, 'fix-select');
			}			
			self._status = 200;
			self.fire( SHOW );
			if (cfg.scroll) {
				var cen = function(){
					self.center();
				};
				window.onscroll = cen;
			}
			return self;
		},
		
		/**
		 * hide
		 */
        hide: function() {
            var self = this,  cfg = self.config;
			if ( 400 === self._status ) return;
		    self.fire( BEFORE_HIDE );
            //DOM.css(self.elem, "top", 0);
            DOM.css(self.elem, "display", "none");
			DOM.css(self.elem, "visibility", "hidden");
            DOM.css(self.mask, "visibility", "hidden");
            DOM.css(self.mask, "height", 0);
			if(IE && 6 === IE) {
				DOM.removeClass(doc.body, 'fix-select');
			}
			self._status = 400;
			self.fire( HIDE );
			return self;
		},
		
		align: function() {
			
		
		},
		
		
		_createHTML: function() {
			var self = this, cfg = self.config;
			self.elem = doc.createElement('dialog');
			self.elem.id = cfg.ID || 'ui-dialog-' + _id_counter++;
			self.elem.className = cfg.className;
			DOM.css(self.elem, 'width', cfg.width);
			DOM.css(self.elem, 'visibility', 'hidden');
			DOM.css(self.elem, 'z-index', cfg.zIndex);
			//hd
			self.elemHead = doc.createElement('hd');
			self.elemHead.className = cfg.classNameHd;
			self.elemHead.innerHTML = cfg.head;
			
			//bd
			self.elemBody = doc.createElement('bd');
            self.elemBody.className = cfg.classNameBd;
            self.setBody( cfg.body );
                //ft
            self.elemFoot = doc.createElement('ft');
            self.elemFoot.className = cfg.classNameFt;
            self.elemFoot.innerHTML = cfg.foot;
            //append
			self.elem.appendChild(self.elemHead);
            self.elem.appendChild(self.elemBody);
            self.elem.appendChild(self.elemFoot);
			doc.body.appendChild(self.elem);
				if(true === cfg.close) {
				// 注册关闭按钮
				self.elem.appendChild(DOM.create('<a href="javascript:void(0);" class="close">closes</a>'));
				Event.on(DOM.query('.close', self.elem ), 'click', function(evt) {
					evt.preventDefault();
					self.hide();
				});
			}
			// 初始化遮罩层
			if(true === cfg.mask) {
				self.mask = doc.createElement('mask');
				self.mask.id = self.elem.id + '_' + cfg.maskClassName;
				self.mask.className = cfg.maskClassName;
                DOM.css(self.mask, 'height', DOM.docHeight() + 'px');
                DOM.css(self.mask, 'visibility', 'hidden');
				DOM.css(self.mask, 'z-index', self.config.zIndex - 1);
				doc.body.appendChild(self.mask);
			}
			
			// 初始化拖拽
			if(true === cfg.drag) {
				DOM.addClass(self.elem, 'ui-dialog-dd');
				S.use('dd',function(){
					var node = S.one('#'+self.elem.id);
				    new S.Draggable({
						node:node,
					    handlers:[S.one('.'+cfg.classNameHd)],
					    shim:true				
				    }).on("drag", function(ev) {
                    	if (ev.left < 0||ev.top<0) return;
                    	this.get("node").offset(ev);
                        });
					});
			   }
		}
	});

   H.widget.Dialog = Dialog;
    
   H.widget.DialogMgr = {
        /* 存储已初始化的dialog */
        list: {},
        /**
            * 返回H.widget.Dialog对象
            */
        get: function(id, config) {
            if(!id || !this.list[id]) {
                var D = new H.widget.Dialog(config);
                id = !id ? D.elem.id : id;
                this.list[id] = D;
            }
            return this.list[id];
        }
    };
});

/* vim: set et sw=4H=4 sHLG=4 fdm=indent ff=unix fenc=gbk: */
/**
 *H.Msg 简易消息提示
 *
 *   new msg = H.util.Msg();  
 * 方法：setHeader(str);  设置头部
 		 setMsg(value); 设置消息 
         show(): 居中显示遮罩， 
 * 		 show(id)  特定容器里 显示消息  
 *		 showDialog() 简易对话
 * 
 * 					
 */
 H.add('widget~msg', function( HLG ) {
    var S = KISSY, DOM = S.DOM, Event = S.Event,doc = document,
		HIDDEN = 'hidden'; num = 0;
	
	function Msg() {
		var self = this; 
        if (!(self instanceof Msg)) { 
            return new Msg(); 
        }
		//遮罩
        this.msgMask = null,
        this.elem = null;
        this.panel =null;
        this.msg = null;
        this.header = "错误提示";
		//显示 消息  id 的容器
        this.contain = null;
		this.status = 'msg'
	}

	S.mix(Msg.prototype, {
		/*
		 * 
		 * 设置消息
		 *
		 * @param value {String} 消息内容
         * show(mode) 
		 *			   
		 * */
		setHeader: function(str){
			 var self =this;
			 if(S.isString( str )){
				 self.header =str;
			 }
			 return this;
		 },
		setMsg: function(value){
			 var self = this;
			 if(value ==undefined){
				 self.msg = null;
			 }else{
				 self.msg = value;
			 }
			 return this;
		 }, 
		setBody: function( value ,mode) {
			 var self = this;
			 if(mode==1){
				 if ( S.isString( value ) ) {
					 self.elem.innerHTML = value;
				 } 
			 }else if(mode==2){
				 if ( S.isString( value ) ) {
					 self.contain.innerHTML = value;
				 } 
			 }else {
				 self.panel.setBody(value);
			 }
			return this;
        },
        createDiv: function(){
	        	var parent = DOM.create('<div class="messages-prompt" ><div class="fbloader"><img  src=" http://img.huanleguang.com/hlg//fbloader.gif" width="16" height="11" /></div></div>');
	        	this.elem = doc.createElement('div'); 
				this.elem.className = "mini_dialog_content";
	        	DOM.append(this.elem,parent);
				doc.body.appendChild(parent);
        },
        createDialog: function(){
        	var Id = 'msg_panel'+num++;
			this.panel = H.widget.DialogMgr.get(Id,{
				 ID: Id,
				 head: '错误提示',
				 body: '',
				 foot: '',
				 center: true,
				 width: '400px',
				 keypress: true,
				 mask: true,
				 drag: true	
			});
        },
        
        /**
		 * 居中 
		 */
		center: function() { 
			var self = this, x, y;
			var elem = DOM.parent(this.elem),
				elemWidth = elem.offsetWidth,
				elemHeight = elem.offsetHeight;
			viewPortWidth = DOM.viewportWidth(),
			viewPortHeight = DOM.viewportHeight();
            if (elemWidth < viewPortWidth) {
                x = (viewPortWidth / 2) - (elemWidth / 2) + DOM.scrollLeft();
            } else {
                x = DOM.scrollLeft();
            }

            if (elemHeight < viewPortHeight) {
                y = (viewPortHeight / 2) - (elemHeight / 2) + DOM.scrollTop();
            } else {
                y = DOM.scrollTop();
			}
            DOM.css(elem, { left: x, top: y });
            return self;
		},
		
		show: function( id ) {
			var self = this;
			var value = self.msg;
            if(id == undefined){
	            	if(!this.elem){
	            		self.createDiv();
	            	}
	            	DOM.css(DOM.parent(self.elem),'opacity','1');
	            	self.setBody(value,1);
	            	self.mask();
	            	DOM.show(DOM.parent(self.elem));
	            	self.center();
	            	function  msgRoll(){
	            		self.center();
	            	}
	            	window.onscroll = msgRoll;
					self.status = 'msg'
            }else {
            	this.contain = DOM.get(id);
            	self.setBody(value,2);
            	DOM.show(self.contain);
				self.status = 'contain'
            }
		},
		/*一般错误消息提示 body 样式
		 * <div class="point relative"><div class="point-w-1">团购初始参团人数必须大于等于0</div></div>
		 * */
		showDialog: function(){
			var self = this;
			if(!this.panel){
				self.createDialog();
			}
			self.panel.setHeader(self.header);
			self.setBody(self.msg);
			self.panel.show();
			self.status = 'dialog'
		},
	   // 初始化遮罩层
		mask: function() {
			var self = this;
				mask = doc.createElement('mask');
				self.msgMask = mask;
				mask.id = 'messageMask';
				mask.className = 'msg-mask';
				DOM.css(mask, 'height', DOM.docHeight() + 'px');
				DOM.css(mask, 'height', DOM.docHeight() + 'px');
				doc.body.appendChild(mask);
				if(KISSY.UA.ie == 6){
		        	DOM.append(DOM.create('<iframe style="position:absolute; top:0px; left:0px; width:100%; height:100%; opacity:0; filter:alpha(opacity=0);z-index:-1; scrolling:no; visibility:inherit" frameborder="5" src=""></iframe>'),DOM.get('#messageMask'));
		        }
			return this;
		},
		/*
		 * 隐藏
		 *
		 * @param b {Boolean} 是否延时隐藏, 默认false
		 * */
		hide: function(b, status){
			var self = this;
			if (b == undefined) {
				if (self.panel != null) {
					self.panel.hide();
				}
				if (self.elem) {
					DOM.hide(DOM.parent(self.elem));
					DOM.remove(self.msgMask);
				}
				if (self.contain) {
					DOM.hide(self.contain);
					DOM.remove(self.msgMask);
				}
			}else {
				if (isNaN(Number(b)) == true || b <= 0 || b== true) {
					b = 3000;
				}
				if (status == undefined) {
					KISSY.later(function(panel, elem, contain, msgMask){
						if (panel != null) {
							panel.hide();
						}
						if (elem) {
							DOM.hide(DOM.parent(elem));
							DOM.remove(msgMask);
						}
						if (contain) {
							DOM.hide(contain);
							DOM.remove(msgMask);
						}
					}, b, false, null, [self.panel, self.elem, self.contain, self.msgMask]);
				}
				else 
					if (status == 'dialog') {
						KISSY.later(function(panel){
							if (panel != null) {
								panel.hide();
							}
						}, b, false, null, self.panel);
					}
					else 
						if (status == 'msg') {
							KISSY.later(function(elem, msgMask){
								if (elem) {
									DOM.hide(DOM.parent(elem));
									DOM.remove(msgMask);
								}
							}, b, false, null, [self.elem, self.msgMask]);
							
						}
						else 
							if (status == 'contain') {
								KISSY.later(function(contain, msgMask){
									if (contain) {
										DOM.hide(contain);
										DOM.remove(msgMask);
									}
								}, b, false, null, [self.contain, self.msgMask]);
							}
			}
		}

	});
	 H.util.Msg = Msg;
});
 
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
			var data ="item_id="+id.substr(9)+"&nick="+encodeURIComponent(nick)+"&mode="+mode;
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