/***
 * 
 * 批量改编码 item js
 * 
 * **/
KISSY.add(function(S,showPages){
		var S = KISSY,DOM = S.DOM, Event = S.Event;	
		return reouter = {
	    	paginator : null,
	    	panel : null,
	    	msg : null,
			checkBoxs : null,
			inputChangeFlag:null,
	    	init : function() {
				reouter.searchTbItems();
				Event.on('#J_SelectItemCid',"change",function(S){
					reouter.searchTbItems();
				});
				Event.on('#J_SearchBtn','click',reouter.searchTbItems); //活动中宝贝全选   	 
			    Event.on('#J_TCheckAll','click',reouter.CheckAll); //活动中宝贝全选   	    
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
					reouter.paginator = new showPages('reouter.paginator').setRender(reouter.handlePagination).setPageCount(pageCount).printHtml('#J_BottomPaging',2);
					reouter.paginator.printHtml('#J_TopPaging',3);
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
					reouter.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_BottomPaging',2);
					reouter.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_TopPaging',3);
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
				if(!reouter.checkBoxs){
					var checkBoxs = DOM.query('#J_PromotionItemList .J_CheckBox');
				}else{
					var checkBoxs = reouter.checkBoxs;
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
			//编辑的时候选中当前编辑项
			selectChangeItem : function(id){
				DOM.attr('#J_check'+id,'checked',true);
			},
			previewOuter : function(){
				
				reouter.inputChangeFlag = false;
					if(!DOM.attr('#J_PrefixSufix','checked') && !DOM.attr('#J_ReplaceType','checked') && !DOM.attr('#J_KeyType','checked')){
						new H.widget.msgBox({
			                title: "",
			                content: "请选择正确的修改方式！",
			                type: "error",
			                buttons: [{ value: "Ok"}],
							autoClose : true,
							timeOut : 1000
			                
			            });
						return;
					}
					if((DOM.attr('#J_PrefixSufix','checked')&&DOM.val('#J_Prefix')==''&&DOM.val('#J_Suffix')=='')||(DOM.attr('#J_ReplaceType','checked')&&(DOM.val('#J_Proto')==''||DOM.val('#J_Replace')==''))||(DOM.attr('#J_KeyType','checked')&&DOM.val('#J_KeyWord')=='')){
						
						new H.widget.msgBox({
			                title: "",
			                content: "已选项代码区域不能为空，请检查！",
			                type: "error",
			                buttons: [{ value: "Ok"}],
							autoClose : true,
							timeOut : 1000
			                
			            });
						return;
					}
				if(DOM.attr('#J_PrefixSufix','checked')){
					reouter.addItemOuterPrefixSufix()
				}
				if(DOM.attr('#J_ReplaceType','checked')){
					reouter.replaceOuter(1);
				} 
				if(DOM.attr('#J_KeyType','checked')){
					reouter.replaceOuter(2);
				}					
			},
			addItemOuterPrefixSufix : function() {
				if(!reouter.checkBoxs){
					var checkBoxs = DOM.query('#J_PromotionItemList .J_CheckBox');
				}else{
					var checkBoxs = reouter.checkBoxs;
				}
				var len = checkBoxs.length;
				var m=0;
				for(i=0; i<len; i++){
					if(checkBoxs[i].checked){
						id = checkBoxs[i].value;
						var prefix = DOM.val(DOM.get("#J_Prefix"));
						var suffix = DOM.val(DOM.get("#J_Suffix"));
						var itemOuter =DOM.val(DOM.get('#J_outer_'+id));
						var str = prefix+itemOuter+suffix;
						DOM.val(DOM.get('#J_outer_'+id), str);
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
			revertItemOuter : function() {
				if(!showPermissions('editor_tool','工具箱')){return ;}
				if(isVersionPer('tool')){return ;}	
				if(!reouter.checkBoxs){
					var checkBoxs = DOM.query('#J_PromotionItemList .J_CheckBox');
				}else{
					var checkBoxs = reouter.checkBoxs;
				}
				DOM.val(DOM.get('#J_Prefix'), '');
				DOM.val(DOM.get('#J_Suffix'), '');
				var len = checkBoxs.length;
				var m=0;
				for(i=0; i<len; i++){
					if(checkBoxs[i].checked){
						id = checkBoxs[i].value;
						var itemOuter =DOM.val(DOM.get('#J_ItemOuter_'+id));
						DOM.val(DOM.get('#J_outer_'+id), itemOuter);
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
			replaceOuter : function(type) {
				if(!reouter.checkBoxs){
					var checkBoxs = DOM.query('#J_PromotionItemList .J_CheckBox');
				}else{
					var checkBoxs = reouter.checkBoxs;
				}
				if(type == 1 ){
					var protoValue = DOM.val(DOM.get('#J_Proto'));
					var replaceValue = DOM.val(DOM.get('#J_Replace'));
				}else{
					var protoValue = DOM.val(DOM.get('#J_KeyWord'));
					var replaceValue = '';
				}
				var len = checkBoxs.length;
				var m=0;
				for(i=0; i<len; i++){
					if(checkBoxs[i].checked){
						id = checkBoxs[i].value;
						var itemOuter =DOM.val(DOM.get('#J_outer_'+id));
						var str = itemOuter;
						var reg = new RegExp(""+protoValue+"","g");
						str = str.replace(reg, ""+replaceValue+"");
						DOM.val(DOM.get('#J_outer_'+id), str);
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
			updateOuter : function(id) {
				if(!showPermissions('editor_tool','工具箱')){return ;}
				if(isVersionPer('tool')){return ;}	
				var itemOuter =DOM.val(DOM.get('#J_outer_'+id));
				var itemTitle = H.util.strProcess(DOM.val(DOM.get('#J_ItemTitle_'+id)));
				var pic_url = DOM.val(DOM.get('#J_ItemPic_'+id));
				var json = [];
				var o = '{"id":"' + id + '", "outer":"' + itemOuter + '","title":"'+itemTitle+ '", "pic_url":"' + pic_url+'"}';
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
        	    }
				new H.widget.asyncRequest().setURI(updateOuterUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			},
			addSelectItemsUpdateOuter : function() {
				if(!showPermissions('editor_tool','工具箱')){return ;}
				if(isVersionPer('tool')){return ;}	
				if(!reouter.checkBoxs){
					var checkBoxs = DOM.query('#J_PromotionItemList .J_CheckBox');
				}else{
					var checkBoxs = reouter.checkBoxs;
				}
//				if(!DOM.attr('#J_PrefixSufix','checked') && !DOM.attr('#J_ReplaceType','checked') && !DOM.attr('#J_KeyType','checked')){
//					reouter.msg.setMsg('<div class="point relative"><div class="point-w-1">请选择代码修改方式！</div></div>').showDialog();
//					return;
//				}
//				if((DOM.attr('#J_PrefixSufix','checked')&&DOM.val('#J_Prefix')==''&&DOM.val('#J_Suffix')=='')||(DOM.attr('#J_ReplaceType','checked')&&(DOM.val('#J_Proto')==''||DOM.val('#J_Replace')==''))||(DOM.attr('#J_KeyType','checked')&&DOM.val('#J_KeyWord')=='')){
//					reouter.msg.setMsg('<div class="point relative"><div class="point-w-1">已选项代码区域不能为空，请检查！</div></div>').showDialog();
//					return;
//				}
				if(reouter.inputChangeFlag){
						reouter.previewOuter();
				}
				reouter.msg = new H.widget.msgBox({ type: "error",
			                content: "系统正在处理中",
			 				dialogType:"loading"
			            });
				var len = checkBoxs.length;
				var m=0;
				var json = [];
				for(i=0; i<len; i++){
					if(checkBoxs[i].checked && !checkBoxs[i].disabled){
						id = checkBoxs[i].value;
						var itemOuter =DOM.val(DOM.get('#J_outer_'+id));
						var itemTitle = H.util.strProcess(DOM.val(DOM.get('#J_ItemTitle_'+id)));
						var pic_url = DOM.val(DOM.get('#J_ItemPic_'+id));
						var o = '{"id":"' + id + '", "outer":"' + itemOuter + '","title":"'+itemTitle+ '", "pic_url":"' + pic_url+'"}';
						o = eval('(' + o + ')');						
						json.push(o);
						m++;
					}
				}
				if(m == 0){
					reouter.msg.hide();	
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
                	reouter.msg.hide();
	        		 new H.widget.msgBox({ 
				 			type: "sucess", 
				 			content: "成功修改",
							dialogType:"msg", 
							autoClose:true, 
							timeOut:3000
						});
        	    };
        	    var errorHandle = function(o){
        	    	reouter.msg.hide();	
			    	new H.widget.msgBox({
					    title:"错误提示",
					    content:o.desc,
					    type:"error"
					});	
					return;
        	    };
				new H.widget.asyncRequest().setURI(updateOuterUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			}
	     }
     }, 
   {
		    requires: ['utils/showPages/index']
   });
