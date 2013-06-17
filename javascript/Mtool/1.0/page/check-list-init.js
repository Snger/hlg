/**
 * @fileOverview 
 * @author  
 */
KISSY.add(function (S,showPages) {
    // your code here
	var DOM = S.DOM, Event = S.Event;	
	
	return checkprop = {
	    	paginator : null,
	    	panel : null,
	    	msg : null,
			checkBoxs : null,
	    	
	    	init : function() {
				
				checkprop.searchTbItems();
				Event.on('#J_SearchBtn','click',checkprop.searchTbItems); //活动中宝贝全选   	 
			    Event.on('#J_TCheckAll','click',checkprop.CheckAll); //活动中宝贝全选   	    
	        },
     		searchTbItems : function() {
	            var submitHandle = function(o) {
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
						}
						DOM.html('#J_PromotionItemList' ,o.payload.body);
						var oTriggers = DOM.query('#J_PromotionItemList .J_CheckBox');
		                Event.on(oTriggers, "click", function(ev){
							if(!this.checked){
								DOM.attr('#J_TCheckAll','checked',false);
							}
						});
						var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
						checkprop.paginator = new showPages('checkprop.paginator').setRender(checkprop.handlePagination).setPageCount(pageCount).printHtml('#J_BottomPaging',2);
						checkprop.paginator.printHtml('#J_TopPaging',3);
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
					checkprop.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_BottomPaging',2);
					checkprop.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_TopPaging',3);
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
	            	    data +="&itemOrder="+itemOrder+"&pageSize="+itemPage+"&page_id="+pageId;
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
			//宝贝全选
			CheckAll : function(e) {
				if(!checkprop.checkBoxs){
					var checkBoxs = DOM.query('#J_PromotionItemList .J_CheckBox');
				}else{
					var checkBoxs = checkprop.checkBoxs;
				}
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
			} ,
			//Tab切换
			changeTab : function(changeTo,type){
				var checkStatu = DOM.attr('#J_CheckStatus','title');
				if(checkStatu == 0){
					new H.widget.msgBox({
			                title: "温馨提示",
			                content: type+'正在检测中，请稍候...',
			                type: "info"
			            });
					return;
				}
				if(changeTo == 'changeToCats'){
					DOM.css('#J_AllContent','display','none');
					DOM.removeClass('#J_AllLi','current');
					DOM.replaceClass('#J_AllLi','J_DisAbled','J_Abled');
					DOM.replaceClass('#J_CatsLi','J_Abled','J_DisAbled');
					DOM.addClass('#J_CatsLi','current');
					DOM.css('#J_CatsContent','display','');
				} else if(changeTo == 'changeToAll'){
					DOM.css('#J_AllContent','display','');
					DOM.removeClass('#J_CatsLi','current');
					DOM.replaceClass('#J_AllLi','J_Abled','J_DisAbled');
					DOM.replaceClass('#J_CatsLi','J_DisAbled','J_Abled');
					DOM.addClass('#J_AllLi','current');
					DOM.css('#J_CatsContent','display','none');
				}
			},
			//检测
			checkProp : function(type,stepNum){
	        	if(!showPermissions('editor_tool','工具箱')){return ;}
				if(isVersionPer('tool')){return ;}	
				DOM.attr('#J_CheckStatus','title',0);
				var selectCats = DOM.prop('#J_SelectCats','title');
				var data = "selectCats="+selectCats;
				if(type == 'Cats' && selectCats == ''){
					new H.widget.msgBox({
			                title: "温馨提示",
			                content: '请选择类目！',
			                type: "info"
			            });
					return;
				}
				new H.widget.asyncRequest().setURI(checkPropStartUrl).setMethod("POST").setData(data).send();
				DOM.css('#J_'+type+'Step'+stepNum,'display','none');
				DOM.css('#J_'+type+'Step2','display','');
				var timer = S.later(function(){
					var submitHandle = function(o) {
						DOM.attr('#J_CheckStatus','title',o.payload.status);
	        	    	if(o.payload.checkNum == 0){
    						DOM.text('#J_'+type+'_2_CheckNum','正在检测中');
    					}else{
    						DOM.text('#J_'+type+'_2_CheckNum',o.payload.checkNum);
    					}
	        	    	DOM.text('#J_'+type+'_FailkNum',o.payload.fail);
	        	    	if(o.payload.status != 0){
	        	    		timer.cancel();
	    					DOM.css('#J_'+type+'Step2','display','none');
	    					DOM.css('#J_'+type+'Step3','display','');
	    					DOM.text('#J_'+type+'_2_CheckNum',o.payload.checkNum);
	    					
	        	    	}
	        	    };
	        	    var errorHandle = function(o){
							new H.widget.msgBox({
							    title:"错误提示",
							    content:o.desc,
							    type:"error"
							});	
						return;
	        	    };
					new H.widget.asyncRequest().setURI(getCheckNumUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData().send();
				},1000,true,null);
				
			},
			//修改
			alterProp : function(id){
				DOM.prop('#J_check'+id,'checked',true);
//				DOM.css('#J_Alter_'+id,'display','none');
//				DOM.css('#J_Recheck_'+id,'display','');
			},
			//重新检测
			recheckProp : function(id){
				var data = "item_id="+id;
				new H.widget.asyncRequest().setURI(retryCheckItemUrl).setMethod("POST").setData(data).send();
					new H.widget.msgBox({
			                title: "温馨提示",
			                content: '正在检测...',
			                type: "info",
							autoClose:true,
							timeOut :2000
			            });
			}
	
			
    	};
}, {
    requires: ['utils/showPages/index']
});