/*
combined files : 

utils/showPages/index
page/ratesend-init

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
KISSY.add('page/ratesend-init',function (S,showPages) {
    // your code here
	var DOM = S.DOM, Event = S.Event;	
	
	return ratesendControl = {
			paginator : null,
	    	panel : null,
	    	msg : null,
	    	url : '',
	    	init : function(){
		
			if(htmlType == 'index'){
				ratesendControl.checkCpAgreement();
				Event.on('#J_sure','click',ratesendControl.open);
			}else{
				
				ratesendControl.searchTbItems();
			}
				
			},
			/*是否签订彩票协议*/
			checkCpAgreement : function(el){
				if(DOM.val('#J_IsSign') == 1){
					return ;
				}
			    var submitHandle = function(o) {
			    	if(o.payload.sign){
			    		DOM.val('#J_IsSign','1');
				    }else{
				    	
				    	ratesendControl.url = o.payload.sign_url;
						new H.widget.msgBox({
								    title:"签订协议",
								    content:'请先开通<a href="'+o.payload.sign_url+'" target="_blank">支付宝代购协议</a>',
								    type:"info",
								    buttons: [{ value: "ok" }],
								    success:function(result){
										if(result == 'ok'){
											var url = ratesendControl.url;
											window.open(url, '_blank');
										}
							
									}
								});
				    	DOM.val('#J_IsSign','0');
					}
			    };
			    var errorHandle = function(o){
			    	var ParamsErrorBox = KISSY.one('#J_ParamsErrorBox');
					DOM.html('#J_ParamsErrorMsg',o.desc);
					if (ParamsErrorBox.css("display")==="none") {
						ParamsErrorBox.slideDown();
					}
			 	};
			    var data ='';
			    new H.widget.asyncRequest().setURI(checkSignUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).setDataType('json').send();
			},
			open : function() {
		    	if(!showPermissions('editor_tool','工具箱')){return ;}
				if(isVersionPer('tool')){return ;}
				if(DOM.val('#J_IsSign') == 0){
					new H.widget.msgBox({
					    title:"签订协议",
					    content:'请先开通<a href="'+ratesendControl.url+'" target="_blank">支付宝代购协议</a>',
					    type:"info",
					    buttons: [{ value: "ok" }],
					    success:function(result){
							if(result == 'ok'){
								var url = ratesendControl.url;
								window.open(url, '_blank');
							}
				
						}
					});
					return ;
				}
				
				ParamsErrorBox = KISSY.one('#J_ParamsErrorBox');
				ParamsSucessBox = KISSY.one('#J_ParamsSucessBox');
				
		        var submitHandle = function(o) {
		        	ParamsErrorBox.hide();
		        	DOM.html('#J_ParamsSucessMsg',o.desc);
	    	    	if (ParamsSucessBox.css("display")==="none") {
	    	    		ParamsSucessBox.slideDown();
	    	    	};
	    	    	KISSY.later(function(){
	    	    		ParamsSucessBox.slideUp();
	        	    },3000,false)
			    };
			    var errorHandle = function(o){
			    	ParamsSucessBox.hide();
			    	DOM.html('#J_ParamsErrorMsg',o.desc);
	    	    	if (ParamsErrorBox.css("display")=== "none") {
	    	    		ParamsErrorBox.slideDown();
	    	    	};
	    	    	KISSY.later(function(){
	    	    		ParamsErrorBox.slideUp();
	        	    },3000,false)
					return;
			    };
			    if(DOM.get('#J_open').checked == true){
			    	var sureUrl = openUrl;
			    }else if(DOM.get('#J_closed').checked == true){
			    	var sureUrl = closeUrl;
			    }
		    	var lottery_type = DOM.val(DOM.get("#J_CpType"));
		    	var stake_count = DOM.val(DOM.get("#J_CpNum"));
		    	var lottery_content = DOM.val(DOM.get("#J_CareBox_0"));
		    	
		    	var data = "lottery_type="+lottery_type+"&stake_count="+stake_count+"&lottery=1"+"&lottery_content="+lottery_content;
			    new H.widget.asyncRequest().setURI(sureUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			},
			
			searchTbItems : function() {
			        var submitHandle = function(o) {
						DOM.hide('#J_LeftLoading');
						DOM.show('#J_MainLeftContent');
			    	    totalRecords = o.payload.totalRecords;
						DOM.css(DOM.get('#J_NoteIcon') ,'display','none');
						if(totalRecords > 0){
							DOM.css(DOM.get('#J_LEmpty') ,'display','none');
							DOM.css(DOM.query(".J_PromotionItemBtnHolder") ,'display' , '');
						} else {
							DOM.css(DOM.get('#J_LEmpty'), 'display' , '');
							DOM.css(DOM.query(".J_PromotionItemBtnHolder") , 'display' , 'none');
						}
						DOM.html('#J_StatList' ,o.payload.body);
						var pageCount = Math.ceil(totalRecords/o.payload.pageSize); 
						ratesendControl.paginator = new showPages('ratesendControl.paginator').setRender(ratesendControl.handlePagination).setPageCount(pageCount).printHtml('#J_StatPaging',2);
				    };
				    var data="";
					DOM.show('#J_LeftLoading');
					DOM.hide('#J_MainLeftContent');
				    new H.widget.asyncRequest().setURI(getSendTradeAjaxUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
				},
				handlePagination : function(turnTo) {
			    	pageId = turnTo;
					var submitHandle = function(o) {
						
						DOM.hide('#J_LeftLoading');
						DOM.show('#J_MainLeftContent');
			    	    totalRecords = o.payload.totalRecords;
						DOM.css(DOM.get('#J_NoteIcon') ,'display','none');
						if(totalRecords > 0){
							DOM.css(DOM.get('#J_LEmpty') ,'display','none');
							DOM.css(DOM.query(".J_PromotionItemBtnHolder") ,'display' , '');
						} else {
							DOM.css(DOM.get('#J_LEmpty'), 'display' , '');
							DOM.css(DOM.query(".J_PromotionItemBtnHolder") , 'display' , 'none');
						}
						DOM.html('#J_StatList' ,o.payload.body);
						var pageCount = Math.ceil(totalRecords/o.payload.pageSize); 
						ratesendControl.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_StatPaging',2);
			    	};
			    	var data="page_id="+pageId
			        DOM.show('#J_LeftLoading');
					DOM.hide('#J_MainLeftContent');
				    new H.widget.asyncRequest().setURI(getSendTradeAjaxUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
				},

				checkTitleLen : function(str ,id) {
					var len = str.replace(/[^\x00-\xff]/g,"*").length;
					DOM.html(DOM.get('#J_Notice_'+id), '');
					DOM.html(DOM.get('#J_Zs_'+id), "已经输入"+len+"字符");
				}
				
				
			}
}, {
    requires: ['utils/showPages/index']
});
