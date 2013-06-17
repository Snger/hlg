
/**
 * @fileOverview 
 * @author  你好
 */
KISSY.add(function (S,showPages) {
    // your code here
	var DOM = S.DOM, Event = S.Event;	
	
	return account = {
				msg : null,
				paginator : null , //订购分页
				paginatorGive : null , //赠送分页
				paginatorIntegral : null,  //积分分页
				initDinggouFlag : false,
				initGiveFlag : false,
				initIntegralFlag : false,
				currentMode : 'dinggou',
				init : function(){
					
					new S.Tabs("#J_account_tab",{
							navCls : 'ks-switchable-nav',
							triggerType: 'click',
							contentCls:'ks-main-content',
							activeTriggerCls: 'current active'		
					}).on('switch',function(ev){
							var index = ev.currentIndex;
							switch(index) {
							case 0: 
								account.show('dinggou');
								DOM.hide(DOM.query('.J_point'));
								break;
							case 1:
								account.show('give');
								DOM.hide(DOM.query('.J_point'));
								break;
							case 2:
								DOM.show(DOM.query('.J_point'));
								account.show('integral');
								break;
						}
					})
				
					//日历
					var myCalendar = function($id,$n){
						var c =new S.Calendar('#'+$id,{
									popup:true,
									triggerType:['click'],
									showTime:true,
									maxDate:new Date()
								}).on('select timeSelect',function(e){
										var id = this.id,self = this;
										if(id=='J_endDate'){
											var endDate   = S.Date.format(e.date,'yyyy-mm-dd HH:MM:ss');
											
											var startTime = H.util.StringToDate(S.one('#J_startDate').val());
											var endTime = H.util.StringToDate(endDate);
											if(endTime.getTime()<=startTime){
												self.hide();
												new H.widget.msgBox({
													    title:"错误提示",
													    content:'结束时间不能小于开始时间，请重新选择',
													    type:"info"
													});
											}else{
												S.one('#J_endDate').val(endDate);
												self.hide();
											}
										}else if(id=='J_startDate'){
											var endDate = S.one('#J_endDate').val();
											var startDate   = S.Date.format(e.date,'yyyy-mm-dd HH:MM:ss');
											if((endDate!='')&&(startDate>=endDate))
											{
												self.hide();
												new H.widget.msgBox({
													    title:"错误提示",
													    content:'开始时间不能大于结束时间，请重新选择',
													    type:"info"
													});
											}else{
												S.one('#J_startDate').val(startDate);
												self.hide();
											}
										}
									});
						};
					Event.on('#J_RightSearchBtn','click',function(ev){
						if(account.currentMode == 'dinggou'){
							account.dingGou();
						} else if(account.currentMode == 'give'){
							account.Give();
						} else if(account.currentMode == 'integral'){
							account.Integral();
						}
							
					});	
					Event.fire('#J_RightSearchBtn','click');
					myCalendar('J_startDate',0);
					myCalendar('J_endDate',7);
					
				},
				show : function(mode){
					account.currentMode = mode;
					if (mode == 'dinggou' && !account.initDinggouFlag) {
						account.dingGou();
						account.initDinggouFlag = true;
					}
					if (mode == 'give' && !account.initGiveFlag) {
						account.Give();
						//account.initGiveFlag = true;				
					}
					if (mode == 'integral' && !account.initIntegralFlag) {
						account.Integral();
						//account.initIntegralFlag = true;				
					}
				},
		
				dingGou : function(){
					var submitHandle = function(o) {
		        	    totalRecords = o.payload.totalRecords;
						if(totalRecords > 0){
							DOM.removeClass('.J_DinggouHolder','ks-hidden');
						} else {
							DOM.addClass('.J_DinggouHolder','ks-hidden');
						}
						account.render(o.payload.body);
						var pageCount = Math.ceil(totalRecords/o.payload.pageSize); 
						account.paginator = new showPages('account.paginator').setRender(account.renderDinggou).setPageCount(pageCount).printHtml('#J_DingPaging',2);
						DOM.hide('#J_LeftLoading');
						DOM.show('#J_MainLeftContent');
		    	    };
					DOM.show('#J_LeftLoading');
					DOM.hide('#J_MainLeftContent');
		    	    var start_created = DOM.val('#J_startDate');
		    	    var end_created = DOM.val('#J_endDate');
		    	    var page_size = DOM.val('#J_DinggouPage');
		    	    var nick = DOM.val('#J_NickName');	    	    
		    	    data = 'start_created='+start_created+'&end_created='+end_created+'&page_size='+page_size+'&nick='+encodeURIComponent(nick);
		    	    new H.widget.asyncRequest().setURI(buyDetailUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
				},
				render : function(o){
					if(account.currentMode == 'dinggou'){
						var str = '';
						DOM.html('#J_DingGouContent',o);
		
					} else if(account.currentMode == 'give'){
						DOM.html('#J_GiveContent',o);
						
					} else if(account.currentMode == 'integral'){
						DOM.html('#J_IntegralContent',o);
					}
					
				},
				renderDinggou :function(turnTo){
					pageId = turnTo;
		    		var submitHandle = function(o) {
		    			 totalRecords = o.payload.totalRecords;
		   				if(totalRecords > 0){
							DOM.removeClass('.J_DinggouHolder','ks-hidden');
						} else {
							DOM.addClass('.J_DinggouHolder','ks-hidden');
						}
		 				var pageCount = Math.ceil(totalRecords/o.payload.pageSize); 
						account.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_DingPaging',2);
		        	    account.render(o.payload.body);
		        	    DOM.hide('#J_LeftLoading');
						DOM.show('#J_MainLeftContent');
			    	};
					DOM.show('#J_LeftLoading');
					DOM.hide('#J_MainLeftContent');
			    	var start_created = DOM.val('#J_startDate');
			    	var end_created = DOM.val('#J_endDate');
			    	var page_size = DOM.val('#J_DinggouPage');
			    	var nick = DOM.val('#J_NickName');
			    	data = 'start_created='+start_created+'&end_created='+end_created+'&page_size='+page_size+'&page_no='+pageId+'&nick='+nick;
			    	new H.widget.asyncRequest().setURI(buyDetailUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
				},
				Give : function(){
					var submitHandle = function(o) {
		        	    totalRecords = o.payload.totalRecords;
						if(totalRecords > 0){
							DOM.removeClass('.J_GiveHolder','ks-hidden');
						} else {
							DOM.addClass('.J_GiveHolder','ks-hidden');
						}
						account.render(o.payload.body);
						var pageCount = Math.ceil(totalRecords/o.payload.pageSize); 
						account.paginatorGive = new showPages('account.paginatorGive').setRender(account.renderGive).setPageCount(pageCount).printHtml('#J_GivePaging',2);
						 DOM.hide('#J_LeftLoading');
						DOM.show('#J_MainLeftContent');
		    	    };
		    	  	DOM.show('#J_LeftLoading');
					DOM.hide('#J_MainLeftContent');
		    	    var start_created = DOM.val('#J_startDate');
		    	    var end_created = DOM.val('#J_endDate');
		    	    var page_size = DOM.val('#J_DinggouPage');
		    	    var nick = DOM.val('#J_NickName');		    	    
		    	    data = 'start_created='+start_created+'&end_created='+end_created+'&page_size='+page_size+'&nick='+encodeURIComponent(nick);
		    	    new H.widget.asyncRequest().setURI(giftDetailUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
				},
				renderGive :function(turnTo){
					pageId = turnTo;
		    		var submitHandle = function(o) {
		    			 totalRecords = o.payload.totalRecords;
		   				if(totalRecords > 0){
							DOM.removeClass('.J_GiveHolder','ks-hidden');
						} else {
							DOM.addClass('.J_GiveHolder','ks-hidden');
						}
		 				var pageCount = Math.ceil(totalRecords/o.payload.pageSize); 
						account.paginatorGive.setPage(pageId).setPageCount(pageCount).printHtml('#J_GivePaging',2);
		        	    account.render(o.payload.body);
		        	    DOM.hide('#J_LeftLoading');
						DOM.show('#J_MainLeftContent');
			    	};
			    	DOM.show('#J_LeftLoading');
					DOM.hide('#J_MainLeftContent');
			    	var start_created = DOM.val('#J_startDate');
			    	var end_created = DOM.val('#J_endDate');
			    	var page_size = DOM.val('#J_DinggouPage');
			    	var nick = DOM.val('#J_NickName');	
			    	data = 'start_created='+start_created+'&end_created='+end_created+'&page_size='+page_size+'&page_no='+pageId+'&nick='+nick;
			    	new H.widget.asyncRequest().setURI(giftDetailUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
				},
				Integral : function(){
					var submitHandle = function(o) {
		        	    totalRecords = o.payload.totalRecords;
						if(totalRecords > 0){
							DOM.removeClass('.J_IntegralHolder','ks-hidden');
						} else {
							DOM.addClass('.J_IntegralHolder','ks-hidden');
						}
						account.render(o.payload.body);
						var pageCount = Math.ceil(totalRecords/o.payload.pageSize); 
						account.paginatorIntegral = new showPages('account.paginatorIntegral').setRender(account.renderIntegral).setPageCount(pageCount).printHtml('#J_IntegralPaging',2);
						 DOM.hide('#J_LeftLoading');
						DOM.show('#J_MainLeftContent');
		    	    };
		    	    DOM.show('#J_LeftLoading');
					DOM.hide('#J_MainLeftContent');
		    	    var start_created = DOM.val('#J_startDate');
		    	    var end_created = DOM.val('#J_endDate');
		    	    var page_size = DOM.val('#J_DinggouPage');
		    	    var type_id = DOM.val('#J_leibie');
		    	    var nick = DOM.val('#J_NickName');	
		    	    	    	    
		    	    data = 'start_created='+start_created+'&end_created='+end_created+'&page_size='+page_size+'&type_id='+type_id+'&nick='+encodeURIComponent(nick);
		    	    new H.widget.asyncRequest().setURI(pointDetailUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
				},
				renderIntegral :function(turnTo){
					pageId = turnTo;
		    		var submitHandle = function(o) {
		    			 totalRecords = o.payload.totalRecords;
		    			 if(totalRecords > 0){
		 					DOM.removeClass('.J_IntegralHolder','ks-hidden');
		 				} else {
		 					DOM.addClass('.J_IntegralHolder','ks-hidden');
		 				}
		 				var pageCount = Math.ceil(totalRecords/o.payload.pageSize); 
						account.paginatorIntegral.setPage(pageId).setPageCount(pageCount).printHtml('#J_IntegralPaging',2);
		        	    account.render(o.payload.body);
		        	   DOM.hide('#J_LeftLoading');
						DOM.show('#J_MainLeftContent');
			    	};
					DOM.show('#J_LeftLoading');
					DOM.hide('#J_MainLeftContent');
			    	var start_created = DOM.val('#J_startDate');
			    	var end_created = DOM.val('#J_endDate');
			    	var page_size = DOM.val('#J_DinggouPage');
			    	var type_id = DOM.val('#J_leibie');
			    	 var nick = DOM.val('#J_NickName');	
			    	data = 'start_created='+start_created+'&end_created='+end_created+'&page_size='+page_size+'&page_no='+pageId+'&type_id='+type_id+'&nick='+nick;
			    	new H.widget.asyncRequest().setURI(pointDetailUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
				}
	}
}, {
    requires: ['utils/showPages/index']
});