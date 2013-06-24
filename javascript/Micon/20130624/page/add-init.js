/*
combined files : 

page/mods/icon-control
utils/showPages/index
page/add-init

*/
/**
 * @fileOverview 
 * @author  
 */
KISSY.add('page/mods/icon-control',function (S,showPages,O) {
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
/**
 * @分页组件
 * @author  
 */
KISSY.add('utils/showPages/index',function (S) {
	var DOM = S.DOM, Event = S.Event, doc = document;
  
	function showPages(name) { //初始化属性 
		var self = this; 
        if (!(self instanceof showPages)) { 
        	return new showPages(name); 
        } 	
		this.pageNum = 4 ;   
		this.name = name;      //对象名称
        this.page = 1;         //当前页数
        this.pageCount = 200;    //总页数
        this.argName = 'page'; //参数名	
  	}

	S.mix(showPages.prototype,{
		jump: function() {
	        return undefined;
	  	},
		
	    //进行当前页数和总页数的验证
        checkPages: function() { 
	     	if (isNaN(parseInt(this.page))) this.page = 1;
		 	if (isNaN(parseInt(this.pageCount))) this.pageCount = 1;
		 	if (this.page < 1) this.page = 1;
		 	if (this.pageCount < 1) this.pageCount = 1;
		 	if (this.page > this.pageCount) this.page = this.pageCount;
		 	this.page = parseInt(this.page);
		 	this.pageCount = parseInt(this.pageCount);
     	},
		
		//生成html代码	  
     	_createHtml: function(mode) { 
	   
         	var self = this, strHtml = '', prevPage = this.page - 1, nextPage = this.page + 1;   
            if (mode == '' || typeof(mode) == 'undefined') mode = 1;
		
            switch (mode) {
				case 1: 
					//模式1 (页数)
                    /* strHtml += '<span class="count">Pages: ' + this.page + ' / ' + this.pageCount + '</span>';*/
                    strHtml += '<span class="number">';
                    if (this.page != 1) {
						strHtml += '<span title="Page 1"><a href="javascript:' + self.name  + '.toPage(1);">1</a></span>';
				    }
                    if (this.page >= 5) {
				   		strHtml += '<span>...</span>';
				    }
				    if (this.pageCount > this.page + 2) {
                   		var endPage = this.page + 2;
                    } else {
                        var endPage = this.pageCount; 
                      }
                    for (var i = this.page - 2; i <= endPage; i++) {
					if (i > 0) {
						if (i == this.page) {
							strHtml += '<span title="Page ' + i + '">' + i + '</span>';
						} else {
							if (i != 1 && i != this.pageCount) {
								strHtml += '<span title="Page ' + i + '"><a href="javascript:' + self.name + '.toPage(' + i + ');">' + i + '</a></span>';
							}
				          }
                    }
                    }
                    if (this.page + 3 < this.pageCount) {
						strHtml += '<span>...</span>';
					}
                    if (this.page != this.pageCount) {
						strHtml += '<span title="Page ' + this.pageCount + '"><a href="javascript:' + self.name + '.toPage(' + this.pageCount + ');">' + this.pageCount + '</a></span>';
					}
					strHtml += '</span><br />';
                    break;
								 
				case 2: 
					//模式2 (前后缩略,页数,首页,前页,后页,尾页)
					
					if(this.pageCount > 1){
	                    strHtml += '<div class="page-bottom"> <div class="sabrosus">';
	                    if (prevPage < 1) {
	                        strHtml += '<span class="pre-none page-pic-no"></span>';
	                    } else {
	                        strHtml += '<a class="" href="javascript:' + self.name + '.toPage(' + prevPage + ');" title="上一页"><span class="pre page-pic-no"></span></a>';
	                      }
	                    if (this.page != 1) {
							//strHtml += ' <a class="a-padding" href="javascript:' + self.name  + '.toPage(1);">1</a>';
						}
						if(this.page - 2<=0){
							var start = 1;
								if (this.pageCount > this.page + 4) {
	                           		var endPage = this.page + 4;
	                           } else {
	                             	var endPage = this.pageCount; 
	                            }
						}else if(this.page + 2>=this.pageCount){
							var start = this.pageCount-4;
							if (this.pageCount > this.page + 4) {
	                       		var endPage = this.page + 4;
	                        } else {
	                         	var endPage = this.pageCount; 
	                        }
						}else {
							var start = this.page - 2;
							if (this.pageCount > this.page + 2) {
		                           		var endPage = this.page + 2;
		                           } else {
		                             	var endPage = this.pageCount; 
		                             }
						}
	                    for (var i = start; i <= endPage; i++) {
	                    if (i > 0) {
	                       	if (i == this.page) {
	                           	strHtml += '<span class="current a-padding">'+ i + '</span>';
	                        } else {
	                           // if (i != 1 && i != this.pageCount) {
	                              	strHtml += '<a class="a-padding" href="javascript:' + self.name + '.toPage(' + i + ');">' + i + '</a>';
	                           // }
						      }
	                    }
	                    }
	                    if (this.page + 5 < this.pageCount) {
							strHtml += '<a class="a-padding" title="" href="javascript:' + self.name + '.toPage(' + (this.page + 3) + ');">...</a>';
						}
				  	    if (this.page != this.pageCount) {
							//strHtml += '<span title="Page ' + this.pageCount + '"><a href="javascript:' + self.name + '.toPage(' + this.pageCount + ');">' + this.pageCount + '</a></span>';
						}
						if (nextPage > this.pageCount) {
	                    	strHtml += '<span class="next-none page-pic-no"></span>';
	                    } else {
	                        strHtml += '<a class="" href="javascript:' + self.name + '.toPage(' + nextPage + ');" title="下一页"><span class="next page-pic-no"></span></a>';
	                      }
						 if (this.pageCount > 5) {
			   					strHtml += '<font class="number">';
			   					strHtml += '共'+this.pageCount+'页&nbsp;到第&nbsp;';
			   					if(this.page>=this.pageCount){
			   						strHtml += '<input style="" type="text" class="page-pic-no w-30 bg-img" id="pageInput' + self.name + '"  value="' + this.pageCount + '" onkeypress="return window.' + self.name + '.formatInputPage(event);" onfocus="this.select()">&nbsp;页';
			   					}else{
			   						strHtml += '<input style="" type="text" class="page-pic-no w-30 bg-img" id="pageInput' + self.name + '"  value="' + (this.page+1) + '" onkeypress="return window.' + self.name + '.formatInputPage(event);" onfocus="this.select()">&nbsp;页';
			   					}
			   					strHtml += '<input type="button" value="" class="page-pic-no gray-btm-h-go w-30 btm-go" onclick="javascript:var page = document.getElementById(\'pageInput' + self.name + '\').value; if(isNaN(Number(page))|| Number(page)==0) { var turnTo = 1;} else if(page>'+this.pageCount+'){ var turnTo = '+this.pageCount+';} else{var turnTo = page;}  window.' + self.name + '.toPage(turnTo);">';
			   					strHtml += '</font>';	
			   					}
	                   strHtml += '<div style="clear:both"></div></div></div> ';
					}
                   break;
			   case 3 :
				   strHtml += '<div class="page-top"><div class="sabrosus"><span class="count">' + this.page + ' / ' + this.pageCount + '</span>';
                   if (prevPage < 1) {
                       strHtml += ' <span class="pre-none page-pic-no"></span>';
                   } else {
                       strHtml += '<a class="border-left-dedede" href="javascript:' + self.name + '.toPage(' + prevPage + ');" title="上一页"><span class="pre page-pic-no"></span></a>';
                     }
                   if (nextPage > this.pageCount) {
                   	strHtml += '<span class="next-none page-pic-no"></span>';
                   } else {
                       strHtml += '<a href="javascript:' + self.name + '.toPage(' + nextPage + ');" title="下一页"><span class="next page-pic-no"></span></a>';
                     }
                  strHtml += '<div style="clear:both"></div></div></div>';
                  break;
					
			}
		    return strHtml;
			   
		},
		 //限定输入页数格式
		formatInputPage : function(e){
			var ie = navigator.appName=="Microsoft Internet Explorer"?true:false;
			if(!ie) var key = e.which;
			else var key = event.keyCode;
			if (key == 8 || key == 46 || (key >= 48 && key <= 57)) return true;
			return false;
		},
      
	    //页面跳转 返回将跳转的页数
		toPage: function( page ,flag) { 
        	var turnTo = 1;
			var self = this;    
            if (typeof(page) == 'object') {
            	turnTo = page.options[page.selectedIndex].value;
            } else {
               	turnTo = page;
              }
			
            self.jump(turnTo,flag,'');
			  
		},
			  
        //显示html代码
	    printHtml: function(contian, mode) {  
			this.checkPages();
            DOM.html(contian,this._createHtml(mode));
			return this;
		},
				   
	    //设置总页数			  
	    setPageCount: function( pagecount ) {
			this.pageCount=pagecount;
	 	    return this;
		},			    
	    
		getPageCount: function() {
            return this.pageCount;
	    },
	    
		//设置跳转 执行函数
        setRender: function(fn) {
			this.jump = fn;
			return this;
		},	
     	setPageNum:function(page_num){
	        this.pageNum = page_num;
		    return this;
		 },
		setPage:function(page){
		    this.page = page;  
		    return this; 
	    }   	   

		  	   
	});

	return showPages;
  
});
/**
 * @fileOverview 
 * @author  
 */
KISSY.add('page/add-init',function (S,iconControl) {
    // your code here
   return addControl = {
		msg : null,
		init : function(){
			// input 边框变化  
			var inputs = DOM.filter (DOM.query('input'),function(i){if(i.type =='text')return true;})
			Event.on(inputs,'focus blur',function(ev){
				if(ev.type == 'focus'){
					DOM.removeClass(ev.target,'input-text text text-error');
					DOM.addClass(ev.target,'input-text-on');
				} else if(ev.type == 'blur'){
					DOM.removeClass(ev.target,'input-text-on');
					DOM.addClass(ev.target,'input-text');
				}
			})
			
			//图标
			window.tabs =	S.Tabs('#icon_panel',{
				navCls: 'ks-switchable-nav',
				contentCls: 'icon-content',
				triggerType: 'click',
				activeTriggerCls: 'current'			
			}).on('switch',function(ev){
				var index = ev.currentIndex;
				switch(index) {
					case 0:
						iconControl.show('comm');
						break;
					case 1:
						iconControl.show('commDesign');
						break;
					case 2:
						iconControl.show('smart');
						break;
					case 3:
						iconControl.show('me');
						break;
				}
			})
			iconControl.scale = 2;
			iconControl.frontPageNum = 14;
			iconControl.show('comm');
			
			Event.delegate(document,'click','.iconDeletelink', function(ev) {
				var iconId = DOM.attr(ev.currentTarget,'data');
				new H.widget.msgBox({
						    title: "删除图标",
						    content: '亲！您确定删除这个图标?',
						    type: "confirm",
						    buttons: [{ value: "确定删除" }, { value: "取消" }],
						    success: function (result) {
						        if (result == "确定删除") {
									ev.preventDefault();
									var submitHandle = function(o) {
									  	iconControl.initMeFlag = false;
										iconControl.show('me');
									};
									var error = function(o){
										new H.widget.msgBox({
										    title:"错误提示",
										    content:o.payload,
										    type:"error"
										});
									};
									var data = "iconId="+iconId+"&form_key="+FORM_KEY;
							  		new H.widget.asyncRequest().setURI(delIconUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(error).setData(data).send();
						        }
						    }
						});
	  		});
			if(S.one("#J_startDate")){
				myCalendar('J_startDate',new Date(2038,11,29,00,00,00));
			}
			if(S.one("#J_endDate")){
				myCalendar('J_endDate',new Date(2038,11,29,00,00,00));
			}
			
		},
		initIcon : function(icon, iconPositionId, iconColorId, undefined){
			iconControl.initIcon(icon, iconPositionId, iconColorId, undefined)
			
		},
		showDesign : function(){
			iconControl.showDesign()
			
		},
		
		designFinish : function(designId, xmlPath, picUrl){
			iconControl.designFinish(designId, xmlPath, picUrl)
		},
		//活动保存 验证
		save : function() {
			if(isVersionPer('icon')){return ;}
			ParamsErrorBox = KISSY.one('#J_ParamsErrorBox');
			var promoIds = DOM.val('#J_PromoId');
			var promo_id  =	promoIds.split('_')[0];
			if(promo_id == 0){
				if(KISSY.one("#J_startDate")){
					var startDate = DOM.val('#J_startDate');
					var endDate = S.one('#J_endDate').val();
					if((endDate!='')&&(startDate>=endDate)){
						DOM.html('#J_ParamsErrorMsg','开始时间不能大于结束时间，请重新选择');
						if (ParamsErrorBox.css("display")==="none") {
							ParamsErrorBox.slideDown();
						}
						DOM.addClass('#J_startDate','text-error');
						return ;
					}
				}
				if(KISSY.one("#J_endDate")){
					var endDate = S.one('#J_endDate').val();
					var nowDate = new Date();
					var startTime = H.util.StringToDate(S.one('#J_startDate').val());
					var endTime = H.util.StringToDate(endDate);
					var invalidate =H.util.StringToDate(invaliDate);
					
					if(endTime.getTime() <= nowDate.getTime() || endTime.getTime()<=startTime ){
						DOM.html('#J_ParamsErrorMsg','结束时间不能小于开始时间，请重新选择');
						if (ParamsErrorBox.css("display")==="none") {
							ParamsErrorBox.slideDown();
						}
						DOM.addClass('#J_endDate','text-error');
						return ;
					}
				}
			}
				if(iconControl.currentIconId != null){
					promotionForm.iconId.value = iconControl.currentIconId;
					if(iconControl.mode==0){
						if (iconControl.currentIconType==2 ||iconControl.currentIconType==4) { 
							promotionForm.iconId.value += '_' + iconControl.currentPositionId + '_' + iconControl.currentColorId;
							if (iconControl.currentIconType==2){
								var typeId  =	promoIds.split('_')[1];
								if(!KISSY.inArray( typeId ,['2','9','10'])){
									DOM.show('#J_ShowSmartIconMsg');
									return ;
								}
							}
						}
					}
				}
			promotionForm.iconType.value = iconControl.currentIconType;
			if(iconControl.currentIconId == null || iconControl.currentIconType == null ){
				DOM.html('#J_ParamsErrorMsg','请选择图标');
				if (ParamsErrorBox.css("display")==="none") {
					ParamsErrorBox.slideDown();
				}
				return ;
			}
			promotionForm.promoId.value = promo_id;
//			if((promotionForm.oriIconId.value !='' && (promotionForm.oriIconId.value == promotionForm.iconId.value)) || false  ){
//				iconControl.msg.hide();
//				iconControl.msg.setMsg('<div class="point relative"><div class="point-w-1">请更换图标或更改时间</div></div>').showDialog();
//				return ;
//			} 
			DOM.get("#promotion_edit_form").submit();
			return true;
	    },
		
	    changePromo: function(value){
			if(value != 0){
				DOM.attr('#J_startDate','disabled','disabled');
				DOM.removeClass('#J_startDate','input-day');
				DOM.style('#J_startDate', {border: '0', background: 'none'});
				DOM.attr('#J_endDate','disabled','disabled');
				DOM.removeClass('#J_endDate','input-day');
				DOM.style('#J_endDate', {border: '0', background: 'none'});
				var typeId  =	value.split('_')[1];
				DOM.val('#J_startDate',value.split('_')[2]);
				DOM.val('#J_endDate',value.split('_')[3]);
			}else{
				DOM.val('#J_startDate',startAt);
				DOM.style('#J_startDate',{border: '1px solid #A7A6AA', background: 'url(http://cdn.huanleguang.com/img/hlg/v3/input-dayman.gif) right 0', width:'184px'});
				DOM.style('#J_endDate', {border: '1px solid #A7A6AA', background: 'url(http://cdn.huanleguang.com/img/hlg/v3/input-dayman.gif) right 0' , width:'184px'});
				DOM.val('#J_endDate',endAt);
				var typeId  = 0;
				DOM.attr('#J_startDate','disabled',false);
				DOM.attr('#J_endDate','disabled',false);
			}
			if(KISSY.inArray( typeId ,['2','9','10'])){
				DOM.hide('#J_ShowSmartIconMsg');
			}
			var startTime = H.util.StringToDate(S.one('#J_startDate').val());
			var endTime = H.util.StringToDate(S.one('#J_endDate').val());
			var leftsecond = parseInt((endTime.getTime() - startTime.getTime()) / 1000);
            d = parseInt((leftsecond / 86400) % 10000);
            h = parseInt((leftsecond / 3600) % 24);
			str = '活动持续<b class="color-red">'+d+'</b>天<b class="color-red">'+h+'</b>小时';
			DOM.html("#J_PromoTimeLast" , str);

		}
					
	};
}, {
    requires: ['./mods/icon-control']
});
