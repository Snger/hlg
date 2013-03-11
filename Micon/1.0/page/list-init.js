/**
 * @fileOverview 
 * @author  
 */
KISSY.add(function (S,showPages) {
	
	var S= KISSY,DOM = S.DOM, Event = S.Event;
	return  iconControl = {
				msg :null ,
				isLoad : false,
				paginator:null,
				init : function() {
					
					Event.delegate(document,'click','.J_BackTo',function(){
						DOM.show('#promoList');
						DOM.show('#J_PromoDetail');
		            	DOM.hide('#itemList');
		            	DOM.hide('#J_BackToPromoList');
					})
					var deleteHandle = function(e) {
							if(!showPermissions('editor_icon','促销图标')){
								return ;
							}
							var pid = DOM.attr(this,'data');
							new H.widget.msgBox({
							    title: "删除活动",
							    content: '系统将为您取消此活动设置的促销信息',
							    type: "confirm",
							    buttons: [{ value: "确定删除" }, { value: "取消" }],
							    success: function (result) {
							        if (result == "确定删除") {
										ev.preventDefault();
										var submitHandle = function(o) {
										  	window.location.href=curentUrl;
										};
										var error = function(o){
											new H.widget.msgBox({
											    title:"错误提示",
											    content:o.desc,
											    type:"error"
											});
										};
										var data = "pid="+pid+"&form_key="+FORM_KEY;
								  		new H.widget.asyncRequest().setURI(deleteUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(error).setData(data).send();
							        }
							    }
							});
					};
					var oTriggers = DOM.query('.J_Delete');
			    	Event.on(oTriggers, "click", deleteHandle);
				},
				//搜索活动中宝贝
		        searchPromoItems : function() {
					if(!iconControl.isLoad){
							iconControl.isLoad = true;
					}
		            var submitHandle = function(o) {
		            	DOM.hide('#promoList');
		            	DOM.hide('#J_PromoDetail');
		            	DOM.show('#itemList');
		            	DOM.show('#J_BackToPromoList');
		        	    totalRecords = o.payload.totalRecords;
						if(totalRecords > 0){
							DOM.get('#J_LEmpty').style.display = 'none';
							DOM.removeClass(DOM.query(".J_PromotionItemBtnHolder"),'ks-hidden');
						} else {
							DOM.get('#J_LEmpty').style.display = '';
							DOM.addClass(DOM.query(".J_PromotionItemBtnHolder"),'ks-hidden');
						}
						DOM.html('#J_PromoItems',o.payload.body);
						pageNum = '12';
						pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
						iconControl.paginator = new showPages('iconControl.paginator').setRender(iconControl.handlePagination).setPageCount(pageCount).printHtml('#J_PromotionItemPaging',2);
						DOM.hide('#J_LeftLoading');
						DOM.show('#J_MainLeftContent');
		    	    };
		    	    var errorHandle = function(o){
		    	    	DOM.show('#promoList');
		    	    	DOM.show('#J_PromoDetail');
		            	DOM.hide('#itemList');
		            	DOM.hide('#J_BackToPromoList');
		            	DOM.hide('#J_LeftLoading');
						DOM.show('#J_MainLeftContent');
							new H.widget.msgBox({
											    title:"错误提示",
											    content:o.desc,
											    type:"error"
											});
		    	    };
		    	    if(DOM.val(DOM.get("#J_SearchTitle")) != '关键字、商品链接、商品编码'){
		    	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle"))); //标题
		    	    }else{
		    	    	var title ='';
		    	    }
		    	    var status = DOM.val(DOM.get("#J_SearchStatus"));
			    	var data = "keytitle="+title+'&status='+status;
			    	DOM.show('#J_LeftLoading');
					DOM.hide('#J_MainLeftContent');
		    	    new H.widget.asyncRequest().setURI(getPromoItemsUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).setDataType('json').send();
				},
		    	handlePagination : function(turnTo) {
			    	pageId = turnTo;
		    		var submitHandle = function(o) {
		    			 totalRecords = o.payload.totalRecords;
		   				if(totalRecords > 0){
		   					DOM.get('#J_LEmpty').style.display = 'none';
		   					DOM.removeClass(DOM.get(".J_PromotionItemBtnHolder"),'ks-hidden');
		   				} else {
		   					DOM.get('#J_LEmpty').style.display = '';
		   					DOM.addClass(DOM.get(".J_PromotionItemBtnHolder"),'ks-hidden');
		   				}
		   				pageNum = '12';
						pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
						DOM.html('#J_PromoItems',o.payload.body);
						iconControl.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_PromotionItemPaging',2);
						DOM.hide('#J_LeftLoading');
						DOM.show('#J_MainLeftContent');
			    	};
			    	 if(DOM.val(DOM.get("#J_SearchTitle")) != '关键字、商品链接、商品编码'){
		    	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle"))); //标题
		    	    }else{
		    	    	var title ='';
		    	    }
			   	    var status = DOM.val(DOM.get("#J_SearchStatus"));
			    	var data = "keytitle="+title+'&status='+status+"&page_id="+pageId;
			    	DOM.show('#J_LeftLoading');
					DOM.hide('#J_MainLeftContent');
		    	    new H.widget.asyncRequest().setURI(getPromoItemsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
				},
				//将活动中宝贝移除
				removePromotionItemHandle : function(promo_itemid,pidi,type) {
					if(!showPermissions('editor_icon','促销图标')){
						return ;
					}
					itemIds = [];
					itemIds.push(promo_itemid);
					pid = pidi;
					var submitHandle = function(o) {
							if(iconControl.paginator){
								iconControl.paginator.toPage(iconControl.paginator.page);
							}else{
								iconControl.searchPromoItems();
							}
	        	    };
	        	    var data = "pid="+pid+"&item_ids="+itemIds+"&form_key="+FORM_KEY;
	        	    new H.widget.asyncRequest().setURI(removePromotionItemUrl).setMethod("POST").setHandle(submitHandle).setData(data).send();
				}
		}
   
}, {
    requires: ['utils/showPages/index']
});