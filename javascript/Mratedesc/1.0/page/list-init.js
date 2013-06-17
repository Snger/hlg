/**
 * @fileOverview 
 * @author  
 */
KISSY.add(function (S,showPages,O) {
    // your code here
	var DOM = S.DOM, Event = S.Event;	
	
	return rateControl = {
	    	rateDelPaginator : null,
			paginator : null,
	    	msg :null,
			panel : null,
	    	init : function() {
			
				DOM.attr('#J_SelectItemCid','onchange','rateControl.searchRateTbItems();');	
				rateControl.searchRateTbItems();
				Event.on('#J_CheckAll','click',rateControl.checkAll);  //淘宝宝贝全选
	    	    Event.on('#J_SearchRateTbItem','click',rateControl.searchRateTbItems);
	    	    Event.on('#J_SearchRateDelItem','click',rateControl.searchRateDelItems);
	    	    Event.on('#J_SearchRateSetItem','click',rateControl.searchRateSetItems);
	        },
			//淘宝宝贝全选
			checkAll : function(e) {
				checkBoxs = DOM.query('#J_TbItemList .J_CheckBox');
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
			checkBoxClick : function(e) {
				var id = this.value;
				if(!this.checked){
					DOM.attr('#J_CheckAll','checked',false);
				}
			},
		       //搜索淘宝宝贝
	        searchRateTbItems : function() {
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
					var oTriggers = DOM.query('#J_TbItemList .J_CheckBox');
                	Event.on(oTriggers, "click", rateControl.checkBoxClick);
					//rateControl.renderItems(o.payload.body);
					pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					rateControl.paginator = new showPages('rateControl.paginator').setRender(rateControl.rateTbHandlePagination).setPageCount(pageCount).printHtml('#J_Paging',2);					
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
                var cid = DOM.val(DOM.get("#J_SelectItemCid")); //类目
    	    	var type = '1'; //出售中 库中
    	    	var itemOrder = DOM.val(DOM.get("#J_SelectItemOrder"));//排序方式
    	    	var itemPage = 10;//每页多少条
    	    	//价格区间
    	    	var startPrice = DOM.val(DOM.get("#J_StartPrice"));
         	    var endPrice = DOM.val(DOM.get("#J_EndPrice"));
    	    	var data = "q="+title+"&cid="+cid+"&type="+type;
            	    data +="&itemOrder="+itemOrder+"&pageSize="+itemPage;
				DOM.show('#J_LeftLoading');
				DOM.hide('#J_MainLeftContent');
        	    new H.widget.asyncRequest().setURI(getItemsFromTbUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).setDataType('json').send();
			},
	    	rateTbHandlePagination : function(turnTo) {
		    	pageId = turnTo;
	    		var submitHandle = function(o) {
	    				DOM.get("#J_CheckAll").checked = false;
	    			 totalRecords = o.payload.totalRecords;
					 pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
	    			rateControl.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_Paging',2);
	    			DOM.html(DOM.get("#J_TbItemList"), o.payload.body,true);
					var oTriggers = DOM.query('#J_TbItemList .J_CheckBox');
                	Event.on(oTriggers, "click", rateControl.checkBoxClick);
	        	   	DOM.hide('#J_LeftLoading');
					DOM.show('#J_MainLeftContent');
		    	};
		    	if(DOM.val(DOM.get("#J_SearchTitle")) != '关键字、商品链接、商品编码'){
        	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle"))); //标题
        	    }else{
        	    	var title ='';
        	    }
	                var cid = DOM.val(DOM.get("#J_SelectItemCid")); //类目
	    	    	var type = 1; //出售中 库中
	    	    	var itemOrder = DOM.val(DOM.get("#J_SelectItemOrder"));//排序方式
	    	    	var itemPage = 10;//每页多少条
	    	    	//价格区间
	    	    	var data = "q="+title+"&cid="+cid+"&type="+type;
	            	    data +="&pageSize="+itemPage;
	            	    data +="&page_id="+pageId;
		   
    	        DOM.show('#J_LeftLoading');
				DOM.hide('#J_MainLeftContent');
        	    new H.widget.asyncRequest().setURI(getItemsFromTbUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			openItemRateDialog :function (itemId, url){
			
				if(!rateControl.panel){
					rateControl.panel  = new O.Dialog({
					      width: 750,
					      headerContent: '评价推荐管理',
					      bodyContent: '',
					      mask: false,
					      align: {
					          points: ['cc', 'cc']
					      },
					      closable :true,
					      draggable: true,
					      aria:true
					  });
				}
				var ifr = document.createElement('iframe');
				DOM.css( ifr, 'height', '500px' );
				DOM.css( ifr, 'width', '750px' );
			    ifr.src = url;
			    ifr.scrolling = 'yes'; 
			    ifr.frameBorder = 0;
				rateControl.panel.set('bodyContent',ifr);
				rateControl.panel.show();
			  //  DOM.addClass( ifr, 'ifr hidden' );
				
				
				
			},
			
		       //搜索淘宝宝贝
	        searchRateSetItems : function() {
                var submitHandle = function(o) {
						DOM.hide('#J_LeftLoading');
						DOM.show('#J_MainLeftContent');
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
						//rateControl.renderItems(o.payload.body);
						pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
						rateControl.paginator = new showPages('rateControl.paginator').setRender(rateControl.rateSetHandlePagination).setPageCount(pageCount).printHtml('#J_Paging',2);					
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
        	    if(DOM.val(DOM.get("#J_SearchItemId")) != '宝贝ID'){
        	    	var itemId = DOM.val(DOM.get("#J_SearchItemId"));//宝贝ID
        	    }else{
        	    	var itemId = '';
        	    }
                var status = DOM.val(DOM.get("#J_Status")); //类目
    	    	var rateSource = DOM.val(DOM.get("#J_RateSource"));//排序方式
    	    	var itemPage = 10;//每页多少条
    	    	//价格区间

    	    	var data = "status="+status+"&rateSource="+rateSource+"&pageSize="+itemPage;
        	   		DOM.show('#J_LeftLoading');
					DOM.hide('#J_MainLeftContent');
        	    new H.widget.asyncRequest().setURI(loadRateItemsUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).setDataType('json').send();
			},
			rateSetHandlePagination : function(turnTo) {
		    	pageId = turnTo;
	    		var submitHandle = function(o) {
	    			DOM.get("#J_CheckAll").checked = false;
	    			 totalRecords = o.payload.totalRecords;
					 pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
	    			rateControl.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_Paging',2);
	    			DOM.html(DOM.get("#J_TbItemList"), o.payload.body,true);
	        	    DOM.hide('#J_LeftLoading');
					DOM.show('#J_MainLeftContent');
		    	};
	        	    if(DOM.val(DOM.get("#J_SearchItemId")) != '宝贝ID'){
	        	    	var itemId = DOM.val(DOM.get("#J_SearchItemId"));//宝贝ID
	        	    }else{
	        	    	var itemId = '';
	        	    }
	                var status = DOM.val(DOM.get("#J_Status")); //状态
	    	    	var rateSource = DOM.val(DOM.get("#J_RateSource"));//来源
	    	    	var itemPage = 10;//每页多少条
	    	    	//价格区间
	    	    	var data = "status="+status+"&rateSource="+rateSource;
	            	    data +="&itemId="+itemId+"&pageSize="+itemPage;
	            	    data +="&page_id="+pageId;
		   
    	      		DOM.show('#J_LeftLoading');
					DOM.hide('#J_MainLeftContent');
        	    new H.widget.asyncRequest().setURI(loadRateItemsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			
		       //搜索取消评价宝贝
	        searchRateDelItems : function() {
                var submitHandle = function(o) {
					DOM.hide('#J_RightLoading');
					DOM.show('#J_MainRightContent');
                	DOM.removeClass(".J_ItemSelectBtnHolder_1",'ks-hidden');
                	DOM.get("#J_NoteIcon_1").style.display = 'none';
	        	    totalRecords = o.payload.totalRecords;
					if(totalRecords > 0){
						DOM.get('#J_LEmpty_1').style.display = 'none';
						DOM.css(DOM.query(".J_ItemSelectBtnHolder_1"),'display' ,'');						

					} else {
						DOM.get('#J_LEmpty_1').style.display = '';
						DOM.css(DOM.query(".J_ItemSelectBtnHolder_1"),'display' ,'none');
					}
					DOM.html(DOM.get("#J_TbItemList_1"), o.payload.body,true);
					//rateControl.renderItems(o.payload.body);
					pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					rateControl.rateDelPaginator = new showPages('rateControl.rateDelPaginator').setRender(rateControl.rateDelHandlePagination).setPageCount(pageCount).printHtml('#J_Paging_1',2);					
        	    };
        	    var errorHandle = function(o){
        	    			new H.widget.msgBox({
									    title:"错误提示",
									    content:o.desc,
									    type:"error"
									});
        	    };

                var status = DOM.val(DOM.get("#J_Status_1")); //类目
    	    	var rateSource = 0;//排序方式
    	    	var itemPage = 10;//每页多少条
    	    	//价格区间
					DOM.show('#J_RightLoading');
					DOM.hide('#J_MainRightContent');
    	    	var data = "status="+status+"&rateSource="+rateSource+"&pageSize="+itemPage;
        	    new H.widget.asyncRequest().setURI(loadRateDelItemsUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).setDataType('json').send();
			},
			rateDelHandlePagination : function(turnTo) {
		    	pageId = turnTo;
	    		var submitHandle = function(o) {
					DOM.hide('#J_RightLoading');
					DOM.show('#J_MainRightContent');
	    			//DOM.get("#J_CheckAll_1").checked = false;
	    			 totalRecords = o.payload.totalRecords;
					 pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
	    			rateControl.rateDelPaginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_Paging_1',2);
	    			DOM.html(DOM.get("#J_TbItemList_1"), o.payload.body,true);
		    	};
	                var status = DOM.val(DOM.get("#J_Status_1")); //状态
	    	    	var rateSource = 0;//来源
	    	    	var itemPage = 10;//每页多少条
	    	    	//价格区间
	    	    	var data = "status="+status+"&rateSource="+rateSource;
	            	    data +="&page_id="+pageId+"&pageSize="+itemPage;
						DOM.show('#J_RightLoading');
					DOM.hide('#J_MainRightContent');
        	    new H.widget.asyncRequest().setURI(loadRateDelItemsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			
			addSelectItemsUpdateRate : function() {
				if(!showPermissions('editor_tool','工具箱')){return ;}
				checkBoxs = DOM.query("#J_TbItemList .J_CheckBox");
				var len = checkBoxs.length;
				var m=0;
				var json = [];
				for(i=0; i<len; i++){
					if(checkBoxs[i].checked){
						id = checkBoxs[i].value;						
						var o = '{"id":"' + id + '"}';
						o = eval('(' + o + ')');						
						json.push(o);
						m++;
					}
				}
				if(m == 0){
					new H.widget.msgBox({
						    title:"错误提示",
						    content:'未选择任何宝贝！',
						    type:"error",
							autoClose:true,
							timeOut :1000
						});
					return;
				}				 
				var itemsJson = KISSY.JSON.stringify(json);
				var data = "items="+itemsJson+"&form_key="+FORM_KEY;
                var submitHandle = function(o) {
						if(rateControl.paginator){
							rateControl.paginator.toPage(rateControl.paginator.page);
						}else{
							rateControl.searchRateTbItems();
						}
					new H.widget.msgBox({ 
					 			type: "sucess", 
					 			content: o.payload.desc,
								dialogType:"msg", 
								autoClose:true, 
								timeOut:3000
							});
        	    };
        	    var errorHandle = function(o){
        	    		new H.widget.msgBox({
									    title:"错误提示",
									    content:o.desc,
									    type:"error"
									});
        	    
					return;
        	    };
				new H.widget.asyncRequest().setURI(batchUpdateRateUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			},
			
			updateRate : function(id) {
				if(!showPermissions('editor_tool','工具箱')){return ;}			 
				var json = '{"id":"' + id + '"}';
				json = eval('(' + json + ')');
				var itemsJson = KISSY.JSON.stringify(json);
				var data = "items="+itemsJson+"&form_key="+FORM_KEY;
                var submitHandle = function(o) {
					 	new H.widget.msgBox({ 
					 			type: "sucess", 
					 			content: o.payload.desc,
								dialogType:"msg", 
								autoClose:true, 
								timeOut:3000
							});
        	    	DOM.html(DOM.get('#J_StatusValue_'+id), o.payload.statusValue);
        	    	DOM.html(DOM.get('#J_Created_'+id), o.payload.created);
        	    };
        	    var errorHandle = function(o){
							new H.widget.msgBox({
									    title:"错误提示",
									    content:o.desc,
									    type:"error"
									});
        	    
        	    };
				new H.widget.asyncRequest().setURI(updateRateUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			}
			
	
			
    };
}, {
    requires: ['utils/showPages/index','overlay']
});