KISSY.add(function(S,showPages){
	var S = KISSY,DOM = S.DOM,Event = S.Event;
	return instockAdd = {
			msg : null,
			init : function(){
				Event.on('#J_BtnPublish','click',function(){
					instockAdd.savePlan();
				})
			},
			savePlan : function(){
				if(!showPermissions('editor_tool','工具箱')){return ;}
				if(isVersionPer('tool')){return ;}
				var submitHandle = function(o){
					instockAdd.msg.hide();
					new H.widget.msgBox({
						type: "sucess",
                        content: "生成计划成功！",
         				dialogType:"msg",
        				autoClose:true,
        				timeOut:3000,
                    });
					S.later(function(){
						window.location.href=comeBackUrl;
					},800,false)
				}
				var errorHandle = function(o){
					instockAdd.msg.hide();
					new H.widget.msgBox({
					    title:"错误提示",
					    content:o.desc,
					    type:"error"
					});
					return;
				}
				if(!(DOM.prop('#regular_shelved','checked')) && !(DOM.prop('#never_on_shelf','checked')) && !(DOM.prop('#off_shelf','checked'))){
					instockAdd.msg.setMsg('<div class="point relative"><div class="point-w-1">请选择上架范围！</div></div>').showDialog();
					return;
				}
				var intervalMinite = DOM.val('#J_IntervalMinite');
				if(DOM.prop('#distriType1','checked') && (intervalMinite == '' || isNaN(intervalMinite) || intervalMinite <= 0)){
					DOM.css('#J_IntervalMinite','border','1px solid red');
					return;
				}
				var data = '';
				instockAdd.msg = new H.widget.msgBox({
				    title:"",
					dialogType : 'loading',
				    content:'正在提交，请稍候！'	
				});
				new H.widget.asyncRequest().setURI(savePlanUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setForm(J_subform).setData(data).send();
			}
	};
},{
	requires:['utils/showPages/index']
});