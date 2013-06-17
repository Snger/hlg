/**
 * @fileOverview 
 * @author  
 */
KISSY.add(function (S,showPages,O) {
    // your code here
	var DOM = S.DOM, Event = S.Event;	
	
	return userControl = {
			paginator : null,
			panel:null,
			init : function() {
					userControl.searchTbItems()
					Event.on('#J_SearchMembers','click',userControl.searchTbItems);
					Event.on('#J_BatchDeleteMembers','click',userControl.addSelectItemsDeleteMembers);
					Event.on('#J_AllMembers','click',userControl.membersCheckAll); //活动中宝贝全选 
				    Event.on('#J_AddGroup','click',function(ev){
				    	if(!userControl.panel){
				    		userControl.panel = new O.Dialog({
							      width: 500,
							      headerContent: '增加客户',
							      bodyContent: '',
							      mask: false,
							      align: {
							          points: ['cc', 'cc']
							      },
							      closable :true,
							      draggable: true,
							      aria:true
					    		});
				    		
				    	}
				    	var str = DOM.html('#J_addGroup');
				    	userControl.panel.set('bodyContent',str);
				    	userControl.panel.show();
				    })

			},
		       //搜索淘宝宝贝
	        searchTbItems : function() {
                var submitHandle = function(o) {
	        	    totalRecords = o.payload.totalRecords;
					if(totalRecords > 0){
						DOM.get('#J_LEmpty').style.display = 'none';
						DOM.css(DOM.query(".J_ItemSelectBtnHolder"),'display' ,'');
					} else {
						DOM.get('#J_LEmpty').style.display = '';
						DOM.css(DOM.query(".J_ItemSelectBtnHolder"),'display' ,'none');
					}
					userControl.renderItems(o.payload.body);
					pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					userControl.paginator = new showPages('userControl.paginator').setRender(userControl.handlePagination).setPageCount(pageCount).printHtml('#J_Paging',2);
					userControl.paginator = new showPages('userControl.paginator').setRender(userControl.handlePagination).setPageCount(pageCount).printHtml('#J_TopPaging',3);
  					DOM.hide('#J_LeftLoading');
 					DOM.show('#J_MainLeftContent');
        	    };
        	    var errorHandle = function(o){
					new H.widget.msgBox({
					    title:"错误提示",
					    content:o.desc,
					    type:"error"
					});	
        	    	
        	    };
        	    if(DOM.val(DOM.get("#J_SearchBuyerNick")) != '输入买家昵称'){
        	    	var buyerNick = encodeURIComponent(DOM.val(DOM.get("#J_SearchBuyerNick"))); //买家昵称
        	    }else{
        	    	var buyerNick ='';
        	    }
        	    var groupId = DOM.val('#J_groupId');
        	    var tbGroupId = DOM.val('#J_tbGroupId');
        	    var type = DOM.val('#J_typeId');
//        	    var groupId = <?php echo $this->getGroupId()?>;
//        	    var tbGroupId = <?php echo $this->getTbGroupId()?>;
//        	    var type = <?php echo $this->getType()?>;
    	    	var itemPage = 10;//每页多少条
				DOM.show('#J_LeftLoading');
				DOM.hide('#J_MainLeftContent');
				var data ="buyer_nick="+buyerNick+"&group_id="+groupId+"&tb_group_id="+tbGroupId+"&pageSize="+itemPage+"&type="+type;
        	    new H.widget.asyncRequest().setURI(getItemsFromTbUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).setDataType('json').send();
			},
			// 渲染 TbItems
			renderItems: function(c) {
        	    DOM.html(DOM.get("#J_TbItemList"), c,true);
			},
			handlePagination : function(turnTo) {
		    	pageId = turnTo;
	    		var submitHandle = function(o) {
						DOM.attr('#J_AllMembers','checked',false);
	    			 totalRecords = o.payload.totalRecords;
					 if(totalRecords > 0){
						DOM.get('#J_LEmpty').style.display = 'none';
						DOM.css(DOM.query(".J_ItemSelectBtnHolder"),'display' ,'');
					} else {
						DOM.get('#J_LEmpty').style.display = '';
						DOM.css(DOM.query(".J_ItemSelectBtnHolder"),'display' ,'none');
					}
					 pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					 userControl.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_Paging',2);
					 userControl.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_TopPaging',3);
					 userControl.renderItems(o.payload.body);
  					 DOM.hide('#J_LeftLoading');
 					 DOM.show('#J_MainLeftContent');
		    	};
	    	   var errorHandle = function(o){
	    		   	DOM.hide('#J_LeftLoading');
					 DOM.show('#J_MainLeftContent');
					new H.widget.msgBox({
					    title:"错误提示",
					    content:o.desc,
					    type:"error"
					});	
        	    	
        	    };
		    	if(DOM.val(DOM.get("#J_SearchBuyerNick")) != '输入买家昵称'){
        	    	var buyerNick = encodeURIComponent(DOM.val(DOM.get("#J_SearchBuyerNick"))); //买家昵称
        	    }else{
        	    	var buyerNick ='';
        	    }
        	    var groupId = DOM.val('#J_groupId');
        	    var tbGroupId = DOM.val('#J_tbGroupId');
        	    var type = DOM.val('#J_typeId');		    	
    	    	var itemPage = 10;
				DOM.show('#J_LeftLoading');
				DOM.hide('#J_MainLeftContent');
    	    	var data = "buyer_nick="+buyerNick+"&group_id="+groupId+"&tb_group_id="+tbGroupId+"&page_id="+pageId+"&pageSize="+itemPage+"&type="+type;
        	    new H.widget.asyncRequest().setURI(getItemsFromTbUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			},
			
			addSelectItemsDeleteMembers : function() {
				checkBoxs = DOM.query("#J_TbItemList .J_CheckBox");
				var len = checkBoxs.length;
				var m=0;
				var json = [];
				var array = [];
				for(i=0; i<len; i++){
					if(checkBoxs[i].checked){
						id = checkBoxs[i].value;						
						array.push(id);						
						m++;
					}
				}
				if(m == 0){
					new H.widget.msgBox({
					    title:"错误提示",
					    content:'没有选择客户！',
					    type:"error",
						autoClose : true,
						timeOut : 1000
					});					
					DOM.show(DOM.query('.J_addItem'));
					DOM.hide(DOM.query('.J_adding'));
					return;
				}				 
				var itemsJson = array.join(',');
        	    var groupId = DOM.val('#J_groupId');
        	    var tbGroupId = DOM.val('#J_tbGroupId');
				var data = "items="+itemsJson+"&form_key="+FORM_KEY+"&group_id="+groupId+"&tb_group_id="+tbGroupId;
                var submitHandle = function(o) {
        	    	KISSY.later(function(){
        	    		if(userControl.paginator){
    						userControl.paginator.toPage(userControl.paginator.page);
    					}else{
    						userControl.searchTbItems();
    					}
            	    },1000,false)
					 new H.widget.msgBox({ 
					 			type: "sucess", 
					 			content: "删除成功",
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
				new H.widget.asyncRequest().setURI(batchDeleteMembersUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			},
			
			deleteMember : function(id) {	
				var json = []		 
				json.push(id);	
				var itemsJson = json.join(',');
        	    var groupId = DOM.val('#J_groupId');
        	    var tbGroupId = DOM.val('#J_tbGroupId');
				var data = "items="+itemsJson+"&form_key="+FORM_KEY+"&group_id="+groupId+"&tb_group_id="+tbGroupId;
                var submitHandle = function(o) {
        	    	KISSY.later(function(){
        	    		if(userControl.paginator){
    						userControl.paginator.toPage(userControl.paginator.page);
    					}else{
    						userControl.searchTbItems();
    					}
            	    },2000,false)
					 new H.widget.msgBox({ 
					 			type: "sucess", 
					 			content: "删除成功",
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
				new H.widget.asyncRequest().setURI(batchDeleteMembersUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			},
			//出售中宝贝全选
			membersCheckAll : function(e) {
				checkBoxs = DOM.query("#J_TbItemList .J_CheckBox");
				var len = checkBoxs.length;
				for(i=0; i<len; i++){
					var iid = checkBoxs[i].value;
					if(checkBoxs[i].disabled) continue;
					if(this.checked){
						checkBoxs[i].checked = true;
					} else {
						checkBoxs[i].checked = false;
					}
				}
			}

	}
}, {
    requires: ['utils/showPages/index','overlay']
});