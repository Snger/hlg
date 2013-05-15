KISSY.add('page/neutralList-init',function(S,showPages){
	var S = KISSY,DOM = S.DOM, Event = S.Event;
	return neutralList = {
	    	paginator : null,
	    	msg : null,
	    	
	    	init : function() {
				 Event.on('#J_SearchBtn','click',neutralList.searchTraderates); //活动中宝贝全选   	    
				 neutralList.searchTraderates();
	        },
	        open : function(ruleType){
	        	window.self.location = openRuleUrl+'&type='+ruleType;
	        	return;
	        },
	        view : function(ruleId){
	        	window.self.location = viewRuleUrl+'&rule_id='+ruleId;
	        	return;
	        },
			//搜索
			searchTraderates :function() {
		    	var submitHandle = function(o) {
		    		neutralList.msg.hide();
		    		totalRecords = o.payload.totalRecords;
		    		if(parseInt(totalRecords)==0){
		    			DOM.html(DOM.get("#J_ContentList"), '<li style="float:none;"><div class="no-details"><div><span class="no-details-pic"></span><span class="prompt-1">暂无记录！</span></div></div></li>',true);
		    		}else{
		    			DOM.html(DOM.get("#J_ContentList"), o.payload.body,true);
		    		}
	        	    pageCount = Math.ceil(totalRecords/o.payload.pageSize); 
					neutralList.paginator = new showPages('neutralList.paginator').setRender(neutralList.paginationHandle).setPageCount(pageCount).printHtml('#J_Paging',2);
		    	};
		    	neutralList.msg = new H.widget.msgBox({
											    title:"",
												dialogType : 'loading',
											    content:'系统正在处理'	
											});
        	    var data ="result="+DOM.val('#J_Result')+"&tid="+DOM.val('#J_Tid')+"&num_iid="+DOM.val('#J_Num_iid')+"&start_date="+DOM.val('#J_startDate')+"&end_date="+DOM.val('#J_endDate')
        	    new H.widget.asyncRequest().setURI(loadTraderatesUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			paginationHandle : function(turnTo,flag) {
				pageId = turnTo;
	    		var submitHandle = function(o) {
	    			neutralList.msg.hide();
	    			totalRecords = o.payload.totalRecords;
		    		pageCount = Math.ceil(totalRecords/o.payload.pageSize); 
	    			neutralList.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_Paging',2);
	    			DOM.html(DOM.get("#J_ContentList"), o.payload.body);
		    	};
		    	neutralList.msg = new H.widget.msgBox({
											    title:"",
												dialogType : 'loading',
											    content:'系统正在处理'	
											});
		    	var data ="result="+DOM.val('#J_Result')+"&tid="+DOM.val('#J_Tid')+"&num_iid="+DOM.val('#J_Num_iid')+"&start_date="+DOM.val('#J_startDate')+"&end_date="+DOM.val('#J_endDate')+"&page_id="+pageId;
        	    new H.widget.asyncRequest().setURI(loadTraderatesUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			strProcess : function(str) {
				return str.replace(/\\/g, '\\\\').replace(/\"/g, '\\"').replace(/[\\t\\n&]/g, '%26');
			}
    };
},{
	requires : ['utils/showPages/index']
});