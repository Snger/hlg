/**
 * @异步封装组件
 * @author  
 */
KISSY.add(function (S,msgBox) {
	var DOM = S.DOM, Event = S.Event, doc = document;
	function asyncRequest(uri) {

    	var self = this; 
        if (!(self instanceof asyncRequest)) { 
            return new asyncRequest(uri); 
        }
		this.form = ''; 
        this.dataType = 'json';
	    this.uri = '';
        this.method = 'GET';
        this.data = null;
        this.bootloadable = true;
        this.resList = [];
        if (uri != undefined) {
            this.setURI(uri);
        }
      
    };
	
	S.mix(asyncRequest.prototype,{
		
		handleSuccess: function() {
			return undefined;
		},

        handleFailure: function(o) {
           alert(o.desc);
        },
		
        mapRes: function() {
            var links = document.getElemenHLGByTagName("link");
            var scripHLG = document.getElemenHLGByTagName("script");
            if (links.length) {
                for (var i = 0, l = links.length; i < l; i++) {
                    this.resList.push(links[i].href);
                }
            }
            if (scripHLG.length) {
                for (var i = 0, l = scripHLG.length; i < l; i++) {
                    this.resList.push(scripHLG[i].src);
                }
            }
        },
		
		setMethod: function(m) {
            this.method = m.toString().toUpperCase();
            return this;
        },
		
        getMethod: function() {
            return this.method;
        },
		
        setData: function(obj) {
        	this.data = obj;
            return this;
        },
		
        getData: function() {
            return this.data;
        },
		 setForm: function(form) {
        	this.form = form;
            return this;
        },
		
        getForm: function() {
            return this.form;
        },
        setURI: function(uri) {
            this.uri = uri;
            return this;
        },
		
        getURI: function() {
            return this.uri.toString();
        },
        
        setDataType: function(datatype) {
            this.dataType = datatype;
            return this;
        },
		
        getDataType: function() {
            return this.dataType;
        },
		
        setHandle: function(fn) {
        	this.handleSuccess = fn;
            return this;
        },
		
        setErrorHandle: function(fn) {
        	this.handleFailure = fn;
            return this;
        },
        dispatchResponse: function(o,b) {

        	b.handleSuccess(o);
            var onload = o.onload;
            if (onload) {
                try { (new Function(onload))();
              
			    } catch(exception) {
                   // HLG.widget.msgBox.setMsg('执行返回数据中的脚本出错').setAutohide().show()
                }
            }
        },
        disableBootload: function() {
            this.bootloadable = false;
            return this;
        },
        enableBootload: function() {
            this.bootloadable = true;
            return this;
        },
        dispatchErrorResponse: function(o,textStatus,xhrObj) {
			DOM.hide(DOM.query('.messages-prompt'));
			DOM.hide(DOM.query('.msg-mask'));
			var errorMsg = new H.util.Msg(); 
			if(textStatus){
				if(textStatus == 'timeout'){
					new msgBox({ content: "请求超时，请检查网络是否连接正常", dialogType:"loading", autoClose:true, timeOut:8000, });
				}else{
					if(textStatus.search('存储空间不足') >= 0){
						new msgBox({
						    title:"温馨提示",
						    content:'浏览器问题导致本次操作无法处理，<a href="http://bangpai.taobao.com/group/thread/609027-277519092.htm?spm=0.0.0.40.24059f" target="_blank">查看解决办法</a>',
						    type:"info"
						});
					}else{
						new msgBox({ content: "系统出错"+textStatus+"，请联系欢乐逛", dialogType:"loading", autoClose:true, timeOut:8000, });
					}
				}	
			} 	
        },
        send: function() {
        	var self = this;
            if (self.method == "GET" && self.data) {
                self.uri += ((self.uri.indexOf('?') == -1) ? '?': '&') + self.data;
                self.data = null;
            }
        	var ajax = this;
        	
        	interpretResponse = function(data, textStatus, xhr,ajax) {
        		var self = ajax;
        		if (data.ajaxExpired!=null) {
        			window.location = data.ajaxRedirect;
        			return
        		}
        		if (data.error) {
        			//alert(this.handleFailure);
        			var fn = self.handleFailure;
        		} else {
        			var fn = self.dispatchResponse;
        		}   
        		fn = fn.shield(null, data,ajax);
        		fn = fn.defer.bind(fn);
				/*
	            if (this.bootloadable) {
	                var bootload = data.bootload;
	                if (bootload) {
	                    Bootloader.loadResources(response.bootload, fn, false)
	                } else {
	                    fn()
	                }
	            } else {
	                fn()
	            }
				*/
				fn();
        	};
            S.ajax({
				form:self.form,
				type:self.method,
			    url:self.uri,
			    data:self.data,
		        success:function(data, textStatus, xhr){
            		interpretResponse(data, textStatus, xhr,ajax);
            	},
				error:this.dispatchErrorResponse,
			    dataType:self.dataType,
				timeout:60,
				complete: function (o,s,xhr) {  xhr = null; } 
			})
        }
	});
	return asyncRequest;
  
}, {
    requires: ['utils/MsgBox/index']
});