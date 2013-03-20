/*
combined files : 

utils/showPages/index
page/config0-init

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
KISSY.add('page/config0-init',function (S,showPages) {
	
	var S= KISSY,DOM = S.DOM, Event = S.Event;
	return Care = {
	    	statPaginator : null,
	    	recordPaginator : null,
			chart : null,
			init: function(){
			Care.maxNum = DOM.val('#J_MaxNum');
			//修改
			Event.delegate(document, 'click', '.J_CareEdit', function(ev){
				var data = DOM.attr(ev.currentTarget, 'data');
				DOM.val('#J_Status', data);
				DOM.attr('#J_Checkbox_' + data, 'checked', true);
				var tem = DOM.html('#J_Templet_' + data);
				Care.checkTitleLen(tem);
				DOM.val('#J_CareBox', tem);
				DOM.show('#J_CareContent');
			});
			//删除
			Event.delegate(document, 'click', '.J_CareDel', function(ev){
				var data = DOM.attr(ev.currentTarget, 'data');
				DOM.hide('#J_CareContent');
				DOM.remove('#J_TempletBox_' + data);
			});
			//保存
			Event.delegate(document, 'click', '#J_CareSave', function(ev){
			
				var data = DOM.val('#J_Status');
				var tem = DOM.val('#J_CareBox');
				var Num = DOM.html('#J_Zs_Num');
				if(Num == 0){						
					DOM.show('#J_MsgErrorBox');
					DOM.hide('#J_Templet_' + data)
				}else{
					DOM.hide('#J_MsgErrorBox');
					
				}
				//==0 为新添加 其他为修改
				if (data != 0) {
					DOM.html('#J_Templet_' + data, tem);
					DOM.hide('#J_CareContent');
				}
				else if(Num != 0) {
					Care.maxNum = ++Care.maxNum;
					var d = Care.maxNum;
					var str = '<li class="clear J_TempletParames" id="J_TempletBox_' + d + '">' +
					' <input type="hidden" class="J_TempletId" value="0"><ul>' +
					'<li class="fl"><input type="radio" value="" class="J_CheckBox" name="range_type" id="J_Checkbox_' +d +'"></li>' +
					'<li class="fl w-370 pl10 J_Content" id="J_Templet_' +d +'">' +tem +
					'</li>' +
					'<li class="fr">' +
					'<a href="#2" class="J_CareEdit" data="' +d +'" >修改</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#2" class="J_CareDel" data="' +d +'">删除</a>' +
					'</li></ul></li>';
					DOM.insertBefore(DOM.create(str), '#J_CareContent');
					DOM.hide('#J_CareContent');
					DOM.attr('.J_CheckBox','checked','checked');
				}
			});
			
			Event.delegate(document, 'click', '.J_CareDel', function(ev){
				var CareAdd=DOM.query('.J_CareDel');
	
				if(CareAdd.length == 0){
					DOM.show('#J_CareContent');
					DOM.val('#J_CareBox', '');
					DOM.html(DOM.get('#J_Zs_Num'), 0);
					//ParamsSucessBox.hide();
				}else{
					
					DOM.hide('#J_CareContent');
				}
	
			});				
			//新添加
			Event.delegate(document, 'click', '.J_CareAdd', function(ev){
				DOM.val('#J_Status', 0);
				DOM.html(DOM.get('#J_Zs_Num'), 0);
				DOM.val('#J_CareBox', '');
				DOM.show('#J_CareContent');
			});
			//替换
			Event.delegate(document, 'click', '.J_AddReplace', function(ev){
				var tem = DOM.html(ev.currentTarget);
				var textarea = DOM.get('#J_CareBox')
				var pos = Care.getCursorPosition(textarea);
				Care.add(textarea,pos,tem);
				Care.checkTitleLen(DOM.val('#J_CareBox'));
			});
			
			Event.on( '#J_CarePublic','click', Care.save);
			
			
			
		},
		checkTitleLen: function(str){
			var len = str.replace(/[^\x00-\xff]/g, "*").length ;
			DOM.html(DOM.get('#J_Zs_Num'), len);
			
		},
		getCursorPosition: function(textarea){
			var rangeData = {
				text: "",
				start: 0,
				end: 0
			};
			textarea.focus();
			if (textarea.setSelectionRange) { // W3C
				rangeData.start = textarea.selectionStart;
				rangeData.end = textarea.selectionEnd;
				rangeData.text = (rangeData.start != rangeData.end) ? textarea.value.substring(rangeData.start, rangeData.end) : "";
			}
			else 
				if (document.selection) { // IE
					var i, oS = document.selection.createRange(),   // Don't: oR = textarea.createTextRange()
					oR = document.body.createTextRange();
					oR.moveToElementText(textarea);
					rangeData.text = oS.text;
					rangeData.bookmark = oS.getBookmark();
					// object.moveStart(sUnit [, iCount])
					// Return Value: Integer that returns the number of units moved.
					for (i = 0; oR.compareEndPoints('StartToStart', oS) < 0 && oS.moveStart("character", -1) !== 0; i++) {
						// Why? You can alert(textarea.value.length)
						if (textarea.value.charAt(i) == '\n') {
							i++;
						}
					}
					rangeData.start = i;
					rangeData.end = rangeData.text.length + rangeData.start;
				}
			return rangeData;
		},
		add: function (textarea, rangeData, text) {
			var oValue, nValue, oR, sR, nStart, nEnd, st;
			if (textarea.setSelectionRange) { // W3C
				oValue = textarea.value;
				nValue = oValue.substring(0, rangeData.start) + text + oValue.substring(rangeData.end);
				nStart = nEnd = rangeData.start + text.length;
				st = textarea.scrollTop;
				textarea.value = nValue;
				// Fixbug:
				// After textarea.values = nValue, scrollTop value to 0
				if(textarea.scrollTop != st) {
					textarea.scrollTop = st;
				}
				textarea.setSelectionRange(nStart, nEnd);
			} else if (textarea.createTextRange) { // IE
				sR = document.selection.createRange();
				sR.text = text;
				sR.setEndPoint('StartToEnd', sR);
				sR.select();
			}
		},
		save : function(){
			if(Care.checkParams()==false){
				return;
			}
			
			ParamsErrorBox = KISSY.one('#J_ParamsErrorBox');
			ParamsSucessBox = KISSY.one('#J_ParamsSucessBox');
			if('11'==careType || '13'==careType){
				var price = Number(DOM.val("#J_LowestPrice"));
				if (isNaN(Number(price)) == true || price< 0) {
					DOM.html('#J_ParamsErrorMsg','订单金额一定要大于0');
					if (ParamsErrorBox.css("display")==="none") {
						ParamsErrorBox.slideDown();
					}
					return ;
				}
			}
			var ruleForm = document.getElementById('J_RuleSet');
	  		var sucessHandle = function(o) {
	  			
	  			ParamsErrorBox.hide();
	 			DOM.html('#J_ParamsSucessMsg','设置成功');
				if (ParamsSucessBox.css("display")==="none") {
					ParamsSucessBox.slideDown();
				}
	  			DOM.val('#J_CareId',o.desc)
	 		};
	 		var errorHandle = function(o){
	 			ParamsSucessBox.hide();
	 			DOM.html('#J_ParamsErrorMsg',o.desc);
				if (ParamsErrorBox.css("display")==="none") {
					ParamsErrorBox.slideDown();
				}
				return ;
				DOM.hide('#J_CareContent');	
	 		};
	 		
	 		var postListParams = Care.generatePostTemple();
			var listParamsJson = KISSY.JSON.stringify(postListParams);
			var careId = DOM.val('#J_CareId');
			//var type = DOM.val('#J_Type');
			var shopLevel = DOM.val('#J_ShopLevel');
			var data = 'type='+careType+'&care_id='+careId+'&shop_level='+shopLevel+'&templets='+listParamsJson
			
			if('1'==careType || '12'==careType){ //催款、延迟发货
				var limitHour = DOM.val('#J_LimitHour');
	 			data += '&limit_hour='+limitHour
	 			if('1'==careType){
	 				data += '&limit_minute='+DOM.val('#J_LimitMinute')
	 			}
			}else{
				if('22'==careType || '32'==careType){ //生日 卡到期
					var limitDay = DOM.val('#J_LimitDay');
					data += '&limit_day='+limitDay
				}else{
					var limitMinute = DOM.val('#J_LimitMinute');
			 		data += '&limit_minute='+limitMinute
				}
			}
			if('32'==careType){ //延迟发货、生日
				var careTime = DOM.val('#J_CareTime');
				data += '&care_time='+careTime
			}
			
			if('11'==careType || '13'==careType){
				var lowestPrice = DOM.val('#J_LowestPrice');
				data += '&lowest_price='+lowestPrice
			}
			//alert(data);
	  	    new H.widget.asyncRequest().setURI(saveCareUrl).setMethod("POST").setHandle(sucessHandle).setErrorHandle(errorHandle).setData(data).send();
			return true;
			
		},
		generatePostTemple : function(){
			var postListParams =[];
			S.each(S.all('.J_TempletParames'),function(item, i){
				var listPar = {};
				listPar.is_checked = DOM.prop(DOM.get('.J_CheckBox', item),'checked')? 1:0;
				listPar.content = H.util.strProcess(DOM.html(DOM.get('.J_Content', item)));
				listPar.templet_id = DOM.val(DOM.get('.J_TempletId', item));
				listPar.is_sys_tmp = DOM.val(DOM.get('.J_IsSysTmp', item))
				postListParams.push(listPar);
			})
			return postListParams
		},
		checkParams : function(){
			return true;
		}
	}
   
}, {
    requires: ['utils/showPages/index']
});
