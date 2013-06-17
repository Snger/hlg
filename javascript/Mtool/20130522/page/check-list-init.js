/*
combined files : 

utils/showPages/index
page/check-list-init

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
/**
 * @fileOverview 
 * @author  
 */
KISSY.add('page/check-list-init',function (S,showPages) {
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
