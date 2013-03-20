/*
combined files : 

utils/showPages/index
page/preview2-init

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
KISSY.add('page/preview2-init',function (S,showPages) {
    // your code here
	var DOM = S.DOM, Event = S.Event;	
	return	smartControl = {
			     isInit: false,
				 msg: null, 
				 msg1: null,
				 selectedPromoItemIds : eval('('+ selectedPromoItemIdsJson+')'),
				 pageNum : 5,
				 paginator : null,  		//推荐宝贝 分页
				 selectPaginator : null, //已推荐宝贝 分页
				 tmpLimitNum : tmpLimitNum,
				 searchPromoId : null,
			     init: function() {
			
			   	 	 if(DOM.hasClass('#body-html','w-1000')){
			   			smartControl.pageNum = 5;
				     }else{
				    	 smartControl.pageNum = 6;
					 }									
					smartControl.promoId = DOM.val("#J_PromoId")
					Event.on('#J_SearchBtn','click',smartControl.searchPromoItems);
					Event.on('#J_PreviewToggle','click',smartControl.toggle);
					
					 if(typeId == 200 && tmpLimitNum != 0){
						smartControl.searchPromoItems();
					 }else{
					 	if(smartControl.promoId != '0') {
				 			smartControl.searchPromoItems();
						}
					 }
					 if(smartControl.selectedPromoItemIds.length >0) {
					 	smartControl.preview();
					 }
					Event.delegate(document,'mouseenter mouseleave','.J_LookIt', function(ev) {
						if(ev.type == 'mouseenter'){
							
							DOM.addClass(ev.currentTarget, 'current');
							DOM.show(DOM.children(ev.currentTarget,'a'));
						}else{
							DOM.removeClass(ev.currentTarget, 'current');
							DOM.hide(DOM.children(ev.currentTarget,'a'));
						}
					})
					
					Event.delegate(document,'mouseenter mouseleave click','.J_TbItem', function(ev) {
				       if(ev.type == 'mouseenter'){
				         	DOM.addClass(ev.currentTarget,'mouseover');
				       }else if(ev.type == 'mouseleave'){
				         	DOM.removeClass(ev.currentTarget,'mouseover');
				       }else if(ev.type == 'click'){
				       		 var promo_item_id = ev.currentTarget.id.substr(9);
				       		 var item_pic = DOM.val('#J_TbItemPic_'+promo_item_id);
					         if(DOM.hasClass(ev.currentTarget,'selected')){
					         	smartControl.removeItem(promo_item_id);
					           	DOM.removeClass(ev.currentTarget,'selected');
					         }else{
						        if(smartControl.selectedPromoItemIds.length>=smartControl.tmpLimitNum){
									new H.widget.msgBox({
									    title:"错误提示",
									    content:'此模板最多支持'+smartControl.tmpLimitNum+'个宝贝！',
									    type:"error"
									});
									return;
							    }
					           	DOM.addClass(ev.currentTarget,'selected');
					           	smartControl.addPromoItem(promo_item_id,item_pic);
					         }
				       }
			     	})
			     },
			
				
				searchPromoItems : function() {
					if(smartControl.tmpLimitNum == 0){
						smartControl.selectedPromoItemIds.push(1);
						return '';
					}
			    	var submitHandle = function(o) {
			    		//alert(KISSY.JSON.stringify(o));
						smartControl.msg.hide(); 
				    	totalRecords = o.payload.totalRecords;
						if(totalRecords > 0){
							DOM.get("#J_PromoItemsPaging").style.display = '';
						} else {
							DOM.get("#J_PromoItemsPaging").style.display = 'none';
							DOM.html(DOM.get('#J_PromoItemsList'),'<div class="no-details"><div><span class="no-details-pic"></span><span class="prompt-1">暂无记录！</span></div></div>');
							return;
						}
						pageCount = Math.ceil(totalRecords/smartControl.pageNum); 
						if(typeId != 200){
							if(smartControl.searchPromoId != smartControl.promoId){
								DOM.html('#J_SelectedItems','');
								DOM.html('#J_PreviewDiv', '');
								smartControl.selectedPromoItemIds = [];
								DOM.hide('#J_SelectItems');
								DOM.hide('#J_Yulan');
								smartControl.promoId = smartControl.searchPromoId;
							}
							
						}
						smartControl.renderPromoItems(o.payload.items);
						var handlePagination = function(turnTo) {
						    	var pageId = turnTo;
					    		var submitHandle = function(o) {
									smartControl.msg.hide();
					    			totalRecords = o.payload.totalRecords;
					    			pageCount = Math.ceil(totalRecords/smartControl.pageNum); 
					        	    smartControl.renderPromoItems(o.payload.items);
					    	        smartControl.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_PromoItemsPaging',2);
					    			smartControl.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_TopPaging',3);
					    			
						    	};
						    	var searchTitle = encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle")));
						    	var promo_id = DOM.val("#J_PromoId");
					    	    var data = "promo_id="+promo_id+"&q="+searchTitle+"&type_id="+typeId+"&page_id="+pageId+"&page_size="+smartControl.pageNum;
					        	smartControl.msg = new H.widget.msgBox({
									    title:"",
										dialogType : 'loading',
									    content:'正在获取活动中宝贝，请稍候'	
									});
							
				    	    new H.widget.asyncRequest().setURI(getPromoItemsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
						}
						smartControl.paginator = new showPages('smartControl.paginator').setRender(handlePagination).setPageCount(pageCount).printHtml('#J_PromoItemsPaging',2);
						smartControl.paginator.printHtml('#J_TopPaging',3);
			    	};
			    	var errorHandle = function(o){
				    	smartControl.msg.hide();
						new H.widget.msgBox({
							    title:"错误提示",
							    content:o.desc,
							    type:"error",
								autoClose : true,
								timeOut : 3000
							});
				    };
				    var promo_id = DOM.val("#J_PromoId");
				    /*if(promoId=='0') {
					    alert('请先选择活动');
					    return ;
				    }*/
				    smartControl.searchPromoId = promo_id;
				    var searchTitle = encodeURIComponent(KISSY.trim(DOM.val(DOM.get("#J_SearchTitle"))));
				    var data = "promo_id="+promo_id+"&q="+searchTitle+"&type_id="+typeId+"&page_size="+smartControl.pageNum;
					smartControl.msg = new H.widget.msgBox({
								    title:"",
									dialogType : 'loading',
								    content:'正在获取活动中宝贝，请稍候'	
								});
								
			    	new H.widget.asyncRequest().setURI(getPromoItemsUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
				},
			
				//渲染宝贝
				renderPromoItems: function(items) {
					//alert('itemIds:'+smartControl.selectedPromoItemIds.join(','));
					var len = items.length;
					var els = '';
					//alert('itemIds:'+smartControl.selectedPromoItemIds.join(','));
					for (var i=0; i<len; i++) {
						
						if (S.inArray(items[i].promo_item_id,smartControl.selectedPromoItemIds)) {
							var hasSelected = 'selected'; 
						} else {
							var hasSelected = '';
						}
						els += 
						'<li class="J_ThinkIt w-172 J_TbItem '+hasSelected+' relative" id="J_TbItem_'+items[i].promo_item_id+'">'+
							'<input type="hidden" id="J_TbItemPic_'+items[i].promo_item_id+'" value="'+items[i].item_pic+'"/>'+
			                '<div class="baobei-img baobei-img-h-160">'+
			                    '<a target="_blank" href="#2" class="w-160">'+
			                        '<img border="0" width="120" height="120" src="'+items[i].item_pic+'_120x120.jpg"/>'+
			                    '</a>'+
			                '</div>'+
			                '<div class="baobei-text">'+
			                    '<a target="_blank" class="" href="http://item.taobao.com/item.htm?id='+items[i].item_id+'">'+
			                        '<span class="inline-block baobei-info">'+items[i].item_title+'</span>'+
			                    '</a>'+
			                    '<span class="fl inline-block w-150">￥<b class="color-red">'+items[i].item_price+'</b></span>'+
			                '</div>'+
			                '<div class="ol-base"></div><div class="ol-mouseover"><div class="border"><span class="ol-text-ext">点击选择</span></div></div><div class="ol-click"><div class="ol-img-checked"></div><span class="ol-text-ext">点击取消</span><br/><a href="http://item.taobao.com/item.htm?id='+items[i].item_id+'"target="_blank"><span class="ol-img-view"></span></a></div><div class="ol-uncheck"><span class="ol-text-ext">已加入活动<br/></span><a href="http://item.taobao.com/item.htm?id='+items[i].item_id+'"target="_blank"><span class="ol-img-view"></span></a></div>'
			            '</li>';
					}
					DOM.html(DOM.get('#J_PromoItemsList'),els);
					if(typeId == 200){
						if(!smartControl.isInit){
							Event.fire(DOM.get('.J_TbItem'),'click');
						}
					}
				},
			
				turn : function(el, promo_item_id,item_pic){
					if(DOM.attr(el, 'checked')=='checked' || DOM.attr(el, 'checked')==true){
						smartControl.addPromoItem(promo_item_id,item_pic);
					}else{
						smartControl.removeItem(promo_item_id);
					}
				},
					
				//出错了，换活动的时候上面的宝贝还显示呢
				addPromoItem : function(promo_item_id,item_pic) {
		
					smartControl.selectedPromoItemIds.push(promo_item_id);
					
					var nodeStr = '<li class="J_LookIt relative" id="J_SelectedItem_'+promo_item_id+'">'+
					        '<div class="baobei-img  pic pic-80">'+
					    	'<a class="w-80"  href="#"><img  border="0" src="'+item_pic+'_80x80.jpg"/></a>'+
					       	'</div>'+ 
					    	'<a id="J_Remove_'+promo_item_id+'" href="#2" class="iconDeletelink" onclick="smartControl.removeItem(\''+promo_item_id+'\')" style="display:none;"></a>'+                
							'</li>';
					var node = new S.Node(nodeStr)
				    DOM.append(node, '#J_SelectedItems');
				    DOM.addClass('#J_TbItem_'+promo_item_id,'selected');
					smartControl.preview();
				},
			    
			    removeItem : function(promo_item_id) {
					//alert(item_id);
					DOM.remove('#J_SelectedItem_'+promo_item_id);
					var index = S.indexOf(promo_item_id, smartControl.selectedPromoItemIds);
					smartControl.selectedPromoItemIds.splice(index,1);
					DOM.removeClass('#J_TbItem_'+promo_item_id,'selected');
					//DOM.attr('#J_PromoItem_'+item_id,'checked',false);
					smartControl.preview();
					//alert(smartControl.selectedPromoItemIds.length);
				},
			
				removeAllItems : function(promo_item_id) {
					var length = smartControl.selectedPromoItemIds.length;
					for(var i=0; i<length; i++){
						promo_item_id = smartControl.selectedPromoItemIds[i];
						DOM.remove('#J_SelectedItem_'+promo_item_id);
						DOM.removeClass('#J_TbItem_'+promo_item_id,'selected');
						//DOM.attr('#J_PromoItem_'+promo_item_id,'checked',false);
					}
					smartControl.selectedPromoItemIds = [];
					smartControl.preview();
				},
			
				toggle : function(el) {
					var listBox = S.one('#J_PreviewDiv');
					if (listBox.css("display")==="none") {
						listBox.slideDown(0.8,function(){
							DOM.removeClass('#J_ToggleC','current');
						});
					} else {
						listBox.slideUp(0.8,function(){
							DOM.addClass('#J_ToggleC','current');
						});
						
					}
				},
				
				preview : function() {
					if(smartControl.selectedPromoItemIds.length==0){
						DOM.hide('#J_SelectItems');
						DOM.hide('#J_Yulan');
						DOM.hide('#J_ToggleC');
						return;
					}else{
						DOM.show('#J_SelectItems');
						DOM.show('#J_Yulan');
						DOM.show('#J_ToggleC');
					}
			        var elem = this;
					smartControl.msg1 = new H.widget.msgBox({
								    title:"",
									dialogType : 'loading',
								    content:'正在获取模块信息, 请稍候...'	
								});
			        var success = function(data) {
			        	 if ( /^({")/i.test( data ) ) {
			                 var result = smartControl.parseJSON( data );
			                 //TS.util.Msg.val( result.message[0],  result.message[1] ); 
							 	new H.widget.msgBox({
							    title:"错误提示",
							    content:result.message[0],
							    type:"error",
								autoClose : true,
								timeOut : 3000
							});
			             } else {
			                 var text, 
									RE_SCRIPT = /<script([^>]*)>([\s\S]*?)<\/script>/ig, 
									html = data.replace(RE_SCRIPT, ''), //先去除模块内包含的脚本
									re_script = new RegExp(RE_SCRIPT);
									DOM.html('#J_PreviewDiv', data);
								
								while ( match = re_script.exec(data) ) {   //检查是否存在脚本
									if( (text = match[2]) && text.length > 0 ) {
										S.globalEval(text); 
									}
								}
			             }
						 smartControl.msg1.hide();
			        };
			        var failure = function() {
						smartControl.msg1.hide();
						new H.widget.msgBox({
							    title:"错误提示",
							    content:o.desc,
							    type:"error",
								autoClose : true,
								timeOut : 3000
							});
			        };
			        data = "templet_id="+templetId+"&type_id="+typeId+"&promo_id="+smartControl.promoId+"&promo_item_ids="+smartControl.selectedPromoItemIds.join(',');
			        new H.widget.asyncRequest().setURI(previewUrl).setMethod("GET").setHandle(success).setErrorHandle(failure).setDataType('html').setData(data).send();
			        
				},
			
				public : function() {
					if(isVersionPer('smart')){
							return ;
					}
					if(smartControl.selectedPromoItemIds.length==0){
						new H.widget.msgBox({
							    title:"错误提示",
							    content:'请先选择宝贝！',
							    type:"error",
								autoClose : true,
								timeOut : 3000
							});
						return;
					}
			        var elem = this;
					smartControl.msg = new H.widget.msgBox({
								    title:"",
									dialogType : 'loading',
								    content:'提交中, 请稍候...'	
								});
			        var success = function(o) {
				        	smartControl.msg.hide();
				        	//alert(o);
				        	o = smartControl.parseJSON(o);   
				           	if (o.payload.status == '0') {
									new H.widget.msgBox({
									    title:"错误提示",
									    content:'发布失败，请重试',
									    type:"error",
										autoClose : true,
										timeOut : 3000
									});
				               	return ;
				            }
			
							var successHtml = '<div style="width:98%;margin: auto;">'+
								'<ul class="ui-step ui-step-num3">'+
								'<div style="z-index: 502;" class="ui-step-item first"><div class="trigon"><span class="bor"></span><span style="_border:#ffffff" class="blo"></span></div></div>'+
								'<li style="z-index: 500;width:33%;" class="ui-step-item">1、选择模板<a href="'+prevUrl+'">修改</a><div class="trigon"><span class="bor"></span><span class="blo"></span></div></li>'+
								'<li style="z-index: 498;width:33%;" class="ui-step-item">2、设置预览<a href="'+previewSucessUrl+'">修改</a><div class="trigon"><span class="bor"></span><span class="blo"></span></div></li>'+
								'<li style="z-index: 496;width:33%;" class="ui-step-item current">3、发布<div class="trigon"><span class="bor"></span><span class="blo"></span></div></li>'+
								'</ul></div>'+
					    	'<div class="chajian-success background-FFF margin-top-17">'+
					        	'<div class="chajian-success-infor">'+
					            	' <div class="tubiao"><img src="http://img.huanleguang.com/hlg/v2/success-bg.jpg" /></div>'+	
					            	'<div class="wenzi">'+
					                	'<span class="wenzi-1">恭喜您发布成功!</span><br />'+
					                    '<span class="wenzi-2">您只需在店铺里添加对应模块就可以展示了</span><br />'+
					                    '<span class="wenzi-2">店铺设置步骤：1、进店铺装修  2、添加"促销助手"模块</span>'+  
					                '</div>'+
					            '</div>'+
					        '</div>';
							DOM.html('#J_ChajianContent',successHtml);
			        };
			        var failure = function() {
						smartControl.msg.hide();
			        	new H.widget.msgBox({
							    title:"错误提示",
							    content:o.desc,
							    type:"error",
								autoClose : true,
								timeOut : 3000
							});
			        };
			        var data = "templet_id="+templetId+"&type_id="+typeId+"&promo_id="+smartControl.promoId+"&promo_item_ids="+smartControl.selectedPromoItemIds.join(',');
			        //alert(data);
			        new H.widget.asyncRequest().setURI(publicUrl).setMethod("GET").setHandle(success).setErrorHandle(failure).setDataType('html').setData(data).send();
			        
				},
				parseJSON: function( s ) {
					try {
						var result = new Function('return' + s.replace(/[\n|\t|\r]/g, ''))();
					} catch(e) { 
						new H.widget.msgBox({
							    title:"错误提示",
							    content:'parse JSON error',
							    type:"error",
								autoClose : true,
								timeOut : 3000
							});
					}
					return result;
				}
	 	}
	
}, {
    requires: ['utils/showPages/index']
});
