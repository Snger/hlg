/*
combined files : 

utils/showPages/index
page/optimView-init

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
KISSY.add('page/optimView-init',function(S,showPages,O){
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
				var data = "id="+id+"&title="+title;
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
						DOM.css(DOM.get('#J_REmpty') ,'display','none');
					} else {
						DOM.css(DOM.get('#J_REmpty'), 'display' , '');
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
						DOM.css(DOM.get('#J_REmpty') ,'display','none');
					} else {
						DOM.css(DOM.get('#J_REmpty'), 'display' , '');
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
						DOM.css(DOM.get('#J_REmpty') ,'display','none');
					} else {
						DOM.css(DOM.get('#J_REmpty'), 'display' , '');
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
						DOM.css(DOM.get('#J_REmpty') ,'display','none');
					} else {
						DOM.css(DOM.get('#J_REmpty'), 'display' , '');
					}
					DOM.html('#J_Tab4List' ,o.payload.body);
					var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					optimView.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_Tab4Paging',3);
				};
				if(DOM.val(DOM.get("#J_Tab4Keyword")) != '输入热词'){
					var keyword = encodeURIComponent(DOM.val(DOM.get("#J_Tab3Keyword"))); //标题
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
						DOM.css(DOM.get('#J_REmpty') ,'display','none');
					} else {
						DOM.css(DOM.get('#J_REmpty'), 'display' , '');
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
						DOM.css(DOM.get('#J_REmpty') ,'display','none');
					} else {
						DOM.css(DOM.get('#J_REmpty'), 'display' , '');
					}
					DOM.html('#J_Tab5List' ,o.payload.body);
					var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					optimView.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_Tab5Paging',3);
				};
				if(DOM.val(DOM.get("#J_Tab5Keyword")) != '输入热词'){
					var keyword = encodeURIComponent(DOM.val(DOM.get("#J_Tab3Keyword"))); //标题
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
						DOM.css(DOM.get('#J_REmpty') ,'display','none');
					} else {
						DOM.css(DOM.get('#J_REmpty'), 'display' , '');
					}
					DOM.html('#J_Tab6List' ,o.payload.body);
					var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					optimView.paginator = new showPages('optimView.paginator').setRender(optimView.handlePagination).setPageCount(pageCount).printHtml('#J_BottomPaging',2);
					optimView.paginator = new showPages('optimView.paginator').setRender(optimView.handlePagination).setPageCount(pageCount).printHtml('#J_TopPaging',3);
				};
				if(DOM.val(DOM.get("#J_Tab6Keyword")) != '输入热词'){
					var keyword = encodeURIComponent(DOM.val(DOM.get("#J_Tab3Keyword"))); //标题
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
