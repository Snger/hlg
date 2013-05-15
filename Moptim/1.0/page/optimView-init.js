KISSY.add(function(S,showPages,O){
	var S = KISSY,DOM = S.DOM, Event = S.Event;	
	return optimView = {
	    	paginator : null,
	    	msg : null,
	    	dialog : null,
			tabs : null,
	    	init : function() {
				optimView.loadDetail();
//				optimView.loadWords();
				Event.on('#J_LoadDetail','click',function(ev){
					optimView.loadDetail();
				})
				Event.on('#J_UpdateItem','click',function(ev){
					optimView.updateItem();
				})
				optimView.tabs = new S.Tabs('#wrapper',{
					navCls: 'ks-switchable-nav',
					triggerType: 'click',
					contentCls:'main-content',
					activeTriggerCls: 'current'	
				}).on('switch',function(ev){
						var index = ev.currentIndex;
						if(index == 0) {
//							optimView.loadWords();
						}else if(index == 1){
//							optimView.loadHotWords();
						}else if(index == 2){
							optimView.loadCidHots();
						}else if(index == 3){
							optimView.loadUpWords();
						}else if(index == 4){
							optimView.loadTrains();
						}else if(index == 5){
							optimView.loadHotProducts();
						}
				})
	        },
			//评分详情
			loadDetail : function(planId){
	        	var id = DOM.val('#J_ItemId');
	        	var title = DOM.val('#J_ItemTitle');
	        	var cid = DOM.val('#J_Cid');
				var data = "id="+id+"&title="+title+'&refresh=true'+'&topcid='+cid;
	            var submitHandle = function(o) {
	    	    	DOM.html('#J_GradeArea',o.payload.body);
	    	    };
	    	    var errorHandle = function(o){
					new H.widget.msgBox({
					    title:"错误提示",
					    content:o.desc,
					    type:"error"
					});	
					return;
	    	    };
	    	    DOM.html('#J_GradeArea','<div class="center loading" style="margin-top:150px;"></div>');
				new H.widget.asyncRequest().setURI(loadDetailUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			},
			//查看宝贝属性
			itemInfo : function(){
				var submitHandle = function(o) {
					var str = o.payload.body;
					optimView.dialog = new O.Dialog({
					      width: 470,
					      headerContent: '评分详情',
					      bodyContent: str,
					      mask: false,
					      align: {
					          points: ['cc', 'cc']
					      },
					      closable :true,
					      draggable: true,
					      aria:true
					});	
					optimView.dialog.show();
				}
	        	var id = DOM.val('#J_ItemId');
				var data = "id="+id;
				new H.widget.asyncRequest().setURI(itemInfoUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			//更新到店铺
			updateItem : function(){
				var submitHandle = function(o) {
                	new H.widget.msgBox({
                		type: "sucess",
                        content: "更新成功！",
         				dialogType:"msg",
        				autoClose:true,
        				timeOut:3000,
                    });
				}
				var item_id = DOM.val('#J_ItemId');
				if(DOM.val(DOM.get("#J_ItemTitle")) != '关键字、商品链接、商品编码'){
					var title = encodeURIComponent(DOM.val(DOM.get("#J_ItemTitle"))); //标题
				}else{
					var title ='';
				}
				var data = "item_id="+item_id+"&title="+title;
				new H.widget.asyncRequest().setURI(updateItemUrl).setMethod("POST").setHandle(submitHandle).setData(data).send();
			},
			//获取类目热词列表tab3
			loadCidHots : function() {
				var submitHandle = function(o) {
					DOM.hide('#J_RightLoading');
					DOM.show('#J_MainRightContent');
					totalRecords = o.payload.totalRecords;
					DOM.css(DOM.get('#J_NoteIcon') ,'display','none');
					if(totalRecords > 0){
					    DOM.css(DOM.get('#J_Tab3List') ,'display','');
						DOM.css(DOM.get('#J_Tab3Empty') ,'display','none');
					} else {
					    DOM.css(DOM.get('#J_Tab3List'), 'display' , 'none');
						DOM.css(DOM.get('#J_Tab3Empty'), 'display' , '');
					}
					DOM.html('#J_Tab3List' ,o.payload.body);
					var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					optimView.paginator = new showPages('optimView.paginator').setRender(optimView.tab3Pagination).setPageCount(pageCount).printHtml('#J_Tab3Paging',3);
				};
				if(DOM.val(DOM.get("#J_Tab3Keyword")) != '输入热词'){
					var keyword = encodeURIComponent(DOM.val(DOM.get("#J_Tab3Keyword"))); //标题
				}else{
					var keyword ='';
				}
				var pageSize = 12;
				var cid = DOM.val('#J_ItemCid');
				var data = "keyword="+keyword+"&cid="+cid+"&pageSize="+pageSize;
				DOM.show('#J_RightLoading');
				DOM.hide('#J_MainRightContent');
				new H.widget.asyncRequest().setURI(loadCidHotsUrl).setMethod("POST").setHandle(submitHandle).setData(data).send();
			},
			//类目热词列表tab3分页
	    	tab3Pagination : function(turnTo) {
		    	pageId = turnTo;
		    	var submitHandle = function(o) {
					DOM.hide('#J_RightLoading');
					DOM.show('#J_MainRightContent');
					totalRecords = o.payload.totalRecords;
					DOM.css(DOM.get('#J_NoteIcon') ,'display','none');
					if(totalRecords > 0){
					    DOM.css(DOM.get('#J_Tab3List'), 'display' , '');
						DOM.css(DOM.get('#J_Tab3Empty') ,'display','none');
					} else {
					    DOM.css(DOM.get('#J_Tab3List'), 'display' , 'none');
						DOM.css(DOM.get('#J_Tab3Empty'), 'display' , '');
					}
					DOM.html('#J_Tab3List' ,o.payload.body);
					var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					optimView.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_Tab3Paging',3);
				};
				if(DOM.val(DOM.get("#J_Tab3Keyword")) != '输入热词'){
					var keyword = encodeURIComponent(DOM.val(DOM.get("#J_Tab3Keyword"))); //标题
				}else{
					var keyword ='';
				}
				var pageSize = 12;
				var cid = DOM.val('#J_ItemCid');
				var data = "keyword="+keyword+"&cid="+cid+"&pageSize="+pageSize+"&page_id="+pageId;
				DOM.show('#J_RightLoading');
				DOM.hide('#J_MainRightContent');
				new H.widget.asyncRequest().setURI(loadCidHotsUrl).setMethod("POST").setHandle(submitHandle).setData(data).send();
			},
			//获取最快上升列表tab4
			loadUpWords : function() {
				var submitHandle = function(o) {
					DOM.hide('#J_RightLoading');
					DOM.show('#J_MainRightContent');
					totalRecords = o.payload.totalRecords;
					DOM.css(DOM.get('#J_NoteIcon') ,'display','none');
					if(totalRecords > 0){
					    DOM.css(DOM.get('#J_Tab4List') ,'display','');
						DOM.css(DOM.get('#J_Tab4Empty') ,'display','none');
					} else {
					    DOM.css(DOM.get('#J_Tab4List') ,'display','none');
						DOM.css(DOM.get('#J_Tab4Empty'), 'display' , '');
					}
					DOM.html('#J_Tab4List' ,o.payload.body);
					var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					optimView.paginator = new showPages('optimView.paginator').setRender(optimView.tab4Pagination).setPageCount(pageCount).printHtml('#J_Tab4Paging',3);
				};
				if(DOM.val(DOM.get("#J_Tab4Keyword")) != '输入热词'){
					var keyword = encodeURIComponent(DOM.val(DOM.get("#J_Tab4Keyword"))); //标题
				}else{
					var keyword ='';
				}
				var pageSize = 12;
				var cid = DOM.val('#J_ItemCid');
				var data = "keyword="+keyword+"&cid="+cid+"&pageSize="+pageSize;
				DOM.show('#J_RightLoading');
				DOM.hide('#J_MainRightContent');
				new H.widget.asyncRequest().setURI(loadUpWordsUrl).setMethod("POST").setHandle(submitHandle).setData(data).send();
			},
			//最快上升列表tab4分页
	    	tab4Pagination : function(turnTo) {
		    	pageId = turnTo;
		    	var submitHandle = function(o) {
					DOM.hide('#J_RightLoading');
					DOM.show('#J_MainRightContent');
					totalRecords = o.payload.totalRecords;
					DOM.css(DOM.get('#J_NoteIcon') ,'display','none');
					if(totalRecords > 0){
						DOM.css(DOM.get('#J_Tab4List') ,'display','');
						DOM.css(DOM.get('#J_Tab4Empty') ,'display','none');
					} else {
						DOM.css(DOM.get('#J_Tab4Empty'), 'display' , '');
						DOM.css(DOM.get('#J_Tab4Empty'), 'display' , 'none');
					}
					DOM.html('#J_Tab4List' ,o.payload.body);
					var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					optimView.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_Tab4Paging',3);
				};
				if(DOM.val(DOM.get("#J_Tab4Keyword")) != '输入热词'){
					var keyword = encodeURIComponent(DOM.val(DOM.get("#J_Tab4Keyword"))); //标题
				}else{
					var keyword ='';
				}
				var pageSize = 12;
				var cid = DOM.val('#J_ItemCid');
				var data = "keyword="+keyword+"&cid="+cid+"&pageSize="+pageSize+"&page_id="+pageId;
				DOM.show('#J_RightLoading');
				DOM.hide('#J_MainRightContent');
				new H.widget.asyncRequest().setURI(loadUpWordsUrl).setMethod("POST").setHandle(submitHandle).setData(data).send();
			},
			//获取热词直通车列表tab5
			loadTrains : function() {
				var submitHandle = function(o) {
					DOM.hide('#J_RightLoading');
					DOM.show('#J_MainRightContent');
					totalRecords = o.payload.totalRecords;
					DOM.css(DOM.get('#J_NoteIcon') ,'display','none');
					if(totalRecords > 0){
						DOM.css(DOM.get('#J_Tab5List') ,'display','');
						DOM.css(DOM.get('#J_Tab5Empty') ,'display','none');
					} else {
						DOM.css(DOM.get('#J_Tab5List'), 'display' , 'none');
						DOM.css(DOM.get('#J_Tab5Empty'), 'display' , '');
					}
					DOM.html('#J_Tab5List' ,o.payload.body);
					var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					optimView.paginator = new showPages('optimView.paginator').setRender(optimView.tab5Pagination).setPageCount(pageCount).printHtml('#J_Tab5Paging',3);
				};
				if(DOM.val(DOM.get("#J_Tab5Keyword")) != '输入热词'){
					var keyword = encodeURIComponent(DOM.val(DOM.get("#J_Tab5Keyword"))); //标题
				}else{
					var keyword ='';
				}
				var pageSize = 12;
				var cid = DOM.val('#J_ItemCid');
				var data = "keyword="+keyword+"&cid="+cid+"&pageSize="+pageSize;
				DOM.show('#J_RightLoading');
				DOM.hide('#J_MainRightContent');
				new H.widget.asyncRequest().setURI(loadTrainsUrl).setMethod("POST").setHandle(submitHandle).setData(data).send();
			},
			//热词直通车列表tab5分页
			tab5Pagination : function(turnTo) {
		    	pageId = turnTo;
		    	var submitHandle = function(o) {
					DOM.hide('#J_RightLoading');
					DOM.show('#J_MainRightContent');
					totalRecords = o.payload.totalRecords;
					DOM.css(DOM.get('#J_NoteIcon') ,'display','none');
					if(totalRecords > 0){
						DOM.css(DOM.get('#J_Tab5List') ,'display','');
						DOM.css(DOM.get('#J_Tab5Empty') ,'display','none');
					} else {
						DOM.css(DOM.get('#J_Tab5List'), 'display' , 'none');
						DOM.css(DOM.get('#J_Tab5Empty'), 'display' , '');
					}
					DOM.html('#J_Tab5List' ,o.payload.body);
					var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					optimView.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_Tab5Paging',3);
				};
				if(DOM.val(DOM.get("#J_Tab5Keyword")) != '输入热词'){
					var keyword = encodeURIComponent(DOM.val(DOM.get("#J_Tab5Keyword"))); //标题
				}else{
					var keyword ='';
				}
				var pageSize = 12;
				var cid = DOM.val('#J_ItemCid');
				var data = "keyword="+keyword+"&cid="+cid+"&pageSize="+pageSize+"&page_id="+pageId;
				DOM.show('#J_RightLoading');
				DOM.hide('#J_MainRightContent');
				new H.widget.asyncRequest().setURI(loadTrainsUrl).setMethod("POST").setHandle(submitHandle).setData(data).send();
			},
			//获取热销宝贝列表tab6
			loadHotProducts : function() {
				var submitHandle = function(o) {
					DOM.hide('#J_RightLoading');
					DOM.show('#J_MainRightContent');
					totalRecords = o.payload.totalRecords;
					DOM.css(DOM.get('#J_NoteIcon') ,'display','none');
					if(totalRecords > 0){
						DOM.css(DOM.get('#J_Tab6List') ,'display','');
						DOM.css(DOM.get('#J_Tab6Empty') ,'display','none');
					} else {
						DOM.css(DOM.get('#J_Tab6List'), 'display' , 'none');
						DOM.css(DOM.get('#J_Tab6Empty'), 'display' , '');
					}
					DOM.html('#J_Tab6List' ,o.payload.body);
					var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					optimView.paginator = new showPages('optimView.paginator').setRender(optimView.handlePagination).setPageCount(pageCount).printHtml('#J_BottomPaging',2);
					optimView.paginator = new showPages('optimView.paginator').setRender(optimView.handlePagination).setPageCount(pageCount).printHtml('#J_TopPaging',3);
				};
				if(DOM.val(DOM.get("#J_Tab6Keyword")) != '输入热词'){
					var keyword = encodeURIComponent(DOM.val(DOM.get("#J_Tab6Keyword"))); //标题
				}else{
					var keyword ='';
				}
				var pageSize = 12;
				var cid = DOM.val('#J_ItemCid');
				var data = "keyword="+keyword+"&cid="+cid+"&pageSize="+pageSize;
				DOM.show('#J_RightLoading');
				DOM.hide('#J_MainRightContent');
				new H.widget.asyncRequest().setURI(loadHotProductsUrl).setMethod("POST").setHandle(submitHandle).setData(data).send();
			},
			changeGroup : function(groupId){
				var allChose = DOM.query('#J_WordChoose .hotword-word');
				var allGroup = DOM.query('.J_WordGroup');
				DOM.hide(allGroup);
				DOM.removeClass(allChose,'current-word');
				DOM.show('#J_WordGroup'+groupId);
				DOM.addClass('#J_WordChose'+groupId,'current-word');
			},
			checkTitleNotice : function(str) {
				var len = str.replace(/[^\x00-\xff]/g,"**").length;
				if(len > 60){
					DOM.html(DOM.get('#J_Notice'), '宝贝标题超过淘宝限制（30个汉字）');
					DOM.html(DOM.get('#J_Zs'), '');	
					
				}else{
					var limitLen = 60-len;
					DOM.html(DOM.get('#J_Notice'), '');
					DOM.html(DOM.get('#J_Zs'), "您还能输入<span style=\"margin:0 5px;\">"+limitLen+"</span>个字符");
				}
			}
						
    	};
},{
	requires : ['utils/showPages/index','overlay']
});