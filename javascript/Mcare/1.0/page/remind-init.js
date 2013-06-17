/**
 * @fileOverview 
 * @author  
 */
KISSY.add(function (S,showPages,O) {
    // your code here
	var DOM = S.DOM, Event = S.Event;	
	
	return remind = {
	    	paginator : null,
	    	msg :null,
	    	panel:null,
	    	isFisrst : true,
	    	init : function() {
                if(!remind.panel){
                    remind.panel = new O.Dialog({
                        width: 370,
                        headerContent: '提醒手机',
                        bodyContent: '<div style="padding:30px 0;"><ul><li class="min-height-30"><span class="fl color-red" style="margin-left:20px;_display: inline;">测试会消耗一条短信</span></li><li class="min-height-40"><div class="active-add-edit-title w-80">提醒手机：</div><div class="active-add-edit-edit w-180"><input id="J_MobileText" type="text" value="" class="input-text w-200"></div></li><li class="min-height-40"><div class="active-add-edit-title w-80">提醒方式：</div><div class="active-add-edit-edit w-200">短信少于&nbsp;&nbsp;<input id="J_remindNum" value="" type="text" class="input-text w-70">&nbsp;&nbsp;条提醒我</div></li><li><div class="ui-msg" style="display: none; width:300px; margin: 15px auto;" id="J_ParamsErrorBox"><div class="error-msg"><div class="img-16-1"></div><div class="text-16 color-red" id="J_ParamsErrorMsg"></div></div></div><div class="ui-msg" style="display: none;width:300px;margin: 15px auto;" id="J_ParamsSucessBox"><div class="success-msg"><div class="img-16-6"></div><div class="text-16" id="J_ParamsSucessMsg"></div></div></div></li><li class="min-height-40"><div style="width:160px;_width:170px;" class="btm-content m-auto"><input name="" type="button" value="确定" class="btm-68-orange fl" id="J_determine"/><input type="button" value="测试" class="btm-68-gray fl" id="J_test" /></div></li></ul></div>',
                        mask: false,
                        align: {
                            points: ['cc', 'cc']
                        },
                        closable :true,
                        draggable: true,
                        aria:true
                    }); 
                };
				Event.on("#J_remind", "click", function(){
					remind.panel.show();
					remind.getData();
					Event.remove('#J_determine');
					Event.remove('#J_test');
					Event.on('#J_determine','click',function(ev){
						var phoneNum = DOM.val('#J_phoneNum');
						var MobileText = DOM.val('#J_MobileText');
						var remindNum = DOM.val('#J_remindNum');
						var noteNum = DOM.val('#J_noteNum');
			    	    if(phoneNum == MobileText && remindNum == noteNum){
			    	        remind.panel.hide();
			    	    }else{
			    	    	remind.determine();
			    	    };
					});
					Event.on('#J_test','click',function(ev){
						remind.remindTest();
					});
				});
	        },

	        getData : function(){
	        	var submitHandle = function(o) {
        	    	DOM.val('#J_MobileText',o.payload.mobile);
        	    	DOM.val('#J_noteNum',o.payload.sms_remind);
        	    	DOM.val('#J_remindNum',o.payload.sms_remind);
        	    	DOM.val('#J_phoneNum',o.payload.mobile);
        	    };
        	    new H.widget.asyncRequest().setURI(getRemindInfoUrl).setMethod("GET").setHandle(submitHandle).setData(null).setDataType('json').send();
	        },

	        determine : function(){
	        	var mobile = DOM.val('#J_MobileText');
	        	var sms_remind = DOM.val('#J_remindNum');
	        	var ParamsErrorBox = KISSY.one('#J_ParamsErrorBox');
	        	var ParamsSucessBox = KISSY.one('#J_ParamsSucessBox');
	            var submitHandle = function(o) {
                    new H.widget.msgBox({
                        type: "sucess",
                        content: o.payload,
                        dialogType:"msg",
                        autoClose:true,
                        timeOut:3000,
                    });
                    remind.panel.hide();
	    	    };
	    	    var errorHandle = function(o){
	    	    	DOM.html('#J_ParamsErrorMsg',o.desc);
					if (ParamsErrorBox.css("display")==="none"){
						ParamsErrorBox.slideDown();
					}
					return;
	    	    };
	    	    data = 'mobile='+mobile+'&sms_remind='+sms_remind;
				new H.widget.asyncRequest().setURI(saveRemindInfoUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
	        },
            
	           remindTest : function(){
	                var ParamsErrorBox = KISSY.one('#J_ParamsErrorBox');
	                var ParamsSucessBox = KISSY.one('#J_ParamsSucessBox');
	                var submitHandle = function(o) {
	                    new H.widget.msgBox({
	                        type: "sucess",
	                        content: o.payload,
	                        dialogType:"msg",
	                        autoClose:true,
	                        timeOut:3000,
	                    });
	                    remind.panel.hide();
	                };
	                var errorHandle = function(o){                          
	                    DOM.html('#J_ParamsErrorMsg',o.desc);
	                    if (ParamsErrorBox.css("display")==="none") {
	                        ParamsErrorBox.slideDown();
	                    }
	                    return ;
	                };
	                var mobile = DOM.val('#J_MobileText');
	                var data = "mobile="+mobile;
	                new H.widget.asyncRequest().setURI(testRemindInfoUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
	            },
	            //修改店铺标题
	            updateShopTitle : function(){
	                 var submitHandle = function(o) {
                         DOM.html('#J_ShopNick',o.desc);
                         new H.widget.msgBox({ 
                             type: "sucess", 
                             content: "更新成功",
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
	                 var data = "";
	                 new H.widget.asyncRequest().setURI(updateShopTitleUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
	             }
	}
}, {
    requires: ['utils/showPages/index','overlay']
});