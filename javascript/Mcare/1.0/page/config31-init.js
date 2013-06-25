/**
 * @fileOverview 
 * @author  
 */
KISSY.add(function (S) {
	
	var S= KISSY,DOM = S.DOM, Event = S.Event;
	return CareControl = {
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
					var pos = CareControl.getCursorPosition(textarea);
					CareControl.add(textarea,pos,tem);
					CareControl.checkTitleLen(DOM.val('#J_CareBox'+data),data);
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
					CareControl.myCalendar('J_StartDate_change',CareControl.groupRule_num);
					CareControl.checkTitleLen(tem,'Change');
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
						CareControl.maxNum = ++CareControl.maxNum;
						var d = CareControl.maxNum;
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
					var str = DOM.val('#J_CareBox'+num);
					var Num = str.replace(/[^\x00-\xff]/g, "*").length ;
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
						DOM.hide(ParamsErrorBox);
//						if (ParamsSucessBox.css("display")==="none") {
//							ParamsSucessBox.slideDown();														
//						}
						CareControl.groupMini(num);
						DOM.attr('#J_Checkbox_'+num,'checked', true);
						//DOM.remove('#J_Max_Group_'+num);
					}
				});
				
				Event.on( '#J_CarePublic','click', CareControl.save);	
				
				var ladderLevels = DOM.val('#J_laddEditNum');
				if(ladderLevels>0){
					CareControl.ladder_num =ladderLevels  ;
					CareControl.ladders = [];
					for(var n = 0;n<ladderLevels;n++){
						CareControl.ladders.push(n);
					}
				}
				if(templetIndex>0){
					CareControl.groupRule_num = templetIndex;
				}
				//选择模板 统计字数
				Event.delegate(document, 'click', '.J_CheckBox', function(ev){
					var id = ev.currentTarget.id.replace('J_Checkbox_','J_Templet_');
					DOM.show('#J_MsgContentBox');
					var str = DOM.html('#'+id);
					var re = /(【收货人姓名】)|(【拍下日期】)|(【店铺名称】)|(【物流公司】)|(【物流单号】)|(【收货人城市】)|(【卡片名称】)|(【卡片数量】)|(【卡片有效期】)|(【卡片类型】)|(【买家昵称】)|(【买家姓名】)/g;
					
					var len = str.replace(re, "").replace(/[^\x00-\xff]/g, "*").length ;
					DOM.html(DOM.get('#J_Zs_NumFirst'), len);
		
				});				
				
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
				var re = /(【收货人姓名】)|(【拍下日期】)|(【店铺名称】)|(【物流公司】)|(【物流单号】)|(【收货人城市】)|(【卡片名称】)|(【卡片数量】)|(【卡片有效期】)|(【卡片类型】)|(【买家昵称】)|(【买家姓名】)/g;
//				/【[\u4e00-\u9fa5]+】/g
				var len = str.replace(re, "").replace(/[^\x00-\xff]/g, "*").length ;
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
				var RuleNum = CareControl.groupRule.length;
				CareControl.leftRule--
		    	DOM.html('#J_LeftRule',CareControl.leftRule);
				CareControl.groupRule_num++;
				for(var n = 0; n<RuleNum; n++){
					CareControl.groupMini(CareControl.groupRule[n]);
				}
				CareControl.groupRule.push(CareControl.groupRule_num);
				var a= KISSY.Template(DOM.html(DOM.get('#J_Templet_Group')));
				var data = {num:CareControl.groupRule_num};
				var b =a.render(data);
				DOM.insertBefore(DOM.create(b),DOM.get('#J_msg'));
				CareControl.myCalendar('J_StartDate'+CareControl.groupRule_num,CareControl.groupRule_num);
				
				CareControl.ladders.push(CareControl.ladder_num);
				var a= KISSY.Template(DOM.html(DOM.get('#J_Group_'+num)));
				var data = {num:CareControl.ladder_num};
				var b =a.render(data);
				DOM.append(DOM.create(b),DOM.get('#J_listLadder'));
				var len = CareControl.ladders.length;
				if(len >=1){
					for(var y =0; y<len ;y++){
						DOM.html(DOM.get('.J_paixu'+CareControl.ladders[y]),(y+1));
					}
					DOM.hide('#J_NoPlan');
				}else{
					DOM.show('#J_NoPlan');
				}
				CareControl.ladder_num++;	
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
					str ='<span style="color:#F00">未设置计划&nbsp;&nbsp;&nbsp;<a href="#2" onclick="CareControl.groupMaxi('+num+');" >[重新设置]</a></span>';
				}else{
					var str = '<p><input type="radio" value="" class="J_CheckBox" name="range_type" id="J_Checkbox_'+num+'">&nbsp;&nbsp;<span style="display:none;">时间：'+minTime+'</span>'+
							  '内容：<span class="J_Content" id="J_Templet_'+num+'">'+minMessage+'</span></p>';		
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
				CareControl.leftRule++
		    	DOM.html('#J_LeftRule',CareControl.leftRule);
				for(var i =0;i<CareControl.groupRule.length;i++){
					if(CareControl.groupRule[i] == num){
						CareControl.groupRule.splice(i,1);
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
				var postListParams = CareControl.generatePostTemple();
				
				if(CareControl.checkParams(postListParams)==true){
					return;
				}
				var listParamsJson = KISSY.JSON.stringify(postListParams);
				
				var careId = DOM.val('#J_CareId');
				var careType = DOM.val('#J_Type');
				ParamsErrorBox = KISSY.one('#J_ParamsErrorBox');
				ParamsSucessBox = KISSY.one('#J_ParamsSucessBox');
//				CareControl.msg.setMsg('正在提交中，请稍候').show();
		  		var sucessHandle = function(o) {
//		  			CareControl.msg.hide();
					ParamsErrorBox.hide();
					DOM.html('#J_ParamsSucessMsg','设置成功');
					if (ParamsSucessBox.css("display")==="none") {
						ParamsSucessBox.slideDown();
					}
					location.reload();
//		  			CareControl.msg.hide(3000);
		 		};
		 		var errorHandle = function(o){
//		 			CareControl.msg.hide();
		 			ParamsSucessBox.hide();
		 			DOM.html('#J_ParamsErrorMsg',o.desc);
					if (ParamsErrorBox.css("display")==="none") {
						ParamsErrorBox.slideDown();
					}
					return ;			 			
					//CareControl.msg.setMsg('<div class="point relative"><div class="point-w-1">'+o.desc+'</div></div>').showDialog();

		 		};
		 		var data = 'type='+careType+'&care_id='+careId+'&templets='+listParamsJson;
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
//					listPar.content = encodeURIComponent(CareControl.strProcess(content));
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
                return str.replace(/\\/g, '\\\\').replace(/\"/g, '\\"').replace(/[\t\n&]/g, '').replace(/%26/g, '&!');
			}
	}
   
}, {
    requires: []
});