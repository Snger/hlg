/**
 * @fileOverview 
 * @author  
 */
KISSY.add(function (S,showPages) {
    // your code here
	var DOM = S.DOM, Event = S.Event;	
return cardReport = {
	    	paginator : null,
	    	msg :null,
	    	isFisrst : true,
	    	init : function() {
				Event.on("#J_LeftSearch", "click", function(){
					cardReport.searchTbItems();
				});
				Event.on(doc, 'keydown', function(evt) {
					if ( evt.which === 13) {
						if(cardReport.paginator){
							cardReport.paginator.toPage(cardReport.paginator.page);
						}else{
							cardReport.searchTbItems();
						}
					}
				})
				cardReport.showReportView();
				cardReport.searchTbItems();
				Event.on('#J_SearchTypes',"change",function(ev){
					cardReport.showReportView();
					cardReport.searchTbItems();
				});
	        },
	        searchTbItems : function() {
		        
	            var submitHandle = function(o) {
					DOM.hide('#J_LeftLoading');
					DOM.show('#J_MainLeftContent');
	        	    totalRecords = o.payload.totalRecords;
					if(totalRecords > 0){
						DOM.css(DOM.get('#J_LEmpty') ,'display','none');
	//								DOM.css(DOM.query(".J_ItemSelectBtnHolder") ,'display' , '');
					} else {
						DOM.css(DOM.get('#J_LEmpty'), 'display' , '');
	//								DOM.css(DOM.query(".J_ItemSelectBtnHolder") , 'display' , 'none');
					}
					cardReport.renderItems(o.payload.body);
					var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					cardReport.paginator = new showPages('cardReport.paginator').setRender(cardReport.handlePagination).setPageCount(pageCount).printHtml('#J_Paging',2);
	    	    };
		    	var data = cardReport.getData();
	 			DOM.show('#J_LeftLoading');
				DOM.hide('#J_MainLeftContent');
	    	    new H.widget.asyncRequest().setURI(loadTbItemsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			renderItems: function(c) {
	    	    DOM.html(DOM.get("#J_TbItemList"), c);
	        	
			},
	    	handlePagination : function(turnTo) {
		    	pageId = turnTo;
	    		var submitHandle = function(o) {
	    			 totalRecords = o.payload.totalRecords;
	 				if(totalRecords > 0){
	 					DOM.css(DOM.get('#J_LEmpty') ,'display','none');
	//			 					DOM.css(DOM.query(".J_ItemSelectBtnHolder") ,'display' , '');
	 				} else {
	 					DOM.css(DOM.get('#J_LEmpty'), 'display' , '');
	//			 					DOM.css(DOM.query(".J_ItemSelectBtnHolder") , 'display' , 'none');
	 				}
	 				var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
	 				cardReport.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_Paging',2);
	 				cardReport.renderItems(o.payload.body);
	 				DOM.hide('#J_LeftLoading');
					DOM.show('#J_MainLeftContent');
		    	};
		    	var data = cardReport.getData();
				data +="&page_id="+pageId
				DOM.show('#J_LeftLoading');
				DOM.hide('#J_MainLeftContent');
	    	    new H.widget.asyncRequest().setURI(loadTbItemsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			getData : function(){
		    	if(DOM.val(DOM.get("#J_SearchTitle")) != '输入买家昵称'){
	    	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle"))); //标题
	    	    }else{
	    	    	var title ='';
	    	    }
		    	var dtype = DOM.val(DOM.get("#J_DTypes")); 
				var status = DOM.val(DOM.get("#J_SearchStatus")); //类目
				var pid = DOM.val('#J_SearchTypes');
	    	    var data = "pid="+pid+"&nick="+title+"&status="+status+"&dtype="+dtype;
		        return data;  
	
			},
	        showReportView :function() {
		    	var submitHandle = function(o) {
					if(cardReport.chart){
						cardReport.chart.destroy();
					}
					cardReport.chart = new Highcharts.Chart({
							chart: {
								renderTo: 'J_BaoBiao',
								height:400,
								marginBottom: 60
							},
							title: {
								text: null
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
									s = ''+this.x  +'号: '+ this.y;
									return s;
								}
							},
							
							series: [{
								type: 'spline',
								name: '领取',
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
				var value = DOM.val('#J_SearchTypes');
	    	    var data = 'pid='+value;
	    	    new H.widget.asyncRequest().setURI(showReportViewUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			}
		}

	
}, {
    requires: ['utils/showPages/index']
});