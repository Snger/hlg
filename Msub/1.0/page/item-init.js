/**
 * @fileOverview 
 * @author  
 */
KISSY.add(function (S) {
    // your code here
		var DOM = KISSY.DOM,Event = S.Event;
		
		return subControl = {
			
			init : function(){
					Event.on('.J_Start','click',function(ev){
						var subId = DOM.attr(ev.currentTarget,'data');
						var chooseRoleContentSubId = DOM.get('#J_ChooseRoleContent_'+subId);
						var subInputs = DOM.query('#J_RoleCell_'+subId+' input');
						for(var i=0;i<subInputs.length;i++){
							if(DOM.attr(subInputs[i],'checked')){
								DOM.css('#J_Btm_'+subId,'display','');
								DOM.css('#J_RoleControl_'+subId,'display','none');
							} 
						}
			//			if(!DOM.prop(chooseRoleContentSubId,'visible')){
			//				DOM.prop(chooseRoleContentSubId,'visible',false);
			//				DOM.css(chooseRoleContentSubId,'visibility','hidden');
			//			}else {
			//				DOM.prop(chooseRoleContentSubId,'visible',true);
							DOM.css(chooseRoleContentSubId,'visibility','visible');
			//			}
					});
					Event.on('.J_iconDeletelink','click',function(){
						DOM.css('.J_ChooseRoleContent','visibility','hidden');
					})
					Event.on('.J_ChooseRole','click',function(ev){
						DOM.val('#J_RoleId',DOM.val(ev.currentTarget));
						var subId = DOM.attr(ev.currentTarget,'data');
						DOM.css('#J_Btm_'+subId,'display','');
						DOM.css('#J_RoleControl_'+subId,'display','none');
					});
					Event.on('.J_Btm_cancel','click',function(ev){
						var subId = DOM.attr(ev.currentTarget,'data');
						DOM.prop("input",'checked',false);
						DOM.val('#J_RoleId','');
						DOM.css('#J_Btm_'+subId,'display','none');
						DOM.css('#J_RoleControl_'+subId,'display','');
					});
				
				
				
			},
			UpdataRoleId : function(subId){
				var roleId = DOM.val('#J_RoleId');
				var data = "subId="+subId+"&roleId="+roleId;
				var submitHandle = function(o) {
					new H.widget.msgBox({
							    title:"温馨提示",
							    content:o.desc,
							    type:"info",
								autoClose : true,
								timeOut : 3000
							});
					window.location.href= currentUrl;
			    };
			    var errorHandle = function(o){
					new H.widget.msgBox({
							    title:"错误提示",
							    content:o.desc,
							    type:"error"
							});
			    };
				new H.widget.asyncRequest().setURI(savePermissionsUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			}
			
		}
}, {
    requires: []
});