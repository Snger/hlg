/**
 * @fileOverview 
 * @author  
 */
KISSY.add(function (S,showPages) {
    // your code here
	var DOM = S.DOM, Event = S.Event;	
	
	return Point = {
	    	pointPaginator : null,
	    	recordPaginator : null,
	    	
	    	init : function() {
//				var ruleId = DOM.val('#J_RuleId');
//				if(ruleId!=''){
					Point.searchPoints();
//		    	    Event.on('#J_SearchBtn','click',Point.searchPoints); //搜索符合规则的积分记录
//				}
	        },
	        
			//搜索
			searchPoints :function() {
		    	var submitHandle = function(o) {
	        	    totalRecords = o.payload.totalRecords;
					if(totalRecords > 0){
						DOM.css(DOM.get('#J_LEmpty') ,'display','none');
						DOM.css(DOM.query(".J_ItemSelectBtnHolder") ,'display' , '');
					} else {
						DOM.css(DOM.get('#J_LEmpty'), 'display' , '');
						DOM.css(DOM.query(".J_ItemSelectBtnHolder") , 'display' , 'none');
					}
	        	    DOM.html(DOM.get("#J_PointList"), o.payload.body ,true);
	        	    pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					Point.pointPaginator = new showPages('Point.pointPaginator').setRender(Point.pointPaginationHandle).setPageCount(pageCount).printHtml('#J_PointPaging',2);
  					DOM.hide('#J_LeftLoading');
 					DOM.show('#J_MainLeftContent');
		    	};
		    	
				var customerNick = encodeURIComponent(DOM.val(DOM.get("#J_SearchNick"))); //标题
        	    var pointType = DOM.val(DOM.get('#J_PointType'));
        	    var compareType = DOM.val(DOM.get('#J_CompareType'));
        	    var amount = DOM.val(DOM.get('#J_SearchAmount'));
				DOM.show('#J_LeftLoading');
				DOM.hide('#J_MainLeftContent');
        	    var data = "point_type="+pointType+"&compare_type="+compareType+"&customer_nick="+customerNick+"&amount="+amount;
        	    new H.widget.asyncRequest().setURI(loadPointsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			
			pointPaginationHandle : function(turnTo,flag) {
				pageId = turnTo;
	    		var submitHandle = function(o) {
	    			totalRecords = o.payload.totalRecords;
		    		pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
	    			Point.pointPaginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_PointPaging',2);
	    			DOM.html(DOM.get("#J_PointList"), o.payload.body);
  					DOM.hide('#J_LeftLoading');
 					DOM.show('#J_MainLeftContent');
	    		};
				
		    	var customerNick = encodeURIComponent(DOM.val(DOM.get("#J_SearchNick"))); //标题
        	    var pointType = DOM.val(DOM.get('#J_PointType'));
        	    var compareType = DOM.val(DOM.get('#J_CompareType'));
        	    var amount = DOM.val(DOM.get('#J_SearchAmount'));
				DOM.show('#J_LeftLoading');
				DOM.hide('#J_MainLeftContent');
        	    var data = "point_type="+pointType+"&compare_type="+compareType+"&customer_nick="+customerNick+"&amount="+amount+"&page_id="+pageId;
        	    new H.widget.asyncRequest().setURI(loadPointsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			
			showPointContent : function(){
				DOM.show('#J_PointContent');
				DOM.hide('#J_RecordContent');
			},
			
			showPointDetail : function(customerNick){
				DOM.html('#J_CustomerNick',customerNick)
				Point.searchPointRecord();
				DOM.hide('#J_PointContent');
				DOM.show('#J_RecordContent');
			},
			
			//搜索积分记录
			searchPointRecord :function() {
		    	var submitHandle = function(o) {
		    		DOM.hide('#J_LeftLoading');
					DOM.show('#J_MainLeftContent');
	        	    totalRecords = o.payload.totalRecords;
	        	    //alert(o.payload.body);
	        	    DOM.html(DOM.get("#J_RecordList"), o.payload.body,true);
	        	    pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					Point.recordPaginator = new showPages('Point.recordPaginator').setRender(Point.recordPaginationHandle).setPageCount(pageCount).printHtml('#J_RecordPaging',2);
		    	};
		    	DOM.show('#J_LeftLoading');
				DOM.hide('#J_MainLeftContent');
		    	var customerNick = encodeURIComponent(DOM.html('#J_CustomerNick'));
		    	var pointType = DOM.val(DOM.get('#J_DetailPointType'));
		    	var data = 'customer_nick='+customerNick+'&point_type='+pointType;
//		    	alert(data);
        	    //new H.widget.asyncRequest().setURI(loadRecordsUrl).setMethod("POST").setForm('#promotion_edit_form').setHandle(submitHandle).setData(data).send();
        	    new H.widget.asyncRequest().setURI(loadRecordsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			
			recordPaginationHandle : function(turnTo,flag) {
				pageId = turnTo;
	    		var submitHandle = function(o) {
			    	DOM.hide('#J_LeftLoading');
					DOM.show('#J_MainLeftContent');
	    			totalRecords = o.payload.totalRecords;
		    		pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
	    			Point.recordPaginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_RecordPaging',2);
	    			DOM.html(DOM.get("#J_RecordList"), o.payload.body);
		    	};
		    	DOM.show('#J_LeftLoading');
				DOM.hide('#J_MainLeftContent');
		    	var customerNick = encodeURIComponent(DOM.html('#J_CustomerNick'));
		    	var pointType = DOM.val(DOM.get('#J_DetailPointType'));
		    	var data = 'customer_nick='+customerNick+'&point_type='+pointType;
		    	data +="&page_id="+pageId;
        	    new H.widget.asyncRequest().setURI(loadRecordsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			
			cancel : function(record_id){
				var submitHandle = function(o) {
					alert(o.desc); 
					Point.searchPointRecord();
		    	};
		    	var errorHandle = function(o){
					alert(o.desc); 
		 		};
				
				var customerNick = encodeURIComponent(DOM.html('#J_CustomerNick'));
		    	var data = 'customer_nick='+customerNick+'&record_id='+record_id;
		    	new H.widget.asyncRequest().setURI(cancelRecordUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			},
			
			strProcess : function(str) {
				return str.replace(/\\/g, '\\\\').replace(/\"/g, '\\"').replace(/[\\t\\n&]/g, '%26');
			},
			
			checkParams : function() {
				alert('checkParams:'+ruleType+' un process');
				return true;
			},
			setRuleEnable : function(status){
				var	successHandle = function(result){
					if(status=='1'){
						DOM.show('#J_RuleEnabled');
						DOM.hide('#J_RuleDisabled');
					}else{
						DOM.hide('#J_RuleEnabled');
						DOM.show('#J_RuleDisabled');
					}
					alert('设置成功！');
					return;
					//DOM.html('#'+id,result.payload);
				}
				var	errorHandle = function(result){
					alert(result.desc);
					//DOM.html('#'+id,'0');
				}
				var ruleId = DOM.val('#J_RuleId');
				var enable = status;
				var data ="rule_id="+ruleId+"&enable="+enable;
				new H.widget.asyncRequest().setURI(setEnableAjaxUrl).setMethod("POST").setHandle(successHandle).setErrorHandle(errorHandle).setData(data).send();
			},
			isNull : function(str){
				if(str == null ||str == ""){
					return true;
				}else{
					return false;
				}
			},
			isDate : function(str){
				if (str == null)
				{
					return false;
				}
				if (str.length != 19 ){
					return false;
				}
				var yearStr = str.substring(0,4);
				var monthStr = str.substring(5,7);
				var dayStr = str.substring(8,10);
				var hour = str.substring(11,13);
				var mins = str.substring(14,16);
				var sec = str.substring(17,19);
				if(parseInt(yearStr)<2011)
				{
					return false;
				 }
				y = parseInt(yearStr,10);
				d = parseInt(dayStr,10);
				switch(monthStr){
					case '01':
					case '03':
					case '05':
					case '07':
					case '08':
					case '10':
					case '12':
					 if(d>31){
					return false;
					 }
					 break;
					case '02':
					 if((y%4==0 && d>29) || ((y%4!=0 && d>28))){
					return false;
					}
					 break;
					case '04':
					case '06':
					case '09':
					case '11':
					 if(d>30){
					return false;
					}
					 break;
					default:
					 return false;
				}
				if(parseInt(hour)>23 || parseInt(mins)>59 || parseInt(sec)>59){
					return false;
				}
				if(str.substring(4,5) != '-' || str.substring(7,8) != '-' || str.substring(13,14) != ':' || str.substring(16,17) != ':'){
					return false;
				}	
		        return true;
			}

	}
}, {
    requires: ['utils/showPages/index']
});