/**
 * @fileOverview 
 * @author  
 */
KISSY.add(function (S) {
    // your code here
    return promotionControl = {
			    	Paginator : null,
			    	msg :null,
					NameError :false,
					CardNumError :false,
					free_post_areasId :[],
					free_post_areasName :[],
					free_post_num :[],
					free_post_name:[],
					
			    	init : function() {
						var isEdit = DOM.val('#J_IsEdit');
						if(isEdit){
							var all_type_list = {
								mianyouka : {ALL:'207',PART:'208',PART_NOT:'209'},
								dazheka : {ALL:'201',PART:'202',PART_NOT:'203'},
								youhuiquan : {ALL:'204',PART:'205',PART_NOT:'206'},
								shenrika : {ALL:'210',PART:'211',PART_NOT:'212'}
    	    				}
	    	    			var type_name_list = {
								201: '打折卡[全店参与]',202 : '打折卡[部分商品参与]',203 : '打折卡[部分商品不参与]',
								207 : '免邮卡[全店参与]',208 : '免邮卡[部分商品参与]',209 : '免邮卡[部分商品不参与]',
								204 : '优惠券[全店参与]',205 : '优惠券[部分商品参与]',206 : '优惠券[部分商品不参与]',
								210 : '生日卡[全店参与]',211 : '生日卡[部分商品参与]',212 : '生日卡[部分商品不参与]'
		    				}
							Event.on('.J_RangeType','click',function(ev){
	    						var rangeType = ev.target.value;
	    						var parentType = DOM.val('#J_ParentType');
	    						if(DOM.val('#J_TypeId')==all_type_list[parentType][rangeType]){
									return;
		    					}
	    						DOM.val('#J_TypeId', all_type_list[parentType][rangeType]);
	    						//DOM.html('#J_TypeName', type_name_list[DOM.val('#J_TypeId')]);
								if(rangeType == 'ALL'){
		    						DOM.hide('#J_Step_4');
		    						DOM.hide('#J_Step_3');
									DOM.show('#J_Step_2');
									DOM.show('#J_BtnPublish_1');
									DOM.hide('#J_BtnPublish_0');
			    				}else if(rangeType == 'PART'){
			    					DOM.hide('#J_Step_4');
			    					DOM.hide('#J_Step_2');
			    					DOM.show('#J_Step_3');	
									DOM.show('#J_BtnPublish_0');
									DOM.hide('#J_BtnPublish_1');
				    			}else{
				    				DOM.hide('#J_Step_3');
			    					DOM.hide('#J_Step_2');
			    					DOM.show('#J_Step_4');
									DOM.show('#J_BtnPublish_0');
									DOM.hide('#J_BtnPublish_1');
					    		}
							});
						}
						Event.on('.J_BtnPublish','click',function(ev){
						  	 	var diff  = IsExpired();
						 	if(diff > -5000){
								var sucessHandle = function(o) {
									promotionControl.save();
						 		};
						 		var errorHandle = function(o){
						 			KISSY.Event.fire('.J_TopExpired','click');
						 		};
						 		var data = '';
						  	    new H.widget.asyncRequest().setURI(isExpiredUrl).setMethod("GET").setHandle(sucessHandle).setErrorHandle(errorHandle).setData(data).send();
							}else{
								promotionControl.save();
								}
						})
						promotionControl.myCalendar('J_startDate',new Date(2038,11,29,00,00,00));
						promotionControl.myCalendar('J_endDate',new Date(2038,11,29,00,00,00));
					    //处理 input 状态
						promotionControl.handleInputs();               
			        },
					//日历
					myCalendar : function($id,max){
						var c =new KISSY.Calendar('#'+$id,{
									popup:true,
									triggerType:['click'],
									minDate:currentDate,
									date : currentDate,
									maxDate : max,
									showTime:true
								}).on('select timeSelect',function(e){
										var id = this.id,self = this;
										if(id=='J_endDate'){
											if(e.type == 'select'){
												var endDate   = S.Date.format(e.date,'yyyy-mm-dd 23:59:59');
											}else{
												var endDate   = S.Date.format(e.date,'yyyy-mm-dd HH:MM:ss');
											}
											var nowDate = new Date();
											var startTime = H.util.StringToDate(S.one('#J_startDate').val());
											var endTime = H.util.StringToDate(endDate);
											if(endTime.getTime() <= nowDate.getTime() || endTime.getTime()<=startTime.getTime()){
												DOM.addClass(S.one('#J_endDate'),'text-error');
													new H.widget.msgBox({
														    title:"错误提示",
														    content:'结束时间不能小于开始时间！',
														    type:"error",
															autoClose:true,
															timeOut :2000
														
														});
//												DOM.html('#J_PromoEndError','结束时间不能小于开始时间');
//												DOM.hide('#J_PromoEndRequired');
//												DOM.hide('#J_PromoEndSucess');
//												DOM.show('#J_PromoEndError');
												self.hide();
											}else{
												S.one('#J_endDate').val(endDate);
												DOM.removeClass(S.one('#J_endDate'),'text-error');
//												DOM.hide('#J_PromoEndRequired');
//												DOM.hide('#J_PromoEndError');
//												DOM.show('#J_PromoEndSucess');
												var leftsecond = parseInt((endTime.getTime() - startTime.getTime()) / 1000);
								                d = parseInt((leftsecond / 86400) % 10000);
								                h = parseInt((leftsecond / 3600) % 24);
												str = '活动持续<b class="red">'+d+'</b>天<b class="red">'+h+'</b>小时';
												//DOM.html("#J_PromoTimeLast" , str);
												self.hide();
											}
										}else if(id=='J_startDate'){
											var endDate = S.one('#J_endDate').val();
											if(e.type == 'select'){
												var startDate   = S.Date.format(e.date,'yyyy-mm-dd 00:00:01');
											}else{
												var startDate   = S.Date.format(e.date,'yyyy-mm-dd HH:MM:ss');
											}
											var startTime = H.util.StringToDate(startDate);
											var endTime = H.util.StringToDate(endDate);
											if((endDate!='')&&(startDate>=endDate)){
												DOM.addClass(S.one('#J_endDate'),'text-error');
												new H.widget.msgBox({
														    title:"错误提示",
														    content:'结束时间不能小于开始时间！',
														    type:"error",
															autoClose:true,
															timeOut :2000
														
														});
//												DOM.html('#J_PromoEndError','结束时间不能小于开始时间');
//												DOM.hide('#J_PromoEndRequired');
//												DOM.hide('#J_PromoEndSucess');
//												DOM.show('#J_PromoEndError');
												S.one('#J_startDate').val(startDate);
												self.hide();
											}else{
												S.one('#J_startDate').val(startDate);
												DOM.removeClass(S.one('#J_endDate'),'text-error');
//												DOM.hide('#J_PromoEndRequired');
//												DOM.hide('#J_PromoEndError');
//												DOM.show('#J_PromoEndSucess');
												var leftsecond = parseInt((endTime.getTime() - startTime.getTime()) / 1000);
								                d = parseInt((leftsecond / 86400) % 10000);
								                h = parseInt((leftsecond / 3600) % 24);
												str = '活动持续<b class="red">'+d+'</b>天<b class="red">'+h+'</b>小时';
												//DOM.html("#J_PromoTimeLast" , str);
												self.hide();
											}
										}else{
											self.hide();
										}
									});
					},
					
					/*活动名称 验证*/
					PromoNameAction : function(name){
						var result = H.util.isNull(name);
						var error = result[0];
						var msg = result[1];
						if(error){
							DOM.addClass(promotionForm.promo_name,'text-error');
							DOM.html('#J_PromoNameError',msg);
							DOM.hide('#J_PromoNameSucess');
							DOM.show('#J_PromoNameError');
							return promotionControl.NameError = true;
						}
						DOM.removeClass(promotionForm.promo_name,'text-error');
						DOM.show('#J_PromoNameSucess');
						DOM.hide('#J_PromoNameError');
						return promotionControl.NameError = false;
					},
					/*卡片数量 验证*/
					CardNumAction : function(name){
						var result = H.util.isNull(name);
						var error = result[0];
						var msg = result[1];
						if(error){
							DOM.addClass(promotionForm.card_num,'text-error');
							DOM.html('#J_CardNumError',msg);
							DOM.hide('#J_CardNumSucess');
							DOM.show('#J_CardNumError');
							return promotionControl.CardNumError = true;
						}
						var result = H.util.checkPrice(name);
						var error = result[0];
						var msg = result[1];
						if(error){
							DOM.addClass(promotionForm.card_num,'text-error');
							DOM.html('#J_CardNumError',msg);
							DOM.hide('#J_CardNumSucess');
							DOM.show('#J_CardNumError');
							return promotionControl.CardNumError = true;
						}
						DOM.removeClass(promotionForm.promo_name,'text-error');
						DOM.show('#J_CardNumSucess');
						DOM.hide('#J_CardNumError');
						return promotionControl.CardNumError = false;
					},
					
					save : function(){
						var S = KISSY , DOM = S.DOM ,Event = S.Event;
						promotionControl.msg = new H.widget.msgBox({
								    title:"",
									dialogType : 'loading',
								    content:'正在保存中，请稍候'	
								});
						var promoName = promotionForm.promo_name.value;
						promotionControl.PromoNameAction(promoName);
						if(promotionControl.NameError == true){
							promotionControl.msg.hide();
							return ;
						}
						ParamsErrorBox = KISSY.one('#J_ParamsErrorBox');
						//卡片数量
						if(promotionForm.card_num_type[1].checked){
							var card_num = document.getElementsByName('card_num')[0].value;
							var result = H.util.isNull(card_num);
							var error = result[0];
							var msg = result[1];
							if(error){
								DOM.addClass(promotionForm.card_num,'text-error');
								promotionControl.msg.hide();
								DOM.html('#J_ParamsErrorMsg',msg);
								if (ParamsErrorBox.css("display")==="none") {
									ParamsErrorBox.slideDown();
								}
								return ;
							}
							var result = H.util.checkPrice(card_num);
							var error = result[0];
							var msg = result[1];
							if(error){
								DOM.addClass(promotionForm.card_num,'text-error');
								promotionControl.msg.hide();
								DOM.html('#J_ParamsErrorMsg',msg);
								if (ParamsErrorBox.css("display")==="none") {
									ParamsErrorBox.slideDown();
								}
								return ;
							}
						}
						//使用条件
						if(promotionForm.use_type[1].checked){
							var use_type_num = document.getElementsByName('use_type_num')[0].value;
							var result = H.util.isNull(use_type_num);
							var error = result[0];
							var msg = result[1];
							if(error){
								DOM.addClass(promotionForm.use_type_num,'text-error');
								promotionControl.msg.hide();
								DOM.html('#J_ParamsErrorMsg',msg);
								if (ParamsErrorBox.css("display")==="none") {
									ParamsErrorBox.slideDown();
								}
								return ;
							}
							var result = H.util.checkPrice(use_type_num);
							var error = result[0];
							var msg = result[1];
							if(error){
								DOM.addClass(promotionForm.use_type_num,'text-error');
								promotionControl.msg.hide();
								DOM.html('#J_ParamsErrorMsg',msg);
								if (ParamsErrorBox.css("display")==="none") {
									ParamsErrorBox.slideDown();
								}
								return ;
							}
						}
						//日期
						if (promotionForm.date_type[0].checked) {
							if (S.one("#J_startDate")) {
								var startDate = DOM.val('#J_startDate');
								var endDate = S.one('#J_endDate').val();
								if ((endDate != '') && (startDate >= endDate)) {
									promotionControl.msg.hide();
									DOM.html('#J_ParamsErrorMsg', '开始时间不能大于结束时间，请重新选择');
									if (ParamsErrorBox.css("display") === "none") {
										ParamsErrorBox.slideDown();
									}
									DOM.addClass('#J_startDate', 'text-error');
									return;
								}
							}
							if (S.one("#J_endDate")) {
								var endDate = S.one('#J_endDate').val();
								var nowDate = new Date();
								var startTime = H.app.smart.StringToDate(S.one('#J_startDate').val());
								var endTime = H.app.smart.StringToDate(endDate);
								//var invalidate = H.app.smart.StringToDate('');
								
								if (endTime.getTime() <= nowDate.getTime() || endTime.getTime() <= startTime) {
									promotionControl.msg.hide();
									DOM.html('#J_ParamsErrorMsg', '结束时间不能小于开始时间，请重新选择');
									if (ParamsErrorBox.css("display") === "none") {
										ParamsErrorBox.slideDown();
									}
									DOM.addClass('#J_endDate', 'text-error');
									return;
								}
							}
						}
						//打折时长
//						if (DOM.get('#J_discount_last').checked === true) {
//								var discount_last_value = DOM.val('#J_discount_last');;
//								var result = H.util.isNull(discount_last_value);
//								var error = result[0];
//								var msg = result[1];
//								if(error){
//									DOM.addClass(promotionForm.discount_last_value,'text-error');
//									promotionControl.msg.hide();
//									DOM.html('#J_ParamsErrorMsg',msg);
//									if (ParamsErrorBox.css("display")==="none") {
//										ParamsErrorBox.slideDown();
//									}
//									return ;
//								}
//								var result = H.util.checkPrice(discount_last_value);
//								var error = result[0];
//								var msg = result[1];
//								if(error){
//									DOM.addClass(promotionForm.discount_last_value,'text-error');
//									promotionControl.msg.hide();
//									DOM.html('#J_ParamsErrorMsg',msg);
//									if (ParamsErrorBox.css("display")==="none") {
//										ParamsErrorBox.slideDown();
//									}
//									return ;
//								}
//						}
						//打折次数
//						if (DOM.get('#J_discount_num').checked === true && promotionForm.discount_num[1].checked) {
//							var discount_num_value = document.getElementsByName('discount_num_value')[0].value;
//							var result = H.util.isNull(discount_num_value);
//							var error = result[0];
//							var msg = result[1];
//							if(error){
//								DOM.addClass(promotionForm.discount_num_value,'text-error');
//								promotionControl.msg.hide();
//								DOM.html('#J_ParamsErrorMsg',msg);
//								if (ParamsErrorBox.css("display")==="none") {
//									ParamsErrorBox.slideDown();
//								}
//								return ;
//							}
//							var result = H.util.checkPrice(discount_num_value);
//							var error = result[0];
//							var msg = result[1];
//							if(error){
//								DOM.addClass(promotionForm.discount_num_value,'text-error');
//								promotionControl.msg.hide();
//								DOM.html('#J_ParamsErrorMsg',msg);
//								if (ParamsErrorBox.css("display")==="none") {
//									ParamsErrorBox.slideDown();
//								}
//								return ;
//							}
//						}
						var typeId = promotionForm.type_id.value;
						switch(typeId) {
								case '201':
					    		case '202':
					    		case '203':
									var discount_value = document.getElementsByName('discount_value')[0].value;
									var result = H.util.isNull(discount_value);
									var error = result[0];
									var msg = result[1];
									if(error){
										DOM.addClass(promotionForm.discount_value,'text-error');
										promotionControl.msg.hide();
										DOM.html('#J_ParamsErrorMsg',msg);
										if (ParamsErrorBox.css("display")==="none") {
											ParamsErrorBox.slideDown();
										}
										return ;
									}
									var result = H.util.checkDiscount(discount_value);
									var error = result[0];
									var msg = result[1];
									if(error){
										DOM.addClass(promotionForm.discount_value,'text-error');
										promotionControl.msg.hide();
										DOM.html('#J_ParamsErrorMsg',msg);
										if (ParamsErrorBox.css("display")==="none") {
											ParamsErrorBox.slideDown();
										}
										return ;
									}
								break;
								case '204':
					    		case '205':
					    		case '206':
								
								break;
								case '207':
					    		case '208':
					    		case '209':
										promotionControl.checkPost(0);
										if(promotionControl.free_post_num.length == 0){
											var str = "免邮地区未设置!!";
											promotionControl.msg.hide();
											DOM.html('#J_ParamsErrorMsg',str);
											if (ParamsErrorBox.css("display")==="none") {
												ParamsErrorBox.slideDown();
											}
											return ;
										}
								break;
							}
							
							//宝贝价格
							if (DOM.get('#J_is_item1').checked === true) {
							
								var item_price = document.getElementsByName('item_price')[0].value;
								var result = H.util.isNull(item_price);
								var error = result[0];
								var msg = result[1];
								if (error) {
									DOM.addClass(promotionForm.item_price, 'text-error');
									promotionControl.msg.hide();
									DOM.html('#J_ParamsErrorMsg', msg);
									if (ParamsErrorBox.css("display") === "none") {
										ParamsErrorBox.slideDown();
									}
									return;
								}
								var result = H.util.checkPrice(item_price);
								var error = result[0];
								var msg = result[1];
								if (error) {
									DOM.addClass(promotionForm.item_price, 'text-error');
									promotionControl.msg.hide();
									DOM.html('#J_ParamsErrorMsg', msg);
									if (ParamsErrorBox.css("display") === "none") {
										ParamsErrorBox.slideDown();
									}
									return;
								}
							}

					  		var sucessHandle = function(o) {
					 			promotionControl.msg.hide();
					 			ParamsErrorBox.hide();
					 			ParamsSucessBox = KISSY.one('#J_ParamsSucessBox')
					 			DOM.html('#J_ParamsSucessMsg','成功创建活动！');
								if (ParamsSucessBox.css("display")==="none") {
									ParamsSucessBox.slideDown();
								}
								DOM.scrollIntoView('#J_ParamsSucessMsg',window);
								window.location.href=o.desc;
					 		};
					 		var errorHandle = function(o){
					 			promotionControl.msg.hide();
								DOM.html('#J_ParamsErrorMsg',o.desc);
								if (ParamsErrorBox.css("display")==="none") {
									ParamsErrorBox.slideDown();
								}
								DOM.scrollIntoView('#J_ParamsErrorMsg',window);
								promotionControl.backCheckForm();
								 
					 		};
					 		var data = '';
					  	    new H.widget.asyncRequest().setURI(savePromoAjaxUrl).setMethod("POST").setForm('#promotion_edit_form').setHandle(sucessHandle).setErrorHandle(errorHandle).setData(data).send();
							return true;
	    			},
						/*将checkbox 值传过去*/
					checkForm : function(){
						var checks = DOM.filter(DOM.query('input'),function(i){if(i.type =='checkbox' && DOM.hasClass(i,'J_checkForm'))return true;})
						KISSY.each(checks,function(item){
							if(item.checked == false){
								item.checked = true;
								DOM.val(item,0);
							}
						})
					},
					/*将checkbox 值传回来*/
					backCheckForm : function(){
						var checks = DOM.filter(DOM.query('input'),function(i){if(i.type =='checkbox' && DOM.hasClass(i,'J_checkForm'))return true;})
						KISSY.each(checks,function(item){
							var v = DOM.val(item);
							if(v == 1){
								item.checked = true;
							}else{
								item.checked = false;
								DOM.val(item,1);
							}
						})
					},	
					/*免邮设置判断*/
					checkPost : function(num){
						promotionControl.free_post_areasId =[],promotionControl.free_post_areasName =[];promotionControl.free_post_num =[],promotionControl.free_post_name=[];
						var ex_ids = DOM.query('#J_youhui_'+num+' .J_ex_id');
						var ex_names = DOM.query('#J_youhui_'+num+' .J_ex_name');
						KISSY.each(ex_ids,function(it){
							if(!it.disabled){
								promotionControl.free_post_areasId.push(DOM.val(it));
							}else{
								promotionControl.free_post_num.push(DOM.val(it));
							}
						})
						KISSY.each(ex_names,function(item){
							if(!item.disabled){
								promotionControl.free_post_areasName.push(DOM.val(item));
							}else{
								promotionControl.free_post_name.push(DOM.val(item));
							}
						})
					},
					handleInputs : function(){
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
					}
				
					
		    	};
}, {
    requires: []
});