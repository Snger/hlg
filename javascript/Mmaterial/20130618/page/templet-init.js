/*
combined files : 

page/templet-init

*/

/**
 * @fileOverview 
 * @author  
 */
KISSY.add('page/templet-init',function (S,O) {
    // your code here
	var DOM = S.DOM, Event = S.Event;	
	
	return 	templet = {
			panel: null,
			msg : null,
			init: function() {
			    els = DOM.query('.J_Templet');
			    var liClickFun = function(e){
			    	e.preventDefault();
			    	var tid = DOM.attr(this,"tid");
			    	templet.get(tid);
			    }
			    Event.on(els, "click", liClickFun);
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
												window.open(url, "_blank");
									        }
				    				}
								});
							return 
						}
					}
				})
				Event.on(DOM.query('.J_ReleaseCode'),'click',function(ev){
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
		    get: function(tid) {
				if(!showPermissions('editor_material','促销素材')){
				 	return ;
				}else{
					if(isVersionPer('material')){
						return 
					}
				}
		    	if(! templet.panel){
		    		templet.panel = new O.Dialog({
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
		    	}
	        	var submitHandle = function(o) {
	        		templet.panel.set('bodyContent','<div><textarea style="width:380px;height:200px;margin:5px" id="J_Templet_Content" onclick="this.select()">'+o.payload+'</textarea></br><span class="btm-68-gray fl"><a href="#2"  class="J_Copy"><span>点此复制</span></a></span><span style="height:31px; line-height:31px">鼠标于框内CTRL+C：复制、CTRL+V：粘贴</span></div>');
					templet.panel.show();
					H.util.clipboard('.J_Copy','#J_Templet_Content')
	        	};
	        	var errorHandle = function(o){
					new H.widget.msgBox({
					    title:"错误提示",
					    content:o.desc,
					    type:"error"
					});
	        	};
//	        	templet.msg.setMsg('正在获取代码！').show();
	    	    var data = "tid="+tid;
	        	new H.widget.asyncRequest().setURI(getTempletUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
		    },
		    share : function(materialType, id) {
		    	business = DOM.val(DOM.get('#J_Business_'+id));
		    	type = DOM.val(DOM.get('#J_Type_'+id));
		    	size = DOM.val(DOM.get('#J_Size_'+id));
		    	festival = DOM.val(DOM.get('#J_Festival_'+id));
		    	level = DOM.val(DOM.get('#J_Level_'+id));
		    	var submitHandle = function(o) {
		    		DOM.get("#J_Oper_"+id).innerHTML = '共享成功';
	        	};
	    	    var data = "material_type="+materialType+"&id="+id+"&business="+business+"&type="+type+"&size="+size+"&festival="+festival+"&level="+level;
	        	new H.widget.asyncRequest().setURI(shareTempletUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();	    	
			},
			levelAction : function(materialType, id) {
				var levelNum = DOM.val(DOM.get('#J_Level_'+id));
		    	var submitHandle = function(o) {
					new H.widget.msgBox({
					    title:"成功提示",
					    content:'操作成功',
					    type:"info"
					});
	        	};
	    	    var data = "material_type="+materialType+"&id="+id+"&level="+levelNum;
	        	new H.widget.asyncRequest().setURI(levelTempletUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			design : function(id){
				var tmpId = '';
				var tempItems = document.getElementsByName('J_Mid_'+id);
				for(var i=0;i<tempItems.length;i++){
					if(tempItems[i].checked){
						tmpId = tempItems[i].value;
						break;
					}
				}
				var uri = designUrl+"&templet_id="+tmpId;
				window.open(uri, "_blank");
			},
			designOld : function(id){
				var tmpId = '';
				var tempItems = document.getElementsByName('J_Mid_'+id);
				for(var i=0;i<tempItems.length;i++){
					if(tempItems[i].checked){
						tmpId = tempItems[i].value;
						break;
					}
				}
				var uri = designUrl+"&templet_id="+tmpId+"&isOld=1";
				window.open(uri, "_blank");
			},
			turn : function(id, tmpId,num){
				
				var submitHandle = function(o) {
		    		DOM.html("#J_Content_"+id, o.payload);
		    		DOM.html("#J_TempletIdBox"+id, tmpId);
		    		//DOM.html("#J_TempletUseNumBox"+id, num);
	        	};
	    	    var data = "&templet_id="+tmpId;
	    	    //alert(data);
	        	new H.widget.asyncRequest().setURI(getContentUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			cancelAssociate : function(tmpId){
				var submitHandle = function(o) {
					new H.widget.msgBox({
					    title:"成功提示",
					    content:'操作成功',
					    type:"info"
					});
		    		window.location.reload();
	        	};
	        	var errorHandle = function(o) {
					new H.widget.msgBox({
					    title:"错误提示",
					    content:o.desc,
					    type:"error"
					});		    		
		    		return;
	        	};
	    	    var data = "templet_id="+tmpId;
	        	new H.widget.asyncRequest().setURI(cancelAssociateUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			},
			associate : function(){
				var submitHandle = function(o) {
					new H.widget.msgBox({
					    title:"成功提示",
					    content:'操作成功',
					    type:"info"
					});
		    		window.location.reload();
	        	};
	        	var errorHandle = function(o) {
					new H.widget.msgBox({
					    title:"错误提示",
					    content:o.desc,
					    type:"error"
					});	
		    		return;
	        	};
	        	
				var ass_ids = '';
				var tempItems = document.getElementsByName('ass_ids[]');
				for(var i=0;i<tempItems.length;i++){
					if(tempItems[i].checked){
						ass_ids = ass_ids+tempItems[i].value+',';
					}
				}
				ass_ids = ass_ids.substr(0,ass_ids.length-1);
	    	    var data = "ass_ids="+ass_ids;
	        	new H.widget.asyncRequest().setURI(associateUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
				
			},
			associateByHand : function(){
				var submitHandle = function(o) {
					new H.widget.msgBox({
					    title:"成功提示",
					    content:'操作成功',
					    type:"info"
					});
		    		window.location.reload();
	        	};
	        	var errorHandle = function(o) {
					new H.widget.msgBox({
					    title:"错误提示",
					    content:o.desc,
					    type:"error"
					});	
		    		return;
	        	};
	        	var ass_ids = DOM.val('#J_AssIds'); 
	        	if(ass_ids.split(',').length<2){
					new H.widget.msgBox({
					    title:"错误提示",
					    content:'请输入至少2个不同规格海报，用,分隔',
					    type:"error"
					});		            	
	            	return;
	        	}
	    	    var data = "ass_ids="+ass_ids;
	        	new H.widget.asyncRequest().setURI(associateUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
				
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
		    		return;
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
		    		return;
	        	};
	    	    var data = "favorite_id="+favorite_id;
	        	new H.widget.asyncRequest().setURI(cancelCollectUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
				
			},
			setTop : function() {
				var submitHandle = function(o) {
					new H.widget.msgBox({
					    title:"成功提示",
					    content:o.desc,
					    type:"info"
					});	
		    		return;
	        	};
	        	var errorHandle = function(o) {
					new H.widget.msgBox({
					    title:"错误提示",
					    content:o.desc,
					    type:"error"
					});	
		    		return;
	        	};
	    	    var data = "festival="+DOM.val(DOM.get('#J_TopFestival'));
	    	    new H.widget.asyncRequest().setURI(setTopFestivalUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();	    	
			},
			add_ding : function(share_id){
				var submitHandle = function(o) {
		    		DOM.html('#J_Ding_'+share_id, '已赞');
		    		var num = Number(DOM.html('#J_Ding_Number_'+share_id))+1;
		    		DOM.html('#J_Ding_Number_'+share_id, num);
	        	};
	        	var errorHandle = function(o) {
					new H.widget.msgBox({
					    title:"错误提示",
					    content:o.desc,
					    type:"error"
					});	
		    		return;
	        	};
	    	    var data = "share_id="+share_id;
	        	new H.widget.asyncRequest().setURI(praiseUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
				
			}
	}
}, {
    requires: ['overlay']
});
