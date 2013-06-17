/*
combined files : 

utils/showPages/index
page/remind-init

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
KISSY.add('page/remind-init',function (S,showPages,O) {
    // your code here
	var DOM = S.DOM, Event = S.Event;	
	
	return remind = {
	    	paginator : null,
	    	msg :null,
	    	panel:null,
	    	isFisrst : true,
	    	init : function() {
                if(!remind.panel){
                    remind.panel = new O.Dialog({
                        width: 370,
                        headerContent: '提醒手机',
                        bodyContent: '<div style="padding:30px 0;"><ul><li class="min-height-30"><span class="fl color-red" style="margin-left:20px;_display: inline;">测试会消耗一条短信</span></li><li class="min-height-40"><div class="active-add-edit-title w-80">提醒手机：</div><div class="active-add-edit-edit w-180"><input id="J_MobileText" type="text" value="" class="input-text w-200"></div></li><li class="min-height-40"><div class="active-add-edit-title w-80">提醒方式：</div><div class="active-add-edit-edit w-200">短信少于&nbsp;&nbsp;<input id="J_remindNum" value="" type="text" class="input-text w-70">&nbsp;&nbsp;条提醒我</div></li><li><div class="ui-msg" style="display: none; width:300px; margin: 15px auto;" id="J_ParamsErrorBox"><div class="error-msg"><div class="img-16-1"></div><div class="text-16 color-red" id="J_ParamsErrorMsg"></div></div></div><div class="ui-msg" style="display: none;width:300px;margin: 15px auto;" id="J_ParamsSucessBox"><div class="success-msg"><div class="img-16-6"></div><div class="text-16" id="J_ParamsSucessMsg"></div></div></div></li><li class="min-height-40"><div style="width:160px;_width:170px;" class="btm-content m-auto"><input name="" type="button" value="确定" class="btm-68-orange fl" id="J_determine"/><input type="button" value="测试" class="btm-68-gray fl" id="J_test" /></div></li></ul></div>',
                        mask: false,
                        align: {
                            points: ['cc', 'cc']
                        },
                        closable :true,
                        draggable: true,
                        aria:true
                    }); 
                };
				Event.on("#J_remind", "click", function(){
					remind.panel.show();
					remind.getData();
					Event.remove('#J_determine');
					Event.remove('#J_test');
					Event.on('#J_determine','click',function(ev){
						var phoneNum = DOM.val('#J_phoneNum');
						var MobileText = DOM.val('#J_MobileText');
						var remindNum = DOM.val('#J_remindNum');
						var noteNum = DOM.val('#J_noteNum');
			    	    if(phoneNum == MobileText && remindNum == noteNum){
			    	        remind.panel.hide();
			    	    }else{
			    	    	remind.determine();
			    	    };
					});
					Event.on('#J_test','click',function(ev){
						remind.remindTest();
					});
				});
	        },

	        getData : function(){
	        	var submitHandle = function(o) {
        	    	DOM.val('#J_MobileText',o.payload.mobile);
        	    	DOM.val('#J_noteNum',o.payload.sms_remind);
        	    	DOM.val('#J_remindNum',o.payload.sms_remind);
        	    	DOM.val('#J_phoneNum',o.payload.mobile);
        	    };
        	    new H.widget.asyncRequest().setURI(getRemindInfoUrl).setMethod("GET").setHandle(submitHandle).setData(null).setDataType('json').send();
	        },

	        determine : function(){
	        	var mobile = DOM.val('#J_MobileText');
	        	var sms_remind = DOM.val('#J_remindNum');
	        	var ParamsErrorBox = KISSY.one('#J_ParamsErrorBox');
	        	var ParamsSucessBox = KISSY.one('#J_ParamsSucessBox');
	            var submitHandle = function(o) {
                    new H.widget.msgBox({
                        type: "sucess",
                        content: o.payload,
                        dialogType:"msg",
                        autoClose:true,
                        timeOut:3000,
                    });
                    remind.panel.hide();
	    	    };
	    	    var errorHandle = function(o){
	    	    	DOM.html('#J_ParamsErrorMsg',o.desc);
					if (ParamsErrorBox.css("display")==="none"){
						ParamsErrorBox.slideDown();
					}
					return;
	    	    };
	    	    data = 'mobile='+mobile+'&sms_remind='+sms_remind;
				new H.widget.asyncRequest().setURI(saveRemindInfoUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
	        },
            
	           remindTest : function(){
	                var ParamsErrorBox = KISSY.one('#J_ParamsErrorBox');
	                var ParamsSucessBox = KISSY.one('#J_ParamsSucessBox');
	                var submitHandle = function(o) {
	                    new H.widget.msgBox({
	                        type: "sucess",
	                        content: o.payload,
	                        dialogType:"msg",
	                        autoClose:true,
	                        timeOut:3000,
	                    });
	                    remind.panel.hide();
	                };
	                var errorHandle = function(o){                          
	                    DOM.html('#J_ParamsErrorMsg',o.desc);
	                    if (ParamsErrorBox.css("display")==="none") {
	                        ParamsErrorBox.slideDown();
	                    }
	                    return ;
	                };
	                var mobile = DOM.val('#J_MobileText');
	                var data = "mobile="+mobile;
	                new H.widget.asyncRequest().setURI(testRemindInfoUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
	            },
	            //修改店铺标题
	            updateShopTitle : function(){
	                 var submitHandle = function(o) {
                         DOM.html('#J_ShopNick',o.desc);
                         new H.widget.msgBox({ 
                             type: "sucess", 
                             content: "更新成功",
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
	                 var data = "";
	                 new H.widget.asyncRequest().setURI(updateShopTitleUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
	             }
	}
}, {
    requires: ['utils/showPages/index','overlay']
});
