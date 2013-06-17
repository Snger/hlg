/*
combined files : 

utils/showPages/index
page/item-init

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
KISSY.add('page/item-init',function (S,showPages) {
    // your code here
    	var DOM = S.DOM, Event = S.Event;	
		return promodesc = {
			    	paginator : null,
			    	promodescItemPaginator : null,
			    	itemCache : null,
			    	promodescItemCache : null,
			    	panel : null,
			    	msg : null,
			    	init : function() {
						Event.on(doc, 'keydown', function(evt) {
							if ( evt.which === 13) {
								if(promodesc.promodescItemPaginator){
									promodesc.promodescItemPaginator.toPage(promodesc.promodescItemPaginator.page);
								}else{
									promodesc.loadPromotionItems();
								}
							}
						})	
			    	    Event.on('#J_RightSearchBtn','click',promodesc.loadPromotionItems); //搜索活动中宝贝
			    	    Event.on('#J_RightCheckAll','click',promodesc.rightCheckAll); //活动中宝贝全选
			    	    Event.on('#J_RemovePromotionItems','click',promodesc.removePromotionItemHandle); //从活动中移除宝贝
			        },
					//活动中宝贝全选
					rightCheckAll : function(e) {
						checkBoxs = DOM.query('#J_PromotionItemList .J_CheckBox');
						var len = checkBoxs.length;
						for(i=0; i<len; i++){
							var iid = checkBoxs[i].value;
							if(checkBoxs[i].disabled) continue;
							if(this.checked){
								checkBoxs[i].checked = true;
							} else {
								checkBoxs[i].checked = false;
							}
						}
					},
			        
					//搜索活动中宝贝
			    	loadPromotionItems :function() {
				    	var submitHandle = function(o) {
			        	    totalRecords = o.payload.totalRecords;
			        	    if(totalRecords > 0){
								DOM.get('#J_REmpty').style.display = 'none';	
								DOM.css(DOM.query(".J_PromotionItemBtnHolder"),'display', '');
							} else {
								DOM.get('#J_REmpty').style.display = '';
								DOM.css(DOM.query(".J_PromotionItemBtnHolder"),'display', 'none');
							}
			        	    DOM.html(DOM.get("#J_PromotionItemList"), o.payload.body,true);
							DOM.hide('#J_RightLoading');
					        DOM.show('#J_MainRightContent');
			        	    pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
			        	    promodesc.paginator = new showPages('promodesc.paginator').setRender(promodesc.promodescItemPaginationHandle).setPageCount(pageCount).printHtml('#J_TopPaging',3);
							promodesc.promodescItemPaginator = new showPages('promodesc.promodescItemPaginator').setRender(promodesc.promodescItemPaginationHandle).setPageCount(pageCount).printHtml('#J_PromotionItemPaging',2);
				    	};
				   		 if(DOM.val(DOM.get("#J_RightSearchTitle")) != '关键字、商品链接、商品编码'){
			    	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_RightSearchTitle"))); //标题
			    	    }else{
			    	    	var title ='';
			    	    }
		        	    var status = DOM.val(DOM.get('#J_SearchStatus'));
		        	    var itemPage = DOM.val(DOM.get("#J_SelectItemPage"));//每页多少条
		        	    var data = "promo_id="+pid+"&status="+status+"&q="+title+"&pageSize="+itemPage;
						DOM.show('#J_RightLoading');
					    DOM.hide('#J_MainRightContent');
		        	    new H.widget.asyncRequest().setURI(loadPromotionItemsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
					},
					
					promodescItemPaginationHandle : function(turnTo) {
						pageId = turnTo;
			    		var submitHandle = function(o) {
			    			DOM.get("#J_RightCheckAll").checked = false;
			    			totalRecords = o.payload.totalRecords;
			    			 if(totalRecords > 0){
									DOM.get('#J_REmpty').style.display = 'none';	
									DOM.css(DOM.query(".J_PromotionItemBtnHolder"),'display', '');
								} else {
									DOM.get('#J_REmpty').style.display = '';
									DOM.css(DOM.query(".J_PromotionItemBtnHolder"),'display', 'none');
								}
				    		pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
				    		promodesc.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_TopPaging',3);
			    			promodesc.promodescItemPaginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_PromotionItemPaging',2);
			    			DOM.html(DOM.get("#J_PromotionItemList"), o.payload.body);
							DOM.hide('#J_RightLoading');
					    	DOM.show('#J_MainRightContent');
				    	};
						DOM.show('#J_RightLoading');
					    DOM.hide('#J_MainRightContent');
				    		 if(DOM.val(DOM.get("#J_RightSearchTitle")) != '关键字、商品链接、商品编码'){
				    	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_RightSearchTitle"))); //标题
				    	    }else{
				    	    	var title ='';
				    	    }
			        	    var itemPage = DOM.val(DOM.get("#J_SelectItemPage"));//每页多少条
			        	    var status = DOM.val(DOM.get('#J_SearchStatus'));
			        	    var data = "promo_id="+pid+"&status="+status+"&q="+title+"&page_id="+pageId+"&pageSize="+itemPage;
			        	    new H.widget.asyncRequest().setURI(loadPromotionItemsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
					},
					//将活动中宝贝移除
					removePromotionItemHandle : function(promo_itemid,pidi,type) {
						if(!showPermissions('editor_promodesc','促销详情')){
							return ;
						}
						DOM.attr('#J_RemovePromotionItems','disabled',true);
						DOM.replaceClass('#J_RemovePromotionItems','btm-caozuo-orange','btm-caozuo-gray-none');
						itemIds = [];
						if(promo_itemid && pidi){
							itemIds.push(promo_itemid);
							pid = pidi;
						}else{
							checkBoxs = DOM.query("#J_PromotionItemList .J_CheckBox");
							var len = checkBoxs.length;
							for(i=0; i<len; i++){
			                    if(checkBoxs[i].checked && !checkBoxs[i].disabled){
			                    	itemIds.push(checkBoxs[i].value);
			                    }
							}
						}
						if(itemIds.length == 0){
							new H.widget.msgBox({
								    title:"错误提示",
								    content:'未选择任何宝贝！',
								    type:"error",
									autoClose:true,
									timeOut :2000
								
								});
							DOM.attr('#J_RemovePromotionItems','disabled',false);
						    DOM.replaceClass('#J_RemovePromotionItems','btm-caozuo-gray-none','btm-caozuo-orange');
							return ;
						}
						
						var submitHandle = function(o) {
							DOM.attr('#J_RemovePromotionItems','disabled',false);
						    DOM.replaceClass('#J_RemovePromotionItems','btm-caozuo-gray-none','btm-caozuo-orange');
		        			if(promodesc.promodescItemPaginator){
								promodesc.promodescItemPaginator.toPage(promodesc.promodescItemPaginator.page);
							}else{
								promodesc.loadPromotionItems();
							}
							
		        	    };
		        	    var data = "pid="+pid+"&item_ids="+itemIds+"&form_key="+FORM_KEY;
		        	    new H.widget.asyncRequest().setURI(removePromotionItemUrl).setMethod("POST").setHandle(submitHandle).setData(data).send();
					},
					
					forceDelItem :function(itemId){
						var submitHandle = function(o) {
							promodesc.msg.hide();
							if(promodesc.promodescItemPaginator){
								promodesc.promodescItemPaginator.toPage(promodesc.promodescItemPaginator.page);
							}else{
								promodesc.loadPromotionItems();
							}
						};
						var data = "promo_item_id="+itemId;
						promodesc.msg = new H.widget.msgBox({
								    title:"",
									dialogType : 'loading',
								    content:'正在处理中，请稍候'	
								});
		        	    new H.widget.asyncRequest().setURI(forceDelUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
					},
					retry : function(itemId,force){
						var submitHandle = function(o) {
							promodesc.msg.hide();
							if(promodesc.promodescItemPaginator){
								promodesc.promodescItemPaginator.toPage(promodesc.promodescItemPaginator.page);
							}else{
								promodesc.loadPromotionItems();
							}
						};
						var data = "promo_item_id="+itemId+"&force="+force;
						promodesc.msg = new H.widget.msgBox({
								    title:"",
									dialogType : 'loading',
								    content:'正在处理中，请稍候'	
								});
		        	    new H.widget.asyncRequest().setURI(retryUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
					}
			}
}, {
    requires: ['utils/showPages/index']
});
