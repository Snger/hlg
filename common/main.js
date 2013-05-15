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
				});
				//在线帮助 漂浮块  
			    Event.on('#online_help','mouseenter mouseleave',function(ev){
				 		if(ev.type== "mouseenter"){
				 			DOM.show('#J_help');
				 	 	}else if(ev.type== "mouseleave"){
				 	 		DOM.hide('#J_help');
				 	 	}
				});
			    //反馈建议 漂浮块  
			    Event.on('#J_fkjy','click',function(ev){
						KISSY.use("node,overlay", function(S, Node, O) {
							if(!window.suggestDialog){
								window.suggestDialog = new O.Dialog({
								      width:500,
								      headerContent: '<div style="line-height:50px;font-weight:bold;font-size:14px;border-bottom:1px solid #ebebeb;">反馈建议</div>',
								      bodyContent:cont,
									  mask: true,
								      align: {
								          points: ['cc', 'cc']
								      },
								      closable :true,
								      draggable: true,
								      aria:true
								  });
								var cont='<div class=""><form method="post" id="J_SuggestAddForm" action=""><ul><input type="hidden" name="type" value="2" /><input type="hidden" name="source" value="1" />'
										+'<li><div class="align-right fl">类型:</div><div class="fl ml6"><select id="J_Suggest_ProjectType" name="project_type"><option value="1">促销活动</option><option value="2">模板</option><option value="3">会员</option><option value="4">数据</option><option value="5">批量工具</option><option value="6">标题优化</option><option value="7">移动端</option><option value="8">其它</option></select></div></li>'
										+'<li><div class="align-right fl">标题:</div><div class="fl ml6"><input type="text" id="J_Suggest_Title" name="title" value="" class="suggest_input_text"></div></li>'
										+'<li><div class="align-right fl">旺旺:</div><div class="fl ml6"><input type="text" id="J_Suggest_Shopnick" name="shop_nick" value="" class="suggest_input_text"></div></li>'
										+'<li><div><textarea class="textarea J_CheckNum required-entry" style=" width:460px; height: 200px;" title="Template Content" id="J_Suggest_Content" name="content"></textarea></div></li>'
										+'<li style="line-height:0;min-height:0;margin-bottom:0;"><div class="ui-msg mt15" style="display: none; width:460px;" id="J_Suggest_ParamsErrorBox"><div class="error-msg"><div class="img-16-1"></div><div class="text-16 color-red" id="J_Suggest_ParamsErrorMsg"></div></div></div><div class="ui-msg mt15" style="display: none;width:460px;" id="J_Suggest_ParamsSucessBox"><div class="success-msg"><div class="img-16-6"></div><div class="text-16" id="J_Suggest_ParamsSucessMsg"></div></div></div></li>'
										+'</ul>'
										+'<div style="height:60px;border-top:1px solid #e6e6e6;background:#F3F3F2;"><div style="width:150px;margin:15px auto;"><input id="J_SubmitPost" class="clickable" style="cursor:pointer;border:0;background:url(http://cdn.huanleguang.com/img/hlg/v3/nav-left/page_suggest_btn.png) 0px 0px no-repeat;width:69px;height:30px; " type="button" name="" value=""><input class="cancle" style="margin-left:10px;background:url(http://cdn.huanleguang.com/img/hlg/v3/nav-left/page_suggest_btn.png) 0px -30px no-repeat;border:0;width:69px;height:30px;cursor:pointer;" type="button" name="" value="" ></div></div></form></div>'
								window.suggestDialog.set('bodyContent',cont);	
								window.suggestDialog.render();
								window.suggestDialog.show();
								DOM.val('#J_Suggest_Shopnick',DOM.val('#J_ShopNick'));
								DOM.style('.ks-ext-close',{top:'18px'});
								DOM.style('.ks-stdmod-header',{background:'#FFFFFF',border:'0',height:'50px',margin:'0px 20px',padding:'0'});
								DOM.style('.ks-dialog',{border:'0',top:'expression(eval(document.documentElement.scrollTop+document.documentElement.clientHeight))','z-index':'19999'});
								editor = S.Editor('#J_Suggest_Content',{
									attachForm : true,
									baseZIndex : 10000,
									focus: false,
									pluginConfig:{
									   	"resize": {
								       	//只能在y轴拖放，[“x”,”y”]表示任意拖放
								       	direction: ["y"]
								   		 },
									    "image": {
									        //上传图片配置, 不需要上传功能可不配置
									        upload: {
									            //返回格式
									            //正确：{"imgUrl":"http://xx.com/yy.jpg"}
									            //错误：{"error":"i am error!"}
									            //接受图片的服务器
									            //发送一个文件过去, 格式为 multipart/form-data
									            serverUrl: uploadImgURL,
									            //传给服务器的格外参数, 是函数则传递函数执行结果
									            serverParams: {
									                yy: function () {
									                    return "xx";
									                }
									            },
									            //后缀名白名单
									            suffix: "png,jpg,jpeg,gif",
									            // 传递给server的文件域名字
									            fileInput: "Filedata",
									            //限制上传的文件大小, 单位KB,
									            //无法客户端限制, 只能作为提示信息
									            sizeLimit: 1000
									        }
									    }
									}
								}).use("elementpaths," +
										"sourcearea,preview," +
										"checkbox-sourcearea," +
										"undo,separator," +
										"font,format,color,separator," +
										"list,indent," +
										"justify,separator,link," +
										"image," +
										"smiley,resize," +
										"draft," +
										"dragupload");

							}else{
								window.suggestDialog.show();
								DOM.val('#J_Suggest_Title','');
								var html ="";
								editor.setData(html);
								DOM.addClass("#J_SubmitPost","clickable");
							}
							Event.remove('#J_SubmitPost');
							var timeFunName = null;
							Event.on('#J_SubmitPost','click dblclick',function(ev){
								if(ev.type == 'click'){
									clearTimeout(timeFunName);
									timeFunName = setTimeout(function () {
										editor.sync();
										ParamsErrorBox = KISSY.one('#J_Suggest_ParamsErrorBox');
						    	    	var title = DOM.val('#J_Suggest_Title');
						    	    	
						    	    	var shop_nick = DOM.val('#J_Suggest_Shopnick');
						    	    	var content = DOM.val('#J_Suggest_Content');
						    	    	if(title == "" || title == "undefined"){
						    	    		DOM.html('#J_Suggest_ParamsErrorMsg','标题不能为空');
						    	    		if (ParamsErrorBox.css("display")==="none") {
						    	    			ParamsErrorBox.slideDown();														
											}
						    	    		S.later(function(){
						    	    			DOM.hide('#J_Suggest_ParamsErrorBox');
											},2000,false);
											return;
										}
						    	    	if(shop_nick == "" || shop_nick == "undefined"){
						    	    		DOM.html('#J_Suggest_ParamsErrorMsg','旺旺不能为空');
						    	    		if (ParamsErrorBox.css("display")==="none") {
												ParamsErrorBox.slideDown();														
											}
						    	    		S.later(function(){
						    	    			DOM.hide('#J_Suggest_ParamsErrorBox');
											},2000,false);
											return;
										}
						    	    	if(content == "" || content == "undefined"){
						    	    		DOM.html('#J_Suggest_ParamsErrorMsg','内容不能为空');
						    	    		if (ParamsErrorBox.css("display")==="none") {
												ParamsErrorBox.slideDown();														
											}	
						    	    		S.later(function(){
						    	    			DOM.hide('#J_Suggest_ParamsErrorBox');
											},2000,false);
											return;
										}
						    	    	if(DOM.hasClass("#J_SubmitPost","clickable")){
											var submitHandle = function(o) {
												ParamsSucessBox = KISSY.one('#J_Suggest_ParamsSucessBox');
												DOM.html('#J_Suggest_ParamsSucessMsg','提交成功！');
												if (ParamsSucessBox.css("display")==="none") {
													ParamsSucessBox.slideDown();														
												}	
												S.later(function(){
													DOM.hide('#J_Suggest_ParamsSucessBox');
													window.suggestDialog.hide();
												},1000,false);
												DOM.removeClass("#J_SubmitPost","clickable");
								    	    };
								    	    var errorHandle = function(o){	
								    	    };
								    	    var data ='';
											new H.widget.asyncRequest().setURI(suggestUrl).setMethod("POST").setForm('#J_SuggestAddForm').setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
						    	    	}
							    	    
									},300);
								} 
								if(ev.type == 'dblclick'){
									clearTimeout(timeFunName); 
									//console.log('双击');
									editor.sync();
									ParamsErrorBox = KISSY.one('#J_Suggest_ParamsErrorBox');
					    	    	var title = DOM.val('#J_Suggest_Title');
					    	    	
					    	    	var shop_nick = DOM.val('#J_Suggest_Shopnick');
					    	    	var content = DOM.val('#J_Suggest_Content');
					    	    	if(title == "" || title == "undefined"){
					    	    		DOM.html('#J_Suggest_ParamsErrorMsg','标题不能为空');
					    	    		if (ParamsErrorBox.css("display")==="none") {
					    	    			ParamsErrorBox.slideDown();														
										}
					    	    		S.later(function(){
					    	    			DOM.hide('#J_Suggest_ParamsErrorBox');
										},2000,false);
										return;
									}
					    	    	if(shop_nick == "" || shop_nick == "undefined"){
					    	    		DOM.html('#J_Suggest_ParamsErrorMsg','旺旺不能为空');
					    	    		if (ParamsErrorBox.css("display")==="none") {
											ParamsErrorBox.slideDown();														
										}
					    	    		S.later(function(){
					    	    			DOM.hide('#J_Suggest_ParamsErrorBox');
										},2000,false);
										return;
									}
					    	    	if(content == "" || content == "undefined"){
					    	    		DOM.html('#J_Suggest_ParamsErrorMsg','内容不能为空');
					    	    		if (ParamsErrorBox.css("display")==="none") {
											ParamsErrorBox.slideDown();														
										}	
					    	    		S.later(function(){
					    	    			DOM.hide('#J_Suggest_ParamsErrorBox');
										},2000,false);
										return;
									}
					    	    	if(DOM.hasClass("#J_SubmitPost","clickable")){
										var submitHandle = function(o) {
											ParamsSucessBox = KISSY.one('#J_Suggest_ParamsSucessBox');
											DOM.html('#J_Suggest_ParamsSucessMsg','提交成功！');
											if (ParamsSucessBox.css("display")==="none") {
												ParamsSucessBox.slideDown();														
											}	
											S.later(function(){
												DOM.hide('#J_Suggest_ParamsSucessBox');
												window.suggestDialog.hide();
											},1000,false);
											DOM.removeClass("#J_SubmitPost","clickable");
							    	    };
							    	    var errorHandle = function(o){	
							    	    };
							    	    var data ='';
										new H.widget.asyncRequest().setURI(suggestUrl).setMethod("POST").setForm('#J_SuggestAddForm').setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
					    	    	}
									
								}
							});
							Event.on('.cancle','click',function(){
								window.suggestDialog.hide();
							});
							
						});
						
						
			 	 });

	})		
})
	
