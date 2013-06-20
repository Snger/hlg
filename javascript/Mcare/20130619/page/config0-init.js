/*
combined files : 

page/config0-init

*/
/**
 * @fileOverview 
 * @author  
 */
KISSY.add('page/config0-init',function (S) {
	
	var S= KISSY,DOM = S.DOM, Event = S.Event;
	return CareControl = {
	    	statPaginator : null,
	    	recordPaginator : null,
			chart : null,
			init: function(){
				CareControl.maxNum = DOM.val('#J_MaxNum');
			//修改
			Event.delegate(document, 'click', '.J_CareEdit', function(ev){
				var data = DOM.attr(ev.currentTarget, 'data');
				DOM.val('#J_Status', data);
				DOM.attr('#J_Checkbox_' + data, 'checked', true);
				var tem = DOM.html('#J_Templet_' + data);
				CareControl.checkTitleLen(tem);
				DOM.val('#J_CareBox', tem);
				DOM.show('#J_CareContent');
				DOM.hide('#J_MsgContentBox');
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
				DOM.hide('#J_MsgContentBox');
			});
			//替换
			Event.delegate(document, 'click', '.J_AddReplace', function(ev){
				var tem = DOM.html(ev.currentTarget);
				var textarea = DOM.get('#J_CareBox')
				var pos = CareControl.getCursorPosition(textarea);
				CareControl.add(textarea,pos,tem);
				CareControl.checkTitleLen(DOM.val('#J_CareBox'));
			});
			
			Event.on( '#J_CarePublic','click', CareControl.save);
			//选择模板 统计字数
			Event.delegate(document, 'click', '.J_CheckBox', function(ev){
				var id = ev.currentTarget.id.replace('J_Checkbox_','J_Templet_');
				DOM.show('#J_MsgContentBox');
				DOM.hide('#J_CareContent');
				
				var str = DOM.html('#'+id);
				var len = str.replace(/【[\u4e00-\u9fa5]+】/g, "").replace(/[^\x00-\xff]/g, "*").length ;
				DOM.html(DOM.get('#J_Zs_Num2'), len);
	
			});				
			
		},
		checkTitleLen: function(str){
			var len = str.replace(/【[\u4e00-\u9fa5]+】/g, "").replace(/[^\x00-\xff]/g, "*").length ;
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
			if(CareControl.checkParams()==false){
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
	 		
	 		var postListParams = CareControl.generatePostTemple();
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
    requires: []
});
