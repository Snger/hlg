KISSY.add(function(S,showPages){
	var S = KISSY,DOM = S.DOM,Event = S.Event;
	return specifyAdd = {
			msg :null ,
			isLoad : false,
			paginator:null,
			init : function(){
				specifyAdd.run();
			},
			//搜索活动中宝贝
			run : function() {
				specifyAdd.searchTbItems();
				Event.on('#J_SelectItemCid',"change",function(S){
					specifyAdd.searchTbItems();
				});
				Event.on('#J_SearchBtn',"click",function(S){
					specifyAdd.searchTbItems();
				});
			},
	 		searchTbItems : function() {
	            var submitHandle = function(o) {
					DOM.attr("#J_LCheckAll-b",'checked',false);
					DOM.hide('#J_RightLoading');
					DOM.show('#J_MainRightContent');
	        	    totalRecords = o.payload.totalRecords;
					DOM.css(DOM.get('#J_NoteIcon') ,'display','none');
					if(totalRecords > 0){
						DOM.css(DOM.get('#J_REmpty') ,'display','none');
						DOM.css(DOM.query(".J_PromotionItemBtnHolder") ,'display' , '');
					} else {
						DOM.css(DOM.get('#J_REmpty'), 'display' , '');
						DOM.css(DOM.query(".J_PromotionItemBtnHolder") , 'display' , 'none');
						DOM.css(DOM.query(".J_ControlBtm") , 'display' , 'none');
					}
					DOM.html('#J_PromotionItemList' ,o.payload.body);
					var oTriggers = DOM.query('#J_PromotionItemList .J_CheckBox');
					selectItemNum = 0;
					changeItemId = '';
	                Event.on(oTriggers,'click', function(ev){
						if(!this.checked){
							DOM.attr('#J_TCheckAll','checked',false);
						} 
					});
					var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					specifyAdd.paginator = new showPages('specifyAdd.paginator').setRender(specifyAdd.handlePagination).setPageCount(pageCount).printHtml('#J_BottomPaging',2);
					specifyAdd.paginator = new showPages('specifyAdd.paginator').setRender(specifyAdd.handlePagination).setPageCount(pageCount).printHtml('#J_TopPaging',3);
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
	    	    	
	    	    	var data = "recommend="+recommend+"&q="+title+"&cid="+cid+"&type="+type;
	            	    data +="&itemOrder="+itemOrder+"&pageSize="+itemPage;
	    	    	if (type == 0) {
						//价格区间
						var startPrice = DOM.val(DOM.get("#J_StartPrice"));
						var endPrice = DOM.val(DOM.get("#J_EndPrice"));
						data += "&start_price="+startPrice+"&end_price="+endPrice;
					}
	 			DOM.show('#J_RightLoading');
				DOM.hide('#J_MainRightContent');
	    	    new H.widget.asyncRequest().setURI(getItemsFromTbUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
	    	handlePagination : function(turnTo) {
		    	pageId = turnTo;
	    		var submitHandle = function(o) {
					
					DOM.hide('#J_RightLoading');
					DOM.show('#J_MainRightContent');
	        	    totalRecords = o.payload.totalRecords;
					DOM.attr("#J_LCheckAll-b",'checked',false);
					DOM.css(DOM.get('#J_NoteIcon') ,'display','none');
					if(totalRecords > 0){
						DOM.css(DOM.get('#J_REmpty') ,'display','none');
						DOM.css(DOM.query(".J_PromotionItemBtnHolder") ,'display' , '');
					} else {
						DOM.css(DOM.get('#J_REmpty'), 'display' , '');
						DOM.css(DOM.query(".J_PromotionItemBtnHolder") , 'display' , 'none');
					}
					DOM.html('#J_PromotionItemList' ,o.payload.body);

					if(!specifyAdd.checkBoxs){
						var checkBoxs = DOM.query('#J_PromotionItemList .J_CheckBox');
					}else{
						var checkBoxs = specifyAdd.checkBoxs;
					}
					var len = checkBoxs.length;
					var changeItemIdArray = changeItemId.split(',');
					for(var x=0;x<len;x++){
						for(var y=0;y<changeItemIdArray.length;y++){
							if(changeItemIdArray[y] == checkBoxs[x].value){
								checkBoxs[x].checked = true;
							}
						}
					}
					var oTriggers = DOM.query('#J_PromotionItemList .J_CheckBox');
					Event.on(oTriggers,'click', function(ev){
						if(!this.checked){
							DOM.attr('#J_TCheckAll','checked',false);
						} 
					});
					var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					specifyAdd.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_BottomPaging',2);
					specifyAdd.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_TopPaging',3);
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
	    	    	
	    	    	var data = "recommend="+recommend+"&q="+title+"&cid="+cid+"&type="+type;
	            	    data +="&itemOrder="+itemOrder+"&pageSize="+itemPage+"&page_id="+pageId;
	    	    	if (type == 0) {
						//价格区间
						var startPrice = DOM.val(DOM.get("#J_StartPrice"));
						var endPrice = DOM.val(DOM.get("#J_EndPrice"));
						data += "&start_price="+startPrice+"&end_price="+endPrice;
					}
		        DOM.show('#J_RightLoading');
				DOM.hide('#J_MainRightContent');
				if(DOM.attr('#J_TCheckAll','checked')){
					DOM.prop('#J_TCheckAll','checked',false);
				}
	    	    new H.widget.asyncRequest().setURI(getItemsFromTbUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			swLJCheck : function(el){
					
					if(el.checked){
						S.each(S.all(".J_LCheckBox"), function(cb){
							if(DOM.attr(cb,'disabled')!= 'disabled'){
								DOM.attr(cb,'checked', true);
							}
						});
						DOM.attr("#J_LCheckAll",'checked',true);
						DOM.attr("#J_LCheckAll-b",'checked',true);
					}else{
						S.each(S.all(".J_LCheckBox"), function(item, i) {
							if(DOM.attr(item,'disabled')!= 'disabled'){
								DOM.attr(item,'checked', false);
							}
						 });
						DOM.attr("#J_LCheckAll",'checked',false);
						DOM.attr("#J_LCheckAll-b",'checked',false);
					}
				},
			    addItemToSpecify : function(LtdId){
					if(!showPermissions('editor_tool','工具箱')){return ;}
					specifyAdd.msg = new H.widget.msgBox({
															    title:"",
																dialogType : 'loading',
															    content:'系统正在处理'	
															});
					var items = new Array();
					var tbItem = {};
					var Ltd = DOM.get('#Ltd-'+LtdId);
					tbItem.itemId = DOM.val(DOM.get('.numIid', Ltd));
					tbItem.title = DOM.val(DOM.get('.itemTitle', Ltd));
					tbItem.picUrl = DOM.val(DOM.get('.picUrl', Ltd));
					tbItem.delistTime = DOM.val(DOM.get('.delistTime', Ltd));
					items.push(tbItem);
					DOM.html("#add-item-msg",'');
					specifyAdd.ajaxPostProcessItems(1, items);
				},
				addItemsToSpecify : function(){
					if(!showPermissions('editor_tool','工具箱')){return ;}
					specifyAdd.msg = new H.widget.msgBox({
															    title:"",
																dialogType : 'loading',
															    content:'系统正在处理'	
															});
					var items = new Array();
					S.each(S.all(".J_LCheckBox"), function(cb, i){
						if(DOM.attr(cb,'checked')==true || DOM.attr(cb,'checked')=='checked'){
							var itemId = DOM.val(cb);
							var tbItem = {};
							var Ltd = DOM.get('#Ltd-'+itemId);
							tbItem.itemId = DOM.val(DOM.get('.numIid', Ltd));
							tbItem.title = DOM.val(DOM.get('.itemTitle', Ltd));
							tbItem.picUrl = DOM.val(DOM.get('.picUrl', Ltd));
							tbItem.delistTime = DOM.val(DOM.get('.delistTime', Ltd));
							items.push(tbItem);
						}
					});
					if(items.length==0){
						specifyAdd.msg.hide();
	        	    	new H.widget.msgBox({
						    title:"错误提示",
						    content:"未选择任何宝贝",
						    type:"error"
						});
						DOM.html("#add-item-msg",'<font color="red">您未选择宝贝！</font>');
						return false;
					}
					DOM.html("#add-item-msg",'');
					specifyAdd.ajaxPostProcessItems(1, items);
				},
				ajaxPostProcessItems : function(added, items){
						var len = items.length;
						items = JSON.stringify(items);
						items = encodeURIComponent(items)
						var data = 'isAjax=1&recommend='+recommend+'&added='+added+'&items='+items;
						if(recommend){
							
							var remain_count = DOM.val('#remain_count')-len;
							
							if(remain_count<0){
								var remain_num = DOM.val('#J_RemainNum');
								specifyAdd.msg.hide();
								var str ="亲，必推荐的宝贝不能多余"+remain_num+"个哦";
								if(Math.abs(remain_count) > 0){
									str += "请删除"+Math.abs(remain_count)+"个宝贝，再加入！";
								}
								new H.widget.msgBox({
								    title:"错误提示",
								    content:str,
								    type:"error"
								});
								return false;
							}
							data += '&remain_count='+DOM.val('#remain_count');
						}
						
						var ajaxProcessItemsReturnHandle = function(result){
							var added=result.payload.added;
							var items = result.payload.items;
							if(added=='1'){
								for(var i=0;i<items.length;i++){
									specifyAdd.addItemProcess(items[i]);
								}
							}else{
								for(var i=0;i<items.length;i++){
									specifyAdd.delItemProcess(items[i]);
								}
							}
							specifyAdd.msg.hide();
						}
						var ajaxProcessItemsReturnErrorHandle = function(result){
							specifyAdd.msg.hide();
		        	    	new H.widget.msgBox({
							    title:"错误提示",
							    content:result.desc,
							    type:"error"
							});
							return;
						}
						new H.widget.asyncRequest().setURI(switchItemsToSpecifyUrl).setMethod("POST").setHandle(ajaxProcessItemsReturnHandle).setErrorHandle(ajaxProcessItemsReturnErrorHandle).setData(data).send();
				},
				addItemProcess : function(item){
						if(recommend=='1') {
							DOM.html('#Ltd-'+item.itemId,'已推荐');
						} else {
							DOM.html('#Ltd-'+item.itemId,'已排除');
						}
						DOM.attr('#Lcb-'+item.itemId,'disabled','disabled');
						DOM.removeAttr('#Lcb-'+item.itemId,'checked');
						if(recommend=='1') {
							DOM.val('#remain_count', parseInt(DOM.val('#remain_count'))-1);
							DOM.html('#rcount', DOM.val('#remain_count'));
						}
				},

				delItemProcess : function(item){
						DOM.remove("#Rtr-"+item.itemId);
						//DOM.val('#groupItemNum', parseInt(DOM.val('#groupItemNum'))-1);
						//DOM.html('#groupItemNumSpan', DOM.val('#groupItemNum'));
				}
	}
}, {
    requires: ['utils/showPages/index']
});