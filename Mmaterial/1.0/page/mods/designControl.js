

KISSY.add(function (S,O,TShop) {
	var S = KISSY,DOM = S.DOM, Event = S.Event;	
	
	return designControl = {
	    		designPicPanel: null,
	    		currentDesignId: null,
	    		currentXmlPath: null,
	    		msg : null,
	    		initDesignFlag : false,
	    		getDesignContent : function(rawDid){
					var submitHandle = function(o) {
						DOM.html('#J_DesignDiv_'+rawDid, o.payload);
						DOM.css('#J_DesignDiv_'+rawDid,'position','relative');
						var height = DOM.height(DOM.get('#J_DesignDiv_'+rawDid+' img'));
						var width = DOM.width(DOM.get('#J_DesignDiv_'+rawDid+' img'));
						DOM.css('#J_DesignDiv_'+rawDid,'height',height);
						DOM.css('#J_DesignDiv_'+rawDid+' div','height',height);
						var box = DOM.get('#J_DesignDiv_'+rawDid)
						TShop.init(box);
						Event.on('#J_DesignDiv_'+rawDid+' .ds-bar-edit', 'click', function(evt) {
							designControl.showDesign('J_DesignDiv_'+rawDid);
						})
			    	};
			    	var errorHandle = function(o){
							new H.widget.msgBox({
							    title:"错误提示",
							    content:o.desc,
							    type:"error",
								autoClose : true,
								timeOut : 3000
							});
				    };
				    var designId = list.designPics[rawDid].designId;
				    var data = "designId="+designId+"&form_key="+FORM_KEY;
					new H.widget.asyncRequest().setURI(getDesignContentUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
				},
				
	    	    showDesign : function(divId) {
					designControl.currentDesignId = divId.substr(12);
	    			var designId = list.designPics[designControl.currentDesignId].designId;
					var XmlUrl = list.designPics[designControl.currentDesignId].xml_path;
					
	    			var params = {
	    		  			allowScriptAccess: "always",
	    		  			allowFullScreen:true,
	    		  			base:"http://img01.huanleguang.com/main/"
	    			};
	    			var flashvars = {
	    					mode: '7',
	    					designId: designId, 	  			
	    					sid: sid, 				
	    					xmlUrl:XmlUrl, 				
	    					saveNew:'yes', 
	    					protoId:protoId
	    			};
	    			if (! designControl.initDesignFlag) {
	    					swfobject.embedSWF("http://img01.huanleguang.com/main/Main.swf?v=50", "hlgFlash", "1080", "475", "7", "expressInstall.swf", flashvars, params);
	    				//	designControl.initDesignFlag = true;
	    			} else {
	    				designControl.thisMovie('hlgFlash').initDesign(flashvars);
	    			}
	    			
	    			if (!designControl.designPicPanel) {	
						designControl.designPicPanel = new O.Dialog({
								      width: 1080,
								      headerContent: '编辑主图促销图标',
								      bodyContent: '',
								      mask: false,
								      align: {
								          points: ['cc', 'cc']
								      },
								      closable :true,
								      draggable: true,
								      aria:true
						});
						designControl.designPicPanel.set('bodyContent',KISSY.clone(DOM.get('#hlgFlash')));
						designControl.designPicPanel.on('hide',function(){
							DOM.get('#J_design_icon_panel').style.display = 'none';
							DOM.get('#hlgFlash').style.visibility = 'hidden';
						})
	    			}
	    			designControl.designPicPanel.show();
					designControl.designPicPanel.get('el').attr('id','J_design_icon_panel');
					DOM.get('#J_design_icon_panel').style.display = 'block';
	    		},
	
	    	    thisMovie : function(movieName) {
	    			if (navigator.appName.indexOf("Microsoft") != -1) {
	    				return window[movieName];
	    			}else{
	    				return document[movieName];
	    			}
	    		},
	    		designFinish : function(fromDid, designId, xmlPath) {
	        		if(fromDid==null || designId==null || xmlPath==null) {
	            		
	            	}else{
		        		var rawDid = designControl.currentDesignId;
		    			list.designPics[rawDid].designId = designId;
		    			list.designPics[rawDid].xml_path = xmlPath;
		    			designControl.getDesignContent(rawDid);
	            	}
	        		DOM.get('#hlgFlash').style.visibility = 'hidden';
	    			designControl.designPicPanel.hide();
	    		}
				
	}
	
}, {
    requires: ['overlay','./tshop']
})
