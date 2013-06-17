H.namespace("rateControl");
H.add('rateControl',function(){
	var S = KISSY,DOM = S.DOM, Event = S.Event;	
	
	H.rateControl = {
		paginator : null,  		//推荐宝贝 分页
		selectPaginator : null, //已推荐宝贝 分页
		pageNum : 5,   
		msg : null,
		showItemRates : function(iid){
			//alert(iid);
			if (! H.rateControl.ratePanel) {	
				H.rateControl.ratePanel = H.widget.DialogMgr.get('rate_panel',{
					 Id : 'rate_panel',	
					 head: '搜索宝贝评价信息',
					 body: '',
					 foot: '',
					 center: true,
					 width: '780px',
					 keypress: true,
					 mask: true,
					 drag: true	
				});
				var bodyStr = '<div style="width:760px;height:480px;">'+
					'<div class="baobei-edit"><div class="new-baobei"><div class="seach" style="height:26px;margin-top:10px;">'+
					'买家昵称：<input class="sech-text" id="J_SBuyerNick" />'+
					'&nbsp;&nbsp;<a onclick="H.rateControl.searchItemRate('+iid+')">搜索</a>'+
					'</div>'+
			        '<ul class="new-baobei-list" id="J_ItemRateList"></ul>'+
			        '<div id="J_RatePaging" class="page Lpage"></div>'+
			        '</div>'+
					'<div class="recommend-baobei">'+
					'<h1>已推荐评价</h1>'+
					'<ul class="new-baobei-list" id="J_SelectItemRateList"></ul>'+
					'<div class="page" id="J_SelectRatePaging"></div>'+
					'</div></div>';
					
				H.rateControl.ratePanel.setBody(bodyStr);
			}
			//H.rateControl.ratePanel.center();
			H.rateControl.ratePanel.show();
			H.rateControl.searchItemRate(iid);
			
			H.rateControl.loadItemSelecteRate(iid);
		},
		searchItemRate : function(iid) {
	    	var submitHandle = function(o) {
	    		//alert(KISSY.JSON.stringify(o));            	
		    	totalRecords = o.payload.totalRecords;
				if(totalRecords > 0){
					DOM.get("#J_RatePaging").style.display = '';
				} else {
					DOM.get("#J_RatePaging").style.display = 'none';
					list.msg.hide(false);
					DOM.html(DOM.get('#J_ItemRateList'),'暂无记录！');
					return;
				}
				pageCount = Math.ceil(totalRecords/H.rateControl.pageNum); 
				H.rateControl.renderRate(iid, o.payload.items);
				var handlePagination = function(turnTo) {
			    	var pageId = turnTo;
		    		var submitHandle = function(o) {
		    			//D.get("J_CheckAll").checked = false;
		    			totalRecords = o.payload.totalRecords;
		    			pageCount = Math.ceil(totalRecords/H.rateControl.pageNum); 
		        	    H.rateControl.renderRate(iid, o.payload.items);
		        	    list.msg.hide(false);
		    	        H.rateControl.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_RatePaging',2);
			    	};
			    	var buyerNick = encodeURIComponent(DOM.val(DOM.get("#J_SBuyerNick")));
		    	    var data = "iid="+iid+"&buyer_nick="+buyerNick+"&page_id="+pageId;
		        	list.msg.setMsg('正在获取评价，请稍候').show();
		    	    new H.widget.asyncRequest().setURI(getItemRatesUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
				}
				H.rateControl.paginator = new H.widget.showPages('H.rateControl.paginator').setRender(handlePagination).setPageCount(pageCount).printHtml('#J_RatePaging',2);
				list.msg.hide(false);
	    	};
	    	var errorHandle = function(o){
		    	list.msg.hide();
		    	list.msg.setMsg(o.desc).show();
		    	list.msg.hide(true);
		    };
		    var buyerNick = encodeURIComponent(DOM.val(DOM.get("#J_SBuyerNick")));
		    var data = "iid="+iid+"&buyer_nick="+buyerNick+"&page_id="+'1';
//	    	list.msg.setMsg('正在获取评价，请稍候').show();
	    	new H.widget.asyncRequest().setURI(getItemRatesUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
		},
	
		//渲染宝贝
		renderRate: function(iid, items) {
			var len = items.length;
			var els = '';
			for (var i=0; i<len; i++) {
				if (H.rateControl.hasSelectedRate(items[i].rate_id, iid)) {
					var showed = 'style="display:none"'; 
				} else {
					var showed = 'style="display:"';
				}
				
				els += 
				'<li id="Ltr-'+items[i].rate_id+'">'+
				'<div style="width:70px;">'+items[i].buyer_nick+'</div>'+
				'<div style="margin-left:10px;width:150px;">'+items[i].content+'</div>'+
				'<div style="margin-left:10px;width:80px;">'+items[i].created+'</div>';
				els += '<div style="margin-left:0px;width:30px;"><a '+showed+'id="J_RateAddLink_'+items[i].rate_id+'" href="#2" onclick="H.rateControl.addItemRate('+iid+','+items[i].rate_id+',\''+items[i].content+'\',\''+items[i].buyer_nick+'\',\''+items[i].created+'\')" >添加</a>';
				els += '</div></li>';
			}
			DOM.html(DOM.get('#J_ItemRateList'),els);
	
		},

		loadItemSelecteRate : function(iid) {
	    	var submitHandle = function(o) {
	    		//alert(KISSY.JSON.stringify(o));            	
		    	totalRecords = o.payload.totalRecords;
				if(totalRecords > 0){
					DOM.get("#J_SelectRatePaging").style.display = '';
				} else {
					DOM.get("#J_SelectRatePaging").style.display = 'none';
					H.rateControl.msg.hide(false);
					DOM.html(DOM.get('#J_SelectItemRateList'),'');
					return;
				}
				pageCount = Math.ceil(totalRecords/H.rateControl.pageNum); 
				H.rateControl.renderSelectdRate(iid, o.payload.items);
				var handlePagination = function(turnTo) {
			    	var pageId = turnTo;
		    		var submitHandle = function(o) {
		    			totalRecords = o.payload.totalRecords;
		    			pageCount = Math.ceil(totalRecords/H.rateControl.pageNum); 
		        	    H.rateControl.renderSelectdRate(iid, o.payload.items);
		        	    H.rateControl.msg.hide(false);
		    	        H.rateControl.selectPaginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_SelectRatePaging',2);
			    	};
			    	var rateIds = DOM.val('#J_RateMess_'+iid);
		    	    var data = "rate_ids="+rateIds+"&page_id="+pageId;
		        	H.rateControl.msg.setMsg('正在获取评价，请稍候').show();
		    	    new H.widget.asyncRequest().setURI(getItemRatesUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
				}
				H.rateControl.selectPaginator = new H.widget.showPages('H.rateControl.selectPaginator').setRender(handlePagination).setPageCount(pageCount).printHtml('#J_SelectRatePaging',2);
				H.rateControl.msg.hide(false);
	    	};
	    	var errorHandle = function(o){
		    	H.rateControl.msg.hide();
		    	H.rateControl.msg.setMsg(o.desc).show();
		    	H.rateControl.msg.hide(true);
		    };
		    var rateIds = DOM.val('#J_RateMess_'+iid);
    	    var data = "rate_ids="+rateIds+"&page_id=1";
//	    	H.rateControl.msg.setMsg('正在获取评价，请稍候').show();
	    	new H.widget.asyncRequest().setURI(getItemRatesUrl).setMethod("GET").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
		},

		renderSelectdRate: function(iid, items) {
			var len = items.length;
			var els = '';
			for (var i=0; i<len; i++) {
				els += 
				'<li id="Rtr-'+items[i].rate_id+'">'+
				'<div style="width:70px;">'+items[i].buyer_nick+'</div>'+
				'<div style="margin-left:10px;width:150px;">'+items[i].content+'</div>'+
				'<div style="margin-left:10px;width:80px;">'+items[i].created+'</div>';
		 		els += '<div style="margin-left:0px;width:30px;"><a id="J_RateDelLink_'+items[i].rate_id+'" href="#2" onclick="H.rateControl.delItemRate('+iid+','+items[i].rate_id+')" >删除</a>';
				els += '</div></li>';
			}
			DOM.html(DOM.get('#J_SelectItemRateList'),els);
	
		},
		
		hasSelectedRate : function(rate_id, iid) {
			var rateIds = DOM.val('#J_RateMess_'+iid);
			rateIds = rateIds.split(',');
			var len = rateIds.length;
			for(var i=0; i<len; i++) {
				if (rateIds[i] == rate_id) {
					return true;
					break;
				}
			}
			return false;
			
		},
		addItemRate : function(iid, rate_id,content,buyer_nick,created){
			var rateIds = DOM.val('#J_RateMess_'+iid);
			if(rateIds) {
				DOM.val('#J_RateMess_'+iid, rateIds+','+rate_id);
			} else {
				DOM.val('#J_RateMess_'+iid, ''+rate_id);
			}

			DOM.hide('#J_RateAddLink_'+rate_id);
			var data = "rate_id="+rate_id+"&item_id="+iid+"&content="+content+"&created="+created+"&buyer_nick="+buyer_nick;
		    new H.widget.asyncRequest().setURI(addItemRatesUrl).setMethod("POST").setData(data).send();
			H.rateControl.loadItemSelecteRate(iid);
		},
	
		delItemRate : function(iid, rate_id) {
			var rateIds = DOM.val('#J_RateMess_'+iid);
			rateIds = rateIds.split(',');
			var ind = rateIds.indexOf(rate_id);
			rateIds.splice(ind,1);
			DOM.val('#J_RateMess_'+iid, rateIds.join(','));

			if(DOM.get('#Ltr-'+rate_id)){
				DOM.show('#J_RateAddLink_'+rate_id);
			}
			var data = "rate_id="+rate_id;
		    new H.widget.asyncRequest().setURI(deleteItemRatesUrl).setMethod("POST").setData(data).send();
			H.rateControl.loadItemSelecteRate(iid);
		}
	
	}

	
	
})