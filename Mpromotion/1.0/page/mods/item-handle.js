/**
 * @fileOverview 
 * @author  
 */
KISSY.add(function (S) {
    // your code here
    return itemHandle = {
		
			strProcess : function(str) {
				return str.replace(/\\/g, '\\\\').replace(/\"/g, '\\"').replace(/[\t\n&]/g, '%26');
			},
			
			checkPrice : function(v){
				if (KISSY.isNumber(v) === false || v<=0) {
					return false;
				} else {
					return true;
				}
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
			},
			generalTgParams : function(id, error) {
				var r = [];
				var params = [];
				//获取定向营销活动参数
				result = itemHandle._generalTbSpecParams(id, error);
				
				paramsGeneral = result[0];
				var promoType = paramsGeneral[0];
				var promoValue = paramsGeneral[1];
				var decreaseNum = paramsGeneral[2];
				var error = result[1];
				if (error) {
					DOM.addClass(DOM.get('#J_PromoValue_'+id), 'text-error');
				} else {
					params.push(promoType);
					params.push(promoValue);
					var  promoStartTime = DOM.val(DOM.get('#J_Promo_Start_Time'));
					var  promoEndTime = DOM.val(DOM.get('#J_Promo_End_Time'));
					var  startNum = Number(DOM.val(DOM.get('#J_ItemParam_startNum_'+id)));
					var  minNum = Number(DOM.val(DOM.get('#J_ItemParam_minNum_'+id)));
					var  maxNum = Number(DOM.val(DOM.get('#J_ItemParam_maxNum_'+id)));
					var  maxBuy = Number(DOM.val(DOM.get('#J_ItemParam_maxBuy_'+id)));
					var  startAt = DOM.val(DOM.get('#J_ItemParam_startAt_'+id));
					var  EndAt = DOM.val(DOM.get('#J_ItemParam_endAt_'+id));
					var  lastBuy = DOM.val(DOM.get('#J_ItemParam_lastBuy_'+id));
					var  timeInterval = DOM.val(DOM.get('#J_ItemParam_time_interval_'+id));
					var tgType = DOM.val(DOM.get('#J_ItemParam_tgtype_'+id));
					if(!KISSY.isNumber(startNum) || startNum <0 ){
						new H.widget.msgBox({
									    title:"错误提示",
									    content:'团购初始参团人数必须大于等于0！',
									    type:"error"
									
									});
						DOM.get('#J_ItemParam_startNum_'+id).focus();
						DOM.addClass(DOM.get('#J_ItemParam_startNum_'+id), 'text-error');
						error = true;
					}else if(!KISSY.isNumber(minNum) || minNum <0 ){
						new H.widget.msgBox({
									    title:"错误提示",
									    content:'最少参团人数必须大于0！',
									    type:"error"
									
									});
						DOM.get('#J_ItemParam_minNum_'+id).focus();
						DOM.addClass(DOM.get('#J_ItemParam_minNum_'+id), 'text-error');
						error = true;
					}else if(!KISSY.isNumber(maxNum) || maxNum <0 || maxNum<minNum ){
						new H.widget.msgBox({
									    title:"错误提示",
									    content:'最大参团人数必须大于0且大于等于最小参团人数！',
									    type:"error"
									
									});
						DOM.get('#J_ItemParam_maxNum_'+id).focus();
						DOM.addClass(DOM.get('#J_ItemParam_maxNum_'+id), 'text-error');
						error = true;
					}else if(!KISSY.isNumber(maxBuy) || maxBuy <0 ){
						new H.widget.msgBox({
									    title:"错误提示",
									    content:'每人最大购买量必须大于0！',
									    type:"error"
									
									});
						DOM.get('#J_ItemParam_maxBuy_'+id).focus();
						DOM.addClass(DOM.get('#J_ItemParam_maxBuy_'+id), 'text-error');
						error = true;
					}else if(itemHandle.isNull(startAt)||!itemHandle.isDate(startAt)){
						new H.widget.msgBox({
									    title:"错误提示",
									    content:'团购开始时间必须为日期格式(例2010-01-01 18:00:00！',
									    type:"error"
									
									});
						DOM.get('#J_ItemParam_startAt_'+id).focus();
						DOM.addClass(DOM.get('#J_ItemParam_startAt_'+id), 'text-error');
						error = true;
					}else if(itemHandle.isNull(EndAt)||!itemHandle.isDate(EndAt)){
						new H.widget.msgBox({
									    title:"错误提示",
									    content:'团购结束时间必须为日期格式(例2010-01-01 18:00:00)）！',
									    type:"error"
									
									});
						DOM.get('#J_ItemParam_endAt_'+id).focus();
						DOM.addClass(DOM.get('#J_ItemParam_endAt_'+id), 'text-error');
						error = true;
					}else if(itemHandle.isNull(lastBuy)||!itemHandle.isDate(lastBuy)){
						new H.widget.msgBox({
									    title:"错误提示",
									    content:'付款截至时间必须为日期格式！',
									    type:"error"
									
									});
						DOM.get('#J_ItemParam_lastBuy_'+id).focus();
						DOM.addClass(DOM.get('#J_ItemParam_lastBuy_'+id), 'text-error');
						error = true;
					}else if(startAt < promoStartTime){
						new H.widget.msgBox({
									    title:"错误提示",
									    content:'团购开始时间不能早于活动开始时间'+promoStartTime+'！',
									    type:"error"
									
									});
						DOM.get('#J_ItemParam_startAt_'+id).focus();
						DOM.addClass(DOM.get('#J_ItemParam_startAt_'+id), 'text-error');
						error = true;
					}
				}
				params.push(startNum);
				params.push(minNum);
				params.push(maxNum);
				params.push(maxBuy);
				params.push(lastBuy);
				params.push(startAt);
				params.push(EndAt);
				params.push(decreaseNum);
				params.push(tgType);
				params.push(timeInterval);
				r.push(error);
				r.push(params);
				return r;
			},
			/**
			 * 定向营销参数
			 */
			_generalTbSpecParams : function (id, error) {
				var params = [];
				var isInt = DOM.get('#J_IsInt_'+id).value;
				var specPrice = Number(DOM.val(DOM.get('#J_SpecPrice_'+id)));
				var origPrice = Number(DOM.val(DOM.get('#J_ItemPrice_'+id)));
				var decreaseNum = Number(DOM.attr(DOM.get('#J_DecreaseNum_'+id),'title'));
				var isSku = Number(DOM.val(DOM.get('#J_IsSku_'+id)));
				var promoValue = 0;
				
				if(isSku == 1){
					var promoType = '1';
					promoValue = Number(DOM.val(DOM.get('#J_PromoValue_'+id)));
				}else{
					if (isInt != 0 || Number(DOM.val(DOM.get('#J_FinalType_'+id))) == 3) {
						var promoType = '0';
						promoValue = Number((origPrice - specPrice).toFixed(2));
					} else {
						var promoType = Number(DOM.get('#J_PromoType_'+id).value);
						
						if (promoType == '0') {
							promoValue = Number((origPrice - specPrice).toFixed(2));
						} else {
								promoValue = Number(DOM.val(DOM.get('#J_PromoValue_'+id)));						
						}
					}
				}
					//alert(promoValue);
				if ( specPrice >= origPrice || itemHandle.checkPrice(promoValue) === false || itemHandle.checkPrice(specPrice) == false) {
						new H.widget.msgBox({
								    title:"错误提示",
								    content:'特价金额有误（特价必须小于原价），请检查后再加入！',
								    type:"error"
								
								});
	    				error = true;
    			}	
				if (promoType == '0') {
					//促销方式元
					
					//if (type == 'tbspec' && isUmp ==1 ){
					if (type == 'tbspec' || type == 'tbspec_buyerLimit' || type == 'onetbspec' || type == 'tg'){
						
						
					}else{
						if(promoValue >Number((origPrice*0.3).toFixed(2))){
							new H.widget.msgBox({
								    title:"错误提示",
								    content:'优惠金额有误，折扣有效范围在 7.00~9.99之间！',
								    type:"error"
								
								});
							error = true;
						}
						
					}
					
				} else {
					//自动取整或着设置只有一件优惠，促销设置转成"元"无须判断
					
						//促销方式折七折以上限制
							if (type == 'tbspec' || type == 'tbspec_buyerLimit' ||  type == 'tg' || type == 'onetbspec') {
							//if (type == 'tbspec' && isUmp == 1) {
								//限购 不限制折扣
							}else {
								if (!KISSY.isNumber(promoValue) || promoValue < 7 || promoValue >= 10) {
									//DOM.get('#J_PromoValue_'+id).value = '';
									//DOM.get('#J_PromoValue_'+id).focus();
									new H.widget.msgBox({
									    title:"错误提示",
									    content:'传入了不合法或不正确的参数,有效范围在 7.00~9.99之间！',
									    type:"error"
									
									});
									DOM.addClass(DOM.get('#J_PromoValue_' + id), 'text-error');
									error = true;
								}
								else {
									var re = /(^[0-9]([.][0-9]{1,2})?$)|(^1[0-9]([.][0-9]{1,2})?$)|(^2[0-3]([.][0-9]{1,2})?$)|(^10([.]0{1,2})?$)/;
									if (!re.test(promoValue)) {
										//DOM.get('#J_PromoValue_'+id).value = '';
										//DOM.get('#J_PromoValue_'+id).focus();
										new H.widget.msgBox({
										    title:"错误提示",
										    content:'传入了不合法或不正确的参数,有效范围在 7.00~9.99之间！',
										    type:"error"
										
										});
										DOM.addClass(DOM.get('#J_PromoValue_' + id), 'text-error');
										error = true;
									}
								}
							}
				}
				promoValue.toFixed(2);
				params.push(promoType);
				params.push(promoValue);
				params.push(decreaseNum);
				return [params,error];
			},
			generalSpecParams : function(id, error) {
				var r = [];
				var params = [];
				//特价
				var promoPrice = Number(DOM.val(DOM.get('#J_PromoPrice_'+id)));
				if (itemHandle.checkPrice(promoPrice) === false) {
    				error = true;
    				DOM.addClass(DOM.get('#J_PromoPrice_'+id), 'text-error');
    			}
				params.push(promoPrice);
    			//skus特价
				if (DOM.get('#J_ItemSkus_'+id) == null) {
					params.push('');
					r.push(error);
					r.push(params);
					return r;
				}
				var skusProperties = DOM.val(DOM.get('#J_ItemSkus_'+id));
				var skusPropName = DOM.val(DOM.get('#J_PropsName_'+id));
				var skusPropValue = DOM.val(DOM.get('#J_PropsValue_'+id));

				var skus = [];
				var skuOrigPrices = '';
				var skuPromoPrices = '';
				var origPriceEls = DOM.query('#J_SkuTable_'+id+' .J_SkuOrigPrice');
				var promoPriceEls = DOM.query('#J_SkuTable_'+id+' .J_SkuPromoPrice');
				var len = origPriceEls.length;
				for (var i=0; i<len ;i++) {
    				spp = Number(promoPriceEls[i].value);
    				sop = Number(origPriceEls[i].value);
    				if ((itemHandle.checkPrice(spp) === false) || spp > sop) {
    					DOM.addClass(promoPriceEls[i], 'text-error');
    					error = true;
        			} else {
    					DOM.removeClass(promoPriceEls[i], 'text-error');
            		}
					skuPromoPrices += promoPriceEls[i].value + ',';
					skuOrigPrices += origPriceEls[i].value + ',';
				}
				
				skuOrigPrices = skuOrigPrices.substring(0, (skuOrigPrices.length-1));
				skuPromoPrices = skuPromoPrices.substring(0, (skuPromoPrices.length-1));
    			
				skus.push(skuOrigPrices);
				skus.push(skuPromoPrices);
				skus.push(skusProperties);
				skus.push(skusPropName);
				skus.push(skusPropValue);

				params.push(skus);

				r.push(error);
				r.push(params);
				return r;
			},
			generalTbSpecParams : function(id, error) {
				var r = [];
				var params = [];
				//获取定向营销活动参数
				result = itemHandle._generalTbSpecParams(id, error);
				params = result[0];
				var error = result[1];
				if (error) {
					DOM.addClass(DOM.get('#J_PromoValue_'+id), 'text-error');
				}
				r.push(error);
				r.push(params);
				return r;
			},
			/**
			 * 阶梯价
			 */
			generalJtjParams : function(id, error){
				var params = [];
				var isSku = DOM.val('#J_IsSku_'+id);
				var origPrice = Number(DOM.val(DOM.get('#J_ItemPrice_'+id)));
				var promoType = DOM.query('#J_PromoType_'+id+' .J_promoType');
				var promoValue = DOM.query('#J_PromoType_'+id+' .J_PromoValue');
				var promoIsInt = DOM.query('#J_PromoType_'+id+' .J_PromoIsInt');
				if(promoIsInt.length<=0){
					var isInt = DOM.get('#J_IsInt_'+id).value;
				}
				var len = promoValue.length;
				for(var m = 0; m<len;m++){
					if(promoIsInt.length>0){
						var isInt = Number(DOM.val(promoIsInt[m]));
					}
					if (isInt != 0) {
						var newType = '0';
						var idd = promoValue[m].id.replace('PromoValue', 'SpecPrice');
						var specPrice = Number(DOM.val(DOM.get('#'+idd)));
						newValue = Number((origPrice - specPrice).toFixed(2));
					}else{
						var newType = Number(DOM.val(promoType[m]));
						
						if (newType == '0') {
							var idd = promoValue[m].id.replace('PromoValue', 'SpecPrice');
							var specPrice = Number(DOM.val(DOM.get('#'+idd)));
							newValue = Number((origPrice - specPrice).toFixed(2));
						} else {
							newValue = Number(DOM.val(promoValue[m]));						
						}
					}
					if ( specPrice >= origPrice) {
	    				DOM.addClass(promoValue[m], 'text-error');
						new H.widget.msgBox({
									    title:"错误提示",
									    content:'特价金额有误（特价必须小于原价），请检查后再加入！',
									    type:"error"
									
									});
						error = true;
    				}	
					
					
					//促销方式折七折以上限制
					if(isSku == '1' || newType == '1'){
						if(!KISSY.isNumber(newValue) || newValue <= 0 || newValue >=10){
							DOM.addClass(promoValue[m], 'text-error');
								new H.widget.msgBox({
									    title:"错误提示",
									    content:'传入了不合法或不正确的参数,有效范围在 0.00~9.99之间！',
									    type:"error"
									
									});
							error = true;
						} else {
							var re = /(^[0-9]([.][0-9]{1,2})?$)|(^1[0-9]([.][0-9]{1,2})?$)|(^2[0-3]([.][0-9]{1,2})?$)|(^10([.]0{1,2})?$)/;
							if(!re.test(newValue)){
								new H.widget.msgBox({
									    title:"错误提示",
									    content:'传入了不合法或不正确的参数,有效范围在 0.00~9.99之间！',
									    type:"error"
									
									});
								//DOM.get('#J_PromoValue_'+id).value = '';
								//DOM.get('#J_PromoValue_'+id).focus();
								DOM.addClass(promoValue[m], 'text-error');
								error = true;
							}	
						}
					}else{
						if (itemHandle.checkPrice(newValue) === false) {
							DOM.addClass(promoValue[m], 'text-error');
		    				error = true;
		    			}
//						if(newValue >Number((origPrice*0.3).toFixed(2))){
//							promotionControl.msg.setMsg('<div class="point relative"><div class="point-w-1">优惠金额有误，减钱有效范围在 '+0+'~'+(origPrice*0.3).toFixed(2)+'之间!目前已优惠 '+newValue+'</div></div>').showDialog();
//							DOM.addClass(promoValue[m], 'text-error');
//							error = true;
//						}
					}
					if(error == true){
						break;
					}
					param = [newType,newValue];
					params.push(param);
				}
				
				return [error,params];
				
			},
		
		
	}
	
	
}, {
    requires: []
});