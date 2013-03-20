/*
combined files : 

utils/showPages/index
page/rebaseprop-init

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
/***
 * 
 * 批量改属性 item js
 * 
 * **/
KISSY.add('page/rebaseprop-init',function(S,showPages){
		var S = KISSY,DOM = S.DOM, Event = S.Event;	
		return rebaseprop = {
	    	paginator : null,
	    	panel : null,
	    	msg : null,
			checkBoxs : null,  	
	    	init : function() {	
			
				rebaseprop.searchTbItems();	
				Event.on('#J_SelectItemCid',"change",function(S){
					rebaseprop.searchTbItems();
				})
				Event.on('#J_SearchBtn','click',rebaseprop.searchTbItems); //活动中宝贝全选   	 
			    Event.on('#J_TCheckAll','click',rebaseprop.CheckAll); //活动中宝贝全选   	    
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
					rebaseprop.paginator = new showPages('rebaseprop.paginator').setRender(rebaseprop.handlePagination).setPageCount(pageCount).printHtml('#J_BottomPaging',2);
					rebaseprop.paginator.printHtml('#J_TopPaging',3);
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
						rebaseprop.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_BottomPaging',2);
						rebaseprop.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_TopPaging',3);
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
				if(!rebaseprop.checkBoxs){
					var checkBoxs = DOM.query('#J_PromotionItemList .J_CheckBox');
				}else{
					var checkBoxs = rebaseprop.checkBoxs;
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
			//点击显示基本属性
			showContent : function(flag){
				DOM.toggle('#J_'+flag+'_Content');
				selectBaseprop = DOM.prop('#J_BasepropSelect','title');
				if(flag === 'FreightBear' && !DOM.prop('#J_FreightBear','checked')){
					DOM.prop('#J_FreightBear_Seller','checked',true);
					rebaseprop.freightBearSeller();
				}
				if(DOM.attr('#J_'+flag,'checked')){
					selectBaseprop += flag + ',';
   					DOM.prop('#J_BasepropSelect','title',selectBaseprop);
   					DOM.css('#J_PreviewBtm','display','');
   				} else {   					
   					var reg1 = new RegExp(flag+",","g");
   					selectBaseprop = selectBaseprop.replace(reg1,'');
   					DOM.prop('#J_BasepropSelect','title',selectBaseprop);
   					var inputs = DOM.query('#J_ChooseBasepropOption input');
   					var selectFlag = true;
   					for(var i=0;i<inputs.length;i++){
   						if(inputs[i].checked){
   							selectFlag = false;
   						}
   					}
   					if(selectFlag){
   						DOM.css('#J_PreviewBtm','display','none');
   					}
   				}
			},
			//卖家承担运费
			freightBearSeller : function(){
				DOM.prop('#J_ExpressTemplate','checked',false);
				DOM.css('#J_ExpressTemplate_Content','display','none');
				DOM.prop('#J_DeliveryCosts','checked',false);
				DOM.css('#J_DeliveryCosts_Content','display','none');
				var reg2 = new RegExp("ExpressTemplate,DeliveryCosts","g");
				selectBaseprop = selectBaseprop.replace(reg2,'');
				DOM.prop('#J_BasepropSelect','title',selectBaseprop);
			},
			//买家承担运费
			freightBearBuyer : function(){
				DOM.prop('#J_ExpressTemplate','checked',true);
				DOM.css('#J_ExpressTemplate_Content','display','');
				DOM.prop('#J_DeliveryCosts','checked',true);
				DOM.css('#J_DeliveryCosts_Content','display','');
				selectBaseprop += 'ExpressTemplate,DeliveryCosts';
				DOM.prop('#J_BasepropSelect','title',selectBaseprop);
			},
			//伪预览功能
			previewBaseprop : function(){
				new H.widget.msgBox({ type: "error",
		            content: "系统正在处理中",
					dialogType:"loading",
					autoClose:true,
					timeOut:3000
		           
		        });
			},
			//原基本信息——详情——弹窗
			basepropDetail : function(id){
				if(!showPermissions('editor_tool','工具箱')){return ;}
				if(isVersionPer('tool')){return ;}	
				var selectBaseprop = DOM.prop('#J_BasepropSelect','title');
				var shen = DOM.val('#a1');
				var shi = DOM.val('#a2');
//				var selectProvince = DOM.get("#a1").options[DOM.get("#a1").selectedIndex].text;
//				var selectCity = DOM.get("#a2").options[DOM.get("#a2").selectedIndex].text;
				if(selectBaseprop == ''){
					new H.widget.msgBox({
		                content: "请选择需要查看的基本属性",
		                type: "error"    
		            });
					return;
				}
//				if(selectProvince == '' || selectCity == ''){
//					selectProvince = '北京';
//					selectCity = '北京市';
//				}
				var json = [];
//				var o = '{"id":"' + id + '", "selectBaseprop":"' + selectBaseprop + '","selectProvince":"' + selectProvince + '","selectCity":"' + selectCity + '"}';
				var o = '{"id":"' + id + rebaseprop.getO() + '"}';
				o = eval('(' + o + ')');						
				json.push(o);
				var itemsJson = KISSY.JSON.stringify(json);
				var data = "items="+itemsJson+"&form_key="+FORM_KEY;
                var submitHandle = function(o) {
        	    	DOM.html('#J_PopDetial_'+id,o.desc);
        	    };
        	    var errorHandle = function(o){
        	    	new H.widget.msgBox({
					    title:"错误提示",
					    content:o.desc,
					    type:"error"
					});	
        	    };
				if(!DOM.prop('#J_BasepropDetial_'+id,'visible')){
					DOM.css('#J_BasepropDetial_'+id,'visibility','visible');
				}
				new H.widget.asyncRequest().setURI(getProtoBasepropDetailUrl).setMethod("POST").setForm('#J_Rebaseprop_Form').setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
				
			},
			//关闭详情弹窗
			closeDetialPop : function(id){
				DOM.css('#J_BasepropDetial_'+id,'visibility','hidden');
			},
			//查看现基本信息——弹窗
			viewBaseprop : function(id){
				if(!showPermissions('editor_tool','工具箱')){return ;}
				if(isVersionPer('tool')){return ;}	
				var selectBaseprop = DOM.prop('#J_BasepropSelect','title');
				if(selectBaseprop == ''){
					new H.widget.msgBox({
		                content: "请选择需要查看的基本属性",
		                type: "error"    
		            });
					return;
				}
				var json = [];
//				var o = '{"id":"' + id + '", "selectBaseprop":"' + selectBaseprop + '","selectProvince":"' + selectProvince + '","selectCity":"' + selectCity + '"}';
				var o = '{"id":"' + id + rebaseprop.getO() + '"}';
				o = eval('(' + o + ')');						
				json.push(o);
				var itemsJson = KISSY.JSON.stringify(json);
				var data = "items="+itemsJson+"&form_key="+FORM_KEY;
                var submitHandle = function(o) {
        	    	DOM.html('#J_PopView_'+id,o.desc);
        	    };
        	    var errorHandle = function(o){
        	    	new H.widget.msgBox({
					    title:"错误提示",
					    content:o.desc,
					    type:"error"
					});	
        	    };
				if(!DOM.prop('#J_ViewBaseprop_'+id,'visible')){
					DOM.css('#J_ViewBaseprop_'+id,'visibility','visible');
				}
				new H.widget.asyncRequest().setURI(getNewBasepropDetailUrl).setMethod("POST").setForm('#J_Rebaseprop_Form').setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
				
			},
			//关闭现基本信息弹窗
			closeViewPop : function(id){
				DOM.css('#J_ViewBaseprop_'+id,'visibility','hidden');
			},
			//还原基本属性
			revertBaseprop : function() {
				if(!rebaseprop.checkBoxs){
					var checkBoxs = DOM.query('#J_PromotionItemList .J_CheckBox');
				}else{
					var checkBoxs = rebaseprop.checkBoxs;
				}
				var len = checkBoxs.length;
				var m=0;
				for(i=0; i<len; i++){
					if(checkBoxs[i].checked){
						id = checkBoxs[i].value;
						var itemCats =DOM.html(DOM.get('#J_ProtoCats_'+id));
						DOM.html(DOM.get('#J_Cats_'+id), itemCats);
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
			},
			//上传基本属性
			updateBaseprop : function(id) {
				if(!showPermissions('editor_tool','工具箱')){return ;}
				if(isVersionPer('tool')){return ;}	
				var selectBaseprop = DOM.prop('#J_BasepropSelect','title');
				var itemTitle = H.util.strProcess(DOM.val(DOM.get('#J_ItemTitle_'+id)));
				var pic_url = DOM.val(DOM.get('#J_ItemPic_'+id));
				if(selectBaseprop == ''){
					new H.widget.msgBox({
		                content: "请选择需要查看的基本属性",
		                type: "error"  
		            });
					return;
				}
//				if((DOM.attr('#J_ExpressTemplate','checked') && DOM.val('#J_ExpressTemplate_select')==0) || (DOM.attr('#J_AfterSalesTemplate','checked') && DOM.val('#J_AfterSalesTemplate_select')==0) ||(DOM.attr('#J_PodTemplate','checked') && DOM.val('#J_PodTemplate_select')==0)){
//					rebaseprop.msg.setMsg('<div class="point relative"><div class="point-w-1">有模板未选取，请检查！</div></div>').showDialog();
//					return;
//				}
				var json = [];
//				var o = '{"id":"' + id + '","title":"'+itemTitle + '", "selectBaseprop":"' + selectBaseprop + '","selectProvince":"' + selectProvince + '","selectCity":"' + selectCity + '", "pic_url":"' + pic_url + '"}';
				var o = '{"id":"' + id + '","title":"'+itemTitle + rebaseprop.getO() + '", "pic_url":"' + pic_url + '"}';
				o = eval('(' + o + ')');						
				json.push(o);
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
        	    	new H.widget.msgBox({
					    title:"错误提示",
					    content:o.desc,
					    type:"error"
					});	
					return;
        	    };
				new H.widget.asyncRequest().setURI(updateBasepropUrl).setMethod("POST").setForm('#J_Rebaseprop_Form').setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			},
			//批量上传基本属性
			addSelectItemsUpdateBaseprop : function() {
				if(!showPermissions('editor_tool','工具箱')){return ;}
				if(isVersionPer('tool')){return ;}	
//				if(showToCouUpdateDialog()){return ;}
				if(!rebaseprop.checkBoxs){
					var checkBoxs = DOM.query('#J_PromotionItemList .J_CheckBox');
				}else{
					var checkBoxs = rebaseprop.checkBoxs;
				}
				rebaseprop.msg = new H.widget.msgBox({ type: "error",
		            content: "系统正在处理中",
					dialogType:"loading"
		           
		        });
				var selectBaseprop = DOM.prop('#J_BasepropSelect','title');
				if(selectBaseprop == ''){
					rebaseprop.msg.hide();
					new H.widget.msgBox({
		                title: "",
		                content: "请选择需要查看的基本属性",
		                type: "error"  
		            });
					return;
				}
				var len = checkBoxs.length;
				var m=0;
				var json = [];
				for(i=0; i<len; i++){
					if(checkBoxs[i].checked && !checkBoxs[i].disabled){
						id = checkBoxs[i].value;
						var itemTitle = H.util.strProcess(DOM.val(DOM.get('#J_ItemTitle_'+id)));
						var pic_url = DOM.val(DOM.get('#J_ItemPic_'+id));
						var o = '{"id":"' + id + '","title":"'+itemTitle + rebaseprop.getO() + '", "pic_url":"' + pic_url + '"}';
						o = eval('(' + o + ')');						
						json.push(o);
						m++;
					}
				}
				if(m == 0){
					rebaseprop.msg.hide();
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
							rebaseprop.msg.hide();
                	 		new H.widget.msgBox({ 
					 			type: "sucess", 
					 			content: "成功修改",
								dialogType:"msg", 
								autoClose:true, 
								timeOut:3000
							});
        	    };
        	    var errorHandle = function(o){
					rebaseprop.msg.hide();
        	    	new H.widget.msgBox({
							    title:"错误提示",
							    content:o.desc,
							    type:"error"
					});	
        	    };
        	    new H.widget.asyncRequest().setURI(updateBasepropUrl).setMethod("POST").setForm('#J_Rebaseprop_Form').setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			},
			getO : function(){
				var selectBaseprop = DOM.prop('#J_BasepropSelect','title');
				var o = '", "selectBaseprop":"' + selectBaseprop;
				var shen = DOM.val('#a1');
				var shi = DOM.val('#a2');
				if(shen == 0){
					o += '","selectProvince":"'+encodeURIComponent('请选择')+'","selectCity":"'+encodeURIComponent('请选择');
				}else if(shi ==0){
					o += '","selectProvince":"'+encodeURIComponent(window.link.data[''+shen+''][0])+'","selectCity":"'+encodeURIComponent('请选择');
				}else{
					o += '","selectProvince":"'+encodeURIComponent(window.link.data[''+shen+''][0])+'","selectCity":"'+encodeURIComponent(window.link.data[''+shi+''][0]);
				}
		        return o;  
	
			}		
    	};
},{ requires: ['utils/showPages/index']});
