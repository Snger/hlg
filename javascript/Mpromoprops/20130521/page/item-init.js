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
    	return PromopropsItem = {
			    	panel : null,
	                msg : null,
	         		paginator : null,
					promotionItemPaginator: null,
	                init : function(){
						/*编辑活动*/
						 Event.delegate(document,'click','.J_Editor_Promo', function(ev) {
							if(!showPermissions('editor_promoprops','促销道具')){
								return ;
							} 
							var url = DOM.attr(ev.currentTarget,'data');
							var diff  = IsExpired();
						 	if(diff > -5000){
								var sucessHandle = function(o) {
									window.location.href=url;
						 		};
						 		var errorHandle = function(o){
						 			KISSY.Event.fire('.J_TopExpired','click');
						 		};
						 		var data = '';
						  	    new H.widget.asyncRequest().setURI(isExpiredUrl).setMethod("GET").setHandle(sucessHandle).setErrorHandle(errorHandle).setData(data).send();
							}else{
								window.location.href=url;
				 			}
						});

						/*加入宝贝授权*/
						Event.delegate(document,'click','.J_AddToPromo',function(ev){
								var id = DOM.attr(ev.currentTarget,'data');
								var sucess = function(o){
									DOM.val('#J_TotalPromoItems',o.payload);
									if(o.payload >= 150){
										new H.widget.msgBox({
												    title:"温馨提示",
												    content:'非全店类型道具卡宝贝数量不能大于150个，现在已经加入'+o.payload+'请删除多余的宝贝.',
												    type:"info"
												});
									}else{
										var diff  = IsExpired();
									 	if(diff > -5000){
											var sucessHandle = function(o) {
												if(id == '1'){
													PromopropsItem.addSelectItemsToPromotion();
												}
									 		};
									 		var errorHandle = function(o){
									 			KISSY.Event.fire('.J_TopExpired','click');
									 		};
									 		var data = '';
									  	    new H.widget.asyncRequest().setURI(isExpiredUrl).setMethod("GET").setHandle(sucessHandle).setErrorHandle(errorHandle).setData(data).send();
										}else{
											if(id == '1'){
												PromopropsItem.addSelectItemsToPromotion();
											}
							 			}
									}
								}
							  	var error = function(o){
							  		new H.widget.msgBox({
												    title:"错误提示",
												    content:o.desc,
												    type:"error"
												});
						 		};
						 		var data = 'promo_id='+pid;
						  	    new H.widget.asyncRequest().setURI(getPromoItemNumUrl).setMethod("GET").setHandle(sucess).setErrorHandle(error).setData(data).send();
						})
		    	    	Event.on('#J_TopCheckAll','click',PromopropsItem.checkAll);  //淘宝宝贝全选
		    	    	Event.on('#J_RightSearchBtn','click',PromopropsItem.loadPromotionItems); //搜索活动中宝贝
		 	    	    Event.on('#J_RightCheckAll','click',PromopropsItem.rightCheckAll); //活动中宝贝全选
		 	    	    Event.on('#J_BatchAddBtn','click',PromopropsItem.batchAddItems); //批量添加到活动中
		 	    	    Event.on('#J_RemovePromotionItems','click',PromopropsItem.removePromotionItemHandle); //从活动
	                }, 	
	         		searchTbItems : function(flag) {
		                var submitHandle = function(o) {
		                	DOM.removeClass(".J_ItemSelectBtnHolder",'ks-hidden');
		                	DOM.get("#J_NoteIcon").style.display = 'none';
			        	    totalRecords = o.payload.totalRecords;
							if(totalRecords > 0){
								DOM.get('#J_LEmpty').style.display = 'none';
								DOM.css(DOM.query(".J_ItemSelectBtnHolder"),'display' ,'');
							} else {
								DOM.get('#J_LEmpty').style.display = '';
								DOM.css(DOM.query(".J_ItemSelectBtnHolder"),'display' ,'none');
							}
							DOM.html(DOM.get("#J_TbItemList"), o.payload.body,true);
							var lis = DOM.query("#J_TbItemList .J_TbItem");
				        	Event.on(lis, "mouseenter mouseleave click", function(ev){
				        		var el = DOM.get('.J_CheckBox',ev.currentTarget);
	        					if(el.disabled) return;
				        			if(ev.type == 'mouseenter' ){
					            		DOM.addClass(ev.currentTarget, 'mouseover');
					        		}else if(ev.type == 'mouseleave'){
					        			DOM.removeClass(ev.currentTarget, 'mouseover');
					            	}else if(ev.type == 'click'){
					        			if(el.checked == false){
					        				DOM.addClass(ev.currentTarget,'selected');
					        				el.checked = true;
					        			}else{
					        				DOM.removeClass(ev.currentTarget,'selected');
											DOM.attr('#J_TopCheckAll','checked',false);
					        				el.checked = false;
					        			}
				        		}
				        	});
							Event.on(DOM.query('#J_TbItemList .J_CheckBox'),'click',function(ev){
				        		ev.stopPropagation();
				        		var iid = ev.currentTarget.value
				        		if(ev.currentTarget.checked == true){
				        			DOM.addClass('#J_TbItem_'+iid,'selected');
				        		}else{
				        			DOM.removeClass('#J_TbItem_'+iid,'selected');
				        		}
				        	});
							pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
							PromopropsItem.paginator = new showPages('PromopropsItem.paginator').setRender(PromopropsItem.handlePagination).setPageCount(pageCount).printHtml('#J_Paging',2);
							PromopropsItem.paginator.printHtml('#J_TopPaging',3);
							DOM.hide('#J_LeftLoading');
					    	DOM.show('#J_MainLeftContent');
		        	    };
		        	    var errorHandle = function(o){
							DOM.hide('#J_LeftLoading');
					    	DOM.show('#J_MainLeftContent');
        	    			new H.widget.msgBox({
										    title:"错误提示",
										    content:o.desc,
										    type:"error"
										});
		        	    };
			        	 if(DOM.val(DOM.get("#J_SearchTitle")) != '关键字、商品链接、商品编码'){
		        	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle"))); //标题
		        	    }else{
		        	    	var title ='';
		        	    }
						var itemPage = DOM.val(DOM.get("#J_SelectItemPage"));//每页多少条
						var cid = DOM.val(DOM.get("#J_SelectItemCid")); //类目
		    	    	var type = DOM.val(DOM.get("#J_SearchSelling")); //出售中 库中
		    	    	var itemOrder = DOM.val(DOM.get("#J_SelectItemOrder"));//排序方式
		    	    	
		    	    	var data = "q="+title+"&cid="+cid+"&type="+type;
		            	    data +="&itemOrder="+itemOrder+"&pageSize="+itemPage;
							data +="&pid="+pid
		    	    	if (type == 0) {
							//价格区间
							var startPrice = DOM.val(DOM.get("#J_StartPrice"));
							var endPrice = DOM.val(DOM.get("#J_EndPrice"));
							data += "&start_price="+startPrice+"&end_price="+endPrice;
						}
						DOM.show('#J_LeftLoading');
					    DOM.hide('#J_MainLeftContent');
		        	    new H.widget.asyncRequest().setURI(getItemsFromTbUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).setDataType('json').send();
					},
					checkAll : function(e) {
						checkBoxs = DOM.query('#J_TbItemList .J_CheckBox');
						len = checkBoxs.length;
						for(i=0; i<len; i++){
							var iid = checkBoxs[i].value;
							if(checkBoxs[i].disabled) continue;
							if(this.checked){
								checkBoxs[i].checked = true;
								DOM.addClass('#J_TbItem_'+iid,'selected');
							} else {
								checkBoxs[i].checked = false;
								DOM.removeClass('#J_TbItem_'+iid,'selected');
							}
						}
					},
					handlePagination : function(turnTo) {
				    	pageId = turnTo;
			    		var submitHandle = function(o) {
			    			 totalRecords = o.payload.totalRecords;
							 DOM.attr('#J_TopCheckAll','checked',false);
							if(totalRecords > 0){
								DOM.get('#J_LEmpty').style.display = 'none';
								DOM.css(DOM.query(".J_ItemSelectBtnHolder"),'display' ,'');
							} else {
								DOM.get('#J_LEmpty').style.display = '';
								DOM.css(DOM.query(".J_ItemSelectBtnHolder"),'display' ,'none');
							}
							 pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
			    			PromopropsItem.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_Paging',2);
			    			PromopropsItem.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_TopPaging',3);
			    			DOM.html(DOM.get("#J_TbItemList"), o.payload.body,true);
			        	    var lis = DOM.query("#J_TbItemList .J_TbItem");
				        	Event.on(lis, "mouseenter mouseleave click", function(ev){
				        		var el = DOM.get('.J_CheckBox',ev.currentTarget);
	        					if(el.disabled) return;
				        			if(ev.type == 'mouseenter' ){
					            		DOM.addClass(ev.currentTarget, 'mouseover');
					        		}else if(ev.type == 'mouseleave'){
					        			DOM.removeClass(ev.currentTarget, 'mouseover');
					            	}else if(ev.type == 'click'){
								      	if(el.checked == false){
				        				DOM.addClass(ev.currentTarget,'selected');
				        				el.checked = true;
				        			}else{
				        				DOM.removeClass(ev.currentTarget,'selected');
										DOM.attr('#J_TopCheckAll','checked',false);
				        				el.checked = false;
				        			}
				        		}
				        	});
							Event.on(DOM.query('#J_TbItemList .J_CheckBox'),'click',function(ev){
				        		ev.stopPropagation();
				        		var iid = ev.currentTarget.value
				        		if(ev.currentTarget.checked == true){
				        			DOM.addClass('#J_TbItem_'+iid,'selected');
				        		}else{
				        			DOM.removeClass('#J_TbItem_'+iid,'selected');
				        		}
				        	});
							DOM.hide('#J_LeftLoading');
					    	DOM.show('#J_MainLeftContent');
	//						PromopropsItem.msg.hide();
				    	};
			        	 if(DOM.val(DOM.get("#J_SearchTitle")) != '关键字、商品链接、商品编码'){
		        	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle"))); //标题
		        	    }else{
		        	    	var title ='';
		        	    }
						var itemPage = DOM.val(DOM.get("#J_SelectItemPage"));//每页多少条
						var cid = DOM.val(DOM.get("#J_SelectItemCid")); //类目
		    	    	var type = DOM.val(DOM.get("#J_SearchSelling")); //出售中 库中
		    	    	var itemOrder = DOM.val(DOM.get("#J_SelectItemOrder"));//排序方式
		    	    	
		    	    	var data = "q="+title+"&cid="+cid+"&type="+type;
		            	    data +="&itemOrder="+itemOrder+"&pageSize="+itemPage;
							data +="&pid="+pid+"&page_id="+pageId
		    	    	if (type == 0) {
							//价格区间
							var startPrice = DOM.val(DOM.get("#J_StartPrice"));
							var endPrice = DOM.val(DOM.get("#J_EndPrice"));
							data += "&start_price="+startPrice+"&end_price="+endPrice;
						}
						DOM.show('#J_LeftLoading');
					    DOM.hide('#J_MainLeftContent');
		        	    new H.widget.asyncRequest().setURI(getItemsFromTbUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
					},
					addSelectItemsToPromotion :function(iid){
						if(!showPermissions('editor_promoprops','促销道具')){
							return ;
						}
						DOM.attr('#J_TopAddToPromo','disabled',true);
						DOM.replaceClass('#J_TopAddToPromo','btm-caozuo-orange','btm-caozuo-gray-none');
						checkBoxs = DOM.query("#J_TbItemList .J_CheckBox");
						var json = [];
						len = checkBoxs.length;
						var translateDiv = DOM.get("#J_Translate");
						for(i=0; i<len; i++){
							var flag = false;
							if(iid!=undefined){
								if(checkBoxs[i].value == iid && !checkBoxs[i].disabled)
									 flag = true;
							}else{
								if(checkBoxs[i].checked && !checkBoxs[i].disabled)
									 flag = true;
							}
							if(flag == true){
								var totalNum = Number(DOM.val('#J_TotalPromoItems'));	 
								totalNum = totalNum+1;
								if(totalNum >150){
									new H.widget.msgBox({
												    title:"温馨提示",
												    content:'非全店类型道具卡宝贝数量不能大于150个，当前已加入'+totalNum+'个宝贝，请删除多余的宝贝。',
												    type:"info"
												});
									break;
								}else{
									 DOM.val('#J_TotalPromoItems',totalNum);
								}
		                        var id = checkBoxs[i].value;
		                        var title = H.util.strProcess(DOM.val(DOM.get('#J_ItemTitle_'+id)));
		        				var picUrl = DOM.val(DOM.get('#J_ItemPic_'+id));
		        				var price = DOM.val(DOM.get('#J_ItemPrice_'+id));
								var outId = H.util.strProcess(DOM.val(DOM.get('#J_ItemOuterId_'+id)));
		        				o = '{"id":"' + id + '", "outer_id":"' + outId + '", "title":"' + title + '", "price":"' + price + '", "pic_url":"' + picUrl +'"}';
								o = eval('(' + o + ')');
		                        json.push(o);
		        				if(iid!=undefined){
		        					break;
		        				}
							}
			            }
						//alert(KISSY.JSON.stringify(json));
						if(json.length == 0){
							new H.widget.msgBox({
									    title:"错误提示",
									    content:'未选择任何宝贝！',
									    type:"error",
										autoClose:true,
										timeOut :2000
									
									});
							DOM.attr('#J_TopAddToPromo','disabled',false);
							DOM.replaceClass('#J_TopAddToPromo','btm-caozuo-gray-none','btm-caozuo-orange');
							return;
						}
			            var itemsJson = KISSY.JSON.stringify(json);
			            var submitHandle = function(o) {
			            	DOM.attr('#J_TopAddToPromo','disabled',false);
							DOM.replaceClass('#J_TopAddToPromo','btm-caozuo-gray-none','btm-caozuo-orange');
			            	if (o.payload.limit != null) {
								new H.widget.msgBox({
								    title:"操作失败",
								    content:o.payload.limit,
								    type:"error"
								});
		    				} 
	   						if(PromopropsItem.paginator){
								PromopropsItem.paginator.toPage(PromopropsItem.paginator.page);
							}else{
								PromopropsItem.searchTbItems();
							}
		        	    };
		        	    var errorHandle = function(o) {
		        	    	DOM.attr('#J_TopAddToPromo','disabled',false);
							DOM.replaceClass('#J_TopAddToPromo','btm-caozuo-gray-none','btm-caozuo-orange');
							new H.widget.msgBox({
									    title:"错误提示",
									    content:o.desc,
									    type:"error"
									});
		            	};
		         	    var data = "pid="+pid+"&items="+itemsJson+"&form_key="+FORM_KEY;
		         	    new H.widget.asyncRequest().setURI(addPromoItemsUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
					},
	
					//搜索活动中宝贝
			    	loadPromotionItems :function() {
				    	var submitHandle = function(o) {
			        	    totalRecords = o.payload.totalRecords;
			        	    if(totalRecords > 0){
								DOM.get('#J_REmpty').style.display = 'none';	
								DOM.css(DOM.query(".J_PromotionItemBtnHolder"),'display','');
								if(totalRecords == 1){
									new H.widget.msgBox({
												    title:"温馨提示",
												    content:'非全店道具卡宝贝数量需大于1个，否则活动不会生效。',
												    type:"info"
												});
								}
//								if(totalRecords > 150){
//									var str = '<div class="point"><span>非全店类型道具卡宝贝数量不能大于150个，请删除多余的宝贝，或酌情分多次活动创建</span><br/><div style="width:80px;" class="btm-content btm-margin-30auto"><input name="" type="button" value="关闭" onclick="PromopropsItem.msg.hide()" class="btm-68-orange fl" style="display:inline" /></div></div>'; 
//									PromopropsItem.msg.setHeader('温馨提示').setMsg(str).showDialog();	
//								}
							} else {
								DOM.get('#J_REmpty').style.display = '';
								DOM.css(DOM.query(".J_PromotionItemBtnHolder"),'display','none');
							}
			        	    DOM.html(DOM.get("#J_PromotionItemList"), o.payload.body,true);
	//		        	    PromopropsItem.msg.hide();
							DOM.hide('#J_RightLoading');
							DOM.show('#J_MainRightContent');
			        	    pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
							PromopropsItem.renderPromoItems();
							PromopropsItem.promotionItemPaginator = new showPages('PromopropsItem.promotionItemPaginator').setRender(PromopropsItem.promotionItemPaginationHandle).setPageCount(pageCount).printHtml('#J_PromotionItemPaging',2);
				    	};
				    	 if(DOM.val(DOM.get("#J_RightSearchTitle")) != '关键字、商品链接、商品编码'){
	        	    		var title = encodeURIComponent(DOM.val(DOM.get("#J_RightSearchTitle"))); //标题
	        	   		 }else{
	        	    		var title ='';
	        	   		 }
		        	    var status = DOM.val(DOM.get('#J_SearchStatus'));
		        	    var itemPage = DOM.val(DOM.get("#J_RightSelectItemPage"));//每页多少条
		        	    var status = DOM.val(DOM.get('#J_SearchStatus'));
		        	    var data = "pid="+pid+"&status="+status+"&q="+title+"&page_size="+itemPage;
						DOM.show('#J_RightLoading');
						DOM.hide('#J_MainRightContent');
		        	    new H.widget.asyncRequest().setURI(loadPromotionItemsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
					},
					
					renderPromoItems : function(){
						var lis = DOM.query("#J_PromotionItemList .J_TbItem");
			        	Event.on(lis, "mouseenter mouseleave click", function(ev){
			        		var el = DOM.get('.J_CheckBox' ,ev.currentTarget);
			        		if(el.disabled) return;
			        		if(ev.type == 'mouseenter'){
								DOM.addClass(ev.currentTarget,'hover');
			        		}else if(ev.type == 'mouseleave'){
								DOM.removeClass(ev.currentTarget,'hover')
							}else if(ev.type == 'click'){
			        			if(el.checked == false){
			        				el.checked = true;
			        			}else{
									DOM.attr('#J_RightCheckAll','checked',false);
			        				el.checked = false;
			        			}
			        		}
			        	})
						Event.on(DOM.query('#J_PromotionItemList .J_CheckBox'),'click',function(ev){
			        		ev.stopPropagation();
			        		var iid = ev.currentTarget.value
			        		if(ev.currentTarget.checked == true){
			        			DOM.addClass('#J_Item_'+iid,'selected');
			        		}else{
			        			DOM.removeClass('#J_Item_'+iid,'selected');
			        		}
		        		});
					},
					promotionItemPaginationHandle : function(turnTo) {
						pageId = turnTo;
			    		var submitHandle = function(o) {
			    			DOM.get("#J_RightCheckAll").checked = false;
			    			totalRecords = o.payload.totalRecords;
			        	     if(totalRecords > 0){
								DOM.get('#J_REmpty').style.display = 'none';	
								DOM.css(DOM.query(".J_PromotionItemBtnHolder"),'display','');
								if(totalRecords == 1){
										new H.widget.msgBox({
												    title:"温馨提示",
												    content:'非全店道具卡宝贝数量需大于1个，否则活动不会生效。',
												    type:"info"
												});
								}
//								if(totalRecords > 150){
//									var str = '<div class="point"><span>非全店类型道具卡宝贝数量不能大于150个，请删除多余的宝贝，或酌情分多次活动创建</span><br/><div style="width:80px;" class="btm-content btm-margin-30auto"><input name="" type="button" value="关闭" onclick="PromopropsItem.msg.hide()" class="btm-68-orange fl" style="display:inline" /></div></div>'; 
//									PromopropsItem.msg.setHeader('温馨提示').setMsg(str).showDialog();	
//								}
							} else {
								DOM.get('#J_REmpty').style.display = '';
								DOM.css(DOM.query(".J_PromotionItemBtnHolder"),'display','none');
							}
				    		pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
			    			PromopropsItem.promotionItemPaginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_PromotionItemPaging',2);
			    			DOM.html(DOM.get("#J_PromotionItemList"), o.payload.body);
	//		    			PromopropsItem.msg.hide();
							PromopropsItem.renderPromoItems();
							DOM.hide('#J_RightLoading');
							DOM.show('#J_MainRightContent');
				    	};
	//			    	PromopropsItem.msg.setMsg('正在获取宝贝，请稍候').show();
						DOM.show('#J_RightLoading');
						DOM.hide('#J_MainRightContent');
				    	 if(DOM.val(DOM.get("#J_RightSearchTitle")) != '关键字、商品链接、商品编码'){
	        	    		var title = encodeURIComponent(DOM.val(DOM.get("#J_RightSearchTitle"))); //标题
	        	   		 }else{
	        	    		var title ='';
	        	   		 }
		        	    var status = DOM.val(DOM.get('#J_SearchStatus'));
		        	    var itemPage = DOM.val(DOM.get("#J_RightSelectItemPage"));//每页多少条
		        	    var status = DOM.val(DOM.get('#J_SearchStatus'));
		        	    var data = "pid="+pid+"&status="+status+"&q="+title+"&page_size="+itemPage+"&page_id="+pageId;
			        	new H.widget.asyncRequest().setURI(loadPromotionItemsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
					},
					
					//将活动中宝贝移除
					removePromotionItemHandle : function(promo_itemid,pidi,type) {
						if(!showPermissions('editor_promoprops','促销道具')){
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
							len = checkBoxs.length;
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
										timeOut :3000
									
									});
								DOM.attr('#J_RemovePromotionItems','disabled',false);
							    DOM.replaceClass('#J_RemovePromotionItems','btm-caozuo-gray-none','btm-caozuo-orange');
							return ;
						}
						var submitHandle = function(o) {
							DOM.attr('#J_RemovePromotionItems','disabled',false);
							DOM.replaceClass('#J_RemovePromotionItems','btm-caozuo-gray-none','btm-caozuo-orange');
							
							if(type != 'promoItems'){
				        		PromopropsItem.loadPromotionItems();
							}else{
									if(iconControl.paginator){
										iconControl.paginator.toPage(iconControl.paginator.page);
									}else{
										iconControl.searchPromoItems();
									}
							}
		        	    };
		        	    var data = "pid="+pid+"&item_ids="+itemIds+"&form_key="+FORM_KEY;
		        	    new H.widget.asyncRequest().setURI(removePromotionItemUrl).setMethod("POST").setHandle(submitHandle).setData(data).send();
					},
					//活动中宝贝全选
					rightCheckAll : function(e) {
						checkBoxs = DOM.query('#J_PromotionItemList .J_CheckBox');
						len = checkBoxs.length;
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
					retry : function(itemId,force){
						if(!showPermissions('editor_promoprops','促销道具')){
							return ;
						}
						var submitHandle = function(o) {
							PromopropsItem.msg.hide();
							if(PromopropsItem.promotionItemPaginator){
								PromopropsItem.promotionItemPaginator.toPage(PromopropsItem.promotionItemPaginator.page);
							}else{
								PromopropsItem.loadPromotionItems();
							}
						};
						var data = "promo_item_id="+itemId+"&force="+force;
						PromopropsItem.msg = new H.widget.msgBox({
								    title:"",
									dialogType : 'loading',
								    content:'系统正在处理中，请稍候'	
								});
		        	    new H.widget.asyncRequest().setURI(retryUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
					}
			
					
				
					
		    	};
}, {
    requires: ['utils/showPages/index']
});
