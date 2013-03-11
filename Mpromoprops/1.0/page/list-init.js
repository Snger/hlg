/**
 * @fileOverview 
 * @author  
 */
KISSY.add(function (S) {
    // your code here
	var DOM = S.DOM, Event = S.Event;	
	return PromopropsList = {
			    	Paginator : null,
			    	msg : null,
			    	init : function() {
						var oTriggers = DOM.query('.J_Delete');
				    	Event.on(oTriggers, "click", PromopropsList.deleteHandle);
			        },
					deleteHandle : function(){
			        	if(!showPermissions('editor_promoprops','促销道具')){return ;}
						var id = DOM.attr(this,'data');
						
						new H.widget.msgBox({
						    title: "删除优惠券",
						    content: '删除后该优惠券将失效且不能恢复，确定要删除？',
						    type: "confirm",
						    buttons: [{ value: "确定删除" }, { value: "取消" }],
						    success: function (result) {
						        if (result == "确定删除") {
									ev.preventDefault();
									var submitHandle = function(o) {
									  	window.location.href=curentUrl;
									};
									var error = function(o){
										new H.widget.msgBox({
										    title:"错误提示",
										    content:o.desc,
										    type:"error"
										});
									};
									var data = "pid="+id+"&form_key="+FORM_KEY;
							  		new H.widget.asyncRequest().setURI(deleteUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(error).setData(data).send();
						        }
						    }
						});
								
					}
	    	};

	
}, {
    requires: []
});