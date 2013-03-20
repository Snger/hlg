/**
 * @fileOverview 
 * @author  
 */
KISSY.add(function (S,showPages) {
	
	var S= KISSY,DOM = S.DOM, Event = S.Event;
	return addPromoUser = {
	    	paginator : null,
			rightPaginator : null,
	    	msg :null,
			tabs : null,
	    	isFisrst : true,
	    	init : function() {
				Event.on("#J_TopCheckAll", "click", addPromoUser.checkAll);
				Event.on("#J_TopRightCheckAll", "click", addPromoUser.RcheckAll);
				
				Event.on("#J_LeftSearch", "click", function(){
					addPromoUser.searchTbItems();
				});
				Event.on("#J_RightFresh", "click", function(){
					addPromoUser.searchTbItems();
				});
				Event.on("#J_RightSearch", "click", function(){
						addPromoUser.searchRightItems();
				});
				Event.delegate(document,'click dblclick','#J_TopAddItems',function(){
					addPromoUser.addSelectNotice('member');
				});
				Event.delegate(document,'click dblclick','#J_TopAddItems2',function(){
					addPromoUser.addSelectNotice('order');
				});
				addPromoUser.maxNum = DOM.val('#J_MaxNum');
				//tab3发送
				Event.delegate(document, 'click', '#J_CareSave', function(ev){
				
					var data = DOM.val('#J_Status');
					var tem = '昵称：'+DOM.val('#J_Nickname')+' ，姓名：'+DOM.val('#J_Name')+' ，手机号码：'+DOM.val('#J_Phone');
					var Nickname = DOM.val('#J_Nickname');
					var Name = DOM.val('#J_Name');
					var Phone = DOM.val('#J_Phone');
					if(Nickname == '' || Name == '' || Phone == ''){						
						DOM.show('#J_MsgErrorBox');
						return;
					}else{
						DOM.hide('#J_MsgErrorBox');
					}
					if(Phone.search(/^(1(3|5|8)+\d{9})$/) == -1){
						DOM.html('#J_ErrorMsg','手机号格式有误，请重新输入！');
						DOM.show('#J_MsgErrorBox');
						return;
					}
					addPromoUser.notice(Nickname,Name,Phone,'hand');
				});
				
				addPromoUser.tabs = new S.Tabs('#wrapper',{
					triggerType: 'click',
					contentCls:'main-content',
					activeTriggerCls: 'current'	
				}).on('switch',function(ev){
							var index = ev.currentIndex;
							
							if (index == 0) {
								if (addPromoUser.paginator) {
									addPromoUser.paginator.toPage(addPromoUser.paginator.page);
								}else {
									addPromoUser.searchTbItems();
								}
							}else{
								addPromoUser.searchRightItems();
							}
				})
				addPromoUser.searchTbItems();
	        },
			 checkAll : function(e) {
				checkBoxs = DOM.query("#J_TbItemList .J_CheckBox");
				len = checkBoxs.length;
				for(i=0; i<len; i++){
					var iid = checkBoxs[i].value;
					if(checkBoxs[i].disabled) continue;
					if(this.checked){
						checkBoxs[i].checked = true;
			    		//DOM.addClass('#J_TbItem_'+iid,'selected');
					} else {
						//DOM.removeClass('#J_TbItem_'+iid,'selected');
						checkBoxs[i].checked = false;
					}
				}
			},
			RcheckAll : function(e) {
				checkBoxs = DOM.query("#J_RightTbItemList .J_CheckBox");
				len = checkBoxs.length;
				for(i=0; i<len; i++){
					var iid = checkBoxs[i].value;
					if(checkBoxs[i].disabled) continue;
					if(this.checked){
						checkBoxs[i].checked = true;
			    		//DOM.addClass('#J_TbItem_'+iid,'selected');
					} else {
						//DOM.removeClass('#J_TbItem_'+iid,'selected');
						checkBoxs[i].checked = false;
					}
				}
			},
	         searchTbItems : function() {
		        
	            var submitHandle = function(o) {
					DOM.hide('#J_LeftLoading');
					DOM.show('#J_MainLeftContent');
	        	    totalRecords = o.payload.totalRecords;
					if(totalRecords > 0){
						DOM.css(DOM.get('#J_LEmpty') ,'display','none');
						DOM.css(DOM.query(".J_TbExt") ,'display' , '');
					} else {
						DOM.css(DOM.get('#J_LEmpty'), 'display' , '');
						DOM.css(DOM.query(".J_TbExt") , 'display' , 'none');
					}
					addPromoUser.renderItems(o.payload.body);
					var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					   var oTriggers = DOM.query('#J_TbItemList .J_CheckBox');
		                Event.on(oTriggers, "click", function(ev){
							if(!this.checked){
								DOM.attr('#J_TopCheckAll','checked',false);
							}
						});
					addPromoUser.paginator = new showPages('addPromoUser.paginator').setRender(addPromoUser.handlePagination).setPageCount(pageCount).printHtml('#J_Paging',2);
					addPromoUser.paginator = new showPages('addPromoUser.paginator').setRender(addPromoUser.handlePagination).setPageCount(pageCount).printHtml('#J_TopPaging',3);
					
	    	    };
	    	    var data = addPromoUser.getData();
	 			DOM.show('#J_LeftLoading');
				DOM.hide('#J_MainLeftContent');
	    	    new H.widget.asyncRequest().setURI(loadMemberFromCrmUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			renderItems: function(c) {
	    	    DOM.html(DOM.get("#J_TbItemList"), c);
	        	
			},
	    	handlePagination : function(turnTo) {
				DOM.attr("#J_TopCheckAll", "checked", false);
		    	pageId = turnTo;
	    		var submitHandle = function(o) {
	    			 totalRecords = o.payload.totalRecords;
	 				if(totalRecords > 0){
	 					DOM.css(DOM.get('#J_LEmpty') ,'display','none');
	 					DOM.css(DOM.query(".J_TbExt") ,'display' , '');
	 				} else {
	 					DOM.css(DOM.get('#J_LEmpty'), 'display' , '');
	 					DOM.css(DOM.query(".J_TbExt") , 'display' , 'none');
	 				}
	 				var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
	 				addPromoUser.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_Paging',2);
	 				addPromoUser.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_TopPaging',3);
	 				
					addPromoUser.renderItems(o.payload.body);
					   var oTriggers = DOM.query('#J_TbItemList .J_CheckBox');
		                Event.on(oTriggers, "click", function(ev){
							if(!this.checked){
								DOM.attr('#J_TopCheckAll','checked',false);
							}
						});
	 				DOM.hide('#J_LeftLoading');
					DOM.show('#J_MainLeftContent');
		    	};
		    	var data = addPromoUser.getData();
				data +="&page_id="+pageId
				DOM.show('#J_LeftLoading');
				DOM.hide('#J_MainLeftContent');
	    	    new H.widget.asyncRequest().setURI(loadMemberFromCrmUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			getData : function(){
    	    	if(DOM.val(DOM.get("#J_SearchNick")) != '输入旺旺名称'){
   	    	    	var nick = encodeURIComponent(DOM.val(DOM.get("#J_SearchNick"))); //标题
   	    	    }else{
   	    	    	var nick ='';
   	    	    }
   	    	    var data = "nick="+nick;
   	    	    if(DOM.val(DOM.get("#J_SearchName")) != '输入姓名'){
   	    	    	var name = encodeURIComponent(DOM.val(DOM.get("#J_SearchName"))); //标题
   	    	    }else{
   	    	    	var name ='';
   	    	    }
   	    	    data += "&name="+name;
				var shen = DOM.val('#a1');
				var shi = DOM.val('#a2');
				if(shen == 0){
					data += "&state="+encodeURIComponent('全部')+"&city="+encodeURIComponent('全部');
				}else if(shi ==0){
						data += "&state="+encodeURIComponent(window.link.data[''+shen+''][0])+"&city="+encodeURIComponent('全部');
				}else{
					data += "&state="+encodeURIComponent(window.link.data[''+shen+''][0])+"&city="+encodeURIComponent(window.link.data[''+shi+''][0]);
				}
				data+="&pageSize=100";
		        return data;  
			},
			//立即通知
			notice : function(buyer_nick,buyer_name,mobile,from){
				var typeId = DOM.val('#J_CareId');
				if(buyer_nick == ''){
					new H.widget.msgBox({
					    title:"错误提示",
					    content:'用户昵称不能为空',
					    type:"error",
						autoClose : true,
						timeOut : 3000
					});
					return;
				}
				if(buyer_name == ''){
					new H.widget.msgBox({
					    title:"错误提示",
					    content:'用户昵称不能为空',
					    type:"error",
						autoClose : true,
						timeOut : 3000
					});
					return;
				}
				if(mobile == ''){
					new H.widget.msgBox({
					    title:"错误提示",
					    content:'用户昵称不能为空',
					    type:"error",
						autoClose : true,
						timeOut : 3000
					});
					return;
				}
				var json = [];
				var o = '{"buyer_nick":"'+buyer_nick + '","buyer_name":"'+ buyer_name + '", "mobile":"' + mobile + '"}';
				o = eval('(' + o + ')');						
				json.push(o);
				var itemsJson = KISSY.JSON.stringify(json);
				var data = "typeId="+typeId+"&items="+itemsJson+"&form_key="+FORM_KEY+"&from="+from;
	            var submitHandle = function(o) {
	            	DOM.prop('#J_CheckBox_'+mobile,'disabled','disabled');
	            	DOM.prop('#J_CheckBox_'+mobile,'checked','checked');
	            	DOM.html('#J_Care_'+mobile,'已通知');
	            	if(from == 'hand'){
						DOM.val('#J_Nickname','');
						DOM.val('#J_Name','');
						DOM.val('#J_Phone','');
	            	}
//	            	addPromoUser.msg.setMsg('通知成功').show();
//					addPromoUser.msg.hide(800);	
	    	    };
	    	    var errorHandle = function(o) {
					new H.widget.msgBox({
					    title:"错误提示",
					    content:o.desc,
					    type:"error",
						autoClose : true,
						timeOut : 3000
					});
	        	};
	    	    new H.widget.asyncRequest().setURI(addMembersToPromoUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
	
			},
			//批量通知
			addSelectNotice : function(from){
				new H.widget.msgBox({
				    title:"提示",
				    content:'系统正在处理中。。。',
				    type:"info",
					autoClose : true,
					timeOut : 3000
				});
				var typeId = DOM.val('#J_CareId');
				
				if(from == 'order'){
					var checkBoxs = DOM.query('#J_RightTbItemList .J_CheckBox');
				}else if(from == 'member'){
					var checkBoxs = DOM.query('#J_TbItemList .J_CheckBox');
				}
				var len = checkBoxs.length;
				var m=0;
				var json = [];
				for(i=0; i<len; i++){
					if(checkBoxs[i].checked && !checkBoxs[i].disabled){
						id = checkBoxs[i].value;
						var buyer_nick = DOM.html(DOM.get('#J_Nick_'+id));
						var buyer_name = DOM.html(DOM.get('#J_Name_'+id));
						var mobile = id;
						var o = '{"buyer_nick":"'+buyer_nick + '","buyer_name":"'+ buyer_name + '", "mobile":"' + mobile + '"}';
						o = eval('(' + o + ')');						
						json.push(o);
						m++;
					}
				}
				if(m == 0){
					new H.widget.msgBox({
					    title:"错误提示",
					    content:'未选择任何买家',
					    type:"error",
						autoClose : true,
						timeOut : 3000
					});
					return;
				}
				var itemsJson = KISSY.JSON.stringify(json);
				var data = "typeId="+typeId+"&items="+itemsJson+"&form_key="+FORM_KEY+"&from="+from;
				var submitHandle = function(o) {
					for(i=0; i<len; i++){
						if(checkBoxs[i].checked && !checkBoxs[i].disabled){
							id = checkBoxs[i].value;
							DOM.prop('#J_CheckBox_'+id,'disabled','disabled');
			            	DOM.prop('#J_CheckBox_'+id,'checked','checked');
			            	DOM.html('#J_Care_'+id,'已通知');
						}
					}
//					addPromoUser.msg.setMsg('通知成功').show();
//					addPromoUser.msg.hide(800);	
				};
				var errorHandle = function(o) {
					new H.widget.msgBox({
					    title:"错误提示",
					    content:o.desc,
					    type:"error",
						autoClose : true,
						timeOut : 3000
					});
				};
				new H.widget.asyncRequest().setURI(addMembersToPromoUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
				
			},
			
			searchRightItems : function() {
		        
	            var submitHandle = function(o) {
					DOM.hide('#J_RightLoading');
					DOM.show('#J_MainRightContent');
	        	    totalRecords = o.payload.totalRecords;
					if(totalRecords > 0){
						DOM.css(DOM.get('#J_REmpty') ,'display','none');
						DOM.css(DOM.query(".J_RightExt") ,'display' , '');
					} else {
						DOM.css(DOM.get('#J_REmpty'), 'display' , '');
						DOM.css(DOM.query(".J_RightExt") , 'display' , 'none');
					}
					addPromoUser.renderRightItems(o.payload.body);
					var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					
					addPromoUser.rightPaginator = new showPages('addPromoUser.rightPaginator').setRender(addPromoUser.RhandlePagination).setPageCount(pageCount).printHtml('#J_RightTopPaging',3);
					addPromoUser.rightPaginator = new showPages('addPromoUser.rightPaginator').setRender(addPromoUser.RhandlePagination).setPageCount(pageCount).printHtml('#J_RightPaging',2);
	    	    };
	    	    var data = addPromoUser.getRightData();
	 			DOM.show('#J_RightLoading');
				DOM.hide('#J_MainRightContent');
	    	    new H.widget.asyncRequest().setURI(loadMemberFromOrderUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			renderRightItems: function(c) {
	    	    DOM.html(DOM.get("#J_RightTbItemList"), c);
	        	
			},
	    	RhandlePagination : function(turnTo) {
		    	pageId = turnTo;
	    		var submitHandle = function(o) {
	    			 totalRecords = o.payload.totalRecords;
	 				if(totalRecords > 0){
						DOM.css(DOM.get('#J_REmpty') ,'display','none');
						DOM.css(DOM.query(".J_RightExt") ,'display' , '');
					} else {
						DOM.css(DOM.get('#J_REmpty'), 'display' , '');
						DOM.css(DOM.query(".J_RightExt") , 'display' , 'none');
					}
	 				var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					addPromoUser.rightPaginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_RightTopPaging',3);
	 				addPromoUser.rightPaginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_RightPaging',2);
	 				addPromoUser.renderRightItems(o.payload.body);
	 				DOM.hide('#J_RightLoading');
					DOM.show('#J_MainRightContent');
		    	};
		    	var data = addPromoUser.getRightData();
				data +="&page_id="+pageId
				DOM.show('#J_RightLoading');
				DOM.hide('#J_MainRightContent');
	    	    new H.widget.asyncRequest().setURI(loadMemberFromOrderUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			getRightData : function(){
				
   	    	    var name = encodeURIComponent(DOM.val(DOM.get("#J_RightSearchNick"))); //标题
   	    	    data = "nick="+name;
				var page_size = DOM.val(DOM.get("#J_RightSelectItemPage"))
				var end_date = DOM.val('#J_endDate');
				var start_date = DOM.val('#J_startDate');
				data+="&pageSize="+page_size+"&start_date="+start_date+"&end_date="+end_date;
				
		        return data;  
			},
			//tab3上传
			save : function(){
				var postListParams = addPromoUser.generatePostTemple();
				
				if(addPromoUser.checkParams(postListParams)==true){
					return;
				}
				var listParamsJson = KISSY.JSON.stringify(postListParams);
				var careId = DOM.val('#J_CareId');
				var careType = DOM.val('#J_Type');
				ParamsErrorBox = KISSY.one('#J_ParamsErrorBox');
				ParamsSucessBox = KISSY.one('#J_ParamsSucessBox');
//				addPromoUser.msg.setMsg('正在提交中，请稍候').show();
		  		var sucessHandle = function(o) {
					ParamsErrorBox.hide();
					DOM.html('#J_ParamsSucessMsg','设置成功');
					if (ParamsSucessBox.css("display")==="none") {
						ParamsSucessBox.slideDown();
					}
//		  			addPromoUser.msg.hide(800);
		 		};
		 		var errorHandle = function(o){
		 			ParamsSucessBox.hide();
		 			DOM.html('#J_ParamsErrorMsg',o.desc);
					if (ParamsErrorBox.css("display")==="none") {
						ParamsErrorBox.slideDown();
					}
					return ;			 			
		 		};
		 		var data = 'type='+careType+'&care_id='+careId+'&templets='+listParamsJson
		  	    new H.widget.asyncRequest().setURI(saveCareUrl).setMethod("POST").setHandle(sucessHandle).setErrorHandle(errorHandle).setData(data).send();
		 		location.reload();
				return true;
				
			}

	}
   
}, {
    requires: ['utils/showPages/index']
});