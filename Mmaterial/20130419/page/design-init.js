/*
combined files : 

utils/showPages/index
page/mods/tshop
page/mods/listParam
page/mods/designControl
page/design-init

*/
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
//编辑模块


KISSY.add('page/mods/tshop',function (S) {
    // your code here
    var DOM = S.DOM, Event = S.Event, win = window, doc = document,  IE = S.UA.ie,  
		DATA_ID 		= 'data-id',
		DATA_URI 		= 'data-uri',
		DATA_RENDER     = 'data-render',
		DATA_WIDTH      = 'data-width',
		BAR_CLASS_UP	= 'ds-bar-moveup',
		BAR_CLASS_DOWN  = 'ds-bar-movedown',
		BAR_CLASS_NOUP	= 'no-move-up',
		BAR_CLASS_NODOWN= 'no-move-down',
	    paginator=null;
		/*
	     * g_ds_del_list  删除模块列表
	     * */
	    window.g_ds_del_list = [];
		function fixIE6Hover(el) {
	        if (IE && 6 === IE) {
	            el = DOM.get(el);
	            if ( !el ) return;
	            Event.add( el, 'mouseenter', function(evt) {
	                DOM.addClass( this, 'hover' );
	            });
	
	            Event.add( el, 'mouseleave', function(evt) {
	                DOM.removeClass( this, 'hover' );
	            });
	        }
	    }
		function getbar( elem ) {
	        var bar 	= doc.createElement( 'bar' ),
	            barbd   = doc.createElement( 'barbd' ),
	            baracts = doc.createElement( 'baracts' ),
	            BAR_ACT_TPL = '<a href="#2" class="ds-bar-%CLASS" title="%TITLE"><span>%TITLE</span></a>',
				act 	= '', ret = /%TITLE/g, rec = /%CLASS/;
				//edit 	= DOM.attr( elem, DATA_ISEDIT),
				//del 	= DOM.attr( elem, DATA_ISDEL ),
				//target 	= DOM.attr( elem, DATA_ISTARGET ),
				//uri 	= DOM.attr( elem, DATA_URI ),
				//move    = DOM.attr(	elem, DATA_ISMOVE);	
			act += BAR_ACT_TPL.replace( ret, '编辑' ).replace( rec, 'edit' );
			act += BAR_ACT_TPL.replace( ret, '删除' ).replace( rec, 'del' );
	        baracts.innerHTML = act;
	        bar.appendChild( barbd );
	        bar.appendChild( baracts );
			return bar;
	    }
		return  IF = {
				
			/*
	         * 重新渲染模块toolbar位置, 允许指定像素
	         * */
			reflowbar: function( box, bar, pixel ) {
	            if( !box ) return;
			
	            var h, ph, pb, HEIGHT = 'height', MIN = 'tb-minimize', POS = 'position', REL = 'relative', children;
	            children = DOM.children( box );
	            if ( !bar ) {
	                bar = children[children.length - 1];
	            }
		
				if (children.length > 0 &&  children[children.length - 1].tagName.toLowerCase() === 'bar' ) {
					children.pop();
				}
	     
	           // DOM.css( box, HEIGHT, '' );
				DOM.css( children, HEIGHT, '' );
				// 处理box padding-bottom值，导致margin-top 错位问题
				pb = parseFloat( DOM.css( box, 'padding-bottom' ) );
	            h = ( pixel || DOM.height(box) ) - pb; 
				ph = h;
				 h =  DOM.height(box);
	//			S.each(children, function(c){
	//				var ch = c.offsetHeight;
	//				ph = ph - ch;
	//				ph >= 0 ? DOM.css( c, HEIGHT, ch + 'px') : DOM.css( c, HEIGHT, 0);
	//			}); 
	
	            // 如果指定像素, 那使用指定值
	            DOM.css( box, HEIGHT, h );
				DOM.css(bar, {height: h, 'margin-top': -h});
				DOM.css( DOM.children( bar )[0], {height: h - 4, width: box.offsetWidth - 4}); 
	        },
	
	        /*
	         * 内部初始化模块功能, 添加模块bar, 拖拽等
	         * */
	        _initMod: function( mod ) {
	            var self = this, bar = getbar( mod );
				
	            self.reflowbar( mod, bar );
	            mod.appendChild( bar );
				if ( IE ) {
					Event.add( mod, 'mouseenter', function(evt) {
						DOM.removeClass( this, 'fix-ie-hover' );
					});
				}
	            fixIE6Hover(bar);
	        },
			init: function(box) {
	            var self = this;
	            self._initMod( box );
			}			
		};
}, {
    requires: []
})


	
	

/**
 * @fileOverview 
 * @author  
 */
