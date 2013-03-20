/*
combined files : 

utils/showPages/index
page/adjust-init

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
KISSY.add('page/adjust-init',function(S,showPages,O){
	var S = KISSY,DOM = S.DOM, Event = S.Event;	
	return adjust = {
			itemIds : new Array(),
			itemArr : new Array(),
			panel : null,
		   	panelItemPaginator : null,
			panelPageNum : 8,
		   	msg : null,
		   	init : function() {
				Event.add('#J_CheckAll','click',function(){
					if(DOM.attr("#J_CheckAll",'checked')==true || DOM.attr("#J_CheckAll",'checked')=='checked'){
						DOM.attr(".J_CheckBox",'checked',true);
					}else{
						S.each(S.all(".J_CheckBox"), function(item, i) {
							item.checked = false;
						 });
					}
					return;
				});
				
				Event.add("#J_LoadItemsButton",'click',function(){
					var cats = new Array();
					var category = document.getElementsByName('category[]');
					S.each(S.all(category),function(item,i){
						if(item.checked == true){
							cats.push(item.value);
						}
					});
					if (cats.length==0) {
						alert('请选择要加载的分类！');
						return;
					}
					new H.widget.msgBox({ type: "error",
			            content: "正在提交，请稍候！",
						dialogType:"loading"
			        });
			        
					var submitHandle = function(o) {
						var items = o.payload.items;
						for(var i=0;i<items.length;i++){
							addOneLine(items[i]);
						}
						MSG.hide();
				    };
				    var errorHandle = function(o){
				    	MSG.hide();
				    	MSG.setMsg(o.desc).showDialog();
				    	return;
				    };
				    
					var data = 'isAjax=1&cats='+encodeURIComponent(JSON.stringify(cats));
					new H.widget.asyncRequest().setURI(getItemsByCatAjaxUrl).setMethod("POST")
								.setHandle(submitHandle)
								.setErrorHandle(errorHandle)
								.setData(data).send();
					return;
				});
				
				Event.add("#J_SubButton",'click',function(){
					if(adjust.itemIds.length == 0){
						alert('请添加宝贝！');
						return false;
					}
					new H.widget.msgBox({ type: "error",
				        content: "正在提交，请稍候！",
						dialogType:"loading"
				    });
					DOM.val("#J_ItemIds",adjust.itemIds.join(','));
					//DOM.val("#J_ItemArr",JSON.stringify(adjust.itemArr));
					//alert(JSON.stringify(itemArr));
					DOM.get("#J_ListForm").submit();
					return;
				});
			},
		
			openTbItemsDialog : function(){
				var sellerCats = DOM.html('#J_SellerCats');
				if(!adjust.panel){
					var bodyStr = '<div style="width:660px;height:500px;">'+
					'<div class="baobei-edit"><div class="new-baobei"><div class="seach" style="width:600px; height:26px;margin-top:10px;">'+
					'名称：<input type="text" id="J_SearchTitle" class="input-text" value="" size="26"/>'+
					'&nbsp;'+
					'		<select name="approveStatus" id="J_SearchSelling" class="noneReset haahha">'+
					'			<option value="1">销售中</option>'+
					'			<option value="2">仓库中</option>'+
					'		</select>'+
					'&nbsp;'+
					'		<select name="order" id="J_SelectItemOrder" class="noneReset">'+
					'			<option value="0">最晚下架</option>'+
					'			<option value="1">最快下架</option>'+
					'		</select>&nbsp;&nbsp;'+
					sellerCats+
					'&nbsp;&nbsp;<a onclick="adjust.loadTbItems();">搜索</a>'+
					'</div>'+
					'<ul class="new-baobei-list">'+
					'<div style="width:20px;">&nbsp;</div>'+
					'<div style="width:80px;">&nbsp;</div>'+
					'<div style="width:200px;text-align:center;">名称</div>'+
					'<div style="width:80px;text-align:center;">已加入计划</div>'+
					'<div style="width:150px;text-align:center;">下架时间</div>'+
					'</ul>'+
			        '<ul class="new-baobei-list" id="J_ItemList"></ul>'+
			        '<div id="J_Paging" class="ui-page Rpage"></div>'+
			        '</div>';
					adjust.panel = new O.Dialog({
					      width: 660,
					      headerContent: '评分详情',
					      bodyContent: bodyStr,
					      mask: false,
					      align: {
					          points: ['cc', 'cc']
					      },
					      closable :true,
					      draggable: true,
					      aria:true
					});	
					adjust.panel.show();
				}
				adjust.panel.show();
			
			},
			totalChecked: function(elem) {
				if(DOM.attr(elem,'checked')==true || DOM.attr(elem,'checked')=='checked'){
					S.each(S.all(".J_TbCheckBox"),function(item,i){
						if(item.disabled!=true){
							item.checked = true;
						}
					});
				}else{
					S.each(S.all(".J_TbCheckBox"), function(item, i) {
						item.checked = false;
					 });
				}
				return;
			},
			
			loadTbItems : function() {
			   	var submitHandle = function(o) {
			   		adjust.msg.hide();           	
			    	totalRecords = o.payload.totalRecords;
					if(totalRecords > 0){
						DOM.get("#J_Paging").style.display = '';
					} else {
						DOM.get("#J_Paging").style.display = 'none';
			
						adjust.msg.hide();
						DOM.html(DOM.get('#J_ItemList'),'');
						return;
					}
					pageCount = Math.ceil(totalRecords/adjust.panelPageNum); 
					adjust.rederTbItems(o.payload.items);
					var handlePagination = function(turnTo) {
				    	var pageId = turnTo;
			    		var submitHandle = function(o) {
			    			adjust.msg.hide();
			    			totalRecords = o.payload.totalRecords;
			    			pageCount = Math.ceil(totalRecords/adjust.panelPageNum); 
			        	    adjust.rederTbItems(o.payload.items);
			        	    adjust.msg.hide();
			    	        adjust.panelItemPaginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_Paging',2);
				    	};
						var cid = DOM.val(DOM.get("#J_SelectItemCid")); //类目
						var type = DOM.val(DOM.get("#J_SearchSelling")); //出售中 库中
						var title = encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle"))); //标题
						var order = DOM.val(DOM.get("#J_SelectItemOrder")); 
		    			var data = "cid="+cid+"&type="+type+"&order="+order+"&q="+title+"&page_id="+pageId;
		    			adjust.msg = H.widget.msgBox({ type: "error",
					        content: "正在提交，请稍候！",
							dialogType:"loading"
					    });
			    	    new H.widget.asyncRequest().setURI(getItemsFromTbUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
					}
					adjust.panelItemPaginator = new showPages('adjust.panelItemPaginator').setRender(handlePagination).setPageCount(pageCount).printHtml('#J_Paging',2);
			   	};
			   	var errorHandle = function(o){
			    	adjust.msg.hide();
			    	adjust.msg.setMsg(o.desc).show();
			    	adjust.msg.hide();
			    };
			 	var cid = DOM.val(DOM.get("#J_SelectItemCid")); //类目
				var type = DOM.val(DOM.get("#J_SearchSelling")); //出售中 库中
	    		var title = encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle"))); //标题
				var order = DOM.val(DOM.get("#J_SelectItemOrder")); 
			
			    var data = "cid="+cid+"&type="+type+"&order="+order+"&q="+title+"&page_id=1";
			    adjust.msg = H.widget.msgBox({ type: "error",
			        content: "正在提交，请稍候！",
					dialogType:"loading"
			    });
			   	new H.widget.asyncRequest().setURI(getItemsFromTbUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			},
			rederTbItems: function(items) {
				var len = items.length;
				var els = '';
			
				for (var i=0; i<len; i++) {
					if(S.inArray(''+items[i].num_iid,adjust.itemIds)){
						var checked = 'checked="checked" ';
					}else{
						var checked = '';
					}
					
					if(items[i].add_plan_enabled=='0'){
						var enableCheck = 'disabled="disabled"';
						var showed = 'style="display:none"'; 
						var havePlan = '是';
					} else {
						var enableCheck = '';
						var showed = 'style="display:"';
						var havePlan = '否';
					}
					
					els += 
						'<li id="Ltr-'+items[i].num_iid+'">'+
						'<input type="hidden" id="J_item_title_'+items[i].num_iid+'" value="'+items[i].title+'" />'+
						'<input type="hidden" id="J_pic_url_'+items[i].num_iid+'" value="'+items[i].pic_url+'" />'+
						'<input type="hidden" id="J_list_time_'+items[i].num_iid+'" value="'+items[i].list_time+'" />'+
						'<input type="hidden" id="J_delist_time_'+items[i].num_iid+'" value="'+items[i].delist_time+'" />'+
						'<div style="width:20px;"><input type="checkbox" class="J_TbCheckBox" id="J_CB_'+items[i].num_iid+'" value="'+items[i].num_iid+'"' + checked + enableCheck+'/></div>'+
						'<div style="width:80px;"><a target="_blank" href="http://item.taobao.com/item.htm?id='+items[i].num_iid+'"><img height="30" width="40" src="'+items[i].pic_url+'"></img></a></div>'+
						'<div style="width:200px;">'+items[i].title+'</div>'+
						'<div style="width:80px;text-align:center;">'+havePlan+'</div>'+
						'<div style="width:150px;">'+items[i].delist_time+'</div>';
			 		els += '<div style="width:60px;"><a '+showed+'id="J_AddLink_'+items[i].num_iid+'" onclick="adjust.addItem(\''+items[i].num_iid+'\')" >添加</a>';
					els += '</div></li>';
				}
				els += '<li style="border-bottom:0;"><input type="checkbox" onclick="adjust.totalChecked(this);" id="J_TotalChecked"><label for="J_TotalChecked">&nbsp;&nbsp;全选</label>&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" class="btm-caozuo-gray" style="float:none;" onclick="adjust.addItems();" value="添加">&nbsp;<span id="J_AddItemsTip"></span></li>';
				DOM.html(DOM.get('#J_ItemList'),els);
		
			},
			addItem : function(num_iid){
				if(S.inArray(num_iid,adjust.itemIds)){
					return;
				}
				var title = DOM.val('#J_item_title_'+num_iid);
				var pic_url = DOM.val('#J_pic_url_'+num_iid);
				var itemUl = S.get("#J_ItemUl");
				var itemLi = "<li id='J_ItemLi_"+num_iid+"' class='list-item border-e4e4e4-b-d'><div class='list-div'><ul class='wc-detail-area'>";
				itemLi += '<li style="width:10%;"><input type="checkbox" class="J_CheckBox" name="ids[]" value="'+num_iid+'"/></li>'
				itemLi += '<li style="width:20%;"><a target="_blank" href="http://item.taobao.com/item.htm?id='+num_iid+'"><img height="30" width="40" src="'+pic_url+'"></img></a></li>';
				itemLi += '<li style="width:35%;">'+title+'</li>'; 
				itemLi += '<li style="width:20%;"><a onClick="adjust.delItem(\''+num_iid+'\')">删除</a></li>'
				var ele = new S.Node(itemLi);	
				DOM.append(ele, itemUl);
				adjust.itemIds.push(''+num_iid);
				DOM.text('#J_ItemTableNum', parseInt(DOM.text('#J_ItemTableNum'))+1);
				DOM.attr('#J_CB_'+num_iid, 'checked', true);
				
				return; 
			},
			addItems : function(){
				DOM.html('#J_AddItemsTip','');
				S.each(S.all(".J_TbCheckBox"),function(item,i){
					if(item.checked){
						adjust.addItem(item.value);
					}
				});
				DOM.html('#J_AddItemsTip','添加成功！');
			},
			delItem : function(num_iid){
				DOM.remove('#J_ItemLi_'+num_iid);
				var ind = S.indexOf(num_iid,adjust.itemIds)
				if(ind!=-1){
					adjust.itemIds.splice(ind, 1);
				}
				DOM.text('#J_ItemTableNum', parseInt(DOM.text('#J_ItemTableNum')-1));
				return;
			},
			delItems : function(){
				S.each(S.all(".J_CheckBox"), function(item, i) {
					if(item.checked) {
						adjust.delItem(''+item.value);
					}
				});
			}
						
    	};
},{
	requires : ['utils/showPages/index','overlay']
});
