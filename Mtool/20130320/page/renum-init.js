/*
combined files : 

utils/showPages/index
page/renum-init

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

KISSY.add('page/renum-init',function (S,showPages) {
    // your code here
	var DOM = S.DOM, Event = S.Event;	
	return renum = {
	    	paginator : null,
	    	panel : null,
	    	msg : null,
			checkBoxs : null,
			previewed : false,
			init : function() {	
				Event.on('#J_SelectItemCid',"change",function(S){
					renum.searchTbItems();
				});
				renum.searchTbItems();
				Event.on('#J_SearchBtn','click',renum.searchTbItems); //搜索宝贝 
			    Event.on('#J_TCheckAll','click',renum.CheckAll); //活动中宝贝全选   	    
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
		            Event.on(oTriggers, "click", function(ev){
						if(!this.checked){
							DOM.attr('#J_TCheckAll','checked',false);
							selectItemNum -=1;
						} else{
							selectItemNum +=1;
						}
						DOM.text('#J_SelectedItemNum',selectItemNum);
					});
					var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					renum.paginator = new showPages('renum.paginator').setRender(renum.handlePagination).setPageCount(pageCount).printHtml('#J_BottomPaging',2);
					renum.paginator.printHtml('#J_TopPaging',3);
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
					DOM.attr('#J_TCheckAll','checked',false);
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
					renum.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_BottomPaging',2);
					renum.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_TopPaging',3);
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
				if(!renum.checkBoxs){
					var checkBoxs = DOM.query('#J_PromotionItemList .J_CheckBox');
				}else{
					var checkBoxs = renum.checkBoxs;
				}
				var len = checkBoxs.length;
				if(e.currentTarget.checked){
					selectItemNum =len;
				} else {
					selectItemNum =0;
				}
				DOM.text('#J_SelectedItemNum',selectItemNum);
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
			changeType : function(type){
				DOM.val('#J_Type',type);
				if(type == 1){
					DOM.attr('#J_ChangeNum','checked',true);
				}else if(type == 2){
					DOM.attr('#J_AddNum','checked',true);
				}else if(type == 3){
					DOM.attr('#J_DelNum','checked',true);
				}
			},
			previewNum : function(){
				renum.previewed = true;
				renum.changeNum();
			},
			changeNum : function(){
				if(!renum.checkBoxs){
					var checkBoxs = DOM.query('#J_PromotionItemList .J_CheckBox');
				}else{
					var checkBoxs = renum.checkBoxs;
				}
				if(!DOM.attr('#J_ChangeNum','checked') && !DOM.attr('#J_AddNum','checked') && !DOM.attr('#J_DelNum','checked')){
					new H.widget.msgBox({
		                title: "",
		                content: "请选择代码修改方式！",
		                type: "error",
		                buttons: [{ value: "Ok"}],
						autoClose:true,
						timeOut :1000
		               
		            });
					return false;
				}
				if((DOM.attr('#J_ChangeNum','checked')&&DOM.val('#J_Direct_Num')=='')||(DOM.attr('#J_AddNum','checked')&&DOM.val('#J_Add_Num')=='')||(DOM.attr('#J_DelNum','checked')&&DOM.val('#J_Del_Num')=='')){
					new H.widget.msgBox({
		                title: "",
		                content: "已选项代码区域不能为空，请检查！",
		                type: "error",
		                buttons: [{ value: "Ok"}],
						autoClose:true,
						timeOut :1000
		                
		            });
					return false;
				}
				var directNum = Number(DOM.val(DOM.get('#J_Direct_Num')));
				var addNum = Number(DOM.val(DOM.get('#J_Add_Num')));
				var delNum = Number(DOM.val(DOM.get('#J_Del_Num')));
				var minNum = Number(DOM.val(DOM.get('#J_Min_Num')));
				var type = DOM.val(DOM.get('#J_Type'));
				var len = checkBoxs.length;
				var m=0;
				if(type == 1){
					for(var i=0; i<len; i++){
						if(checkBoxs[i].checked){
							id = checkBoxs[i].value;
							if (DOM.get('#J_ItemSkus_' + id) == null) {
								DOM.val(DOM.get('#J_new_item_num_'+id), directNum);
								renum.checkNumNotice(directNum,id,1);
								m++;
							}else{
								var origPriceEls = DOM.query('#J_SkuTable_'+id+' .J_SkuOrigNum');
								var promoPriceEls = DOM.query('#J_SkuTable_'+id+' .J_SkuPromoPrice');
								var slen = origPriceEls.length;
								for (var n=0; n<slen ;n++) {
				    				spp = Number(promoPriceEls[n].value);
				    				sop = Number(origPriceEls[n].value);
									promoPriceEls[n].value = directNum;
									m++;
								}
								renum.checkNumNotice(directNum,id,1);
							}	
							
							
						}
					}
				}
				if (type == 2) {
					for (var i = 0; i < len; i++) {
						if (checkBoxs[i].checked) {
							id = checkBoxs[i].value;
							if (DOM.get('#J_ItemSkus_' + id) == null) {
								var protoNum = Number(DOM.val(DOM.get('#J_ItemNum_' + id)));
								var num = protoNum + addNum;
								DOM.val(DOM.get('#J_new_item_num_' + id), num);
								renum.checkNumNotice(num, id,1);
								m++;
							}
							else {
								var origPriceEls = DOM.query('#J_SkuTable_' + id + ' .J_SkuOrigNum');
								var promoPriceEls = DOM.query('#J_SkuTable_' + id + ' .J_SkuPromoPrice');
								var slen = origPriceEls.length;
								for (var n= 0; n < slen; n++) {
									sop = Number(origPriceEls[n].value);
									spp = sop + addNum
									promoPriceEls[n].value = spp;
									if ((H.util.checkPrice(spp)[0] && spp!=0) || (spp > 999999 || spp < 0)) {
										DOM.html(DOM.get('#J_Notice_' + id), '亲，库存范围为0-999999！');
										DOM.addClass(promoPriceEls[n], 'text-error');
										DOM.replaceClass('#J_Opertion_' + id, 'J_Abled', 'J_DisAbled');
										DOM.attr('#J_check' + id, 'disabled', true);
										DOM.css('#J_Zs_' + id, 'display', 'none');
									}
									m++;
								}
							}
						}
					}
				}
				if(type == 3){
					for(var i=0; i<len; i++){
						if(checkBoxs[i].checked){
							id = checkBoxs[i].value;
							if (DOM.get('#J_ItemSkus_' + id) == null) {
								var protoNum = Number(DOM.val(DOM.get('#J_ItemNum_'+id)));
								var num = protoNum-delNum;
								if(!H.util.checkPrice(minNum)[0]){
								  num =	num > minNum ? num : minNum;
								} 
								num = num > 1 ? num : 1;
								DOM.val(DOM.get('#J_new_item_num_'+id), num);
								renum.checkNumNotice(num,id,1);
								m++;
							}else{
								var origPriceEls = DOM.query('#J_SkuTable_'+id+' .J_SkuOrigNum');
								var promoPriceEls = DOM.query('#J_SkuTable_'+id+' .J_SkuPromoPrice');
								var slen = origPriceEls.length;
								for (var n=0; n<slen ;n++) {
				    				sop = Number(origPriceEls[n].value);
									spp = sop-delNum
									
									if(!H.util.checkPrice(minNum)[0]){
									  spp =	spp > minNum ? spp : minNum;
									} 
									spp = spp > 1 ? spp : 1;
									promoPriceEls[n].value = spp;
									if((H.util.checkPrice(spp)[0] && spp!=0) || (spp > 999999 || spp < 0)){
										DOM.html(DOM.get('#J_Notice_'+id), '亲，库存范围为0-999999！');
										DOM.addClass(promoPriceEls[n], 'text-error');
										DOM.replaceClass('#J_Opertion_'+id,'J_Abled','J_DisAbled');
										DOM.attr('#J_check'+id,'disabled',true);
										DOM.css('#J_Zs_'+id,'display','none');
									}
									m++;
								}
							}
						}
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
				
				return false;
				}
				return true;
			},
			checkNumNotice : function(el ,id,type) {
				if(type == 1 ){
					var str = Number(el);	
				}else{
					var str = Number(el.value);	
				}
				if((H.util.checkPrice(str)[0] && str!=0) || (str > 999999 || str < 0)){
					DOM.html(DOM.get('#J_Notice_'+id), '亲，库存范围为0-999999！');
					DOM.addClass(el, 'text-error');
					DOM.replaceClass('#J_Opertion_'+id,'J_Abled','J_DisAbled');
					DOM.attr('#J_check'+id,'disabled',true);
					DOM.css('#J_Zs_'+id,'display','none');
					return ;
				}			
				DOM.html(DOM.get('#J_Notice_'+id), '');
				DOM.replaceClass('#J_Opertion_'+id,'J_DisAbled','J_Abled');
				DOM.attr('#J_check'+id,'disabled',false);
				DOM.css('#J_Zs_'+id,'display','none');
				DOM.removeClass(el, 'text-error');
			},
			//单个上传
			updateNum : function(id) {
				if(!showPermissions('editor_tool','工具箱')){return ;}
				if(isVersionPer('tool')){return ;}	
				DOM.attr('#J_check'+id,'checked',true);
				var r = renum.generalSpecParams(id);
				var itemTitle = H.util.strProcess(DOM.val(DOM.get('#J_ItemTitle_'+id)));
				var pic_url = DOM.val(DOM.get('#J_ItemPic_'+id));
				var	error = r[0];
				var params = r[1];
					paramsStr = ', "params":' + KISSY.JSON.stringify(params);
				var json = [];
				if (error === false) {
					var o = '{"id":"' + id + '"'+ paramsStr + ',"title":"'+itemTitle+ '", "pic_url":"' + pic_url+'"}';
					o = eval('(' + o + ')');
		        	json.push(o);
				}else{
					return ;
				}		
				var itemsJson = KISSY.JSON.stringify(json);
				var data = "items="+itemsJson+"&form_key="+FORM_KEY;	
		        var submitHandle = function(o) {
		        	  new H.widget.msgBox({ 
				 			type: "sucess", 
				 			content: "成功修改",
							dialogType:"msg", 
							autoClose:true, 
							timeOut:3000
						});
			    };
			    var errorHandle = function(o){
			    	renum.msg.hide();
					new H.widget.msgBox({
						    title:"错误提示",
						    content:o.desc,
						    type:"error"
						});	
					return;
			    };
				new H.widget.asyncRequest().setURI(updateTitleUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			},			
			//批量上传
			addSelectItemsUpdateNum : function() {
				if(!showPermissions('editor_tool','工具箱')){return ;}
				if(isVersionPer('tool')){return ;}	
				if(!renum.checkBoxs){
					var checkBoxs = DOM.query('#J_PromotionItemList .J_CheckBox');
				}else{
					var checkBoxs = renum.checkBoxs;
				}
		//		if(!DOM.attr('#J_ChangeNum','checked') && !DOM.attr('#J_AddNum','checked') && !DOM.attr('#J_DelNum','checked')){
		//			H.renum.msg.setMsg('<div class="point relative"><div class="point-w-1">请选择代码修改方式！</div></div>').showDialog();
		//			return;
		//		}
		//		if((DOM.attr('#J_ChangeNum','checked')&&DOM.val('#J_Direct_Num')=='')||(DOM.attr('#J_AddNum','checked')&&DOM.val('#J_Add_Num')=='')||(DOM.attr('#J_DelNum','checked')&&DOM.val('#J_Del_Num')=='')){
		//			H.renum.msg.setMsg('<div class="point relative"><div class="point-w-1">已选项代码区域不能为空，请检查！</div></div>').showDialog();
		//			return;
		//		}
				if(!renum.previewed){
					var flag = renum.changeNum();
					if(!flag){
						return ;
					}
				}
				renum.msg = new H.widget.msgBox({ type: "error",
	                content: "系统正在处理中",
	 				dialogType:"loading"
	            });
				var len = checkBoxs.length;
				var m=0;
				var json = [];
				for(i=0; i<len; i++){
					if(checkBoxs[i].checked && !checkBoxs[i].disabled){
						id = checkBoxs[i].value;
						var r = renum.generalSpecParams(id);
						var itemTitle = H.util.strProcess(DOM.val(DOM.get('#J_ItemTitle_'+id)));
						var pic_url = DOM.val(DOM.get('#J_ItemPic_'+id));
						var	error = r[0];
						var params = r[1];
							paramsStr = ', "params":' + KISSY.JSON.stringify(params);
						if (error === false) {
							var o = '{"id":"' + id + '"'+ paramsStr + ',"title":"'+itemTitle+ '", "pic_url":"' + pic_url+'"}';
							o = eval('(' + o + ')');
			            	json.push(o);
						}else{
							return ;
						}
						m++;
					}
				}
				if(m == 0){
					
					renum.msg.hide();
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
						DOM.attr('#J_TCheckAll','checked',false);
						renum.msg.hide();
		        	 	new H.widget.msgBox({ 
				 			type: "sucess", 
				 			content: "成功修改",
							dialogType:"msg", 
							autoClose:true, 
							timeOut:3000
						});
			    };
			    var errorHandle = function(o){
						renum.msg.hide();
			    		new H.widget.msgBox({
						    title:"错误提示",
						    content:o.desc,
						    type:"error"
						});	
					return;
			    };
				new H.widget.asyncRequest().setURI(updateTitleUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			},
			toggleSku : function(id) {
				var skuTable = DOM.get('#J_SkuTable_'+id);
				if (DOM.hasClass(skuTable, 'ks-hidden')) {
					DOM.removeClass(skuTable, 'ks-hidden');
				} else {
					DOM.addClass(skuTable, 'ks-hidden');
				}
				
			},
			generalSpecParams : function(id) {
				var r = [];
				var params = [];
				var error = false;
				if (DOM.get('#J_ItemSkus_'+id) == null) {
					var itemNum =  Number(DOM.val(DOM.get('#J_new_item_num_'+id)));
					if((H.util.checkPrice(itemNum)[0] && itemNum!=0) || (itemNum > 999999 || itemNum < 0)){
						DOM.html(DOM.get('#J_Notice_'+id), '亲，库存范围为0-999999！');
						DOM.addClass('#J_new_item_num_'+id, 'text-error');
						DOM.replaceClass('#J_Opertion_'+id,'J_Abled','J_DisAbled');
						DOM.attr('#J_check'+id,'disabled',true);
						DOM.css('#J_Zs_'+id,'display','none');
						error = true ;
					}		
					params.push(itemNum);
					r.push(error);
					r.push(params);
					return r;
				}else{
					var skusProperties = DOM.val(DOM.get('#J_ItemSkus_'+id));
					var skusPropName = DOM.val(DOM.get('#J_PropsName_'+id));
					var skusPropValue = DOM.val(DOM.get('#J_PropsValue_'+id));
		
					var skus = [];
					var skuOrigPrices = '';
					var skuPromoPrices = '';
					var origPriceEls = DOM.query('#J_SkuTable_'+id+' .J_SkuOrigNum');
					var promoPriceEls = DOM.query('#J_SkuTable_'+id+' .J_SkuPromoPrice');
					var len = origPriceEls.length;
					for (var i=0; i<len ;i++) {
						spp = Number(promoPriceEls[i].value);
						sop = Number(origPriceEls[i].value);
						if((H.util.checkPrice(spp)[0] && spp!=0) || (spp > 999999 || spp < 0)){
							DOM.html(DOM.get('#J_Notice_'+id), '亲，库存范围为0-999999！');
							DOM.addClass(promoPriceEls[i], 'text-error');
							DOM.replaceClass('#J_Opertion_'+id,'J_Abled','J_DisAbled');
							DOM.attr('#J_check'+id,'disabled',true);
							DOM.css('#J_Zs_'+id,'display','none');
							error = true ;
							r.push(error);
							r.push(params);
							return r;
						}
						skuPromoPrices += promoPriceEls[i].value + ',';
						skuOrigPrices += origPriceEls[i].value + ',';
					}
					skuOrigPrices = skuOrigPrices.substring(0, (skuOrigPrices.length-1));
					skuPromoPrices = skuPromoPrices.substring(0, (skuPromoPrices.length-1));
					skus.push(skuOrigPrices);
					skus.push(skuPromoPrices);
					skus.push(skusProperties);
					skus.push(skusPropName);
					skus.push(skusPropValue);
					params.push(skus);
					r.push(error);
					r.push(params);
					return r;
				}
				DOM.html(DOM.get('#J_Notice_'+id), '');
				DOM.replaceClass('#J_Opertion_'+id,'J_DisAbled','J_Abled');
				DOM.attr('#J_check'+id,'disabled',false);
				DOM.css('#J_Zs_'+id,'display','none');
				DOM.removeClass(el, 'text-error');
			}
};
},{
    requires: ['utils/showPages/index']
});
