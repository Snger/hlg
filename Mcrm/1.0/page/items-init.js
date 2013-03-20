/**
 * @fileOverview 
 * @author  
 */
KISSY.add(function (S,showPages) {
    // your code here
	var DOM = S.DOM, Event = S.Event;	
	
 	return crmItems = {
 	    	paginator : null,
 	    	init : function() {
 	    	    Event.on('#J_SearchBtn','click',crmItems.searchTbItems); 
 	    	    crmItems.searchTbItems(); 
 	        },
 	        searchTbItems : function() {
                 var submitHandle = function(o) {
                 	DOM.removeClass(".J_ItemSelectBtnHolder",'ks-hidden');
 	        	    totalRecords = o.payload.totalRecords;
 					if(totalRecords > 0){
 						DOM.get('#J_LEmpty').style.display = 'none';
 						DOM.css(DOM.query(".J_ItemSelectBtnHolder"),'display' ,'');
 					} else {
 						DOM.get('#J_LEmpty').style.display = '';
 						DOM.css(DOM.query(".J_ItemSelectBtnHolder"),'display' ,'none');
 					}
 					crmItems.renderItems(o.payload.body);
 					pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
 					crmItems.paginator = new showPages('crmItems.paginator').setRender(crmItems.handlePagination).setPageCount(pageCount).printHtml('#J_Paging',2);
  					DOM.hide('#J_LeftLoading');
 					DOM.show('#J_MainLeftContent');
         	    };
         	    var errorHandle = function(o){
 					DOM.hide('#J_Loading');
 					DOM.show('#J_MainLeftContent');
					new H.widget.msgBox({
					    title:"错误提示",
					    content:o.desc,
					    type:"error",
						autoClose : true,
						timeOut : 3000
					});
         	    };
         	    if(DOM.val(DOM.get("#J_SearchTitle")) != '关键字、商品链接、商品编码'){
         	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle"))); //标题
         	    }else{
         	    	var title ='';
         	    }
                 var cid = DOM.val(DOM.get("#J_SelectItemCid")); //类目
     	    	var type = DOM.val(DOM.get("#J_SearchSelling")); //出售中 库中
     	    	var itemOrder = DOM.val(DOM.get("#J_SelectItemOrder"));//排序方式
     	    	var itemPage = DOM.val(DOM.get("#J_SelectItemPage"));//每页多少条
     	    	var data = "q="+title+"&cid="+cid+"&type="+type;
             	    data +="&itemOrder="+itemOrder+"&pageSize="+itemPage;
     	    	if (type == 0) {
 					//价格区间
 					var startPrice = DOM.val(DOM.get("#J_StartPrice"));
 					var endPrice = DOM.val(DOM.get("#J_EndPrice"));
 					data += "&start_price="+startPrice+"&end_price="+endPrice;
 				}
 				DOM.show('#J_LeftLoading');
 				DOM.hide('#J_MainLeftContent');
         	    new H.widget.asyncRequest().setURI(getItemsFromTbUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).setDataType('json').send();
 			},
 			
 			// 渲染 TbItems
 			renderItems: function(c) {
         	    DOM.html(DOM.get("#J_TbItemList"), c,true);
 			},
 	    	handlePagination : function(turnTo) {
 		    	pageId = turnTo;
 	    		var submitHandle = function(o) {
 	    			 totalRecords = o.payload.totalRecords;
 					 if(totalRecords > 0){
 						DOM.get('#J_LEmpty').style.display = 'none';
 						DOM.css(DOM.query(".J_ItemSelectBtnHolder"),'display' ,'');
 					} else {
 						DOM.get('#J_LEmpty').style.display = '';
 						DOM.css(DOM.query(".J_ItemSelectBtnHolder"),'display' ,'none');
 					}
 					 pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
 	    			crmItems.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_Paging',2);
 	        	    crmItems.renderItems(o.payload.body);
 					DOM.hide('#J_LeftLoading');
 					DOM.show('#J_MainLeftContent');
 		    	};
 		    	 if(DOM.val(DOM.get("#J_SearchTitle")) != '关键字、商品链接、商品编码'){
         	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle"))); //标题
         	    }else{
         	    	var title ='';
         	    }
                 var cid = DOM.val(DOM.get("#J_SelectItemCid")); //类目
     	    	var type = DOM.val(DOM.get("#J_SearchSelling")); //出售中 库中
     	    	var itemOrder = DOM.val(DOM.get("#J_SelectItemOrder"));//排序方式
     	    	var itemPage = DOM.val(DOM.get("#J_SelectItemPage"));//每页多少条
     	    	var data = "q="+title+"&cid="+cid+"&type="+type;
             	    data +="&itemOrder="+itemOrder+"&pageSize="+itemPage;
 					data +="&page_id="+pageId;
     	    	if (type == 0) {
 					//价格区间
 					var startPrice = DOM.val(DOM.get("#J_StartPrice"));
 					var endPrice = DOM.val(DOM.get("#J_EndPrice"));
 					data += "&start_price="+startPrice+"&end_price="+endPrice;
 				}
 				DOM.show('#J_LeftLoading');
 				DOM.hide('#J_MainLeftContent');
         	    new H.widget.asyncRequest().setURI(getItemsFromTbUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
 			}
 	}
}, {
    requires: ['utils/showPages/index']
});