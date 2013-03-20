/**
 * @fileOverview 
 * @author  
 */
KISSY.add(function (S,showPages) {
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