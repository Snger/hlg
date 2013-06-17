/**
 * @fileOverview 
 * @author  
 */
KISSY.add(function (S,showPages) {
    // your code here
	var DOM = S.DOM, Event = S.Event;	
	var promotionForm = DOM.get('#promotion_edit_form');
		return BuyerList = {
			    	paginator : null,
			    	msg :null,
			    	init : function() {
						Event.on('#J_SendBtn','click',function(){
							DOM.show('#J_SendContent');
							DOM.hide('#J_SendBtn');
						});
						if(isSend == 1){
							Event.fire('#J_SendBtn','click');
						}
						
						Event.on("#J_closed", "click", function(){
							BuyerList.closeSendContent();
							DOM.show('#J_SendBtn');
						});
						Event.on("#J_LeftSearch", "click", function(){
							BuyerList.searchTbItems();
						});
	             		Event.delegate(doc,"change","#J_ChangeSendType1",function(ev){
	             			value = DOM.val("#J_ChangeSendType1");
	             			if (value == 2){
	             				DOM.hide('#J_HandSend');
	             				var option = DOM.query('#J_ChangeSendType1 option');
	             				for(var i=1;i<option.length;i++){
	             					option[0].selected = true;
	             				}
	             				DOM.show('#J_AutoSend');
	             			}
	             		});
	             		Event.delegate(doc,"change","#J_ChangeSendType2",function(ev){
	             			value = DOM.val("#J_ChangeSendType2");
	             			if(value == 1){
	             				DOM.hide('#J_AutoSend');
	             				var option = DOM.query('#J_ChangeSendType2 option');
	             				for(var i=1;i<option.length;i++){
	             					option[1].selected = true;
	             				}
	             				DOM.show('#J_HandSend');
	             			}
	             		});
	             		BuyerList.myCalendar('J_StartDate');
	             		BuyerList.myCalendar('J_EndDate');
						BuyerList.loadGroupPromo();
	             		Event.delegate(doc,'click','#J_BtnPublish',function(ev){
	             			BuyerList.save();
	             		})
						Event.on(doc, 'keydown', function(evt) {
							if ( evt.which === 13) {
								if(BuyerList.paginator){
									BuyerList.paginator.toPage(BuyerList.paginator.page);
								}else{
									BuyerList.searchTbItems();
								}
							}
						})
						// input 边框变化 
						var inputs = DOM.filter (DOM.query('input'),function(i){if(i.type =='text')return true;})
						Event.on(inputs,'focus blur',function(ev){
							if(ev.type == 'focus'){
								if(DOM.hasClass(ev.target,'input-none')){
									DOM.removeClass(DOM.parent(ev.target),'input-text text text-error');
									DOM.addClass(DOM.parent(ev.target),'input-text-on');
								}else{
									DOM.removeClass(ev.target,'input-text text text-error');
									DOM.addClass(ev.target,'input-text-on');
								}
							} else if(ev.type == 'blur'){
								if(DOM.hasClass(ev.target,'input-none')){
									DOM.removeClass(DOM.parent(ev.target),'input-text-on');
									DOM.addClass(DOM.parent(ev.target),'input-text');
								}else{
									DOM.removeClass(ev.target,'input-text-on');
									DOM.addClass(ev.target,'input-text');
								}
							}
						})
						BuyerList.searchTbItems();
					                      
			        },
	
					
					searchTbItems : function() {
				        
			            var submitHandle = function(o) {
							DOM.hide('#J_LeftLoading');
							DOM.show('#J_MainLeftContent');
			        	    totalRecords = o.payload.totalRecords;
							DOM.html('#J_UserNum',totalRecords);
							if(totalRecords > 0){
								DOM.css(DOM.get('#J_LEmpty') ,'display','none');
								DOM.css(DOM.query(".J_ItemSelectBtnHolder") ,'display' , '');
							} else {
								DOM.css(DOM.get('#J_LEmpty'), 'display' , '');
								DOM.css(DOM.query(".J_ItemSelectBtnHolder") , 'display' , 'none');
							}
							BuyerList.renderItems(o.payload.body);
							var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
							BuyerList.paginator = new showPages('BuyerList.paginator').setRender(BuyerList.handlePagination).setPageCount(pageCount).printHtml('#J_Paging',2);
							BuyerList.paginator.printHtml('#J_TopPaging',3);
			    	    };
			    	    var data = BuyerList.getData();
			 			DOM.show('#J_LeftLoading');
						DOM.hide('#J_MainLeftContent');
			    	    new H.widget.asyncRequest().setURI(loadTbItemsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
					},
					renderItems: function(c) {
			    	    DOM.html(DOM.get("#J_TbItemList"), c);
			    	    var lis = DOM.query("#J_TbItemList .J_CheckBox");
			        	Event.on(lis, "click", function(ev){
			        		if(ev.currentTarget.disabled) return;
			       			if(ev.currentTarget.checked == false){
//			       				DOM.attr('#J_TopCheckAll','checked',false);
			       			}else{
			       			}
			        	});
			        	
					},
					
			    	handlePagination : function(turnTo) {
				    	pageId = turnTo;
			    		var submitHandle = function(o) {
			    			//DOM.get("#J_CheckAll").checked = false;
//			    			DOM.get("#J_TopCheckAll").checked = false;
			    			 totalRecords = o.payload.totalRecords;
			 				if(totalRecords > 0){
			 					DOM.css(DOM.get('#J_LEmpty') ,'display','none');
			 					DOM.css(DOM.query(".J_ItemSelectBtnHolder") ,'display' , '');
			 				} else {
			 					DOM.css(DOM.get('#J_LEmpty'), 'display' , '');
			 					DOM.css(DOM.query(".J_ItemSelectBtnHolder") , 'display' , 'none');
			 				}
			 				var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
			 				BuyerList.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_Paging',2);
			 				BuyerList.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_TopPaging',3);
			 				BuyerList.renderItems(o.payload.body);
			 				DOM.hide('#J_LeftLoading');
							DOM.show('#J_MainLeftContent');
				    	};
				    	var data = BuyerList.getData();
						data +="&page_id="+pageId
						   DOM.show('#J_LeftLoading');
							DOM.hide('#J_MainLeftContent');
			    	    new H.widget.asyncRequest().setURI(loadTbItemsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
					},
					getData : function(){
		    	    	 if(DOM.val(DOM.get("#J_SearchTitle")) != '输入买家昵称'){
		   	    	    	var nick = encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle"))); //标题
		   	    	    }else{
		   	    	    	var nick ='';
		   	    	    }
//		   				var card_type = DOM.val(DOM.get("#J_CardType"));
						//var card_date = DOM.val(DOM.get("#J_CardDate"));
//						var post_time = DOM.val(DOM.get("#J_PostTime"));
//		   	    	    var data = "pid="+pid+"&card_type="+card_type+"&card_date="+card_date+"&post_time="+post_time;
				        var data = "pid="+pid+"&pageSize=10&buyerNick="+nick;
				        	
				        return data;  
			
					},
						//删除持卡人
					removePromotionItemHandle : function(groupId) {
			    		if(isVersionPer('promoprops')){return ;}
			        	if(!showPermissions('editor_promoprops','促销道具')){return ;}
						var json = [];
//						var itemXml = '';
//						var error = false;
						if( typeof (groupId) == "undefined" ){
							DOM.attr('#J_RemovePromotionItems','disabled',true);
							DOM.replaceClass('#J_RemovePromotionItems','btm-caozuo-orange','btm-caozuo-gray-none');
							checkBoxs = DOM.query("#J_TbItemList .J_CheckBox");
							var len = checkBoxs.length;
							for(i=0; i<len; i++){
								if(checkBoxs[i].checked && !checkBoxs[i].disabled){
				                    json.push(checkBoxs[i].value);
								}
				            }
						}else{
							  var id = groupId;
							  DOM.replaceClass('#J_Opertion_'+id,'J_Abled','J_DisAbled');
//							  DOM.attr('#J_check'+id,'disabled',true);
//							  DOM.attr('#J_check'+id,'checked',true);
		                      json.push(groupId);
						}
						if(json.length == 0){
							new H.widget.msgBox({
									    title:"错误提示",
									    content:'未选择任何会员！',
									    type:"error",
										autoClose:true,
										timeOut :2000
									
									});
							DOM.attr('#J_RemovePromotionItems','disabled',false);
							DOM.replaceClass('#J_RemovePromotionItems','btm-caozuo-gray-none','btm-caozuo-orange');
							if( typeof (groupId)!= "undefined" ){
								 DOM.replaceClass('#J_Opertion_'+id,'J_DisAbled','J_Abled');
								 DOM.attr('#J_check'+id,'disabled',false);
								 DOM.attr('#J_check'+id,'checked',true);
							}
							return;
						}
						var submitHandle = function(o) {
//							DOM.attr('#J_RemovePromotionItems','disabled',false);
//							DOM.replaceClass('#J_RemovePromotionItems','btm-caozuo-gray-none','btm-caozuo-orange');
							new H.widget.msgBox({
									    title:"温馨提示",
									    content:'删除成功',
										dialogType:"msg",
									    type:"info",
										autoClose:true,
										timeOut :2000
									
									});
							if(BuyerList.paginator){
								BuyerList.paginator.toPage(BuyerList.paginator.page);
							}else{
								BuyerList.searchPromoItems();
							}
		        	    };
						var errorHandle = function(o) {
							if( typeof (groupId)!= "undefined" ){
								 DOM.replaceClass('#J_Opertion_'+id,'J_DisAbled','J_Abled');
								 DOM.attr('#J_check'+id,'disabled',false);
								 DOM.attr('#J_check'+id,'checked',false);
							}
			    	    	DOM.attr('#J_RemovePromotionItems','disabled',false);
							DOM.replaceClass('#J_RemovePromotionItems','btm-caozuo-gray-none','btm-caozuo-orange');
							new H.widget.msgBox({
									    title:"错误提示",
									    content:o.desc,
									    type:"error"
									});
			        	};
		        	    var data = "pid="+pid+"&user_ids="+json;
		        	    new H.widget.asyncRequest().setURI(removePromoMemberUrl).setMethod("POST").setHandle(submitHandle).setData(data).send();
					},
					addMembersToPromo : function(){
			    		if(isVersionPer('promoprops')){return ;}
			        	if(!showPermissions('editor_promoprops','促销道具')){return ;}
//	                    var userNick = DOM.val(DOM.get('#J_SendNick'));
//	    				var num = DOM.val(DOM.get('#J_SendNum'));
//	    				if(userNick=='' || userNick=='输入会员昵称'){
//	    					BuyerList.msg.setMsg('<div class="point relative"><div class="point-w-1">请输入会员昵称</div></div>').showDialog();
//	    					DOM.css('#J_SendNick','border','1px solid red');
//	    					return;
//	    				}
	    				var nicks = H.util.strProcess(DOM.val('#J_HandNick'));
	    				if(nicks=='请输入 会员昵称，非会员暂不支持赠送，如需赠送多个用户，请用空格隔开' || nicks==''){
	    					BuyerList.msg.setMsg('<div class="point relative"><div class="point-w-1">请输入会员昵称</div></div>').showDialog();
	    					return;
	    				}
//	    				var userss = nicks.replace(/\s\t/g,',');
//	    				var userNick = nickss.replace(/,$/g,'');
	    				var userNick = nicks;
	    				var num = DOM.val('#J_SendNum');
	    				
			            var submitHandle = function(o) {
							new H.widget.msgBox({
									    title:"温馨提示",
									    content:'赠送成功',
										dialogType:"msg",
									    type:"info",
										autoClose:true,
										timeOut :2000
									
									});
							DOM.val('#J_HandNick','请输入 会员昵称，非会员暂不支持赠送，如需赠送多个用户，请用空格隔开');
							if(BuyerList.paginator){
								BuyerList.paginator.toPage(BuyerList.paginator.page);
							}else{
								BuyerList.searchTbItems();
							}
			    	    };
			    	    var errorHandle = function(o) {
							new H.widget.msgBox({
									    title:"错误提示",
									    content:o.desc,
									    type:"error"
									});
			        	};
			     	    var data = "pid="+pid+"&buyer_nick="+userNick+"&num="+num+"&form_key="+FORM_KEY;
			    	    new H.widget.asyncRequest().setURI(addMemberToPromoUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
					},
					sendMemberCard : function(id,nick){
			    		if(isVersionPer('promoprops')){return ;}
			        	if(!showPermissions('editor_promoprops','促销道具')){return ;}
						var cardName = DOM.text('#J_CardName');
						
						BuyerList.msg.setHeader('赠送道具卡').setMsg('<div class="point-w-1"><ul style=""><li class="clear"><div class="min-height-30"><ul><li class="active-add-edit-title w-120">买家昵称 ：</li><li style="text-align: left;"class="active-add-edit-title">'+nick+'</li></ul></div></li><li class="clear"><div class="min-height-30"><ul><li class="active-add-edit-title w-120">道具卡 ：</li><li style="text-align: left;"class="active-add-edit-title ">'+cardName+'</li></ul></div></li><li class="clear"><div class="min-height-30"><ul><li class="active-add-edit-title w-120">赠送 ：</li><li style="text-align:left"class="active-add-edit-title"><div style="float:left;padding-left:5px;padding-right:20px;"><select id="J_CardNum"><option value="1">1张</option><option value="2">2张</option><option value="3">3张</option><option value="5">5张</option><option value="10">10张</option></select></div></li></ul></div></li><li class="clear"><div class="min-height-40 mt15"><ul><li class="active-add-edit-title w-120">&nbsp;</li><li class="active-add-edit-title"style="text-align:left"><input type="button"id="del"style="display:inline"class="btm-68-orange fl"value="确定"name=""><input type="button"style="display:inline"id="cancel"class="btm-68-gray fl"value="取消"name=""></li></ul></div></li></ul></div>').showDialog();
	    				
	    				Event.on('#cancel','click',function(){
	    					BuyerList.msg.hide();
	    				})
	    				Event.on('#del','click',function(){
	    					var submitHandle = function(o) {
	    						BuyerList.msg.hide();
	    						BuyerList.msg.setMsg('<span>赠送成功</span>').show();
	    						BuyerList.msg.hide(800);	
	    						if(BuyerList.paginator){
	    							BuyerList.paginator.toPage(BuyerList.paginator.page);
	    						}else{
	    							BuyerList.searchTbItems();
	    						}
	    					};
	    					var errorHandle = function(o) {
	    						BuyerList.msg.hide();
	    						BuyerList.msg.setMsg('<div class="point relative"><div class="point-w-1">'+o.desc+'</div></div>').showDialog();
	    					};
	    					var userNick = nick;
		    				var num = DOM.val(DOM.get('#J_CardNum'));
	    					var data = "pid="+pid+"&buyer_nick="+userNick+"&num="+num+"&form_key="+FORM_KEY;
	    					new H.widget.asyncRequest().setURI(addMemberToPromoUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
	    				})
					},
					closeSendContent : function(index){
						DOM.hide('#J_SendContent');
					},
					myCalendar : function($id){
						config = {
							popup:true,
							triggerType:['click'],
							maxDate:new Date()
						}
						var c = new KISSY.Calendar('#'+$id,config
						).on('select timeSelect',function(e){
								var self = this;
								if(this.id == 'J_StartDate'){
									var Date   = KISSY.Date.format(e.date,'yyyy-mm-dd');
									KISSY.one('#J_StartDate').val(Date);
								}else {
									var Date   = KISSY.Date.format(e.date,'yyyy-mm-dd');
									KISSY.one('#J_EndDate').val(Date);
								}
								self.hide();
						});
					},
					/*价格判断*/
					checkPrice : function(v){
						var result = [];
						var error = false;
						var msg = null;
						if (isNaN(Number(v)) == true || v<=0) {
							error = true;
							msg = '价格是数字哦！';
						}
						result.push(error);
						result.push(msg);
						return result;
					},
					/*是否为空*/
					isNull : function(str){
						var result = [];
						var error = false;
						var msg = null;
						if(str == null ||str == ""){
							error = true;
							msg = '请填写，此项不能为空！';
						}
						result.push(error);
						result.push(msg);
						return result;
					},
					/*活动保存 验证*/
					save : function() {
						var ParamsErrorBox = KISSY.one('#J_ParamsErrorBox');
							var groupName = document.getElementsByName('group_name');
							var result = BuyerList.isNull(groupName[0].value);
							var error = result[0];
							if(error){
								DOM.html('#J_ParamsErrorMsg',result[1]);
								if (ParamsErrorBox.css("display")==="none") {
									ParamsErrorBox.slideDown();
								}
								groupName[0].value = '';
								DOM.addClass(DOM.parent(groupName[0]), 'text-error');
								return ;
							}
							//参数验证
							var minCount = DOM.val('#J_MinCount');
							var maxCount = DOM.val('#J_MaxCount');
							if(minCount || maxCount ){
								if ((isNaN(Number(minCount)) == true || minCount<0 ) || (isNaN(Number(maxCount)) == true || minCount<0)) {
									BuyerList.msg.hide();
									DOM.html('#J_ParamsErrorMsg','交易次数大于0');
									if (ParamsErrorBox.css("display")==="none") {
										ParamsErrorBox.slideDown();
									}
									return  error=true;
								}
							};
							var minAmount = DOM.val('#J_MinAmount');
							var maxAmount = DOM.val('#J_MaxAmount');
							if(minAmount || maxAmount ){
								result = BuyerList.checkPrice(minAmount);
								result1 = BuyerList.checkPrice(minAmount);
								error = result[0];
								error1 = result1[0];
								msg = result[1];
								if(error || error1){
									DOM.html('#J_ParamsErrorMsg',result[1]);
									if (ParamsErrorBox.css("display")==="none") {
										ParamsErrorBox.slideDown();
									}
									return  error=true;
								}
							};
							var minAvg = DOM.val('#J_MinAvgPrice');
							var maxAvg = DOM.val('#J_MaxAvgPrice');
							if(minAvg || maxAvg ){
								result = BuyerList.checkPrice(minAvg);
								result1 = BuyerList.checkPrice(maxAvg);
								error = result[0];
								error1 = result1[0];
								msg = result[1];
								if(error || error1){
									DOM.html('#J_ParamsErrorMsg',result[1]);
									if (ParamsErrorBox.css("display")==="none") {
										ParamsErrorBox.slideDown();
									}
									return  error=true;
								}
							};
							if(minClose || maxClose ){
								var minClose = DOM.val('#J_MinCloseNum');
								var maxClose= DOM.val('#J_MaxCloseNum');
								if ((isNaN(Number(minClose)) == true || minClose<0 ) || (isNaN(Number(maxClose)) == true || maxClose<0)) {
									DOM.html('#J_ParamsErrorMsg','宝贝件数要大于0');
									if (ParamsErrorBox.css("display")==="none") {
										ParamsErrorBox.slideDown();
									}
									return  error=true;
								}
							};
							var Grade = DOM.val('#J_Grade');
							var MinCount = DOM.val('#J_MinCount')
							var MaxCount = DOM.val('#J_MaxCount');
							var MinAmount = DOM.val('#J_MinAmount');
							var MaxAmount = DOM.val('#J_MaxAmount');
							var MinAvgPrice = DOM.val('#J_MinAvgPrice');
							var MaxAvgPrice = DOM.val('#J_MaxAvgPrice');
							var MinCloseNum = DOM.val('#J_MinCloseNum');
							var MaxCloseNum = DOM.val('#J_MaxCloseNum');
							var StartDate = DOM.val('#J_StartDate');
							var EndDate = DOM.val('#J_EndDate');
							var flag = Grade+MinCount+MaxCount+MinAmount+MaxAmount+MinAvgPrice+MaxAvgPrice+MinCloseNum+MaxCloseNum+StartDate+EndDate;
							if(flag == "" || flag == 0){
					 			DOM.html('#J_ParamsErrorMsg','请至少填写一个条件！');
								if (ParamsErrorBox.css("display")==="none") {
									ParamsErrorBox.slideDown();
								}
								return
							};
							var sucessHandle = function(o) {
					 			BuyerList.msg.hide();
					 			ParamsErrorBox.hide();
					 			ParamsSucessBox = KISSY.one('#J_ParamsSucessBox')
					 			DOM.html('#J_ParamsSucessMsg',o.desc);
								if (ParamsSucessBox.css("display")==="none") {
									ParamsSucessBox.slideDown();
								}
								DOM.scrollIntoView('#J_ParamsSucessMsg',window);
								BuyerList.loadGroupPromo();
//					 			window.location.href='<?php echo $this->getUrl('crm/group/list');?>';
					 		};
					 		var errorHandle = function(o){
					 			BuyerList.msg.hide();
								DOM.html('#J_ParamsErrorMsg',o.desc);
								if (ParamsErrorBox.css("display")==="none") {
									ParamsErrorBox.slideDown();
								}
								 DOM.scrollIntoView('#J_ParamsErrorMsg',window);
					 		};
					 		var data = 'promo_id='+pid;
							BuyerList.msg = new H.widget.msgBox({
								    title:"",
									dialogType : 'loading',
								    content:'正在保存中，请稍候'	
								});
					  	    new H.widget.asyncRequest().setURI(editorSaveUrl).setMethod("POST").setForm('#promotion_edit_form').setHandle(sucessHandle).setErrorHandle(errorHandle).setData(data).send();
							return true;
				    	},
				    	loadGroupPromo : function(){
				    		var sucessListHandle = function(o) {
								if(o.payload.totalRecords > 0){
					    			DOM.html('#J_AutoList',o.payload.body);
									DOM.show('#J_AutoListContent');
								}else{
									DOM.hide('#J_AutoListContent');
								}
								var groupName = document.getElementsByName('group_name');
								DOM.val(groupName,'');
								DOM.val('#J_Grade','');
								DOM.val('#J_MinCount','')
								DOM.val('#J_MaxCount','');
								DOM.val('#J_MinAmount','');
								DOM.val('#J_MaxAmount','');
								DOM.val('#J_MinAvgPrice','');
								DOM.val('#J_MaxAvgPrice','');
								DOM.val('#J_MinCloseNum','');
								DOM.val('#J_MaxCloseNum','');
								DOM.val('#J_StartDate','');
								DOM.val('#J_EndDate','');
							}
							var errorListHandle = function(o) {
								DOM.html('#J_ParamsErrorMsg',o.desc);
								DOM.scrollIntoView('#J_ParamsErrorMsg',window);
							}
							var data = 'promo_id='+pid;
					  	    new H.widget.asyncRequest().setURI(loadGroupPromoUrl).setMethod("POST").setHandle(sucessListHandle).setErrorHandle(errorListHandle).setData(data).send();
				    	},
				    	deleteGroupPromo : function(deleteNum){
				    		if(isVersionPer('promoprops')){return ;}
				        	if(!showPermissions('editor_promoprops','促销道具')){return ;}
							ParamsErrorBox = KISSY.one('#J_ParamsErrorBox');
				    		var sucessHandle = function(o) {
					 			ParamsErrorBox.hide();
					 			ParamsSucessBox = KISSY.one('#J_ParamsSucessBox')
					 			DOM.html('#J_ParamsSucessMsg',o.desc);
								if (ParamsSucessBox.css("display")==="none") {
									ParamsSucessBox.slideDown();
								}
								DOM.scrollIntoView('#J_ParamsSucessMsg',window);
								BuyerList.loadGroupPromo();
							}
							var errorHandle = function(o) {
								DOM.html('#J_ParamsErrorMsg',o.desc);
								DOM.scrollIntoView('#J_ParamsErrorMsg',window);
							}
							var data = 'pid='+deleteNum;
					  	    new H.widget.asyncRequest().setURI(deleteGroupPromoUrl).setMethod("POST").setHandle(sucessHandle).setErrorHandle(errorHandle).setData(data).send();
				    	}
					
		    	}
	
}, {
    requires: ['utils/showPages/index']
});