/**
 * @fileOverview 
 * @author  
 */
KISSY.add(function (S,showPages) {
    // your code here
	var DOM = S.DOM, Event = S.Event;	
	
	return attributeControl = {
	    	Paginator : null,
	    	init : function() {
				Event.on('#J_SaveForm','click',attributeControl.save)
			                      
	        },
			checkAll : function(cid) {
				checkBoxs = DOM.query('#J_CheckBoxs_'+cid+' .J_CheckBox');
				len = checkBoxs.length;
				var flag = DOM.prop('#J_TopCheck_'+cid,'checked');
				for(i=0; i<len; i++){
					var iid = checkBoxs[i].value;
					if(checkBoxs[i].disabled) continue;
					if(flag){
						checkBoxs[i].checked = true;
					} else {
						checkBoxs[i].checked = false;
					}
				}
			},
			
			save :function(){
				var ParamsErrorBox = KISSY.one('#J_ParamsErrorBox');
				var sucessHandle = function(o) {
			 			ParamsErrorBox.hide();
			 			ParamsSucessBox = KISSY.one('#J_ParamsSucessBox')
			 			DOM.html('#J_ParamsSucessMsg','属性编辑成功！');
						if (ParamsSucessBox.css("display")==="none") {
							ParamsSucessBox.slideDown();
						}
						S.later(function(){ParamsSucessBox.hide();},3000,false)
						DOM.scrollIntoView('#J_ParamsSucessMsg',window);
						//window.location.href=o.desc;
			 		};
			 		var errorHandle = function(o){
						DOM.html('#J_ParamsErrorMsg',o.desc);
						if (ParamsErrorBox.css("display")==="none") {
							ParamsErrorBox.slideDown();
						}
						DOM.scrollIntoView('#J_ParamsErrorMsg',window);
					//	promotionControl.backCheckForm();
						 
			 		};
			 		var data = '';
			  	    new H.widget.asyncRequest().setURI(saveAttributeUrl).setMethod("POST").setForm('#attribute_edit_form').setHandle(sucessHandle).setErrorHandle(errorHandle).setData(data).send();
					
				
			}
			

		
			
    	}
}, {
    requires: ['utils/showPages/index']
});