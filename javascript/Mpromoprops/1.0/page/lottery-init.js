/**
 * @fileOverview 
 * @author  
 */
KISSY.add(function (S,showPages) {
    // your code here
	var DOM = S.DOM, Event = S.Event;	
	return Lottery = {
			    	paginator : null,
			    	msg :null,
			    	init : function() {
	             		Event.on("#J_LeftSearch", "click", function(){
							Lottery.searchTbItems();
						});
						Event.on(doc, 'keydown', function(evt) {
							if ( evt.which === 13) {
								if(Lottery.paginator){
									Lottery.paginator.toPage(Lottery.paginator.page);
								}else{
									Lottery.searchTbItems();
								}
							}
						})
						Lottery.searchTbItems();
					},
					searchTbItems : function() {
				        
			            var submitHandle = function(o) {
							DOM.hide('#J_LeftLoading');
							DOM.show('#J_MainLeftContent');
			        	    totalRecords = o.payload.totalRecords;
							DOM.html('#J_UserNum',totalRecords);
							if(totalRecords > 0){
								DOM.css(DOM.get('#J_LEmpty') ,'display','none');
								DOM.css(DOM.query(".J_ItemSelectBtnHolder") ,'display' , '');
							} else {
								DOM.css(DOM.get('#J_LEmpty'), 'display' , '');
								DOM.css(DOM.query(".J_ItemSelectBtnHolder") , 'display' , 'none');
							}
							DOM.html(DOM.get("#J_PromotionItemList"), o.payload.body);
							var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
							Lottery.paginator = new showPages('Lottery.paginator').setRender(Lottery.handlePagination).setPageCount(pageCount).printHtml('#J_BottomPaging',2);
			    	    };
			    	    var data = Lottery.getData();
			 			DOM.show('#J_LeftLoading');
						DOM.hide('#J_MainLeftContent');
			    	    new H.widget.asyncRequest().setURI(loadTbItemsUrl).setMethod("POST").setHandle(submitHandle).setData(data).send();
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
			 				Lottery.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_BottomPaging',2);
			 				DOM.html(DOM.get("#J_PromotionItemList"), o.payload.body);
			 				DOM.hide('#J_LeftLoading');
							DOM.show('#J_MainLeftContent');
				    	};
				    	var data = Lottery.getData();
						data +="&page_id="+pageId
						   DOM.show('#J_LeftLoading');
							DOM.hide('#J_MainLeftContent');
			    	    new H.widget.asyncRequest().setURI(loadTbItemsUrl).setMethod("POST").setHandle(submitHandle).setData(data).send();
					},
					getData : function(){
		    	    	 if(DOM.val(DOM.get("#J_SearchName")) != '买家昵称'){
		   	    	    	var nick = encodeURIComponent(DOM.val(DOM.get("#J_SearchName"))); //标题
		   	    	    }else{
		   	    	    	var nick ='';
		   	    	    }
		    	    	var start_date = DOM.val(DOM.get("#J_startDate"));
		    	    	var end_date = DOM.val(DOM.get("#J_endDate"));
		   				var lottery_type = DOM.val(DOM.get("#J_CardType"));
//		   				var channel = DOM.val(DOM.get("#J_CardChannel"));
		   				if(DOM.prop('#J_WinFee',"checked")){
		   					var win_fee = 1
		   				}else{
		   					var win_fee = 0
		   				}
				        var data = "page_size=10&buyerNick="+nick+"&start_date="+start_date+"&end_date="+end_date+"&lottery_type="+lottery_type+"&win_fee="+win_fee;
//				        var data = "page_size=10&buyerNick="+nick+"&start_date="+start_date+"&end_date="+end_date+"&lottery_type="+lottery_type+"&channel="+channel+"&win_fee="+win_fee;
				        	
				        return data;  
			
					}
					
		    	}

	
}, {
    requires: ['utils/showPages/index']
});