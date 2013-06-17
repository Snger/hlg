/**
 * @fileOverview 
 * @author  
 */
KISSY.add(function (S,showPages) {
	
	var S= KISSY,DOM = S.DOM, Event = S.Event;
	return Report = {
	    	statPaginator : null,
	    	recordPaginator : null,
			chart : null,
	    	
	    	init : function() {
				Report.showReportView('1');
				Report.listPointStat();
				Report.listPointRecord();
				new S.Calendar('#J_start_date1',{
					popup:true,
					triggerType:['click'],
					closable:true,
					showTime:true
				}).on('select timeSelect',function(e){
					S.one('#J_start_date1').val(S.Date.format(e.date,'yyyy-mm-dd HH:MM:ss'));
				});

				new S.Calendar('#J_start_date2',{
					popup:true,
					triggerType:['click'],
					closable:true,
					showTime:true
				}).on('select timeSelect',function(e){
					S.one('#J_start_date2').val(S.Date.format(e.date,'yyyy-mm-dd HH:MM:ss'));
				});
				//Report.searchRecords();
	        },
	        
	        showReportView :function(show_type) {
		    	var submitHandle = function(o) {
					if(Report.chart){
						Report.chart.destroy();
					}
				var type = show_type ;	
					Report.chart = new Highcharts.Chart({
							chart: {
								renderTo: 'J_BaoBiao',
								height:400,
								marginBottom: 60
							},
							title: {
								text: '积分发放以及消费统计 '
							},
							credits :{
								enabled :false
							},
							legend :{
					            floating: true,
					            align: 'left',
					            x : 450,
					            y : 5
							},
							 
							xAxis: {
								categories: o.payload.xdata,
								labels: {
						            step: o.payload.xkuadu
						        }
							},
							 yAxis: [{
								 	lineWidth: 1,
							        tickWidth: 1,
							        title: {
							            align: 'high',
							            offset: 0,
							            text: '',
							            rotation: 0,
							            y: -10
							        },
						            min : 0
						        }],
							tooltip: {
								formatter: function(e) {
									var s;
									if(type == 1){
										s = ''+this.x  +'号: '+ this.y;
										
									}else{
										s = ''+this.x+' 月份: '+ this.y;
									}
										
									return s;
								}
							},
							
							series: [{
								type: 'spline',
								name: '发放',
								data: o.payload.send
							
							},{
								type: 'spline',
								name: '消费',
								data: o.payload.consume
							
							}
							]
						});
    				
		    	};
		    	var errorHandle = function(o){
		    		DOM.html(DOM.get("#J_BaoBiao"), o.desc,true);
	        	};
        	    var data = 'type='+show_type;
        	    new H.widget.asyncRequest().setURI(showReportViewUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
        	    if('1'==show_type){
        	    	DOM.addClass('#J_DayView','current');
	        	    DOM.removeClass('#J_MonthView','current');
        	    }else{
	        	    DOM.removeClass('#J_DayView','current');
	        	    DOM.addClass('#J_MonthView','current');
        	    }
			},
	        
			//搜索积分统计记录
			listPointStat :function() {
		    	var submitHandle = function(o) {
		    		DOM.hide('#J_LeftLoading-1');
					DOM.show('#J_MainLeftContent-1');
	        	    totalRecords = o.payload.totalRecords;
					if(totalRecords > 0){
						DOM.css(DOM.get('#J_LEmpty-1') ,'display','none');
						DOM.css(DOM.query(".J_ItemSelectBtnHolder") ,'display' , '');
					} else {
						DOM.css(DOM.get('#J_LEmpty-1'), 'display' , '');
						DOM.css(DOM.query(".J_ItemSelectBtnHolder") , 'display' , 'none');
					}
	        	    //alert(o.payload.body);
	        	    DOM.html(DOM.get("#J_StatList"), o.payload.body,true);
	        	    pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					Report.statPaginator = new showPages('Report.statPaginator').setRender(Report.statPaginationHandle).setPageCount(pageCount).printHtml('#J_StatPaging',2);
		    	};
		    	DOM.show('#J_LeftLoading-1');
				DOM.hide('#J_MainLeftContent-1');
        	    var data = '';
        	    new H.widget.asyncRequest().setURI(loadPointStatUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			
			statPaginationHandle : function(turnTo,flag) {
				pageId = turnTo;
	    		var submitHandle = function(o) {
	    			DOM.hide('#J_LeftLoading-1');
					DOM.show('#J_MainLeftContent-1'); 
	    			totalRecords = o.payload.totalRecords;
					if(totalRecords > 0){
						DOM.css(DOM.get('#J_LEmpty') ,'display','none');
						DOM.css(DOM.query(".J_ItemSelectBtnHolder") ,'display' , '');
					} else {
						DOM.css(DOM.get('#J_LEmpty'), 'display' , '');
						DOM.css(DOM.query(".J_ItemSelectBtnHolder") , 'display' , 'none');
					}
		    		pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
	    			Report.statPaginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_StatPaging',2);
	    			DOM.html(DOM.get("#J_StatList"), o.payload.body);
		    	};
		    	DOM.show('#J_LeftLoading-1');
				DOM.hide('#J_MainLeftContent-1');
		    	//Report.msg.setMsg('加载中');
		    	data = "page_id="+pageId;
        	    new H.widget.asyncRequest().setURI(loadPointStatUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			
			//搜索积分记录
			listPointRecord :function() {
		    	var submitHandle = function(o) {
		    		DOM.hide('#J_LeftLoading');
					DOM.show('#J_MainLeftContent');
	        	    totalRecords = o.payload.totalRecords;
					if(totalRecords > 0){
						DOM.css(DOM.get('#J_LEmpty') ,'display','none');
						DOM.css(DOM.query(".J_ItemSelectBtnHolder") ,'display' , '');
					} else {
						DOM.css(DOM.get('#J_LEmpty'), 'display' , '');
						DOM.css(DOM.query(".J_ItemSelectBtnHolder") , 'display' , 'none');
					}	        	    
	        	    //alert(o.payload.body);
	        	    DOM.html(DOM.get("#J_RecordList"), o.payload.body,true);
	        	    pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					Report.recordPaginator = new showPages('Report.recordPaginator').setRender(Report.recordPaginationHandle).setPageCount(pageCount).printHtml('#J_RecordPaging',2);
		    	};
		    
		    	DOM.show('#J_LeftLoading');
				DOM.hide('#J_MainLeftContent');
		    	var customerNick = DOM.val('#J_CustomerNick');
		    	var pointType = DOM.val('#J_PointType');
		    	var startDate = DOM.val('#J_start_date1');
		    	var endDate = DOM.val('#J_start_date2');
        	    var data = 'customer_nick='+customerNick+'&point_type='+pointType+'&start_date='+startDate+'&end_date='+endDate;
        	    //new H.widget.asyncRequest().setURI(loadRecordsUrl).setMethod("POST").setForm('#promotion_edit_form').setHandle(submitHandle).setData(data).send();
        	    new H.widget.asyncRequest().setURI(loadRecordsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			
			recordPaginationHandle : function(turnTo,flag) {
				pageId = turnTo;
	    		var submitHandle = function(o) { 
					DOM.hide('#J_LeftLoading');
					DOM.show('#J_MainLeftContent'); 
	    			totalRecords = o.payload.totalRecords;
					if(totalRecords > 0){
						DOM.css(DOM.get('#J_LEmpty') ,'display','none');
						DOM.css(DOM.query(".J_ItemSelectBtnHolder") ,'display' , '');
					} else {
						DOM.css(DOM.get('#J_LEmpty'), 'display' , '');
						DOM.css(DOM.query(".J_ItemSelectBtnHolder") , 'display' , 'none');
					}	    			
		    		pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
	    			Report.recordPaginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_RecordPaging',2);
	    			DOM.html(DOM.get("#J_RecordList"), o.payload.body);
		    	};
				DOM.show('#J_LeftLoading');
				DOM.hide('#J_MainLeftContent');
		    	var customerNick = DOM.val('#J_CustomerNick');
		    	var pointType = DOM.val('#J_PointType');
		    	var startDate = DOM.val('#J_start_date1');
		    	var endDate = DOM.val('#J_start_date2');
        	    var data = 'customer_nick='+customerNick+'&point_type='+pointType+'&start_date='+startDate+'&end_date='+endDate;
				data +="&page_id="+pageId;
        	    new H.widget.asyncRequest().setURI(loadRecordsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			}
	}
   
}, {
    requires: ['utils/showPages/index']
});