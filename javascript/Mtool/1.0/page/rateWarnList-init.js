KISSY.add(function(S,showPages){
	var S = KISSY,DOM = S.DOM, Event = S.Event, descType = 1;	
	return rateWarnList = {
    	paginator : null,
    	msg : null,
    	init : function() {
			rateWarnList.getWarnList();
			Event.on('#J_SearchRateWarn','click',rateWarnList.getWarnList);
			Event.on('#J_UpdateRate','click',rateWarnList.updateRateResult);
        },
        getWarnList : function() {
            var submitHandle = function(o) {
				DOM.hide('#J_RightLoading');
				DOM.show('#J_MainRightContent');
        	    totalRecords = o.payload.totalRecords;
				if(totalRecords > 0){
					DOM.css(DOM.get('#J_Empty') ,'display','none');
					DOM.css(DOM.query(".J_PromotionItemBtnHolder") ,'display' , '');
				} else {
					DOM.css(DOM.get('#J_Empty'), 'display' , '');
					DOM.css(DOM.query(".J_PromotionItemBtnHolder") , 'display' , 'none');
				}
				DOM.html('#J_WarnList' ,o.payload.body);
				var pageCount = Math.ceil(totalRecords/o.payload.pageSize);
				rateWarnList.paginator = new showPages('rateWarnList.paginator').setRender(rateWarnList.handlePagination).setPageCount(pageCount).printHtml('#J_Paging',2);
    	    };
        	if(DOM.val(DOM.get("#J_SearchTitle")) != '用户昵称或姓名'){
    	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle")));
    	    }else{
    	    	var title ='';
    	    }
	    	var status = DOM.val(DOM.get("#J_Status"));
	    	var data = "buyer_nick="+title+"&status="+status+"&pageSize=10";
 			DOM.show('#J_RightLoading');
			DOM.hide('#J_MainRightContent');
    	    new H.widget.asyncRequest().setURI(getWarnListAjaxUrl).setMethod("POST").setHandle(submitHandle).setData(data).send();
		},
    	handlePagination : function(turnTo) {
	    	pageId = turnTo;
    		var submitHandle = function(o) {
				DOM.hide('#J_RightLoading');
				DOM.show('#J_MainRightContent');
        	    totalRecords = o.payload.totalRecords;
				DOM.css(DOM.get('#J_NoteIcon') ,'display','none');
				if(totalRecords > 0){
					DOM.css(DOM.get('#J_Empty') ,'display','none');
					DOM.css(DOM.query(".J_PromotionItemBtnHolder") ,'display' , '');
				} else {
					DOM.css(DOM.get('#J_Empty'), 'display' , '');
					DOM.css(DOM.query(".J_PromotionItemBtnHolder") , 'display' , 'none');
				}
				DOM.html('#J_WarnList' ,o.payload.body);
				var pageCount = Math.ceil(totalRecords/o.payload.pageSize);
				rateWarnList.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_Paging',2);
	    	};
	    	 if(DOM.val(DOM.get("#J_SearchTitle")) != '用户昵称或姓名'){
    	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle"))); //标题
    	    }else{
    	    	var title ='';
    	    }
	    	var status = DOM.val(DOM.get("#J_Status"));
	    	var data = "buyer_nick="+title+"&status="+status+"&pageSize=10"+"&page_id="+pageId;
	        DOM.show('#J_RightLoading');
			DOM.hide('#J_MainRightContent');
    	    new H.widget.asyncRequest().setURI(getWarnListAjaxUrl).setMethod("POST").setHandle(submitHandle).setData(data).send();
		},
		updateRateResult : function() {
            var submitHandle = function(o) {
				new H.widget.msgBox({
					type: "sucess",
                    content: o.desc,
     				dialogType:"msg",
    				autoClose:true,
    				timeOut:800,
                });
				S.later(function(){
					window.location.reload();
				},800,false)
    	    }
			var errorHandle = function(o){
				new H.widget.msgBox({
				    title:"错误提示",
				    content:o.desc,
				    type:"error"
				});
				return;
			}
	    	var data = "";
    	    new H.widget.asyncRequest().setURI(updateRateResultUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
		}
	};
},{
	requires : ['utils/showPages/index']
});