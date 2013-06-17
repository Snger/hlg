/*
combined files : 

utils/showPages/index
page/mods/check
page/relist-init

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
KISSY.add('page/mods/check',function (S) {
    // your code here
	
	return checkUtil = {
			/*违禁词限制*/
			checkSpecTitle : function(str){
				var result = [];
				var error = false;
				var msg = null;
				var re =/(淘宝)|(聚划算)|(限时折扣)|(良品)|(淘金币)|(天天特价)|(满就送)|(vip)/i;
				if(re.test(str)){
				    var rt = re.exec(str);
				    if(rt != null){
						error = true;
						msg = '含有违禁字'+rt[0]+'！';
					}
				}
				result.push(error);
				result.push(msg);
				return result;
			},
			/*验证活动名称*/
			checkPromoName : function(promoName){
				var result = [];
				var error = false;
				var msg = null;
				var re=/^[\u4E00-\u9FA5\uf900-\ufa2d\A-Za-z0-9]{2,5}$/;
				if(!re.test(promoName)){
					if(promoName.length<2 || promoName.length >5){
						error = true;
						msg = '长度2~5个字符！';
					}else {
						var reg=/[^\u4E00-\u9FA5\uf900-\ufa2d\A-Za-z0-9]+/;
						var rt = promoName.match(reg);
						if(rt != null){
							error = true;
							msg = '含有非法字符'+rt[0]+'！';
						}
					}
				}
				result.push(error);
				result.push(msg);
				return result;
			},
			/*验证活动备注*/
			checkPromoDesc : function(promoDesc){
				var result = [];
				var error = false;
				var msg = null;
				var re=/^[\u4E00-\u9FA5\uf900-\ufa2d\w\s\，！。《》（）、—]{0,30}$/;
				if(!re.test(promoDesc)){
					if(promoDesc.length>30){
						error = true;
						msg = '长度30个字以内！';
					}else {
						var reg=/[^\u4E00-\u9FA5\uf900-\ufa2d\w\s\，！。《》（）、—]+/;
						var rt = promoDesc.match(reg);
						if(rt != null){
							error = true;
							msg = '含有非法字符'+rt[0]+'！';
						}
					}
				}
				result.push(error);
				result.push(msg);
				return result;
			},
			/*URL验证*/
			checkUrl : function(v){
				var result = [];
				var error = false;
				var msg = null;
				var reUrl = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/ ;
				if(!reUrl.test(v)){
						error = true;
						msg = '非法URl地址！';
				}
				result.push(error);
				result.push(msg);
				return result;
			},
			/*折扣验证*/
			checkDiscount : function(v){
				var result = [];
				var error = false;
				var msg = null;
				if(isNaN(Number(v)) || v <= 0 || v >=10){
					error = true;
					msg = '折扣范围在 0.00~9.99之间哦！';
				}else {
					var re = /(^[0-9]([.][0-9]{1,2})?$)|(^1[0-9]([.][0-9]{1,2})?$)|(^2[0-3]([.][0-9]{1,2})?$)|(^10([.]0{1,2})?$)/;
					if(!re.test(v)){
						error = true;
						msg = '折扣范围在 0.00~9.99之间哦！';
					}
				}
				result.push(error);
				result.push(msg);
				return result;
			}
		
		
	}
   		 
});
KISSY.add('page/relist-init',function(S,showPages,O,checkUtil){
	var S = KISSY,DOM = S.DOM, Event = S.Event;	
	return relist = {
			paginator : null,
	    	msg : null,
			chart : null,
	    	init : function() {
				relist.showRelistView();
				relist.getPlans();
				Event.on('#J_HandAdd','click',function(){
					relist.handAdd();
				})
				Event.on('#J_SyncShop','click',function(){
					relist.syncShop();
				})
				//add by gaolou 2013-02-20
				Event.delegate(document,'click','.J_GoToEditName', function(ev) {
					var pid = DOM.attr(ev.currentTarget,'data');
					relist.editorPromoName(pid);
				})
				
	        },
	        showRelistView :function() {
		    	var submitHandle = function(o) {
					if(relist.chart){
						relist.chart.destroy();
					}
					relist.chart = new Highcharts.Chart({
							chart: {
								renderTo: 'J_BaoBiao',
								height:400,
								marginBottom: 60
							},
							title: {
								text: '全店宝贝上架前后对比 '
							},
							credits :{
								enabled :false
							},
							legend :{
					            floating: true,
					            align: 'left',
					            x : 450,
					            y : 5
							},
							xAxis: {
								categories: o.payload.xdata,
								labels: {
						            step: o.payload.xkuadu
						        }
							},
							 yAxis: [{
								 	lineWidth: 1,
							        tickWidth: 1,
							        title: {
							            align: 'high',
							            offset: 0,
							            text: '',
							            rotation: 0,
							            y: -10
							        },
						            min : 0
						        }],
							tooltip: {
								formatter: function(e) {
									var s;
										s = ''+this.x  +': '+ this.y;
									return s;
								}
							},
							series: [{
								type: 'spline',
								name: '调整前',
								data: o.payload.raw
							},{
								type: 'spline',
								name: '调整后',
								data: o.payload.relist
							}
							]
						});
		    	};
		    	var errorHandle = function(o){
		    		DOM.html(DOM.get("#J_BaoBiao"), o.desc,true);
	        	};
        	    var data = '';
        	    new H.widget.asyncRequest().setURI(getShopReportDatasUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			},
			getPlans : function() {
	            var submitHandle = function(o) {
					DOM.hide('#J_RightLoading');
					DOM.show('#J_PromotionItemList');
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
					var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					relist.paginator = new showPages('relist.paginator').setRender(relist.handlePagination).setPageCount(pageCount).printHtml('#J_BottomPaging',2);
	    	    };
    	    	var data = "pageSize=10";
	 			DOM.show('#J_RightLoading');
				DOM.hide('#J_PromotionItemList');
	    	    new H.widget.asyncRequest().setURI(getPlansUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
	    	handlePagination : function(turnTo) {
		    	pageId = turnTo;
	    		var submitHandle = function(o) {
					DOM.hide('#J_RightLoading');
					DOM.show('#J_PromotionItemList');
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
					relist.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_BottomPaging',2);
		    	};
    	    	var data = "pageSize=10&page_id="+pageId;
    	        DOM.show('#J_RightLoading');
				DOM.hide('#J_PromotionItemList');
        	    new H.widget.asyncRequest().setURI(getPlansUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			//手动加入--暂时未用
			handAdd : function() {
				console.log('请用overlay重写');return;
				var funsHtml = DOM.html('#J_AllFuns');
				var excludeRolesHtml = DOM.html('#J_ExcludeRoles');
				var str = '<div style="padding:20px;">'+
								'<div class="mt15"><span class="w-150 inline-block align-right">选择计划：&nbsp;&nbsp;</span><select id="J_FunId">'+funsHtml+'</select></div>'+
							    '<div style="width:160px;margin:20px auto 0;" class="btm-content"><input type="button" name="" value="保存" class="btm-68-orange fl" style="display:inline" id="J_SaveUser"> <input type="button" name="" value="取消" class="btm-68-gray fl" id="cancel" style="display:inline"></div>'+
						  '</div>';
				relist.msg.setHeader('手动分配').setMsg(str).showDialog();
				relist.Calendar('J_startDate');
				relist.Calendar('J_endDate');
				Event.remove('#J_SaveHandle');
				Event.remove('#cancel');
				Event.on('#J_SaveHandle','click',function(ev){
					ev.preventDefault();
		    	    var super_title = DOM.val('#J_Title');
					if(super_title == "" || super_title == "undefined"){
						DOM.css('#J_Title','border','1px solid red');
						return;
					}
		    	    var fun_id = DOM.val('#J_FunId');
		            var submitHandle = function(o) {
		            	globalAdd.msg.hide();
		            	globalAdd.msg.setMsg('提交成功！').show();
		            	globalAdd.msg.hide(800);
		            	window.location.href=comeBackURL;
		    	    };
	        	    var errorHandle = function(o){
	        	    	globalAdd.msg.hide();
	        	    	globalAdd.msg.setMsg('<div class="point relative"><div class="point-w-1">'+o.desc+'</div></div>').showDialog();
						return;
	        	    };
					var data = "super_title="+super_title+"&fun_id="+fun_id+"&exclude_roles="+exclude_roles+"&msg="+msg+"&start_date="+start_date+"&end_date="+end_date;
					globalAdd.msg.setMsg('正在保存，请稍等...').show();
//		    	    new H.widget.asyncRequest().setURI(saveGlobalURL).setMethod("POST").setHandle(submitHandle).setForm(J_AddRole).setData(data).send();
				})
				Event.on('#cancel','click',function(ev){
					ev.preventDefault();
					relist.msg.hide();
				})
			},
			//立即同步
			syncShop : function() {
	            var submitHandle = function(o) {
	            	relist.getPlans();
	    	    };
				var errorHandle = function(o){
        	    	new H.widget.msgBox({
					    title:"错误提示",
					    content:o.desc,
					    type:"error"
					});
					return;
				}
    	    	var data = "";
	    	    new H.widget.asyncRequest().setURI(syncShopUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			},
			//关闭
			close : function(plan_id) {
				new H.widget.msgBox({
				    title: "温馨提示",
				    type: "confirm",
				    content: "暂停后将停止调整宝贝，您确认要暂停此计划吗？",
				    buttons: [{ value: "暂停" }, { value: "不暂停" }],
				    success: function (result) {
				        if (result == "暂停") {
			                var submitHandle = function(o) {
			                	new H.widget.msgBox({
			                		type: "sucess",
			                        content: "暂停成功！",
			         				dialogType:"msg",
			        				autoClose:true,
			        				timeOut:3000,
			                    });
			                	relist.getPlans();
			        	    };
			        	    var errorHandle = function(o){
			        	    	new H.widget.msgBox({
								    title:"错误提示",
								    content:o.desc,
								    type:"error"
								});
								return;
			        	    };
			    	    	var data = "plan_id="+plan_id;
				    	    new H.widget.asyncRequest().setURI(closeUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
				        }
				    }
				});
			},
			//开启
			open : function(plan_id) {
				new H.widget.msgBox({
				    title: "温馨提示",
				    type: "confirm",
				    content: "开启后将开始调整宝贝，您确认要开启此计划吗？",
				    buttons: [{ value: "开启" }, { value: "不开启" }],
				    success: function (result) {
				        if (result == "开启") {
			                var submitHandle = function(o) {
			                	new H.widget.msgBox({ type: "sucess",
			                        content: "开启成功！",
			         				dialogType:"msg",
			        				autoClose:true,
			        				timeOut:3000,
			                    });
			                	relist.getPlans();
			        	    };
			        	    var errorHandle = function(o){
			        	    	new H.widget.msgBox({
								    title:"错误提示",
								    content:o.desc,
								    type:"error"
								});
								return;
			        	    };
			    	    	var data = "plan_id="+plan_id;
				    	    new H.widget.asyncRequest().setURI(openUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
				        }
				    }
				});
			},
			//删除计划
			delPlan : function(plan_id) {
				new H.widget.msgBox({
				    title: "温馨提示",
				    type: "confirm",
				    content: "删除计划后不可恢复，您确定要删除此计划吗？",
				    buttons: [{ value: "删除" }, { value: "不删除" }],
				    success: function (result) {
				        if (result == "删除") {
			                var submitHandle = function(o) {
			                	new H.widget.msgBox({ type: "sucess",
			                        content: "删除成功！",
			         				dialogType:"msg",
			        				autoClose:true,
			        				timeOut:3000,
			                    });
			                	relist.getPlans();
			        	    };
			        	    var errorHandle = function(o){
			        	    	new H.widget.msgBox({
								    title:"错误提示",
								    content:o.desc,
								    type:"error"
								});
								return;
			        	    };
			    	    	var data = "plan_id="+plan_id;
				    	    new H.widget.asyncRequest().setURI(delPlanUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
				        }
				    }
				});
			},
			//重试
			retry : function(plan_id) {
				var submitHandle = function(o) {
					relist.getPlans();
				};
				var errorHandle = function(o){
        	    	new H.widget.msgBox({
					    title:"错误提示",
					    content:o.desc,
					    type:"error"
					});
					return;
				}
				var data = "plan_id="+plan_id;
				new H.widget.asyncRequest().setURI(retryUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			},
			//add bu gaolou 2013-02-20
			editorPromoName : function(pid){
		 		DOM.hide('#J_GoToEditName_'+pid);	
		 		DOM.hide('#J_PromoNameBox_'+pid);	
		 		var SpromoName = KISSY.trim(DOM.val('#J_SoucePromoName_'+pid));
		 		
				DOM.show('#J_ShowEditorPromoName_'+pid);
				
				DOM.get('#J_InputPromoName_'+pid).focus();
				DOM.val('#J_InputPromoName_'+pid,SpromoName);
				Event.on('#J_CancelSaveName_'+pid,'click',function(ev){
					DOM.hide('#J_ShowEditorPromoName_'+pid);
					DOM.show('#J_PromoNameBox_'+pid);
					DOM.show('#J_GoToEditName_'+pid);
					return ;
				})
				Event.on('#J_SavePromoName_'+pid,'click',function(ev){
						var pid = DOM.attr(ev.currentTarget,'data');
						var SpromoName = KISSY.trim(DOM.val('#J_SoucePromoName_'+pid));
						var NpromoName = KISSY.trim(DOM.val('#J_InputPromoName_'+pid));
						if(SpromoName == NpromoName){
							DOM.hide('#J_ShowEditorPromoName_'+pid);
							DOM.show('#J_PromoNameBox_'+pid);
							DOM.show('#J_GoToEditName_'+pid);
							return ;
						}
						var result = H.util.isNull(NpromoName);
						var error = result[0];
						var msg = result[1];
						if(error){
		        	    	new H.widget.msgBox({
							    title:"错误提示",
							    content:msg,
							    type:"error"
							});
				 			return ;
						}
						result = checkUtil.checkSpecTitle(NpromoName);
						error = result[0];
						msg = result[1];
						if(error){
		        	    	new H.widget.msgBox({
							    title:"错误提示",
							    content:msg,
							    type:"error"
							});
				 			return ;
						}
						
				 		var sucessHandle = function(o) {
				 			DOM.val('#J_SoucePromoName_'+pid,NpromoName);
				 			DOM.html('#J_APromoName_'+pid,NpromoName);
				 			
				 			DOM.hide('#J_ShowEditorPromoName_'+pid);
							DOM.show('#J_PromoNameBox_'+pid);
							DOM.show('#J_GoToEditName_'+pid);
				 			return ;
				 			//var url = "<?php echo $this->getUrl('*/*/index/')?>";
						  	//window.location.href=url;
				 		};
				 		var error = function(o){
		        	    	new H.widget.msgBox({
							    title:"错误提示",
							    content:o.desc,
							    type:"error"
							});
							return;
				 		};
				 		var data = "pid="+pid+"&promo_name="+encodeURI(NpromoName)+"&form_key="+FORM_KEY;
				  	    new H.widget.asyncRequest().setURI(savePlanNameUrl).setMethod("GET").setHandle(sucessHandle).setErrorHandle(error).setData(data).send();
				})
				
			}
    };
},{
	requires : ['utils/showPages/index','overlay','./mods/check']
});
