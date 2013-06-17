KISSY.add(function(S,showPages,O,checkUtil){
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