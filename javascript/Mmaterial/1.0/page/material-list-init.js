/**
 * @fileOverview 
 * @author  
 */
KISSY.add(function (S,O) {
    // your code here
	var DOM = S.DOM, Event = S.Event;	
	
	return list = {
			panel: null,
			meg : null,
			init: function() {
				
					list.panel = new O.Dialog({
					      width: 395,
					      headerContent: '获取代码',
					      bodyContent: '',
					      mask: false,
					      align: {
					          points: ['cc', 'cc']
					      },
					      closable :true,
					      draggable: true,
					      aria:true
					});
					Event.on(DOM.query('.J_StartDesign'),'click',function(e){
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
							}
						}
					})
					var els = DOM.query('.J_List');
					Event.on(els,'click',function(e){
						 e.preventDefault();
	                     var lid = DOM.attr(e.currentTarget,"lid");
	                     list.get(lid);
					})
					Event.on(DOM.query('.J_releaseCode'),'click',function(ev){
						var CodeUrl = DOM.attr(ev.currentTarget,"data-url");
						if(!showPermissions('editor_material','促销素材')){
							return ;
							
						}
		                if(isVersionPer('material')){
		                    return ;
		                } 
		                window.location.href = CodeUrl;
					})
			    },
			    
			    get: function(lid) {
			    	if(!showPermissions('editor_material','促销素材')){return ;}
	                if(isVersionPer('material')){
	                    return ;
	                }
	                var submitHandle = function(o) {
	                    	list.msg.hide();
	                    	var cont = '<div><textarea style="width:380px;height:200px;margin:5px;" id="J_Templet_Content" onclick="this.select()">'+o.payload+'</textarea></br><span class="btm-68-gray fl"><a href="#2"  class="J_Copy"><span>点此复制</span></a></span><span style="height:31px; line-height:31px">鼠标于框内CTRL+C：复制、CTRL+V：粘贴</span></div>';
	                    	list.panel.set('bodyContent',cont);
	                    	list.panel.show();
							H.util.clipboard('.J_Copy','#J_Templet_Content');
	                };
		        	var errorHandle = function(o){
						list.msg.hide();
	                    new H.widget.msgBox({
						    title:"错误提示",
						    content:o.desc,
						    type:"error"
						});
		        	}; 
		        	 list.msg = new H.widget.msgBox({
										dialogType : 'loading',
									    content:'正在获取代码！'	
									});
		    	    var data = "id="+lid;
		        	new H.widget.asyncRequest().setURI(getListUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			    },
			    design : function(id){
					var tempFormatProto = '';
					var tempItems = document.getElementsByName('J_Mid_'+id);
					for(var i=0;i<tempItems.length;i++){
						if(tempItems[i].checked){
							tempFormatProto = tempItems[i].value.split('-');
							break;
						}
					}
					window.location.href = designUrl+"&proto_id="+tempFormatProto[1]+"&items_per_line="+tempFormatProto[0];
				},
				turn : function(shareId, protoId){
					alert('a');
				},
				collect : function(share_id){
					var submitHandle = function(o) {
			    		DOM.html('#J_Collect_'+share_id, '已收藏')
		        	};
		        	var errorHandle = function(o) {
			    		new H.widget.msgBox({
								    title:"错误提示",
								    content:o.desc,
								    type:"error"
								});
		        	};
		    	    var data = "share_id="+share_id;
		        	new H.widget.asyncRequest().setURI(collectUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
					
				},
				cancelCollect : function(favorite_id){
					var submitHandle = function(o) {
			    		DOM.remove('#J_Bm_Wrap_'+favorite_id)
		        	};
		        	var errorHandle = function(o) {
			    		new H.widget.msgBox({
								    title:"错误提示",
								    content:o.desc,
								    type:"error"
								});
		        	};
		    	    var data = "favorite_id="+favorite_id;
		        	new H.widget.asyncRequest().setURI(cancelCollectUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
					
				}
			}
}, {
    requires: ['overlay']
});