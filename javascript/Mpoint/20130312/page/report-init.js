/*
combined files : 

utils/showPages/index
page/report-init

*/
/**
 * @分页组件
 * @author  
 */
KISSY.add('utils/showPages/index',function (S) {
	var DOM = S.DOM, Event = S.Event, doc = document;
  
	function showPages(name) { //初始化属性 
		var self = this; 
        if (!(self instanceof showPages)) { 
        	return new showPages(name); 
        } 	
		this.pageNum = 4 ;   
		this.name = name;      //对象名称
        this.page = 1;         //当前页数
        this.pageCount = 200;    //总页数
        this.argName = 'page'; //参数名	
  	}

	S.mix(showPages.prototype,{
		jump: function() {
	        return undefined;
	  	},
		
	    //进行当前页数和总页数的验证
        checkPages: function() { 
	     	if (isNaN(parseInt(this.page))) this.page = 1;
		 	if (isNaN(parseInt(this.pageCount))) this.pageCount = 1;
		 	if (this.page < 1) this.page = 1;
		 	if (this.pageCount < 1) this.pageCount = 1;
		 	if (this.page > this.pageCount) this.page = this.pageCount;
		 	this.page = parseInt(this.page);
		 	this.pageCount = parseInt(this.pageCount);
     	},
		
		//生成html代码	  
     	_createHtml: function(mode) { 
	   
         	var self = this, strHtml = '', prevPage = this.page - 1, nextPage = this.page + 1;   
            if (mode == '' || typeof(mode) == 'undefined') mode = 1;
		
            switch (mode) {
				case 1: 
					//模式1 (页数)
                    /* strHtml += '<span class="count">Pages: ' + this.page + ' / ' + this.pageCount + '</span>';*/
                    strHtml += '<span class="number">';
                    if (this.page != 1) {
						strHtml += '<span title="Page 1"><a href="javascript:' + self.name  + '.toPage(1);">1</a></span>';
				    }
                    if (this.page >= 5) {
				   		strHtml += '<span>...</span>';
				    }
				    if (this.pageCount > this.page + 2) {
                   		var endPage = this.page + 2;
                    } else {
                        var endPage = this.pageCount; 
                      }
                    for (var i = this.page - 2; i <= endPage; i++) {
					if (i > 0) {
						if (i == this.page) {
							strHtml += '<span title="Page ' + i + '">' + i + '</span>';
						} else {
							if (i != 1 && i != this.pageCount) {
								strHtml += '<span title="Page ' + i + '"><a href="javascript:' + self.name + '.toPage(' + i + ');">' + i + '</a></span>';
							}
				          }
                    }
                    }
                    if (this.page + 3 < this.pageCount) {
						strHtml += '<span>...</span>';
					}
                    if (this.page != this.pageCount) {
						strHtml += '<span title="Page ' + this.pageCount + '"><a href="javascript:' + self.name + '.toPage(' + this.pageCount + ');">' + this.pageCount + '</a></span>';
					}
					strHtml += '</span><br />';
                    break;
								 
				case 2: 
					//模式2 (前后缩略,页数,首页,前页,后页,尾页)
					
					if(this.pageCount > 1){
	                    strHtml += '<div class="page-bottom"> <div class="sabrosus">';
	                    if (prevPage < 1) {
	                        strHtml += '<span class="pre-none page-pic-no"></span>';
	                    } else {
	                        strHtml += '<a class="" href="javascript:' + self.name + '.toPage(' + prevPage + ');" title="上一页"><span class="pre page-pic-no"></span></a>';
	                      }
	                    if (this.page != 1) {
							//strHtml += ' <a class="a-padding" href="javascript:' + self.name  + '.toPage(1);">1</a>';
						}
						if(this.page - 2<=0){
							var start = 1;
								if (this.pageCount > this.page + 4) {
	                           		var endPage = this.page + 4;
	                           } else {
	                             	var endPage = this.pageCount; 
	                            }
						}else if(this.page + 2>=this.pageCount){
							var start = this.pageCount-4;
							if (this.pageCount > this.page + 4) {
	                       		var endPage = this.page + 4;
	                        } else {
	                         	var endPage = this.pageCount; 
	                        }
						}else {
							var start = this.page - 2;
							if (this.pageCount > this.page + 2) {
		                           		var endPage = this.page + 2;
		                           } else {
		                             	var endPage = this.pageCount; 
		                             }
						}
	                    for (var i = start; i <= endPage; i++) {
	                    if (i > 0) {
	                       	if (i == this.page) {
	                           	strHtml += '<span class="current a-padding">'+ i + '</span>';
	                        } else {
	                           // if (i != 1 && i != this.pageCount) {
	                              	strHtml += '<a class="a-padding" href="javascript:' + self.name + '.toPage(' + i + ');">' + i + '</a>';
	                           // }
						      }
	                    }
	                    }
	                    if (this.page + 5 < this.pageCount) {
							strHtml += '<a class="a-padding" title="" href="javascript:' + self.name + '.toPage(' + (this.page + 3) + ');">...</a>';
						}
				  	    if (this.page != this.pageCount) {
							//strHtml += '<span title="Page ' + this.pageCount + '"><a href="javascript:' + self.name + '.toPage(' + this.pageCount + ');">' + this.pageCount + '</a></span>';
						}
						if (nextPage > this.pageCount) {
	                    	strHtml += '<span class="next-none page-pic-no"></span>';
	                    } else {
	                        strHtml += '<a class="" href="javascript:' + self.name + '.toPage(' + nextPage + ');" title="下一页"><span class="next page-pic-no"></span></a>';
	                      }
						 if (this.pageCount > 5) {
			   					strHtml += '<font class="number">';
			   					strHtml += '共'+this.pageCount+'页&nbsp;到第&nbsp;';
			   					if(this.page>=this.pageCount){
			   						strHtml += '<input style="" type="text" class="page-pic-no w-30 bg-img" id="pageInput' + self.name + '"  value="' + this.pageCount + '" onkeypress="return window.' + self.name + '.formatInputPage(event);" onfocus="this.select()">&nbsp;页';
			   					}else{
			   						strHtml += '<input style="" type="text" class="page-pic-no w-30 bg-img" id="pageInput' + self.name + '"  value="' + (this.page+1) + '" onkeypress="return window.' + self.name + '.formatInputPage(event);" onfocus="this.select()">&nbsp;页';
			   					}
			   					strHtml += '<input type="button" value="" class="page-pic-no gray-btm-h-go w-30 btm-go" onclick="javascript:var page = document.getElementById(\'pageInput' + self.name + '\').value; if(isNaN(Number(page))|| Number(page)==0) { var turnTo = 1;} else if(page>'+this.pageCount+'){ var turnTo = '+this.pageCount+';} else{var turnTo = page;}  window.' + self.name + '.toPage(turnTo);">';
			   					strHtml += '</font>';	
			   					}
	                   strHtml += '<div style="clear:both"></div></div></div> ';
					}
                   break;
			   case 3 :
				   strHtml += '<div class="page-top"><div class="sabrosus"><span class="count">' + this.page + ' / ' + this.pageCount + '</span>';
                   if (prevPage < 1) {
                       strHtml += ' <span class="pre-none page-pic-no"></span>';
                   } else {
                       strHtml += '<a class="border-left-dedede" href="javascript:' + self.name + '.toPage(' + prevPage + ');" title="上一页"><span class="pre page-pic-no"></span></a>';
                     }
                   if (nextPage > this.pageCount) {
                   	strHtml += '<span class="next-none page-pic-no"></span>';
                   } else {
                       strHtml += '<a href="javascript:' + self.name + '.toPage(' + nextPage + ');" title="下一页"><span class="next page-pic-no"></span></a>';
                     }
                  strHtml += '<div style="clear:both"></div></div></div>';
                  break;
					
			}
		    return strHtml;
			   
		},
		 //限定输入页数格式
		formatInputPage : function(e){
			var ie = navigator.appName=="Microsoft Internet Explorer"?true:false;
			if(!ie) var key = e.which;
			else var key = event.keyCode;
			if (key == 8 || key == 46 || (key >= 48 && key <= 57)) return true;
			return false;
		},
      
	    //页面跳转 返回将跳转的页数
		toPage: function( page ,flag) { 
        	var turnTo = 1;
			var self = this;    
            if (typeof(page) == 'object') {
            	turnTo = page.options[page.selectedIndex].value;
            } else {
               	turnTo = page;
              }
			
            self.jump(turnTo,flag,'');
			  
		},
			  
        //显示html代码
	    printHtml: function(contian, mode) {  
			this.checkPages();
            DOM.html(contian,this._createHtml(mode));
			return this;
		},
				   
	    //设置总页数			  
	    setPageCount: function( pagecount ) {
			this.pageCount=pagecount;
	 	    return this;
		},			    
	    
		getPageCount: function() {
            return this.pageCount;
	    },
	    
		//设置跳转 执行函数
        setRender: function(fn) {
			this.jump = fn;
			return this;
		},	
     	setPageNum:function(page_num){
	        this.pageNum = page_num;
		    return this;
		 },
		setPage:function(page){
		    this.page = page;  
		    return this; 
	    }   	   

		  	   
	});

	return showPages;
  
});
/**
 * @fileOverview 
 * @author  
 */
KISSY.add('page/report-init',function (S,showPages) {
	
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
