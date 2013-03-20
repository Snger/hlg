/**
 * @fileOverview 
 * @author  
 */
KISSY.add(function (S,showPages) {
    // your code here
	var DOM = S.DOM, Event = S.Event;	
	
	return Smslist = {
	    	paginator : null,
			handlePagination :null,
	    	isFisrst : true,
	    	init : function() {
				Event.on("#J_LeftSearch", "click", function(){
					Smslist.searchTbItems();
				});

				Smslist.searchTbItems();
				
				Event.on("#J_RetryAll", "click", function(){
					Smslist.allretry();
				});
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
					Smslist.renderItems(o.payload.body);
					var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					Smslist.paginator = new showPages('Smslist.paginator').setRender(Smslist.handlePagination).setPageCount(pageCount).printHtml('#J_Paging',2);
	    	    };
	    	    var data = Smslist.getData();
    	   		DOM.show('#J_LeftLoading');
				DOM.hide('#J_MainLeftContent');
				new H.widget.asyncRequest().setURI(loadTbItemsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			renderItems: function(c) {
	    	    DOM.html(DOM.get("#J_TbItemList"), c);
	        	
			},
			getData : function(){
				 if(DOM.val(DOM.get("#J_SearchNick")) != '请输入买家旺旺'){
   	    	    	var buyer_Nick = encodeURIComponent(DOM.val(DOM.get("#J_SearchNick"))); //标题
   	    	    }else{
   	    	    	var buyer_Nick ='';
   	    	    }
   	    	    var Type = DOM.val(DOM.get('#J_Caretype'));
   	    	    var Status = DOM.val(DOM.get('#J_Carestatus'));
        	    var data = "buyer_nick="+buyer_Nick+"&type="+Type+"&status="+Status+"&page_size=10"; 		        	    
	 			return data ;
			},
	    	handlePagination : function(turnTo) {
		    	pageId = turnTo;
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
	 				Smslist.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_Paging',2);
	 				Smslist.renderItems(o.payload.body);
	 				DOM.hide('#J_LeftLoading');
					DOM.show('#J_MainLeftContent');
		    	};
		    	var data = Smslist.getData();
				data +="&page_id="+pageId
				DOM.show('#J_LeftLoading');
				DOM.hide('#J_MainLeftContent');
	    	    new H.widget.asyncRequest().setURI(loadTbItemsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			retry :function(id){
				var submitHandle = function(o) {
					if(Smslist.paginator){
						Smslist.paginator.toPage(Smslist.paginator.page);
					}else{
						Smslist.loadPromotionItems();
					}
					};
					var data = "sms_id="+id;
					
					new H.widget.asyncRequest().setURI(retryUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
	
				},
			allretry :function(){
				var submitHandle = function(o) {
					new H.widget.msgBox({
					    title:"成功提示",
					    content:o.payload,
					    type:"error",
						autoClose : true,
						timeOut : 1000
					});
	        	    window.location.reload(true);
					};
					var errorHandle = function(o){
						new H.widget.msgBox({
						    title:"错误提示",
						    content:o.desc,
						    type:"error"
						});
		    	    };
					if(DOM.val(DOM.get("#J_SearchNick")) != '请输入买家旺旺'){
	   	    	    	var buyer_Nick = encodeURIComponent(DOM.val(DOM.get("#J_SearchNick"))); //标题
	   	    	    }else{
	   	    	    	var buyer_Nick ='';
	   	    	    }
	   	    	    var Type = DOM.val(DOM.get('#J_Caretype'));
	        	    var data = "buyer_nick="+buyer_Nick+"&type="+Type;
					
					new H.widget.asyncRequest().setURI(retryallUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
	
				}						
	}
}, {
    requires: ['utils/showPages/index']
});