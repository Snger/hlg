/*
combined files : 

utils/showPages/index
page/point-init

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
KISSY.add('page/point-init',function (S,showPages) {
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
