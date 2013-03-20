/*
combined files : 

utils/showPages/index
page/list-init

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
KISSY.add('page/list-init',function (S,showPages,O) {
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
