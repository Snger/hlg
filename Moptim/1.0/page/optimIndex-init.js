KISSY.add(function(S,showPages){
	var S = KISSY,DOM = S.DOM, Event = S.Event;	
	return optimIndex = {
	    	paginator : null,
	    	pageId : 1,
	    	panel : null,
	    	msg : null,
			checkBoxs : null,
	    	init : function() {
				optimIndex.searchTbItems();
				Event.on('#J_RefreshBtn','click',function(){
					if(optimIndex.paginator){
						optimIndex.paginator.toPage(optimIndex.pageId,'refresh');
					}else{
						optimIndex.searchTbItems('refresh');
					}
				});
			    Event.on('#J_SearchBtn','click',optimIndex.searchTbItems); //活动中宝贝全选   	    
	        },
     		searchTbItems : function(refresh) {
    	    	var pageId = DOM.val(DOM.get("#J_PageId"));
	            var submitHandle = function(o) {
					DOM.hide('#J_RightLoading');
					DOM.show('#J_MainRightContent');
	        	    totalRecords = o.payload.totalRecords;
					DOM.css(DOM.get('#J_NoteIcon') ,'display','none');
					if(totalRecords > 0){
						DOM.html('#J_TotalRecords',totalRecords);
						DOM.css(DOM.get('#J_REmpty') ,'display','none');
						DOM.css(DOM.query(".J_PromotionItemBtnHolder") ,'display' , '');
					} else {
						DOM.css(DOM.get('#J_REmpty'), 'display' , '');
						DOM.css(DOM.query(".J_PromotionItemBtnHolder") , 'display' , 'none');
					}
					DOM.html('#J_PromotionItemList' ,o.payload.body);
					var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					optimIndex.paginator = new showPages('optimIndex.paginator').setRender(optimIndex.handlePagination).setPageCount(pageCount).printHtml('#J_BottomPaging',2);
					optimIndex.paginator = new showPages('optimIndex.paginator').setRender(optimIndex.handlePagination).setPageCount(pageCount).printHtml('#J_TopPaging',3);
					if(pageId > 1){
						optimIndex.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_BottomPaging',2);
						optimIndex.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_TopPaging',3);
					}
					document.onmousemove = optimIndex.move_layer;
					Event.on('.J_AClick','click mouseover mouseout',function(ev){
						if(ev.type == 'click'){
							DOM.html('#J_ItemTitle','');
							DOM.hide('#J_ItemTitle');
							var itemId = DOM.attr(ev.currentTarget,'itmeId');
							window.open('http://item.taobao.com/item.htm?id='+itemId);
							ev.stopPropagation();
						}else if(ev.type == 'mouseover'){
							optimIndex.showTitle('1');
							ev.stopPropagation();
						}else if(ev.type == 'mouseout'){
							optimIndex.showTitle('2');
						}
					})
					Event.on('.J_LiClick','click mouseover mouseout',function(ev){
						if(ev.type == 'click'){
							if(isVersionPer('tool')){return ;}
							if(!showPermissions('optim','工具箱')){return ;}
							var link = DOM.attr(ev.currentTarget,'link');
							window.location.href=link+'&p='+optimIndex.pageId;
						}else if(ev.type == 'mouseover'){
							optimIndex.showTitle('2');
						}else if(ev.type == 'mouseout'){
							optimIndex.hideTitle();
						}
					})
	    	    };
	    	    var errorHandle = function(o){
					new H.widget.msgBox({
					    title:"错误提示",
					    content:o.desc,
					    type:"error"
					});	
					return;
	    	    };
	        	 if(DOM.val(DOM.get("#J_SearchTitle")) != '关键字'){
	    	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle"))); //标题
	    	    }else{
	    	    	var title ='';
	    	    }
				var itemPage = 10;//每页多少条
    	    	var type = DOM.val(DOM.get("#J_SearchSelling")); //出售中 库中
    	    	var itemOrder = DOM.val(DOM.get("#J_SelectItemOrder"));//排序方式
    	    	
    	    	var data = "q="+title+"&type="+type;
            	    data +="&itemOrder="+itemOrder+"&pageSize="+itemPage+"&page_id="+pageId;
            	    if(refresh){
            	    	data +="&refresh=true";
            	    }
	 			DOM.show('#J_RightLoading');
				DOM.hide('#J_MainRightContent');
	    	    new H.widget.asyncRequest().setURI(getItemsFromTbUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			},
			move_layer : function(event){
				event = event || window.event;
				var srcollTop = DOM.scrollTop();
				DOM.css('#J_ItemTitle','left',event.clientX+document.body.scrollLeft+10);
				DOM.css('#J_ItemTitle','top',event.clientY+srcollTop+10);
			},
			showTitle : function(type) {
				if(type == '1'){
					DOM.html('#J_ItemTitle','<div style="background:#fff;width:110px;height:30px;text-align:center;line-height:30px;border:2px solid #555555;">点击查看宝贝</div>');
				}else{
					DOM.html('#J_ItemTitle','<div style="background:#fff;width:110px;height:30px;text-align:center;line-height:30px;border:2px solid #555555;">点击查看评分详情</div>');
				}
				DOM.show('#J_ItemTitle');
			},
			hideTitle : function() {
				DOM.html('#J_ItemTitle','');
				DOM.hide('#J_ItemTitle');
			},
	    	handlePagination : function(turnTo,refresh) {
		    	optimIndex.pageId = turnTo;
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
					var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					optimIndex.paginator.setPage(optimIndex.pageId).setPageCount(pageCount).printHtml('#J_BottomPaging',2);
					optimIndex.paginator.setPage(optimIndex.pageId).setPageCount(pageCount).printHtml('#J_TopPaging',3);
					document.onmousemove = optimIndex.move_layer;
					Event.on('.J_AClick','click mouseover mouseout',function(ev){
						if(ev.type == 'click'){
							DOM.html('#J_ItemTitle','');
							DOM.hide('#J_ItemTitle');
							var itemId = DOM.attr(ev.currentTarget,'itmeId');
							window.open('http://item.taobao.com/item.htm?id='+itemId);
							ev.stopPropagation();
						}else if(ev.type == 'mouseover'){
							optimIndex.showTitle('1');
							ev.stopPropagation();
						}else if(ev.type == 'mouseout'){
							optimIndex.showTitle('2');
						}
					})
					Event.on('.J_LiClick','click mouseover mouseout',function(ev){
						if(ev.type == 'click'){
							if(isVersionPer('tool')){return ;}
							var link = DOM.attr(ev.currentTarget,'link');
							window.location.href=link+'&p='+optimIndex.pageId;
						}else if(ev.type == 'mouseover'){
							optimIndex.showTitle('2');
						}else if(ev.type == 'mouseout'){
							optimIndex.hideTitle();
						}
					})
		    	};
	    	    var errorHandle = function(o){
					new H.widget.msgBox({
					    title:"错误提示",
					    content:o.desc,
					    type:"error"
					});	
					return;
	    	    };
		    	if(DOM.val(DOM.get("#J_SearchTitle")) != '关键字'){
	    	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle"))); //标题
	    	    }else{
	    	    	var title ='';
	    	    }
				var itemPage = 10;//每页多少条
    	    	var type = DOM.val(DOM.get("#J_SearchSelling")); //出售中 库中
    	    	var itemOrder = DOM.val(DOM.get("#J_SelectItemOrder"));//排序方式
    	    	
    	    	var data = "q="+title+"&type="+type;
            	    data +="&itemOrder="+itemOrder+"&pageSize="+itemPage+"&page_id="+optimIndex.pageId;
            	    if(refresh){
            	    	data +="&refresh=true";
            	    }
    	        DOM.show('#J_RightLoading');
				DOM.hide('#J_MainRightContent');
        	    new H.widget.asyncRequest().setURI(getItemsFromTbUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			},
			//评分详情
			openDetail : function(planId){
				var data = "plan_id="+planId;
	            var submitHandle = function(o) {
	    	    	DOM.html('#J_GradeArea',o.body);
	    	    };
	    	    var errorHandle = function(o){
					new H.widget.msgBox({
					    title:"错误提示",
					    content:o.desc,
					    type:"error"
					});	
					return;
	    	    };
				new H.widget.asyncRequest().setURI(loadDetailUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			}
						
    	};
},{
	requires : ['utils/showPages/index']
});