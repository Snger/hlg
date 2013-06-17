KISSY.add(function(S,showPages,O){
	var S = KISSY,DOM = S.DOM, Event = S.Event;	
	return adjust = {
			itemIds : new Array(),
			itemArr : new Array(),
			panel : null,
		   	panelItemPaginator : null,
			panelPageNum : 8,
		   	msg : null,
		   	init : function() {
				Event.add('#J_CheckAll','click',function(){
					if(DOM.attr("#J_CheckAll",'checked')==true || DOM.attr("#J_CheckAll",'checked')=='checked'){
						DOM.attr(".J_CheckBox",'checked',true);
					}else{
						S.each(S.all(".J_CheckBox"), function(item, i) {
							item.checked = false;
						 });
					}
					return;
				});
				
				Event.add("#J_LoadItemsButton",'click',function(){
					var cats = new Array();
					var category = document.getElementsByName('category[]');
					S.each(S.all(category),function(item,i){
						if(item.checked == true){
							cats.push(item.value);
						}
					});
					if (cats.length==0) {
						alert('请选择要加载的分类！');
						return;
					}
					new H.widget.msgBox({ type: "error",
			            content: "正在提交，请稍候！",
						dialogType:"loading"
			        });
			        
					var submitHandle = function(o) {
						var items = o.payload.items;
						for(var i=0;i<items.length;i++){
							addOneLine(items[i]);
						}
						MSG.hide();
				    };
				    var errorHandle = function(o){
				    	MSG.hide();
				    	MSG.setMsg(o.desc).showDialog();
				    	return;
				    };
				    
					var data = 'isAjax=1&cats='+encodeURIComponent(JSON.stringify(cats));
					new H.widget.asyncRequest().setURI(getItemsByCatAjaxUrl).setMethod("POST")
								.setHandle(submitHandle)
								.setErrorHandle(errorHandle)
								.setData(data).send();
					return;
				});
				
				Event.add("#J_SubButton",'click',function(){
					if(adjust.itemIds.length == 0){
						alert('请添加宝贝！');
						return false;
					}
					new H.widget.msgBox({ type: "error",
				        content: "正在提交，请稍候！",
						dialogType:"loading"
				    });
					DOM.val("#J_ItemIds",adjust.itemIds.join(','));
					//DOM.val("#J_ItemArr",JSON.stringify(adjust.itemArr));
					//alert(JSON.stringify(itemArr));
					DOM.get("#J_ListForm").submit();
					return;
				});
			},
		
			openTbItemsDialog : function(){
				var sellerCats = DOM.html('#J_SellerCats');
				if(!adjust.panel){
					var bodyStr = '<div style="width:660px;height:500px;">'+
					'<div class="baobei-edit"><div class="new-baobei"><div class="seach" style="width:600px; height:26px;margin-top:10px;">'+
					'名称：<input type="text" id="J_SearchTitle" class="input-text" value="" size="26"/>'+
					'&nbsp;'+
					'		<select name="approveStatus" id="J_SearchSelling" class="noneReset haahha">'+
					'			<option value="1">销售中</option>'+
					'			<option value="2">仓库中</option>'+
					'		</select>'+
					'&nbsp;'+
					'		<select name="order" id="J_SelectItemOrder" class="noneReset">'+
					'			<option value="0">最晚下架</option>'+
					'			<option value="1">最快下架</option>'+
					'		</select>&nbsp;&nbsp;'+
					'<select name="cid" id="J_SelectItemCid" class="noneReset">'+
					sellerCats+
					'</select>'+
					'&nbsp;&nbsp;<a onclick="adjust.loadTbItems();">搜索</a>'+
					'</div>'+
					'<ul class="new-baobei-list">'+
					'<div style="width:20px;">&nbsp;</div>'+
					'<div style="width:80px;">&nbsp;</div>'+
					'<div style="width:200px;text-align:center;">名称</div>'+
					'<div style="width:80px;text-align:center;">已加入计划</div>'+
					'<div style="width:150px;text-align:center;">下架时间</div>'+
					'</ul>'+
			        '<ul class="new-baobei-list" id="J_ItemList"></ul>'+
			        '<div id="J_Paging" class="ui-page Rpage"></div>'+
			        '</div>';
					adjust.panel = new O.Dialog({
					      width: 660,
					      headerContent: '评分详情',
					      bodyContent: bodyStr,
					      mask: false,
					      align: {
					          points: ['cc', 'cc']
					      },
					      closable :true,
					      draggable: true,
					      aria:true
					});	
					adjust.panel.show();
				}
				adjust.panel.show();
			
			},
			totalChecked: function(elem) {
				if(DOM.attr(elem,'checked')==true || DOM.attr(elem,'checked')=='checked'){
					S.each(S.all(".J_TbCheckBox"),function(item,i){
						if(item.disabled!=true){
							item.checked = true;
						}
					});
				}else{
					S.each(S.all(".J_TbCheckBox"), function(item, i) {
						item.checked = false;
					 });
				}
				return;
			},
			
			loadTbItems : function() {
			   	var submitHandle = function(o) {
			   		adjust.msg.hide();           	
			    	totalRecords = o.payload.totalRecords;
					if(totalRecords > 0){
						DOM.get("#J_Paging").style.display = '';
					} else {
						DOM.get("#J_Paging").style.display = 'none';
			
						adjust.msg.hide();
						DOM.html(DOM.get('#J_ItemList'),'');
						return;
					}
					pageCount = Math.ceil(totalRecords/adjust.panelPageNum); 
					adjust.rederTbItems(o.payload.items);
					var handlePagination = function(turnTo) {
				    	var pageId = turnTo;
			    		var submitHandle = function(o) {
			    			adjust.msg.hide();
			    			totalRecords = o.payload.totalRecords;
			    			pageCount = Math.ceil(totalRecords/adjust.panelPageNum); 
			        	    adjust.rederTbItems(o.payload.items);
			        	    adjust.msg.hide();
			    	        adjust.panelItemPaginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_Paging',2);
				    	};
						var cid = DOM.val(DOM.get("#J_SelectItemCid")); //类目
						var type = DOM.val(DOM.get("#J_SearchSelling")); //出售中 库中
						var title = encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle"))); //标题
						var order = DOM.val(DOM.get("#J_SelectItemOrder")); 
		    			var data = "cid="+cid+"&type="+type+"&order="+order+"&q="+title+"&page_id="+pageId;
		    			adjust.msg = H.widget.msgBox({ type: "error",
					        content: "正在提交，请稍候！",
							dialogType:"loading"
					    });
			    	    new H.widget.asyncRequest().setURI(getItemsFromTbUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
					}
					adjust.panelItemPaginator = new showPages('adjust.panelItemPaginator').setRender(handlePagination).setPageCount(pageCount).printHtml('#J_Paging',2);
			   	};
			   	var errorHandle = function(o){
			    	adjust.msg.hide();
			    	adjust.msg.setMsg(o.desc).show();
			    	adjust.msg.hide();
			    };
			 	var cid = DOM.val(DOM.get("#J_SelectItemCid")); //类目
				var type = DOM.val(DOM.get("#J_SearchSelling")); //出售中 库中
	    		var title = encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle"))); //标题
				var order = DOM.val(DOM.get("#J_SelectItemOrder")); 
			
			    var data = "cid="+cid+"&type="+type+"&order="+order+"&q="+title+"&page_id=1";
			    adjust.msg = H.widget.msgBox({ type: "error",
			        content: "正在提交，请稍候！",
					dialogType:"loading"
			    });
			   	new H.widget.asyncRequest().setURI(getItemsFromTbUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			},
			rederTbItems: function(items) {
				var len = items.length;
				var els = '';
			
				for (var i=0; i<len; i++) {
					if(S.inArray(''+items[i].num_iid,adjust.itemIds)){
						var checked = 'checked="checked" ';
					}else{
						var checked = '';
					}
					
					if(items[i].add_plan_enabled=='0'){
						var enableCheck = 'disabled="disabled"';
						var showed = 'style="display:none"'; 
						var havePlan = '是';
					} else {
						var enableCheck = '';
						var showed = 'style="display:"';
						var havePlan = '否';
					}
					
					els += 
						'<li id="Ltr-'+items[i].num_iid+'">'+
						'<input type="hidden" id="J_item_title_'+items[i].num_iid+'" value="'+items[i].title+'" />'+
						'<input type="hidden" id="J_pic_url_'+items[i].num_iid+'" value="'+items[i].pic_url+'" />'+
						'<input type="hidden" id="J_list_time_'+items[i].num_iid+'" value="'+items[i].list_time+'" />'+
						'<input type="hidden" id="J_delist_time_'+items[i].num_iid+'" value="'+items[i].delist_time+'" />'+
						'<div style="width:20px;"><input type="checkbox" class="J_TbCheckBox" id="J_CB_'+items[i].num_iid+'" value="'+items[i].num_iid+'"' + checked + enableCheck+'/></div>'+
						'<div style="width:80px;"><a target="_blank" href="http://item.taobao.com/item.htm?id='+items[i].num_iid+'"><img height="30" width="40" src="'+items[i].pic_url+'"></img></a></div>'+
						'<div style="width:200px;">'+items[i].title+'</div>'+
						'<div style="width:80px;text-align:center;">'+havePlan+'</div>'+
						'<div style="width:150px;">'+items[i].delist_time+'</div>';
			 		els += '<div style="width:60px;"><a '+showed+'id="J_AddLink_'+items[i].num_iid+'" onclick="adjust.addItem(\''+items[i].num_iid+'\')" >添加</a>';
					els += '</div></li>';
				}
				els += '<li style="border-bottom:0;"><input type="checkbox" onclick="adjust.totalChecked(this);" id="J_TotalChecked"><label for="J_TotalChecked">&nbsp;&nbsp;全选</label>&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" class="btm-caozuo-gray" style="float:none;" onclick="adjust.addItems();" value="添加">&nbsp;<span id="J_AddItemsTip"></span></li>';
				DOM.html(DOM.get('#J_ItemList'),els);
		
			},
			addItem : function(num_iid){
				if(S.inArray(num_iid,adjust.itemIds)){
					return;
				}
				var title = DOM.val('#J_item_title_'+num_iid);
				var pic_url = DOM.val('#J_pic_url_'+num_iid);
				var itemUl = S.get("#J_ItemUl");
				var itemLi = "<li id='J_ItemLi_"+num_iid+"' class='list-item border-e4e4e4-b-d'><div class='list-div'><ul class='wc-detail-area'>";
				itemLi += '<li style="width:10%;"><input type="checkbox" class="J_CheckBox" name="ids[]" value="'+num_iid+'"/></li>'
				itemLi += '<li style="width:20%;"><a target="_blank" href="http://item.taobao.com/item.htm?id='+num_iid+'"><img height="30" width="40" src="'+pic_url+'"></img></a></li>';
				itemLi += '<li style="width:35%;">'+title+'</li>'; 
				itemLi += '<li style="width:20%;"><a onClick="adjust.delItem(\''+num_iid+'\')">删除</a></li>'
				var ele = new S.Node(itemLi);	
				DOM.append(ele, itemUl);
				adjust.itemIds.push(''+num_iid);
				DOM.text('#J_ItemTableNum', parseInt(DOM.text('#J_ItemTableNum'))+1);
				DOM.attr('#J_CB_'+num_iid, 'checked', true);
				DOM.html(DOM.parent(DOM.get('#J_AddLink_'+num_iid),'div'),'已添加');
				return; 
			},
			addItems : function(){
				DOM.html('#J_AddItemsTip','');
				S.each(S.all(".J_TbCheckBox"),function(item,i){
					if(item.checked){
						adjust.addItem(item.value);
					}
				});
				DOM.html('#J_AddItemsTip','添加成功！');
			},
			delItem : function(num_iid){
				DOM.remove('#J_ItemLi_'+num_iid);
				var ind = S.indexOf(num_iid,adjust.itemIds)
				if(ind!=-1){
					adjust.itemIds.splice(ind, 1);
				}
				DOM.text('#J_ItemTableNum', parseInt(DOM.text('#J_ItemTableNum')-1));
				return;
			},
			delItems : function(){
				S.each(S.all(".J_CheckBox"), function(item, i) {
					if(item.checked) {
						adjust.delItem(''+item.value);
					}
				});
			}
						
    	};
},{
	requires : ['utils/showPages/index','overlay']
});