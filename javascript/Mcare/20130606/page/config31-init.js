/*
combined files : 

utils/showPages/index
page/config31-init

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
KISSY.add('page/config31-init',function (S,showPages) {
	
	var S= KISSY,DOM = S.DOM, Event = S.Event;
	return Care = {
			msg : null,
			rule_num : 0,
			ruleMsg :false,
			groupRule:[],
			ladders:[],
			groupRule_num : 0,
			leftRule : 0,
			
			init: function(){
				//替换
				Event.delegate(document, 'click', '.J_AddReplace', function(ev){
					var data = DOM.attr(ev.currentTarget, 'data');
					var tem = DOM.html(ev.currentTarget);
					var textarea = DOM.get('#J_CareBox'+data)
					var pos = Care.getCursorPosition(textarea);
					Care.add(textarea,pos,tem);
					Care.checkTitleLen(DOM.val('#J_CareBox'+data),data);
				});
				//修改
				Event.delegate(document, 'click', '.J_CareEdit', function(ev){
					var data = DOM.attr(ev.currentTarget, 'data');
					DOM.val('#J_Status', data);
					DOM.attr('#J_Checkbox_' + data, 'checked', true);
//					var tem = DOM.html('#J_Templet_' + data);
					var tem = DOM.val(DOM.siblings(DOM.parent(ev.currentTarget),'.J_Content'));
					var changeDate = DOM.val(DOM.siblings(DOM.parent(ev.currentTarget),'.J_StartDate'));
					DOM.val('#J_StartDate_change', changeDate);
					Care.myCalendar('J_StartDate_change',Care.groupRule_num);
					Care.checkTitleLen(tem,'Change');
					DOM.val('#J_CareBoxChange', tem);
					DOM.show('#J_CareContent');
//					DOM.hide('#J_Templet_' + data);
//					DOM.show(DOM.siblings(DOM.parent(ev.currentTarget),'.J_Content'));
				});
				//保存修改后内容
				Event.delegate(document, 'click', '#J_CareSave_change', function(ev){
					var data = DOM.val('#J_Status');
					var changeDate = DOM.val('#J_StartDate_change');
					var tem = DOM.val('#J_CareBoxChange');
					var changeContent = changeDate+" "+tem;
					var Num = DOM.html('#J_Zs_Num_Change');
					if(Num == 0){
						DOM.show('#J_MsgErrorBoxChange');
						return;
					}else{
						DOM.hide('#J_MsgErrorBoxChange');
					}
					//==0 为新添加 其他为修改
					if (data != 0) {
						DOM.html('#J_Templet_' + data, changeContent);
						DOM.val('#J_StartDate_' + data, changeDate);
						DOM.val('#J_Content_' + data, tem);
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
				//删除
				Event.delegate(document, 'click', '.J_CareDel', function(ev){
					var data = DOM.attr(ev.currentTarget, 'data');
					DOM.hide('#J_CareContent');
					DOM.remove('#J_TempletBox_' + data);
				});
				
				Event.delegate(document, 'click', '.J_CareSave', function(ev){
					var num = DOM.attr(ev.currentTarget, 'data');
					
					ParamsErrorBox = KISSY.one('#J_ParamsErrorBox');
					ParamsSucessBox = KISSY.one('#J_ParamsSucessBox');
					var Date = DOM.val('#J_StartDate'+num);
					//alert(Date);
					var Num = DOM.html('#J_Zs_Num'+num); 
					//alert(Num);
					if(Date == ''){
						DOM.html('#J_ParamsErrorMsg','时间不能为空');
						DOM.hide(ParamsSucessBox);
						if (ParamsErrorBox.css("display")==="none") {
							ParamsErrorBox.slideDown();														
							}							
					}else if(Num == 0){	
						DOM.html('#J_ParamsErrorMsg','短信内容不能为空');
						DOM.hide(ParamsSucessBox);
						if (ParamsErrorBox.css("display")==="none") {
							ParamsErrorBox.slideDown();														
						}
					}else if(Date != '' && Num != 0 ){
//						DOM.html('#J_ParamsSucessMsg','保存成功');
//						DOM.hide(ParamsErrorBox);
//						if (ParamsSucessBox.css("display")==="none") {
//							ParamsSucessBox.slideDown();														
//						}
						Care.groupMini(num);
						DOM.attr('#J_CheckBox_'+num,'checked', true);
						//DOM.remove('#J_Max_Group_'+num);
					}
				});
				
				Event.on( '#J_CarePublic','click', Care.save);	
				
				var ladderLevels = DOM.val('#J_laddEditNum');
				if(ladderLevels>0){
					Care.ladder_num =ladderLevels  ;
					Care.ladders = [];
					for(var n = 0;n<ladderLevels;n++){
						Care.ladders.push(n);
					}
				}
				
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
			checkTitleLen : function(str,num){
				var len = str.replace(/[^\x00-\xff]/g, "*").length ;
				if(num == 'Change'){
					DOM.html(DOM.get('#J_Zs_Num_Change'), len);
				} else{
					DOM.html(DOM.get('#J_Zs_Num'+num), len);
				}
				
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
			
			/*增加筛选条件*/
			addGroupRule : function(num){
				ParamsErrorBox = KISSY.one('#J_ParamsErrorBox');
				ParamsSucessBox = KISSY.one('#J_ParamsSucessBox');					
				var RuleNum = Care.groupRule.length;
				Care.leftRule--
		    	DOM.html('#J_LeftRule',Care.leftRule);
				Care.groupRule_num++;
				for(var n = 0; n<RuleNum; n++){
					Care.groupMini(Care.groupRule[n]);
				}
				Care.groupRule.push(Care.groupRule_num);
				var a= KISSY.Template(DOM.html(DOM.get('#J_Templet_Group')));
				var data = {num:Care.groupRule_num};
				var b =a.render(data);
				DOM.insertBefore(DOM.create(b),DOM.get('#J_msg'));
				Care.myCalendar('J_StartDate'+Care.groupRule_num,Care.groupRule_num);
				
				Care.ladders.push(Care.ladder_num);
				var a= KISSY.Template(DOM.html(DOM.get('#J_Group_'+num)));
				var data = {num:Care.ladder_num};
				var b =a.render(data);
				DOM.append(DOM.create(b),DOM.get('#J_listLadder'));
				var len = Care.ladders.length;
				if(len >=1){
					for(var y =0; y<len ;y++){
						DOM.html(DOM.get('.J_paixu'+Care.ladders[y]),(y+1));
					}
					DOM.hide('#J_NoPlan');
				}else{
					DOM.show('#J_NoPlan');
				}
				Care.ladder_num++;	
				DOM.hide(ParamsSucessBox);
				
				
			},
			
			groupMini : function(num){
				var contentBox = KISSY.one('#J_Max_Group_'+num);
				var miniBox = KISSY.one('#J_Mini_Group_'+num);
				DOM.hide(DOM.get('.suoxiao','#J_Group_'+num));
				DOM.show(DOM.get('.fangda','#J_Group_'+num));	
				var minTime = DOM.val('#J_StartDate'+num);
				var minMessage = DOM.val('#J_CareBox'+num);
				flag = minTime+minMessage;		
				if(flag == 0){
					str ='<span style="color:#F00">未设置计划&nbsp;&nbsp;&nbsp;<a href="#2" onclick="Care.groupMaxi('+num+');" >[重新设置]</a></span>';
				}else{
					var str = '<p><input type="radio" value="" class="J_CheckBox" name="range_type" id="J_CheckBox_'+num+'">&nbsp;&nbsp;<span style="display:none;">时间：'+minTime+'</span>'+
							  '内容：<span class="J_Content">'+minMessage+'</span></p>';		
				};
				miniBox.html(str);
				if (contentBox.css("display")!="none") {
					miniBox.slideDown(0.7)
					contentBox.slideUp(0.3);
				}					
				  
			},

			groupMaxi : function(num){
				var contentBox = KISSY.one('#J_Max_Group_'+num);
				var miniBox = KISSY.one('#J_Mini_Group_'+num);
				DOM.show(DOM.get('.suoxiao','#J_Group_'+num));
				DOM.hide(DOM.get('.fangda','#J_Group_'+num));		
				if (contentBox.css("display")==="none") {
					miniBox.slideUp(0.1)
					contentBox.slideDown(0.7);
				}
			},
			groupDele : function(num){
				DOM.remove(DOM.get('#J_Group_'+num));
				Care.leftRule++
		    	DOM.html('#J_LeftRule',Care.leftRule);
				for(var i =0;i<Care.groupRule.length;i++){
					if(Care.groupRule[i] == num){
						Care.groupRule.splice(i,1);
					}
				}	
			},
				
			myCalendar : function($id,iid){
				var c = new KISSY.Calendar('#'+$id,{
						popup:true,
						triggerType:['click'],
						closable:true,
						showTime:true
				}).on('select timeSelect',function(e){
						var self = this;
						if(this.id == 'J_StartDate'+iid){
							if(e.type == 'select'){
								var Date   = KISSY.Date.format(e.date,'yyyy-mm-dd 00:00:01');
							}else{
								var Date   = KISSY.Date.format(e.date,'yyyy-mm-dd HH:MM:ss');
							}
							KISSY.one('#J_StartDate'+iid).val(Date);
						}else if(this.id == 'J_StartDate_change'){
							if(e.type == 'select'){
								var Date   = KISSY.Date.format(e.date,'yyyy-mm-dd 23:59:59');
							}else{
								var Date   = KISSY.Date.format(e.date,'yyyy-mm-dd HH:MM:ss');
							}
							KISSY.one('#J_StartDate_change').val(Date);
						}else {
							if(e.type == 'select'){
								var Date   = KISSY.Date.format(e.date,'yyyy-mm-dd 23:59:59');
							}else{
								var Date   = KISSY.Date.format(e.date,'yyyy-mm-dd HH:MM:ss');
							}
							KISSY.one('#J_EndDate'+iid).val(Date);
						}
						self.hide();
				});
			},
			
			save : function(){
				var postListParams = Care.generatePostTemple();
				
				if(Care.checkParams(postListParams)==true){
					return;
				}
				var listParamsJson = KISSY.JSON.stringify(postListParams);
				var careId = DOM.val('#J_CareId');
				var careType = DOM.val('#J_Type');
				ParamsErrorBox = KISSY.one('#J_ParamsErrorBox');
				ParamsSucessBox = KISSY.one('#J_ParamsSucessBox');
//				Care.msg.setMsg('正在提交中，请稍候').show();
		  		var sucessHandle = function(o) {
//		  			Care.msg.hide();
					ParamsErrorBox.hide();
					DOM.html('#J_ParamsSucessMsg','设置成功');
					if (ParamsSucessBox.css("display")==="none") {
						ParamsSucessBox.slideDown();
					}
					location.reload();
//		  			Care.msg.hide(3000);
		 		};
		 		var errorHandle = function(o){
//		 			Care.msg.hide();
		 			ParamsSucessBox.hide();
		 			DOM.html('#J_ParamsErrorMsg',o.desc);
					if (ParamsErrorBox.css("display")==="none") {
						ParamsErrorBox.slideDown();
					}
					return ;			 			
					//Care.msg.setMsg('<div class="point relative"><div class="point-w-1">'+o.desc+'</div></div>').showDialog();
					
		 		};
		 		var data = 'type='+careType+'&care_id='+careId+'&templets='+listParamsJson
		 		//alert(data);return;
		  	    new H.widget.asyncRequest().setURI(saveCareUrl).setMethod("POST").setHandle(sucessHandle).setErrorHandle(errorHandle).setData(data).send();
				return true;
				
			},
			generatePostTemple : function(){
				var postListParams =[];
				S.each(S.all('.J_TempletParames'),function(item, i){
					var listPar = {};
					var CheckBoxs = DOM.query('.J_CheckBox', item);
					var len = CheckBoxs.length;
//					if(typeof(DOM.val(DOM.get('.J_Content', item))) == 'number'){
//						var content = DOM.val(DOM.get('.J_Content', item));
//					}else{
//						var content = DOM.val(DOM.get('.J_Content', item));	
//					}
//					alert(content)
					listPar.is_checked = DOM.prop(DOM.get('.J_CheckBox', item),'checked')? "1":"0";
//					listPar.content = encodeURIComponent(Care.strProcess(content));
					listPar.content = DOM.html(DOM.get('.J_Content', item));
					listPar.templet_id = DOM.val(DOM.get('.J_TempletId', item));
					listPar.care_time = DOM.val(DOM.get('.J_StartDate', item));
					postListParams.push(listPar);
				})
				return postListParams
			},
			checkParams : function(postListParams){
				var error = false, len = postListParams.length;
				return error;
			},
            strProcess : function(str){
                return str.replace(/\\/g, '\\\\').replace(/\"/g, '\\"').replace(/[\t\n&]/g, '');
			}
	}
   
}, {
    requires: ['utils/showPages/index']
});
