/*
combined files : 

utils/showPages/index
page/instock-init

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
KISSY.add('page/instock-init',function(S,showPages){
	var S = KISSY,DOM = S.DOM,Event = S.Event;
	return instock = {
			msg : null,
			init : function(){
				instock.getPlanItemNum();
				instock.searchList();
				Event.on('#J_DelPlan','click',function(){
					instock.delPlan();
				})
				Event.on('#J_SearchBtn','click',function(){
					instock.searchList();
				})
			},
     		searchList : function() {
	            var submitHandle = function(o) {
					DOM.hide('#J_Loading');
					DOM.show('#J_MainRightContent');
	        	    totalRecords = o.payload.totalRecords;
					DOM.css(DOM.get('#J_NoteIcon') ,'display','none');
					if(totalRecords > 0){
						DOM.css(DOM.get('#J_REmpty') ,'display','none');
						DOM.css(DOM.query(".J_PromotionItemBtnHolder") ,'display' , '');
					} else {
						DOM.css(DOM.get('#J_REmpty'), 'display' , '');
						DOM.css(DOM.query(".J_PromotionItemBtnHolder") , 'display' , 'none');
					}
					DOM.html('#J_PromotionItemList' ,o.payload.body);
					var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					instock.paginator = new showPages('instock.paginator').setRender(instock.handlePagination).setPageCount(pageCount).printHtml('#J_BottomPaging',2);
	    	    };
	        	if(DOM.val(DOM.get("#J_SearchTitle")) != '关键字、商品链接、商品编码'){
	    	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle"))); //标题
	    	    }else{
	    	    	var title ='';
	    	    }
	        	var plan_id = DOM.val('#J_PlanId');
	        	var status = DOM.val('#J_Status');
    	    	var data = "title="+title+"&status="+status+"&plan_id="+plan_id+"&page_size=10";
	 			DOM.show('#J_Loading');
				DOM.hide('#J_MainRightContent');
	    	    new H.widget.asyncRequest().setURI(getPlanItemsUrl).setMethod("POST").setHandle(submitHandle).setData(data).send();
			},
	    	handlePagination : function(turnTo) {
		    	pageId = turnTo;
	    		var submitHandle = function(o) {
					DOM.hide('#J_Loading');
					DOM.show('#J_MainRightContent');
	        	    totalRecords = o.payload.totalRecords;
					DOM.css(DOM.get('#J_NoteIcon') ,'display','none');
					if(totalRecords > 0){
						DOM.css(DOM.get('#J_REmpty') ,'display','none');
						DOM.css(DOM.query(".J_PromotionItemBtnHolder") ,'display' , '');
					} else {
						DOM.css(DOM.get('#J_REmpty'), 'display' , '');
						DOM.css(DOM.query(".J_PromotionItemBtnHolder") , 'display' , 'none');
					}
					DOM.html('#J_PromotionItemList' ,o.payload.body);
					var oTriggers = DOM.query('#J_PromotionItemList .J_CheckBox');
	                Event.on(oTriggers, "click", function(ev){
						if(!this.checked){
							DOM.attr('#J_TCheckAll','checked',false);
						}
					});
					var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					instock.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_BottomPaging',2);
		    	};
		    	if(DOM.val(DOM.get("#J_SearchTitle")) != '关键字、商品链接、商品编码'){
	    	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle"))); //标题
	    	    }else{
	    	    	var title ='';
	    	    }
	        	var plan_id = DOM.val('#J_PlanId');
	        	var status = DOM.val('#J_Status');
    	    	var data = "title="+title+"&status="+status+"&plan_id="+plan_id+"&page_id="+pageId+"&page_size=10";
    	        DOM.show('#J_Loading');
				DOM.hide('#J_MainRightContent');
        	    new H.widget.asyncRequest().setURI(getPlanItemsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			//获取上架情况
			getPlanItemNum : function(){
				var submitHandle = function(o) {
					DOM.text('#J_PlanSuccNum',o.payload[0]);
					DOM.text('#J_PlanErrorNum',o.payload[1]);
					DOM.text('#J_PlanWaitNum',o.payload[2]);
				};
				var error = function(o){
					new H.widget.msgBox({
					    title:"错误提示",
					    content:o.desc,
					    type:"error"
					});
				};
				var plan_id = DOM.val('#J_PlanId');
				var data = "plan_id="+plan_id;
	     	    new H.widget.asyncRequest().setURI(getPlanItemNumUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(error).setData(data).send();
			},
			//取消计划
			delPlan : function() {
				new H.widget.msgBox({
				    title: "取消计划",
				    type: "confirm",
				    content: "确定取消计划？",
				    buttons: [{ value: "取消计划" }, { value: "不取消计划" }],
				    success: function (result) {
				        if (result == "取消计划") {
				        	var plan_id = DOM.val('#J_PlanId');
							var data = "plan_id="+plan_id;
			                var submitHandle = function(o) {
			                	new H.widget.msgBox({ type: "sucess",
			                        content: "取消成功",
			         				dialogType:"msg",
			        				autoClose:true,
			        				timeOut:3000,
			                    });
			        	    	KISSY.later(function(){
			        				window.location.href=comeBackUrl;
			            	    },1000,false)
			        	    };
			        	    var errorHandle = function(o){
			        	    	new H.widget.msgBox({
								    title:"错误提示",
								    content:o.desc,
								    type:"error"
								});
								return;
			        	    };
							new H.widget.asyncRequest().setURI(delPlanUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
				        }
				    }
				});
			},
			//立即上架
			addToShelf : function(plan_item_id){
				var submitHandle = function(o) {
					instock.msg.hide();
					new H.widget.msgBox({ type: "sucess",
                        content: "上架成功！",
         				dialogType:"msg",
        				autoClose:true,
        				timeOut:3000,
                    });
        	    	KISSY.later(function(){
        	    		instock.msg.hide();
        				instock.getPlanItemNum();
						if(instock.paginator){
    						instock.paginator.toPage(instock.paginator.page);
    					}else{
    						instock.searchList();
    					}
            	    },1000,false)
				};
				var error = function(o){
					instock.msg.hide();
					instock.msg.setMsg('<div class="point relative"><div class="point-w-1">'+o.desc+'</div></div>').showDialog();
				};
	        	var plan_id = DOM.val('#J_PlanId');
				var data = "plan_id="+plan_id+"&plan_item_id="+plan_item_id;
				instock.msg = new H.widget.msgBox({
												    title:"",
													dialogType : 'loading',
												    content:'系统正在处理'	
												});
	     	    new H.widget.asyncRequest().setURI(listingUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(error).setData(data).send();
			},
			//移除出计划
			removePlan : function(plan_item_id) {
				new H.widget.msgBox({
				    title: "移除出计划",
				    type: "confirm",
				    content: "确定移除出计划？",
				    buttons: [{ value: "确定移除" }, { value: "不移除" }],
				    success: function (result) {
				        if (result == "确定移除") {
			                var submitHandle = function(o) {
			                	new H.widget.msgBox({ type: "sucess",
			                        content: "移除成功！",
			         				dialogType:"msg",
			        				autoClose:true,
			        				timeOut:3000,
			                    });
			        	    	KISSY.later(function(){
			        				instock.getPlanItemNum();
			        	    		if(instock.paginator){
			    						instock.paginator.toPage(instock.paginator.page);
			    					}else{
			    						instock.searchList();
			    					}
			            	    },1000,false)
			        	    };
			        	    var errorHandle = function(o){
			        	    	new H.widget.msgBox({
								    title:"错误提示",
								    content:o.desc,
								    type:"error"
								});
								return;
			        	    };
				        	var plan_id = DOM.val('#J_PlanId');
							var data = "plan_id="+plan_id+"&plan_item_id="+plan_item_id;
							new H.widget.asyncRequest().setURI(removeItemUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
				        }
				    }
				});
				
			}
	}
}, {
    requires: ['utils/showPages/index']
});
