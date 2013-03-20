/*
combined files : 

utils/showPages/index
page/rule-init

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
KISSY.add('page/rule-init',function (S,showPages) {
    // your code here
	var DOM = S.DOM, Event = S.Event;	
	
	return PointRule = {
	    	daojuPaginator : null,
	    	msg : null,
	    	
	    	init : function() {
				//var ruleId = DOM.val('#J_RuleId');
				//PointRule.listDaojus();
	        },
	        
	        open : function(ruleType){
	        	window.self.location = openRuleUrl+'&type='+ruleType;
	        	return;
	        },
	        view : function(ruleId){
	        	window.self.location = viewRuleUrl+'&rule_id='+ruleId;
	        	return;
	        },
	        //判断节日设置的索引值
	        checkPointIndex : function(){
	        	if(Number(DOM.val('#J_PointLevelNum') == 0)){
	        		pointIndex = 2;
	        	} else{
	        		pointIndex = Math.abs(Number(DOM.val('#J_PointLevelNum'))+1);
	        	}
	        },
	        //判断好评设置的索引值
	        checkReputationIndex : function(){
	        	if(Math.abs(DOM.val('#J_LevelNum') == 0)){
	        		reputationIndex = 2;
	        	} else{
	        		reputationIndex = Math.abs(Math.abs(DOM.val('#J_LevelNum'))+1);
	        	}
	        },

	        
			//搜索
			listDaojus :function() {
		    	var submitHandle = function(o) {
		    		totalRecords = o.payload.totalRecords;
	        	    DOM.html(DOM.get("#J_PromoList"), o.payload.body,true);
	        	    pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
	        	    if( totalRecords == 0 || o.payload.body == ""){
	        	    	DOM.show('#J_LEmpty');
	        	    };
					PointRule.daojuPaginator = showPages('PointRule.daojuPaginator').setRender(PointRule.daojuPaginationHandle).setPageCount(pageCount).printHtml('#J_Paging',2);
		    	};
        	    data ="rule_id="+DOM.val('#J_RuleId');
				//alert(data);return;
        	    new H.widget.asyncRequest().setURI(loadDaojusUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			
			daojuPaginationHandle : function(turnTo,flag) {
				pageId = turnTo;
	    		var submitHandle = function(o) {
	    			DOM.hide('#J_LeftLoading');
	    			DOM.show('#J_MainLeftContent');
	    			totalRecords = o.payload.totalRecords;
		    		pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
	    			PointRule.daojuPaginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_Paging',2);
	    			DOM.html(DOM.get("#J_PromoList"), o.payload.body);
		    	};
		    	DOM.show('#J_LeftLoading');
		    	DOM.hide('#J_MainLeftContent');
				data ="rule_id="+DOM.val('#J_RuleId')+"&page_id="+pageId;
        	    new H.widget.asyncRequest().setURI(loadDaojusUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			
			strProcess : function(str) {
				return str.replace(/\\/g, '\\\\').replace(/\"/g, '\\"').replace(/[\\t\\n&]/g, '%26');
			},
			
			checkParams : function() {
//				alert('checkParams:'+ruleType+' un process');
//				return true;
				switch(ruleType){
					case '2':
						var inputArray = DOM.query('.J_CheckNum');
						var inputValueArray = [];
						ParamsErrorBox = KISSY.one('#J_ParamsErrorBox');
						ParamsSucessBox = KISSY.one('#J_ParamsSucessBox');
						for(var i=0;i<inputArray.length;i++){
							inputValueArray.push(DOM.val(inputArray[i]));
						}
						for(var i=0;i<inputValueArray.length;i++){
							if (isNaN(Number(inputValueArray[i])) == true || inputValueArray[i]<=0) {
								var ii = i+1;								
								DOM.html('#J_ParamsErrorMsg','请在第'+ii+'个框输入数字');
								if (ParamsErrorBox.css("display")==="none") {
									ParamsErrorBox.slideDown();														
									}													
								
								//alert('请在第'+ii+'个框输入数字');
								return false;
							}
						}
						var reputationNumArray = DOM.query('.J_ReputationNum');
						var repurationValArray = [];
						for(var i=0;i<reputationNumArray.length;i++){
							repurationValArray.push(DOM.val(reputationNumArray[i]));
						}
						for(var j=0;j<repurationValArray.length;j++){
							if(j>0 && repurationValArray[j-1] - repurationValArray[j]>0){
								var jj = j+1;
								DOM.html('#J_ParamsErrorMsg','第'+jj+'个层级应该比前一层级数值更大');
								if (ParamsErrorBox.css("display")==="none") {
									ParamsErrorBox.slideDown();														
									}
								//alert('第'+jj+'个层级应该比前一层级数值更大');
								return false;
							}
						}
						break;
					case '4':
						var amount = DOM.val('#J_Amount');
						var ParamsErrorBox = KISSY.one('#J_ParamsErrorBox');
						if(isNaN(amount)|| parseInt(amount) != amount || amount <= 0) {
							DOM.html('#J_ParamsErrorMsg','积分必须是整数');
							DOM.hide('#J_ParamsSucessBox');
							if (ParamsErrorBox.css("display")==="none") {
								ParamsErrorBox.slideDown();														
							}
							return false;
						}
						break;
					default:
						break;
				}
				return true;
			

			},
			setRuleEnable : function(ruleId, status){
				
				ParamsErrorBox = KISSY.one('#J_ParamsErrorBox');
				ParamsSucessBox = KISSY.one('#J_ParamsSucessBox');
				var	successHandle = function(result){
//					if(status=='1'){
//						DOM.show('#J_RuleEnabled');
//						DOM.hide('#J_RuleDisabled');
//					}else{
//						DOM.hide('#J_RuleEnabled');
//						DOM.show('#J_RuleDisabled');
//					}

					window.self.location.reload();
//					DOM.html('#J_ParamsSucessMsg','设置成功');
//						if (ParamsSucessBox.css("display")==="none") {
//							ParamsSucessBox.slideDown();														
//							}

				    //alert('设置成功！');
					
					return;
					//DOM.html('#'+id,result.payload);
				}
				var	errorHandle = function(result){
					//alert(result.desc);
					//DOM.html('#'+id,'0');
					
					DOM.html('#J_ParamsErrorMsg',result.desc);
					if (ParamsErrorBox.css("display")==="none") {
						ParamsErrorBox.slideDown();														
						}
				}
				var enable = status;
				var data ="rule_id="+ruleId+"&enable="+enable;
				new H.widget.asyncRequest().setURI(setEnableAjaxUrl).setMethod("POST").setHandle(successHandle).setErrorHandle(errorHandle).setData(data).send();
			},
			addPointGroup : function(){
				var pointGroupHtml = DOM.create('<li id="J_FestivalGroup'+pointIndex+'" class="min-height-30"><div class="w-550 layer-1 relative"><div class="window-btm"><span class="guanbi" onclick="PointRule.delPointGroup('+pointIndex+')" title="关闭"></span></div><div class="youhui-neirong"><input  type="text" class="input-text" value="节日名称" name="special[title][]" onblur="this.className=\'input-text\';if(this.value==\'\'){this.value = \'节日名称\'}" onfocus="this.className=\'input-text\';if(this.value==\'节日名称\'){this.value =\'\';}"  > ：<input type="text"class="input-text w-100 J_StartDate"value="2012-4-5"name="special[begin_date][]" readonly="readonly">&nbsp;&nbsp;至&nbsp;&nbsp;<input type="text"class="input-text  margin-right-20 w-100 J_EndDate"value="2012-4-5"name="special[end_date][]" readonly="readonly">&nbsp;<a href="#2" id="J_Date'+pointIndex+'">日期选择</a><span class="red festival-del"></span></div></div></li>');
				DOM.insertBefore(pointGroupHtml,DOM.parent('#J_AddPointGroup'));
				
				new KISSY.Calendar('#J_Date'+pointIndex, {
		            pages:2,
		            rangeSelect:true,
		            popup:true
		        }).on('rangeSelect', function(e) {
					var a = ''+this.id;
					var id = a.substring(6),self = this;
					
					 DOM.val(DOM.get('.J_StartDate','#J_FestivalGroup'+id),KISSY.Date.format(e.start,'yyyy-mm-dd'));
					 DOM.val(DOM.get('.J_EndDate','#J_FestivalGroup'+id),KISSY.Date.format(e.end,'yyyy-mm-dd'))
					 self.hide();
		        });
				pointIndex++;
			},
			delPointGroup : function(index){
				DOM.remove('#J_FestivalGroup'+index);
			},
			addReputationGroup : function(){
				var reputationGroupHtml = DOM.create('<li id="J_ReputationGroup'+reputationIndex+'" class="min-height-30"><div class="w-550 layer-1 relative"><div class="window-btm"><span class="guanbi" onclick="PointRule.delReputationGroup('+reputationIndex+')" title="关闭"></span></div><div class="youhui-neirong">好评字数超过&nbsp;<input type="text"value=""class="input-text J_ReputationNum J_CheckNum"name="num[]">&nbsp;&nbsp;字，&nbsp;送&nbsp;<input type="text"value=""class="input-text J_CheckNum"name="amount[]">&nbsp;&nbsp;积分&nbsp;<span class="red festival-del margin-left-10"></span></div></div></li>')
				DOM.insertBefore(reputationGroupHtml,DOM.parent('#J_AddPointGroup'));
				reputationIndex++;
			},
			delReputationGroup : function(index){
				DOM.remove('#J_ReputationGroup'+index);
			},
			save : function(){
				if(PointRule.checkParams()==false){
					return;
				}
				ParamsErrorBox = KISSY.one('#J_ParamsErrorBox');
				ParamsSucessBox = KISSY.one('#J_ParamsSucessBox');
				var ruleForm = document.getElementById('J_RuleSet');
				//var promoName = promotionForm.promo_name.value;
				//if(promotionForm.card_num_type[1].checked){
		  		var sucessHandle = function(o) {
		  			if('4'==ruleType){
		  				DOM.html('#J_ParamsSucessMsg','赠送成功');
		  			}else{
		  				DOM.html('#J_ParamsSucessMsg','设置成功');
		  			}
		  			DOM.hide('#J_ParamsErrorBox');
		  			if (ParamsSucessBox.css("display")==="none") {
		  				ParamsSucessBox.slideDown();														
						}	
		 		};
		 		var errorHandle = function(o){
		 			DOM.hide('#J_ParamsSucessBox');
		 			DOM.html('#J_ParamsErrorMsg',o.desc);
		  			if (ParamsErrorBox.css("display")==="none") {
		  				ParamsErrorBox.slideDown();														
						}
		 		};
		 		var data = '';
		  	    new H.widget.asyncRequest().setURI(saveRuleAjaxUrl).setMethod("POST").setForm('#J_RuleSet').setHandle(sucessHandle).setErrorHandle(errorHandle).setData(data).send();
				return true;
			},
			addDaoju : function(promoId){
				var amount = DOM.val("#J_DaojuAmount_"+promoId);
				var ruleId = DOM.val("#J_RuleId");
		  		var sucessHandle = function(o) {
					 new H.widget.msgBox({ 
					 			type: "sucess", 
					 			content: "修改成功",
								dialogType:"msg", 
								autoClose:true, 
								timeOut:3000
							});
		  			PointRule.listDaojus();
		  			
		 		};
		 		var errorHandle = function(o){
		 			
//					DOM.html('#J_ParamsErrorBoxMsg',o.desc);
//					if (ParamsErrorBox.css("display")==="none") {
//						ParamsErrorBox.slideDown();														
//						}
		 			
		 			//alert(o.desc);
		 		};
		 		var data = 'rule_id='+ruleId+"&amount="+amount+"&promo_id="+promoId;
		  	    new H.widget.asyncRequest().setURI(addDaojuUrl).setMethod("POST").setHandle(sucessHandle).setErrorHandle(errorHandle).setData(data).send();
				return true;
			},
			cancelDaoju : function(promoId){
				//var amount = DOM.val("#J_Amount_"+promoId);
				var ruleId = DOM.val("#J_RuleId");
		  		var sucessHandle = function(o) {
		  			
					new H.widget.msgBox({ 
				 			type: "sucess", 
				 			content: "修改成功",
							dialogType:"msg", 
							autoClose:true, 
							timeOut:3000
					});
		  			PointRule.listDaojus();
		 		};
		 		var errorHandle = function(o){
					DOM.html('#J_ParamsErrorBoxMsg',o.desc);
					if (ParamsErrorBox.css("display")==="none") {
						ParamsErrorBox.slideDown();														
						}
		 			//alert(o.desc);
		 		};
		 		var data = 'rule_id='+ruleId+"&promo_id="+promoId;
		  	    new H.widget.asyncRequest().setURI(cancelDaojuUrl).setMethod("POST").setHandle(sucessHandle).setErrorHandle(errorHandle).setData(data).send();
				return true;
			},
			
			isNull : function(str){
				if(str == null ||str == ""){
					return true;
				}else{
					return false;
				}
			},
			isDate : function(str){
				if (str == null)
				{
					return false;
				}
				if (str.length != 19 ){
					return false;
				}
				var yearStr = str.substring(0,4);
				var monthStr = str.substring(5,7);
				var dayStr = str.substring(8,10);
				var hour = str.substring(11,13);
				var mins = str.substring(14,16);
				var sec = str.substring(17,19);
				if(parseInt(yearStr)<2011)
				{
					return false;
				 }
				y = parseInt(yearStr,10);
				d = parseInt(dayStr,10);
				switch(monthStr){
					case '01':
					case '03':
					case '05':
					case '07':
					case '08':
					case '10':
					case '12':
					 if(d>31){
					return false;
					 }
					 break;
					case '02':
					 if((y%4==0 && d>29) || ((y%4!=0 && d>28))){
					return false;
					}
					 break;
					case '04':
					case '06':
					case '09':
					case '11':
					 if(d>30){
					return false;
					}
					 break;
					default:
					 return false;
				}
				if(parseInt(hour)>23 || parseInt(mins)>59 || parseInt(sec)>59){
					return false;
				}
				if(str.substring(4,5) != '-' || str.substring(7,8) != '-' || str.substring(13,14) != ':' || str.substring(16,17) != ':'){
					return false;
				}	
		        return true;
			}
	}
}, {
    requires: ['utils/showPages/index']
});
