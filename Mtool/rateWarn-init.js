KISSY.add(function(S){
	var S = KISSY,DOM = S.DOM, Event = S.Event, descType = 1;	
	return rateWarn = {
    	msg : null,
    	init : function() {
			Event.on('#J_TestBtn','click',rateWarn.testRemindInfo);
			Event.on('#J_sure','click',rateWarn.openWarn);
        },

		openWarn : function() {
	    	if(!showPermissions('editor_tool','工具箱')){return ;}
			if(isVersionPer('tool')){return ;}
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
		    	var sureUrl = openWarnUrl;
		    	if(DOM.get('#J_opened').checked == false){
		    		DOM.html('#J_ParamsErrorMsg','请确认开通自动评价！');
	    	    	if (ParamsErrorBox.css("display")=== "none") {
	    	    		ParamsErrorBox.slideDown();
	    	    	};
	    	    	KISSY.later(function(){
	    	    		ParamsErrorBox.slideUp();
	        	    },3000,false)
	        	    return;
		    	};
		    }else if(DOM.get('#J_closed').checked == true){
		    	var sureUrl = closeWarnUrl;
		    }
	    	var mobile = DOM.val(DOM.get("#J_Mobile"));
	    	var data = "mobile="+mobile;
		    new H.widget.asyncRequest().setURI(sureUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
		},
		
		testRemindInfo : function() {
			ParamsErrorBox = KISSY.one('#J_ParamsErrorBox');
			ParamsSucessBox = KISSY.one('#J_ParamsSucessBox');
			var submitHandle = function(o) {
				ParamsErrorBox.hide();
//				rateWarn.msg.setMsg(o.desc).show();
//				rateWarn.msg.hide(800);
				new H.widget.msgBox({
					type: "sucess",
                    content: o.desc,
     				dialogType:"msg",
    				autoClose:true,
    				timeOut:800,
                });
				S.later(function(){
					window.location.reload();
				},800,false)
			};
			var errorHandle = function(o){
				ParamsSucessBox.hide();
				DOM.html('#J_ParamsErrorMsg',o.desc);
    	    	if (ParamsErrorBox.css("display")==="none") {
    	    		ParamsErrorBox.slideDown();
    	    	};
    	    	KISSY.later(function(){
    	    		ParamsErrorBox.slideUp();
        	    },3000,false)
				return;
			};
	    	var mobile = DOM.val(DOM.get("#J_Mobile"));
	    	var data = "mobile="+mobile+'&model=rate';
			new H.widget.asyncRequest().setURI(testRemindInfoUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
		}
	};
});