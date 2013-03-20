KISSY.add(function(S,showPages){
	var S = KISSY,DOM = S.DOM,Event = S.Event;
	return specifyList = {
			msg :null ,
			isLoad : false,
			paginator:null,
			init : function(){
				specifyList.run();
			},
			//搜索活动中宝贝
			run : function() {
				specifyList.searchTbItems();
				Event.on('#J_SelectItemCid',"change",function(S){
					specifyList.searchTbItems();
				});
				Event.on('#J_SearchBtn',"click",function(S){
					specifyList.searchTbItems();
				});
			},
	 		searchTbItems : function() {
	            var submitHandle = function(o) {
					DOM.hide('#J_RightLoading');
					DOM.show('#J_MainRightContent');
	        	    totalRecords = o.payload.totalRecords;
					DOM.css(DOM.get('#J_NoteIcon') ,'display','none');
					if(totalRecords > 0){
						DOM.css(DOM.get('#J_REmpty') ,'display','none');
						DOM.css(DOM.query(".J_PromotionItemBtnHolder") ,'display' , '');
					} else {
						DOM.css(DOM.get('#J_REmpty'), 'display' , '');
						DOM.css(DOM.query(".J_PromotionItemBtnHolder") , 'display' , 'none');
						DOM.css(DOM.query(".J_ControlBtm") , 'display' , 'none');
					}
					DOM.html('#J_PromotionItemList' ,o.payload.body);
					var oTriggers = DOM.query('#J_PromotionItemList .J_CheckBox');
					selectItemNum = 0;
					changeItemId = '';
	                Event.on(oTriggers,'click', function(ev){
						if(!this.checked){
							DOM.attr('#J_TCheckAll','checked',false);
						} 
					});
					var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					specifyList.paginator = new showPages('specifyList.paginator').setRender(specifyList.handlePagination).setPageCount(pageCount).printHtml('#J_BottomPaging',2);
	    	    };
	        	 if(DOM.val(DOM.get("#J_SearchTitle")) != '关键字、商品链接、商品编码'){
	    	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle"))); //标题
	    	    }else{
	    	    	var title ='';
	    	    }
				var itemPage = 10;//每页多少条
	   	    	var data = "recommend="+recommend+"&q="+title+"&pageSize="+itemPage;
	 			DOM.show('#J_RightLoading');
				DOM.hide('#J_MainRightContent');
	    	    new H.widget.asyncRequest().setURI(getItemsFromTbUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
	    	handlePagination : function(turnTo) {
		    	pageId = turnTo;
	    		var submitHandle = function(o) {
					DOM.hide('#J_RightLoading');
					DOM.show('#J_MainRightContent');
	        	    totalRecords = o.payload.totalRecords;
					DOM.css(DOM.get('#J_NoteIcon') ,'display','none');
					if(totalRecords > 0){
						DOM.css(DOM.get('#J_REmpty') ,'display','none');
						DOM.css(DOM.query(".J_PromotionItemBtnHolder") ,'display' , '');
					} else {
						DOM.css(DOM.get('#J_REmpty'), 'display' , '');
						DOM.css(DOM.query(".J_PromotionItemBtnHolder") , 'display' , 'none');
					}
					DOM.html('#J_PromotionItemList' ,o.payload.body);

					if(!specifyList.checkBoxs){
						var checkBoxs = DOM.query('#J_PromotionItemList .J_CheckBox');
					}else{
						var checkBoxs = specifyList.checkBoxs;
					}
					var len = checkBoxs.length;
					var changeItemIdArray = changeItemId.split(',');
					for(var x=0;x<len;x++){
						for(var y=0;y<changeItemIdArray.length;y++){
							if(changeItemIdArray[y] == checkBoxs[x].value){
								checkBoxs[x].checked = true;
							}
						}
					}
					var oTriggers = DOM.query('#J_PromotionItemList .J_CheckBox');
					Event.on(oTriggers,'click', function(ev){
						if(!this.checked){
							DOM.attr('#J_TCheckAll','checked',false);
						} 
					});
					var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					specifyList.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_BottomPaging',2);
		    	};
		    	 if(DOM.val(DOM.get("#J_SearchTitle")) != '关键字、商品链接、商品编码'){
	    	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle"))); //标题
	    	    }else{
	    	    	var title ='';
	    	    }
				var itemPage = 10;//每页多少条
	   	    	var data = "recommend="+recommend+"&q="+title+"&pageSize="+itemPage+"&page_id="+pageId;
		        DOM.show('#J_RightLoading');
				DOM.hide('#J_MainRightContent');
				if(DOM.attr('#J_TCheckAll','checked')){
					DOM.prop('#J_TCheckAll','checked',false);
				}
	    	    new H.widget.asyncRequest().setURI(getItemsFromTbUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			swRJCheck : function(el){
					if(el.checked){
						S.each(S.all(".RJ_CheckBox"), function(item, i) {
							if(DOM.attr(item,'disabled')!='disabled'){
								DOM.attr(item,'checked', true);
							}
						 });
						DOM.attr("#RJ_CheckAll",'checked',true);
						DOM.attr("#RJ_CheckAll-b",'checked',true);
					}else{
						S.each(S.all(".RJ_CheckBox"), function(item, i) {
							if(DOM.attr(item,'disabled')!='disabled'){
								DOM.attr(item,'checked', false);
							}
						 });
						DOM.attr("#RJ_CheckAll",'checked',false);
						DOM.attr("#RJ_CheckAll-b",'checked',false);
					}
				},
				delItemFromSpecify : function(itemId){
					if(!showPermissions('editor_tool','工具箱')){return ;}
					specifyList.msg = new H.widget.msgBox({
														    title:"",
															dialogType : 'loading',
														    content:'系统正在处理'	
														});
					var items = new Array();
					items.push({itemId:itemId});
					DOM.html("#r-del-item-msg",'');
					items = JSON.stringify(items);
					specifyList.ajaxPostProcessItems(0, items);
				},
				delItemsFromSpecify : function(){
					if(!showPermissions('editor_tool','工具箱')){return ;}
					specifyList.msg = new H.widget.msgBox({
														    title:"",
															dialogType : 'loading',
														    content:'系统正在处理'	
														});
					var items = new Array();
					S.each(S.all(".RJ_CheckBox"), function(cb, i){
						if(DOM.attr(cb,'checked')==true || DOM.attr(cb,'checked')=='checked'){
							var itemId = DOM.val(cb);
							items.push({itemId:itemId});
						}
					});
					if(items.length == 0){
						specifyList.msg.hide();
	        	    	new H.widget.msgBox({
						    title:"错误提示",
						    content:"未选择任何宝贝",
						    type:"error"
						});
						
						DOM.html("#r-del-item-msg",'<font color="red">您未选择宝贝！</font>');
						return ;
					}
					DOM.html("#r-del-item-msg",'');
					items = JSON.stringify(items);
					specifyList.ajaxPostProcessItems(0, items);
				},
				ajaxPostProcessItems : function(added, items){
					items = encodeURIComponent(items)
					var data = 'isAjax=1&recommend='+recommend+'&added='+added+'&items='+items;
					var ajaxProcessItemsReturnErrorHandle=function(result){
						specifyList.msg.hide();
	        	    	new H.widget.msgBox({
						    title:"错误提示",
						    content:result.desc,
						    type:"error"
						});
						return;
					}
					var ajaxProcessItemsReturnHandle = function(result){
						//alert(JSON.stringify(result));
						var added=result.payload.added;
						var items = result.payload.items;
						if(added=='1'){
							for(var i=0;i<items.length;i++){
								specifyList.addItemProcess(items[i]);
							}
						}else{
							for(var i=0;i<items.length;i++){
								specifyList.delItemProcess(items[i]);
							}
						}
						specifyList.msg.hide();
					}
					new H.widget.asyncRequest().setURI(switchItemsToSpecifyUrl).setMethod("POST").setHandle(ajaxProcessItemsReturnHandle).setErrorHandle(ajaxProcessItemsReturnErrorHandle).setData(data).send();
				},
				addItemProcess : function(item){
					if(recommend=='1') {
						DOM.html('#Ltd-'+item.itemId,'已推荐');
					} else {
						DOM.html('#Ltd-'+item.itemId,'已排除');
					}
					DOM.attr('#Lcb-'+item.itemId,'disabled','disabled');
					DOM.removeAttr('#Lcb-'+item.itemId,'checked');
					if(recommend=='1') {
						DOM.val('#remain_count', parseInt(DOM.val('#remain_count'))-1);
						DOM.html('#rcount', DOM.val('#remain_count'));
					}
				},
				delItemProcess : function(item){
						DOM.remove("#Rtr-"+item.itemId);
						//DOM.val('#groupItemNum', parseInt(DOM.val('#groupItemNum'))-1);
						//DOM.html('#groupItemNumSpan', DOM.val('#groupItemNum'));
				}
	}
}, {
    requires: ['utils/showPages/index']
});