/*
combined files : 

utils/showPages/index
page/range-init

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
KISSY.add('page/range-init',function (S,showPages) {
    // your code here
      var DOM = S.DOM, Event = S.Event;
	
	    return promotionControl = {
			
			msg : null,
			promotionItemPaginator : null,
			init : function() {
				/*编辑活动*/
				 Event.delegate(document,'click','.J_Editor_Promo', function(ev) {
					 if(!showPermissions('editor_promotion',"编辑促销活动")){
				   			return ;
				   		 }
					var url = DOM.attr(ev.currentTarget,'data');
					var sucessHandle = function(o) {
						window.location.href=url;
					};
					var error = function(o){
						new H.widget.msgBox({
							    title:"错误提示",
							    content:o.desc,
							    type:"error"
							});
					};
					var pid = DOM.attr(ev.currentTarget,'pid');
					var data = "pid="+pid+"&form_key="+FORM_KEY;
			 	    new H.widget.asyncRequest().setURI(editPromoUrl).setMethod("GET").setHandle(sucessHandle).setErrorHandle(error).setData(data).send();
				});
				/*排除宝贝授权*/

				 var timeFunName = null;
				 /*加入宝贝授权*/
					Event.delegate(document,'click dblclick','.J_AddToPromo',function(ev){
							if(!showPermissions('editor_promotion',"编辑促销活动")){
					   			return ;
					   		 }
							promotionControl.addBefore();
							var id = DOM.attr(ev.currentTarget,'data');
							DOM.val('#J_ExpiredActionType',id);
							if(ev.type == 'click'){
					        	 clearTimeout(timeFunName);
					        	 timeFunName = setTimeout(function () {
			                         //console.log('单击');
			                         var sucess = function(o){
											DOM.val('#J_TotalPromoItems',o.payload);
											if(o.payload >= 150){
												promotionControl.addAfter();
													new H.widget.msgBox({
												    title:"温馨提示",
												    content:'非全店活动宝贝数量不能大于150个，现在已经加入'+o.payload+'请删除多余的宝贝，或酌情分多次活动创建',
												    type:"info"
												
												});
											}else{
												var diff  = IsExpired();
								       			 if(diff > -5000 ){
								      					var sucessHandle = function(o) {
								      						if(id == '1'){
								             					promotionControl.addSelectItemsToRange();
								             				}else{
								             					promotionControl.addSelectItemsToRange(id);
								             				}
								      			 		};
								      			 		var errorHandle = function(o){
								      			 			KISSY.Event.fire('.J_TopExpired','click');
												 			promotionControl.addAfter();
								      			 		};
								      			 		var data = '';
								      			  	    new H.widget.asyncRequest().setURI(isExpiredUrl).setMethod("GET").setHandle(sucessHandle).setErrorHandle(errorHandle).setData(data).send();
								      			}else{
								      				if(id == '1'){
						             					promotionControl.addSelectItemsToRange();
						             				}else{
						             					promotionControl.addSelectItemsToRange(id);
						             				}
								      			}
											}
										}
								 		var error = function(o){
								 			promotionControl.addAfter();
								 			new H.widget.msgBox({
												    title:"错误提示",
												    content:o.desc,
												    type:"error"
												});	
								 		};
								 		var data = 'promo_id='+pid;
								  	    new H.widget.asyncRequest().setURI(getPromoItemNumUrl).setMethod("GET").setHandle(sucess).setErrorHandle(error).setData(data).send();
			                      }, 300); 
				        	}
			                 if(ev.type == 'dblclick') {
			                	 clearTimeout(timeFunName); 
			                	 //console.log('双击');
			                     var sucess = function(o){
										DOM.val('#J_TotalPromoItems',o.payload);
										if(o.payload >= 150){
											promotionControl.addAfter();
											new H.widget.msgBox({
												    title:"温馨提示",
												    content:'非全店活动宝贝数量不能大于150个，现在已经加入'+o.payload+'请删除多余的宝贝，或酌情分多次活动创建',
												    type:"info"
												
												});
										}else{
											var diff  = IsExpired();
							       			 if(diff > -5000 ){
							      					var sucessHandle = function(o) {
							      						if(id == '1'){
							             					promotionControl.addSelectItemsToRange();
							             				}else{
							             					promotionControl.addSelectItemsToRange(id);
							             				}
							      			 		};
							      			 		var errorHandle = function(o){
							      			 			KISSY.Event.fire('.J_TopExpired','click');
											 			promotionControl.addAfter();
											 	
							      			 		};
							      			 		var data = '';
							      			  	    new H.widget.asyncRequest().setURI(isExpiredUrl).setMethod("GET").setHandle(sucessHandle).setErrorHandle(errorHandle).setData(data).send();
							      			}else{
							      				if(id == '1'){
					             					promotionControl.addSelectItemsToRange();
					             				}else{
					             					promotionControl.addSelectItemsToRange(id);
					             				}
							      			}
										}
									}
							 		var error = function(o){
								 			promotionControl.addAfter();
							 				new H.widget.msgBox({
												    title:"错误提示",
												    content:o.desc,
												    type:"error"
												});	
							 		};
							 		var data = 'promo_id='+pid;
							  	    new H.widget.asyncRequest().setURI(getPromoItemNumUrl).setMethod("GET").setHandle(sucess).setErrorHandle(error).setData(data).send();
			             
			                 }
					})
		   	    Event.on('#J_SearchBtn','click',promotionControl.searchTbItems); //搜索淘宝宝贝
		   	    Event.on('#J_CheckAll','click',promotionControl.checkAll);  //淘宝宝贝全选
		   	 	Event.on('#J_TopCheckAll','click',promotionControl.checkAll);  //淘宝宝贝全选
		   	  	Event.on('#J_RightSearchBtn','click',promotionControl.loadRange); //搜索活动中宝贝
		   	    Event.on('#J_RightCheckAll','click',promotionControl.rightCheckAll); //活动中宝贝全选
		   	    Event.on('#J_RemovePromotionItems','click',promotionControl.removePromotionRangeHandle); //从活动中移除宝贝
		    },
			//点击 加入活动  后的 按钮还原
			addAfter : function(){
				DOM.show(DOM.query('.J_addItem'));
				DOM.hide(DOM.query('.J_adding'));
				DOM.attr('#J_TopAddToPromo','disabled',false);
				DOM.replaceClass('#J_TopAddToPromo','btm-caozuo-gray-none','btm-caozuo-orange');
				DOM.attr('#J_BtmAddToPromo','disabled',false);
				DOM.replaceClass('#J_BtmAddToPromo','btm-caozuo-gray-none','btm-caozuo-orange');
				
			},
			//点击 加入活动  后的 按钮限制操作
			addBefore : function(){
				DOM.attr('#J_TopAddToPromo','disabled',true);
				DOM.replaceClass('#J_TopAddToPromo','btm-caozuo-orange','btm-caozuo-gray-none');
				DOM.attr('#J_BtmAddToPromo','disabled',true);
				DOM.replaceClass('#J_BtmAddToPromo','btm-caozuo-orange','btm-caozuo-gray-none');
				DOM.hide(DOM.query('.J_addItem'));
				DOM.show(DOM.query('.J_adding'));
				
			},
		
			searchTbItems : function() {
		        var submitHandle = function(o) {
		        	DOM.removeClass(".J_ItemSelectBtnHolder",'ks-hidden');
		        	DOM.get("#J_NoteIcon").style.display = 'none';
		    	    totalRecords = o.payload.totalRecords;
		    	    if(totalRecords > 0){
						DOM.css(DOM.get('#J_LEmpty') ,'display','none');
						DOM.css(DOM.query(".J_ItemSelectBtnHolder") ,'display' , '');
					} else {
						DOM.css(DOM.get('#J_LEmpty'), 'display' , '');
						DOM.css(DOM.query(".J_ItemSelectBtnHolder") , 'display' , 'none');
					}
					promotionControl.renderItems(o.payload.body);
					pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					promotionControl.paginator = new showPages('promotionControl.paginator').setRender(promotionControl.handlePagination).setPageCount(pageCount).printHtml('#J_Paging',2);
					promotionControl.paginator.printHtml('#J_TopPaging',3);
					DOM.hide('#J_LeftLoading');
					DOM.show('#J_MainLeftContent');
			    };
			    if(DOM.val(DOM.get("#J_SearchTitle")) != '输入关键字,商品ID,商家编码'){
			    	var title = encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle"))); //标题
			    }else{
			    	var title ='';
			    }
		        var cid = DOM.val(DOM.get("#J_SelectItemCid")); //类目
		    	var type = DOM.val(DOM.get("#J_SearchSelling")); //出售中 库中
		    	var itemOrder = DOM.val(DOM.get("#J_SelectItemOrder"));//排序方式
		    	var itemPage = DOM.val(DOM.get("#J_SelectItemPage"));//每页多少条
		    	var data = "q="+title+"&cid="+cid+"&type="+type;
		    	    data +="&itemOrder="+itemOrder+"&pageSize="+itemPage;
					data +="&pid="+pid;
		    	if (type == 0) {
					//价格区间
					var startPrice = DOM.val(DOM.get("#J_StartPrice"));
					var endPrice = DOM.val(DOM.get("#J_EndPrice"));
					data += "&start_price="+startPrice+"&end_price="+endPrice;
				}
		        //alert(data);
			   	DOM.show('#J_LeftLoading');
				DOM.hide('#J_MainLeftContent');
			    new H.widget.asyncRequest().setURI(getItemsFromTbUrl).setMethod("GET").setHandle(submitHandle).setData(data).setDataType('json').send();
			},
	
			addSelectItemsToRange: function(iid) {
				checkBoxs = DOM.query("#J_TbItemList .J_CheckBox");
				var json = [];
				len = checkBoxs.length;
				for(i=0; i<len; i++){
					var flag = false;
					if(iid!=undefined){
						if(checkBoxs[i].value == iid && !checkBoxs[i].disabled)
							 flag = true;
					}else{
						if(checkBoxs[i].checked && !checkBoxs[i].disabled)
							 flag = true;
					}
					if(flag == true){
						var totalNum = Number(DOM.val('#J_TotalPromoItems'));	 
						totalNum = totalNum+1;
						if(totalNum >150){
							new H.widget.msgBox({
								    title:"温馨提示",
								    content:'非全店活动宝贝数量不能大于150个，现在已经加入'+totalNum+'请删除多余的宝贝，或酌情分多次活动创建',
								    type:"info"
								
								});
							break;
						}else{
							 DOM.val('#J_TotalPromoItems',totalNum);
						}
		                var id = checkBoxs[i].value;
		                var title = H.util.strProcess(DOM.val(DOM.get('#J_ItemTitle_'+id)));
		   				var picUrl = DOM.val(DOM.get('#J_ItemPic_'+id));
		   				var price = DOM.val(DOM.get('#J_ItemPrice_'+id));
		   				var outerId = H.util.strProcess(DOM.val(DOM.get('#J_ItemOuterId_'+id)));
		   				o = '{"id":"' + id + '", "title":"' + title + '", "price":"' + price + '", "pic_url":"' + picUrl +'", "outer_id":"' + outerId +'"}';
		               	o = eval('(' + o + ')');
		               	json.push(o);
		   			}
		        }
				if(json.length == 0){
						promotionControl.addAfter();
		 				new H.widget.msgBox({
									    title:"错误提示",
									    content:'未选宝贝！',
									    type:"error",
										autoClose:true,
										timeOut :2000
									
									});
					
					return;
				}
				
		        var itemsJson = KISSY.JSON.stringify(json);
		        //alert(itemsJson);return false;
		        var submitHandle = function(o) {
		        		promotionControl.addAfter();
					
			           	len = checkBoxs.length;
						for(i=0; i<len; i++){
							var j = false;
							if(iid!=undefined){
								if(checkBoxs[i].value == id && !checkBoxs[i].disabled)
									j = true;
							}else{	 
								if(checkBoxs[i].checked && !checkBoxs[i].disabled)
									j = true;	
							}
							if(j == true){
								checkBoxs[i].disabled = 'disabled';
								DOM.html(DOM.get('#J_add'+checkBoxs[i].value),'<span>已排除出活动</span>');
							}
						}
		   	    };
		   	    var errorHandle = function(o) {
					promotionControl.addAfter();
					new H.widget.msgBox({
						    title:"错误提示",
						    content:o.desc,
						    type:"error"
						});
		       	};
		    	var data = "pid="+pid+"&items="+itemsJson+"&form_key="+FORM_KEY;
		   	    new H.widget.asyncRequest().setURI(addItemsToPromotionUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			},
			
			renderItems: function(c) {
		   	    DOM.html(DOM.get("#J_TbItemList"), c,true);
		   	 	var oTriggers = DOM.query('#J_TbItemList .J_CheckBox');
		     	Event.on(oTriggers, "click", function(){
		     		var id = this.value;
		     		if(!this.checked){
						DOM.attr('#J_TopCheckAll','checked',false);
						DOM.attr('#J_CheckAll','checked',false);
					}
					var operation = DOM.get('#J_Operation_'+id);
					if (DOM.hasClass(operation, 'ks-hidden')) {
						DOM.removeClass(operation, 'ks-hidden');
					} else {
						DOM.addClass(operation, 'ks-hidden');
					}
		        });
		   	    //@todo ...
			},
		
			checkAll : function(e) {
				checkBoxs = DOM.query('#J_TbItemList .J_CheckBox');
				len = checkBoxs.length;
				for(i=0; i<len; i++){
					var iid = checkBoxs[i].value;
					if(checkBoxs[i].disabled) continue;
					if(this.checked){
						checkBoxs[i].checked = true;
						DOM.removeClass(DOM.get('#J_Operation_'+iid), 'ks-hidden');
					} else {
						checkBoxs[i].checked = false;
						DOM.addClass(DOM.get('#J_Operation_'+iid), 'ks-hidden');
					}
				}
			},
		
			rightCheckAll : function(e) {
				checkBoxs = DOM.query('#J_PromotionItemList .J_CheckBox');
				len = checkBoxs.length;
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
			
			handlePagination : function(turnTo) {
		    	pageId = turnTo;
		   		var submitHandle = function(o) {
		   			DOM.get("#J_CheckAll").checked = false;
		   			promotionControl.paginator.setPage(pageId).printHtml('#J_Paging',2);
		   			promotionControl.paginator.setPage(pageId).printHtml('#J_TopPaging',3);
		       	    promotionControl.renderItems(o.payload.body);
		       	 	DOM.hide('#J_LeftLoading');
					DOM.show('#J_MainLeftContent');
		    	};
		    	 if(DOM.val(DOM.get("#J_SearchTitle")) != '输入关键字,商品ID,商家编码'){
		 	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle"))); //标题
		 	    }else{
		 	    	var title ='';
		 	    }
		         var cid = DOM.val(DOM.get("#J_SelectItemCid")); //类目
			    	var type = DOM.val(DOM.get("#J_SearchSelling")); //出售中 库中
			    	var itemOrder = DOM.val(DOM.get("#J_SelectItemOrder"));//排序方式
			    	var itemPage = DOM.val(DOM.get("#J_SelectItemPage"));//每页多少条
			    	var data = "q="+title+"&cid="+cid+"&type="+type;
		     	    data +="&itemOrder="+itemOrder+"&pageSize="+itemPage;
						data +="&pid="+pid+"&page_id="+pageId;
			    	if (type == 0) {
						//价格区间
						var startPrice = DOM.val(DOM.get("#J_StartPrice"));
						var endPrice = DOM.val(DOM.get("#J_EndPrice"));
						data += "&start_price="+startPrice+"&end_price="+endPrice;
					}
		        //alert(data);
		        DOM.show('#J_LeftLoading');
				DOM.hide('#J_MainLeftContent');
		   	    new H.widget.asyncRequest().setURI(getItemsFromTbUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
		
			//搜索活动中宝贝
		   	loadRange :function() {
		    	var submitHandle = function(o) {
		       	    totalRecords = o.payload.totalRecords;
		       	 	if(totalRecords > 0){
						DOM.css(DOM.get('#J_REmpty') ,'display','none');
						DOM.css(DOM.query(".J_PromotionItemBtnHolder") ,'display' , '');
					} else {
						DOM.css(DOM.get('#J_REmpty'), 'display' , '');
						DOM.css(DOM.query(".J_PromotionItemBtnHolder") , 'display' , 'none');
					}
		       	    DOM.html(DOM.get("#J_PromotionItemList"), o.payload.body);
		       	 	var oTriggers = DOM.query('#J_PromotionItemList .J_CheckBox');
		         	Event.on(oTriggers, "click", function(ev){
						if(!this.checked){
							DOM.attr('#J_RightCheckAll','checked',false);
						}
					});
		         	DOM.hide('#J_RightLoading');
					DOM.show('#J_MainRightContent');
			   	    
		       	 	pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
		       	    
					promotionControl.promotionItemPaginator = new showPages('promotionControl.promotionItemPaginator').setRender(promotionControl.promotionItemPaginationHandle).setPageCount(pageCount).printHtml('#J_PromotionItemPaging',2);
					
		    	};
		    	 if(DOM.val(DOM.get("#J_RightSearchTitle")) != '输入关键字,商品ID,商家编码'){
		 	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_RightSearchTitle"))); //标题
		 	    }else{
		 	    	var title ='';
		 	    }
		 	    var status = DOM.val(DOM.get('#J_RightSearchStatus'));
		 	    var itemPage = DOM.val(DOM.get("#J_RightSelectItemPage"));//每页多少条
		 	    var data = "promo_id="+promotionId+"&status="+status+"&q="+title+"&pageSize="+itemPage;
		   	    //alert(data);
		 	 	DOM.show('#J_RightLoading');
				DOM.hide('#J_MainRightContent');
		   	    
		   	    new H.widget.asyncRequest().setURI(loadPromotionItemsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
		
			removePromotionRangeHandle : function(ev,single) {
				if(!showPermissions('editor_promotion',"编辑促销活动")){
		   			return ;
		   		 }
				ev.preventDefault();
				DOM.attr('#J_RemovePromotionItems','disabled',true);
				DOM.replaceClass('#J_RemovePromotionItems','btm-caozuo-orange','btm-caozuo-gray-none');
				itemIds = [];
				if(single == true){
					var itemid = DOM.attr(ev.target,'id');
					var pidi = DOM.attr(ev.target,'data');
					itemIds.push(itemid);
				}else{
					checkBoxs = DOM.query("#J_PromotionItemList .J_CheckBox");
					len = checkBoxs.length;
					for(i=0; i<len; i++){
		                   if(checkBoxs[i].checked && !checkBoxs[i].disabled){
		                   	itemIds.push(checkBoxs[i].value);
		                   }
					}
				}
				if(itemIds.length == 0){
								new H.widget.msgBox({
									    title:"错误提示",
									    content:'未选宝贝！',
									    type:"error",
										autoClose:true,
										timeOut :2000
									
									});
							DOM.attr('#J_RemovePromotionItems','disabled',false);
							DOM.replaceClass('#J_RemovePromotionItems','btm-caozuo-gray-none','btm-caozuo-orange');
							return ;
						}
				var submitHandle = function(o) {
					if(single == true){
						DOM.css(DOM.prev(DOM.get('#J_removeItem'+itemid+pidi)),'display','none');
						DOM.css(DOM.get('#J_removeItem'+itemid+pidi),'display','');
					}else{
						DOM.attr('#J_RemovePromotionItems','disabled',false);
						DOM.replaceClass('#J_RemovePromotionItems','btm-caozuo-gray-none','btm-caozuo-orange');
					}
					if(promotionControl.paginator){
						promotionControl.promotionItemPaginator.toPage(promotionControl.promotionItemPaginator.page);
					}else{
						promotionControl.loadRange();
					}
		   	    };
		   	    var data = "pid="+pid+"&item_ids="+itemIds+"&form_key="+FORM_KEY;
		   	   
		   	    new H.widget.asyncRequest().setURI(removePromotionItemUrl).setMethod("POST").setHandle(submitHandle).setData(data).send();
			},
		
			promotionItemPaginationHandle : function(turnTo) {
				pageId = turnTo;
				var submitHandle = function(o) {
		    		if (DOM.get("#J_RightCheckAll") != null){
						DOM.get("#J_RightCheckAll").checked = false;
		    		}
		    		if(totalRecords > 0){
						DOM.css(DOM.get('#J_REmpty') ,'display','none');
						DOM.css(DOM.query(".J_PromotionItemBtnHolder") ,'display' , '');
					} else {
						DOM.css(DOM.get('#J_REmpty'), 'display' , '');
						DOM.css(DOM.query(".J_PromotionItemBtnHolder") , 'display' , 'none');
					}
					promotionControl.promotionItemPaginator.setPage(pageId).printHtml('#J_PromotionItemPaging',2);
					DOM.html(DOM.get("#J_PromotionItemList"), o.payload.body);
					var oTriggers = DOM.query('#J_PromotionItemList .J_CheckBox');
		         	Event.on(oTriggers, "click", function(ev){
						if(!this.checked){
							DOM.attr('#J_RightCheckAll','checked',false);
						}
					});
		         	DOM.hide('#J_RightLoading');
					DOM.show('#J_MainRightContent');
			   	    
		    	};
		    	DOM.show('#J_RightLoading');
				DOM.hide('#J_MainRightContent');
		   	    
		    	 if(DOM.val(DOM.get("#J_RightSearchTitle")) != '输入关键字,商品ID,商家编码'){
		 	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_RightSearchTitle"))); //标题
		 	    }else{
		 	    	var title ='';
		 	    }
		     	 var itemPage = DOM.val(DOM.get("#J_RightSelectItemPage"));//每页多少条
		     	 var status = DOM.val(DOM.get('#J_RightSearchStatus'));
		     	 var data = "promo_id="+promotionId+"&status="+status+"&title="+title+"&page_id="+pageId+"&pageSize="+itemPage;
			    //alert(data);
			    new H.widget.asyncRequest().setURI(loadPromotionItemsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			}
			  

		}
}, {
    requires: ['utils/showPages/index']
});
