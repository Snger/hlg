/*
combined files : 

utils/showPages/index
page/specifyAdd-init

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
KISSY.add('page/specifyAdd-init',function(S,showPages){
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
					items = JSON.stringify(items);
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
					items = JSON.stringify(items);
					specifyAdd.ajaxPostProcessItems(1, items);
				},
				ajaxPostProcessItems : function(added, items){
						items = encodeURIComponent(items)
						var data = 'isAjax=1&recommend='+recommend+'&added='+added+'&items='+items;
						if(recommend){
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
