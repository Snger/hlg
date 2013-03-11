/**
 * @fileOverview 
 * @author  
 */
KISSY.add(function (S,showPages) {
    // your code here
    	var DOM = S.DOM, Event = S.Event;	
		return promodesc = {
			    	paginator : null,
			    	promodescItemPaginator : null,
			    	itemCache : null,
			    	promodescItemCache : null,
			    	panel : null,
			    	msg : null,
			    	init : function() {
						Event.on(doc, 'keydown', function(evt) {
							if ( evt.which === 13) {
								if(promodesc.promodescItemPaginator){
									promodesc.promodescItemPaginator.toPage(promodesc.promodescItemPaginator.page);
								}else{
									promodesc.loadPromotionItems();
								}
							}
						})	
			    	    Event.on('#J_RightSearchBtn','click',promodesc.loadPromotionItems); //搜索活动中宝贝
			    	    Event.on('#J_RightCheckAll','click',promodesc.rightCheckAll); //活动中宝贝全选
			    	    Event.on('#J_RemovePromotionItems','click',promodesc.removePromotionItemHandle); //从活动中移除宝贝
			        },
					//活动中宝贝全选
					rightCheckAll : function(e) {
						checkBoxs = DOM.query('#J_PromotionItemList .J_CheckBox');
						var len = checkBoxs.length;
						for(i=0; i<len; i++){
							var iid = checkBoxs[i].value;
							if(checkBoxs[i].disabled) continue;
							if(this.checked){
								checkBoxs[i].checked = true;
							} else {
								checkBoxs[i].checked = false;
							}
						}
					},
			        
					//搜索活动中宝贝
			    	loadPromotionItems :function() {
				    	var submitHandle = function(o) {
			        	    totalRecords = o.payload.totalRecords;
			        	    if(totalRecords > 0){
								DOM.get('#J_REmpty').style.display = 'none';	
								DOM.css(DOM.query(".J_PromotionItemBtnHolder"),'display', '');
							} else {
								DOM.get('#J_REmpty').style.display = '';
								DOM.css(DOM.query(".J_PromotionItemBtnHolder"),'display', 'none');
							}
			        	    DOM.html(DOM.get("#J_PromotionItemList"), o.payload.body,true);
							DOM.hide('#J_RightLoading');
					        DOM.show('#J_MainRightContent');
			        	    pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
			        	    promodesc.paginator = new showPages('promodesc.paginator').setRender(promodesc.promodescItemPaginationHandle).setPageCount(pageCount).printHtml('#J_TopPaging',3);
							promodesc.promodescItemPaginator = new showPages('promodesc.promodescItemPaginator').setRender(promodesc.promodescItemPaginationHandle).setPageCount(pageCount).printHtml('#J_PromotionItemPaging',2);
				    	};
				   		 if(DOM.val(DOM.get("#J_RightSearchTitle")) != '关键字、商品链接、商品编码'){
			    	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_RightSearchTitle"))); //标题
			    	    }else{
			    	    	var title ='';
			    	    }
		        	    var status = DOM.val(DOM.get('#J_SearchStatus'));
		        	    var itemPage = DOM.val(DOM.get("#J_SelectItemPage"));//每页多少条
		        	    var data = "promo_id="+pid+"&status="+status+"&q="+title+"&pageSize="+itemPage;
						DOM.show('#J_RightLoading');
					    DOM.hide('#J_MainRightContent');
		        	    new H.widget.asyncRequest().setURI(loadPromotionItemsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
					},
					
					promodescItemPaginationHandle : function(turnTo) {
						pageId = turnTo;
			    		var submitHandle = function(o) {
			    			DOM.get("#J_RightCheckAll").checked = false;
			    			totalRecords = o.payload.totalRecords;
			    			 if(totalRecords > 0){
									DOM.get('#J_REmpty').style.display = 'none';	
									DOM.css(DOM.query(".J_PromotionItemBtnHolder"),'display', '');
								} else {
									DOM.get('#J_REmpty').style.display = '';
									DOM.css(DOM.query(".J_PromotionItemBtnHolder"),'display', 'none');
								}
				    		pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
				    		promodesc.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_TopPaging',3);
			    			promodesc.promodescItemPaginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_PromotionItemPaging',2);
			    			DOM.html(DOM.get("#J_PromotionItemList"), o.payload.body);
							DOM.hide('#J_RightLoading');
					    	DOM.show('#J_MainRightContent');
				    	};
						DOM.show('#J_RightLoading');
					    DOM.hide('#J_MainRightContent');
				    		 if(DOM.val(DOM.get("#J_RightSearchTitle")) != '关键字、商品链接、商品编码'){
				    	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_RightSearchTitle"))); //标题
				    	    }else{
				    	    	var title ='';
				    	    }
			        	    var itemPage = DOM.val(DOM.get("#J_SelectItemPage"));//每页多少条
			        	    var status = DOM.val(DOM.get('#J_SearchStatus'));
			        	    var data = "promo_id="+pid+"&status="+status+"&q="+title+"&page_id="+pageId+"&pageSize="+itemPage;
			        	    new H.widget.asyncRequest().setURI(loadPromotionItemsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
					},
					//将活动中宝贝移除
					removePromotionItemHandle : function(promo_itemid,pidi,type) {
						if(!showPermissions('editor_promodesc','促销详情')){
							return ;
						}
						DOM.attr('#J_RemovePromotionItems','disabled',true);
						DOM.replaceClass('#J_RemovePromotionItems','btm-caozuo-orange','btm-caozuo-gray-none');
						itemIds = [];
						if(promo_itemid && pidi){
							itemIds.push(promo_itemid);
							pid = pidi;
						}else{
							checkBoxs = DOM.query("#J_PromotionItemList .J_CheckBox");
							var len = checkBoxs.length;
							for(i=0; i<len; i++){
			                    if(checkBoxs[i].checked && !checkBoxs[i].disabled){
			                    	itemIds.push(checkBoxs[i].value);
			                    }
							}
						}
						if(itemIds.length == 0){
							new H.widget.msgBox({
								    title:"错误提示",
								    content:'未选择任何宝贝！',
								    type:"error",
									autoClose:true,
									timeOut :2000
								
								});
							DOM.attr('#J_RemovePromotionItems','disabled',false);
						    DOM.replaceClass('#J_RemovePromotionItems','btm-caozuo-gray-none','btm-caozuo-orange');
							return ;
						}
						
						var submitHandle = function(o) {
							DOM.attr('#J_RemovePromotionItems','disabled',false);
						    DOM.replaceClass('#J_RemovePromotionItems','btm-caozuo-gray-none','btm-caozuo-orange');
		        			if(promodesc.promodescItemPaginator){
								promodesc.promodescItemPaginator.toPage(promodesc.promodescItemPaginator.page);
							}else{
								promodesc.loadPromotionItems();
							}
							
		        	    };
		        	    var data = "pid="+pid+"&item_ids="+itemIds+"&form_key="+FORM_KEY;
		        	    new H.widget.asyncRequest().setURI(removePromotionItemUrl).setMethod("POST").setHandle(submitHandle).setData(data).send();
					},
					
					forceDelItem :function(itemId){
						var submitHandle = function(o) {
							promodesc.msg.hide();
							if(promodesc.promodescItemPaginator){
								promodesc.promodescItemPaginator.toPage(promodesc.promodescItemPaginator.page);
							}else{
								promodesc.loadPromotionItems();
							}
						};
						var data = "promo_item_id="+itemId;
						promodesc.msg = new H.widget.msgBox({
								    title:"",
									dialogType : 'loading',
								    content:'正在处理中，请稍候'	
								});
		        	    new H.widget.asyncRequest().setURI(forceDelUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
					},
					retry : function(itemId,force){
						var submitHandle = function(o) {
							promodesc.msg.hide();
							if(promodesc.promodescItemPaginator){
								promodesc.promodescItemPaginator.toPage(promodesc.promodescItemPaginator.page);
							}else{
								promodesc.loadPromotionItems();
							}
						};
						var data = "promo_item_id="+itemId+"&force="+force;
						promodesc.msg = new H.widget.msgBox({
								    title:"",
									dialogType : 'loading',
								    content:'正在处理中，请稍候'	
								});
		        	    new H.widget.asyncRequest().setURI(retryUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
					}
			}
}, {
    requires: ['utils/showPages/index']
});