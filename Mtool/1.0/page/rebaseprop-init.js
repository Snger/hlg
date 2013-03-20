/***
 * 
 * 批量改属性 item js
 * 
 * **/
KISSY.add(function(S,showPages){
		var S = KISSY,DOM = S.DOM, Event = S.Event;	
		return rebaseprop = {
	    	paginator : null,
	    	panel : null,
	    	msg : null,
			checkBoxs : null,  	
	    	init : function() {	
			
				rebaseprop.searchTbItems();	
				Event.on('#J_SelectItemCid',"change",function(S){
					rebaseprop.searchTbItems();
				})
				Event.on('#J_SearchBtn','click',rebaseprop.searchTbItems); //活动中宝贝全选   	 
			    Event.on('#J_TCheckAll','click',rebaseprop.CheckAll); //活动中宝贝全选   	    
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
					rebaseprop.paginator = new showPages('rebaseprop.paginator').setRender(rebaseprop.handlePagination).setPageCount(pageCount).printHtml('#J_BottomPaging',2);
					rebaseprop.paginator.printHtml('#J_TopPaging',3);
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
						rebaseprop.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_BottomPaging',2);
						rebaseprop.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_TopPaging',3);
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
				if(!rebaseprop.checkBoxs){
					var checkBoxs = DOM.query('#J_PromotionItemList .J_CheckBox');
				}else{
					var checkBoxs = rebaseprop.checkBoxs;
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
			//点击显示基本属性
			showContent : function(flag){
				DOM.toggle('#J_'+flag+'_Content');
				selectBaseprop = DOM.prop('#J_BasepropSelect','title');
				if(flag === 'FreightBear' && !DOM.prop('#J_FreightBear','checked')){
					DOM.prop('#J_FreightBear_Seller','checked',true);
					rebaseprop.freightBearSeller();
				}
				if(DOM.attr('#J_'+flag,'checked')){
					selectBaseprop += flag + ',';
   					DOM.prop('#J_BasepropSelect','title',selectBaseprop);
   					DOM.css('#J_PreviewBtm','display','');
   				} else {   					
   					var reg1 = new RegExp(flag+",","g");
   					selectBaseprop = selectBaseprop.replace(reg1,'');
   					DOM.prop('#J_BasepropSelect','title',selectBaseprop);
   					var inputs = DOM.query('#J_ChooseBasepropOption input');
   					var selectFlag = true;
   					for(var i=0;i<inputs.length;i++){
   						if(inputs[i].checked){
   							selectFlag = false;
   						}
   					}
   					if(selectFlag){
   						DOM.css('#J_PreviewBtm','display','none');
   					}
   				}
			},
			//卖家承担运费
			freightBearSeller : function(){
				DOM.prop('#J_ExpressTemplate','checked',false);
				DOM.css('#J_ExpressTemplate_Content','display','none');
				DOM.prop('#J_DeliveryCosts','checked',false);
				DOM.css('#J_DeliveryCosts_Content','display','none');
				var reg2 = new RegExp("ExpressTemplate,DeliveryCosts","g");
				selectBaseprop = selectBaseprop.replace(reg2,'');
				DOM.prop('#J_BasepropSelect','title',selectBaseprop);
			},
			//买家承担运费
			freightBearBuyer : function(){
				DOM.prop('#J_ExpressTemplate','checked',true);
				DOM.css('#J_ExpressTemplate_Content','display','');
				DOM.prop('#J_DeliveryCosts','checked',true);
				DOM.css('#J_DeliveryCosts_Content','display','');
				selectBaseprop += 'ExpressTemplate,DeliveryCosts';
				DOM.prop('#J_BasepropSelect','title',selectBaseprop);
			},
			//伪预览功能
			previewBaseprop : function(){
				new H.widget.msgBox({ type: "error",
		            content: "系统正在处理中",
					dialogType:"loading",
					autoClose:true,
					timeOut:3000
		           
		        });
			},
			//原基本信息——详情——弹窗
			basepropDetail : function(id){
				if(!showPermissions('editor_tool','工具箱')){return ;}
				if(isVersionPer('tool')){return ;}	
				var selectBaseprop = DOM.prop('#J_BasepropSelect','title');
				var shen = DOM.val('#a1');
				var shi = DOM.val('#a2');
//				var selectProvince = DOM.get("#a1").options[DOM.get("#a1").selectedIndex].text;
//				var selectCity = DOM.get("#a2").options[DOM.get("#a2").selectedIndex].text;
				if(selectBaseprop == ''){
					new H.widget.msgBox({
		                content: "请选择需要查看的基本属性",
		                type: "error"    
		            });
					return;
				}
//				if(selectProvince == '' || selectCity == ''){
//					selectProvince = '北京';
//					selectCity = '北京市';
//				}
				var json = [];
//				var o = '{"id":"' + id + '", "selectBaseprop":"' + selectBaseprop + '","selectProvince":"' + selectProvince + '","selectCity":"' + selectCity + '"}';
				var o = '{"id":"' + id + rebaseprop.getO() + '"}';
				o = eval('(' + o + ')');						
				json.push(o);
				var itemsJson = KISSY.JSON.stringify(json);
				var data = "items="+itemsJson+"&form_key="+FORM_KEY;
                var submitHandle = function(o) {
        	    	DOM.html('#J_PopDetial_'+id,o.desc);
        	    };
        	    var errorHandle = function(o){
        	    	new H.widget.msgBox({
					    title:"错误提示",
					    content:o.desc,
					    type:"error"
					});	
        	    };
				if(!DOM.prop('#J_BasepropDetial_'+id,'visible')){
					DOM.css('#J_BasepropDetial_'+id,'visibility','visible');
				}
				new H.widget.asyncRequest().setURI(getProtoBasepropDetailUrl).setMethod("POST").setForm('#J_Rebaseprop_Form').setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
				
			},
			//关闭详情弹窗
			closeDetialPop : function(id){
				DOM.css('#J_BasepropDetial_'+id,'visibility','hidden');
			},
			//查看现基本信息——弹窗
			viewBaseprop : function(id){
				if(!showPermissions('editor_tool','工具箱')){return ;}
				if(isVersionPer('tool')){return ;}	
				var selectBaseprop = DOM.prop('#J_BasepropSelect','title');
				if(selectBaseprop == ''){
					new H.widget.msgBox({
		                content: "请选择需要查看的基本属性",
		                type: "error"    
		            });
					return;
				}
				var json = [];
//				var o = '{"id":"' + id + '", "selectBaseprop":"' + selectBaseprop + '","selectProvince":"' + selectProvince + '","selectCity":"' + selectCity + '"}';
				var o = '{"id":"' + id + rebaseprop.getO() + '"}';
				o = eval('(' + o + ')');						
				json.push(o);
				var itemsJson = KISSY.JSON.stringify(json);
				var data = "items="+itemsJson+"&form_key="+FORM_KEY;
                var submitHandle = function(o) {
        	    	DOM.html('#J_PopView_'+id,o.desc);
        	    };
        	    var errorHandle = function(o){
        	    	new H.widget.msgBox({
					    title:"错误提示",
					    content:o.desc,
					    type:"error"
					});	
        	    };
				if(!DOM.prop('#J_ViewBaseprop_'+id,'visible')){
					DOM.css('#J_ViewBaseprop_'+id,'visibility','visible');
				}
				new H.widget.asyncRequest().setURI(getNewBasepropDetailUrl).setMethod("POST").setForm('#J_Rebaseprop_Form').setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
				
			},
			//关闭现基本信息弹窗
			closeViewPop : function(id){
				DOM.css('#J_ViewBaseprop_'+id,'visibility','hidden');
			},
			//还原基本属性
			revertBaseprop : function() {
				if(!rebaseprop.checkBoxs){
					var checkBoxs = DOM.query('#J_PromotionItemList .J_CheckBox');
				}else{
					var checkBoxs = rebaseprop.checkBoxs;
				}
				var len = checkBoxs.length;
				var m=0;
				for(i=0; i<len; i++){
					if(checkBoxs[i].checked){
						id = checkBoxs[i].value;
						var itemCats =DOM.html(DOM.get('#J_ProtoCats_'+id));
						DOM.html(DOM.get('#J_Cats_'+id), itemCats);
						m++;
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
			                return;
			             }			
			},
			//上传基本属性
			updateBaseprop : function(id) {
				if(!showPermissions('editor_tool','工具箱')){return ;}
				if(isVersionPer('tool')){return ;}	
				var selectBaseprop = DOM.prop('#J_BasepropSelect','title');
				var itemTitle = H.util.strProcess(DOM.val(DOM.get('#J_ItemTitle_'+id)));
				var pic_url = DOM.val(DOM.get('#J_ItemPic_'+id));
				if(selectBaseprop == ''){
					new H.widget.msgBox({
		                content: "请选择需要查看的基本属性",
		                type: "error"  
		            });
					return;
				}
//				if((DOM.attr('#J_ExpressTemplate','checked') && DOM.val('#J_ExpressTemplate_select')==0) || (DOM.attr('#J_AfterSalesTemplate','checked') && DOM.val('#J_AfterSalesTemplate_select')==0) ||(DOM.attr('#J_PodTemplate','checked') && DOM.val('#J_PodTemplate_select')==0)){
//					rebaseprop.msg.setMsg('<div class="point relative"><div class="point-w-1">有模板未选取，请检查！</div></div>').showDialog();
//					return;
//				}
				var json = [];
//				var o = '{"id":"' + id + '","title":"'+itemTitle + '", "selectBaseprop":"' + selectBaseprop + '","selectProvince":"' + selectProvince + '","selectCity":"' + selectCity + '", "pic_url":"' + pic_url + '"}';
				var o = '{"id":"' + id + '","title":"'+itemTitle + rebaseprop.getO() + '", "pic_url":"' + pic_url + '"}';
				o = eval('(' + o + ')');						
				json.push(o);
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
				new H.widget.asyncRequest().setURI(updateBasepropUrl).setMethod("POST").setForm('#J_Rebaseprop_Form').setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			},
			//批量上传基本属性
			addSelectItemsUpdateBaseprop : function() {
				if(!showPermissions('editor_tool','工具箱')){return ;}
				if(isVersionPer('tool')){return ;}	
//				if(showToCouUpdateDialog()){return ;}
				if(!rebaseprop.checkBoxs){
					var checkBoxs = DOM.query('#J_PromotionItemList .J_CheckBox');
				}else{
					var checkBoxs = rebaseprop.checkBoxs;
				}
				rebaseprop.msg = new H.widget.msgBox({ type: "error",
		            content: "系统正在处理中",
					dialogType:"loading"
		           
		        });
				var selectBaseprop = DOM.prop('#J_BasepropSelect','title');
				if(selectBaseprop == ''){
					rebaseprop.msg.hide();
					new H.widget.msgBox({
		                title: "",
		                content: "请选择需要查看的基本属性",
		                type: "error"  
		            });
					return;
				}
				var len = checkBoxs.length;
				var m=0;
				var json = [];
				for(i=0; i<len; i++){
					if(checkBoxs[i].checked && !checkBoxs[i].disabled){
						id = checkBoxs[i].value;
						var itemTitle = H.util.strProcess(DOM.val(DOM.get('#J_ItemTitle_'+id)));
						var pic_url = DOM.val(DOM.get('#J_ItemPic_'+id));
						var o = '{"id":"' + id + '","title":"'+itemTitle + rebaseprop.getO() + '", "pic_url":"' + pic_url + '"}';
						o = eval('(' + o + ')');						
						json.push(o);
						m++;
					}
				}
				if(m == 0){
					rebaseprop.msg.hide();
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
							rebaseprop.msg.hide();
                	 		new H.widget.msgBox({ 
					 			type: "sucess", 
					 			content: "成功修改",
								dialogType:"msg", 
								autoClose:true, 
								timeOut:3000
							});
        	    };
        	    var errorHandle = function(o){
					rebaseprop.msg.hide();
        	    	new H.widget.msgBox({
							    title:"错误提示",
							    content:o.desc,
							    type:"error"
					});	
        	    };
        	    new H.widget.asyncRequest().setURI(updateBasepropUrl).setMethod("POST").setForm('#J_Rebaseprop_Form').setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			},
			getO : function(){
				var selectBaseprop = DOM.prop('#J_BasepropSelect','title');
				var o = '", "selectBaseprop":"' + selectBaseprop;
				var shen = DOM.val('#a1');
				var shi = DOM.val('#a2');
				if(shen == 0){
					o += '","selectProvince":"'+encodeURIComponent('请选择')+'","selectCity":"'+encodeURIComponent('请选择');
				}else if(shi ==0){
					o += '","selectProvince":"'+encodeURIComponent(window.link.data[''+shen+''][0])+'","selectCity":"'+encodeURIComponent('请选择');
				}else{
					o += '","selectProvince":"'+encodeURIComponent(window.link.data[''+shen+''][0])+'","selectCity":"'+encodeURIComponent(window.link.data[''+shi+''][0]);
				}
		        return o;  
	
			}		
    	};
},{ requires: ['utils/showPages/index']});