KISSY.add('page/mods/listParam',function (S) {
    // your code here
    
	return listParam = {
		
		init :function(){
				var str ='',
					frameHtml = '',
					colorHtml = '',
					moreLinkHtml ='',
					qualityPicsHtml = '',
					keywordsHtml = '',
					tishiMessHtml = '',
					listParamsHtm1 = '',
					listParamsHtm2 = '',
					listParamsHtm3 = '',
					listParamsHtm4 = '',
					listParamsHtm5 = '',
					listParamsHtm6 = '',
					listParamsHtm7 = '',
					listParamsHtm8 = '';
				S.each(list.listParams,function(item){
					if(item['field_code'] == 'color'){
						colorHtml +='<li class="min-height-40 J_ListParams" >'+
									'<input type="hidden" id ="J_color"  value="'+item['value']+'"  class="J_Param_Value">'+
									'<input type="hidden" class="J_Param_ParamId" value="'+item.param_id+'"/><input type="hidden" class="J_Param_FieldCode" value="'+item.field_code+'"/>'+
		        					'<div class="active-add-edit-title" style="width:16%;">列表颜色选择：</div>'+
		           		 			'<div class="active-add-edit-edit" style="width:84%;margin-bottom:10px">';
								if(paramOptons['color']){
									S.each(paramOptons['color'],function(col,index){
										clos = col.split("_");
										colorHtml+='<span class="list-template-color J_SelectColor ';
										if(item['value']==col){
											colorHtml+='a-current';
										}
										colorHtml+='" data="'+col+'" >';
										colorHtml +='<b style="background: #'+clos[0]+'"></b>';
//										S.each(clos,function(i){
//											colorHtml +='<b style="background: #'+i+'"></b>';
//										})
										colorHtml +='</span>';
									})
								}
								if(paramOptons['color'].length == 1){
									colorHtml+= '<span style="font-size:12px;"><!--（说明：此模版为旧模版不支持多色系,持续更新中）--></span>'
								}
				         colorHtml+= '</div></li>';
					}
					if(item['field_code'] == 'items_per_line'){
						frameHtml +='<li class="min-height-40 J_ListParams">';
						frameHtml +='<div class="active-add-edit-title" style="width:16%;">';
						if(mtype==7){
							frameHtml += '规格x宽度x个数';
							if(items_per_line==''){
								var items_per_line_default =  item['value']
							}else{
								var items_per_line_default =  items_per_line
							}
							var ttemps = items_per_line_default.split('_');
							limit = parseInt(ttemps[3]);
						}else{
							frameHtml += '模板宽度';
							var items_per_line_default =  item['value']
							limit = parseInt(limitNums[items_per_line_default.substr(0,3)]);
						}
						//alert(limit);
						frameHtml +='：</div>'+
				            		'<div class="active-add-edit-edit" style="width:84%;margin-bottom:10px"><input type="hidden" id ="J_items_per_line_default"  value="'+items_per_line_default+'">'+
				        			'<input type="hidden" id ="J_items_per_line"  value="'+items_per_line_default+'"  class="J_Param_Value">'+
									'<input type="hidden" class="J_Param_ParamId" value="'+item.param_id+'"/><input type="hidden" class="J_Param_FieldCode" value="'+item.field_code+'"/>';
						if(mtype==7){
							var alen = associateFormats.length;
							for(var i=0; i<alen; i++){
								frameHtml +='<a href="#2"';
								if(items_per_line_default+'-'+protoId==associateFormats[i]){
									frameHtml+='class="on-center J_width"';
								}else{
									frameHtml+='class="off-center J_width"';
								}
								var ffmat = associateFormats[i].substring(0,associateFormats[i].indexOf('-'));
								ffmat = ffmat.split('_');
								frameHtml+='><span  class="w-100 J_list_width" id="'+associateFormats[i]+'">'+ffmat[0]+'x'+ffmat[2]+'x'+ffmat[3]+'</span></a>';
							}
							frameHtml +='</div></li>';
						}else{
		            		p = 0;
							for (var k in formats) {
								//列表宽度
								if(item['value'].split("_")[0]==k){
									frameHtml +='<input type="hidden" id="J_frame_width" value ="'+k+'"/>';
								}
								frameHtml +='<a href="#2"';
								if(item['value'].split("_")[0]==k){
									frameHtml+='class="on-center J_width"';
								}else{
									frameHtml+='class="off-center J_width"';
								}
								frameHtml+='><span  class="w-100 J_list_width" id="'+k+'">'+k+'像素</span></a>';
							}
							frameHtml +='</div></li>';
							frameHtml += '<li class="min-height-40">'+
					        			 '<div class="active-add-edit-title" style="width:16%;">宝贝主图规格：</div>';
							for (var k in formats) {
								frameHtml +='<div class="active-add-edit-edit relative  J_mainSize" id="J_mainSize'+k+'" style="width:80%;margin-bottom:10px;';
								if(item['value'].split("_")[0]!=k){
									frameHtml +='display:none';
								};
								frameHtml +='">';
								
								frameHtml +='<input type="hidden" id="J_mian_size'+k+'" value ="';
								for(var g in formats[k]) {
									if(item['value'].split("_")[0]==k){
										if(item['value'].split("_")[2]==g){
											frameHtml +=g;
										}
									}else{
										frameHtml+=g;
										break;
									}
								}
								frameHtml +='"/>';
								var index = 1;
								for(var m in formats[k]) {
									frameHtml +='<a href="#2"';
									if(item['value'].split("_")[0]==k){
										if(item['value'].split("_")[2]==m){
											frameHtml+='class="on-center J_Mwidth"';
										}else{
											frameHtml+='class="off-center J_Mwidth"';
										}
									}else{
										if(index == 1){
											frameHtml+='class="on-center J_Mwidth"';
											index++;
										}else{
											frameHtml+='class="off-center J_Mwidth"';
										}
									}
									//frameHtml+='><span  class="w-100 J_main_size" id="'+m+'">'+m+'x'+m+'</span></a>';
									frameHtml+='><span  class="w-100 J_main_size" id="'+m+'">'+m+'</span></a>';
								}
								frameHtml +='</div>';
							}
							frameHtml +='</li>';
							frameHtml +='<li class="min-height-40">'+
				        	'<div class="active-add-edit-title" style="width:16%;">每行显示件：</div>'+
				            '<div class="active-add-edit-edit relative" style="width:84%;margin-bottom:10px" ><span class="list-number" ><b id="J_item_pre_line">'+item['value'].split("_")[3]+'</b></span></div></li>';
						}
					}
					if(item['field_code'] == 'more_link'){
						moreLinkHtml +='<li class="title-params min-height-40 J_ListParams" >'+
				        			   '<div class="active-add-edit-title" style="width:16%;">更多：</div>'+
				            		   '<div class="active-add-edit-edit" style="width:84%;margin-bottom:10px">'+
									   '<input type="hidden" class="J_Param_ParamId" value="'+item.param_id+'"/><input type="hidden" class="J_Param_FieldCode" value="'+item.field_code+'"/>';
								
						moreLinkHtml+= '<input type="text" id="J_moreLink"  class="input-text w-360 J_Param_Value" value="'+item['value']+'">';
						moreLinkHtml+= '</div></li>';
					}
					if(item['field_code'] == 'quality_pics'){
						qualityPicsHtml +=  '<li class="title-params min-height-40 list-template-icon-img J_ListParams" id="">'+
				        					'<div class="active-add-edit-title" style="width:16%;">品质图片：</div>'+
			            					'<div class="active-add-edit-edit" style="width:84%;margin-bottom:10px"><input type="hidden" id ="J_QualityPics" class="J_Param_Value" value="'+item['value']+'"/>'+
			            					'<input type="hidden" class="J_Param_ParamId" value="'+item.param_id+'"/><input type="hidden" class="J_Param_FieldCode" value="'+item.field_code+'"/>';
						if(paramOptons['quality_pics']){
							var defaultQuality = item['value'].split("#");
							S.each(paramOptons['quality_pics'],function(qualityPic,index){
								qualityPicsHtml +='<a href="#2"';
									S.each(defaultQuality,function(d){
										if( d !='' && d == qualityPic){
											qualityPicsHtml+= 'class="a-current"';
										}
									})
								qualityPicsHtml +='><span class="J_quality_pics"><img width="50" border="0" src ="'+qualityPic+'_sum.jpg" alt=""></span></a>';
							})
						}		
						qualityPicsHtml+= '</div></li>';
					}
					if(item['field_code'] == 'keywords'){
						keywordsHtml +='<li class="title-params min-height-40 J_ListParams" >'+
				        			   '<div class="active-add-edit-title" style="width:16%;">关键词：</div>'+
				            		   '<div class="active-add-edit-edit" style="width:84%;margin-bottom:10px"><input type="hidden" class="J_Param_ParamId" value="'+item.param_id+'"/><input type="hidden" class="J_Param_FieldCode" value="'+item.field_code+'"/>';
						keywordsHtml+= '<input type="text" id="J_keywords"  class="input-text w-360 J_Param_Value" value="'+item['value']+'">';
						keywordsHtml+= '</div></li>';
					}
					if(7==mtype){
						tishiMessHtml = '<li class="title-params min-height-40 clear" style="margin-top:20px">如在【选择宝贝】页面 选择了【官方搭配套餐】，以下内容会自动填充</li>';
					}
					if(item['field_code'] == 'list_param1'){
						if(7==mtype){
							var show_title = 'title="'+item['field_name']+'"' ;
						}else{
							var show_title = '';
						}
						listParamsHtm1 +='<li class="title-params min-height-40 J_ListParams" >'+
				        			   '<div class="active-add-edit-title" style="width:16%;">'+item['field_name']+'：</div>'+
				            		   '<div class="active-add-edit-edit" style="width:84%;margin-bottom:10px"><input type="hidden" class="J_Param_ParamId" value="'+item.param_id+'"/><input type="hidden" class="J_Param_FieldCode" value="'+item.field_code+'"/>';
						listParamsHtm1+= '<input type="text" id="J_list_param1" '+show_title+' class="input-text w-360 J_Param_Value" value="'+item['value']+'">';
						listParamsHtm1+= '</div></li>';
					}
					if(item['field_code'] == 'list_param2'){
						if(7==mtype){
							var show_title = 'title="'+item['field_name']+'"' ;
						}else{
							var show_title = '';
						}
						listParamsHtm2 +='<li class="title-params min-height-40 J_ListParams" >'+
				        			   '<div class="active-add-edit-title" style="width:16%;">'+item['field_name']+'：</div>'+
				            		   '<div class="active-add-edit-edit" style="width:84%;margin-bottom:10px"><input type="hidden" class="J_Param_ParamId" value="'+item.param_id+'"/><input type="hidden" class="J_Param_FieldCode" value="'+item.field_code+'"/>';
						listParamsHtm2+= '<input type="text" id="J_list_param2" '+show_title+' class="input-text w-360 J_Param_Value" value="'+item['value']+'">';
						listParamsHtm2+= '</div></li>';
					}
					if(item['field_code'] == 'list_param3'){
						if(7==mtype){
							var show_title = 'title="'+item['field_name']+'"' ;
						}else{
							var show_title = '';
						}
						listParamsHtm3 +='<li class="title-params min-height-40 J_ListParams" >'+
				        			   '<div class="active-add-edit-title" style="width:16%;">'+item['field_name']+'：</div>'+
				            		   '<div class="active-add-edit-edit" style="width:84%;margin-bottom:10px"><input type="hidden" class="J_Param_ParamId" value="'+item.param_id+'"/><input type="hidden" class="J_Param_FieldCode" value="'+item.field_code+'"/>';
						listParamsHtm3+= '<input type="text" id="J_list_param3"  '+show_title+' class="input-text w-360 J_Param_Value" value="'+item['value']+'">';
						listParamsHtm3+= '</div></li>';
					}
					if(item['field_code'] == 'list_param4'){
						if(7==mtype){
							var show_title = 'title="'+item['field_name']+'"' ;
						}else{
							var show_title = '';
						}
						listParamsHtm4 +='<li class="title-params min-height-40 J_ListParams" >'+
				        			   '<div class="active-add-edit-title" style="width:16%;">'+item['field_name']+'：</div>'+
				            		   '<div class="active-add-edit-edit" style="width:84%;margin-bottom:10px"><input type="hidden" class="J_Param_ParamId" value="'+item.param_id+'"/><input type="hidden" class="J_Param_FieldCode" value="'+item.field_code+'"/>';
						listParamsHtm4+= '<input type="text" id="J_list_param4"  '+show_title+' class="input-text w-360 J_Param_Value" value="'+item['value']+'">';
						listParamsHtm4+= '</div></li>';
					}
					if(item['field_code'] == 'list_param5'){
						if(7==mtype){
							var show_title = 'title="'+item['field_name']+'"' ;
						}else{
							var show_title = '';
						}
						listParamsHtm5 +='<li class="title-params min-height-40 J_ListParams" >'+
				        			   '<div class="active-add-edit-title" style="width:16%;">'+item['field_name']+'：</div>'+
				            		   '<div class="active-add-edit-edit" style="width:84%;margin-bottom:10px"><input type="hidden" class="J_Param_ParamId" value="'+item.param_id+'"/><input type="hidden" class="J_Param_FieldCode" value="'+item.field_code+'"/>';
						listParamsHtm5+= '<input type="text" id="J_list_param5"  '+show_title+' class="input-text w-360 J_Param_Value" value="'+item['value']+'">';
						listParamsHtm5+= '</div></li>';
					}
					if(item['field_code'] == 'list_param6'){
						if(7==mtype){
							var show_title = 'title="'+item['field_name']+'"' ;
						}else{
							var show_title = '';
						}
						listParamsHtm6 +='<li class="title-params min-height-40 J_ListParams" >'+
				        			   '<div class="active-add-edit-title" style="width:16%;">'+item['field_name']+'：</div>'+
				            		   '<div class="active-add-edit-edit" style="width:84%;margin-bottom:10px"><input type="hidden" class="J_Param_ParamId" value="'+item.param_id+'"/><input type="hidden" class="J_Param_FieldCode" value="'+item.field_code+'"/>';
						listParamsHtm6+= '<input type="text" id="J_list_param6"  '+show_title+' class="input-text w-360 J_Param_Value" value="'+item['value']+'">';
						listParamsHtm6+= '</div></li>';
					}
					if(item['field_code'] == 'list_param7'){
						if(7==mtype){
							var show_title = 'title="'+item['field_name']+'"' ;
						}else{
							var show_title = '';
						}
						listParamsHtm7 +='<li class="title-params min-height-40 J_ListParams" >'+
				        			   '<div class="active-add-edit-title" style="width:16%;">'+item['field_name']+'：</div>'+
				            		   '<div class="active-add-edit-edit" style="width:84%;margin-bottom:10px"><input type="hidden" class="J_Param_ParamId" value="'+item.param_id+'"/><input type="hidden" class="J_Param_FieldCode" value="'+item.field_code+'"/>';
						listParamsHtm7+= '<input type="text" id="J_list_param7"  '+show_title+' class="input-text w-360 J_Param_Value" value="'+item['value']+'">';
						listParamsHtm7+= '</div></li>';
					}
					if(item['field_code'] == 'list_param8'){
						if(7==mtype){
							var show_title = 'title="'+item['field_name']+'"' ;
						}else{
							var show_title = '';
						}
						listParamsHtm8 +='<li class="title-params min-height-40 J_ListParams" >'+
				        			   '<div class="active-add-edit-title" style="width:16%;">'+item['field_name']+'：</div>'+
				            		   '<div class="active-add-edit-edit" style="width:84%;margin-bottom:10px"><input type="hidden" class="J_Param_ParamId" value="'+item.param_id+'"/><input type="hidden" class="J_Param_FieldCode" value="'+item.field_code+'"/>';
						listParamsHtm8+= '<input type="text" id="J_list_param8"  '+show_title+' class="input-text w-360 J_Param_Value" value="'+item['value']+'">';
						listParamsHtm8+= '</div></li>';
					}
					
				})
				listParamsConfirmHtm = '';			

				//宝贝参数 整体设置
				List_itemParamExplainHtml = '';
				List_oriPriceWriterHtml ='';
				List_curPriceWriterHtml = '';
				List_tinyLabelsHtml = '';
				List_itemParam1Html = '';
				List_itemParam2Html = '';
				List_itemParam3Html = '';
				List_itemParam4Html = '';
				List_itemParam5Html = '';
				List_itemParam6Html = '';
				S.each(list.defaultItemParams,function(item){
						if(item['field_code'] == 'ori_price_writer'){
							List_oriPriceWriterHtml +='<li class="title-params active-add-edit-li J_SetAllItem clear min-height-30" ><div class="active-add-edit-title fl w-200">原价文案：</div><div class="active-add-edit-edit fl  mr10">'+
								'<input type="text" id ="J_oriPriceWriter" value="'+item['value']+'" title="原价文案" class="input-text w-100 J_Param_Value">'+
								'<input type="hidden" class="J_Param_ParamId" value="'+item.param_id+'"/><input type="hidden" class="J_Param_FieldCode" value="'+item.field_code+'"/>'+
								'</div><div class="fl"><select id="J_OPrice" name="oripricewriter" onchange="KISSY.DOM.val(\'#J_oriPriceWriter\',this.value)">';
								if(paramOptons['ori_price_writer']){
									S.each(paramOptons['ori_price_writer'],function(item){
										List_oriPriceWriterHtml+=  '<option value="'+item+'">'+item+'</option>';
									})
								}
								List_oriPriceWriterHtml+='</select></div></li>';
						}
						if(item['field_code'] == 'cur_price_writer'){
							List_curPriceWriterHtml +='<li class="title-params active-add-edit-li J_SetAllItem clear min-height-30" ><div class="active-add-edit-title fl w-200">现价文案：</div><div class="active-add-edit-edit fl mr10">'+
							'<input type="text" id ="J_curPriceWriter" value="'+item['value']+'" title="现价文案" class="input-text w-100 J_Param_Value">'+
							'<input type="hidden" class="J_Param_ParamId" value="'+item.param_id+'"/><input type="hidden" class="J_Param_FieldCode" value="'+item.field_code+'"/>'+
							'</div><div class="fl"><select id="J_CPrice" name="oripricewriter" onchange="KISSY.DOM.val(\'#J_curPriceWriter\',this.value)">';
							if(paramOptons['cur_price_writer']){
								S.each(paramOptons['cur_price_writer'],function(item){
									List_curPriceWriterHtml+=  '<option value="'+item+'">'+item+'</option>';
								})
							}
							List_curPriceWriterHtml+='</select></div></li>';
						}
						/*宝贝标签*/
						if(item['field_code'] == 'tiny_labels'){
							var defaultTiny = item['value'].split("#");
							List_tinyLabelsHtml +='<li class="title-params active-add-edit-li J_SetAllItem clear min-height-30" ><div class="active-add-edit-title fl w-200">小标签：</div><div class="active-add-edit-edit fl  mr10">'+
								'<input type="hidden" class="J_Param_Value" id ="J_SetTinyLabels" value="'+item['value']+'"/><input type="hidden" class="J_Param_ParamId" value="'+item.param_id+'"/><input type="hidden" class="J_Param_FieldCode" value="'+item.field_code+'"/>';
								if(paramOptons['tiny_labels']){
									S.each(paramOptons['tiny_labels'],function(ite){
										List_tinyLabelsHtml+= '<a href="#2"';
											S.each(defaultTiny,function(d){
												if( d !='' && d == ite){
													List_tinyLabelsHtml+= 'class="t-current"';
												}
											})
										List_tinyLabelsHtml+='><img src="'+ite+'" class="J_TinyLabels" onClick="var elem = this;listParam.setAllTiny(elem)" /></a>&nbsp;&nbsp;';
									})
								}
							List_tinyLabelsHtml+='</div></li>';
						}
						/*宝贝参数1*/
						if(item['field_code'] == 'item_param1'){
							List_itemParam1Html +='<li class="title-params active-add-edit-li J_SetAllItem clear min-height-30" ><div class="active-add-edit-title fl w-200">'+list.defaultItemFieldNames[item.field_code]+'：</div><div class="active-add-edit-edit fl  mr10">'+
											 '<input type="text"  name="param1" value="'+item['value']+'" title="param1" class="J_Param_Value input-text w-200">'+
											 '<input type="hidden" class="J_Param_ParamId" value="'+item.param_id+'"/><input type="hidden" class="J_Param_FieldCode" value="'+item.field_code+'"/></div></li>';
						}
						/*宝贝参数2*/
						if(item['field_code'] == 'item_param2'){
							List_itemParam2Html +='<li class="title-params active-add-edit-li J_SetAllItem clear min-height-30" ><div class="active-add-edit-title fl w-200">'+list.defaultItemFieldNames[item.field_code]+'：</div><div class="active-add-edit-edit fl  mr10">'+
											 '<input type="text"  name="param2" value="'+item['value']+'" title="param2" class="J_Param_Value input-text w-200">'+
											 '<input type="hidden" class="J_Param_ParamId" value="'+item.param_id+'"/><input type="hidden" class="J_Param_FieldCode" value="'+item.field_code+'"/></div></li>';
						}
						/* 宝贝参数3*/
						if(item['field_code'] == 'item_param3'){
							List_itemParam3Html +='<li class="title-params active-add-edit-li J_SetAllItem clear min-height-30" ><div class="active-add-edit-title fl w-200">'+list.defaultItemFieldNames[item.field_code]+'：</div><div class="active-add-edit-edit fl  mr10">'+
											 '<input type="text"  name="param3" value="'+item['value']+'" title="param3" class="J_Param_Value input-text w-200">'+
											 '<input type="hidden" class="J_Param_ParamId" value="'+item.param_id+'"/><input type="hidden" class="J_Param_FieldCode" value="'+item.field_code+'"/></div></li>';
						}
						/*宝贝参数4*/
						if(item['field_code'] == 'item_param4'){
							List_itemParam1Html +='<li class="title-params active-add-edit-li J_SetAllItem clear min-height-30" ><div class="active-add-edit-title fl w-200">'+list.defaultItemFieldNames[item.field_code]+'：</div><div class="active-add-edit-edit fl  mr10">'+
											 '<input type="text"  name="param4" value="'+item['value']+'" title="param4" class="J_Param_Value input-text w-200">'+
											 '<input type="hidden" class="J_Param_ParamId" value="'+item.param_id+'"/><input type="hidden" class="J_Param_FieldCode" value="'+item.field_code+'"/></div></li>';
						}
						/*宝贝参数5*/
						if(item['field_code'] == 'item_param5'){
							List_itemParam5Html +='<li class="title-params active-add-edit-li J_SetAllItem clear min-height-30" ><div class="active-add-edit-title fl w-200">'+list.defaultItemFieldNames[item.field_code]+'：</div><div class="active-add-edit-edit fl  mr10">'+
											 '<input type="text"  name="param5" value="'+item['value']+'" title="param5" class="J_Param_Value input-text w-200">'+
											 '<input type="hidden" class="J_Param_ParamId" value="'+item.param_id+'"/><input type="hidden" class="J_Param_FieldCode" value="'+item.field_code+'"/></div></li>';
						}
						/* 宝贝参数6*/
						if(item['field_code'] == 'item_param6'){
							List_itemParam6Html +='<li class="title-params active-add-edit-li J_SetAllItem clear min-height-30" ><div class="active-add-edit-title fl w-200">'+list.defaultItemFieldNames[item.field_code]+'：</div><div class="active-add-edit-edit fl  mr10">'+
											 '<input type="text"  name="param6" value="'+item['value']+'" title="param6" class="J_Param_Value input-text w-200">'+
											 '<input type="hidden" class="J_Param_ParamId" value="'+item.param_id+'"/><input type="hidden" class="J_Param_FieldCode" value="'+item.field_code+'"/></div></li>';
						}
				})
				
				
				ListStr = colorHtml+frameHtml+moreLinkHtml+qualityPicsHtml+keywordsHtml+tishiMessHtml+listParamsHtm1+listParamsHtm2+listParamsHtm3+listParamsHtm4+listParamsHtm5+listParamsHtm6+listParamsHtm7+listParamsHtm8+listParamsConfirmHtm;
				if(mtype==7 && meal_id==0){
					ListStr += '<li class="title-params"><div class="active-add-edit-title fl" style="width:16%;">&nbsp;</div><div class="active-add-edit-edit fl"><a href="http://bangpai.taobao.com/group/thread/609027-277801311.htm?spm=0.0.0.40.35d48a" target="_blank">没有链接？您可能没订购官方的搭配套餐，点击查看详情</a></div></li>'; 
				}
				ItemStr = List_itemParamExplainHtml+List_oriPriceWriterHtml+List_curPriceWriterHtml+List_tinyLabelsHtml+List_itemParam1Html+List_itemParam2Html+List_itemParam3Html+List_itemParam4Html+List_itemParam5Html+List_itemParam6Html;
				if(list.defaultItemParams.length>0){
					ItemStr +=	'<li class="active-add-edit-li  clear min-height-30"><div class="active-add-edit-title fl w-200">&nbsp;</div><div class="active-add-edit-edit fl mr10"><a href="javascript:list.setAllItems();"><span class="gray-btm-h-20 w-100"><span>应用到以下宝贝</span></span></a><span id="J_setMsg" class="messages"></span></div></li>';
				}
				DOM.html('#J_AllItemParams',ItemStr);
				DOM.html('#J_listParams',ListStr);
				//品质图片
				if(DOM.query('.J_quality_pics').length>0){
					Event.on(DOM.query('.J_quality_pics'),'click',function(ev){
						var src = DOM.attr(DOM.children(ev.currentTarget)[0],'src');
						var paramVlaue = DOM.val('#J_QualityPics');
						if(DOM.hasClass(DOM.parent(ev.currentTarget),'a-current')){
							paramVlaue = paramVlaue.replace('#'+src,'');
							paramVlaue = paramVlaue.replace(src+'#','');
							paramVlaue = paramVlaue.replace(src,'');
							DOM.removeClass(DOM.parent(ev.currentTarget),'a-current');
						}else{
							if(paramVlaue==''){
								paramVlaue+=src;
							}else{
								paramVlaue+='#'+src;
							}
							DOM.addClass(DOM.parent(ev.currentTarget),'a-current');
						}
						DOM.val('#J_QualityPics',paramVlaue);
					})
				}
				//颜色选择
				if(DOM.query('.J_SelectColor').length>0){
					Event.on(DOM.query('.J_SelectColor'),'click',function(ev){
						var color = DOM.attr(ev.currentTarget,'data');
							DOM.removeClass(DOM.query('.list-template-color'),'a-current');
							DOM.toggleClass(this,'a-current');
							DOM.val('#J_color',color);
							list.preview();
					})
				}
				
				Event.on(DOM.query('.J_list_width'),'click',listParam.changeListOption);
				Event.on(DOM.query('.J_main_size'),'click',listParam.changeMainSise);
			},
			//模板 宽度 选择
			changeListOption : function(){
				if(mtype==7){
					var w =this.id;
					DOM.replaceClass(DOM.query('.J_width'),'on-center off-center','off-center');
					DOM.replaceClass(DOM.parent(this),'on-center off-center','on-center');
					var guige_proto = w.split('-');
					DOM.val('#J_items_per_line',guige_proto[0]);
					var ttemps = guige_proto[0].split('_');
					limit = parseInt(ttemps[3]);
					//limit = parseInt(limitNums[guige_proto[0].substr(0,3)]);
					if(guige_proto[1]!=protoId){
						window.location = dapeiUrl+guige_proto[1]+"&items_per_line="+guige_proto[0];
					}
				}else {
					var w =this.id;
					var s = DOM.val('#J_mian_size'+w);//模板宽度w下的默认主图规格
					DOM.hide(DOM.query('.J_mainSize'));
					DOM.show('#J_mainSize'+w);
					DOM.replaceClass(DOM.query('.J_width'),'on-center off-center','off-center');
					DOM.replaceClass(DOM.parent(this),'on-center off-center','on-center');
					DOM.val('#J_frame_width',w);//模板宽度
					if(s != ''){
						DOM.html('#J_item_pre_line',formats[w][s][1]); //2012-11-09
					}else{
						DOM.html('#J_item_pre_line','请选择主图规格');
					}
					
					limit = parseInt(limitNums[w]);
					var len = w+'_'+formats[w][s][0]+'_'+s+'_'+formats[w][s][1];//2012-11-09
					DOM.val('#J_items_per_line',len);

					//2012-11-09
					for(var ik in list.savedPics){
						//alert(list.savedPics[ik]);
						list.savedPics[ik] = (list.savedPics[ik]+'').replace(/_\d{2,3}x\d{2,3}\.jpg$/,'_'+2+'x'+2+'.jpg');
						//alert(list.savedPics[ik]);
					}
					
				}
				listParam.getDesignPics(protoId, w);
				list.preview();
				//alert(limit);
			},
			getDesignPics : function(protoId, w) {
				var submitHandle = function(o) {
					list.designPics = o.payload;
	    	    };
	    	    var errorHandle = function(o) {
						new H.widget.msgBox({
							    title:"错误提示",
							    content:o.desc,
							    type:"error"
							});
	        	};
	     	    var data = "proto_id="+protoId+"&width="+w+"&form_key="+FORM_KEY;
	    	    new H.widget.asyncRequest().setURI(getDesignPicsUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			},
			//主图  宽度 选择
			changeMainSise : function(){
				 var s = this.id;
				 var w =DOM.val('#J_frame_width');
				 DOM.replaceClass(DOM.query('#J_mainSize'+w+' .J_Mwidth'),'on-center off-center','off-center');
				 DOM.replaceClass(DOM.parent(this),'on-center off-center','on-center');
				 DOM.val('#J_mian_size'+w,s);
				 DOM.html('#J_item_pre_line',formats[w][s][1]);//2012-11-09
				 var len = w+'_'+formats[w][s][0]+'_'+s+'_'+formats[w][s][1];
				 DOM.val('#J_items_per_line',len);

				 //2012-11-09
				 for(var ik in list.savedPics){
					list.savedPics[ik] = (list.savedPics[ik]+'').replace(/_\d{2,3}x\d{2,3}\.jpg$/ , '_'+s+'x'+s+'.jpg');
				}
			},
			setAllTiny : function(el){
				var src = DOM.attr(el,'src');
				var paramVlaue = DOM.val('#J_SetTinyLabels');
				if(DOM.hasClass(DOM.parent(el),'t-current')){
					paramVlaue = paramVlaue.replace('#'+src,'');
					paramVlaue = paramVlaue.replace(src+'#','');
					paramVlaue = paramVlaue.replace(src,'');
					DOM.removeClass(DOM.parent(el),'t-current');
					DOM.addClass(DOM.parent(el),'e-current');
				}else{
					if(paramVlaue==''){
						paramVlaue+=src;
					}else{
						paramVlaue+='#'+src;
					}
					DOM.removeClass(DOM.parent(el),'e-current');
					DOM.addClass(DOM.parent(el),'t-current');
				}
				DOM.val('#J_SetTinyLabels',paramVlaue);
			}
		
	}
	
}, {
    requires: []
});


KISSY.add('page/mods/designControl',function (S,O,TShop) {
	var S = KISSY,DOM = S.DOM, Event = S.Event;	
	
	return designControl = {
	    		designPicPanel: null,
	    		currentDesignId: null,
	    		currentXmlPath: null,
	    		msg : null,
	    		initDesignFlag : false,
	    		getDesignContent : function(rawDid){
					
					if(KISSY.inArray(rawDid,g_ds_del_list)){
						return ;
					}
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
						Event.on('#J_DesignDiv_'+rawDid+' .ds-bar-del', 'click', function(evt) {
							var box = DOM.get('#J_DesignDiv_'+rawDid), boxID = DOM.attr( box, 'newid' ), a, p = { width: "0px", height:"0px" , opacity: "0" };
				            a = new KISSY.Anim( box, p, 0.3 ,KISSY.Easing.easeOut,function(){
					                box.innerHTML = '';
					                box.parentNode.removeChild( box );
					                g_ds_del_list.push( boxID );
				                });
							a.run();	
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

/**
 * @fileOverview 
 * @author  
 */
KISSY.add('page/design-init',function (S,showPages,O,TShop,ListParam,designControl) {   
    // your code here
	var DOM = S.DOM, Event = S.Event;	
	
	return  list={
				tbItem : [],			//当前页获取宝贝
				selectItem : eval('('+ itemsJson+')'),   //已加入列表的宝贝
				preSelectItem : [], //预加入列表的宝贝（已选中）
				savedPics : [],//针对成人用品店已经保存的宝贝主图地址
			
				defaultItemFieldNames : {},
				defaultItemParams : eval('('+ defaultItemParamsJson+')'),
				defaultRateMess : {buyer_nick:"",buyer_level:"",content:""},
				listParams : eval('('+ listParamsJson+')'),
				designPics :  eval('('+ designPicsJson+')'),
			
				selectBoxPageNum : 100, //已选择宝贝 每页最大数
				paginator : null,  		//推荐宝贝 分页
				selectPaginator : null, //已推荐宝贝 分页
				panel : null,		    //对话框
				confirmPanel : null,    //保存对话框
				rate : 1,			    //设置原价倍数
				specRate : 1,			//设置特价倍数
				pageNum : 10,          //推荐宝贝 每页数量 
				msg : null,
				editFlag : false,
				initPreSelectTag : false, //标识是否已经有预览信息

				meal_price : {},
				meal_discount : {},
				meal_save : {},
				meal_meal_price : {},
				meal_url : {},
				lastedMealOffset : null,//最后一次选中的套餐的偏移量，主要用于切换搜索宝贝到套餐选择
				mealPageId : 1,
				mealPaginator : null,
				mealPageNum : 5,
				meals : [],
				useMeal : false,
				init : function() {
					//列表参数 宝贝参数 初始化
					ListParam.init();
					if(DOM.hasClass('#body-html','w-1000')){
			  	        var str ='<select id="J_SelectItemPage" name="Page">'+
					  	        '<option selected="selected" value="10">10条</option>'+
					  	        '<option value="20">20条</option>'+
					  	        '<option value="30">30条</option>'+
					  	        '<option value="40">40条</option>'+
					  	        '<option value="50">50条</option>'+
					  	        '<option value="100">100条</option>'+
					  	        '</select>';
	  	        		DOM.html('#J_SelectPage',str);
			  	     }else{
			  	            var str ='<select id="J_SelectItemPage" name="Page">'+
			  	  	        '<option selected="selected" value="12">12条</option>'+
			  	  	        '<option value="24">24条</option>'+
			  	  	        '<option value="36">36条</option>'+
			  	  	        '<option value="48">48条</option>'+
			  	  	        '<option value="60">60条</option>'+
			  	  	        '</select>';
			  	        	DOM.html('#J_SelectPage',str);
			  		 }	
					if(cid=='27' || hand_img_url=='1'){
						for(var k=0;k<list.selectItem.length;k++){
							var tempItem = list.selectItem[k];
							list.savedPics[tempItem.id] = tempItem.pic_url;
						}
					}
					window.iconTabs = new S.Tabs('#J_main',{
							 		 navCls:'ks-switchable-nav',
							 		 contentCls:'main-content',
							 		 activeTriggerCls:'current',
							 		 triggerType: 'click'
							 	}).on('switch',function(ev){
								 		var index = ev.currentIndex;
								 		switch(index) {
								 			case 0:
								 				DOM.show('#J_Preview_Box');
								 				Event.remove('#J_SaveBtn');
								 				DOM.replaceClass(DOM.get('#J_SaveBtn'),'btm-gray-xiayibu btm-orange-baocun','btm-orange-xiayibu');
								 				Event.on('#J_SaveBtn','click',function(){
								 				    list.preview();
								 				    iconTabs.switchTo(1);
								 				    if(list.useMeal && meal_id!='0'){
							                            new H.widget.msgBox({
							                                title:"温馨提示",
							                                content:'您已开通官方搭配套餐服务，可以在下方选择官方搭配套餐！',
							                                type: "confirm",
					                                        buttons: [{ value: "明白" }],
					                                        success: function (result) {
							                                
					                                        }
							                            });
								 				   }
							 				    });
								 				
								 				Event.remove('#J_PreviewBtn');
								 				if(list.preSelectItem.length>0 || list.selectItem.length>0){
								 					Event.on('#J_PreviewBtn','click',function(){list.preview();});
								 					DOM.replaceClass(DOM.get('#J_PreviewBtn'), 'btm-gray-yulan','btm-orange-yulan');
								 				}else{
								 					DOM.replaceClass(DOM.get('#J_PreviewBtn'), 'btm-orange-yulan','btm-gray-yulan');
								 				}
								 			break;
								 			case 1:
								 				DOM.show('#J_Preview_Box');
								 				list.renderItems(list.tbItem);
								 				
								 				Event.remove('#J_SaveBtn');
								 				DOM.replaceClass(DOM.get('#J_SaveBtn'),'btm-gray-xiayibu btm-orange-baocun','btm-orange-xiayibu');
								 				Event.on('#J_SaveBtn','click',function(){
								 					list.addItems();
								 					list.preview();
								 					list.renderSelectItems(1);
								 					iconTabs.switchTo(2);
								 				});
								 				Event.remove('#J_PreviewBtn');
								 				if(list.preSelectItem.length>0 || list.selectItem.length>0){
								 					Event.on('#J_PreviewBtn','click',function(){list.preview();});
								 					DOM.replaceClass(DOM.get('#J_PreviewBtn'), 'btm-gray-yulan','btm-orange-yulan');
								 				}else{
								 					DOM.replaceClass(DOM.get('#J_PreviewBtn'), 'btm-orange-yulan','btm-gray-yulan');
								 				}
								 			break;
								 			case 2:
								 				//alert('switch-2');
								 				if(mtype==7){
								 					if(meal_id != '0'){
								 						DOM.hide('.status-pendding');
								 					}else{
								 						DOM.show('.status-pendding');
								 					}
								 				}
								 				Event.remove('#J_SaveBtn');
								 				DOM.replaceClass(DOM.get('#J_SaveBtn'),'btm-gray-xiayibu btm-orange-xiayibu','btm-orange-baocun');
								 				Event.remove('#J_PreviewBtn');
								 				if(list.selectItem.length>0){
								 					Event.on('#J_PreviewBtn','click',function(){
								 						list.tempSave();
								 						list.preview();
								 					});
								 					Event.on('#J_SaveBtn','click',function(){
								 						list.tempSave();
								 						list.save()
								 					});
								 					DOM.replaceClass(DOM.get('#J_PreviewBtn'), 'btm-gray-yulan','btm-orange-yulan');
								 				}else{
								 					DOM.replaceClass(DOM.get('#J_PreviewBtn'), 'btm-orange-yulan','btm-gray-yulan');
								 					DOM.hide('#J_Preview_Box');
								 				}
								 				break;	
								 		}
			 					})
					if(mtype==7){
						list.meals = eval('('+ mealListJson+')')
						if(list.meals.length>0){
							if(listId=='0') {
								list.useMeal = true;
							}else{
								if(meal_id != '0') list.useMeal = true;
							}
						}
						//查看有没有符合模板宝贝个数的套餐，有的话显示套餐列表，把initPreSelectTag设为true
						list.getMeals();
						list.getMealParam();
					}else{
						DOM.hide('.J_TurnTbItemButt');
						DOM.hide('.J_TurnMealButt');
						DOM.hide('#J_TurnSelItemLi');
					}
//				 	if(list.useMeal){
//				 		DOM.show('#J_ShowMealDiv');
//				 	}else {
				 		list.searchTbItems();
				 		DOM.show('#J_ShowTbItemDiv');
//				 	}
			 		//在编辑列表中显示已经选中的宝贝
				 	if (list.selectItem.length > 0) {
				 		list.renderSelectItems(1, true);
				 		list.editFlag = true;
				 	}
				
					S.each(list.defaultItemParams,function(item){
						//自定义的宝贝级别参数名
						list.defaultItemFieldNames[item.field_code] = item.field_name;
					});

			
					Event.on('#J_SearchBtn','click',list.searchTbItems);
					//Event.on('#J_TCheckAll','click',list.checkAll);
					Event.on('#J_ListBoxToggle','click',list.toggle);
					
					

					Event.on('.J_TurnTbItemButt','click',function(){
						meal_id = '0';
						list.selectItem = [];
						list.preSelectItem = [];
						list.searchTbItems();
						list.renderSelectItems();
						//list.preview();
						DOM.hide('#J_ShowMealDiv');
						DOM.show('#J_ShowTbItemDiv');
					})
					Event.on('.J_TurnMealButt','click',function(){
						if(list.meals.length==0){
							new H.widget.msgBox({
							    title:"错误提示",
							    content:'您未开通官方搭配套餐服务或者没有搭配套餐！',
							    type:"error"
							});
							return;
						}
						
						var meal = list.meals;
						var mealCheckTrue = false;
						var mealLimitNum = '';
						for(var i=0;i<meal.length;i++){
    		                if(meal[i].item_list.length == limit){
    		                    mealCheckTrue = true; 
    		                    break;
    		                }else{
    		                    mealLimitNum += meal[i].item_list.length + ',';
    		                }
						}
                        var delComma = new RegExp(",$","g");
						mealLimitNum = mealLimitNum.replace(delComma,'');
						if(!mealCheckTrue){
						    new H.widget.msgBox({
						        title:"错误提示",
						        content:'您选中的模板规格支持的宝贝数为:'+limit+'个,与您的官方搭配套餐支持的宝贝数('+mealLimitNum+')不符!请返回第二步选择合适的“规格x宽度x个数”',
						        type: "confirm",
                                buttons: [{ value: "返回第二步" }, { value: "取消" }],
                                success: function (result) {
                                    if (result == "返回第二步") {
                                        iconTabs.switchTo(0);
                                    }
                                }
						    });
                            return;
						}
						
						list.selectItem = [];
						list.preSelectItem = [];
						if(list.lastedMealOffset != null) {
							meal_id = list.meals[list.lastedMealOffset].meal_id;
							list.addMeal(list.lastedMealOffset);
						}
						list.preview();
						list.renderSelectItems();
						DOM.hide('#J_ShowTbItemDiv');
						DOM.show('#J_ShowMealDiv');
					})
					//默认 按钮的 时间
					Event.on('#J_NavDisabled','click',function(){
						iconTabs.switchTo(1);
					})
					DOM.replaceClass(DOM.get('#J_SaveBtn'),'btm-gray-xiayibu','btm-orange-xiayibu');
					Event.on('#J_SaveBtn','click',function(){list.preview();iconTabs.switchTo(1);});
					Event.on('#J_PreviewBtn','click',function(){list.subListParam();});
			 		
		  		
			},
			// 设置 所有宝贝
			setAllItems : function(){
				var items = list.selectItem;
				var len = items.length;
				if (len==0) {
					return;
				}
				var itemParams = [];
				S.each(DOM.query('.J_SetAllItem'),function(item){
					var itemPar = {};
					itemPar.param_id = DOM.val(DOM.get('.J_Param_ParamId', item));
					itemPar.field_code = DOM.val(DOM.get('.J_Param_FieldCode', item));
					itemPar.value = DOM.val(DOM.get('.J_Param_Value', item));
					itemPar.field_name = list.defaultItemFieldNames[itemPar.field_code];
					itemParams.push(itemPar);
				})
				for (var i=0; i<len; i++) {
					id = items[i].id;
					//items[i].price = DOM.val(DOM.get('#J_Price_'+id));
					//items[i].spec_price = DOM.val(DOM.get('#J_SpecPrice_'+id));
					items[i].item_params = itemParams;
				}
				
				list.selectItem = items;
				list.renderSelectItems(1);	
   			    new H.widget.msgBox({
					type : "sucess",
					dialogType : 'msg',
				    content:'设置成功',
				    autoClose:true,
				    timeOut:3000
				});
				list.preview();
			},

			initPreSelectItem : function(){
				if(list.initPreSelectTag){
					return;
				}
				if(list.selectItem.length==0){
					if(mtype =='7'){
						var preInitNum = parseInt(limit);}
					else{
						if(irregular=='1'){
							var preInitNum = limit;
						}else{
							var preInitNum = 1;
						}
					}				
					for(i=0;i<preInitNum;i++){
						if(list.tbItem[i]){
							var theTbItem = list.tbItem[i];
							//alert(KISSY.JSON.stringify(firstTbItem));
							var item = {
								'id': theTbItem.num_iid,
								'title': theTbItem.title,
								'promo_title': theTbItem.title,
								'price': theTbItem.price,
								'spec_price': theTbItem.price,
								'volume': 0,
								'pic_url': theTbItem.pic_url,
								'order' : 99
							};
							item.item_params = list.defaultItemParams;
							item.rate_ids = '';
							//直接加入到selectItem
							//list.selectItem.push(item);
							list.preSelectItem.push(item);

							//2012-11-09
							if(hand_img_url=='1' && cid!='27'){
								var guige = DOM.val('#J_items_per_line').split('_');
								var item_w = guige['2']
								var url_suf = '_'+item_w+'x'+item_w+'.jpg';
//								if(url_suf=='_220x220.jpg'){
//									url_suf = '_b.jpg';
//								}
								list.savedPics[item.id] = item.pic_url+url_suf;
								//alert(list.savedPics[item.id]);
							}
						}
					}
				}
				list.initPreSelectTag = true;
				//DOM.show('#J_ShowTbItemDiv');
				list.preview();
			},
			getMealParam : function(){
				for(k=1; k<=5; k++){
	            	var list_par = DOM.get('#J_list_param'+k);
	            	if(list_par){
	                	switch(list_par.title){
	                		case '套餐原价':
								list.meal_price = list_par;
	                    		break;
	                		case '套餐折扣':
	                			list.meal_discount = list_par;
	                    		break;
	                		case '节省的钱':
	                			list.meal_save = list_par;
	                    		break;
	                		case '套餐现价':
	                			list.meal_meal_price = list_par;
	                    		break;
	                		case '套餐链接':
	                			list.meal_url = list_par;
	                    		break;
	                	}
	            	}
	    		}
			},
			//选择套餐，显示变化、预览（直接加入selectItem）(宝贝不可取消,只可通过套餐来取消)
			selectMeal : function(offset){
				var meal = list.meals[offset];
				if(meal_id == meal.meal_id)return
				if(meal.item_list.length != limit){
						new H.widget.msgBox({
							    title:"错误提示",
							    content:'您选中的模板规格支持的宝贝数为:'+limit+'个!',
							    type:"error",
								autoClose : true,
								timeOut : 1000
							});
					return;
				}
				list.selectItem = [];
				list.preSelectItem = [];
				list.addMeal(offset);
				meal_id = meal.meal_id;
	    		list.lastedMealOffset = offset;
	    		//J_DapeiTaocan_
	    		DOM.replaceClass('.J_DapeiTaocan', 'chosen', 'choose');
	    		DOM.replaceClass('#J_DapeiTaocan_'+offset, 'choose', 'chosen');
				list.preview();
			},
			//套餐切换到搜索（清除已选套餐的宝贝），再切换回来时(清除已选的宝贝) 通过lastedMealOffset来添加套餐中的宝贝，设置套餐参数
			addMeal : function(offset){
				var meal = list.meals[offset];
				for(j=0;j<meal.item_list.length;j++){
					var mealItem = meal.item_list[j];
					var item = {
						'id': mealItem.id,
						'title': mealItem.title,
						'promo_title': mealItem.promo_title,
						'price': mealItem.price,
						'spec_price': mealItem.price,
						'volume': mealItem.volume,
						'pic_url': mealItem.pic_url,
						'order' : mealItem.order
					};
					item.item_params = list.defaultItemParams;
					item.rate_ids = '';
					list.selectItem.push(item);
				}
				//alert(meal.url);
				list.meal_price.value = meal.price;
	    		list.meal_discount.value = meal.discount;
	    		list.meal_save.value = meal.save;
	    		list.meal_meal_price.value = meal.meal_price;
	    		list.meal_url.value = meal.url;
			},
			//获取套餐信息
			getMeals : function() {
				var renderMeals = function(frontPageId){
					var start = list.mealPageNum * (frontPageId - 1);
	            	var end = list.mealPageNum * frontPageId;
	            	if (end > list.meals.length) {
	                	end = list.meals.length;
	                }
	                var str = '<div class="clear"></div>';
	                str += '<div class="dapeitaocan m-auto">';
	               
	            	for (i=start; i<end; i++) {
	                	var meal = list.meals[i];
	                	var items = meal.item_list;
						var len = items.length;
	                	//if(meal.status!='VALID' || len!=parseInt(limit)){
	                	if(meal.status!='VALID'){
	                		str += '<div id="J_DapeiTaocan_'+i+'" class="J_DapeiTaocan m-auto mt15 choose-fail relative" style="*zoom:1">';
	                	}else{
	                		if(meal.meal_id==meal_id){
	                			str += '<div id="J_DapeiTaocan_'+i+'" class="J_DapeiTaocan m-auto mt15 chosen relative" style="*zoom:1">';
	                    	}else{
	                    		str += '<div id="J_DapeiTaocan_'+i+'" class="J_DapeiTaocan m-auto mt15 choose relative" style="*zoom:1">';
	                    	}
	                	}
	                	
	                	str += '<div class="taocan-choose fl relative" style="height:240px;">';
	                	str +=      '<div class="taocan-content">';
	                	str += 			'<span style=" padding:10px 0 0 0; color:#666; display:block">套餐名称：'+meal.meal_name+'</span><br/>';
	                	str += 			'原价：'+meal.price+'<br/>现价：'+meal.meal_price+'<br/> 当前状态：';
	                	if(meal.status != 'VALID'){
	                		str += '无效';	
	                	}else{
	                		str += '有效';
	                	}
	                	str += 			'<br/>';
	                	str += 		'</div>';
	                	
	                	str += 		'<div class="taocan-btm btm-style-1">';
	                	str += 			'<span class="m-auto background-FFF"><a onclick="list.selectMeal('+i+')" href="#2"><font>选择此套餐</font></a></span>';
	                	str += 		'</div>';
	                	str += 		'<div class="taocan-btm btm-style-2">';
	                	str += 			'<span class="m-auto background-FFF"><a href="#2"><font>已选择套餐</font></a></span>';
	                	str += 		'</div>';
	                	str += 		'<div class="taocan-btm btm-style-3">';
	                	str += 			'<span class="m-auto background-FFF"><a href="#2"><font>不可选套餐</font></a></span>';
	                	str += 		'</div>';
	                	
	                	str += 		'<div class="float-img"></div>';
	                	str += '</div>';
	                	str += '<div class="taocan-list fl">';
	                	str += 		'<ul>';
	                	
						
						for (j=0; j<len; j++) {
							var item = items[j];
							str += '<li class="w-153">';
		                	str += 		'<div class="baobei-img-h-140 center">';
		                	str += 			'<a href="http://item.taobao.com/item.htm?id='+item.id+'" target="_blank">';
		                	str += 				'<img border="0" src="'+item.pic_url+'_120x120.jpg">';
		                	str += 			'</a></div>';
		                	str += 		'<div class="text"> ';
		                	str += 			'<a target="_blank" href="http://item.taobao.com/item.htm?id='+item.id+'" style="text-decoration:none"><span style="color:#666666">'+item.title+'</span></a>';
		                	str += 		'</div>';
		                	str += 		'<span class="price">￥<span style="color:#ff0000; font-weight:bold">'+item.price+'</span></span>';
		                	str += '</li>';
						}
	                	str += 		'<div class="clear"></div>';
	                	str += 		'</ul>';
	                	str += '</div>';
	                	str += '<div class="opacity"></div>';
	                	str += '<div class="success-img"></div>';
	                	str += '<div class="clear"></div>';
	                	str += '</div>';
	            	}
	            	str += '</div>';
	            	
	            	DOM.html('#J_MealContainer', str);
				}
				
				var handlePagination = function(turnTo) {
					renderMeals(turnTo);
					//显示分页
					list.mealPaginator.setPage(turnTo).printHtml('#J_MealBottomPaging',2);
					list.mealPaginator.setPage(turnTo).printHtml('#J_MealTopPaging',3);
				}
				
				var pageCount = Math.ceil(list.meals.length/list.mealPageNum); 
				list.mealPaginator = new showPages('list.mealPaginator').setRender(handlePagination).setPageCount(pageCount).printHtml('#J_MealBottomPaging',2);
				list.mealPaginator.printHtml('#J_MealTopPaging',3);
//				if(list.useMeal) {
//					list.initPreMealItem();
//				}
				handlePagination(list.mealPageId);
//				if(list.useMeal && meal_id!='0'){
//					list.preview();
//				}
			},
			//初始化meal_id、mealPageId、设置套餐参数、把宝贝加入selectItem
			initPreMealItem : function(){
				if(list.initPreSelectTag){
					return;
				}
				var meals = list.meals;
				var len = meals.length;
				if(meal_id != '0'){
					for(i=0; i<len; i++){
						if(meals[i].meal_id==meal_id){
							list.lastedMealOffset = i;
							list.mealPageId = Math.ceil( (i+1)/list.mealPageNum);
							break;
						}
					}
				}else {
					for(i=0; i<len; i++){
						if(meals[i].status=='VALID' && meals[i].item_list.length==parseInt(limit)){
							list.addMeal(i);
							list.lastedMealOffset = i;
							meal_id = meals[i].meal_id;
							list.mealPageId = Math.ceil((i+1)/list.mealPageNum);
							break;
						}
					}
				}
				list.initPreSelectTag = true;
				
			},
			
			//搜索宝贝
			searchTbItems : function() {
	        	var submitHandle = function(o) {
		    	    	totalRecords = o.payload.totalRecords;
		    	    	list.tbItem = o.payload.items;
		    	    	DOM.get('#J_NoteIcon').style.display = 'none';
						if(totalRecords > 0){
							DOM.get('#J_LEmpty').style.display = 'none';
							DOM.css(DOM.query(".J_ItemSelectBtnHolder"), 'display','');
						} else {
							DOM.get('#J_LEmpty').style.display = '';
							DOM.css(DOM.query(".J_ItemSelectBtnHolder"), 'display','none');
						}
						pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
						list.renderItems(o.payload.items);
						 var handlePagination = function(turnTo) {
						    	pageId = turnTo;
					    		var submitHandle = function(o) {
					    			list.tbItem = o.payload.items;
					    			totalRecords = o.payload.totalRecords;
					    			if(totalRecords > 0){
										DOM.get('#J_NoteIcon').style.display = 'none';
										DOM.get('#J_LEmpty').style.display = 'none';
										DOM.css(DOM.query(".J_ItemSelectBtnHolder"), 'display','');
									} else {
										DOM.get('#J_LEmpty').style.display = '';
										DOM.css(DOM.query(".J_ItemSelectBtnHolder"), 'display','none');
									}
					    			pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					        	    list.renderItems(o.payload.items);
					        	    DOM.hide('#J_LeftLoading');
									DOM.show('#J_MainLeftContent');
					        	    //list.msg.hide(false);
					    	        list.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_TopPaging',3);
									list.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_BottomPaging',2);
						    	};
						    	 if(DOM.val(DOM.get("#J_SearchTitle")) != '关键字、商品链接、商品编码'){
						       	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle"))); //标题
						       	    }else{
						       	    	var title ='';
						       	    }
						           	var ccid = DOM.val(DOM.get("#J_SelectItemCid")); //类目
						   	    	var type = DOM.val(DOM.get("#J_SearchSelling")); //出售中 库中
						   	    	var itemOrder = DOM.val(DOM.get("#J_SelectItemOrder"));//排序方式
						   	    	var itemPage = DOM.val(DOM.get("#J_SelectItemPage"));//每页多少条
						   	    	var pid = DOM.val(DOM.get("#J_PromoId"));
						   	    	//价格区间
						   	    	var startPrice = DOM.val(DOM.get("#J_StartPrice"));
						        	    var endPrice = DOM.val(DOM.get("#J_EndPrice"));
						   	    	var data = "q="+title+"&cid="+ccid+"&type="+type;
						           	    data += "&start_price="+startPrice+"&end_price="+endPrice;
						           	    data +="&itemOrder="+itemOrder+"&pageSize="+itemPage+"&pid="+pid+"&page_id="+pageId;
					        	//list.msg.setMsg('正在获取宝贝，请稍候').show();
						           	DOM.show('#J_LeftLoading');
									DOM.hide('#J_MainLeftContent');   	
					    	    new H.widget.asyncRequest().setURI(getItemsFromTbUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
							}
						list.paginator = new showPages('list.paginator').setRender(handlePagination).setPageCount(pageCount).printHtml('#J_TopPaging',3);
						list.paginator.printHtml('#J_BottomPaging',2);
						//list.paginator = new showPages('list.paginator').setRender(handlePagination).setPageCount(pageCount).printHtml('#J_BottomPaging',2);
						//list.msg.hide(false);
						DOM.hide('#J_LeftLoading');
						DOM.show('#J_MainLeftContent');
						list.initPreSelectItem();
		    	};
		    	 var errorHandle = function(o){
		    	    	DOM.hide('#J_LeftLoading');
						DOM.show('#J_MainLeftContent');
		   			    new H.widget.msgBox({
							dialogType : 'loading',
						    content:o.desc
						});
		        };
	    	    if(DOM.val(DOM.get("#J_SearchTitle")) != '关键字、商品链接、商品编码'){
	       	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle"))); //标题
	       	    }else{
	       	    	var title ='';
	       	    }
	           	var ccid = DOM.val(DOM.get("#J_SelectItemCid")); //类目
	   	    	var type = DOM.val(DOM.get("#J_SearchSelling")); //出售中 库中
	   	    	var itemOrder = DOM.val(DOM.get("#J_SelectItemOrder"));//排序方式
	   	    	var itemPage = DOM.val(DOM.get("#J_SelectItemPage"));//每页多少条
	   	    	var pid = DOM.val(DOM.get("#J_PromoId"));
	   	    	//价格区间
	   	    	var startPrice = DOM.val(DOM.get("#J_StartPrice"));
	        	    var endPrice = DOM.val(DOM.get("#J_EndPrice"));
	   	    	var data = "q="+title+"&cid="+ccid+"&type="+type;
	           	    data += "&start_price="+startPrice+"&end_price="+endPrice;
	           	    data +="&itemOrder="+itemOrder+"&pageSize="+itemPage+"&pid="+pid;
	        	//list.msg.setMsg('正在获取宝贝，请稍候').show();
	        	DOM.show('#J_LeftLoading');
				DOM.hide('#J_MainLeftContent');
		    	new H.widget.asyncRequest().setURI(getItemsFromTbUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			},

			//渲染宝贝
			renderItems : function(items) {
				var len = items.length;
				DOM.attr('#J_TCheckAll','checked',false);
				var els = '';
				for (var i=0; i<len; i++) {
					var disabled = '';
					var selected ='';
					var hasIn = false;
					if (list.hasSelected(items[i].num_iid)) {
						hasIn = true;
						disabled = 'disabled="disabled" checked="checked"'; 
						selected = 'uncheck'
					}else{
						if (list.hasPreSelected(items[i].num_iid)) {
							hasIn = true;
							disabled = 'checked="checked"'; 
							selected = 'selected'
						}
					}
					els +='<li class="w-172 J_TbItem relative '+selected+'" id="J_TbItem_'+items[i].num_iid+'">'
						+'<input type="hidden" id="" value="">'
			            +'<div class="baobei-img baobei-img-h-160">'
	                 	+'<a target="_blank" href="http://item.taobao.com/item.htm?id='+items[i].num_iid+'" class="w-160">' 
	               		+'<img border="0"  src="'+items[i].pic_url+'_120x120.jpg" width="120" height="120">'
	                	+'</a>'
	             		+'</div>'
	             		+'<div class="baobei-text">' 
	             		+'<a target="_blank" style="text-decoration:none" class="" href="http://item.taobao.com/item.htm?id='+items[i].num_iid+'">'
	                    +'<span class="inline-block baobei-info">'+items[i].title+'</span>'
	              		+'</a><span class="fl inline-block w-150">￥<b class="color-red">'+items[i].price+'</b></span>'
	             		+'</div>'
	             		+'<div class="ol-base"></div><div class="ol-mouseover"><div class="border"><span class="ol-text-ext">点击选择</span></div></div><div class="ol-click"><div class="ol-img-checked"></div><span class="ol-text-ext">点击取消</span><br/><a href="http://item.taobao.com/item.htm?id='+items[i].num_iid+'"target="_blank"><span class="ol-img-view"></span></a></div><div class="ol-uncheck"><span class="ol-text-ext">已加入活动<br/></span><a href="http://item.taobao.com/item.htm?id='+items[i].num_iid+'"target="_blank"><span class="ol-img-view"></span></a></div>';
				if(hasIn){
					els += '<span class="fl" style="display:none"><input type="checkbox"  id="J_CheckBox_'+items[i].num_iid+'" '+disabled+' class="J_CheckBox" name="selectedIds" value="'+items[i].num_iid+'">&nbsp;选择</span>';
				}else{
					els += '<span class="fl" style="display:none"><input type="checkbox"  id="J_CheckBox_'+items[i].num_iid+'"  class="J_CheckBox" name="selectedIds" value="'+items[i].num_iid+'">&nbsp;选择</span>';
				}	
				els +='</li>';
				}
				DOM.html(DOM.get('#J_ItemDataTable'), els);
				var lis = DOM.query("#J_ItemDataTable .J_TbItem");
	        	Event.on(lis, "mouseenter mouseleave click", function(ev){
	        		var el = DOM.get('.J_CheckBox',ev.currentTarget);
	        		if(el.disabled) return;
	        		if(ev.type == 'mouseenter' ){
	            		DOM.addClass(ev.currentTarget, 'mouseover');
	        		}else if(ev.type == 'mouseleave'){
	        			DOM.removeClass(ev.currentTarget, 'mouseover');
	            	}else if(ev.type == 'click'){
	        			if(el.checked == false){
	            			list.addPreItem(ev.currentTarget.id);
	        			}else{
	        				list.removePreItem(ev.currentTarget.id);
	        			}
	        			Event.remove('#J_PreviewBtn');
						if(list.preSelectItem.length>0 || list.selectItem.length>0){
							Event.on('#J_PreviewBtn','click',function(){
								list.preview();	
							});
							DOM.replaceClass(DOM.get('#J_PreviewBtn'), 'btm-gray-yulan','btm-orange-yulan');
						}else{
							DOM.replaceClass(DOM.get('#J_PreviewBtn'), 'btm-orange-yulan','btm-gray-yulan');
						}
	        			
	        		}
	        	});
	        	Event.on(DOM.query('#J_ItemDataTable .J_CheckBox'),'click',function(ev){
	        		ev.stopPropagation();
	        		var iid = ev.currentTarget.value;
	        		if(ev.currentTarget.checked == true){
	        			DOM.addClass('#J_TbItem_'+iid,'seleted');
	        		}else{
	        			DOM.removeClass('#J_TbItem_'+iid,'seleted');
	        		}
	        	});
			},

			renderSelectItems : function(pageId, initFlag) {
				items = list.selectItem;
				pageNum = list.selectBoxPageNum;
				var len = items.length;
				if (len < pageNum) {
					pageNum = len;
				}
				var start = len - (pageId -1) * pageNum - 1;
				var end = len - pageId * pageNum;
				if (end <0) end=0;
				var els = '';
				flag=0;
				var picUrlManual = '';
				var tempPicUrl = '';
				//for (var i=start; i>=end; i--) {
				for (var i=end; i<=start; i++) {
					picUrlManual = '';
					tempPicUrl = '';
					//alert('renderSelectItems:'+items[i].title);
					flag++;
					if (initFlag) {
						order = items[i].order;
						specPrice = items[i].spec_price;
					} else {
						order = ((pageId-1)*pageNum + flag);
						if(items[i].spec_price==undefined){
							specPrice = items[i].price;
						}else{
							specPrice = items[i].spec_price;
						}
					}
					if(cid=='27' || hand_img_url=='1'){
						if(list.savedPics[items[i].id]){
							tempPicUrl = list.savedPics[items[i].id];
							//alert('go:'+tempPicUrl);
						}
						picUrlManual = '<li class="clear w-280" style="padding:0px 0px 5px 0px;">'+
			          						'<div class="active-add-edit-title w-80">宝贝主图：</div>'+
											'<div class="active-add-edit-edit">'+
		                 						'<input type="text" title="baobeiPic" id="J_PicUrl_'+items[i].id+'" value="'+tempPicUrl+'" name="picUrl" class="input-text w-180">&nbsp;<b style="color:#F00; vertical-align:middle">*</b>'+
							 		'</div></li>'+
							 		'<li class="clear w-280" style="padding:0px 0px 5px 0px;">'+
	                              	'<div class="active-add-edit-title w-80">&nbsp;</div>'+
	              						'<div class="active-add-edit-edit">'+
	                                         '<p style="color: #FB8534;">复制图片空间审核过的主图地址</p>'+
	             							 '</div></li>';
							 		
					}
					
	      				els +=  '<li class="list-item border-e4e4e4-b-d"><div class="list-div"><ul class="wc-detail-area">'+
								'<li style="width:8%;">'+
	                                  	'<input type="text" class="input-text w-30" id="J_Order_'+items[i].id+'" name="order"  value="'+ order +'" >'+
	       						'</li>'+
	       						'<li style="width:10%;">'+
	               					'<a title="'+items.title+'" href="http://item.taobao.com/item.htm?id='+items[i].id+'" target="_blank">';
	      					//if(hand_img_url) 直接使用pic_url
								if(hand_img_url=='1'){
	 								els +=  '<img width="60" height="60" src="'+items[i].pic_url+'">';
	 							}else{
	 								els +=  '<img width="60" height="60" src="'+items[i].pic_url+'_60x60.jpg">';
	 							}
	                           els += 	'</a>'+
	      						'</li>'+
	      						'<li style="width:45%;">'+
	      						'<div class="item-box">'+                                                                                  
	                                  '<ul>'+
	                                  	'<li class="clear w-280" style="padding:0px 0px 5px 0px;">'+
	                                      	'<div class="active-add-edit-title w-80">标题：</div>'+
	                      						'<div class="active-add-edit-edit">'+
	      											'<input type="hidden" class="text text-long" id="J_Title_'+items[i].id+'" value="'+items[i].title+'">'+
	                                                  '<input type="text" class="input-text w-170" title="Title" id="J_PromoTitle_'+items[i].id+'" value="'+items[i].promo_title+'" >'+
	                     							 '</div></li><li class="clear w-280" style="padding:0px 0px 5px 0px;"><div class="active-add-edit-title w-80">原价：</div>'+
	                      						'<div class="active-add-edit-edit">'+
	                                                  '<input type="text" title="price" name="price" id="J_Price_'+items[i].id+'" value="'+items[i].price+'" class="input-text w-170">'+
	                     							 '</div></li>'+
	                                      '<li class="clear w-280" style="padding:0px 0px 5px 0px;">'+
	                                      	'<div class="active-add-edit-title w-80">特价：</div>'+
	                      						'<div class="active-add-edit-edit">'+
	                                                 '<input type="text" title="specPrice" id="J_SpecPrice_'+items[i].id+'" value="'+specPrice+'" name="specPrice" class="input-text w-170">'+
	                     							 '</div></li>'+
	                     							picUrlManual+
	                       							'</ul></div></li>'+ 	
	                     							  '<li style="width:37%;" id="J_ItemParams_'+items[i].id+'">'+
	                           							'<div class="item-box">'+                                                                                   
	                                                     '<ul>';
					oriPriceWriterHtml =''; //原价文案
					curPriceWriterHtml = ''; //现价文案
					tinyLabelsHtml = ''; //小标签
					itemParam1Html = ''; //宝贝参数1
					itemParam2Html = ''; //宝贝参数2
					itemParam3Html = ''; //宝贝参数3
					itemParam4Html = ''; //宝贝参数4
					itemParam5Html = ''; //宝贝参数5
					itemParam6Html = ''; //宝贝参数6
					var itemParams = items[i].item_params;
					S.each(itemParams, function(item){
						/*原价文案*/
						if(item['field_code'] == 'ori_price_writer'){
							oriPriceWriterHtml +='<li style="padding:0px 0px 5px 0px;" class="J_ItemParams w-330 clear"> <div class="active-add-edit-title w-90">原价文案：</div>'+
								'<div class="active-add-edit-edit"><div class="fl"><input type="text" id ="J_oriPriceWriter'+items[i].id+'" name="ori_price_writer" value="'+item['value']+'" title="ori_price_writer" class="J_Param_Value input-text w-100">'+
								'<input type="hidden" class="J_Param_ParamId" value="'+item.param_id+'"/><input type="hidden" class="J_Param_FieldCode" value="'+item.field_code+'"/></div></td>'+
								' <div style="padding-left:5px;" class="fl">'+               
								    '<select id="J_OPrice_'+items[i].id+'" name="oripricewriter" onchange="KISSY.DOM.val(\'#J_oriPriceWriter'+items[i].id+'\',this.value)">';
								if(paramOptons['ori_price_writer']){
									S.each(paramOptons['ori_price_writer'],function(item){
										oriPriceWriterHtml+=  '<option value="'+item+'">'+item+'</option>';
									})
								}
							oriPriceWriterHtml+='</select></div></div></li>';
						}
						/*现价文案*/
						if(item['field_code'] == 'cur_price_writer'){
							curPriceWriterHtml +='<li style="padding:0px 0px 5px 0px;" class="J_ItemParams w-330 clear"><div class="active-add-edit-title w-90 ">现价文案：</div>'+
								'<div class="active-add-edit-edit"><div class=" fl"><input type="text" id ="J_curPriceWriter'+items[i].id+'" name="cur_price_writer" value="'+item['value']+'" title="cur_price_writer" class="J_Param_Value input-text w-100">'+
								'<input type="hidden" class="J_Param_ParamId" value="'+item.param_id+'"/><input type="hidden" class="J_Param_FieldCode" value="'+item.field_code+'"/></div></td>'+
								' <div class="fl" style="padding-left:5px;">'+               
								    '<select id="J_CPrice_'+items[i].id+'" name="curpricewriter" onchange="KISSY.DOM.val(\'#J_curPriceWriter'+items[i].id+'\',this.value)">';
								if(paramOptons['cur_price_writer']){
									S.each(paramOptons['cur_price_writer'],function(item){
										curPriceWriterHtml+=  '<option value="'+item+'">'+item+'</option>';
									})
								}
							curPriceWriterHtml+='</select></div></div></li>';
						}
						/*小标签*/
						if(item['field_code'] == 'tiny_labels'){
							var defaultTiny = item['value'].split("#");
							tinyLabelsHtml +='<li style="padding:0px 0px 5px 0px;" class="J_ItemParams "><div class="active-add-edit-title w-90">小标签：</div>'+
								'<div class="active-add-edit-edit"><input type="hidden" class="J_Param_Value" id ="J_TinyLabels'+items[i].id+'"value="'+item['value']+'"/><input type="hidden" class="J_Param_ParamId" value="'+item.param_id+'"/><input type="hidden" class="J_Param_FieldCode" value="'+item.field_code+'"/>';
								if(paramOptons['tiny_labels']){
									S.each(paramOptons['tiny_labels'],function(ite){
										tinyLabelsHtml+= '<a href="#2"';
											S.each(defaultTiny,function(d){
												if( d !='' && d == ite){
													tinyLabelsHtml+= 'class="t-current"';
												}
											})
										tinyLabelsHtml+='><img src="'+ite+'" class="J_TinyLabels" onClick="var elem = this;list.selectTiny(elem)" data="'+items[i].id+'"/></a>&nbsp;&nbsp;';
									})
								}
							tinyLabelsHtml+='</div></li>';
						}
						/*宝贝参数1*/
						if(item['field_code'] == 'item_param1'){
							itemParam1Html +='<li style="padding:0px 0px 5px 0px;" class="J_ItemParams"><div class="active-add-edit-title w-90">'+list.defaultItemFieldNames[item.field_code]+'：</div>'+
											 '<div class="active-add-edit-edit"><input type="text"  name="item_param1" value="'+item['value']+'" title="item_param1" class="J_Param_Value input-text w-170">'+
											 '<input type="hidden" class="J_Param_ParamId" value="'+item.param_id+'"/><input type="hidden" class="J_Param_FieldCode" value="'+item.field_code+'"/></div></li>';
						}
						/*宝贝参数2*/
						if(item['field_code'] == 'item_param2'){
							itemParam2Html +='<li style="padding:0px 0px 5px 0px;" class="J_ItemParams"><div class="active-add-edit-title w-90">'+list.defaultItemFieldNames[item.field_code]+'：</div>'+
											 '<div class="active-add-edit-edit"><input type="text"  name="item_param2" value="'+item['value']+'" title="item_param2" class="J_Param_Value input-text w-170">'+
											 '<input type="hidden" class="J_Param_ParamId" value="'+item.param_id+'"/><input type="hidden" class="J_Param_FieldCode" value="'+item.field_code+'"/></div></li>';
						}
						/* 宝贝参数3*/
						if(item['field_code'] == 'item_param3'){
							itemParam3Html +='<li style="padding:0px 0px 5px 0px;" class="J_ItemParams"><div class="active-add-edit-title w-90">'+list.defaultItemFieldNames[item.field_code]+'：</div>'+
											 '<div class="active-add-edit-edit"><input type="text"  name="item_param3" value="'+item['value']+'" title="item_param3" class="J_Param_Value input-text w-170">'+
											 '<input type="hidden" class="J_Param_ParamId" value="'+item.param_id+'"/><input type="hidden" class="J_Param_FieldCode" value="'+item.field_code+'"/></div></li>';
						}
						/*宝贝参数4*/
						if(item['field_code'] == 'item_param4'){
							itemParam4Html +='<li style="padding:0px 0px 5px 0px;" class="J_ItemParams"><div class="active-add-edit-title w-90">'+list.defaultItemFieldNames[item.field_code]+'：</div>'+
											 '<div class="active-add-edit-edit"><input type="text"  name="item_param4" value="'+item['value']+'" title="item_param4" class="J_Param_Value input-text w-170">'+
											 '<input type="hidden" class="J_Param_ParamId" value="'+item.param_id+'"/><input type="hidden" class="J_Param_FieldCode" value="'+item.field_code+'"/></div></li>';
						}
						/*宝贝参数5*/
						if(item['field_code'] == 'item_param5'){
							itemParam5Html +='<li style="padding:0px 0px 5px 0px;" class="J_ItemParams"><div class="active-add-edit-title w-90">'+list.defaultItemFieldNames[item.field_code]+'：</div>'+
											 '<div class="active-add-edit-edit"><input type="text"  name="item_param5" value="'+item['value']+'" title="item_param5" class="J_Param_Value input-text w-170">'+
											 '<input type="hidden" class="J_Param_ParamId" value="'+item.param_id+'"/><input type="hidden" class="J_Param_FieldCode" value="'+item.field_code+'"/></div></li>';
						}
						/* 宝贝参数6*/
						if(item['field_code'] == 'item_param6'){
							itemParam6Html +='<li style="padding:0px 0px 5px 0px;" class="J_ItemParams"><div class="active-add-edit-title w-90">'+list.defaultItemFieldNames[item.field_code]+'：</div>'+
											 '<div class="active-add-edit-edit"><input type="text"  name="item_param6" value="'+item['value']+'" title="item_param6" class="J_Param_Value input-text w-170">'+
											 '<input type="hidden" class="J_Param_ParamId" value="'+item.param_id+'"/><input type="hidden" class="J_Param_FieldCode" value="'+item.field_code+'"/></div></li>';
						}
					})
					els += oriPriceWriterHtml+curPriceWriterHtml+tinyLabelsHtml+itemParam1Html+itemParam2Html+itemParam3Html+itemParam4Html+itemParam5Html+itemParam6Html;
					els += '</ul></div></li></ul>';
					els += '<div class="wc-operate-area" style="padding-top:13px;">';
					/* 宝贝评价*/
					if (hasRate) {
						if (items[i].rate_ids==undefined) {
							items[i].rate_ids='';
						}
						els += '<div>'+
								'<input type="hidden" id="J_RateMess_'+items[i].id+'" value="'+items[i].rate_ids+'"/>'+
								'<a href="#2" onclick="H.rateControl.showItemRates('+items[i].id+')">设置宝贝评价</a></div>';
					}
				
					els += '<div  class="item-status"><div class="status-pendding"><a href="javascript:list.removeItem('+items[i].id+');"   title="从推荐列表删除中">取消推荐</a></div></div>';
					els += '</li></ul></div></li>';
				}
				
				DOM.html(DOM.get('#J_SelectItemBox'), els );
				if(len>0){
					DOM.hide('#J_RightEmpty');
					DOM.css(DOM.query('.J_selectItemHoder'),'display','');
				}else{
					DOM.show('#J_RightEmpty');
					DOM.css(DOM.query('.J_selectItemHoder'),'display','none');
				}	
				
				//判断是否有小标签，没有则隐藏容器
				if(DOM.html('#J_AllItemParams') == '') {
					DOM.hide('#J_SelectItemParamBox');
				}
				if(itemParams==undefined || itemParams.length==0){
					DOM.hide('#J_SelectItemParamBox');
				}
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
				
			},
			//小标签选择
			selectTiny :function(el){
				var id = DOM.attr(el,'data');
				var src = DOM.attr(el,'src');
				var paramVlaue = DOM.val('#J_TinyLabels'+id);
				if(DOM.hasClass(DOM.parent(el),'t-current')){
					paramVlaue = paramVlaue.replace('#'+src,'');
					paramVlaue = paramVlaue.replace(src+'#','');
					paramVlaue = paramVlaue.replace(src,'');
					DOM.removeClass(DOM.parent(el),'t-current');
					DOM.addClass(DOM.parent(el),'e-current');
				}else{
					if(paramVlaue==''){
						paramVlaue+=src;
					}else{
						paramVlaue+='#'+src;
					}
					DOM.addClass(DOM.parent(el),'t-current');
					DOM.removeClass(DOM.parent(el),'e-current');
				}
				DOM.val('#J_TinyLabels'+id,paramVlaue);

			},
			
			reInitSelectBox : function() {
				var len = list.selectItem.length;
				var pageNum = list.selectBoxPageNum;
				if (len > pageNum) {
					pageCount = Math.ceil(len/pageNum); 
					var handleSelectPagination = function(page) {
						 pageId = page;
						 var len = list.selectItem.length;
						 var pageCount = Math.ceil(len/list.selectBoxPageNum); 
			        	 list.renderSelectItems(pageId);
						 list.selectPaginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_BottomSelectPaging',2);		
					}
					list.selectPaginator = new showPages('list.selectPaginator').setRender(handleSelectPagination).setPageCount(pageCount).printHtml('#J_BottomSelectPaging',2);
				}
				list.renderSelectItems(1);
			},

			addItems : function() {
				var items = list.preSelectItem;
				var len = items.length;
				if(len==0 && !list.editFlag){
	   			    new H.widget.msgBox({
					    title:"错误提示",
					    content:'未选择宝贝'	,
					    autoClose:true,
					    timeOut:1000
					});
				}
				for(i=0; i<len; i++){
					var item = items[i];
					//alert('addItems:'+item.title)
					DOM.show('#J_status_'+item.id);
	    			DOM.hide(DOM.prev('#J_status_'+item.id));
	    			DOM.attr(DOM.get('#J_CheckBox_'+item.id),{'disabled':"disabled",'checked':"checked"});
	    			item.item_params = list.defaultItemParams;
					item.rate_ids = '';
					list.selectItem.push(item);
				}
				list.preSelectItem = [];
			},

			addPreItem : function(liId) { 
				if (list.preSelectItem.length + list.selectItem.length >= limit) {
					new H.widget.msgBox({
					    title:"错误提示",
					    content:'列表数量超过模板限制（'+limit+'个）',
					    type:"error"
					});
					return ;
				}
				DOM.addClass('#'+liId,'selected');
				DOM.get('.J_CheckBox','#'+liId).checked= true;
				var id = liId.substr(9);
				DOM.show('#J_status_'+id);
				DOM.hide(DOM.prev('#J_status_'+id));
				DOM.attr(DOM.get('#J_CheckBox_'+id),{'checked':"checked"});
				
				var items = list.tbItem;
				
				var itemsLen = items.length;
				for(var i=0; i<itemsLen; i++) {
					
					if (items[i].num_iid == id) {
						//alert('addPreItem:'+items[i].title);
						var item = {
							'id': id,
							'title': items[i].title,
							'promo_title': items[i].title,
							'price': items[i].price,
							'spec_price': items[i].price,
							'volume': 0,
							'pic_url': items[i].pic_url,
							'order' : 99
						};
						if(items[i].spec_price){
							item.spec_price = items[i].spec_price;
						}
						//@todo
						item.item_params = list.defaultItemParams;
						item.rate_ids = '';
						//alert(KISSY.JSON.stringify(item.item_params));
						list.preSelectItem.push(item);

						//2012-11-09
						if(hand_img_url=='1' && cid!='27'){
							var guige = DOM.val('#J_items_per_line').split('_');
							var item_w = guige['2']
							var url_suf = '_'+item_w+'x'+item_w+'.jpg';
							list.savedPics[id] = items[i].pic_url+url_suf;
							//alert(list.savedPics[id]);
						}
						
						break;
					}
				}
				DOM.replaceClass(DOM.get('#J_PreviewBtn'), 'btm-gray-yulan','btm-orange-yulan');
//				list.msg.hide();
			},
			
			hasSelected : function(id) {
				var items = list.selectItem;
				var itemsLen = items.length;
				for(var i=0; i<itemsLen; i++) {
					if (items[i].id == id) {
						return true;
						break;
					}
				}
				return false;
			},

			hasPreSelected : function(id) {
				var items = list.preSelectItem;
				var itemsLen = items.length;
				for(var i=0; i<itemsLen; i++) {
					if (items[i].id == id) {
						return true;
						break;
					}
				}
				return false;
			},

			removePreItem : function(liId) {
				DOM.removeClass('#'+liId,'selected');
				DOM.get('.J_CheckBox','#'+liId).checked= false;
				DOM.attr('#J_TCheckAll','checked',false);
				var id = liId.substr(9);
				var items = list.preSelectItem;
				var itemsLen = items.length;
				for(var i=0; i<itemsLen; i++) {
					if (items[i].id == id) {
						list.preSelectItem.splice(i,1);
						break;
					}
				}
			},
			
			removeItem : function(id,flag) {
				DOM.removeClass('#J_TbItem_'+id,'selected');
				if(DOM.get('.J_CheckBox','#J_TbItem_'+id)){
					DOM.get('.J_CheckBox','#J_TbItem_'+id).checked= false;
				}
				DOM.attr('#J_TCheckAll','checked',false);
				
				var items = list.selectItem;
				var itemsLen = items.length;
				for(var i=0; i<itemsLen; i++) {
					if (items[i].id == id) {
						//alert('del');
						list.selectItem.splice(i,1);
						break;
					}
				}
				list.renderSelectItems(1);
				list.preview();
				if(list.selectItem.length<=0){
					DOM.hide('#J_Preview_Box');
				}
			},

			//for post
			strProcess : function(str) {
				//return str.replace(/\\/g, '\\\\').replace(/\"/g, '\\"').replace(/&/g, '%26');
				//return str.replace(/\"/g, '\\"').replace(/&/g, '%26');
				return str.replace(/\\/g, '\\\\').replace(/\"/g, '\\"').replace(/[\t\n&]/g, '%26').replace(/%/g, '%25');
			},

			subListParam : function() {
				list.preview();
			},
			
			preview : function() {
				if(iconTabs.activeIndex==2){
					var items = list.selectItem;
				} else {
					var items = list.selectItem.concat(list.preSelectItem);
				}
				var len = items.length;
				if(len<=0){
					DOM.hide('#J_ContentDetail');
					DOM.hide('#J_ToggleC');
					DOM.replaceClass(DOM.get('#J_PreviewBtn'), 'btm-gray-yulan','btm-orange-yulan');
					return false;
				}else{
					DOM.show('#J_ContentDetail');
				}
				if(iconTabs.activeIndex==1 && irregular=='1' && len!=limit){
					new H.widget.msgBox({
					    title:"错误提示",
					    content:'此模板仅支持('+limit+')个宝贝，您当前已选中('+len+')个宝贝!',
					    type:"error"
					});
					return;
				}
				var postItems = list.generatePostItems(items);
				var itemsJson = KISSY.JSON.stringify(postItems);
//				alert(itemsJson);
				var postListParams = new Array();
				S.each(DOM.query('.J_ListParams'),function(item, i){
					var listPar = {};
					listPar.param_id = DOM.val(DOM.get('.J_Param_ParamId', item));
					listPar.field_code = DOM.val(DOM.get('.J_Param_FieldCode', item));
					listPar.value = list.strProcess(DOM.val(DOM.get('.J_Param_Value', item)));
					if(listPar.value.indexOf('undefined')>=0){
						listPar.value = DOM.val('#J_items_per_line_default');
					}
					postListParams.push(listPar);
				})
				var listParamsJson = KISSY.JSON.stringify(postListParams);
				var submitHandle = function(o) {
					DOM.html(DOM.get('#J_ContentDetail'),o.payload);
					DOM.show('#J_ToggleC');
					var listBox = S.one('#J_Preview_Box');
					if (listBox.css("display")==="none") {
						listBox.slideDown();
					}
					S.each(DOM.query('.J_DesignDiv'),function(ddiv){
						var dev_id = ddiv.id;
						var rawDid = dev_id.substr(12);
						designControl.getDesignContent(rawDid);
					})
	    	    };
	    	    var errorHandle = function(o) {
					new H.widget.msgBox({
					    title:"错误提示",
					    content:o.desc,
					    type:"error"
					});
	        	};
				//第一次预览designPics为空，之后从预览的内容中获取(class=J_DesignDiv)
				var designPics = [],data ='';
				if(!KISSY.isEmptyObject(list.designPics)){
					S.each(list.designPics , function(item,i){
	            		designPics.push(i+','+item['designId']);
	            	});
					//如果删除了海报 ，不传值
					if(KISSY.inArray(designPics[0].split(',')[0],g_ds_del_list)){
						data += "designPics=[]";
					}else{
						var designPics = KISSY.JSON.stringify(designPics);
						data += "designPics="+designPics;
					}
				}else{
					data += "designPics=[]";
				}
	        	
				itemsJson = itemsJson.replace(/%25/g, '%!').replace(/&/g, '%26');
		        listParamsJson = listParamsJson.replace(/%25/g, '%!');
	     	    data += "&items="+itemsJson+"&listParams="+listParamsJson+"&proto_id="+protoId+"&form_key="+FORM_KEY;
	    	    new H.widget.asyncRequest().setURI(previewUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			},
			
			tempSave : function() {
				var items = list.selectItem;
				var len = items.length;
				if (len==0) {
					return;
				}
				for (var i=0; i<len; i++) {
					id = items[i].id;
					items[i].title = DOM.val(DOM.get('#J_Title_'+id));
					items[i].promo_title = DOM.val(DOM.get('#J_PromoTitle_'+id)) ;
					items[i].price = DOM.val(DOM.get('#J_Price_'+id));
					items[i].spec_price = DOM.val(DOM.get('#J_SpecPrice_'+id));
					//items[i].pic_url = DOM.val(DOM.get('#J_PicUrl_'+id));
					items[i].volume = DOM.val(DOM.get('#J_Volume_'+id));
					items[i].order = DOM.val(DOM.get('#J_Order_'+id));
					//显示处理的时候&amp;或变成& 所以保存的时候需要还原
					//items[i].promo_title = items[i].promo_title.replace('&','&amp;').replace('"','&quot;');
					//items[i].title = items[i].title.replace('&','&amp;').replace('"','&quot;');
					//alert('tempSave:'+items[i].title)
					if(hasRate) {
						items[i].rate_ids = DOM.val(DOM.get('#J_RateMess_'+id));
					}
					
					var itemParams = [];
					S.each(DOM.query('#J_ItemParams_'+id+' .J_ItemParams'),function(item, i){
						var itemPar = {};
						itemPar.param_id = DOM.val(DOM.get('.J_Param_ParamId', item));
						itemPar.field_code = DOM.val(DOM.get('.J_Param_FieldCode', item));
						itemPar.value = DOM.val(DOM.get('.J_Param_Value', item));
						itemPar.field_name = list.defaultItemFieldNames[itemPar.field_code];
						itemParams.push(itemPar);
					})
					items[i].item_params = itemParams;
					
				}
				list.selectItem = items;
			},
			
			checkAll : function(e) {
				var checkBoxs = DOM.query('#J_ItemDataTable .J_CheckBox');
				var len = checkBoxs.length;
				for(i=0; i<len; i++){
					var iid = checkBoxs[i].value;
					if(checkBoxs[i].disabled || checkBoxs[i].selected) {
						continue;
					}else{
						list.addPreItem('J_TbItem_'+iid);
					}
				}
			},
			
			toggle : function(el) {
				var listBox = S.one('#J_ListBox');
				if (listBox.css("display")==="none") {
					listBox.slideDown(0.8,function(){
						DOM.html('#J_ListBoxToggle','隐藏模版预览')
					});
				} else {
					listBox.slideUp(0.8,function(){
						DOM.html('#J_ListBoxToggle','显示模版预览')
					});
					
				}
			},

			generatePostItems : function(items, isSave){
				var postItems = new Array();
				var itemsLen = items.length;
				for(var i=0; i<itemsLen; i++) {
					//alert(items[i].promo_title);
					var item = {
						'id': items[i].id,
						'title': list.strProcess(items[i].title),
						'promo_title': list.strProcess(items[i].promo_title),
						'price': items[i].price,
						'spec_price': items[i].spec_price,
						'volume': items[i].volume,
						'pic_url': items[i].pic_url,
						'order' : items[i].order,
						'rate_ids' : items[i].rate_ids
					};
					if(cid=='27' || hand_img_url=='1'){
						if(cid=='27'){
							item.pic_url = '';
						}
						if(iconTabs.activeIndex==2){
							item.pic_url = DOM.val(DOM.get('#J_PicUrl_'+items[i].id));
							list.savedPics[items[i].id] = item.pic_url
						}
						//alert(item.pic_url);
						//2012-11-09
						if(cid=='27' && !isSave && item.pic_url==''){
							item.pic_url = items[i].pic_url

							if(hand_img_url=='1'){
								var guige = DOM.val('#J_items_per_line').split('_');
								var item_w = guige['2']
								var url_suf = '_'+item_w+'x'+item_w+'.jpg';
								if(url_suf=='_220x220.jpg'){
									url_suf = '_b.jpg';
								}
								item.pic_url = item.pic_url + url_suf;
							}
							
						}
						//2012-11-09
						if( (cid!='27' && hand_img_url=='1') || (cid=='27' && list.savedPics[items[i].id]) ){
							item.pic_url = list.savedPics[items[i].id];
							item.pic_url = (item.pic_url+'').replace(/_220x220\.jpg$/,'_b.jpg');
						}
						//alert(item.pic_url);
					}
					var saveParams = new Array();
					var item_params = items[i].item_params;
					for(var j=0; j<item_params.length; j++) {
						var param = {
							'param_id': item_params[j].param_id,
							'field_code': item_params[j].field_code,
							'value': list.strProcess(item_params[j].value),
							'field_name': item_params[j].field_name
						};
						saveParams.push(param);
					}
					item.item_params = saveParams;
					postItems.push(item);	
				}
				return postItems;
			},
			
			save : function() {
				var items = list.selectItem;
				var len = items.length;
				if (len==0) {
					new H.widget.msgBox({
					    title:"错误提示",
					    content:'您还没有选择推荐宝贝哦',
					    type:"error"
					});
					return;
				}
				if(irregular=='1' && len!=limit){
					new H.widget.msgBox({
					    title:"错误提示",
					    content:'此模板仅支持('+limit+')个宝贝，您当前已选中('+len+')个宝贝!',
					    type:"error"
					});
					return;
				}
				
				if(cid=='27' || hand_img_url=='1'){
					for(var i=0;i<len;i++){
						if( DOM.val(DOM.get('#J_PicUrl_'+items[i].id))=='' ){
							new H.widget.msgBox({
							    title:"错误提示",
							    content:'请填写第'+DOM.val(DOM.get('#J_Order_'+items[i].id))+'个宝贝的主图地址',
							    type:"error"
							});
							return;
						}
					}
				}
				list.msg =  new H.widget.msgBox({
									dialogType : 'loading',
								    content:'提交中，请稍候！'	
								});
				var postItems = list.generatePostItems(items, 1);
				
				var itemsJson = KISSY.JSON.stringify(postItems);
				var postListParams = new Array();
				S.each(S.all('.J_ListParams'),function(item, i){
					var listPar = {};
					listPar.param_id = DOM.val(DOM.get('.J_Param_ParamId', item));
					listPar.field_code = DOM.val(DOM.get('.J_Param_FieldCode', item));
					listPar.value = list.strProcess(DOM.val(DOM.get('.J_Param_Value', item)));
					if(listPar.value.indexOf('undefined')>=0){
						listPar.value = DOM.val('#J_items_per_line_default');
					}
					postListParams.push(listPar);
				})
				var listParamsJson = KISSY.JSON.stringify(postListParams);		
				var submitHandle = function(o) {
						DOM.html(DOM.get('#J_ContentDetail'),o.payload.body);
						list.msg.hide();
						listId = o.payload.list_id;
						var url = createUrl+"&listId="+listId;
							if (isVersionPer('material',false)) {
								new H.widget.msgBox({
									    title: "保存成功",
									    content: '保存成功，你可以去查看列表或者升级到尊享版去投放',
									    type: "confirm",
									    buttons: [{ value: "升级" }, { value: "查看列表" }],
									    success: function (result) {
									        if (result == "升级") {
												 isVersionPer('material'); 	
									        }else{
												window.location.href = listUrl;
											}
									    }
									});
							}else {
								if (list.editFlag == true) {
									var str = '重新投放';
								}else {
									var str = '去投放 ';
								}
								new H.widget.msgBox({
									    title: "保存成功",
									    content: '保存成功，你可以去查看列表,投放列表',
									    type: "confirm",
									    buttons: [{ value: str }, { value: "查看列表" }, { value: "返回编辑" }],
									    success: function(result){
											if (result == str) {
												window.location.href = url
											}
											else 
												if (result == "查看列表") {
													window.location.href = listUrl;
												}
										}
									});
							}	  
	    	    };
	    	    var errorHandle = function(o) {
					list.msg.hide();
					new H.widget.msgBox({
					    title:"错误提示",
					    content:o.desc,
					    type:"error"
					});
					
	        	};
	        	var data = '';
	        	if(mtype==7){
	           	  	data = "&meal_id="+meal_id+"&";
	            }else {
	            	data = "&meal_id=0&";
	            }
	        	//第一次预览designPics为空，之后从预览的内容中获取(class=J_DesignDiv)
				var designPics = [];
				if(!KISSY.isEmptyObject(list.designPics)){
					S.each(list.designPics , function(item,i){
	            		designPics.push(i+','+item['designId']);
	            	});
					//如果删除了海报 ，不传值
					if(KISSY.inArray(designPics[0].split(',')[0],g_ds_del_list)){
						data += "designPics=[]";
					}else{
						var designPics = KISSY.JSON.stringify(designPics);
						data += "designPics="+designPics;
					}
				}else{
					data += "designPics=[]";
				}
				itemsJson = itemsJson.replace(/%25/g, '%!').replace(/&/g, '%26');
		        listParamsJson = listParamsJson.replace(/%25/g, '%!');
				
	     	    data += "&items="+itemsJson+"&listParams="+listParamsJson+"&list_id="+listId+"&proto_id="+protoId+"&form_key="+FORM_KEY;
	    	    new H.widget.asyncRequest().setURI(saveUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			},
    	 
    		designFinish : function(fromDid, designId, xmlPath) {
        		designControl.designFinish(fromDid, designId, xmlPath)
    		}
			

		}
}, {
    requires: ['utils/showPages/index','overlay','./mods/tshop','./mods/listParam','./mods/designControl']
});
