KISSY.add(function(S,showPages){
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