/**
 * @fileOverview 
 * @author  
 */
KISSY.add(function (S,showPages) {
    // your code here
	var DOM = S.DOM, Event = S.Event;	
	
	return	members = {
			paginator : null,
			init : function() {
				DOM.val(DOM.get("#J_Grade"),DOM.val('#J_GradeValue'))
				members.searchTbItems();
				Event.on('#J_SearchMembers','click',members.searchTbItems);
			},
		       //搜索淘宝宝贝
	        searchTbItems : function() {
                var submitHandle = function(o) {
	        	    totalRecords = o.payload.totalRecords;
					if(totalRecords > 0){
						DOM.get('#J_LEmpty').style.display = 'none';
						DOM.css(DOM.query(".J_ItemSelectBtnHolder"),'display' ,'');
					} else {
						DOM.get('#J_LEmpty').style.display = '';
						DOM.css(DOM.query(".J_ItemSelectBtnHolder"),'display' ,'none');
					}
					members.renderItems(o.payload.body);
					pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					members.paginator = new showPages('members.paginator').setRender(members.handlePagination).setPageCount(pageCount).printHtml('#J_Paging',2);
					members.paginator = new showPages('members.paginator').setRender(members.handlePagination).setPageCount(pageCount).printHtml('#J_TopPaging',3);
  					DOM.hide('#J_LeftLoading');
 					DOM.show('#J_MainLeftContent');
        	    };
        	    var errorHandle = function(o){
        	    	members.msg.setMsg(o.desc).show();
        	    };
        	    if(DOM.val(DOM.get("#J_SearchBuyerNick")) != '买家昵称'){
        	    	var buyerNick = encodeURIComponent(DOM.val(DOM.get("#J_SearchBuyerNick"))); //买家昵称
        	    }else{
        	    	var buyerNick ='';
        	    }
        	    
        	    var grade = DOM.val(DOM.get("#J_Grade"));
    	    	var itemPage = DOM.val(DOM.get("#J_SelectItemPage"));//每页多少条
				var data ="buyer_nick="+buyerNick+"&grade="+grade+"&pageSize="+itemPage;
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
					 members.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_Paging',2);
					 members.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_TopPaging',3);
					 members.renderItems(o.payload.body);
  					 DOM.hide('#J_LeftLoading');
 					 DOM.show('#J_MainLeftContent');
		    	};
		    	if(DOM.val(DOM.get("#J_SearchBuyerNick")) != '买家昵称'){
        	    	var buyerNick = encodeURIComponent(DOM.val(DOM.get("#J_SearchBuyerNick"))); //买家昵称
        	    }else{
        	    	var buyerNick ='';
        	    }
		    	var grade = DOM.val(DOM.get("#J_Grade"));
    	    	var itemPage = DOM.val(DOM.get("#J_SelectItemPage"));
    	    	var data = "buyer_nick="+buyerNick+"&grade="+grade+"&page_id="+pageId+"&pageSize="+itemPage;
				DOM.show('#J_LeftLoading');
				DOM.hide('#J_MainLeftContent');    	    	
        	    new H.widget.asyncRequest().setURI(getItemsFromTbUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			}
	}
}, {
    requires: ['utils/showPages/index']
});