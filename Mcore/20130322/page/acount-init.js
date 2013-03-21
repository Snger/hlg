/*
combined files : 

utils/showPages/index
page/acount-init

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
 * @author  你好
 */
KISSY.add('page/acount-init',function (S,showPages) {
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
