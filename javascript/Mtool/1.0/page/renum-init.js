
KISSY.add(function (S,showPages) {
    // your code here
	var DOM = S.DOM, Event = S.Event;	
	return renum = {
	    	paginator : null,
	    	panel : null,
	    	msg : null,
			checkBoxs : null,
			previewed : false,
			init : function() {	
				Event.on('#J_SelectItemCid',"change",function(S){
					renum.searchTbItems();
				});
				renum.searchTbItems();
				Event.on('#J_SearchBtn','click',renum.searchTbItems); //搜索宝贝 
			    Event.on('#J_TCheckAll','click',renum.CheckAll); //活动中宝贝全选   	    
    		},
    		searchTbItems : function() {
		        var submitHandle = function(o) {
					DOM.hide('#J_RightLoading');
					DOM.show('#J_MainRightContent');
		    	    totalRecords = o.payload.totalRecords;
					DOM.css(DOM.get('#J_NoteIcon') ,'display','none');
					if(totalRecords > 0){
						DOM.css(DOM.get('#J_REmpty') ,'display','none');
						DOM.css(DOM.query(".J_PromotionItemBtnHolder") ,'display' , '');
					} else {
						DOM.css(DOM.get('#J_REmpty'), 'display' , '');
						DOM.css(DOM.query(".J_PromotionItemBtnHolder") , 'display' , 'none');
						DOM.css(DOM.query(".J_ControlBtm") , 'display' , 'none');
					}
					DOM.html('#J_PromotionItemList' ,o.payload.body);
					var oTriggers = DOM.query('#J_PromotionItemList .J_CheckBox');
					selectItemNum = 0;
		            Event.on(oTriggers, "click", function(ev){
						if(!this.checked){
							DOM.attr('#J_TCheckAll','checked',false);
							selectItemNum -=1;
						} else{
							selectItemNum +=1;
						}
						DOM.text('#J_SelectedItemNum',selectItemNum);
					});
					var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					renum.paginator = new showPages('renum.paginator').setRender(renum.handlePagination).setPageCount(pageCount).printHtml('#J_BottomPaging',2);
					renum.paginator.printHtml('#J_TopPaging',3);
			    };
		    	if(DOM.val(DOM.get("#J_SearchTitle")) != '关键字、商品链接、商品编码'){
			    	var title = encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle"))); //标题
			    }else{
			    	var title ='';
			    }
	    	 	var itemPage = DOM.val(DOM.get("#J_SelectItemPage"));//每页多少条
				var cid = DOM.val(DOM.get("#J_SelectItemCid")); //类目
		    	var type = DOM.val(DOM.get("#J_SearchSelling")); //出售中 库中
		    	var itemOrder = DOM.val(DOM.get("#J_SelectItemOrder"));//排序方式
		    	
		    	var data = "q="+title+"&cid="+cid+"&type="+type;
	        	    data +="&itemOrder="+itemOrder+"&pageSize="+itemPage;
		    	if (type == 0) {
					//价格区间
					var startPrice = DOM.val(DOM.get("#J_StartPrice"));
					var endPrice = DOM.val(DOM.get("#J_EndPrice"));
					data += "&start_price="+startPrice+"&end_price="+endPrice;
				}
				DOM.show('#J_RightLoading');
				DOM.hide('#J_MainRightContent');
				new H.widget.asyncRequest().setURI(getItemsFromTbUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			handlePagination : function(turnTo) {
		    	pageId = turnTo;
				var submitHandle = function(o) {
					DOM.attr('#J_TCheckAll','checked',false);
					DOM.hide('#J_RightLoading');
					DOM.show('#J_MainRightContent');
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
					renum.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_BottomPaging',2);
					renum.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_TopPaging',3);
		    	};
		    	 if(DOM.val(DOM.get("#J_SearchTitle")) != '关键字、商品链接、商品编码'){
			    	var title = encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle"))); //标题
			    }else{
			    	var title ='';
			    }
				var itemPage = DOM.val(DOM.get("#J_SelectItemPage"));//每页多少条
					var cid = DOM.val(DOM.get("#J_SelectItemCid")); //类目
			    	var type = DOM.val(DOM.get("#J_SearchSelling")); //出售中 库中
			    	var itemOrder = DOM.val(DOM.get("#J_SelectItemOrder"));//排序方式
			    	
			    	var data = "q="+title+"&cid="+cid+"&type="+type;
		        	    data +="&itemOrder="+itemOrder+"&pageSize="+itemPage+"&page_id="+pageId;
			    	if (type == 0) {
						//价格区间
						var startPrice = DOM.val(DOM.get("#J_StartPrice"));
						var endPrice = DOM.val(DOM.get("#J_EndPrice"));
						data += "&start_price="+startPrice+"&end_price="+endPrice;
					}
		        DOM.show('#J_RightLoading');
				DOM.hide('#J_MainRightContent');
			    new H.widget.asyncRequest().setURI(getItemsFromTbUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			//宝贝全选
			CheckAll : function(e) {
				if(!renum.checkBoxs){
					var checkBoxs = DOM.query('#J_PromotionItemList .J_CheckBox');
				}else{
					var checkBoxs = renum.checkBoxs;
				}
				var len = checkBoxs.length;
				if(e.currentTarget.checked){
					selectItemNum =len;
				} else {
					selectItemNum =0;
				}
				DOM.text('#J_SelectedItemNum',selectItemNum);
				for(i=0; i<len; i++){
					var iid = checkBoxs[i].value;
					if(checkBoxs[i].disabled) continue;
					if(this.checked){
						checkBoxs[i].checked = true;
					} else {
						checkBoxs[i].checked = false;
					}
				}
			} ,
			changeType : function(type){
				DOM.val('#J_Type',type);
				if(type == 1){
					DOM.attr('#J_ChangeNum','checked',true);
				}else if(type == 2){
					DOM.attr('#J_AddNum','checked',true);
				}else if(type == 3){
					DOM.attr('#J_DelNum','checked',true);
				}
			},
			previewNum : function(){
				renum.previewed = true;
				renum.changeNum();
			},
			changeNum : function(){
				if(!renum.checkBoxs){
					var checkBoxs = DOM.query('#J_PromotionItemList .J_CheckBox');
				}else{
					var checkBoxs = renum.checkBoxs;
				}
				if(!DOM.attr('#J_ChangeNum','checked') && !DOM.attr('#J_AddNum','checked') && !DOM.attr('#J_DelNum','checked')){
					new H.widget.msgBox({
		                title: "",
		                content: "请选择代码修改方式！",
		                type: "error",
		                buttons: [{ value: "Ok"}],
						autoClose:true,
						timeOut :1000
		               
		            });
					return false;
				}
				if((DOM.attr('#J_ChangeNum','checked')&&DOM.val('#J_Direct_Num')=='')||(DOM.attr('#J_AddNum','checked')&&DOM.val('#J_Add_Num')=='')||(DOM.attr('#J_DelNum','checked')&&DOM.val('#J_Del_Num')=='')){
					new H.widget.msgBox({
		                title: "",
		                content: "已选项代码区域不能为空，请检查！",
		                type: "error",
		                buttons: [{ value: "Ok"}],
						autoClose:true,
						timeOut :1000
		                
		            });
					return false;
				}
				var directNum = Number(DOM.val(DOM.get('#J_Direct_Num')));
				var addNum = Number(DOM.val(DOM.get('#J_Add_Num')));
				var delNum = Number(DOM.val(DOM.get('#J_Del_Num')));
				var minNum = Number(DOM.val(DOM.get('#J_Min_Num')));
				var type = DOM.val(DOM.get('#J_Type'));
				var len = checkBoxs.length;
				var m=0;
				if(type == 1){
					for(var i=0; i<len; i++){
						if(checkBoxs[i].checked){
							id = checkBoxs[i].value;
							if (DOM.get('#J_ItemSkus_' + id) == null) {
								DOM.val(DOM.get('#J_new_item_num_'+id), directNum);
								renum.checkNumNotice(directNum,id,1);
								m++;
							}else{
								var origPriceEls = DOM.query('#J_SkuTable_'+id+' .J_SkuOrigNum');
								var promoPriceEls = DOM.query('#J_SkuTable_'+id+' .J_SkuPromoPrice');
								var slen = origPriceEls.length;
								for (var n=0; n<slen ;n++) {
				    				spp = Number(promoPriceEls[n].value);
				    				sop = Number(origPriceEls[n].value);
									promoPriceEls[n].value = directNum;
									m++;
								}
								renum.checkNumNotice(directNum,id,1);
							}	
							
							
						}
					}
				}
				if (type == 2) {
					for (var i = 0; i < len; i++) {
						if (checkBoxs[i].checked) {
							id = checkBoxs[i].value;
							if (DOM.get('#J_ItemSkus_' + id) == null) {
								var protoNum = Number(DOM.val(DOM.get('#J_ItemNum_' + id)));
								var num = protoNum + addNum;
								DOM.val(DOM.get('#J_new_item_num_' + id), num);
								renum.checkNumNotice(num, id,1);
								m++;
							}
							else {
								var origPriceEls = DOM.query('#J_SkuTable_' + id + ' .J_SkuOrigNum');
								var promoPriceEls = DOM.query('#J_SkuTable_' + id + ' .J_SkuPromoPrice');
								var slen = origPriceEls.length;
								for (var n= 0; n < slen; n++) {
									sop = Number(origPriceEls[n].value);
									spp = sop + addNum
									promoPriceEls[n].value = spp;
									if ((H.util.checkPrice(spp)[0] && spp!=0) || (spp > 999999 || spp < 0)) {
										DOM.html(DOM.get('#J_Notice_' + id), '亲，库存范围为0-999999！');
										DOM.addClass(promoPriceEls[n], 'text-error');
										DOM.replaceClass('#J_Opertion_' + id, 'J_Abled', 'J_DisAbled');
										DOM.attr('#J_check' + id, 'disabled', true);
										DOM.css('#J_Zs_' + id, 'display', 'none');
									}
									m++;
								}
							}
						}
					}
				}
				if(type == 3){
					for(var i=0; i<len; i++){
						if(checkBoxs[i].checked){
							id = checkBoxs[i].value;
							if (DOM.get('#J_ItemSkus_' + id) == null) {
								var protoNum = Number(DOM.val(DOM.get('#J_ItemNum_'+id)));
								var num = protoNum-delNum;
								if(!H.util.checkPrice(minNum)[0]){
								  num =	num > minNum ? num : minNum;
								} 
								num = num > 1 ? num : 1;
								DOM.val(DOM.get('#J_new_item_num_'+id), num);
								renum.checkNumNotice(num,id,1);
								m++;
							}else{
								var origPriceEls = DOM.query('#J_SkuTable_'+id+' .J_SkuOrigNum');
								var promoPriceEls = DOM.query('#J_SkuTable_'+id+' .J_SkuPromoPrice');
								var slen = origPriceEls.length;
								for (var n=0; n<slen ;n++) {
				    				sop = Number(origPriceEls[n].value);
									spp = sop-delNum
									
									if(!H.util.checkPrice(minNum)[0]){
									  spp =	spp > minNum ? spp : minNum;
									} 
									spp = spp > 1 ? spp : 1;
									promoPriceEls[n].value = spp;
									if((H.util.checkPrice(spp)[0] && spp!=0) || (spp > 999999 || spp < 0)){
										DOM.html(DOM.get('#J_Notice_'+id), '亲，库存范围为0-999999！');
										DOM.addClass(promoPriceEls[n], 'text-error');
										DOM.replaceClass('#J_Opertion_'+id,'J_Abled','J_DisAbled');
										DOM.attr('#J_check'+id,'disabled',true);
										DOM.css('#J_Zs_'+id,'display','none');
									}
									m++;
								}
							}
						}
					}
				}
				if(m == 0){
						new H.widget.msgBox({
								    title:"错误提示",
								    content:'未选择任何宝贝！',
								    type:"error",
									autoClose:true,
									timeOut :1000
								
								});
				
				return false;
				}
				return true;
			},
			checkNumNotice : function(el ,id,type) {
				if(type == 1 ){
					var str = Number(el);	
				}else{
					var str = Number(el.value);	
				}
				if((H.util.checkPrice(str)[0] && str!=0) || (str > 999999 || str < 0)){
					DOM.html(DOM.get('#J_Notice_'+id), '亲，库存范围为0-999999！');
					DOM.addClass(el, 'text-error');
					DOM.replaceClass('#J_Opertion_'+id,'J_Abled','J_DisAbled');
					DOM.attr('#J_check'+id,'disabled',true);
					DOM.css('#J_Zs_'+id,'display','none');
					return ;
				}			
				DOM.html(DOM.get('#J_Notice_'+id), '');
				DOM.replaceClass('#J_Opertion_'+id,'J_DisAbled','J_Abled');
				DOM.attr('#J_check'+id,'disabled',false);
				DOM.css('#J_Zs_'+id,'display','none');
				DOM.removeClass(el, 'text-error');
			},
			//单个上传
			updateNum : function(id) {
				if(!showPermissions('editor_tool','工具箱')){return ;}
				if(isVersionPer('tool')){return ;}	
				DOM.attr('#J_check'+id,'checked',true);
				var r = renum.generalSpecParams(id);
				var itemTitle = H.util.strProcess(DOM.val(DOM.get('#J_ItemTitle_'+id)));
				var pic_url = DOM.val(DOM.get('#J_ItemPic_'+id));
				var	error = r[0];
				var params = r[1];
					paramsStr = ', "params":' + KISSY.JSON.stringify(params);
				var json = [];
				if (error === false) {
					var o = '{"id":"' + id + '"'+ paramsStr + ',"title":"'+itemTitle+ '", "pic_url":"' + pic_url+'"}';
					o = eval('(' + o + ')');
		        	json.push(o);
				}else{
					return ;
				}		
				var itemsJson = KISSY.JSON.stringify(json);
				var data = "items="+itemsJson+"&form_key="+FORM_KEY;	
		        var submitHandle = function(o) {
		        	  new H.widget.msgBox({ 
				 			type: "sucess", 
				 			content: "成功修改",
							dialogType:"msg", 
							autoClose:true, 
							timeOut:3000
						});
			    };
			    var errorHandle = function(o){
					new H.widget.msgBox({
						    title:"错误提示",
						    content:o.desc,
						    type:"error"
						});	
					return;
			    };
				new H.widget.asyncRequest().setURI(updateTitleUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			},			
			//批量上传
			addSelectItemsUpdateNum : function() {
				if(!showPermissions('editor_tool','工具箱')){return ;}
				if(isVersionPer('tool')){return ;}	
				if(!renum.checkBoxs){
					var checkBoxs = DOM.query('#J_PromotionItemList .J_CheckBox');
				}else{
					var checkBoxs = renum.checkBoxs;
				}
		//		if(!DOM.attr('#J_ChangeNum','checked') && !DOM.attr('#J_AddNum','checked') && !DOM.attr('#J_DelNum','checked')){
		//			H.renum.msg.setMsg('<div class="point relative"><div class="point-w-1">请选择代码修改方式！</div></div>').showDialog();
		//			return;
		//		}
		//		if((DOM.attr('#J_ChangeNum','checked')&&DOM.val('#J_Direct_Num')=='')||(DOM.attr('#J_AddNum','checked')&&DOM.val('#J_Add_Num')=='')||(DOM.attr('#J_DelNum','checked')&&DOM.val('#J_Del_Num')=='')){
		//			H.renum.msg.setMsg('<div class="point relative"><div class="point-w-1">已选项代码区域不能为空，请检查！</div></div>').showDialog();
		//			return;
		//		}
				if(renum.previewed){
					var flag = renum.changeNum();
					if(!flag){
						return ;
					}
				}
				renum.msg = new H.widget.msgBox({ type: "error",
	                content: "系统正在处理中",
	 				dialogType:"loading"
	            });
				var len = checkBoxs.length;
				var m=0;
				var json = [];
				for(i=0; i<len; i++){
					if(checkBoxs[i].checked && !checkBoxs[i].disabled){
						id = checkBoxs[i].value;
						var r = renum.generalSpecParams(id);
						var itemTitle = H.util.strProcess(DOM.val(DOM.get('#J_ItemTitle_'+id)));
						var pic_url = DOM.val(DOM.get('#J_ItemPic_'+id));
						var	error = r[0];
						var params = r[1];
							paramsStr = ', "params":' + KISSY.JSON.stringify(params);
						if (error === false) {
							var o = '{"id":"' + id + '"'+ paramsStr + ',"title":"'+itemTitle+ '", "pic_url":"' + pic_url+'"}';
							o = eval('(' + o + ')');
			            	json.push(o);
						}else{
							return ;
						}
						m++;
					}
				}
				if(m == 0){
					
					renum.msg.hide();
						new H.widget.msgBox({
								    title:"错误提示",
								    content:'未选择任何宝贝！',
								    type:"error",
									autoClose:true,
									timeOut :1000
								
								});
						return;
				}
				var itemsJson = KISSY.JSON.stringify(json);
				var data = "items="+itemsJson+"&form_key="+FORM_KEY;
		
		        var submitHandle = function(o) {
						DOM.attr('#J_TCheckAll','checked',false);
						renum.msg.hide();
		        	 	new H.widget.msgBox({ 
				 			type: "sucess", 
				 			content: "成功修改",
							dialogType:"msg", 
							autoClose:true, 
							timeOut:3000
						});
			    };
			    var errorHandle = function(o){
						renum.msg.hide();
			    		new H.widget.msgBox({
						    title:"错误提示",
						    content:o.desc,
						    type:"error"
						});	
					return;
			    };
				new H.widget.asyncRequest().setURI(updateTitleUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			},
			toggleSku : function(id) {
				var skuTable = DOM.get('#J_SkuTable_'+id);
				if (DOM.hasClass(skuTable, 'ks-hidden')) {
					DOM.removeClass(skuTable, 'ks-hidden');
				} else {
					DOM.addClass(skuTable, 'ks-hidden');
				}
				
			},
			generalSpecParams : function(id) {
				var r = [];
				var params = [];
				var error = false;
				if (DOM.get('#J_ItemSkus_'+id) == null) {
					var itemNum =  Number(DOM.val(DOM.get('#J_new_item_num_'+id)));
					if((H.util.checkPrice(itemNum)[0] && itemNum!=0) || (itemNum > 999999 || itemNum < 0)){
						DOM.html(DOM.get('#J_Notice_'+id), '亲，库存范围为0-999999！');
						DOM.addClass('#J_new_item_num_'+id, 'text-error');
						DOM.replaceClass('#J_Opertion_'+id,'J_Abled','J_DisAbled');
						DOM.attr('#J_check'+id,'disabled',true);
						DOM.css('#J_Zs_'+id,'display','none');
						error = true ;
					}		
					params.push(itemNum);
					r.push(error);
					r.push(params);
					return r;
				}else{
					var skusProperties = DOM.val(DOM.get('#J_ItemSkus_'+id));
					var skusPropName = DOM.val(DOM.get('#J_PropsName_'+id));
					var skusPropValue = H.util.strProcess(DOM.val(DOM.get('#J_PropsValue_'+id)));
		
					var skus = [];
					var skuOrigPrices = '';
					var skuPromoPrices = '';
					var origPriceEls = DOM.query('#J_SkuTable_'+id+' .J_SkuOrigNum');
					var promoPriceEls = DOM.query('#J_SkuTable_'+id+' .J_SkuPromoPrice');
					var len = origPriceEls.length;
					for (var i=0; i<len ;i++) {
						spp = Number(promoPriceEls[i].value);
						sop = Number(origPriceEls[i].value);
						if((H.util.checkPrice(spp)[0] && spp!=0) || (spp > 999999 || spp < 0)){
							DOM.html(DOM.get('#J_Notice_'+id), '亲，库存范围为0-999999！');
							DOM.addClass(promoPriceEls[i], 'text-error');
							DOM.replaceClass('#J_Opertion_'+id,'J_Abled','J_DisAbled');
							DOM.attr('#J_check'+id,'disabled',true);
							DOM.css('#J_Zs_'+id,'display','none');
							error = true ;
							r.push(error);
							r.push(params);
							return r;
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
				}
				DOM.html(DOM.get('#J_Notice_'+id), '');
				DOM.replaceClass('#J_Opertion_'+id,'J_DisAbled','J_Abled');
				DOM.attr('#J_check'+id,'disabled',false);
				DOM.css('#J_Zs_'+id,'display','none');
				DOM.removeClass(el, 'text-error');
			}
};
},{
    requires: ['utils/showPages/index']
});