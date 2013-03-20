/**
 * @fileOverview 
 * @author  
 */
KISSY.add(function (S,showPages) {
    // your code here
	var DOM = S.DOM, Event = S.Event;	
	
	return listControl = {
			init : function() {
				var Temple = DOM.query('.J_Height');
				for(i=0;i<10;i++){
					Height = DOM.height(Temple[i]);
					if(Height>300){
						aa = 'temple_'+[i];
						Parent = DOM.parent('.'+aa);
						DOM.replaceClass(Parent,'normal','overflow');
					}
				}
				Event.on('.float-icon','click',function(ev){
					var Parent = DOM.parent(ev.currentTarget,'.J_Height');
					if(DOM.hasClass(Parent,'overflow')){
						DOM.replaceClass(Parent,'overflow','normal');
					}else{
						DOM.replaceClass(Parent,'normal','overflow');
					}
				})
				
				var oTriggers = DOM.query('.J_Delete');
		    	Event.on(oTriggers, "click",function(ev){
		    		var id = DOM.attr(ev.currentTarget,'data');
		    		listControl.deleteHandle(id)
		    	})
				Event.on('#J_Release','click',function(e){
					 e.preventDefault();
					 if(!showPermissions('editor_material','促销素材')){
					 	return ;
					 }else{
						var url = DOM.attr(e.currentTarget,"data-url");
						if(isVersionPer('material',false)){
							new H.widget.msgBox({
								    title:"温馨提示",
								    content:'只提供制作体验，尊享版才能享受素材投放功能',
								    type:"info",
									buttons: [{ value: "继续体验" }, { value: "关闭" }],
									success: function (result) {
									        if (result == "继续体验") {
												window.location.href = url;
									        }
				    				}
								});
							return 
						}else{
							window.location.href = url;
						}
					}
				})
			},
			
			deleteHandle :function(id){
				new H.widget.msgBox({
				    title: "删除列表",
				    content: "系统将为您取消此活动设置的列表信息",
				    type: "confirm",
				    buttons: [{ value: "删除" }, { value: "取消" }],
				    success: function (result) {
				        if (result == "删除") {
							var submitHandle = function(o) {
								window.location.href = currentUrl;
							};
							var errorHandle = function(o){
								new H.widget.msgBox({
								    title:"错误提示",
								    content:o.desc,
								    type:"error"
								});
							}
							var data = "id="+id+"&form_key="+FORM_KEY;
						  	new H.widget.asyncRequest().setURI(deleteUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			
				        }
				    }
				});
			
						
			},
			
			search : function(){
				var list_id = DOM.val('#J_SearchListId');
				var pos = DOM.val('#J_Pos');
				var mt = DOM.val('#J_Mtype');	
				if(DOM.val(DOM.get("#J_SearchName")) != '输入素材名称'){
					var searchName = encodeURIComponent(DOM.val(DOM.get("#J_SearchName"))); //标题
		    	}else{
		    	    var searchName ='';
		    	}
				var url = currentUrl+"&pos="+pos+"&mt="+mt+"&searchName="+searchName+"&list_id="+list_id;
			  	window.location.href=url;
			}
		
	}
}, {
    requires: ['utils/showPages/index']
});