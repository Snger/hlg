/**
 * @fileOverview 
 * @author  
 */
KISSY.add(function (S,showPages) {
	
	var S= KISSY,DOM = S.DOM, Event = S.Event;
	return MemberList = {
	    	paginator : null,
	    	msg :null,
	    	isFisrst : true,
	    	init : function() {
				Event.on("#J_LeftSearch", "click", function(){
					MemberList.searchTbItems();
				});
				Event.on(doc, 'keydown', function(evt) {
					if ( evt.which === 13) {
						if(MemberList.paginator){
							MemberList.paginator.toPage(MemberList.paginator.page);
						}else{
							MemberList.searchTbItems();
						}
					}
				})
				MemberList.searchTbItems();
	        },
	        searchTbItems : function() {
		        
	            var submitHandle = function(o) {
					DOM.hide('#J_LeftLoading');
					DOM.show('#J_MainLeftContent');
	        	    totalRecords = o.payload.totalRecords;
					if(totalRecords > 0){
						DOM.css(DOM.get('#J_LEmpty') ,'display','none');
						DOM.css(DOM.query(".J_ItemSelectBtnHolder") ,'display' , '');
					} else {
						DOM.css(DOM.get('#J_LEmpty'), 'display' , '');
						DOM.css(DOM.query(".J_ItemSelectBtnHolder") , 'display' , 'none');
					}
					MemberList.renderItems(o.payload.body);
					var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					MemberList.paginator = new showPages('MemberList.paginator').setRender(MemberList.handlePagination).setPageCount(pageCount).printHtml('#J_Paging',2);
	    	    };
	    	    var data = MemberList.getData();
	 			DOM.show('#J_LeftLoading');
				DOM.hide('#J_MainLeftContent');
	    	    new H.widget.asyncRequest().setURI(loadTbItemsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			renderItems: function(c) {
	    	    DOM.html(DOM.get("#J_TbItemList"), c);
	        	
			},
			
	    	handlePagination : function(turnTo) {
		    	var pageId = turnTo;
	    		var submitHandle = function(o) {
	    			 totalRecords = o.payload.totalRecords;
	 				if(totalRecords > 0){
	 					DOM.css(DOM.get('#J_LEmpty') ,'display','none');
	 					DOM.css(DOM.query(".J_ItemSelectBtnHolder") ,'display' , '');
	 				} else {
	 					DOM.css(DOM.get('#J_LEmpty'), 'display' , '');
	 					DOM.css(DOM.query(".J_ItemSelectBtnHolder") , 'display' , 'none');
	 				}
	 				var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
	 				MemberList.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_Paging',2);
	 				MemberList.renderItems(o.payload.body);
	 				DOM.hide('#J_LeftLoading');
					DOM.show('#J_MainLeftContent');
		    	};
		    	var data = MemberList.getData();
				data +="&page_id="+pageId;
				DOM.show('#J_LeftLoading');
				DOM.hide('#J_MainLeftContent');
	    	    new H.widget.asyncRequest().setURI(loadTbItemsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			getData : function(){
    	    	if(DOM.val(DOM.get("#J_SearchNick")) != '输入旺旺名称'){
   	    	    	var nick = encodeURIComponent(DOM.val(DOM.get("#J_SearchNick"))); //标题
   	    	    }else{
   	    	    	var nick ='';
   	    	    }
   	    	    var data = "nick="+nick;
   	    	    if(DOM.val(DOM.get("#J_SearchName")) != '输入姓名'){
   	    	    	var name = encodeURIComponent(DOM.val(DOM.get("#J_SearchName"))); //标题
   	    	    }else{
   	    	    	var name ='';
   	    	    }
   	    	    data += "&name="+name;
				var shen = DOM.val('#a1');
				var shi = DOM.val('#a2');
				if(shen == 0){
					data += "&state="+encodeURIComponent('全部')+"&city="+encodeURIComponent('全部');
				}else if(shi ==0){
						data += "&state="+encodeURIComponent(window.link.data[''+shen+''][0])+"&city="+encodeURIComponent('全部');
				}else{
					data += "&state="+encodeURIComponent(window.link.data[''+shen+''][0])+"&city="+encodeURIComponent(window.link.data[''+shi+''][0]);
				}
		        return data;  
	
			},
			open:function(){
			 var submitHandle = function(o) {
			 		var str = '<span style="color: #FB8534;float:left;margin-right:10px">自动将在淘宝新交易的用户加入列表</span>'+ 
              		  		  '<input class="btm-caozuo-orange" type="button" name="" value="关闭" onclick="MemberList.close()">';
					DOM.html('#J_SaveConfigButton',str);
						new H.widget.msgBox({ 
				 			type: "sucess", 
				 			content: "成功开启！",
							dialogType:"msg", 
							autoClose:true, 
							timeOut:3000
						});
				
	    	    };
	    	    var data = 'no_auto=0';
	    	    new H.widget.asyncRequest().setURI(saveConfigUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			close:function(){
				 var submitHandle = function(o) {
			 		var str = '<span style="color: #FB8534;float:left;margin-right:10px">自动将在淘宝新交易的用户加入列表</span>'+ 
              		  		  '<input class="btm-caozuo-orange" type="button" name="" value="启用" onclick="MemberList.open()">';
					DOM.html('#J_SaveConfigButton',str);
						new H.widget.msgBox({ 
				 			type: "sucess", 
				 			content: "成功关闭！",
							dialogType:"msg", 
							autoClose:true, 
							timeOut:3000
						});
	    	    };
	    	    var data = 'no_auto=1';
	    	    new H.widget.asyncRequest().setURI(saveConfigUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();

				
			}
			
		
	

}
   
}, {
    requires: ['utils/showPages/index']
});