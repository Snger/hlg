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
						      width: 500,
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
				if(permission == 2){
					dashboard.panel.set('bodyContent','<div class=""><div style="text-align: center;margin-bottom:15px;"><span style=" background: url(http://cdn.huanleguang.com/img/give.jpg) no-repeat; width:311px; height:34px; display:inline-block;"></span></div>');
					dashboard.panel.show();
				}else if(permission == 1){
						dashboard.panel.set('bodyContent','<div style="text-align: center;margin-bottom: 15px;"><span style=" background: url(http://cdn.huanleguang.com/img/give.jpg) no-repeat; width:186px; height:29px;background-position:0 -34px; display:inline-block;"></span></div><div style="text-align: center;margin-bottom: 15px;"><a href="http://fuwu.taobao.com/item/subsc.htm?items=appstore-10687-1:12" target="_blank"><span style=" background: url(http://cdn.huanleguang.com/img/give.jpg) no-repeat; width:97px; height:36px;background-position:0 -68px; display:inline-block;"></span></a></div>');
						dashboard.panel.show();
			    }else if(permission == 3){
					dashboard.panel.set('bodyContent','<div class=""><div style="text-align: center;"><span style=" background: url(http://cdn.huanleguang.com/img/give.jpg) no-repeat; width:311px; height:34px; display:inline-block;"></span></div><div class="clear" style="padding:10px;width:430px;margin:auto;"><div style="text-align:center;color:#f45f03; font-size:20px;">助你引爆年末店铺流量<br/>您的试用版时间小于赠送标准时间</div></div><div style="width:124px;margin:10px auto 20px auto;"><a href="http://fuwu.taobao.com/item/subsc.htm?items=appstore-10687-1:12"><input class="btm-orange" type="button" name="" value="立即年定试用版" ></a></div></div>');
					dashboard.panel.show();			
			    }
				Event.on('.version-li','mouseover mouseout',function(ev){
		    		if(ev.type == 'mouseover'){
		    			DOM.addClass(ev.currentTarget,'mouseover');
		    			}else{
		    			DOM.removeClass(ev.currentTarget,'mouseover')	
		    				}
		    		
		    	})
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
			}
	}
   
}, {
    requires: ['overlay']
});
