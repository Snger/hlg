/**
 * @fileOverview 
 * @author  
 */
KISSY.add(function (S,showPages) {
    // your code here
	var DOM = S.DOM, Event = S.Event;	
       return  	iconControl = {
	         		panel : null,
	                msg : null,
	         		paginator : null,
					promotionItemPaginator: null,
					isTarget : false,
	                init : function(){
						var timeFunName = null;
					    Event.delegate(document,'click dblclick','#J_TopAddToPromo',function(ev){
					    	if(ev.type == 'click'){
					        	 clearTimeout(timeFunName);
					        	 timeFunName = setTimeout(function () {
					                 //console.log('单击');
					                 iconControl.addSelectItemsToPromotion();
					              }, 300); 
					    	}
					         if(ev.type == 'dblclick') {
					        	 clearTimeout(timeFunName); 
					        	 //console.log('双击');
					        	 iconControl.addSelectItemsToPromotion();
					         }
					    });
						Event.on(doc, 'keydown', function(evt) {
							if ( evt.which === 13) {
								if(iconControl.paginator){
									iconControl.paginator.toPage(iconControl.paginator.page);
								}else{
									iconControl.searchTbItems();
								}
							}
						})
		                /*编辑宝贝授权 批量重试*/
		                Event.delegate(document,'click dblclick','.J_removeToPromo',function(ev){
		                    if(!showPermissions('editor_icon','促销图标')){
		                        return ;
		                     }
	                        var type = DOM.attr(ev.currentTarget,'tid');
	                        DOM.val('#J_ExpiredActionType',type);
                            iconControl.batchRetry();
		                })
		    	    	Event.on('#J_TopCheckAll','click',iconControl.checkAll);  //淘宝宝贝全选
		    	    	Event.on('#J_RightSearchBtn','click',iconControl.loadPromotionItems); //搜索活动中宝贝
		 	    	    Event.on('#J_RightCheckAll','click',iconControl.rightCheckAll); //活动中宝贝全选
		 	    	    Event.on('#J_BatchAddBtn','click',iconControl.batchAddItems); //批量添加到活动中
		 	    	    Event.on('#J_RemovePromotionItems','click',iconControl.removePromotionItemHandle); //从活动
	                }, 	
	                hasItems: function() {
	    				checkBoxs = DOM.query("#J_TbItemList .J_CheckBox");
	    				var len = checkBoxs.length;
	    				var flag = false;
	    				for(i=0; i<len; i++){
	    					if(checkBoxs[i].checked && !checkBoxs[i].disabled){
	    						flag = true ;
	    						break;
	    					}
	    	            }
	    				return flag;
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
							iconControl.paginator = new showPages('iconControl.paginator').setRender(iconControl.handlePagination).setPageCount(pageCount).printHtml('#J_Paging',2);
							iconControl.paginator.printHtml('#J_TopPaging',3);
							DOM.hide('#J_LeftLoading');
					    	DOM.show('#J_MainLeftContent');
		        	    };
		        	    var errorHandle = function(o){
							DOM.hide('#J_LeftLoading');
					    	DOM.show('#J_MainLeftContent');
		        	    	new H.widget.msgBox({
							    title:"错误提示",
							    content:o.desc,
							    type:"error",
								autoClose : true,
								timeOut : 3000
							});
		        	    };
						var itemType = DOM.val('#J_Item_Local');
			        	 if(DOM.val(DOM.get("#J_SearchTitle")) != '关键字、商品链接、商品编码'){
		        	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle"))); //标题
		        	    }else{
		        	    	var title ='';
		        	    }
						var itemPage = DOM.val(DOM.get("#J_SelectItemPage"));//每页多少条
						if(itemType == '1'){
							var promoId = DOM.val(DOM.get("#J_PromoId"));
							var data = "q="+title+"&pageSize="+itemPage;
								data +="&pid="+pid+"&promoId="+promoId;
						}else{
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
						}
						data +="&itemType="+itemType;
						if(itemType == 1 && title == ''){
							var url = PROMO_URL+'&pid='+promoId+'&add=1'
							var promoName =  '';
							var str ='<div><span class="no-details-pic"></span>'+
				            		 '<span class="prompt-1">'+promoName+'活动中没有任何宝贝,<a href="'+url+'">点此添加</a>。</span></div>';
							DOM.html('#J_LEmpty',str);
						}else{
							var str ='<div><span class="no-details-pic"></span>'+
				            		 '<span class="prompt-1">没有找到任何宝贝。</span></div>';
							DOM.html('#J_LEmpty',str);
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
			    			iconControl.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_Paging',2);
			    			iconControl.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_TopPaging',3);
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
				    	};
							var itemType = DOM.val('#J_Item_Local');
			        	 if(DOM.val(DOM.get("#J_SearchTitle")) != '关键字、商品链接、商品编码'){
		        	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle"))); //标题
		        	    }else{
		        	    	var title ='';
		        	    }
						var itemPage = DOM.val(DOM.get("#J_SelectItemPage"));//每页多少条
						if(itemType == '1'){
							var promoId = DOM.val(DOM.get("#J_PromoId"));
							var data = "q="+title+"&pageSize="+itemPage;
								data +="&pid="+pid+"&promoId="+promoId+"&page_id="+pageId;
						}else{
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
						}
						data +="&itemType="+itemType;
						DOM.show('#J_LeftLoading');
					    DOM.hide('#J_MainLeftContent');
		        	    new H.widget.asyncRequest().setURI(getItemsFromTbUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
					},
					addSelectItemsToPromotion :function(iid){
						if(!showPermissions('editor_icon','促销图标')){
							return ;
						}
						if ( DOM.hasClass('#J_TopAddToPromo', 'ing' )){
		                    	return;
			             } 
		                DOM.addClass( '#J_TopAddToPromo', 'ing');
						//DOM.removeClass( '#J_TopAddToPromo', 'ing');
						DOM.attr('#J_TopAddToPromo','disabled',true);
						DOM.replaceClass('#J_TopAddToPromo','btm-caozuo-orange','btm-caozuo-gray-none');
						checkBoxs = DOM.query("#J_TbItemList .J_CheckBox");
						var json = [];
						len = checkBoxs.length;
						var translateDiv = DOM.get("#J_Translate");
						for(i=0; i<len; i++){
							var flag = false;
								if(checkBoxs[i].checked && !checkBoxs[i].disabled)
									 flag = true;
							if(flag == true){
		                        var id = checkBoxs[i].value;
		                        var title = H.util.strProcess(DOM.val(DOM.get('#J_ItemTitle_'+id)));
		        				var picUrl = DOM.val(DOM.get('#J_ItemPic_'+id));
		        				var price = DOM.val(DOM.get('#J_ItemPrice_'+id));
		        				var promoItmeId = DOM.val(DOM.get('#J_PromoItemId_'+id));
		        				var iconId = DOM.val(DOM.get('#J_ItemIconId_'+id));
								var outId = H.util.strProcess(DOM.val(DOM.get('#J_ItemOuterId_'+id)));
		        				var iconType = DOM.val(DOM.get('#J_ItemIconType_'+id));
		        				o = '{"id":"' + id + '", "outer_id":"' + outId + '", "title":"' + title + '", "price":"' + price + '", "pic_url":"' + picUrl +'", "promo_itme_id":"' + promoItmeId +'", "icon_id":"' + iconId +'", "icon_type":"' + iconType +'"}';
								o = eval('(' + o + ')');
		                        json.push(o);
	//	        				if(iid!=undefined){
	//	        					break;
	//	        				}
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
							DOM.removeClass( '#J_TopAddToPromo', 'ing' )
							return;
						}
						
			            var itemsJson = KISSY.JSON.stringify(json);
			            var submitHandle = function(o) {
			            	DOM.attr('#J_TopAddToPromo','disabled',false);
							DOM.replaceClass('#J_TopAddToPromo','btm-caozuo-gray-none','btm-caozuo-orange');
			            	if (o.payload.limit != null) {
								status= '操作失败';
								new H.widget.msgBox({
								    title:"操作失败",
								    content:o.payload.limit,
								    type:"error"
								});
		    				} 
	   						if(iconControl.paginator){
								iconControl.paginator.toPage(iconControl.paginator.page);
							}else{
								iconControl.searchTbItems();
							}
							DOM.removeClass( '#J_TopAddToPromo', 'ing' )
		        	    };
		        	    var errorHandle = function(o) {
							DOM.removeClass( '#J_TopAddToPromo', 'ing' )
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
							} else {
								DOM.get('#J_REmpty').style.display = '';
								DOM.css(DOM.query(".J_PromotionItemBtnHolder"),'display','none');
							}
			        	    DOM.html(DOM.get("#J_PromotionItemList"), o.payload.body,true);
							DOM.hide('#J_RightLoading');
							DOM.show('#J_MainRightContent');
			        	    pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
							iconControl.renderPromoItems();
							iconControl.promotionItemPaginator = new showPages('iconControl.promotionItemPaginator').setRender(iconControl.promotionItemPaginationHandle).setPageCount(pageCount).printHtml('#J_PromotionItemPaging',2);
				    	};
				    	 if(DOM.val(DOM.get("#J_RightSearchTitle")) != '关键字、商品链接、商品编码'){
	        	    		var title = encodeURIComponent(DOM.val(DOM.get("#J_RightSearchTitle"))); //标题
	        	   		 }else{
	        	    		var title ='';
	        	   		 }
		        	    var status = DOM.val(DOM.get('#J_SearchStatus'));
		        	    var itemPage = DOM.val(DOM.get("#J_RightSelectItemPage"));//每页多少条
		        	    var status = DOM.val(DOM.get('#J_SearchStatus'));
		        	    var data = "pid="+pid+"&status="+status+"&q="+title+"&pageSize="+itemPage;
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
								DOM.attr('#J_RightCheckAll','checked',false);
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
							} else {
								DOM.get('#J_REmpty').style.display = '';
								DOM.css(DOM.query(".J_PromotionItemBtnHolder"),'display','none');
							}
				    		pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
			    			iconControl.promotionItemPaginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_PromotionItemPaging',2);
			    			DOM.html(DOM.get("#J_PromotionItemList"), o.payload.body);
							iconControl.renderPromoItems();
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
		        	    var status = DOM.val(DOM.get('#J_SearchStatus'));
		        	    var itemPage = DOM.val(DOM.get("#J_RightSelectItemPage"));//每页多少条
		        	    var status = DOM.val(DOM.get('#J_SearchStatus'));
		        	    var data = "pid="+pid+"&status="+status+"&q="+title+"&pageSize="+itemPage+"&page_id="+pageId;
			        	new H.widget.asyncRequest().setURI(loadPromotionItemsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
					},
					
					//将活动中宝贝移除
					removePromotionItemHandle : function(promo_itemid,pidi,type) {
						if(!showPermissions('editor_icon','促销图标')){
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
										timeOut :2000
									
									});
								DOM.attr('#J_RemovePromotionItems','disabled',false);
							    DOM.replaceClass('#J_RemovePromotionItems','btm-caozuo-gray-none','btm-caozuo-orange');
							return ;
						}
						var submitHandle = function(o) {
							DOM.attr('#J_RightCheckAll','checked',false);
							DOM.attr('#J_RemovePromotionItems','disabled',false);
							DOM.replaceClass('#J_RemovePromotionItems','btm-caozuo-gray-none','btm-caozuo-orange');
							if(iconControl.promotionItemPaginator){
								iconControl.promotionItemPaginator.toPage(iconControl.promotionItemPaginator.page);
							}else{
								iconControl.loadPromotionItems();
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
					forceDelItem :function(itemId){
						if(!showPermissions('editor_icon','促销图标')){
							return ;
						}
						var submitHandle = function(o) {
							iconControl.msg.hide();
							if(iconControl.promotionItemPaginator){
								iconControl.promotionItemPaginator.toPage(iconControl.promotionItemPaginator.page);
							}else{
								iconControl.loadPromotionItems();
							}
						};
						var data = "promo_item_id="+itemId;
						iconControl.msg = new H.widget.msgBox({
								    title:"",
									dialogType : 'loading',
								    content:'系统正在处理中，请稍候'	
								});
		        	    new H.widget.asyncRequest().setURI(forceDelUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
					},
					retry : function(itemId,force){
						if(!showPermissions('editor_icon','促销图标')){
							return ;
						}
						var submitHandle = function(o) {
							iconControl.msg.hide();
							if(iconControl.promotionItemPaginator){
								iconControl.promotionItemPaginator.toPage(iconControl.promotionItemPaginator.page);
							}else{
								iconControl.loadPromotionItems();
							}
						};
						var data = "promo_item_id="+itemId+"&force="+force;
						iconControl.msg = new H.widget.msgBox({
								    title:"",
									dialogType : 'loading',
								    content:'系统正在处理中，请稍候'	
								});
		        	    new H.widget.asyncRequest().setURI(retryUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
					},
		            batchRetry :function(){
		                var submitHandle = function(o) {
		                    iconControl.msg.hide();
		                    if(iconControl.promotionItemPaginator){
		                        iconControl.promotionItemPaginator.toPage(iconControl.promotionItemPaginator.page);
		                    }else{
		                        iconControl.loadPromotionItems();
		                    }
		                };
		                var data = "pid="+pid;
		                iconControl.msg = new H.widget.msgBox({
		                                    title:"",
		                                    dialogType : 'loading',
		                                    content:'正在处理中，请稍候' 
		                                });
		                new H.widget.asyncRequest().setURI(batchRetryUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
		            }
	        }
	
}, {
    requires: ['utils/showPages/index']
});