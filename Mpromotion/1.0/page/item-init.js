/**
 * @fileOverview 
 * @author  
 */
KISSY.add(function (S,showPages,itemHandle) {
    // your code here
      var DOM = S.DOM, Event = S.Event;
	
	    return promotionControl = {
			
			paginator : null,
	    	promotionItemPaginator : null,
	    	itemCache : null,
	    	promotionItemCache : null,
	    	panel : null,
	    	titlePanel : null,
	    	designIconPanel : null,
	    	initDesignFlag : false,
	    	initiconPanelFlag : false,
	    	iconPanel : null,
	    	iconArr : [],
	    	msg : null,
	    	bd : null,
	    	tabs : null,
	    	
	    	init : function() {
				
				  var timeFunName = null;
				  /*加入宝贝授权*/
					Event.delegate(document,'click dblclick','.J_AddToPromo',function(ev){
							if(!showPermissions('editor_promotion',"编辑促销活动")){
					   			return ;
					   		 }
							promotionControl.addBefore();
							var id = DOM.attr(ev.currentTarget,'data');
							if(id == 1 ){
								DOM.val('#J_ExpiredActionType','addItems');
							}else{
								DOM.val('#J_ExpiredActionType','addItem');
								DOM.attr('#J_ExpiredActionType','data',id);
							}
							if(ev.type == 'click'){
					        	 clearTimeout(timeFunName);
					        	 timeFunName = setTimeout(function () {
			                         //console.log('单击');
			                         var sucess = function(o){
											DOM.val('#J_TotalPromoItems',o.payload);
											if(o.payload >= 150 && !KISSY.inArray(typeId,['130','10','22','2','32'])){
												promotionControl.addAfter();
												new H.widget.msgBox({
												    title:"温馨提示",
												    content:'非全店活动宝贝数量不能大于150个，现在已经加入'+o.payload+'请删除多余的宝贝，或酌情分多次活动创建',
												    type:"info"
												
												});
											}else{
												var diff  = IsExpired();
								       			 if(diff > -5000 ){
								      					var sucessHandle = function(o) {
								      						if(id == '1'){
																promotionControl.addSelectItemsToPromotion();
															}else{
																promotionControl.addSelectItemsToPromotion(id);
															}
								      			 		};
								      			 		var errorHandle = function(o){
								      			 			KISSY.Event.fire('.J_TopExpired','click');
												 			promotionControl.addAfter();
								      			 		};
								      			 		var data = '';
								      			  	    new H.widget.asyncRequest().setURI(isExpiredUrl).setMethod("GET").setHandle(sucessHandle).setErrorHandle(errorHandle).setData(data).send();
								      			}else{
								      				if(id == '1'){
														promotionControl.addSelectItemsToPromotion();
													}else{
														promotionControl.addSelectItemsToPromotion(id);
													}
								      			}
											}
			                         	}
								 		var error = function(o){
									 			promotionControl.addAfter();
												new H.widget.msgBox({
												    title:"错误提示",
												    content:o.desc,
												    type:"error"
												});
								 		};
								 		var data = 'promo_id='+pid;
								  	    new H.widget.asyncRequest().setURI(getPromoItemNumUrl).setMethod("GET").setHandle(sucess).setErrorHandle(error).setData(data).send();
			                      }, 300); 
				        	}
		                     if(ev.type == 'dblclick') {
		                    	 clearTimeout(timeFunName); 
		                    	 //console.log('双击');
		                    	 var sucess = function(o){
										DOM.val('#J_TotalPromoItems',o.payload);
										if(o.payload >= 150 && !KISSY.inArray(typeId,['130','10','22','2','32'])){
											promotionControl.addAfter();
											new H.widget.msgBox({
												    title:"温馨提示",
												    content:'非全店活动宝贝数量不能大于150个，现在已经加入'+o.payload+'请删除多余的宝贝，或酌情分多次活动创建',
												    type:"info"
												
												});
										}else{
											var diff  = IsExpired();
							       			 if(diff > -5000 ){
							      					var sucessHandle = function(o) {
							      						if(id == '1'){
															promotionControl.addSelectItemsToPromotion();
														}else{
															promotionControl.addSelectItemsToPromotion(id);
														}
							      			 		};
							      			 		var errorHandle = function(o){
							      			 			KISSY.Event.fire('.J_TopExpired','click');
											 			promotionControl.addAfter();
							      			 		};
							      			 		var data = '';
							      			  	    new H.widget.asyncRequest().setURI(isExpiredUrl).setMethod("GET").setHandle(sucessHandle).setErrorHandle(errorHandle).setData(data).send();
							      			}else{
							      				if(id == '1'){
													promotionControl.addSelectItemsToPromotion();
												}else{
													promotionControl.addSelectItemsToPromotion(id);
												}
							      			}
										}
									}
							 		var error = function(o){
							 			promotionControl.addAfter();
										new H.widget.msgBox({
										    title:"错误提示",
										    content:o.desc,
										    type:"error"
										});
							 		};
							 		var data = 'promo_id='+pid;
							  	    new H.widget.asyncRequest().setURI(getPromoItemNumUrl).setMethod("GET").setHandle(sucess).setErrorHandle(error).setData(data).send();
		                     }
					})
				/*编辑宝贝授权 重启宝贝。批量编辑*/
				Event.delegate(document,'click dblclick','.J_removeToPromo',function(ev){
					if(!showPermissions('editor_promotion',"编辑促销活动")){
			   			return ;
			   		 }
					   var type = DOM.attr(ev.currentTarget,'tid');
					   DOM.val('#J_ExpiredActionType',type);
					   if(type == 'editorOne'){
						   var idd = DOM.attr(ev.currentTarget,'data');
						   DOM.attr('#J_ExpiredActionType','data',idd);
						}else if(type == 'restartOne'){
							  idd = DOM.attr(ev.currentTarget,'data');
							  pidd = DOM.attr(ev.currentTarget,'pid');
							  DOM.attr('#J_ExpiredActionType','data',idd);
							  DOM.attr('#J_ExpiredActionType','pid',pidd);
						}
					    var diff  = IsExpired();
		       			 if(diff > -5000 ){
		      					var sucessHandle = function(o) {
		      						    if(type == 'editorOne'){
										   promotionControl.editItem(idd);
										}else if(type == 'editorAll'){
											promotionControl.editPromoItem();
										}else if(type == 'restartOne'){
											 promotionControl.restartPromotionItemHandle(idd,pidd)
										}else if(type == 'restartAll' ){
											promotionControl.restartPromotionItemHandle();
										}else if(type == 'batchRetryAll'){
											promotionControl.batchRetry();
										}
		      			 		};
		      			 		var errorHandle = function(o){
		      			 			KISSY.Event.fire('.J_TopExpired','click');
		      			 		};
		      			 		var data = '';
		      			  	    new H.widget.asyncRequest().setURI(isExpiredUrl).setMethod("GET").setHandle(sucessHandle).setErrorHandle(errorHandle).setData(data).send();
		      			}else{
		      				 if(type == 'editorOne'){
							   promotionControl.editItem(idd);
							}else if(type == 'editorAll'){
								promotionControl.editPromoItem();
							}else if(type == 'restartOne'){
								 promotionControl.restartPromotionItemHandle(idd,pidd)
							}else if(type == 'restartAll' ){
								promotionControl.restartPromotionItemHandle();
							}else if(type == 'batchRetryAll'){
								promotionControl.batchRetry();
							}
		      			}
				})
				/*批量加入授权*/
				Event.delegate(document,'click dblclick','#J_BatchAddItems',function(ev){
					DOM.val('#J_ExpiredActionType','batchAdd');
					if(ev.type == 'click'){
			        	 clearTimeout(timeFunName);
			        	 timeFunName = setTimeout(function () {
	                         //console.log('单击');
	                         if(!showPermissions('editor_promotion',"编辑促销活动")){
	     			   			return ;
	     			   		 }
	     					DOM.attr('#J_BatchAddItems','disabled',true);
	     					DOM.replaceClass('#J_BatchAddItems','btm-caozuo-gray','btm-caozuo-gray-none');
	     					var diff  = IsExpired();
			       			 if(diff > -5000 ){
			      					var sucessHandle = function(o) {
			      						promotionControl.batchAddItems();
			      			 		};
			      			 		var errorHandle = function(o){
			      			 			DOM.attr('#J_BatchAddItems','disabled',false);
		     							DOM.replaceClass('#J_BatchAddItems','btm-caozuo-gray-none','btm-caozuo-gray');
		     				 			KISSY.Event.fire('.J_TopExpired','click');
			      			 		};
			      			 		var data = '';
			      			  	    new H.widget.asyncRequest().setURI(isExpiredUrl).setMethod("GET").setHandle(sucessHandle).setErrorHandle(errorHandle).setData(data).send();
			      			}else{
			      				promotionControl.batchAddItems();
			      			}
	                      }, 300); 
		        	}
                    if(ev.type == 'dblclick') {
                   	 clearTimeout(timeFunName); 
                   	 //console.log('双击');
	                   	if(!showPermissions('editor_promotion',"编辑促销活动")){
				   			return ;
				   		 }
						DOM.attr('#J_BatchAddItems','disabled',true);
						DOM.replaceClass('#J_BatchAddItems','btm-caozuo-gray','btm-caozuo-gray-none');
						 var diff  = IsExpired();
		       			 if(diff > -5000 ){
		      					var sucessHandle = function(o) {
		      						promotionControl.batchAddItems();
		      			 		};
		      			 		var errorHandle = function(o){
		      			 			DOM.attr('#J_BatchAddItems','disabled',false);
	     							DOM.replaceClass('#J_BatchAddItems','btm-caozuo-gray-none','btm-caozuo-gray');
	     				 			KISSY.Event.fire('.J_TopExpired','click');
		      			 		};
		      			 		var data = '';
		      			  	    new H.widget.asyncRequest().setURI(isExpiredUrl).setMethod("GET").setHandle(sucessHandle).setErrorHandle(errorHandle).setData(data).send();
		      			}else{
		      				promotionControl.batchAddItems();
		      			}
                    }
				});

				/*过滤活动宝贝*/
				Event.on('#J_filterCurrent','click', function(ev){
					if(ev.currentTarget.checked == true){
						DOM.removeAttr('#J_filterSimilar',"checked");
						DOM.val('#J_filter','1');
					}else{
						DOM.val('#J_filter','0');
					};						
					promotionControl.searchTbItems();
				});
				Event.on('#J_filterSimilar','click', function(ev){
					if(ev.currentTarget.checked == true){
						DOM.removeAttr('#J_filterCurrent',"checked");
						DOM.val('#J_filter','2');
					}else{
						DOM.val('#J_filter','0');
					};	
					promotionControl.searchTbItems();
				});	
				/*同步宝贝*/
				Event.on('#J_SyncItemsButton','click', function(ev){
					var box = DOM.parent(ev.currentTarget);
					DOM.hide(box);
				    var submitHandle = function(o) {
						new H.widget.msgBox({
									    title:"温馨提示",
									    content:'同步数据请求成功，请点击搜索查看宝贝。如无法显示请过1分钟左右再查看！',
									    type:"info"
									
									});
						KISSY.later(function(box){DOM.show(box);},60000,false,null,box)
			        }
					var data = "";
					new H.widget.asyncRequest().setURI(syncItemsUrl).setHandle(submitHandle).setMethod("GET").setData(data).setDataType('json').send();
				});	
				
	    	    Event.on('#J_SearchBtn','click',promotionControl.searchTbItems); //搜索淘宝宝贝
	    	    Event.on('#J_RightSearchBtn','click',promotionControl.loadPromotionItems); //搜索活动中宝贝
	    	    Event.on('#J_CheckAll','click',promotionControl.checkAll);  //淘宝宝贝全选
	    	    Event.on('#J_TopCheckAll','click',promotionControl.checkAll);  //淘宝宝贝全选
	    	    Event.on('#J_RightCheckAll','click',promotionControl.rightCheckAll); //活动中宝贝全选
	    	  	Event.on('#J_RemovePromotionItems','click',promotionControl.removePromotionItemHandle); //从活动中移除宝贝
	    	    Event.on('#J_PausePromotionItems','click',promotionControl.pausePromotionItemHandle); //从活动中暂停宝贝
	    	     //vvvv
				Event.on('#J_Sort .sort','click',function(ev){
					if(DOM.hasClass(ev.currentTarget,'current')){
						return ;
					}
					DOM.removeClass(DOM.query('#J_Sort .sort'),'current');
					DOM.addClass(ev.currentTarget,'current');
					var data = DOM.attr(ev.currentTarget,'data')+':desc';
					DOM.val('#J_SortValue',data);
					promotionControl.searchTbItems();
					DOM.html('#J_SortName',DOM.html(ev.currentTarget));
				});
			   
	        },
	        //清除淘宝特价
	        deleteTbSpec : function(itemId,type){
				if(!showPermissions('editor_promotion',"编辑促销活动")){
		   			return ;
		   		}
	        	var submitHandle = function(o){
        				if(promotionControl.paginator){
							promotionControl.paginator.toPage(promotionControl.paginator.page);
						}else{
							promotionControl.searchPromoItems();
						}
	        	};
	        	var error = function(o){
					DOM.show('#J_deleteTbSpec_'+itemId);
					DOM.hide('#J_MinLoading_'+itemId);
	        	};
				DOM.hide('#J_deleteTbSpec_'+itemId);
				DOM.show('#J_MinLoading_'+itemId);
	        	var data = "item_id="+itemId;
	        	new H.widget.asyncRequest().setURI(delTbSpecUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(error).setData(data).setDataType('json').send();
	        },
	        //批量添加宝贝
	        batchAddItems: function() {
				if(!showPermissions('editor_promotion',"编辑促销活动")){
	   				return ;
		   		}
	        	var submitHandle = function(o) {
					new H.widget.msgBox({
						    title:"成功提示",
						    content:'操作成功',
						    type:"info"
						});
	        		S.later(function(){window.location.reload();},1000,false ,null,null);
	        	};
	            var data = "&pid="+pid;
	    		var cid = DOM.val(DOM.get("#J_SelectItemCid"));
	    		if(DOM.val(DOM.get("#J_SearchTitle")) != '关键字、商品链接、商品编码'){
	    			var title = encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle"))); //标题
	        	}else{
	        	    var title ='';
	        	}
		    	var type = DOM.val(DOM.get("#J_SearchSelling"));
		    	data += "&title="+title+"&cid="+cid+"&type="+type;
	    	    var startPrice = DOM.val(DOM.get("#J_StartPrice"));
	    	    var endPrice = DOM.val(DOM.get("#J_EndPrice"));
	    	    data += "&start_price="+startPrice+"&end_price="+endPrice;
	        	DOM.attr('#J_BatchAddItems','disabled',true);
				DOM.replaceClass('#J_BatchAddItems','btm-caozuo-gray','btm-caozuo-gray-none');
	        	new H.widget.asyncRequest().setURI(batchAddUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			getParamsData : function(){
				if(DOM.val(DOM.get("#J_SearchTitle")) != '关键字、商品链接、商品编码'){
        	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle"))); //标题
        	    }else{
        	    	var title ='';
        	    }
				var is_filter = DOM.val('#J_filter');//过滤活动宝贝
                var cid = DOM.val(DOM.get("#J_SelectItemCid")); //类目
    	    	var type = DOM.val(DOM.get("#J_SearchSelling")); //出售中 库中
    	    	var sortvalue = DOM.val('#J_SortValue');
    	    	if(sortvalue == 0 || sortvalue == 1){
					var itemOrder = DOM.val(DOM.get("#J_SelectItemOrder"));//排序方式
				}else{
					var itemOrder = sortvalue;//排序方式
				}
    	    	var itemPage = DOM.val(DOM.get("#J_SelectItemPage"));//每页多少条
    	    	var data = "q="+title+"&cid="+cid+"&type="+type;
            	    data +="&itemOrder="+itemOrder+"&pageSize="+itemPage;
					data +="&pid="+pid;
					data +="&is_filter="+is_filter;
//    	    	if (type == 0) {
					//价格区间
					var startPrice = DOM.val(DOM.get("#J_StartPrice"));
					var endPrice = DOM.val(DOM.get("#J_EndPrice"));
					data += "&start_price="+startPrice+"&end_price="+endPrice;
//				}
				return data ;
			},
	        
	       //搜索淘宝宝贝
	        searchTbItems : function() {
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
					promotionControl.renderItems(o.payload.body);
					pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					promotionControl.paginator = new showPages('promotionControl.paginator').setRender(promotionControl.handlePagination).setPageCount(pageCount).printHtml('#J_Paging',2);
					promotionControl.paginator = new showPages('promotionControl.paginator').setRender(promotionControl.handlePagination).setPageCount(pageCount).printHtml('#J_TopPaging',3);
 					DOM.hide('#J_LeftLoading');
					DOM.show('#J_MainLeftContent');
        	    };
        	    var errorHandle = function(o){
					DOM.hide('#J_Loading');
					DOM.show('#J_MainLeftContent');
					new H.widget.msgBox({
							    title:"错误提示",
							    content:o.desc,
							    type:"error",
								autoClose : true,
								timeOut : 3000
							});
        	    };
				var data = promotionControl.getParamsData();
				DOM.show('#J_LeftLoading');
				DOM.hide('#J_MainLeftContent');
        	    new H.widget.asyncRequest().setURI(getItemsFromTbUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).setDataType('json').send();
			},
			// 渲染 TbItems
			renderItems: function(c) {
				DOM.html(DOM.get("#J_TbItemList"), c,true);
				var sortvalue = DOM.val('#J_SortValue');
    	    	if (sortvalue == 0 || sortvalue == 1) {
					DOM.hide(DOM.query('.J_NormVal'));
					DOM.html('#J_SortName','')
				}else{
					DOM.show(DOM.query('.J_NormVal'));
				}
				DOM.attr('#J_TopCheckAll','checked',false);
				DOM.attr('#J_CheckAll','checked',false);
    			var oTriggers = DOM.query('#J_TbItemList .J_CheckBox');
                Event.on(oTriggers, "click", promotionControl.checkBoxClick);
                var inputs = DOM.filter (DOM.query('input'),function(i){if(i.type =='text')return true;})
            	Event.on(inputs,'focus blur',function(ev){
            		if(ev.type == 'focus'){
            			DOM.removeClass(ev.target,'input-text text text-error');
            			DOM.addClass(ev.target,'input-text-on');
            		} else if(ev.type == 'blur'){
            			DOM.removeClass(ev.target,'input-text-on');
            			DOM.addClass(ev.target,'input-text');
            		}
            	});
			},
			checkBoxClick : function(e) {
				var id = this.value;
				var promoBox = DOM.get('#J_PromoBox_'+id);
				var operation = DOM.get('#J_Operation_'+id);
				var tejia = DOM.get('#J_tejia_'+id);
				if(!this.checked){
					DOM.attr('#J_TopCheckAll','checked',false);
					DOM.attr('#J_CheckAll','checked',false);
				}
				if (DOM.hasClass(promoBox, 'ks-hidden')) {
					DOM.removeClass([promoBox,operation,tejia], 'ks-hidden');
				} else {
					DOM.addClass([promoBox,operation,tejia], 'ks-hidden');
				}
			},
			
	    	handlePagination : function(turnTo) {
		    	pageId = turnTo;
	    		var submitHandle = function(o) {
	    			 totalRecords = o.payload.totalRecords;
					 if(totalRecords > 0){
						DOM.get('#J_LEmpty').style.display = 'none';
						DOM.css(DOM.query(".J_ItemSelectBtnHolder"),'display' ,'');
					} else {
						DOM.get('#J_LEmpty').style.display = '';
						DOM.css(DOM.query(".J_ItemSelectBtnHolder"),'display' ,'none');
					}
					 pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
	    			promotionControl.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_Paging',2);
	    			promotionControl.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_TopPaging',3);
	        	    promotionControl.renderItems(o.payload.body);
					DOM.hide('#J_LeftLoading');
					DOM.show('#J_MainLeftContent');
		    	};
				var data = promotionControl.getParamsData();
				data+="&page_id="+pageId;
				DOM.show('#J_LeftLoading');
				DOM.hide('#J_MainLeftContent');
        	    new H.widget.asyncRequest().setURI(getItemsFromTbUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},

			//淘宝宝贝全选
			checkAll : function(e) {
				checkBoxs = DOM.query('#J_TbItemList .J_CheckBox');
				var len = checkBoxs.length;
				for(i=0; i<len; i++){
					var iid = checkBoxs[i].value;
					if(checkBoxs[i].disabled) continue;
					if(this.checked){
						DOM.removeClass(DOM.get('#J_PromoBox_'+iid), 'ks-hidden');
						DOM.removeClass(DOM.get('#J_Operation_'+iid), 'ks-hidden');
						DOM.removeClass(DOM.get('#J_tejia_'+iid), 'ks-hidden');
						checkBoxs[i].checked = true;
					} else {
						DOM.addClass(DOM.get('#J_tejia_'+iid), 'ks-hidden');
						DOM.addClass(DOM.get('#J_PromoBox_'+iid), 'ks-hidden');
						DOM.addClass(DOM.get('#J_Operation_'+iid), 'ks-hidden');
						checkBoxs[i].checked = false;
					}
				}
				if(this.id == 'J_CheckAll'){
					if (this.checked) {
						DOM.attr('#J_TopCheckAll', 'checked', true);
					}else {
						DOM.attr('#J_TopCheckAll', 'checked', false);
					}
				}else{
					if (this.checked) {
						DOM.attr('#J_CheckAll','checked', true);
					}else {
						DOM.attr('#J_CheckAll','checked', false);
					}
				}
			},
			//活动中宝贝全选
			rightCheckAll : function(e) {
				checkBoxs = DOM.query('#J_PromotionItemList .J_CheckBox');
				var len = checkBoxs.length;
				for(i=0; i<len; i++){
					var iid = checkBoxs[i].value;
					if(checkBoxs[i].disabled) continue;
					if(this.checked){
						//promotionParamBox = DOM.get('J_ParamBox_'+iid).style.display = '';
						checkBoxs[i].checked = true;
					} else {
						//promotionParamBox = DOM.get('J_ParamBox_'+iid).style.display = 'none';
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
						DOM.css(DOM.query(".J_PromotionItemBtnHolder"),'display' ,'');
						//部分参与：满就送，订单限购，部分参与 免邮
						if(KISSY.inArray(typeId,['108','106','111','208']) && o.payload.sucNum == 1){
								new H.widget.msgBox({
									    title:"温馨提示",
									    content:'部分参与活动宝贝数量需大于1个，否则活动不会生效！',
									    type:"info"
									
									});
						}
//						if(totalRecords > 150){
//							var str = '<div class="point"><span>非全店活动宝贝数量不能大于150个，请删除多余的宝贝，或酌情分多次活动创建</span><br/><div style="width:80px;" class="btm-content btm-margin-30auto"><input name="" type="button" value="关闭" onclick="promotionControl.msg.hide()" class="btm-68-orange fl" style="display:inline" /></div></div>'; 
//							promotionControl.msg.setHeader('温馨提示').setMsg(str).showDialog();	
//						}
						DOM.val('#J_TotalPromoItems',totalRecords);
						
					} else { 
						DOM.get('#J_REmpty').style.display = '';
						DOM.css(DOM.query(".J_PromotionItemBtnHolder"),'display' ,'none');
					}
	        	    DOM.html(DOM.get("#J_PromotionItemList"), o.payload.body,true);
	        	   
				   var oTriggers = DOM.query('#J_PromotionItemList .J_CheckBox');
	                Event.on(oTriggers, "click", function(ev){
						if(!this.checked){
							DOM.attr('#J_RightCheckAll','checked',false);
						}
					});
					DOM.hide('#J_RightLoading');
					DOM.show('#J_MainRightContent');
	        	    var inputs = DOM.filter (DOM.query('input'),function(i){if(i.type =='text')return true;})
	        	    Event.on(inputs,'focus blur',function(ev){
	            		if(ev.type == 'focus'){
	            			DOM.removeClass(ev.target,'input-text text text-error');
	            			DOM.addClass(ev.target,'input-text-on');
	            		} else if(ev.type == 'blur'){
	            			DOM.removeClass(ev.target,'input-text-on');
	            			DOM.addClass(ev.target,'input-text');
	            		}
	            	});
	        	    pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					promotionControl.promotionItemPaginator = new showPages('promotionControl.promotionItemPaginator').setRender(promotionControl.promotionItemPaginationHandle).setPageCount(pageCount).printHtml('#J_PromotionItemPaging',2);
		    	};
		    	 if(DOM.val(DOM.get("#J_RightSearchTitle")) != '关键字、商品链接、商品编码'){
        	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_RightSearchTitle"))); //标题
        	    }else{
        	    	var title ='';
        	    }
        	    var status = DOM.val(DOM.get('#J_SearchStatus'));
        	    var itemPage = DOM.val(DOM.get("#J_RightSelectItemPage"));//每页多少条
        	    var data = "promo_id="+promotionId+"&status="+status+"&title="+title+"&pageSize="+itemPage;
				DOM.show('#J_RightLoading');
				DOM.hide('#J_MainRightContent');
        	    new H.widget.asyncRequest().setURI(loadPromotionItemsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			
			promotionItemPaginationHandle : function(turnTo,flag) {
				pageId = turnTo;
	    		var submitHandle = function(o) {
	    			DOM.get("#J_RightCheckAll").checked = false;
	    			totalRecords = o.payload.totalRecords;
	        	    if(totalRecords > 0){
						DOM.get('#J_REmpty').style.display = 'none';	
						DOM.css(DOM.query(".J_PromotionItemBtnHolder"),'display' ,'');
						DOM.val('#J_TotalPromoItems',totalRecords);
						//部分参与：满就送，订单限购，部分参与 免邮
						if( KISSY.inArray(typeId,['108','106','111','208'])&& o.payload.sucNum == 1){
							if(totalRecords == 1){
								new H.widget.msgBox({
									    title:"温馨提示",
									    content:'部分参与活动宝贝数量需大于1个，否则活动不会生效！',
									    type:"info"
									
									});
							}
						}
//						if(totalRecords > 150){
//							var str = '<div class="point"><span>非全店活动宝贝数量不能大于150个，请删除多余的宝贝，或酌情分多次活动创建</span><br/><div style="width:80px;" class="btm-content btm-margin-30auto"><input name="" type="button" value="关闭" onclick="promotionControl.msg.hide()" class="btm-68-orange fl" style="display:inline" /></div></div>'; 
//							promotionControl.msg.setHeader('温馨提示').setMsg(str).showDialog();	
//						}
						DOM.val('#J_TotalPromoItems',totalRecords);
					} else { 
						DOM.get('#J_REmpty').style.display = '';
						DOM.css(DOM.query(".J_PromotionItemBtnHolder"),'display' ,'none');
					}
					
		    		pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
	    			promotionControl.promotionItemPaginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_PromotionItemPaging',2);
	    			DOM.html(DOM.get("#J_PromotionItemList"), o.payload.body);
					var oTriggers = DOM.query('#J_PromotionItemList .J_CheckBox');
		         	Event.on(oTriggers, "click", function(ev){
						if(!this.checked){
							DOM.attr('#J_RightCheckAll','checked',false);
						}
					});
					if(flag != 'update'){
						DOM.hide('#J_RightLoading');
						DOM.show('#J_MainRightContent');
					}
	        	    var inputs = DOM.filter (DOM.query('input'),function(i){if(i.type =='text')return true;})
	        	    Event.on(inputs,'focus blur',function(ev){
	            		if(ev.type == 'focus'){
	            			DOM.removeClass(ev.target,'input-text text text-error');
	            			DOM.addClass(ev.target,'input-text-on');
	            		} else if(ev.type == 'blur'){
	            			DOM.removeClass(ev.target,'input-text-on');
	            			DOM.addClass(ev.target,'input-text');
	            		}
	            	});
		    	};
				if(flag != 'update'){
					DOM.show('#J_RightLoading');
					DOM.hide('#J_MainRightContent');
				}
		    	 if(DOM.val(DOM.get("#J_RightSearchTitle")) != '关键字、商品链接、商品编码'){
        	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_RightSearchTitle"))); //标题
        	    }else{
        	    	var title ='';
        	    }
	        	 var itemPage = DOM.val(DOM.get("#J_RightSelectItemPage"));//每页多少条
	        	 var status = DOM.val(DOM.get('#J_SearchStatus'));
	        	 var data = "promo_id="+promotionId+"&status="+status+"&title="+title+"&page_id="+pageId+"&pageSize="+itemPage;
	        	    new H.widget.asyncRequest().setURI(loadPromotionItemsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			
			//将活动中宝贝移除
			removePromotionItemHandle : function(promo_itemid,pidi,type) {
				if(!showPermissions('editor_promotion',"编辑促销活动")){
		   			return ;
		   		 }
				 if (type == 'promoItems') {
				 	var typeId = DOM.val('#J_TypeIdItem_'+promo_itemid);
				 }
				 if(typeId == 10){
				 	var diff  = IsExpired();
					 if(diff > -5000 ){
							var sucessHandle = function(o) {
								promotionControl.deletePromotionItemHandle(promo_itemid,pidi,type);
					 		};
					 		var errorHandle = function(o){
					 			KISSY.Event.fire('.J_TopExpired','click');
					 		};
					 		var data = '';
					  	    new H.widget.asyncRequest().setURI(isExpiredUrl).setMethod("GET").setHandle(sucessHandle).setErrorHandle(errorHandle).setData(data).send();
					 }else{
						promotionControl.deletePromotionItemHandle(promo_itemid,pidi,type);	
					 }
					
				 }else{
					promotionControl.deletePromotionItemHandle(promo_itemid,pidi,type);
				 }
			},
			deletePromotionItemHandle : function(promo_itemid,pidi,type){
					itemIds = [];
					if(type == 'promoItems'){
						DOM.hide('#J_RemovePromo_'+promo_itemid);
						DOM.show('#J_MinLoading_'+promo_itemid);
					}else{
						DOM.attr('#J_RemovePromotionItems','disabled',true);
						DOM.replaceClass('#J_RemovePromotionItems','btm-caozuo-orange','btm-caozuo-gray-none');
					}
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
						if(itemIds.length == 0){
								new H.widget.msgBox({
									    title:"错误提示",
									    content:'未选宝贝！',
									    type:"error",
										autoClose:true,
										timeOut :2000
									
									});
							DOM.attr('#J_RemovePromotionItems','disabled',false);
							DOM.replaceClass('#J_RemovePromotionItems','btm-caozuo-gray-none','btm-caozuo-orange');
							return ;
						}
					}
					var submitHandle = function(o) {
							DOM.attr('#J_RemovePromotionItems','disabled',false);
							DOM.replaceClass('#J_RemovePromotionItems','btm-caozuo-gray-none','btm-caozuo-orange');
							if (promotionControl.promotionItemPaginator) {
								promotionControl.promotionItemPaginator.toPage(promotionControl.promotionItemPaginator.page, 'update');
							}else {
								promotionControl.loadPromotionItems();
							}
	        	    };
	        	    var data = "pid="+pid+"&item_ids="+itemIds+"&form_key="+FORM_KEY;
	        	    //alert(data);return;
	        	    new H.widget.asyncRequest().setURI(removePromotionItemUrl).setMethod("POST").setHandle(submitHandle).setData(data).send();
			},
			
			
			//添加宝贝到活动中
			addSelectItemsToPromotion: function(iid) {
				promotionControl.addBefore();
				checkBoxs = DOM.query("#J_TbItemList .J_CheckBox");
				var json = [];
				var longTitleItemIds = [];
				itemXml = '';
				var error = false;
				var len = checkBoxs.length;
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
						//无条件免邮，一口价，一件优惠 限时折扣不限制 150个
						if(totalNum >150 && !KISSY.inArray(typeId,['130','10','22','2','32'])){
								new H.widget.msgBox({
									    title:"温馨提示",
									    content:'非全店活动宝贝数量不能大于150个，现在已经加入'+totalNum+'请删除多余的宝贝，或酌情分多次活动创建！',
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
        				var updatePic = DOM.val(DOM.get('#J_ItemUpdatePic_'+id));
						var outId = H.util.strProcess(DOM.val(DOM.get('#J_ItemOuterId_'+id)));
        				//var iconId = DOM.val(DOM.get('#J_ItemIcon_'+id));
        				var paramsStr = '';
        				if (type == 'spec' ) {
        					r = itemHandle.generalSpecParams(id, error);
        					error = r[0];
        					params = r[1];
        					paramsStr = ', "params":' + KISSY.JSON.stringify(params);
        				} else if (type == 'tbspec'||type == 'onetbspec' || type == 'tbspec_buyerLimit') {
        					r = itemHandle.generalTbSpecParams(id, error);
        					error = r[0];
        					params = r[1];
        					paramsStr = ', "params":' + KISSY.JSON.stringify(params);
        				}else if(type == 'tg'){
							r = itemHandle.generalTgParams(id, error);
							error = r[0];
        					params = r[1];
        					paramsStr = ', "params":' + KISSY.JSON.stringify(params);
						}else if(type == 'jtj'){
							r = itemHandle.generalJtjParams(id, error);
							error = r[0];
        					params = r[1];
        					paramsStr = ', "params":' + KISSY.JSON.stringify(params);
						}
        				if (error === false) {
                        	o = '{"id":"' + id + '", "outer_id":"' + outId + '", "title":"' + title + '", "price":"' + price + '", "pic_url":"'+ picUrl +'", "update_pic":"'+ updatePic +'"'+ paramsStr + '}';
							o = eval('(' + o + ')');
                        	
//							for(var is = 0;is<1000;is++){
//								json.push(o);
//							}
							json.push(o);
        				}else{
        					break ;
        				}
						//alert(json);
        				if(iid!=undefined){
        					break;
        				}
					}
	            }
				//alert(error);
				//alert(KISSY.JSON.stringify(json));
				if (error) {
					promotionControl.addAfter();
					return ;
    			}
				
				if(json.length == 0){
					new H.widget.msgBox({
									    title:"错误提示",
									    content:'未选宝贝！',
									    type:"error",
										autoClose:true,
										timeOut :3000
									
									});
					promotionControl.addAfter();
					return;
				}
				//alert(json);return false;
	            var itemsJson = KISSY.JSON.stringify(json);
	            var submitHandle = function(o) {
					promotionControl.addAfter();
	            	if (o.payload.limit != null) {
						status= '操作失败';
						new H.widget.msgBox({
								    title:"操作失败",
								    content:o.payload.limit,
								    type:"error"
								});
					
    				} else {
		            	var waitTime = o.payload.waitTime;
		            	var finishAt = o.payload.finishAt;
		            	var len = checkBoxs.length;
						if(promotionControl.paginator){
							promotionControl.paginator.toPage(promotionControl.paginator.page);
						}else{
							promotionControl.searchTbItems();
						}
    				}
        	    };
        	    var errorHandle = function(o) {
					promotionControl.addAfter();
        	    	new H.widget.msgBox({
									    title:"错误提示",
									    content:o.desc,
									    type:"error"
									});
            	};
         	    var data = "pid="+pid+"&items="+itemsJson+"&form_key="+FORM_KEY;
         	    new H.widget.asyncRequest().setURI(addItemsToPromotionUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			},
			//点击 加入活动  后的 按钮还原
			addAfter : function(){
				DOM.show(DOM.query('.J_addItem'));
				DOM.hide(DOM.query('.J_adding'));
				DOM.attr('#J_TopAddToPromo','disabled',false);
				DOM.replaceClass('#J_TopAddToPromo','btm-caozuo-gray-none','btm-caozuo-orange ');
				DOM.attr('#J_BtmAddToPromo','disabled',false);
				DOM.replaceClass('#J_BtmAddToPromo','btm-caozuo-gray-none','btm-caozuo-orange ');
				
			},
			//点击 加入活动  后的 按钮限制操作
			addBefore : function(){
				DOM.hide(DOM.query('.J_addItem'));
				DOM.show(DOM.query('.J_adding'));
				DOM.attr('#J_TopAddToPromo','disabled',true);
				DOM.replaceClass('#J_TopAddToPromo','btm-caozuo-orange','btm-caozuo-gray-none');
				DOM.attr('#J_BtmAddToPromo','disabled',true);
				DOM.replaceClass('#J_BtmAddToPromo','btm-caozuo-orange','btm-caozuo-gray-none');
				
			},
			/**
			 * 
			 * tb_item 与 promo_item  js
			 */
			getTjtSpecPrice : function(idd ,id,type){
				var v = Number(DOM.get('#J_PromoValue_'+idd).value);
				var t = Number(DOM.get('#J_Type_'+idd).value);
				var origPrice = Number(DOM.get('#J_ItemPrice_'+id).value);
				if(type =='promoItem'){
					var isInt = 0;
				}else{	
					var isInt = DOM.get('#J_IsInt_'+id).value;
				}
				var specPrice;
				if (t == '1') {
					specPrice = (v / 10) * origPrice;
					specPrice = Math.round(specPrice*100)/100;
				} else {
					specPrice = Math.round((origPrice - v)*100)/100;
				}
				if (isInt == 1) {
					specPrice = Math.ceil(specPrice);
				}else if(isInt == 2){
					specPrice = H.util.FormatNumber(specPrice,1);
				}
					if (t == '1') {
						//促销方式七折以上限制
						if(!KISSY.isNumber(v) || v < 0 || v >=10){
								new H.widget.msgBox({
									    title:"错误提示",
									    content:'传入了不合法或不正确的参数,有效范围在 0.00~9.99之间！',
									    type:"error"
									
									});
							DOM.addClass(DOM.get('#J_PromoValue_'+idd), 'text-error');
							return false;
						} else {
							var re = /(^[0-9]([.][0-9]{1,2})?$)|(^1[0-9]([.][0-9]{1,2})?$)|(^2[0-3]([.][0-9]{1,2})?$)|(^10([.]0{1,2})?$)/;
							if(!re.test(v)){
								new H.widget.msgBox({
									    title:"错误提示",
									    content:'传入了不合法或不正确的参数,有效范围在 0.00~9.99之间！',
									    type:"error"
									
									});
								DOM.addClass(DOM.get('#J_PromoValue_'+idd), 'text-error');
								return false;
							}	
						}
					} else {
//						if(v >Number((origPrice*0.3).toFixed(2))){
//							promotionControl.msg.setMsg('<div class="point relative"><div class="point-w-1">优惠金额有误，优惠金额有效范围在 0.00~'+(origPrice*0.3).toFixed(2)+'之间</div></div>').showDialog();
//							DOM.addClass(DOM.get('#J_PromoValue_'+idd), 'text-error');
//							return false;
//						}
					}
					if(type =='promoItem'){
						DOM.val('#J_IsInt_'+idd,'0');
					}	
				DOM.removeClass(DOM.get('#J_PromoValue_'+idd), 'text-error');
				DOM.val(DOM.get('#J_SpecPrice_'+idd),  specPrice);
			},
			
			getTjtPromoValue : function(idd, id,type){
				
				Event.fire(DOM.query('#options_J_Type_'+idd+' li')[1],'click');
				var t = DOM.get('#J_Type_'+idd).value;
				var origPrice = Number(DOM.get('#J_ItemPrice_'+id).value);
				var specPrice = Number(DOM.get('#J_SpecPrice_'+idd).value);
				var promoValue;
				if (t == '0') {
					promoValue = Math.round((origPrice - specPrice)*100)/100;
					DOM.get('#J_PromoValue_'+idd).value = promoValue;
				}else{
					promoValue = Number(((specPrice/origPrice)*10).toFixed(2));
					DOM.get('#J_PromoValue_'+idd).value = promoValue;
				}
				if(type =='promoItem'){
					DOM.val('#J_IsInt_'+idd,'1');
				}
				return ;
			},
			showTitleParam : function(iid) {
				
				var tDiv = DOM.get('#J_ParamsTitle_'+iid);
				if (tDiv.style.display == 'none') {
					tDiv.style.display = '';
					DOM.get('#J_UpdateTitle_'+iid).value = '1';					
				} else {
					tDiv.style.display = 'none';
					DOM.get('#J_UpdateTitle_'+iid).value = '0';
				}
				return;
			},
			
			toggleSku : function(id) {
				var skuTable = DOM.get('#J_SkuTable_'+id);
				if (DOM.hasClass(skuTable, 'ks-hidden')) {
					DOM.removeClass(skuTable, 'ks-hidden');
				} else {
					DOM.addClass(skuTable, 'ks-hidden');
				}
				
			},

			checkPromoPrice : function(el){
				promoPrice = Number(el.value);
				if (promotionControl.checkPrice(promoPrice) === false) {
					DOM.addClass(el, 'text-error');
					el.value = '';
					return false;
				}
				id = el.id;
				id = id.replace('Promo', 'Item');
				itemPrice = Number(DOM.get('#'+id).value);
				//七折限制
//				discount = ((promoPrice/itemPrice)*10).toFixed(2);
//				if (itemPrice < promoPrice || discount<7) {
//					DOM.addClass(el, 'text-error');
//					promotionControl.msg.setMsg('<div class="point relative"><div class="point-w-1">折扣价不能低于7，请设置特价在'+(itemPrice*0.7).toFixed(2)+'~'+itemPrice+'，请检查</div></div>').showDialog();
//					el.value = '';
//					return false;
//				}
				DOM.removeClass(el, 'text-error');
				
				promotionControl.autoSkuPrice(el);
				return true;
			},
			
			autoSkuPrice : function(el) {
				value = el.value;
				id = el.id.replace('J_PromoPrice_', '');
				var promoPriceEls = DOM.query('#J_SkuTable_'+id+' .J_SkuPromoPrice');
				var len = promoPriceEls.length;
				for (var i=0; i<len ;i++) {
					promoPriceEls[i].value = value;
				}
				return;
			},
			
			getSpecPrice : function(id ,pid,type)
			{	
				var v = Number(DOM.get('#J_PromoValue_'+id).value);
				var t = DOM.get('#J_PromoType_'+id).value;
				var isSku = Number(DOM.val(DOM.get('#J_IsSku_'+id)));
				var origPrice = Number(DOM.get('#J_ItemPrice_'+id).value);
				var promoIsInt = Number(DOM.val(DOM.get('#J_PromoIsInt_'+id)));
				var specPrice;
				DOM.val(DOM.get('#J_FinalType_'+id),'0');
				if(isSku == 1){
					specPrice = (v / 10) * origPrice;
					specPrice = Math.round(specPrice*100)/100;
				} else {
					//原来取整就取整
					var isInt = DOM.get('#J_IsInt_'+id).value;
					if(promoIsInt && isInt !=2){
						DOM.val('#J_IsInt_'+id,'1');
					}
					if (t == '1') {
						if (KISSY.one('#J_PromoBox_' + id + ' .duoguige')) {
							DOM.hide('#J_PromoBox_' + id + ' .duoguige');
						}	
						specPrice = (v / 10) * origPrice;
						specPrice = Math.round(specPrice*100)/100;
					} else {
						if (KISSY.one('#J_PromoBox_' + id + ' .duoguige')) {
							DOM.show('#J_PromoBox_' + id + ' .duoguige');
						}
						
						specPrice = Math.round((origPrice - v)*100)/100;
					}
					//原来isInt = 2 就 是 取整 
					var isInt = DOM.get('#J_IsInt_'+id).value;
					if (isInt == 1) {
						specPrice = Math.ceil(specPrice);
					}else if(isInt == 2){
						specPrice = H.util.FormatNumber(specPrice,1);
					}
				}
				//DOM.val('#J_IsInt_'+id,'0');
				DOM.val(DOM.get('#J_SpecPrice_'+id),  specPrice);
				
			},
			getPromoValue : function(id,type)
			{	
				
				// 编辑特价 改为 减钱 不取整  	#J_PromoIsInt_id 的值 设置为3			
				DOM.val('#J_IsInt_'+id,'0');
				DOM.val(DOM.get('#J_FinalType_'+id),'3');
				
				Event.fire(DOM.query('#options_J_PromoType_'+id+' li')[1],'click');
				
				var t = DOM.get('#J_PromoType_'+id).value;
				
				var origPrice = Number(DOM.get('#J_ItemPrice_'+id).value);
				var specPrice = Number(DOM.get('#J_SpecPrice_'+id).value);
				var promoValue;
				if (t == '0') {
					if (KISSY.one('#J_PromoBox_' + id + ' .duoguige')) {
							DOM.show('#J_PromoBox_' + id + ' .duoguige');
					}	
					promoValue = Math.round((origPrice - specPrice)*100)/100;
					DOM.get('#J_PromoValue_'+id).value = promoValue;
				}else{
					promoValue = ((specPrice/origPrice)*10).toFixed(2);
					DOM.get('#J_PromoValue_'+id).value = promoValue;
				}
				return ;
			},
			checkSkuPrice : function(el){
				skupromoPrice = Number(el.value);
				if (promotionControl.checkPrice(skupromoPrice) === false) {
					DOM.addClass(el, 'text-error');
					el.value = '';
					return false;
				}
				id = el.id;
				id = id.replace('Promo', 'Orig');
				skuorigPrice = Number(DOM.get('#'+id).value);
				//七折限制
//				discount = ((skupromoPrice/skuorigPrice)*10).toFixed(2);
//				if (skuorigPrice < skupromoPrice || discount<7) {
//					promotionControl.msg.setMsg('<div class="point relative"><div class="point-w-1">折扣价不能低于7，请设置特价在'+(skuorigPrice*0.7).toFixed(2)+'~'+skuorigPrice+'，请检查</div></div>').showDialog();
//					DOM.addClass(el, 'text-error');
//					el.value = '';
//					return false;
//				}
				DOM.removeClass(el, 'text-error');
				return true;
			},
			forceDelItem : function(itemId) {
				var submitHandle = function(o) {
						DOM.hide('#J_RightLoading');
						DOM.show('#J_MainRightContent');
		        	    //DOM.query('#J_Item_'+itemId+' .J_CheckBox')[0].disabled = 'disabled'; 
						//DOM.html(DOM.get('#J_main_desc'),o.desc);
						DOM.html(DOM.get('#J_Status_'+itemId), '<div class="status-success"><div>成功退出</div></div>');
						DOM.hide('#J_forceDelItem_'+itemId);
				};
				var data = "promo_item_id="+itemId;
				DOM.show('#J_RightLoading');
				DOM.hide('#J_MainRightContent');
        	    new H.widget.asyncRequest().setURI(forceDelUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			
			//暂停
			pausePromotionItemHandle : function(promo_itemid,pidi) {
				if(!showPermissions('editor_promotion',"编辑促销活动")){
				   return ;
				}
				if(typeId == 10){
				 	var diff  = IsExpired();
					 if(diff > -5000 ){
							var sucessHandle = function(o) {
								promotionControl.pauseAction(promo_itemid,pidi);
					 		};
					 		var errorHandle = function(o){
					 			KISSY.Event.fire('.J_TopExpired','click');
					 		};
					 		var data = '';
					  	    new H.widget.asyncRequest().setURI(isExpiredUrl).setMethod("GET").setHandle(sucessHandle).setErrorHandle(errorHandle).setData(data).send();
					 }else{
						promotionControl.pauseAction(promo_itemid,pidi);	
					 }
				 }else{
					promotionControl.pauseAction(promo_itemid,pidi);
				 }
				
			},
			
			pauseAction : function(promo_itemid,pidi){
				DOM.attr('#J_PausePromotionItems','disbaled',true);
				itemIds = [];
				DOM.show('#J_RightLoading');
				DOM.hide('#J_MainRightContent');
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
					DOM.attr('#J_PausePromotionItems','disbaled',false);
					DOM.hide('#J_RightLoading');
					DOM.show('#J_MainRightContent');
						new H.widget.msgBox({
									    title:"错误提示",
									    content:'未选宝贝！',
									    type:"error",
										autoClose:true,
										timeOut :3000
									
									});
					return ;
				}
				var submitHandle = function(o) {
						DOM.hide('#J_RightLoading');
						DOM.show('#J_MainRightContent');
						DOM.attr('#J_PausePromotionItems','disbaled',false);
						if(promotionControl.promotionItemPaginator){
							promotionControl.promotionItemPaginator.toPage(promotionControl.promotionItemPaginator.page);
						}else{
							promotionControl.loadPromotionItems();
						}
        	    };
			   var errorHandle = function(o){
				   	DOM.attr('#J_PausePromotionItems','disbaled',false);
					DOM.hide('#J_RightLoading');
					DOM.show('#J_MainRightContent');
					new H.widget.msgBox({
									    title:"错误提示",
									    content:o.desc,
									    type:"error",
										autoClose :true,
										timeOut:3000
									
									});
    	    	};
        	    var data = "pid="+pid+"&item_ids="+itemIds+"&form_key="+FORM_KEY;
        	    //alert(data);return;
        	    new H.widget.asyncRequest().setURI(pausePromotionItemUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			
			},
			
			//重启
			restartPromotionItemHandle : function(promo_itemid,pidi) {
				itemIds = [];
				DOM.attr('#J_RestartPromotionItems','disbaled',true);
				promotionControl.msg = new H.widget.msgBox({
								    title:"",
									dialogType : 'loading',
								    content:'正在处理中，请稍候'	
								});
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
					DOM.attr('#J_RestartPromotionItems','disbaled',false);
						promotionControl.msg.hide();
						new H.widget.msgBox({
									    title:"错误提示",
									    content:'未选宝贝！',
									    type:"error",
										autoClose:true,
										timeOut :2000
									
									});
					return ;
				}
				var submitHandle = function(o) {
					promotionControl.msg.hide();
					DOM.attr('#J_RestartPromotionItems','disbaled',false);
					if(promo_itemid && pidi){
						DOM.hide(DOM.prev(DOM.get('#J_RestartPromoItem_'+promo_itemid)));
						DOM.show(DOM.get('#J_RestartPromoItem_'+promo_itemid));
					}else{
						for(i=0; i<len; i++){
							if(checkBoxs[i].checked && !checkBoxs[i].disabled){
								DOM.get('#J_Status_'+checkBoxs[i].value).innerHTML = '<div class="status-pendding"><div>等待处理</div></div>';
								checkBoxs[i].disabled = 'disabled';
							}
						}
					}
		            var waitTime = o.payload.waitTime;
		            var finishAt = o.payload.finishAt;	
					if(promotionControl.promotionItemPaginator){
						promotionControl.promotionItemPaginator.toPage(promotionControl.promotionItemPaginator.page);
					}else{
						promotionControl.loadPromotionItems();
					}
        	    };
				 var errorHandle = function(o){
					 	DOM.attr('#J_RestartPromotionItems','disbaled',false);
						promotionControl.msg.hide();
		    	    		new H.widget.msgBox({
									    title:"错误提示",
									    content:o.desc,
									    type:"error",
										autoClose:true,
										timeOut :3000
									
									});
    	    	};
        	    var data = "pid="+pid+"&item_ids="+itemIds+"&form_key="+FORM_KEY;
        	    //alert(data);return;
        	    new H.widget.asyncRequest().setURI(restartPromotionItemUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			},
			
			retry : function(itemId, force) {
				var submitHandle = function(o) {
					promotionControl.msg.hide();
	        	    if(promotionControl.promotionItemPaginator){
						promotionControl.promotionItemPaginator.toPage(promotionControl.promotionItemPaginator.page);
					}else{
						promotionControl.loadPromotionItems();
					}
				};
				var data = "promo_item_id="+itemId+"&force="+force;
				promotionControl.msg = new H.widget.msgBox({
								    title:"",
									dialogType : 'loading',
								    content:'正在处理中，请稍候'	
								});
        	    new H.widget.asyncRequest().setURI(retryUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			batchRetry :function(){
				var submitHandle = function(o) {
					promotionControl.msg.hide();
					if(promotionControl.promotionItemPaginator){
						promotionControl.promotionItemPaginator.toPage(promotionControl.promotionItemPaginator.page);
					}else{
						promotionControl.loadPromotionItems();
					}
				};
				var data = "pid="+pid;
				promotionControl.msg = new H.widget.msgBox({
								    title:"",
									dialogType : 'loading',
								    content:'正在处理中，请稍候'	
								});
        	    new H.widget.asyncRequest().setURI(batchRetryUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
				
			},
			
			editItem : function(promo_item_id){
				var itembox = DOM.get('#J_itemBox_'+promo_item_id);
				var promoDetail = DOM.get('#J_itemPromoDetail_'+promo_item_id);
				if (DOM.hasClass(promoDetail, 'ks-hidden')) {
					DOM.removeClass(promoDetail, 'ks-hidden');
				} else {
					DOM.addClass(promoDetail, 'ks-hidden');
				}
				if (DOM.hasClass(itembox, 'ks-hidden')) {
					DOM.removeClass(itembox, 'ks-hidden');
					DOM.attr(DOM.get('#J_Item_'+promo_item_id+' .J_CheckBox'),'checked',true);
				} else {
					DOM.addClass(itembox, 'ks-hidden');
					DOM.attr(DOM.get('#J_Item_'+promo_item_id+' .J_CheckBox'),'checked',false);
				}
				checkBoxs = DOM.query("#J_PromotionItemList .J_CheckBox");
				var len = checkBoxs.length;
				var num = 0;
				for(i=0; i<len; i++){
                    if(checkBoxs[i].checked && !checkBoxs[i].disabled){
                    	num++
                    }
				}
				if(num >= 2){
					DOM.show('#J_EditPromoItem');
				}else{
					DOM.hide('#J_EditPromoItem');
				}
				
			},
			editPromoItem : function(promo_item_id,item_id){
				promotionControl.msg = new H.widget.msgBox({
								    title:"",
									dialogType : 'loading',
								    content:'正在处理中，请稍候'	
								});
				var json = [];
				var error = false;
				
				DOM.attr('#J_EditPromoItem','disabled',true);
				DOM.replaceClass('#J_EditPromoItem','btm-caozuo-orange','btm-caozuo-gray-none');
				//单品编辑
				if(promo_item_id && item_id){
	                var id = promo_item_id;
	                var title = H.util.strProcess(DOM.val(DOM.get('#J_ItemTitle_'+id)));
					var picUrl = DOM.val(DOM.get('#J_ItemPic_'+id));
					var price = DOM.val(DOM.get('#J_ItemPrice_'+id));
					var updatePic = DOM.val(DOM.get('#J_ItemUpdatePic_'+id));
					//var iconId = DOM.val(DOM.get('#J_ItemIcon_'+id));
					var paramsStr = '';
					if (type == 'spec') {
						r = itemHandle.generalSpecParams(id, error);
						error = r[0];
						params = r[1];
						paramsStr = ', "params":' + KISSY.JSON.stringify(params);
					} else if (type == 'tbspec' || type == 'onetbspec' || type == 'tbspec_buyerLimit') {
						r = itemHandle.generalTbSpecParams(id, error);
						error = r[0];
						params = r[1];
						paramsStr = ', "params":' + KISSY.JSON.stringify(params);
					}else if(type == 'tg'){
						r = itemHandle.generalTgParams(id, error);
						error = r[0];
						params = r[1];
						paramsStr = ', "params":' + KISSY.JSON.stringify(params);
					}else if(type == 'jtj'){
						r = itemHandle.generalJtjParams(id, error);
						error = r[0];
    					params = r[1];
    					paramsStr = ', "params":' + KISSY.JSON.stringify(params);
					}
					if (error === false) {
	                	o = '{"id":"' + item_id + '", "title":"' + title + '","price":"' + price + '", "pic_url":"' + picUrl +'", "update_pic":"' + updatePic +'"'+ paramsStr + '}';
	                	o = eval('(' + o + ')');
	                	json.push(o);
					}else{
						promotionControl.msg.hide();
						DOM.attr('#J_EditPromoItem','disabled',false);
						DOM.replaceClass('#J_EditPromoItem','btm-caozuo-gray-none','btm-caozuo-orange');
						return ;
	    			}
				}else{
					//批量编辑
					checkBoxs = DOM.query("#J_PromotionItemList .J_CheckBox");
					var len = checkBoxs.length;
					for(i=0; i<len; i++){
						if(checkBoxs[i].checked && !checkBoxs[i].disabled){
							 var id = checkBoxs[i].value;
							 var title = H.util.strProcess(DOM.val(DOM.get('#J_ItemTitle_'+id)));
							 var picUrl = DOM.val(DOM.get('#J_ItemPic_'+id));
							 var price = DOM.val(DOM.get('#J_ItemPrice_'+id));
							 var updatePic = DOM.val(DOM.get('#J_ItemUpdatePic_'+id));
							 //var iconId = DOM.val(DOM.get('#J_ItemIcon_'+id));
							 var itemId = DOM.val(DOM.get('#J_ItemId_'+id));
							 var paramsStr = '';
								if (type == 'spec') {
									r = itemHandle.generalSpecParams(id, error);
									error = r[0];
									params = r[1];
									paramsStr = ', "params":' + KISSY.JSON.stringify(params);
								} else if (type == 'tbspec' || type == 'onetbspec' || type == 'tbspec_buyerLimit') {
									r = itemHandle.generalTbSpecParams(id, error);
									error = r[0];
									params = r[1];
									paramsStr = ', "params":' + KISSY.JSON.stringify(params);
								}else if(type == 'tg'){
									r = itemHandle.generalTgParams(id, error);
									error = r[0];
									params = r[1];
									paramsStr = ', "params":' + KISSY.JSON.stringify(params);
								}else if(type == 'jtj'){
									r = itemHandle.generalJtjParams(id, error);
									error = r[0];
		        					params = r[1];
		        					paramsStr = ', "params":' + KISSY.JSON.stringify(params);
								}
								if (error === false) {
				                	o = '{"promoItemId":"'+id+'","id":"' + itemId + '", "title":"' + title + '","price":"' + price + '", "pic_url":"' + picUrl +'", "update_pic":"' + updatePic +'"'+ paramsStr + '}';
				                	o = eval('(' + o + ')');
				                	json.push(o);
								}else{
									promotionControl.msg.hide();
									DOM.attr('#J_EditPromoItem','disabled',false);
									DOM.replaceClass('#J_EditPromoItem','btm-caozuo-gray-none','btm-caozuo-orange');
									return ;
				    			}
						}
					}
					
				}
				if(json.length == 0){
						promotionControl.msg.hide();
						new H.widget.msgBox({
									    title:"错误提示",
									    content:'未选宝贝！',
									    type:"error",
										autoClose:true,
										timeOut :3000
									
									});
					DOM.attr('#J_EditPromoItem','disabled',false);
					DOM.replaceClass('#J_EditPromoItem','btm-caozuo-gray-none','btm-caozuo-orange');
					return ;
				}
	            var itemsJson = KISSY.JSON.stringify(json);
	            var submitHandle = function(o) {
	            	promotionControl.msg.hide();
					DOM.attr('#J_EditPromoItem','disabled',false);
					DOM.replaceClass('#J_EditPromoItem','btm-caozuo-gray-none','btm-caozuo-orange');
	            	if(promotionControl.promotionItemPaginator){
						promotionControl.promotionItemPaginator.toPage(promotionControl.promotionItemPaginator.page);
					}else{
						promotionControl.loadPromotionItems();
					}
        	    };
        	    var errorHandle = function(o) {
        	    	promotionControl.msg.hide();
					DOM.attr('#J_EditPromoItem','disabled',false);
					DOM.replaceClass('#J_EditPromoItem','btm-caozuo-gray-none','btm-caozuo-orange');
					new H.widget.msgBox({
									    title:"错误提示",
									    content:o.desc,
									    type:"error"
									});
				
            	};
         	    //单品编辑
				if(promo_item_id && item_id){
					 var data = "promoItemId="+promo_item_id+"&items="+itemsJson+"&form_key="+FORM_KEY;
					 new H.widget.asyncRequest().setURI(editPromoItemUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
				}else{
					 var data = "&items="+itemsJson+"&form_key="+FORM_KEY;
					 new H.widget.asyncRequest().setURI(batchEditPromoItemUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();	
				}
			},
			
			//Tbspec宝贝 优惠设置
			editAll :function(){
				var v1 = DOM.val('#J_valueToAll');
				var t1 = DOM.val('#J_Zhe');
				var isInt = DOM.get('#J_quzhengToAll').value;
				checkBoxs = DOM.query("#J_TbItemList .J_CheckBox");
				var len = checkBoxs.length;
				for(m=0; m<len; m++){
					if(!checkBoxs[m].disabled){
						var id = checkBoxs[m].value;
						var origPrice = DOM.val('#J_ItemPrice_'+id);
						var isSku = Number(DOM.val(DOM.get('#J_IsSku_'+id)));
						if(t1 == '0' && isSku == '1' ){
						} else {
							if (t1 == '1') {
								specPrice = (v1 / 10) * origPrice;
								specPrice = Math.round(specPrice*100)/100;
							} else {
								specPrice = Math.round((origPrice - v1)*100)/100;
							}
							if(isSku == 0){
								if (isInt == 1) {
									specPrice = Math.ceil(specPrice);
									DOM.get('#J_IsInt_'+id).value = isInt;
								}else if(isInt == 2){
									specPrice = H.util.FormatNumber(specPrice,1);
									DOM.get('#J_IsInt_'+id).value = isInt;
								}else if(isInt == 0){
									DOM.get('#J_IsInt_'+id).value = isInt;
								}
								if(t1 == '1'){
									//DOM.val('#J_PromoType_'+id,'1');
									DOM.val(DOM.get('#J_PromoType_'+id),1);
								}else{
									//Event.fire(DOM.query('#options_J_PromoType_'+id+' li')[1],'click');
									DOM.val(DOM.get('#J_PromoType_'+id),0);
								}
							}
							if (S.one('#J_PromoBox_' + id + ' .duoguige')) {
								if (isInt != 0 && t1 == '0') {
									DOM.show('#J_PromoBox_' + id + ' .duoguige');
								}
								else {
									DOM.hide('#J_PromoBox_' + id + ' .duoguige');
								}
							}	
							DOM.val(DOM.get('#J_PromoValue_'+id) ,v1);
							DOM.val(DOM.get('#J_SpecPrice_'+id),  specPrice);
						}
					}
				}			
			},
			//Tbspec宝贝 阶梯价批量优惠设置
			editAllJtj :function(){
				var v1 = DOM.val('#J_valueToAll');
				var t1 = DOM.val('#J_Zhe');
				var isInt = DOM.get('#J_quzhengToAll').value;
				var checkBoxs = DOM.query("#J_TbItemList .J_CheckBox");
				var len = checkBoxs.length;
				var num = DOM.val('#J_laddersNum');
				for(m=0; m<len; m++){
					if(!checkBoxs[m].disabled){
						var id = checkBoxs[m].value;
						var origPrice = DOM.val('#J_ItemPrice_'+id);
						var isSku = Number(DOM.val(DOM.get('#J_IsSku_'+id)));
						if(t1 == '0' && isSku == 1 ){
						} else {
							if (t1 == '1') {
								specPrice = (v1 / 10) * origPrice;
								specPrice = Math.round(specPrice*100)/100;
							} else {
								specPrice = Math.round((origPrice - v1)*100)/100;
							}
							if(isSku == 0){
								if (isInt == 1) {
									specPrice = Math.ceil(specPrice);
									DOM.get('#J_IsInt_'+id).value = isInt;
								}else if(isInt == 2){
									specPrice = H.util.FormatNumber(specPrice,1);
									DOM.get('#J_IsInt_'+id).value = isInt;
								}else if(isInt == 0){
									DOM.get('#J_IsInt_'+id).value = isInt;
								}
							}
							for(var i = 1;i<=num;i++){
								DOM.val(DOM.get('#J_PromoValue_'+id+i) ,v1);
								DOM.val(DOM.get('#J_SpecPrice_'+id+i),  specPrice);
								if(isSku == 0){
									if(t1 == '1'){
										DOM.val(DOM.get('#J_Type_'+id+i),1);
										//Event.fire(DOM.query('#options_J_Type_'+id+i+' li')[0],'click');
									}else{
										DOM.val(DOM.get('#J_Type_'+id+i),0);
										//Event.fire(DOM.query('#options_J_Type_'+id+i+' li')[1],'click');
									}
								}
							}
						}
					}
				}			
			}	  

		}
}, {
    requires: ['utils/showPages/index','./mods/item-handle']
});