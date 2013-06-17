/**
 * @fileOverview 
 * @author  
 */
KISSY.add(function (S,showPages) {
    // your code here
	var DOM = S.DOM, Event = S.Event;	
	
	return ratesendControl = {
			paginator : null,
	    	panel : null,
	    	msg : null,
	    	url : '',
	    	init : function(){
		
			if(htmlType == 'index'){
				ratesendControl.checkCpAgreement();
				Event.on('#J_sure','click',ratesendControl.open);
			}else{
				
				ratesendControl.searchTbItems();
			}
				
			},
			/*是否签订彩票协议*/
			checkCpAgreement : function(el){
				if(DOM.val('#J_IsSign') == 1){
					return ;
				}
			    var submitHandle = function(o) {
			    	if(o.payload.sign){
			    		DOM.val('#J_IsSign','1');
				    }else{
				    	
				    	ratesendControl.url = o.payload.sign_url;
						new H.widget.msgBox({
								    title:"签订协议",
								    content:'请先开通<a href="'+o.payload.sign_url+'" target="_blank">支付宝代购协议</a>',
								    type:"info",
								    buttons: [{ value: "ok" }],
								    success:function(result){
										if(result == 'ok'){
											var url = ratesendControl.url;
											window.open(url, '_blank');
										}
							
									}
								});
				    	DOM.val('#J_IsSign','0');
					}
			    };
			    var errorHandle = function(o){
			    	var ParamsErrorBox = KISSY.one('#J_ParamsErrorBox');
					DOM.html('#J_ParamsErrorMsg',o.desc);
					if (ParamsErrorBox.css("display")==="none") {
						ParamsErrorBox.slideDown();
					}
			 	};
			    var data ='';
			    new H.widget.asyncRequest().setURI(checkSignUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).setDataType('json').send();
			},
			open : function() {
		    	if(!showPermissions('editor_tool','工具箱')){return ;}
				if(isVersionPer('tool')){return ;}
				if(DOM.val('#J_IsSign') == 0){
					new H.widget.msgBox({
					    title:"签订协议",
					    content:'请先开通<a href="'+ratesendControl.url+'" target="_blank">支付宝代购协议</a>',
					    type:"info",
					    buttons: [{ value: "ok" }],
					    success:function(result){
							if(result == 'ok'){
								var url = ratesendControl.url;
								window.open(url, '_blank');
							}
				
						}
					});
					return ;
				}
				
				ParamsErrorBox = KISSY.one('#J_ParamsErrorBox');
				ParamsSucessBox = KISSY.one('#J_ParamsSucessBox');
				
		        var submitHandle = function(o) {
		        	ParamsErrorBox.hide();
		        	DOM.html('#J_ParamsSucessMsg',o.desc);
	    	    	if (ParamsSucessBox.css("display")==="none") {
	    	    		ParamsSucessBox.slideDown();
	    	    	};
	    	    	KISSY.later(function(){
	    	    		ParamsSucessBox.slideUp();
	        	    },3000,false)
			    };
			    var errorHandle = function(o){
			    	ParamsSucessBox.hide();
			    	DOM.html('#J_ParamsErrorMsg',o.desc);
	    	    	if (ParamsErrorBox.css("display")=== "none") {
	    	    		ParamsErrorBox.slideDown();
	    	    	};
	    	    	KISSY.later(function(){
	    	    		ParamsErrorBox.slideUp();
	        	    },3000,false)
					return;
			    };
			    if(DOM.get('#J_open').checked == true){
			    	var sureUrl = openUrl;
			    }else if(DOM.get('#J_closed').checked == true){
			    	var sureUrl = closeUrl;
			    }
		    	var lottery_type = DOM.val(DOM.get("#J_CpType"));
		    	var stake_count = DOM.val(DOM.get("#J_CpNum"));
		    	var lottery_content = DOM.val(DOM.get("#J_CareBox_0"));
		    	
		    	var data = "lottery_type="+lottery_type+"&stake_count="+stake_count+"&lottery=1"+"&lottery_content="+lottery_content;
			    new H.widget.asyncRequest().setURI(sureUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			},
			
			searchTbItems : function() {
			        var submitHandle = function(o) {
						DOM.hide('#J_LeftLoading');
						DOM.show('#J_MainLeftContent');
			    	    totalRecords = o.payload.totalRecords;
						DOM.css(DOM.get('#J_NoteIcon') ,'display','none');
						if(totalRecords > 0){
							DOM.css(DOM.get('#J_LEmpty') ,'display','none');
							DOM.css(DOM.query(".J_PromotionItemBtnHolder") ,'display' , '');
						} else {
							DOM.css(DOM.get('#J_LEmpty'), 'display' , '');
							DOM.css(DOM.query(".J_PromotionItemBtnHolder") , 'display' , 'none');
						}
						DOM.html('#J_StatList' ,o.payload.body);
						var pageCount = Math.ceil(totalRecords/o.payload.pageSize); 
						ratesendControl.paginator = new showPages('ratesendControl.paginator').setRender(ratesendControl.handlePagination).setPageCount(pageCount).printHtml('#J_StatPaging',2);
				    };
				    var data="";
					DOM.show('#J_LeftLoading');
					DOM.hide('#J_MainLeftContent');
				    new H.widget.asyncRequest().setURI(getSendTradeAjaxUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
				},
				handlePagination : function(turnTo) {
			    	pageId = turnTo;
					var submitHandle = function(o) {
						
						DOM.hide('#J_LeftLoading');
						DOM.show('#J_MainLeftContent');
			    	    totalRecords = o.payload.totalRecords;
						DOM.css(DOM.get('#J_NoteIcon') ,'display','none');
						if(totalRecords > 0){
							DOM.css(DOM.get('#J_LEmpty') ,'display','none');
							DOM.css(DOM.query(".J_PromotionItemBtnHolder") ,'display' , '');
						} else {
							DOM.css(DOM.get('#J_LEmpty'), 'display' , '');
							DOM.css(DOM.query(".J_PromotionItemBtnHolder") , 'display' , 'none');
						}
						DOM.html('#J_StatList' ,o.payload.body);
						var pageCount = Math.ceil(totalRecords/o.payload.pageSize); 
						ratesendControl.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_StatPaging',2);
			    	};
			    	var data="page_id="+pageId
			        DOM.show('#J_LeftLoading');
					DOM.hide('#J_MainLeftContent');
				    new H.widget.asyncRequest().setURI(getSendTradeAjaxUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
				},

				checkTitleLen : function(str ,id) {
					var len = str.replace(/[^\x00-\xff]/g,"*").length;
					DOM.html(DOM.get('#J_Notice_'+id), '');
					DOM.html(DOM.get('#J_Zs_'+id), "已经输入"+len+"字符");
				}
				
				
			}
}, {
    requires: ['utils/showPages/index']
});