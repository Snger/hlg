/**
 * @fileOverview 
 * @author  
 */
KISSY.add(function (S) {
    // your code here
    var DOM = KISSY.DOM,Event = S.Event;
	return subControl = {
			paginator : null,
			msg : null,
			NameError : false,
			init: function(){
				Event.on('#J_BtnPublish','click',function(ev){
					subControl.save();
				})
			},
	        PromoNameAction : function(name){
					var result = H.util.isNull(name);
					var error = result[0];
					var msg = result[1];
					if(error){
						DOM.addClass('#J_PlanName','text-error');
						DOM.html('#J_PromoNameError',msg);
						DOM.hide('#J_PromoNameRequired');
						DOM.hide('#J_PromoNameSucess');
						DOM.show('#J_PromoNameError');
						return subControl.NameError = true;
					}
					DOM.removeClass('#J_PlanName','text-error');
					DOM.hide('#J_PromoNameRequired');
					DOM.show('#J_PromoNameSucess');
					DOM.hide('#J_PromoNameError');
					return subControl.NameError = false;
			},
			save: function(){
				subControl.msg = new H.widget.msgBox({
								    title:"",
									dialogType : 'loading',
								    content:'正在保存中，请稍候'	
								});
				var planName = DOM.val('#J_PlanName');
				if(subControl.NameError == true){
					subControl.msg.hide();
					return ;
				}
				ParamsErrorBox = KISSY.one('#J_ParamsErrorBox');
				//subControl.checkForm();
				var sucessHandle = function(o) {
					subControl.msg.hide();
		 			ParamsErrorBox.hide();
		 			ParamsSucessBox = KISSY.one('#J_ParamsSucessBox')
		 			DOM.html('#J_ParamsSucessMsg','成功创建活动！');
					if (ParamsSucessBox.css("display")==="none") {
						ParamsSucessBox.slideDown();
					}
					DOM.scrollIntoView('#J_ParamsSucessMsg',window);
					window.location.href=sucessUrl;
		 		};
		 		var errorHandle = function(o){
		 			subControl.msg.hide();
					DOM.html('#J_ParamsErrorMsg',o.desc);
					if (ParamsErrorBox.css("display")==="none") {
						ParamsErrorBox.slideDown();
					}
					DOM.scrollIntoView('#J_ParamsErrorMsg',window);
		 		};
		 		var data = '';
		  	    new H.widget.asyncRequest().setURI(saveRoleUrl).setMethod("POST").setForm('#J_subform').setHandle(sucessHandle).setErrorHandle(errorHandle).setData(data).send();
			},
			/*将checkbox 值传过去*/
			checkForm : function(){
				var checks = DOM.filter(DOM.query('input'),function(i){if(i.type =='checkbox' && DOM.hasClass(i,'J_checkForm'))return true;})
				KISSY.each(checks,function(item){
					if(item.checked == false){
						item.checked = true;
						DOM.val(item,0);
					}
				})
			},
			/*将checkbox 值传回来*/
			backCheckForm : function(){
				var checks = DOM.filter(DOM.query('input'),function(i){if(i.type =='checkbox' && DOM.hasClass(i,'J_checkForm'))return true;})
				KISSY.each(checks,function(item){
					var v = DOM.val(item);
					if(v == 1){
						item.checked = true;
					}else{
						item.checked = false;
						DOM.val(item,1);
					}
				})
			}
	}
	
	
}, {
    requires: []
});