/**
 * @fileOverview 
 * @author  
 */
KISSY.add(function (S,showPages) {
    // your code here
	var DOM = S.DOM, Event = S.Event;	
	
	return 	itemControl = {
	    	paginator : null,
	    	listItemsPaginator : null,
	    	msg : null,
	    	init : function() {
				var timeFunName = null;
		        Event.delegate(document,'click dblclick','.J_TopAddToPromo',function(ev){
		        	var id = DOM.attr(ev.currentTarget,'data');
		        	if(ev.type == 'click'){
			        	 clearTimeout(timeFunName);
			        	 timeFunName = setTimeout(function () {
	                         //console.log('单击');
	                     	if(id == '1'){
	                     		itemControl.addItems()
							}else{
								itemControl.batchAddItems();
							}
	                      }, 300); 
		        	}if(ev.type == 'dblclick') {
                    	 clearTimeout(timeFunName); 
                    	 //console.log('双击');
                    	 if(id == '1'){
	                     	itemControl.addItems()
						 }else{
							itemControl.batchAddItems();
						 }
                     }
                });
				var $ = KISSY.Node.all;
				window.onscroll=function() {
					var TLheight = DOM.offset('#J_main')['top']+125;
					var windowHeight = $(window).scrollTop();
					if(windowHeight > TLheight) {
						DOM.addClass('#J_LeftOpertion','fix-top');
						DOM.addClass('#J_RightOpertion','fix-top');
					}else{
						DOM.removeClass('#J_LeftOpertion','fix-top');
						DOM.removeClass('#J_RightOpertion','fix-top');
					}
				};			
	    	    Event.on("#J_TopCheckAll", "click", itemControl.checkAll);
	    	    Event.on("#J_RightCheckAll", "click", itemControl.rightCheckAll);
	    	    Event.on("#J_RemoveItems", "click", itemControl.removeItems);
	    	    Event.on("#J_RightSearchBtn", "click", itemControl.loadItems);
	    	    Event.on('#J_BatchRetry','click',itemControl.batchRetry); //从批量重试
		   		if(DOM.hasClass('#body-html','w-1000')){
				        var str ='<select id="J_SelectItemPage" name="Page">'+
				        '<option selected="selected" value="10">10条</option>'+
				        '<option value="20">20条</option>'+
				        '<option value="30">30条</option>'+
				        '<option value="40">40条</option>'+
				        '<option value="50">50条</option>'+
				        '<option value="100">100条</option>'+
				        '</select>';
				        DOM.html('#J_SelectPage',str);
				 }else{
				            var str ='<select id="J_SelectItemPage" name="Page">'+
				  	        '<option selected="selected" value="12">12条</option>'+
				  	        '<option value="24">24条</option>'+
				  	        '<option value="36">36条</option>'+
				  	        '<option value="48">48条</option>'+
				  	        '<option value="60">60条</option>'+
				  	        '</select>';
				        	DOM.html('#J_SelectPage',str);
				}	
	        },
			checkAll : function(e) {
				checkBoxs = DOM.query("#J_TbItemList .J_CheckBox");
				len = checkBoxs.length;
				for(i=0; i<len; i++){
					var iid = checkBoxs[i].value;
					if(checkBoxs[i].disabled) continue;
					if(this.checked){
						checkBoxs[i].checked = true;
			    		DOM.addClass('#J_TbItem_'+iid,'selected');
					} else {
						DOM.removeClass('#J_TbItem_'+iid,'selected');
						checkBoxs[i].checked = false;
					}
				}
			},
			addItems: function() {
				if(!showPermissions('editor_material','促销素材')){
					return ;
				}
				DOM.attr('#J_TopAddItems','disabled',true);
				DOM.replaceClass('#J_TopAddItems','btm-caozuo-orange','btm-caozuo-gray-none');
				checkBoxs = DOM.query("#J_TbItemList .J_CheckBox");
				var json = [];
				var itemXml = '';
				var len = checkBoxs.length;
				var error = false;
				for(i=0; i<len; i++){
					if(checkBoxs[i].checked && !checkBoxs[i].disabled){
	                    var id = checkBoxs[i].value;
	                    var title = H.util.strProcess(DOM.val(DOM.get('#J_ItemTitle_'+id)));
	    				var price = DOM.val(DOM.get('#J_ItemPrice_'+id));
	    				var picUrl = DOM.val(DOM.get('#J_ItemPic_'+id));
						var outId = H.util.strProcess(DOM.val(DOM.get('#J_ItemOuterId_'+id)));
	                    o = '{"id":"' + id + '", "outer_id":"' + outId + '", "title":"' + title + '", "price":"' + price + '", "pic_url":"' + picUrl +'"}';
	                    o = eval('(' + o + ')');
	                    json.push(o);
					}
	            }
				if(json.length == 0){
	   			   new H.widget.msgBox({
					    title:"错误提示",
					    content:'未选择任何宝贝'	,
					    autoClose:true,
					    timeOut:1000
					});
					DOM.attr('#J_TopAddItems','disabled',false);
					DOM.replaceClass('#J_TopAddItems','btm-caozuo-gray-none','btm-caozuo-orange');
					return;
				}
	            var itemsJson = KISSY.JSON.stringify(json);
	            var submitHandle = function(o) {
	            	DOM.attr('#J_TopAddItems','disabled',false);
					DOM.replaceClass('#J_TopAddItems','btm-caozuo-gray-none','btm-caozuo-orange');
					if (o.payload.limit != null) {
						new H.widget.msgBox({
						    title:"操作失败",
						    content:o.payload.limit,
						    type:"error"
						});
					}
	   			    new H.widget.msgBox({
					    type:"sucess",
						dialogType : 'msg',
					    content:'宝贝成功加入活动',
					    autoClose:true,
					    timeOut:2000
					});
					if(itemControl.paginator){
						itemControl.paginator.toPage(itemControl.paginator.page);
					}else{
						itemControl.searchTbItems();
					}
	    	    };
	    	    var errorHandle = function(o) {
	    	    	DOM.attr('#J_TopAddItems','disabled',false);
					DOM.replaceClass('#J_TopAddItems','btm-caozuo-gray-none','btm-caozuo-orange');
					 new H.widget.msgBox({
					    type:"error",
					    content:o.desc
					});
	        	};
	     	    var data = "id="+listId+"&items="+itemsJson+"&form_key="+FORM_KEY;
	    	    new H.widget.asyncRequest().setURI(addItemsUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			},
	        batchAddItems: function() {
				if(!showPermissions('editor_material','促销素材')){
					return ;
				}
	        	var submitHandle = function(o) {
					 itemControl.msg.hide(); 
					 new H.widget.msgBox({
					    type:"sucess",
						dialogType : 'msg',
					    content:'操作成功',
					    autoClose:true,
					    timeOut:2000
					});
	        		S.later(function(){window.location.reload();},1000,false ,null,null);
	        	};
	            var data = "&id="+listId;
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
				
	        	DOM.attr('#J_TopBatchAddItems','disabled',true);
				DOM.replaceClass('#J_TopBatchAddItems','btm-80-gray','btm-80-gray-none');
   			    itemControl.msg = new H.widget.msgBox({
					dialogType : 'loading',
				    content:'系统正在处理，请稍候'
				});
	        	new H.widget.asyncRequest().setURI(batchAddItemsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
	        searchTbItems : function() {
	            var submitHandle = function(o) {
					DOM.hide('#J_LeftLoading');
					DOM.show('#J_MainLeftContent');
	        	    totalRecords = o.payload.totalRecords;
					DOM.css(DOM.get('#J_NoteIcon') ,'display','none');
					if(totalRecords > 0){
						DOM.css(DOM.get('#J_LEmpty') ,'display','none');
						DOM.css(DOM.query(".J_ItemSelectBtnHolder") ,'display' , '');
					} else {
						DOM.css(DOM.get('#J_LEmpty'), 'display' , '');
						DOM.css(DOM.query(".J_ItemSelectBtnHolder") , 'display' , 'none');
					}
					itemControl.renderItems(o.payload.body);
					var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					itemControl.paginator = new showPages('itemControl.paginator').setRender(itemControl.handlePagination).setPageCount(pageCount).printHtml('#J_Paging',2);
					itemControl.paginator = new showPages('itemControl.paginator').setRender(itemControl.handlePagination).setPageCount(pageCount).printHtml('#J_TopPaging',3);
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
						data +="&id="+listId;
	    	    	if (type == 0) {
						//价格区间
						var startPrice = DOM.val(DOM.get("#J_StartPrice"));
						var endPrice = DOM.val(DOM.get("#J_EndPrice"));
						data += "&start_price="+startPrice+"&end_price="+endPrice;
					}
	 			DOM.show('#J_LeftLoading');
				DOM.hide('#J_MainLeftContent');
	    	    new H.widget.asyncRequest().setURI(loadTbItemsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			renderItems: function(c) {
	    	    DOM.html(DOM.get("#J_TbItemList"), c);
	        	var lis = DOM.query("#J_TbItemList .J_TbItem");
	        	Event.on(lis, "mouseenter mouseleave click", function(ev){
	        		var el = DOM.get('.J_CheckBox',ev.currentTarget);
	        		if(el.disabled) return;
	        		if(ev.type == 'mouseenter'){
						DOM.addClass(ev.currentTarget,'mouseover');
	        		}else if(ev.type == 'mouseleave'){
						DOM.removeClass(ev.currentTarget,'mouseover');
					}else if(ev.type == 'click'){
	        			if(el.checked == false){
	        				DOM.addClass(ev.currentTarget,'selected');
	        				el.checked = true;
	        			}else{
							DOM.attr('#J_TopCheckAll','checked',false);
	        				DOM.removeClass(ev.currentTarget,'selected');
	        				el.checked = false;
	        			}
	        		}
	        	});
	        	Event.on(DOM.query('#J_TbItemList .J_CheckBox'),'click',function(ev){
	        		ev.stopPropagation();
	        		var iid = ev.currentTarget.value
	        		if(ev.currentTarget.checked == true){
	        			DOM.addClass('#J_TbItem_'+iid,'seletced');
	        		}else{
	        			DOM.removeClass('#J_TbItem_'+iid,'selected');
	        		}
	        	});
			},
			
	    	handlePagination : function(turnTo) {
		    	pageId = turnTo;
	    		var submitHandle = function(o) {
	    			//DOM.get("#J_CheckAll").checked = false;
	    			DOM.get("#J_TopCheckAll").checked = false;
	    			 totalRecords = o.payload.totalRecords;
	 				if(totalRecords > 0){
	 					DOM.css(DOM.get('#J_LEmpty') ,'display','none');
	 					DOM.css(DOM.query(".J_ItemSelectBtnHolder") ,'display' , '');
	 				} else {
	 					DOM.css(DOM.get('#J_LEmpty'), 'display' , '');
	 					DOM.css(DOM.query(".J_ItemSelectBtnHolder") , 'display' , 'none');
	 				}
	 				var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
	    			itemControl.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_Paging',2);
					itemControl.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_TopPaging',3);
	        	    itemControl.renderItems(o.payload.body);
	 				DOM.hide('#J_LeftLoading');
					DOM.show('#J_MainLeftContent');
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
						data +="&id="+listId;
						
	    	    	if (type == 0) {
						//价格区间
						var startPrice = DOM.val(DOM.get("#J_StartPrice"));
						var endPrice = DOM.val(DOM.get("#J_EndPrice"));
						data += "&start_price="+startPrice+"&end_price="+endPrice;
					}
		           data += "&page_id="+pageId;
				   DOM.show('#J_LeftLoading');
					DOM.hide('#J_MainLeftContent');
	    	    new H.widget.asyncRequest().setURI(loadTbItemsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			forceDelItem : function(itemId) {
				if(!showPermissions('editor_material','促销素材')){
					return ;
				}
				var submitHandle = function(o) {
						itemControl.msg.hide();
	        	    	if(itemControl.listItemsPaginator){
							itemControl.listItemsPaginator.toPage(itemControl.listItemsPaginator.page);
						}else{
							itemControl.loadItems();
						}
				};
				var data = "list_item_id="+itemId;
   			   itemControl.msg = new H.widget.msgBox({
					dialogType : 'loading',
				    content:'强制删除中，请稍候'
				});				
	    	    new H.widget.asyncRequest().setURI(forceDelUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			
			retry : function(itemId) {
				if(!showPermissions('editor_material','促销素材')){
					return ;
				}
				var submitHandle = function(o) {
					itemControl.msg.hide();
	        	    if(itemControl.listItemsPaginator){
						itemControl.listItemsPaginator.toPage(itemControl.listItemsPaginator.page);
					}else{
						itemControl.loadItems();
					}
				};
				var data = "list_item_id="+itemId;
   			    itemControl.msg = new H.widget.msgBox({
					dialogType : 'loading',
				    content:'系统正在处理中，请稍候'
				});					
	    	    new H.widget.asyncRequest().setURI(retryUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			
			batchRetry :function(){
				if(!showPermissions('editor_material','促销素材')){
					return ;
				}
				var submitHandle = function(o) {
					itemControl.msg.hide();
					if(itemControl.paginator){
						itemControl.paginator.toPage(itemControl.paginator.page);
					}else{
						itemControl.loadItems();
					}
				};
				var data = "id="+listId;
   			    itemControl.msg = new H.widget.msgBox({
					dialogType : 'loading',
				    content:'系统正在处理中，请稍候'
				});					
	    	    new H.widget.asyncRequest().setURI(batchRetryUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
				
			},
	    	loadItems :function() {
		    	var submitHandle = function(o) {
	        	    totalRecords = o.payload.totalRecords;
	        	    if(totalRecords > 0){
						DOM.css(DOM.get('#J_REmpty'), 'display','none');	
						DOM.css(DOM.query(".J_PromotionItemBtnHolder"), 'display','');
					} else {
						DOM.css(DOM.get('#J_REmpty'), 'display' , '');
						DOM.css(DOM.query(".J_PromotionItemBtnHolder"), 'display' ,'none');
					}
	        	    DOM.html(DOM.get("#J_PromotionItemList"), o.payload.body);
	        	    itemControl.renderPromoItems()
	        	    var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
	    	    	itemControl.listItemsPaginator = new showPages('itemControl.listItemsPaginator').setRender(itemControl.listItemsPaginationHandle).setPageCount(pageCount).printHtml('#J_PromotionItemPaging',2);
					DOM.hide('#J_RightLoading');
					DOM.show('#J_MainRightContent');
	    	    }
				if(DOM.val(DOM.get("#J_RightSearchTitle")) != '关键字、商品链接、商品编码'){
	    	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_RightSearchTitle"))); //标题
	    	    }else{
	    	    	var title ='';
	    	    }
				var status = DOM.val(DOM.get('#J_SearchStatus'));
		    	var itemPage = DOM.val(DOM.get("#J_RightSelectItemPage"));//每页多少条
	    	    var data = "q="+title+"&status="+status+"&pageSize="+itemPage+"&id="+listId;
	 			DOM.show('#J_RightLoading');
				DOM.hide('#J_MainRightContent');
	    	    new H.widget.asyncRequest().setURI(loadItemsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			listItemsPaginationHandle : function(turnTo) {
				pageId = turnTo;
	    		var submitHandle = function(o) {
	    			DOM.get("#J_RightCheckAll").checked = false;
	    			totalRecords = o.payload.totalRecords;
	        	    if(totalRecords > 0){
						DOM.css(DOM.get('#J_REmpty'), 'display','none');	
						DOM.css(DOM.query(".J_PromotionItemBtnHolder"), 'display','');
					} else {
						DOM.css(DOM.get('#J_REmpty'), 'display' , '');
						DOM.css(DOM.query(".J_PromotionItemBtnHolder"), 'display' ,'none');
					}
	        	    var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
	    			itemControl.listItemsPaginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_PromotionItemPaging',2);
	    			DOM.html(DOM.get("#J_PromotionItemList") , o.payload.body);
	    			itemControl.renderPromoItems()
	 				DOM.hide('#J_RightLoading');
					DOM.show('#J_MainRightContent');
		    	};
		    	if(DOM.val(DOM.get("#J_RightSearchTitle")) != '关键字、商品链接、商品编码'){
	    	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_RightSearchTitle"))); //标题
	    	    }else{
	    	    	var title ='';
	    	    }
				var status = DOM.val(DOM.get('#J_SearchStatus'));
		    	var itemPage = DOM.val(DOM.get("#J_RightSelectItemPage"));//每页多少条
	    	    var data = "q="+title+"&status="+status+"&pageSize="+itemPage+"&id="+listId+"&page_id="+pageId;
				DOM.show('#J_RightLoading');
				DOM.hide('#J_MainRightContent');
	    	    new H.widget.asyncRequest().setURI(loadItemsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			renderPromoItems : function(){
				var lis = DOM.query("#J_PromotionItemList .J_TbItem");
	        	Event.on(lis, "mouseenter mouseleave click", function(ev){
	        		var el = DOM.get('#'+ev.currentTarget.id+' .J_CheckBox');
	        		if(el.disabled) return;
	        		if(ev.type == 'mouseenter' || ev.type == 'mouseleave'){
	        			DOM.toggleClass(ev.currentTarget, 'hover');
	        		}else if(ev.type == 'click'){
	        			if(el.checked == false){
	        				DOM.addClass(ev.currentTarget,'selected');
	        				el.checked = true;
	        			}else{
							DOM.attr('#J_RightCheckAll','checked',false);
	        				DOM.removeClass(ev.currentTarget,'selected');
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
			retryHandle : function(e) {
				if(!showPermissions('editor_material','促销素材')){
					return ;
				}
				var id = DOM.attr(this,'data');
				var submitHandle = function(o) {
					if(itemControl.paginator){
						itemControl.paginator.toPage(itemControl.paginator.page);
					}else{
						itemControl.loadItems();
					}
				}
	    	    var data = "list_item_id="+id+"&form_key="+FORM_KEY;
	    	    new H.widget.asyncRequest().setURI(retryUrl).setMethod("POST").setHandle(submitHandle).setData(data).send();
			},
			
			removeItems : function(e) {
				if(!showPermissions('editor_material','促销素材')){
					return ;
				}
				DOM.attr('#J_RemoveItems','disabled',true);
				DOM.replaceClass('#J_RemoveItems','btm-caozuo-orange','btm-caozuo-gray-none');
				e.preventDefault();
				itemIds = [];
				checkBoxs = DOM.query("#J_PromotionItemList .J_CheckBox");
				len = checkBoxs.length;
				for(i=0; i<len; i++){
	                if(checkBoxs[i].checked && !checkBoxs[i].disabled){
	                	itemIds.push(checkBoxs[i].value);
	                }
				}
				if(itemIds.length == 0){
	   			   new H.widget.msgBox({
					    title:"错误提示",
					    content:'未选择任何宝贝'	,
					    autoClose:true,
					    timeOut:1000
					});
					DOM.attr('#J_RemoveItems','disabled',false);
					DOM.replaceClass('#J_RemoveItems','btm-caozuo-gray-none','btm-caozuo-orange');
					return;
				}
				var submitHandle = function(o) {
					DOM.attr('#J_RemoveItems','disabled',false);
					DOM.replaceClass('#J_RemoveItems','btm-caozuo-gray-none','btm-caozuo-orange');
		            len = checkBoxs.length;
					for(i=0; i<len; i++){
						if(checkBoxs[i].checked && !checkBoxs[i].disabled){
							DOM.html(DOM.get('#J_Status_'+checkBoxs[i].value), '<div class="status-pendding"><div>等待处理</div></div>');
							checkBoxs[i].disabled = 'disabled';
						}
					}
		   			   new H.widget.msgBox({
						    title:"",
							dialogType : 'loading',
						    content:'已成功添加任务，稍后即可同步到淘宝，可刷新页面查看状态'	,
						    autoClose:true,
						    timeOut:2000
						});
	    	    };
	    	    var data = "id="+listId+"&item_ids="+itemIds+"&form_key="+FORM_KEY;
	    	    new H.widget.asyncRequest().setURI(removeItemsUrl).setMethod("POST").setHandle(submitHandle).setData(data).send();
			},
			rightCheckAll : function(e) {
				checkBoxs = DOM.query("#J_PromotionItemList .J_CheckBox");
				len = checkBoxs.length;
				for(i=0; i<len; i++){
					var iid = checkBoxs[i].value;
					if(checkBoxs[i].disabled) continue;
					if(this.checked){
						checkBoxs[i].checked = true;
						DOM.addClass('#J_Item_'+iid,'selected');
					} else {
						DOM.attr('#J_RightCheckAll','checked',false);
						DOM.removeClass('#J_Item_'+iid,'selected');
						checkBoxs[i].checked = false;
					}
				}
			}
	}
}, {
    requires: ['utils/showPages/index']
});