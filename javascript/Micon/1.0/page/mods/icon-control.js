/**
 * @fileOverview 
 * @author  
 */
KISSY.add(function (S,showPages,O) {
    // your code here
    return iconControl = {
				mode: 0,
	    		commIcons: null,
	    		commDesignIcons: null,
	    		smartIcons: null,
	    		meIcons: null,
	    		designIconPanel: null,
	
	    		currentIconType: null,
	    		currentIconId: null,
	    		currentPositionId: 0,
	    		currentColorId: 0,
	    		customString: false,
	    		currentIconPic: null,
	    		currentXmlPath: null,
	    		
	    		currentItemId: null,
	    		currentItemPic: null,
	    		
	    		commPaginator: null,
	    		commDesignPaginator: null,
	    		smartPaginator: null,
	    		mePaginator: null,
	    		initCommFlag : false,
	    		initCommDesignFlag : false,
	    		initSmartFlag : false,
	    		initMeFlag : false,
	
	    		initDesignFlag : false,
	
	    		pageId : 1,
	    		totalRecords : 0,
	    		currentMode : 'comm',
	    		msg : null,
	    		
				//初始化 各个模块
	    		show : function(mode) {
					iconControl.currentMode = mode;
					var init = false;
					if (mode == 'comm' && !iconControl.initCommFlag) {
						init = true;				
					}
					if (mode == 'commDesign' && !iconControl.initCommDesignFlag) {
						init = true;				
					}
					if (mode == 'smart' && !iconControl.initSmartFlag) {
						init = true;				
					}
					if (mode == 'me' && !iconControl.initMeFlag) {
						init = true;
					}
					if (init) {
						iconControl.getIcons(1, 1);
					}
				},
				
				//获取图标
				getIcons : function(pageId, frontPageId) {
	        		//var typeId = '<?php echo $promo->getTypeId() ?>';
	    			var data = "mode="+ iconControl.currentMode+"&page_id="+pageId;
	    			var submitHandle = function(o) {
						DOM.hide('#J_LeftLoading');
						DOM.show('#icon_list_content');
	        			o = eval(o);
	        			switch (iconControl.currentMode) {
	        				case 'comm':
	        					iconControl.commIcons = o.icons;
	            				break;
	        				case 'commDesign':
	        					iconControl.commDesignIcons = o.icons;
	            				break;
	        				case 'smart':
	        					iconControl.smartIcons = o.icons;
	            				break;
	        				case 'me':
	        					iconControl.meIcons = o.icons;
	            				break;  
	        			}
	        			iconControl.totalRecords = o.totalRecords;
	        			if (iconControl.initCommFlag && iconControl.initCommDesignFlag && iconControl.initSmartFlag && iconControl.initMeFlag) {
	    	        		iconControl.initIconList(frontPageId);
	    	        		return ;
	            		}
	        			if (iconControl.currentMode == 'comm' && !iconControl.initCommFlag) {
	        				iconControl.initCommFlag = true;
	        				iconControl.initPaginator();
	        				return ;
	            		}
	        			if (iconControl.currentMode == 'commDesign' && !iconControl.initCommDesignFlag) {
	        				iconControl.initCommDesignFlag = true;
	        				iconControl.initPaginator();
	        				return ;
	            		}
	        			if (iconControl.currentMode == 'smart' && !iconControl.initSmartFlag) {
	        				iconControl.initSmartFlag = true;
	        				iconControl.initPaginator();
	        				return ;
	            		}
	        			if (iconControl.currentMode == 'me' && !iconControl.initMeFlag) {
	        				iconControl.initMeFlag = true;
	        				iconControl.initPaginator();
	        				return ;
	            		}
	        			iconControl.initIconList(frontPageId);
	    			};
					DOM.show('#J_LeftLoading');
					DOM.hide('#icon_list_content');
	                new H.widget.asyncRequest().setURI(getIconsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
	            },
	            
	            initIconList : function(frontPageId) {
	            	var pageId = Math.floor(frontPageId / iconControl.scale);
	            	if (pageId < Number(frontPageId / iconControl.scale)) {
	                	pageId ++;
	                }
	                //alert(pageId);
	                switch(iconControl.currentMode)
	                {
	                	case 'comm':
	                    	var listContainer = DOM.get("#J_CommIconList");
	    					var icons = iconControl.commIcons;
	    					break;
	                	case 'commDesign':
	                    	var listContainer = DOM.get("#J_CommDesignIconList");
	    					var icons = iconControl.commDesignIcons;
	                    	break;
	                	case 'smart':
	                    	var listContainer = DOM.get("#J_SmartIconList");
	    					var icons = iconControl.smartIcons;
	                    	break;
	                	case 'me':
	                    	var listContainer = DOM.get("#J_MeIconList");
	    					var icons = iconControl.meIcons;
	                    	break;
	            	} 
	            	if (pageId == iconControl.pageId) {
	                	var step = frontPageId - (pageId - 1)* iconControl.scale;
	            		var start = iconControl.frontPageNum * (step - 1);
	                	var end = iconControl.frontPageNum * step;
	                	if (end > icons.length) {
	                    	end = icons.length;
	                    }
	                } else {
	                	iconControl.pageId = pageId;
	                    iconControl.getIcons(pageId, frontPageId);
	                    return ;
	                }
	                
	            	var str = '';
	            	if (KISSY.UA.ie == 6) {
	                	listContainer.innerHTML = '';
	    			}
	    			for (i=start; i<end; i++) {
	    				var iconId = icons[i].id;
	    				var type = icons[i].type;
	    				if (type=='1' || type=='3') {
	    					var src = icons[i].pic;
	    				} else {
	    					var src = icons[i].pic + iconId + '.png';
	    				}
	    				if (KISSY.UA.ie == 6) {
	    					var img = document.createElement("img");
	    					img.className = "icon";
	    					img.id = iconId;
	    					img.style.width = "100px";
	    					img.style.height = "100px";
	    					img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+src+"', sizingMethod='crop')";
	    					img.src = "http://cdn.huanleguang.com/space.gif";
	    	            	if (iconControl.currentMode == 'me') {
								var span = document.createElement("span");
								span.className = "iconDele";
								var a = document.createElement("a");
								a.className = "iconDeletelink";
								a.href = "javascript:void(0);";
								a.data = iconId;
								span.appendChild(img);
								span.appendChild(a);
								listContainer.appendChild(span);
							}
							else {
								listContainer.appendChild(img);
							}
	    				} else {
							if(iconControl.currentMode == 'me'){
								str += '<span  class="iconDele">';
								str += '<img class="icon" width="100px" height="100px" id="'+iconId+'" src="' + src + '" />';
								str += '<a href="javascript:void(0)" data="'+iconId+'" class="iconDeletelink"></a></span>'
							}else{
								str += '<img class="icon" width="100px" height="100px" id="'+iconId+'" src="' + src + '" />';
							}
						}
						
						
						
	    			}
	    			if (KISSY.UA.ie != 6) {
	                	listContainer.innerHTML = str;
	    			}
	    			iconControl.attachIconEvent();
	    		},
	    		
	    		attachIconEvent : function() {
	    		    var hightLightIcon = function(e) {
	    			    switch(iconControl.currentMode) {
	    			    	case 'comm':
	    			    		var icons = iconControl.commIcons;
	    			    		break;
	    			    	case 'commDesign':
	    						var icons = iconControl.commDesignIcons;
	    				    	break;
	    			    	case 'smart':
	    						var icons = iconControl.smartIcons;
	    				    	break;
	    			    	case 'me':
	    						var icons = iconControl.meIcons;
	    				    	break;
	    			    }
	    		        DOM.removeClass(iconEls, 'hightLight');
	    		        DOM.addClass(this, 'hightLight');
	    		        iconControl.currentIconId = this.id;
	
	    		        var len = icons.length;
	    		        for (i=0; i<len; i++) {
	    			        if (icons[i].id == this.id) {
	        			        iconControl.initIcon(icons[i]);
	        			        break;
	        			    }
	    		        }
	    		    };
	    	        iconEls = DOM.query('.icon');
	    	        Event.on(iconEls, "click", hightLightIcon);
	    	    },
	    	    
	    		initIcon : function(icon, currentPositionId, currentColorId, defaultStr) {
	    	    	iconControl.currentIconId = icon.id;
	    	    	iconControl.currentIconType = icon.type;
	    			var type = icon.type;
	    			if (type == '1' || type == '3') {
	    				var src = icon.pic;
	    				iconControl.currentIconPic = icon.pic;
	    				iconControl.currentXmlPath = icon.xml_path;
	    				
	    				DOM.addClass(DOM.get("#J_IconProperty"), 'ks-hidden');
	    				DOM.removeClass(DOM.get("#J_IconDesign"), 'ks-hidden');
	    				Event.on(DOM.query('.design-online'),'click',iconControl.showDesign);
	    			} else {
	    				DOM.removeClass(DOM.get("#J_IconProperty"), 'ks-hidden');
	    				DOM.addClass(DOM.get("#J_IconDesign"), 'ks-hidden');
	    				var src = icon.pic;
	    				positions = icon.position.split(',');
	    		    	colors = icon.color.split(',');
	    		    	if (currentPositionId == null) {
	    			    	currentPositionId =0;
	    				}
	    		    	if (currentColorId == null) {
	    			    	currentColorId =0;
	    				}
	    		    	//初始化
	    		    	iconControl.currentPositionId = currentPositionId;
	    		    	iconControl.currentColorId = currentColorId;
	
	    		    	//自定义文字
	    		    	if (icon.custom_prop != null) {
	    			    	customs = icon.custom_prop.split(',');
	    			    	if (defaultStr!=null) {
	    				    	defaultStr = defaultStr.split(',');
	    					}
	    			   		customInput = '';
	    			    	var v = '';
	    			    	var limit = '';
	    			    	var note = '';
	    			    	for (var j=0; j<customs.length; j++) {
	    			    		customStr = customs[j].split('_');
	    				    	if (defaultStr!=null && defaultStr[j]!=null) v = defaultStr[j];
	    				    	if (customStr[1]!=null) note = customStr[1];
	    				    	if (customStr[0]!=null) limit = customStr[0];
	    			    		customInput += '自定义'+Number(j+1)+'：<input type="text" value="'+v+'" limit="'+limit+'" name="custom[]" size="15" /> '+note+'<br />';
	    			    	}
	    			    	DOM.get("#J_IconCustom").style.display = '';
	    			    	DOM.get("#J_Custom").innerHTML = customInput;
	    				} else {
	    					DOM.get("#J_IconCustom").style.display = 'none';
	    					DOM.get("#J_Custom").innerHTML = '';
	    				}
	    				var filename = icon.id + '_' + positions[currentPositionId] + '_' + (Number(currentColorId)+1);
	    	        	iconControl.initIconProperty(positions, colors, iconControl.currentPositionId, iconControl.currentColorId);
	    	        	src += filename + '.png';
	    			}
	    			if (KISSY.UA.ie == 6) {
	    				var img = document.createElement("img");
	    				img.style.width = "160px";
	    				img.style.height = "160px";
	    				img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+src+"', sizingMethod='crop')";
	    				img.src = "http://cdn.huanleguang.com/space.gif";
	    				DOM.get("#J_IconPreviewBox").innerHTML = '';
	    				DOM.get("#J_IconPreviewBox").appendChild(img);
	    			} else {
	    				var img = '<img src="' + src + '"  style="width:160px;height:160px"/>';
	    				DOM.get("#J_IconPreviewBox").innerHTML = img;
	    			}
	    			//D.removeClass(D.get("J_PreviewBox"), 'ks-hidden');
	        	},
	        	
	        	initPaginator : function() {
	        		
	        		var pageCount = Math.ceil(iconControl.totalRecords/iconControl.frontPageNum); 
	        		switch(iconControl.currentMode) {
	        			case 'comm':
	        				iconControl.commPaginator = new showPages('iconControl.commPaginator').setRender(iconControl.paginationHandle).setPageCount(pageCount).printHtml('#J_CommIconPaginator',2);
	            			break;
	        			case 'commDesign':
	        				iconControl.commDesignPaginator = new showPages('iconControl.commDesignPaginator').setRender(iconControl.paginationHandle).setPageCount(pageCount).printHtml('#J_CommDesignIconPaginator',2);
	            			break;
	        			case 'smart':
	        				iconControl.smartPaginator =  new showPages('iconControl.smartPaginator').setRender(iconControl.paginationHandle).setPageCount(pageCount).printHtml('#J_SmartIconPaginator',2);
	            			break;
	        			case 'me':
	        				iconControl.mePaginator = new showPages('iconControl.mePaginator').setRender(iconControl.paginationHandle).setPageCount(pageCount).printHtml('#J_MeIconPaginator',2);
	            			break;
	        		}
	        		iconControl.initIconList(1);
	        	},
	        	
	        	paginationHandle : function(turnTo) {
	            	var frontPageId = turnTo;
	            	iconControl.initIconList(frontPageId);
	            	switch(iconControl.currentMode) {
	            		case 'comm':
	            			iconControl.commPaginator.setPage(frontPageId).printHtml('#J_CommIconPaginator',2);
	            			break;
	            		case 'commDesign':
	            			iconControl.commDesignPaginator.setPage(frontPageId).printHtml('#J_CommDesignIconPaginator',2);
	            			break;
	            		case 'smart':
	            			iconControl.smartPaginator.setPage(frontPageId).printHtml('#J_SmartIconPaginator',2);
	                		break;
	            		case 'me':
	            			iconControl.mePaginator.setPage(frontPageId).printHtml('#J_MeIconPaginator',2);
	                		break;
	            	}
	            	return;
	            },
	            
	            initIconProperty : function(positions, colors, positionId, colorId) {
	    	        var colorLen = colors.length;
	    	        var colorStr = '';
	    	        for (var i=0; i<colorLen; i++) {
	    	            if(i == colorId){
	    	                selected = "selected";
	    	            } else {
	    	                selected = '';
	    	            }
	    	            colorStr += '<li class="' + selected + '" data="' + i + '" style="background:#' + colors[i] + ';"><span title="颜色" >颜色</span></li>';
	    	        }
	    	        DOM.html(DOM.get("#J_UlColor"), colorStr);
	    	        colorLis = DOM.query("#J_UlColor li");
	    	        var colorClickHandle = function(){
	    	        	var colorId = this.getAttribute('data');
	    	       		if(iconControl.currentColorId == colorId){
	    	           		return;
	    	            }
	    	            iconControl.currentColorId = colorId;
	    	            //alert(colorId);
	    	            DOM.removeClass(colorLis, 'selected');
	    	            DOM.addClass(this, 'selected');
	    	            changeIconProperty();
	    	        };
	    	        Event.on(colorLis, "click", colorClickHandle);
	    	        
	    	        var positionLen = positions.length;
	    	        var positionStr = '';
	    	        for (var i=0; i<positionLen; i++) {
	    	            var position = positions[i];
	    	            if(i == positionId){
	    	                selected = "selected";
	    	            } else {
	    	                selected = '';
	    	            }
	    	            if (position == 1) {
	    	        		positionStr += '<li data="1" position_id="'+i+'" class="icon-position p-lt '+selected+'"><span>左上</span></li>';
	    	        		continue;
	    	            }
	    	            if (position == 2) {
	    	            	positionStr += '<li data="2" position_id="'+i+'" class="icon-position p-rt '+selected+'"><span>右上</span></li>';
	    	        		continue;
	    	            }
	    	            if (position == 3) {
	    	            	positionStr += '<li data="3" position_id="'+i+'" class="icon-position p-rb '+selected+'"><span>右下</span></li>';
	    	        		continue;
	    	            }
	    	            if (position == 4) {
	    	            	positionStr += '<li data="4" position_id="'+i+'" class="icon-position p-lb '+selected+'"><span>左下</span></li>';
	    	        		continue;
	    	            }
	    	            if (position == 5) {
	    	            	positionStr += '<li data="5" position_id="'+i+'" class="icon-position p-t '+selected+'"><span>上</span></li>';
	    	        		continue;
	    	            }
	    	            if (position == 6) {
	    	            	positionStr += '<li data="6" position_id="'+i+'" class="icon-position p-b '+selected+'"><span>下</span></li>';
	    	        		continue;
	    	            }
	    	            if (position == 7) {
	    	            	positionStr += '<li data="7" position_id="'+i+'" class="icon-position p-l '+selected+'"><span>左</span></li>';
	    	        		continue;
	    	            }
	    	            if (position == 8) {
	    	            	positionStr += '<li data="8" position_id="'+i+'" class="icon-position p-r '+selected+'"><span>右</span></li>';
	    	        		continue;
	    	            }
	    	            if (position == 9) {
	    	            	positionStr += '<li data="9" position_id="'+i+'" class="icon-position p-r '+selected+'"><span>中</span></li>';
	    	        		continue;
	    	            }
	    	        }
	    	        DOM.html(DOM.get("#J_UlPosition"),positionStr);
	    	        positionLis = DOM.query("#J_UlPosition li");
	    	        var positionClickHandle = function(e){
	    	        	var position = this.getAttribute('data');
	    	        	var positionId = this.getAttribute('position_id');
	    	        	if(iconControl.currentPositionId == positionId){
	    	            	return;
	    	            }
	    	            iconControl.currentPositionId = positionId;
	    	            DOM.removeClass(positionLis, 'selected');
	    	            DOM.addClass(this, 'selected');
	    	            changeIconProperty();
	    	        };
	    	        Event.on(positionLis, "click", positionClickHandle);
	
	    	        var changeIconProperty = function() {
	    	        	var src = "http://img01.huanleguang.com/icon/";
	    	        	var filename = '';
	    	            if(iconControl.currentIconId == null ) {
	    	                alert('请先选择促销标签');
	    	                return false;
	    	            }
	    	            var pc = positions[iconControl.currentPositionId] + '_' + (Number(iconControl.currentColorId) + 1);
	    	    		filename = iconControl.currentIconId + '_' + pc;
	    	    		src += filename + '.png';
	    	    		if (KISSY.UA.ie == 6) {
	    	    			var img = document.createElement("img");
	    	    			img.style.width = "160px";
	    	    			img.style.height = "160px";
	    	    			img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+src+"', sizingMethod='crop')";
	    	    			img.src = "http://cdn.huanleguang.com/space.gif";
	    	    			DOM.get("#J_IconPreviewBox").innerHTML = '';
	    	    			DOM.get("#J_IconPreviewBox").appendChild(img);
	    	    		} else {
	    	    			var img = '<img src="' + src + '" style="width:160px;height:160px" />';
	    	    			DOM.get("#J_IconPreviewBox").innerHTML = img;
	    	    		}
	    	        };
	    	    },
	    	    
	    	    showDesign : function() {
	        	    if (iconControl.mode == 1) {
	    				//H.promotion.iconPanel.hide();
	        			var stageBg = iconControl.currentItemPic + '_310x310.jpg';
	        	    } else {
	            	    var stageBg = 'http://img03.taobaocdn.com/bao/uploaded/i3/T1xc4QXoppXXaxXvA9_073332.jpg_310x310.jpg';
	            	}
	        	    
	    	    	iconControl.designIcon(iconControl.currentIconId, iconControl.currentXmlPath, iconControl.currentItemId, stageBg);
	    		},
	    		
	    	    thisMovie : function(movieName) {
	    			if (navigator.appName.indexOf("Microsoft") != -1) {
	    				return window[movieName];
	    			}else{
	    				return document[movieName];
	    			}
	    		},
	    		
	    		designIcon : function(iconId, xmlPath, itemId, stageBg)
	    		{	
					var params = {
	    		  			allowScriptAccess: "always",
							allowFullScreen:true,
							base:"http://img01.huanleguang.com/main/"
	    			};
	    			var flashvars = {
	    		  			mode: '2',
	    		  			designId: iconId,
	    		  			sid: sid,
	    					xmlUrl: xmlPath,
	    					productId: itemId,
	    					stageBg: stageBg
	    			};  
	    			if (! iconControl.initDesignFlag) {
						 var shopId = DOM.val('#J_ShopId');
						 if (shopId == 44281) {
						 	swfobject.embedSWF("http://img01.huanleguang.com/main/Main.swf?v=50", "hlgFlash", "1080", "575", "7", "expressInstall.swf", flashvars, params);
						 }
						 else {
							 if (shopId == 146483) {
							 	swfobject.embedSWF("http://img01.huanleguang.com/main/Main.swf", "hlgFlash", "1080", "575", "7", "expressInstall.swf", flashvars, params);
							 }else {
								 swfobject.embedSWF("http://img01.huanleguang.com/main/Main.swf?v=50", "hlgFlash", "1080", "575", "7", "expressInstall.swf", flashvars, params);
							 }
						 	//swfobject.embedSWF("http://img01.huanleguang.com/m1127.swf?v=50", "hlgFlash", "830", "475", "7", "expressInstall.swf", flashvars, params);
						 }
					} else {
	    				iconControl.thisMovie('hlgFlash').initDesign(flashvars);
	    			}
	    			
	    			if (! iconControl.designIconPanel) {	
	    				 
						iconControl.designIconPanel = new O.Dialog({
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
						iconControl.designIconPanel.set('bodyContent',KISSY.clone(DOM.get('#hlgFlash')));
						iconControl.designIconPanel.on('hide',function(){
							DOM.get('#J_design_icon_panel').style.display = 'none';
							DOM.get('#hlgFlash').style.visibility = 'hidden';
						})
	    			}
	    			iconControl.designIconPanel.show();
					iconControl.designIconPanel.get('el').attr('id','J_design_icon_panel');
					DOM.get('#J_design_icon_panel').style.display = 'block';
	    		},
	    		
	    		designFinish : function(designId, xmlPath, picUrl) {
	    			iconControl.currentIconId = designId;
	    			iconControl.currentIconPic = picUrl;
	    			iconControl.currentXmlPath = xmlPath;
	    			
	    			if (iconControl.initMeFlag) {
	    				iconControl.initMeFlag = false;
	    			}
	        		if (KISSY.UA.ie == 6) {
	        			var img = document.createElement("img");
	        			img.style.width = "160px";
	        			img.style.height = "160px";
	        			img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+picUrl+"', sizingMethod='crop')";
	        			img.src = "http://cdn.huanleguang.com/space.gif";
	        			DOM.get("#J_IconPreviewBox").innerHTML = '';
	        			DOM.get("#J_IconPreviewBox").appendChild(img);
	        		} else {
	        			var img = '<img src="' + picUrl + '" style="width:160px;height:160px" />';
	        			DOM.get("#J_IconPreviewBox").innerHTML = img;
	        		}
	    			if (iconControl.currentMode == 'commDesign') {
	    				DOM.addClass(DOM.get("#icon_list_commDesign_content"), "ks-hidden");
	    				DOM.removeClass(DOM.get("#icon_list_me_content"), "ks-hidden");
	    				DOM.addClass(DOM.get('#icon_list_me'), 'active');
	    				DOM.removeClass(DOM.get('#icon_list_commDesign'), 'active');				
	    			}
	    			//iconControl.show('me');
//	    			if (iconControl.mode == 1) {
//	    				H.promotion.saveIcon();
//	    			}
	    			
	        		DOM.get('#hlgFlash').style.visibility = 'hidden';
	    			iconControl.designIconPanel.hide();
	    		}
					
		};
}, {
    requires: ['utils/showPages/index','overlay']
});