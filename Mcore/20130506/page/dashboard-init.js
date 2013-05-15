/*
combined files : 

page/dashboard-init

*/

/**
 * @fileOverview 
 * @author  
 */
KISSY.add('page/dashboard-init',function (S,O) {
	var S= KISSY,DOM = S.DOM, Event = S.Event;
	return  dashboard = {
			msg :null ,
			panel : null,
			init : function(){
				
				dashboard.panel = new O.Dialog({
						      width: 360,
						      headerContent: '',
						      bodyContent: '',
						      mask: false,
						      align: {
						          points: ['cc', 'cc']
						      },
						      closable :true,
						      draggable: true,
						      aria:true
				});
//				new H.widget.msgBox({
//				    title:"温馨提示",
//				    content:'亲，为了更好的为大家提供优质的服务，欢乐逛决定于27号晚上22点至28号12点做系统升级，届时整个应用将无法访问，请亲们提前做好准备，避开此段时间操作，给您造成的不便敬请谅解。',
//				    type:"info"
//				});
				if(presentActivity == 1){ //presentActivity 5折优惠 送标准版（已参加活动剩余60天的用户）
					//dashboard.panel.set('width','360');
			    	//dashboard.panel.set('headerContent','亲，恭喜您获得一次5折季订的优惠哦!');
					dashboard.panel.set('bodyContent','<div class=""><div style="text-align:center;color:#999999;padding:30px;">亲，您当前是"<span style="color:#FF9510;font-weight:bold;">赠送1季度体验标准版</span>"，现在升级到尊享版可享受<span style="color:#FF0701;font-weight:bold;font-size:14px;">5折</span>优惠(月订除外)。<span style="color:#FF0701;font-weight:bold;font-size:14px;">机会仅此一次！</span></div><div style="width:130px;margin:10px auto 20px auto;"><a onclick="window.location.href=presentUrl" href="#2"><input class="btn-sj" type="button" name="" value="" ></a></div><div style="display:none;text-align:center;color:#323232;padding:20px 30px;">凡季订以上加送5大独立店铺模块+<a href="http://www.taobao.com/go/act/other/chrismas20121225.php?promo=operate" target="_blank">店铺运营报告</a>+<a href="http://www.taobao.com/go/act/other/mobile20130318.php?&promo=zhuanhua" target="_blank">iphone手机端</a></div></div>');
					dashboard.panel.show();			
			    }else if(payUserActivity == 1){ //payUserActivity 7折优惠 
					var cont = '<div class=""><div style="text-align:center;color:#999999;padding:40px 30px;">亲，您当前版本<span style="color:#FF9510;font-weight:bold;" id="J_payUserTime"></span>天后到期，为了不影响流量，现在续费</br>尊享版可享受<span style="color:#FF0701;font-weight:bold;font-size:14px;">7折</span>优惠(仅限年订)。加送<a href="http://www.taobao.com/go/act/other/zxmbmfty2013.php?promo=scl" target="_blank">三重礼</a></div><div style="width:120px;margin:0px auto 40px auto;"><a onclick="window.location.href=payUserUrl" href="#2"><input class="btn-xf" type="button" name="" value="" ></a></div></div>';
					dashboard.panel.set('bodyContent',cont);
					dashboard.panel.show();		
					DOM.html('#J_payUserTime',DOM.val('#payUserTime'));
				}else if(permission == 2){//送标准版（未参加活动试用版用户）
				//	dashboard.panel.set('bodyContent','<div class=""><div style="text-align: center;margin-bottom:15px;"><span style=" background: url(http://cdn.huanleguang.com/img/give.jpg) no-repeat; width:311px; height:34px; display:inline-block;"></span></div>');
				//	dashboard.panel.set('bodyContent','<div class=""><div style="text-align:center;color:#f45f03; font-size:20px;margin-top:20px;">亲，一季度店铺运营报告功能已经赠送成功了哦~~</div><a target="_blank" onclick="window.location.href=getReportUrl" style="width:124px;display:block;margin:30px auto;"><input class="btm-orange" type="button" name="" value="马上去体验吧" ></a></div>');
					dashboard.panel.set('bodyContent','<div class=""><div style="text-align:center;color:#999999;padding:30px;">亲，您当前是“<span style="color:#FF9510;font-weight:bold;">试用版</span>”，为了提高流量，只要<br /><span style="color:#FF0701;font-size:12px;font-weight:bold;">年订试用版即赠送<b>1</b>季度标准版</span>体验。<span style="display:none;color:#FF0701;font-size:12px;">机会仅此一次!</span></div><div style="width:124px;display:block;margin:10px auto 20px auto;"><a href="http://fuwu.taobao.com/ser/assembleParam.htm?subParams=itemCode:appstore-10687-1,cycleNum:12,cycleUnit:2" target="_blank"><input class="btn-ljlq" type="button" name="" value="" ></a></div><div style="display:none;text-align:center;color:#323232;padding:0px 18px 20px 18px;">付费版季订以上加送5大独立店铺模块+<a href="http://www.taobao.com/go/act/other/chrismas20121225.php?promo=operate" target="_blank">店铺运营报告</a>+<a href="http://www.taobao.com/go/act/other/mobile20130318.php?&promo=zhuanhua" target="_blank">iphone手机端</a></div></div>');	
					dashboard.panel.show();
				}else if(permission == 1){ //送标准版（新用户月、季、半年）
						//dashboard.panel.set('bodyContent','<div style="text-align: center;margin-bottom: 15px;"><span style=" background: url(http://cdn.huanleguang.com/img/give.jpg) no-repeat; width:186px; height:29px;background-position:0 -34px; display:inline-block;"></span></div><div style="text-align: center;margin-bottom: 15px;"><a href="http://fuwu.taobao.com/item/subsc.htm?items=appstore-10687-1:12" target="_blank"><span style=" background: url(http://cdn.huanleguang.com/img/give.jpg) no-repeat; width:97px; height:36px;background-position:0 -68px; display:inline-block;"></span></a></div>');
						dashboard.panel.set('bodyContent','<div style="text-align:center;color:#999999;padding:30px;">亲，<span style="color:#FF9510;font-weight:bold;">成功赠送1季度体验标准版</span>，为了保证您正常使用标准版，<span style="color:#FF0701;font-weight:bold;">请立即续订试用版一年</span>。</div><div style="width:124px;display:block;margin:10px auto 20px auto;"><a href="http://fuwu.taobao.com/ser/assembleParam.htm?subParams=itemCode:appstore-10687-1,cycleNum:12,cycleUnit:2" target="_blank"><input class="btn-ljxd" type="button" name="" value="" ></a></div><div style="display:none;text-align:center;color:#323232;padding:0px 18px 20px 18px;">付费版季订以上加送5大独立店铺模块+<a href="http://www.taobao.com/go/act/other/chrismas20121225.php?promo=operate" target="_blank">店铺运营报告</a>+<a href="http://www.taobao.com/go/act/other/chrismas20121225.php?promo=operate" target="_blank">iphone手机端</a></div>');
						dashboard.panel.show();
			    }else if(permission == 3){ //送标准版（新用户年订）
					//dashboard.panel.set('bodyContent','<div class=""><div style="text-align: center;"><span style=" background: url(http://cdn.huanleguang.com/img/give.jpg) no-repeat; width:311px; height:34px; display:inline-block;"></span></div><div class="clear" style="padding:10px;width:430px;margin:auto;"><div style="text-align:center;color:#f45f03; font-size:20px;">助你引爆年末店铺流量<br/>您的试用版时间小于赠送标准时间</div></div><div style="width:124px;margin:10px auto 20px auto;"><a href="http://fuwu.taobao.com/item/subsc.htm?items=appstore-10687-1:12"><input class="btm-orange" type="button" name="" value="立即年定试用版" ></a></div></div>');
					dashboard.panel.set('bodyContent','<div style="font-size:18px;text-align:center;color:#999999;padding:50px 30px;">亲，<span style="color:#FF9510;font-weight:bold;">成功赠送<b>1</b>季度标准版！</span></div>');
			    	dashboard.panel.show();			
			    }else if(oneMonthOrder == 1){ //oneMonthOrder 8折优惠
					//dashboard.panel.set('headerContent','亲，恭喜您获得一次年订8折的优惠哦!');
			    	dashboard.panel.set('width','400');
					var cont = '<div class=""><div style="text-align:center;color:#999999;padding:30px;">亲，您当前版本<span style="color:#FF9510;font-weight:bold;" id="J_tiem"></span>天后到期，为了提高流量和销量，现在续费</br>尊享版可享受<span style="color:#FF0701;font-weight:bold;font-size:14px;">8折</span>优惠(月订除外)。<span style="color:#FF0701;font-weight:bold;font-size:14px;">机会仅此一次！</span></div><div style="width:120px;margin:10px auto 20px auto;"><a onclick="window.location.href=oneMonthUrl" href="#2"><input class="btn-xf" type="button" name="" value="" ></a></div><div style="text-align:center;color:#323232;padding:20px 30px;">凡季订以上加送5大独立店铺模块+<a href="http://www.taobao.com/go/act/other/chrismas20121225.php?promo=operate" target="_blank">店铺运营报告</a>+<a href="http://www.taobao.com/go/act/other/mobile20130318.php?&promo=zhuanhua" target="_blank">iphone手机端</a></div></div>';
					dashboard.panel.set('bodyContent',cont);
					dashboard.panel.show();		
					DOM.html('#J_tiem',DOM.val('#oneMonthTime'));
				}
				Event.on('.version-li','mouseover mouseout',function(ev){
		    		if(ev.type == 'mouseover'){
		    			DOM.addClass(ev.currentTarget,'mouseover');
		    		}else{
		    			DOM.removeClass(ev.currentTarget,'mouseover')	
		    		}
		    		
		    	});				
				DOM.hide(DOM.query('.del'));
				DOM.hide(DOM.query('.tianjia'));
	    	    Event.delegate(document,'mouseenter mouseleave','.J_Bitem',function(ev){
	    			DOM.toggleClass(ev.currentTarget,"current");
	    		});
	            Event.delegate(document,'mouseenter mouseleave','.J_Titem',function(ev){
						if(ev.type == 'mouseenter'){
							DOM.addClass(ev.currentTarget,"mouseover");
							DOM.hide(DOM.query('.overlap-text'));
		                	DOM.show(DOM.get('.overlap-text',ev.currentTarget));
						}else{
							DOM.hide(DOM.query('.overlap-text'));
							DOM.removeClass(ev.currentTarget,"mouseover");
		                }
					
	    		});
	            Event.delegate(document,'click','.J_CreateApp',function(ev){
	                var url = DOM.attr(ev.currentTarget,'data');
					var app =  DOM.attr(ev.currentTarget,'tid');
	    			switch(app){
	    			  case 'tbspec':
	    			  case 'mjs':
	    			  case 'spec':
	    			  case 'tg':
	    			  case 'freepost':
	    			  case 'jtj':
	    			  case 'buyerlimit':
	    				 if(!showPermissions('editor_promotion',"创建促销活动")){
	    	    				return ;
	    	    		 }
	        			 break;
	    			  case 'promoprops':
	    				 if(!showPermissions('view_promoprops',"查看促销道具")){
	    	    				return ;
	    	    		 }
	        			 break;
	    			  case 'udp':
	    				 if(!showPermissions('view_udp',"查看数据诊断")){
	    	    				return ;
	    	    		 }
	        			 break;
	    			  case 'plugin':
	    				 if(!showPermissions('view_plugin',"查看促销模块")){
	    	    				return ;
	    	    		 }
	        			 break;
	    			  case 'tubiao':
	    				  if(!showPermissions('view_icon',"查看图标")){
	  	    				return ;
	  	    		 		}
	    				  break;
	    			  case 'xiangqing':
	    				  if(!showPermissions('view_promodesc',"查看详情")){
	    	    				return ;
	    	    		 		}
	    				  break;
	    			  case 'chajian':
	    				  if(!showPermissions('view_smart',"查看插件")){
	    	    				return ;
	    	    		 		}
	    				  break; 
	    			  case 'haibao':
	    			  case 'tuantemplate':
	    			  case 'dapei':
	    			  case 'fenlei':
	    			  case 'kefu':
	    			  case 'guanlian':
	    			  case 'list':
	    				  if(!showPermissions('view_material',"查看素材")){
	    	    				return ;
	    	    		 		}
	    				  break; 
	    			  case 'huiyuan':
	    				  if(!showPermissions('view_crm',"查看会员")){
	    	    				return ;
	    	    		  }
	    				  break; 
	    			  case 'shangxia':
	    			  case 'haoping':
	    			  case 'gaiming':
	    			  case 'gaijia':
	    			  case 'chuchuang':
	    			  case 'pingjia':
	    				  if(!showPermissions('view_tool',"查看工具")){
	    	    				return ;
	    	    		 		}
	    				  break; 
	    			}
	    			window.location.href=url;
	    		});
	            var activeNum = DOM.children('#J_Activities');
	            
	           Event.on(activeNum,'mouseenter mouseleave click',function(ev){
	               if(ev.type == 'mouseenter'){
						DOM.addClass(ev.currentTarget,'current');
	               }else if(ev.type == 'mouseleave'){
	            	   DOM.removeClass(ev.currentTarget,'current');
	               }else{
	            	    var url = DOM.attr(ev.currentTarget,'data');
	            	    var permission = DOM.attr(ev.currentTarget,'tid');
	            	    if(!showPermissions(permission)){
		    				return ;
		    		 	}
	       				window.location.href=url;
	               }
	    		});
	          
//                       dashboard.posterShow();
               },
               GetPoster : function(){
            	   var submitHandle = function(o) {	
   					};
	   				var errorHandle = function(o){
	   				};	 
	   				var data = "";
	   				new H.widget.asyncRequest().setURI(updateActivityFlag).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
   	        	},
               //海报展示
               posterShow: function(){
                   var submitHandle = function(o) {
                   		var nowTime = H.util.StringToDate(DOM.val('#J_W2Curtime')),
                           endTime =  H.util.StringToDate(o.payload.end_time);
                  		 var s = H.util.StringToDate(o.payload.begin_time).getTime(), e =endTime.getTime(),n = nowTime.getTime();
                   		if ((s < n) && (n < e)) {
	                           var linkMode = o.payload.link_mode == 1 ? 'target="_blank"': '';
	                           var str = '<a href="'+o.payload.link_url+'" '+linkMode+'  ><img src="'+o.payload.poster_url+'" data-poster-track="'+o.payload.poster_id+'"></a>';
	                           DOM.append(DOM.create(str),DOM.get('#J_MonitorBox_Dash'));
	                           // 倒计时
	                           if(o.payload.is_countdown){
	                                   H.widget.countdown('#PromoCountDown',endTime,1);
	                           }
	                           // 弹窗 1
	                           if(o.payload.pop_up){
	                                    dashboard.panel.set('headerContent','');
	                                    dashboard.panel.set('bodyContent','<div class=""><div sttyle="text-align: center;"></div><div style="width:124px;margin:10px auto 20px auto;">'+o.payload.pop_up_con+'</div></div>');
	                                    dashboard.panel.show();                        
	                           }
//	                             KISSY.later(function(){
//	                                     S.io.get(recordingPosterUrl,{
//					                        poster_id :o.payload.poster_id,
//					                        way : 1
//					                      });
//	                             },1000,false)
                   		}
                   };
                   var errorHandle = function(o){
                          
                   }       
               	var data = '';
			   new H.widget.asyncRequest().setURI(getShowPosterUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
         }
	}
   
}, {
    requires: ['overlay']
});
