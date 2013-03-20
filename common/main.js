KISSY.add(function(S){
	
	S.ready(function(){
			//  消息框  头部
			var DOM = S.DOM ,Event = S.Event;
			var Width = DOM.width('#J_MenuMouse')-2;
			if(Width > 83){
				DOM.style('#J_Width','width',Width);
			}else{
				DOM.style('#J_Width','width','83px');
				DOM.style('#J_MenuMouse','width','85px');
			}
			
			S.use('node,overlay', function(S, Node, O) {	
				 var popup = new KISSY.Popup(KISSY.one("#J_SubMenu"), {
			    	 srcNode :'#J_MenuMouse',
			         trigger : '#J_MenuMouse',//配置Popup的触发器
			         triggerType : 'mouse',    //触发类型
			         align : {
			            node : '#J_MenuMouse',
			            points : ['br', 'tr'],
			            offset : [-1, 0]
			         }
			    });
			    popup.render();
			    popup.hide();
			    DOM.css('.ks-contentbox','border','0px'); 
			    popup.on('beforeVisibleChange',function(ev){
			    	if(ev.newVal == true){
			    		DOM.addClass('#J_MenuMouse','current');
				    }else if(ev.newVal == false){
				    	DOM.removeClass('#J_MenuMouse','current');
					}
				})
			});
			S.use('node,overlay', function(S, Node, O) {	
				 var popup = new KISSY.Popup(KISSY.one("#J_Upgrade"), {
			    	 srcNode :'#J_UpgradeMouse',
			         trigger : '#J_UpgradeMouse',//配置Popup的触发器
			         triggerType : 'mouse',    //触发类型
			         align : {
			            node : '#J_UpgradeMouse',
			            points : ['br', 'tr'],
			            offset : [0,-1]
			         }
			    });
			    popup.render();
			    popup.hide();
			    DOM.css('.ks-contentbox','border','0px'); 
			    popup.on('beforeVisibleChange',function(ev){
			    	if(ev.newVal == true){
			    		DOM.addClass('#J_UpgradeMouse','current');
				    }else if(ev.newVal == false){
				    	DOM.removeClass('#J_UpgradeMouse','current');
					}
				})
			});	
			S.io.get(getMsgUrl,{
				type:"mess"
			},function(o){
				if(o.payload > 0){ 
					DOM.html('#J_MsgNum1',o.payload);
					var str =  '<a title="消息" href="'+messIndexUrl+'" ><em  ><span class="msg-radius" id="J_MsgNum">'+o.payload+'</span></em></a>';
					DOM.html(DOM.get('#J_SyetemMessage'),str);
					DOM.addClass('#J_SyetemMessage','current');
						KISSY.use('node,overlay', function(S, Node, O) {	
						  var popupMsg = new KISSY.Popup(KISSY.one("#J_MessContent"), {
							   	 closable : false,
							   	 closeAction:'hide',
						         align : {
						            node : '#J_MenuMouse',
						            points : ['br', 'tr'],
						            offset : [47, 1]
						         }
						    });
						    popupMsg.render();
						    DOM.css(DOM.get('.ks-contentbox','#J_MessContent'),'border','0px'); 
							popupMsg.show();
						})
					}
			},"json");
			Event.delegate(document,'click','#J_MakeAllRead',function(){
		        var submitHandle = function(o) {
		            DOM.hide('#J_MessContent');
		            DOM.removeClass('#J_SyetemMessage','current');
		            DOM.text('#J_MsgNum','0');
		        }
				var data = "type=mess";
				new H.widget.asyncRequest().setURI(afterUserReadUrl).setHandle(submitHandle).setMethod("GET").setData(data).setDataType('json').send();
			})
			
				//  左边栏
				var menuItemHeader = S.query("#menu .title");
				var menuUl = S.query('.menu-ul');	
				Event.on(menuItemHeader,'click',function(ev){
					var nextMenu = DOM.next(ev.currentTarget);
					//DOM.hide(menuUl);
					DOM.toggle(nextMenu);
					//DOM.hide(subMenu);
					DOM.removeClass(DOM.siblings(DOM.parent(ev.currentTarget,'.menu-item')),'current');
					//DOM.addClass(DOM.parent(ev.currentTarget,'.menu-item'),'current');
					Prev = DOM.parent(ev.currentTarget,'.menu-item');
					DOM.toggleClass(Prev,"current none");
				});
				
				var ItemHeader = S.query("#menu .second-title");
				var subMenu = S.query('.submenu');
				Event.on(ItemHeader,'click',function(ev){
					var NextMenu = DOM.next(ev.currentTarget);
					DOM.toggle(NextMenu);
				});
				Event.on('.menu-flex','click',function(ev){
					if(ev.type == 'click'){
						if(DOM.hasClass('.kefu','.block')){
							DOM.addClass(DOM.parent(ev.currentTarget),'service');
							DOM.hide('.kefu');
							DOM.removeClass('.kefu','.block');
						}else{
							DOM.removeClass(DOM.parent(ev.currentTarget),'service');
							DOM.addClass('.kefu','.block')
							DOM.show('.kefu');
						}
					}
				});	
				Event.on('.menu-flex-2','click',function(ev){
					if(ev.type == 'click'){
						if(DOM.hasClass('.group','.block')){
							DOM.removeClass(DOM.parent(ev.currentTarget),'service');
							DOM.show('.group');
							DOM.removeClass('.group','.block');
						}else{
							DOM.addClass(DOM.parent(ev.currentTarget),'service');
							DOM.addClass('.group','.block')
							DOM.hide('.group');
						}
					}
				});	
				S.each(DOM.query('.submenu'), function(item,i) {
					var subLi = DOM.children(item, 'li');
					Event.on(subLi, 'click', function(ev) {
						//DOM.hide(menuUl);
						//DOM.show(DOM.parent(Parent)); 
						//DOM.removeClass(subLi,'first');
						//DOM.addClass(ev.currentTarget,'first');
						Parent = DOM.parent(ev.currentTarget);
						DOM.addClass(DOM.parent(Parent),'active');
					})
				})
		
		
	})		
})
	

