/**
 * @fileOverview 
 * @author  
 */
KISSY.add(function (S,showPages) {
    // your code here
	var DOM = S.DOM, Event = S.Event;	
	
	return rename = {
			paginator : null,
	    	panel : null,
	    	msg : null,
	    	inputChangeFlag:null,
			checkBoxs : null,
		    	init : function() {
					rename.searchTbItems();
					Event.on('#J_SelectItemCid',"change",function(S){
						rename.searchTbItems();
					});
					Event.on('#J_SearchBtn','click',rename.searchTbItems); //搜索活动中宝贝  	 
				    Event.on('#J_TCheckAll','click',rename.CheckAll); //活动中宝贝全选   	    
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
							DOM.css(DOM.query(".J_ControlBtm") , 'display' , 'block');
						} else {
							DOM.css(DOM.get('#J_REmpty'), 'display' , '');
							DOM.css(DOM.query(".J_PromotionItemBtnHolder") , 'display' , 'none');
							DOM.css(DOM.query(".J_ControlBtm") , 'display' , 'none');
						}
						DOM.html('#J_PromotionItemList' ,o.payload.body);
						var oTriggers = DOM.query('#J_PromotionItemList .J_CheckBox');
						selectItemNum = 0;
						changeItemId = '';
			            Event.on(oTriggers,'click', function(ev){
							if(!this.checked){
								DOM.attr('#J_TCheckAll','checked',false);
							} else{
							}
						});
						var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
						rename.paginator = new showPages('rename.paginator').setRender(rename.handlePagination).setPageCount(pageCount).printHtml('#J_BottomPaging',2);
						rename.paginator.printHtml('#J_TopPaging',3);
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
			
						if(!rename.checkBoxs){
							var checkBoxs = DOM.query('#J_PromotionItemList .J_CheckBox');
						}else{
							var checkBoxs = rename.checkBoxs;
						}
						var len = checkBoxs.length;
						var changeItemIdArray = changeItemId.split(',');
						for(var x=0;x<len;x++){
							for(var y=0;y<changeItemIdArray.length;y++){
								if(changeItemIdArray[y] == checkBoxs[x].value){
									checkBoxs[x].checked = true;
								}
							}
						}
						var oTriggers = DOM.query('#J_PromotionItemList .J_CheckBox');
						Event.on(oTriggers,'click', function(ev){
							if(!this.checked){
								DOM.attr('#J_TCheckAll','checked',false);
							} else{
							}
						});
						var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
						rename.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_BottomPaging',2);
						rename.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_TopPaging',3);
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
					if(DOM.attr('#J_TCheckAll','checked')){
						DOM.prop('#J_TCheckAll','checked',false);
					}
				    new H.widget.asyncRequest().setURI(getItemsFromTbUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
				},
				//宝贝全选
				CheckAll : function(ev) {
					if(!rename.checkBoxs){
						var checkBoxs = DOM.query('#J_PromotionItemList .J_CheckBox');
					}else{
						var checkBoxs = rename.checkBoxs;
					}
					var len = checkBoxs.length;
			//		if(ev.currentTarget.checked){
			//			for(var a=0; a<len; a++){
			//				if(checkBoxs[a].checked){
			//					selectItemNum -=1;
			//					var reg = new RegExp(checkBoxs[a].value+",","g");
			//					changeItemId = changeItemId.replace(reg,'');
			//					DOM.prop('#J_SelectedItemNum','title',changeItemId);
			//				}
			//			}
			//			selectItemNum +=len;
			//			for(var b=0; b<len; b++){
			//				changeItemId += DOM.val(checkBoxs[b]) + ',';
			//				DOM.prop('#J_SelectedItemNum','title',changeItemId);
			//			}
			//		} else {
			//			selectItemNum -=len;
			//			for(var a=0; a<len; a++){
			//				var reg = new RegExp(checkBoxs[a].value+",","g");
			//				changeItemId = changeItemId.replace(reg,'');
			//				DOM.prop('#J_SelectedItemNum','title',changeItemId);
			//			}
			//		}
			//		DOM.text('#J_SelectedItemNum',selectItemNum);
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
				previewTitle : function(){
			
					rename.inputChangeFlag = false;
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
						rename.addItemTitlePrefixSufix()
					}
					if(DOM.attr('#J_ReplaceType','checked')){
						rename.replaceTitle(1);
					}
					if(DOM.attr('#J_KeyType','checked')){
						rename.replaceTitle(2);
					}
					
					
				},
				addItemTitlePrefixSufix : function() {
					if(!rename.checkBoxs){
						var checkBoxs = DOM.query('#J_PromotionItemList .J_CheckBox');
					}else{
						var checkBoxs = rename.checkBoxs;
					}
					var len = checkBoxs.length;
					var m=0;
					for(i=0; i<len; i++){
						if(checkBoxs[i].checked){
							id = checkBoxs[i].value;
							var prefix = DOM.val(DOM.get("#J_Prefix"));
							var suffix = DOM.val(DOM.get("#J_Suffix"));
							var itemTitle =DOM.val(DOM.get('#J_title_'+id));
							var str = prefix+itemTitle+suffix;
							DOM.val(DOM.get('#J_title_'+id), str);
							rename.checkTitleNotice(str,id);
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
				revertItemTitle : function() {
					if(!showPermissions('editor_tool','工具箱')){return ;}
					if(isVersionPer('tool')){return ;}					
					if(!rename.checkBoxs){
						var checkBoxs = DOM.query('#J_PromotionItemList .J_CheckBox');
					}else{
						var checkBoxs = rename.checkBoxs;
					}
					DOM.val(DOM.get('#J_Prefix'), '');
					DOM.val(DOM.get('#J_Suffix'), '');
					var len = checkBoxs.length;
					var m=0;
					for(i=0; i<len; i++){
						if(checkBoxs[i].checked){
							id = checkBoxs[i].value;
							var itemTitle =DOM.val(DOM.get('#J_ItemTitle_'+id));
							DOM.val(DOM.get('#J_title_'+id), itemTitle);
							rename.checkTitleNotice(itemTitle,id);
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
				//转义 正则
				escape : function(str){
					 if (str == null){
					 	return ""; 
					 } else{
			           return  str.replace(/\//g,'\\/').replace(/\./g,"\\.").replace(/\*/g,"\\*").replace(/\+/g,"\\+").replace(/\(/g,"\\(").replace(/\)/g,"\\)").replace(/\$/g,"\\$").replace(/\?/g,"\\?").replace(/\[/g,"\\[").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/\{/g,"\\{").replace(/\}/g,"\\}"); 
					}
					
				},
				replaceTitle : function(type) {
					if(!rename.checkBoxs){
						var checkBoxs = DOM.query('#J_PromotionItemList .J_CheckBox');
					}else{
						var checkBoxs = rename.checkBoxs;
					}
					if(type == 1 ){
						var protoValue = DOM.val(DOM.get('#J_Proto'));
						var replaceValue = DOM.val(DOM.get('#J_Replace'));
					}else{
						var protoValue = DOM.val(DOM.get('#J_KeyWord'));
						var replaceValue = '';
					}
					var escapeValue = rename.escape(protoValue)
					var len = checkBoxs.length;
					var m=0;
					for(i=0; i<len; i++){
						if(checkBoxs[i].checked){
							id = checkBoxs[i].value;
							var itemTitle =DOM.val(DOM.get('#J_title_'+id));
							var str = itemTitle;
							var reg = new RegExp(""+escapeValue+"","g");
							str = str.replace(reg, ""+replaceValue+"");
							DOM.val(DOM.get('#J_title_'+id), str);
							rename.checkTitleNotice(str,id);
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
				
				updateTitle : function(id) {
					if(!showPermissions('editor_tool','工具箱')){return ;}
					if(isVersionPer('tool')){return ;}	
					DOM.attr('#J_check'+id,'checked',true);
					var itemTitle =H.util.strProcess(DOM.val(DOM.get('#J_title_'+id)));
					var pic_url = DOM.val(DOM.get('#J_ItemPic_'+id));
					var json = [];
					var o = '{"id":"' + id + '", "title":"' + itemTitle + '", "pic_url":"' + pic_url + '"}';	
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
		 		};
					new H.widget.asyncRequest().setURI(updateTitleUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
				},			
				checkTitleLen : function(str ,id) {
					var len = str.replace(/[^\x00-\xff]/g,"**").length;
					if(len > 60){
						DOM.html(DOM.get('#J_Notice_'+id), '宝贝标题超过淘宝限制（30个汉字）');
						DOM.html(DOM.get('#J_Zs_'+id), '');	
						DOM.replaceClass('#J_Opertion_'+id,'J_Abled','J_DisAbled');
						DOM.attr('#J_check'+id,'disabled',true);
						return false;
			        }
					var len = 60-len;
					DOM.html(DOM.get('#J_Notice_'+id), '');
					DOM.html(DOM.get('#J_Zs_'+id), "还能输入"+len+"字符");
					DOM.replaceClass('#J_Opertion_'+id,'J_DisAbled','J_Abled');
					DOM.attr('#J_check'+id,'disabled',false);
				},
				checkTitleNotice : function(str ,id) {
					var len = str.replace(/[^\x00-\xff]/g,"**").length;
					if(len > 60){
						DOM.html(DOM.get('#J_Notice_'+id), '宝贝标题超过淘宝限制（30个汉字）');
						DOM.html(DOM.get('#J_Zs_'+id), '');	
						DOM.replaceClass('#J_Opertion_'+id,'J_Abled','J_DisAbled');
						DOM.attr('#J_check'+id,'disabled',true);
						
					}else{
						DOM.replaceClass('#J_Opertion_'+id,'J_DisAbled','J_Abled');
						DOM.attr('#J_check'+id,'disabled',false);
						var limitLen = 60-len;
						DOM.html(DOM.get('#J_Notice_'+id), '');
						DOM.html(DOM.get('#J_Zs_'+id), "还能输入"+limitLen+"字符");					
					}
				},
				addSelectItemsUpdateTitle : function() {
					if(!showPermissions('editor_tool','工具箱')){return ;}
					if(isVersionPer('tool')){return ;}
					if(!rename.checkBoxs){
						var checkBoxs = DOM.query('#J_PromotionItemList .J_CheckBox');
					}else{
						var checkBoxs = rename.checkBoxs;
					}
			//		if(!DOM.attr('#J_PrefixSufix','checked') && !DOM.attr('#J_ReplaceType','checked') && !DOM.attr('#J_KeyType','checked')){
			//			H.rename.msg.setMsg('<div class="point relative"><div class="point-w-1">请选择代码修改方式！</div></div>').showDialog();
			//			return;
			//		}
			//		if((DOM.attr('#J_PrefixSufix','checked')&&DOM.val('#J_Prefix')==''&&DOM.val('#J_Suffix')=='')||(DOM.attr('#J_ReplaceType','checked')&&(DOM.val('#J_Proto')==''||DOM.val('#J_Replace')==''))||(DOM.attr('#J_KeyType','checked')&&DOM.val('#J_KeyWord')=='')){
			//			H.rename.msg.setMsg('<div class="point relative"><div class="point-w-1">已选项代码区域不能为空，请检查！</div></div>').showDialog();
			//			return;
			//		}
					if(rename.inputChangeFlag){
						rename.previewTitle();
					}
					rename.msg = new H.widget.msgBox({ type: "error",
			                content: "系统正在处理中",
			 				dialogType:"loading"
			            });
					var len = checkBoxs.length;
					var m=0;
					var json = [];
					for(i=0; i<len; i++){
						if(checkBoxs[i].checked && !checkBoxs[i].disabled){
							id = checkBoxs[i].value;
							var itemTitle =H.util.strProcess(DOM.val(DOM.get('#J_title_'+id)));
							var pic_url = DOM.val(DOM.get('#J_ItemPic_'+id));
							titleLen = itemTitle.replace(/[^\x00-\xff]/g,"**").length;
							if(titleLen <= 60 ){							
								var o = '{"id":"' + id + '", "title":"' + itemTitle + '", "pic_url":"' + pic_url + '"}';
								o = eval('(' + o + ')');						
								json.push(o);
							}
							m++;
						}
					}
					if(m == 0){
						rename.msg.hide();
		 				new H.widget.msgBox({
									    title:"错误提示",
									    content:'未选择任何宝贝！',
									    type:"error",
										autoClose:true,
										timeOut :2000
									
									});
					
					return;
					}				
					var itemsJson = KISSY.JSON.stringify(json);
					var data = "items="+itemsJson+"&form_key="+FORM_KEY;
			        var submitHandle = function(o) {
			        		rename.msg.hide();
			        		 new H.widget.msgBox({ 
						 			type: "sucess", 
						 			content: "成功修改",
									dialogType:"msg", 
									autoClose:true, 
									timeOut:3000
								});
				    };
				    var errorHandle = function(o){
				    	rename.msg.hide();
				    	new H.widget.msgBox({
						    title:"错误提示",
						    content:o.desc,
						    type:"error"
						});	
						return;
				    };
					new H.widget.asyncRequest().setURI(updateTitleUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
				}
				}
}, {
    requires: ['utils/showPages/index']
});