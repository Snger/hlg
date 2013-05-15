
/**
 * @fileOverview 
 * @author  
 */
KISSY.add(function (S,O) {
    // your code here
	var DOM = S.DOM, Event = S.Event;	
	
	return editControl = {
         		panel : null,
                msg : null,
                init : function(){
					
				},
				delDialog : function(protoId, paramId){
					new H.widget.msgBox({
					    title: "删除",
					    content: '',
					    type: "confirm",
					    buttons: [{ value: "确定删除" }, { value: "取消" }],
					    success: function (result) {
					        if (result == "确定删除") {
					        	editControl.del(''+protoId+'', ''+paramId+'')
					        }
					        
					    }
					});

				},
				del : function(protoId, paramId){
					var submitHandle = function(o) {
						new H.widget.msgBox({
						    title:"提示",
						    content:o.payload.message,
						    type:"error"
						});
					};
					var errorHandle = function(o){
						new H.widget.msgBox({
						    title:"错误提示",
						    content:o.desc,
						    type:"error"
						});
					};
					window.location.reload();
					var data ="param_id="+paramId+"&proto_id="+protoId;
					new H.widget.asyncRequest().setURI(uri).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
				},
				nameMod : function(protoId, paramId){

					var submitHandle = function(o) {
						new H.widget.msgBox({
						    title:"提示",
						    content:o.payload.message,
						    type:"error"
						});
						
					};
					var errorHandle = function(o){
						new H.widget.msgBox({
						    title:"错误提示",
						    content:o.desc,
						    type:"error"
						});
					};
					var value = DOM.val('#value');
					var data ="param_id="+paramId+"&value="+value+"&proto_id="+protoId;
					new H.widget.asyncRequest().setURI(nameuri).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
					window.location.reload();
				},
				nameDialog : function(protoId, paramId, str){
					new H.widget.msgBox({
					    title: "修改",
					    content: '<input type="text" id="value" name="value" value="'+str+'" style="height:20px;width:250px"><br /><br>',
					    type: "confirm",
					    buttons: [{ value: "确定" }, { value: "取消" }],
					    success: function (result) {
					        if (result == "确定") {
					        	editControl.nameMod(''+protoId+'', ''+paramId+'')
					        	
					        }
					    }
					});

				},
				optionValueDialog : function (optionId, str){
					editControl.panel= new H.widget.msgBox({
					    title: "修改",
					    content: '<input type="text" id="value" name="value" value="'+str+'" style="height:20px;width:250px"><br /><br>',
					    type: "confirm",
					    buttons: [{ value: "确定" }, { value: "取消" }],
					    success: function (result) {
					        if (result == "确定") {
					        	editControl.valueMod(''+optionId+'')
					        }
					    }
					});
				},
				valueMod : function(optionId){
					var submitHandle = function(o) {
						new H.widget.msgBox({
						    title:"提示",
						    content:o.payload.message,
						    type:"error"
						});
					};
					var errorHandle = function(o){
						new H.widget.msgBox({
						    title:"错误提示",
						    content:o.desc,
						    type:"error"
						});
					};
					var value = DOM.val('#value');
					var data ="option_id="+optionId+"&value="+value;
					new H.widget.asyncRequest().setURI(valueuri).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
					window.location.reload();
				},
				defaultValueMod : function(protoId, paramId){

					var submitHandle = function(o) {
						new H.widget.msgBox({
						    title:"提示",
						    content:o.payload.message,
						    type:"error"
						});
					};
					var errorHandle = function(o){
						new H.widget.msgBox({
						    title:"错误提示",
						    content:o.desc,
						    type:"error"
						});
					};
					var value = DOM.val('#default_value');
					var data ="param_id="+paramId+"&default_value="+value+"&proto_id="+protoId;
					new H.widget.asyncRequest().setURI(defaulturi).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
					window.location.reload();
				},
				defauleValueDialog : function(protoId, paramId, str){
					editControl.panel= new H.widget.msgBox({
					    title: "修改",
					    content: '<input type="text" id="default_value" name="default_value" value="'+str+'" style="height:20px;width:250px"><br /><br>',
					    type: "confirm",
					    buttons: [{ value: "确定" }, { value: "取消" }],
					    success: function (result) {
					        if (result == "确定") {
					        	editControl.panel.hide();
					        	editControl.defaultValueMod(''+protoId+'', ''+paramId+'')
					        }
					    }
					});					

				},
//				addGroup : function(ele){
//					var groupTrId=1;
//					var groupTrStr ='<div class="w-470 margin-auto" id="groupTr-'+groupTrId+'">' 
//									+'<li class="clear" style=" padding-top:15px">'
//									+'<div class="active-add-edit-title w-100 align-right">参数选项：</div>'
//									+'<div class="active-add-edit-edit relative">'
//									+'<select name="value[]" onchange="change(this, '+groupTrId+')">'
//									+'<option value="0">请选择</option>'
////										<?php 
////										$_listCollection=$this->getLoadedCollection();
////										foreach ($_listCollection as $_list):
////										?>
////									+'<option value="<?php echo $_list->getData('param_id')?>"><?php echo $_list->getData('field_name')?></option>'
////										<?php endforeach; ?>
//									+'</select>'
//									+'<p class="note" id="J_promo_name" ></p>'
//									+'</div>'
//									+'</li>'
//									+'<li class="clear" id="content-'+groupTrId+'" style="display:none">'
//									+'<div class="active-add-edit-title w-100 align-right">选择值：</div>'
//									+'<div class="active-add-edit-edit relative">'
//									+'<input type="text" class="input-text w-360"  value="" name="content[]">'
//									+'<p class="note" id="J_promo_name" ></p>'
//									+'</div>'
//									+'</li>'
//									+'<li class="clear">'
//									+'<div class="active-add-edit-title w-100 align-right">默认值：</div>'
//									+'<div class="active-add-edit-edit relative">'
//									+'<input type="text" class="input-text w-360"  value="" name="default_value[]">'
//									+'<p class="note" id="J_promo_name" ></p>'
//									+'</div>'
//									+'</li>'
//									+'<li class="clear">'
//									+'<div class="active-add-edit-title w-100 align-right">参数名称：</div>'
//									+'<div class="active-add-edit-edit relative">'
//									+'<input type="text" class="input-text w-360"  value="" name="proto_field_name[]">'
//									+'<p class="note" id="J_promo_name" ></p>'
//									+'</div>'
//									+'</li>'
//									+'</div>';
//					var newNode = new S.Node(groupTrStr);
//					DOM.insertBefore(newNode,DOM.get("#group"));
//					groupTrId++; 
//				},
				delGroup : function(groupTrId){
					DOM.remove("#groupTr-"+groupTrId);
				},
				change : function (obj, groupTrId){
				    var strsel = obj.options[obj.selectedIndex].value;
					var submitHandle = function(o) {
						var flag = o.payload.flag;
						var groupTrId = o.payload.groupTrId;
					    if(groupTrId){
						   	if(flag){
						  		DOM.css('#content-'+groupTrId,'display','block');
						     }else{
						    	DOM.css('#content-'+groupTrId,'display','none');
						     }
					    } 
					};
					var errorHandle = function(o){
						new H.widget.msgBox({
						    title:"错误提示",
						    content:o.desc,
						    type:"error"
						});
					};
					window.location.reload();
				    var data ="param_id="+strsel+"&groupTr_id="+groupTrId;
				    new H.widget.asyncRequest().setURI(changeuri).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();   
				},
				changeHandle : function (result){

					var flag = result.payload.flag;
					var groupTrId = result.payload.groupTrId;
				    if(groupTrId){
					   	if(flag){
					  		DOM.css('#content-'+groupTrId,'display','block');
					     }else{
					    	DOM.css('#content-'+groupTrId,'display','none');
					     }
				    } 
				}				
	}
}, {
    requires: ['overlay']
});