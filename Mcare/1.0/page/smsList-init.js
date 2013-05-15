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
                Smslist.Calendar('J_StartTime');
                Smslist.Calendar('J_EndTime');

				Smslist.searchTbItems();
				
				Event.on("#J_RetryAll", "click", function(){
					Smslist.allretry();
				});
				Event.on("#J_GetRetryCount", "click", function(){
				    Smslist.getRetryCount();
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
                var Status = DOM.val(DOM.get('#J_Carestatus'));
	    	    var data = Smslist.getData();
	    	    data +="&status="+Status+"&page_size=10";
    	   		DOM.show('#J_LeftLoading');
				DOM.hide('#J_MainLeftContent');
				new H.widget.asyncRequest().setURI(loadTbItemsUrl).setMethod("POST").setHandle(submitHandle).setData(data).send();
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
                var start_at = DOM.val('#J_StartTime');
                var end_at = DOM.val('#J_EndTime');
        	    var data = "buyer_nick="+buyer_Nick+"&type="+Type+"&start_at="+start_at+"&end_at="+end_at; 		        	    
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
                var Status = DOM.val(DOM.get('#J_Carestatus'));
		    	var data = Smslist.getData();
				data +="&status="+Status+"&page_size=10"+"&page_id="+pageId;
				DOM.show('#J_LeftLoading');
				DOM.hide('#J_MainLeftContent');
	    	    new H.widget.asyncRequest().setURI(loadTbItemsUrl).setMethod("POST").setHandle(submitHandle).setData(data).send();
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
			//根据时间和短信类型批量重试
			getRetryCount :function(){
			    var submitHandle = function(o) {
			        if(o.payload.sms_balance == -1){
			            if(o.payload.sms_total <= 0){
    			            new H.widget.msgBox({
    			                title: "温馨提示",
    			                type: "error",
    			                content: "没有符合条件的记录需要重试."
    			            });
			            }else {
    			            new H.widget.msgBox({
    		                    title: "重试",
    		                    type: "confirm",
    		                    content: "需要重试的数目为"+o.payload.sms_total+"条，确定重试？",
    		                    buttons: [{ value: "确定" }],
    		                    success: function (result) {
    		                        if (result == "确定") {
    		                            Smslist.allretry();
    		                        }
    		                    }
    		                });
			            }
			        }else{
    			        new H.widget.msgBox({
    	                    title: "重试",
    	                    type: "confirm",
    	                    content: "需要重试的数目为"+o.payload.sms_total+"条，当前余额为"+o.payload.sms_balance+"条！重试只能发送一部分用户，确定重试？",
    	                    buttons: [{ value: "充值" }, { value: "重试" }],
    	                    success: function (result) {
        			            if (result == "充值") {
        			                window.location.href=smsOrderUrl;
        			            }else if (result == "重试") {
    	                            Smslist.allretry();
    	                        }
    	                    }
    	                });
			        }
			    };
			    var errorHandle = function(o){
			        new H.widget.msgBox({
			            title:"错误提示",
			            content:o.desc,
			            type:"error"
			        });
			    };
			    var data = Smslist.getData();
			    new H.widget.asyncRequest().setURI(getRetryCountUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			},
			//重试
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
        	    var data = Smslist.getData();
				new H.widget.asyncRequest().setURI(retryallUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			},
			//修改活动时间日历
            Calendar : function($id){
                var c =new KISSY.Calendar('#'+$id,{
                            popup:true,
                            triggerType:['click'],
                            showTime:true,
                            date :new Date(),
                            maxDate:new Date()
                        }).on('select timeSelect',function(e){
                                var id = this.id,self = this;
                                if(e.type == 'select'){
                                    var startDate = KISSY.Date.format(e.date,'yyyy-mm-dd 23:59:59');
                                }else{
                                    var startDate = KISSY.Date.format(e.date,'yyyy-mm-dd HH:MM:ss');
                                }
                                KISSY.one('#'+$id).val(startDate);
                                self.hide();
                        });
            }
	}
}, {
    requires: ['utils/showPages/index']
});