function bind(obj, method) {
    var args = [];
    for (var ii = 2; ii < arguments.length; ii++) {
        args.push(arguments[ii]);
    }
    var fn = function() {
        var _obj = obj || (this == window ? false: this);
        var _args = args.slice();
        for (var jj = 0; jj < arguments.length; jj++) {
            _args.push(arguments[jj]);
        }
        if (typeof(method) == "string") {
            if (_obj[method]) {
                return _obj[method].apply(_obj, _args);
            }
        } else {
            return method.apply(_obj, _args);
          }
    };
    if (typeof method == 'string') {
        fn.name = method;
    } else if (method && method.name) {
        fn.name = method.name;
    }
    fn.toString = function() {
        return bind._toString(obj, args, method);
    };
    return fn;
};
bind._toString = bind._toString || function(obj, args, method) {
    return (typeof method == 'string') ? ('late bind<' + method + '>') : ('bound<' + method.toString() + '>');
};
function to_array(obj) {
    var ret = [];
    for (var i = 0, l = obj.length; i < l; ++i) {
        ret.push(obj[i]);
    }
    return ret;
};
Function.prototype.bind = function(context) {
    var argv = [arguments[0], this];
    var argc = arguments.length;
    for (var ii = 1; ii < argc; ii++) {
        argv.push(arguments[ii]);
    }
    return bind.apply(null, argv);
};
Function.prototype.shield = function(context) {
    if (typeof this != 'function') {
        throw new TypeException();
    }
    var bound = this.bind.apply(this, to_array(arguments));
    return function() {
        return bound();
    };
};
Function.prototype.defer = function(msec, clear_on_quickling_event) {
    if (typeof this != 'function') {
        throw new TypeError();
    }
    msec = msec || 0;
    return setTimeout(this, msec, clear_on_quickling_event);
};
Date.prototype.format = function(format){
        var o = {
	        "M+" : this.getMonth()+1, //month
	        "d+" : this.getDate(),    //day
	        "h+" : this.getHours(),   //hour
	        "m+" : this.getMinutes(), //minute
	        "s+" : this.getSeconds(), //second
	        "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
	        "S" : this.getMilliseconds() //millisecond
        }
        if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
        (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        for(var k in o)if(new RegExp("("+ k +")").test(format))
        format = format.replace(RegExp.$1,
        RegExp.$1.length==1 ? o[k] :
        ("00"+ o[k]).substr((""+ o[k]).length));
        return format;
}

KISSY.app('H', function() {
	var S = KISSY, DOM = S.DOM,Event = S.Event;	doc = document;
    return {
        /** * 版本号 */
		version: '1.2',
		/** 存放公用方法等 * */
		util: {
			/*页面跳转*/
			setLocation: function(url)  {
				window.location.href = url;
				try {
					window.event.returnValue = false;
				} catch(e) {
					//
				}
			},
			/*链接跟踪
				@parame btn  跟踪链接点，
				@parame tag  跟踪标签名，
				@parame url  保存地址
			*/
			saveTrack: function(btn,tag,url){
					Event.on(btn,'click',function(){
						KISSY.io.get(url,{
					    	name:tag
						});
					})
			},
			/* * 页面刷新 * */
			pageReload: function( url ) {
				url = ( url || window.location.toString() ).replace(/t=(\d)+/g, '').replace(/([&|?])+$/, '');
				url = url + ( -1 === url.indexOf('?') ? '?' : '&' ) + 't=' + KISSY.now();
				return window.location = url;
			},
			/*复制功能*/
			clipboard: function(el,contain){
				Event.on(el,'click',function(ev){
					var copy = DOM.val(contain);
					if (window.clipboardData){
						 window.clipboardData.clearData();
						 window.clipboardData.setData("Text", copy);
						 new H.widget.msgBox({ 
						 			type: "success", 
						 			content: "已成功复制",
									dialogType:"msg", 
									autoClose:true, 
									timeOut:3000
								});
						
					}else if (window.netscape){
							 try{
									netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
								}catch(e){
									 new H.widget.msgBox({ 
							 			type: "error", 
							 			content: "您的firefox安全限制限制您进行剪贴板操作，请打开'about:config'将signed.applets.codebase_principal_support'设置为true'之后重试，相对路径为firefox根目录/greprefs/all.js",
										dialogType:"msg", 
										autoClose:true, 
										timeOut:3000
									});
									return false;
								}
							//netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
							var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
							if (!clip) return;
							var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
							if (!trans) return;
							trans.addDataFlavor('text/unicode');
							var str = new Object();
							var len = new Object();
							var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
							var copytext=copy;
							str.data=copytext;
							trans.setTransferData("text/unicode",str,copytext.length*2);
							var clipid=Components.interfaces.nsIClipboard;
							if (!clip) return false;
							clip.setData(trans,null,clipid.kGlobalClipboard);
							 new H.widget.msgBox({ 
						 			type: "success", 
						 			content: "已成功复制",
									dialogType:"msg", 
									autoClose:true, 
									timeOut:3000
								});
						}else if(KISSY.UA.core == 'webkit'){
							 new H.widget.msgBox({ 
							 			type: "error", 
							 			content: "该浏览器暂不支持，请用 Ctrl+c 复制",
										dialogType:"msg", 
										autoClose:true, 
										timeOut:3000
									});
						}
					return false;
				})
			},
			//将日期 2011-6-27 10:22:30 格式 转为  Date 
			StringToDate: function(DateStr) {
				 if(typeof DateStr=="undefined")
					 return new Date();
				 if(typeof DateStr=="date")
					 return DateStr;
				 var converted = Date.parse(DateStr);
				 var myDate = new Date(converted);
				 if(isNaN(myDate)){
					 DateStr=DateStr.replace(/:/g,"-");
					 DateStr=DateStr.replace(" ","-");
					 DateStr=DateStr.replace(".","-");
					 var arys= DateStr.split('-');
					 switch(arys.length){
					 	case 7 : 
						 	myDate = new Date(arys[0],--arys[1],arys[2],arys[3],arys[4],arys[5],arys[6]);
					        break;
					 	case 6 : 
						 	myDate = new Date(arys[0],--arys[1],arys[2],arys[3],arys[4],arys[5]);
						 	break;
						default: 
							myDate = new Date(arys[0],--arys[1],arys[2]);
							break;
					};
				 };
				 return myDate;
			},
			/*价格判断*/
			checkPrice : function(v){
				var result = [];
				var error = false;
				var msg = null;
				if (isNaN(Number(v)) == true || v<=0) {
					error = true;
					msg = '价格是数字哦！';
				}
				result.push(error);
				result.push(msg);
				return result;
			},
			/*格式化数字*/
			FormatNumber: function(srcStr,nAfterDot){
				var srcStr,nAfterDot;
				var resultStr,nTen;
				srcStr = ""+srcStr+"";
				strLen = srcStr.length;
				dotPos = srcStr.indexOf(".",0);
				if (dotPos == -1){
					resultStr = srcStr+".";
					for (i=0;i<nAfterDot;i++){
						resultStr = resultStr+"0";
				}
				return resultStr;
				}
				else{
				if ((strLen - dotPos - 1) >= nAfterDot){
				nAfter = dotPos + nAfterDot + 1;
				nTen =1;
				for(j=0;j<nAfterDot;j++){
				nTen = nTen*10;
				}
				resultStr = Math.ceil(parseFloat(srcStr)*nTen)/nTen;
				return resultStr;
				}
				else{
				resultStr = srcStr;
				for (i=0;i<(nAfterDot - strLen + dotPos + 1);i++){
				resultStr = resultStr+"0";
				}
				return resultStr;
				}
				}
			},
			/*是否为空*/
			isNull : function(str){
				var result = [];
				var error = false;
				var msg = null;
				if(str == null ||str == ""){
					error = true;
					msg = '请填写，此项不能为空！';
				}
				result.push(error);
				result.push(msg);
				return result;
				
			},
			escape: function(str){
				if (str == null) {
					return "";
				}else {
					return str.replace(/\//g, '\\/').replace(/\./g, "\\.").replace(/\*/g, "\\*").replace(/\+/g, "\\+").replace(/\(/g, "\\(").replace(/\)/g, "\\)").replace(/\$/g, "\\$").replace(/\?/g, "\\?").replace(/\[/g, "\\[").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/\{/g, "\\{").replace(/\}/g, "\\}");
				}
			},
			/*json 传json*/
			strProcess : function(str){
				return str.replace(/\\/g, '\\\\').replace(/\"/g, '\\"').replace(/[\t\n&]/g, '%26').replace(/%/g, '%25');
			}
		},
		/** 组件,*/
		widget: {msgBox : null},
		/** 组件,*/
		app:{}
    }
});

H.add('widget~msgBox', function(HLG) {
	var DOM = S.DOM, Event = S.Event, doc = document, $ = S.all;
	function msgBox(options) { //初始化属性 
		var self = this; 
        if (!(self instanceof msgBox)) { 
        	return new msgBox(options); 
        } 
		self.msgBoxImagePath = "http://cdn.huanleguang.com/img/common/msgBox/";	
		self.isShown = false;
		self.divMsgBox; 
		self.divMsgBoxContent; 
		self.divMsgBoxImage;
		self.divMsgBoxButtons;
		self.divMsgBoxBackGround;
		var typeOfValue = typeof options;
	    self.defaults = {
	        content: (typeOfValue == "string" ? options : "Message"),
	        title: "Warning",
	        type: "alert",
			dialogType: "dialog", //[loading,msg,dialog]
	        autoClose: false,
	        timeOut: 0,
	        showButtons: true,
	        buttons: [{ value: "Ok"}],
	        inputs: [{ type: "text", name:"userName", header: "User Name" }, { type: "password",name:"password", header: "Password"}],
	        success: function (result) { },
	        beforeShow: function () { },
	        afterShow: function () { },
	        beforeClose: function () { },
	        afterClose: function () { },
	        opacity: 0.1
	    };
		options = typeOfValue == "string" ? self.defaults : options;
		if (options.type != null && options.dialogType == 'dialog') {
	        switch (options.type) {
	            case "alert":
	                options.title = options.title == null ? "警告" : options.title;
	                break;
	            case "info":
	                options.title = options.title == null ? "消息" : options.title;
	                break;
	            case "error":
	                options.title = options.title == null ? "错误提示" : options.title;
	                break;
	            case "confirm":
	                options.title = options.title == null ? "温馨提示" : options.title;
	                options.buttons = options.buttons == null ? [{ value: "确认" }, { value: "取消" }, { value: "取消"}] : options.buttons;
	                break;
	            case "prompt":
	                options.title = options.title == null ? "提示" : options.title;
	                options.buttons = options.buttons == null ? [{ value: "登录" }, { value: "取消"}] : options.buttons;
	                break;
	            default:
	                image = "alert.png";
	        }
    	}
		options.timeOut = options.timeOut == null ? (options.content == null ? 500 : options.content.length * 70) : options.timeOut;
    
		self.options = S.merge(self.defaults, options || {});
		
		if (self.options.autoClose) {
        	setTimeout(function(){
				self.hide()
			}, self.options.timeOut);
	    }
	    self.image = "";
	    switch (self.options.type && self.options.dialogType == 'dialog') {
	        case "alert":
	            image = "success.png";
	            break;
	        case "info":
	            image = "info.png";
	            break;
	        case "error":
	            image = "error.png";
	            break;
	        case "confirm":
	            image = "confirm.png";
	            break;
	        case "popup":
	            image = "info.png";
	        default:
	            image = "alert.png";
	    }
		self._createHtml();
		
  	}

	S.mix(msgBox.prototype,{
			_createHtml :function(){
				var $ = S.all,self = this;
				var options = self.options;
				var divId = "msgBox" + new Date().getTime();
			    var divMsgBoxId = divId; 
				var divMsgBoxBackGroundId = divId + "BackGround";
				
				if (options.dialogType == 'dialog') {
					var divMsgBoxContentId = divId + "Content";
					var divMsgBoxImageId = divId + "Image";
					var divMsgBoxButtonsId = divId + "Buttons";
					
					
					var buttons = "";
					S.each(self.options.buttons, function(button, index){
						if(index == 0){
							buttons += "<input class=\"btm-68-orange msgButton \" type=\"button\" name=\"" + button.value + "\" value=\"" + button.value + "\" />";
						}else{
							buttons += "<input class=\"btm-68-gray msgButton \" type=\"button\" name=\"" + button.value + "\" value=\"" + button.value + "\" />";
						}
					})
					var inputs = "";
					S.each(self.options.inputs, function(input, index){
						var type = input.type;
						if (type == "checkbox" || type == "radiobutton") {
								inputs += "<div class=\"msgInput\">" +
								"<input type=\"" +
								input.type +
								"id=\"" +
								input.id +
								"\" name=\"" +
								input.name +
								"\" " +
								(input.checked == null ? "" : "checked ='" + input.checked + "'") +
								" value=\"" +
								(typeof input.value == "undefined" ? "" : input.value) +
								"\" />" +
								"<text>" +
								input.header +
								"</text>" +
								"</div>";
						}
						else {
							var className = typeof(input.className)== "undefined" ? "input-text" : input.className;
							inputs += "<div class=\"msgInput\">" +
									"<span class=\"msgInputHeader\">" +
									input.header +
									"</span>" +
									"<span><input type=\"" +
									input.type + 
									"\"class= \""+className+
									"\"id=\""+input.id+"\" name=\"" +
									input.name +
									"\" value=\"" +
									(typeof input.value == "undefined" ? "" : input.value) +
									"\" /></span>" +
									"</div>";							
						}
					})
					var divBackGround = "<div id=" + divMsgBoxBackGroundId + " class=\"msgBoxBackGround\"></div>";
					if(options.type == 'popup'){
						var divTitle = "<div class=\"msgBoxTitle\"><span>" + self.options.title + "</span></div>";
					}else{
						var divTitle = "<div class=\"msgBoxTitle\"><span>" + self.options.title + "</span> <a class=\"closeButton \"></a></div>";
					}
					if(options.content.search('div') < 0){
						var content = "<p><span>" + options.content + "</span></p>";
					}else{
						var content =  options.content ;
					}
					var divContainer = "<div class=\"msgBoxContainer\"><div id=" + divMsgBoxImageId + " class=\"msgBoxImage\"><img src=\"" + self.msgBoxImagePath + image + "\"/></div><div id=" + divMsgBoxContentId + " class=\"msgBoxContent\">"+content+"</div></div>";
					var divButtons = "<div id=" + divMsgBoxButtonsId + " class=\"msgBoxButtons\">" + buttons + "</div>";
					var divInputs = "<div class=\"msgBoxInputs\">" + inputs + "</div>";
					
					
					if (options.type == "prompt") {
						$("body").append(divBackGround + "<div id=" + divMsgBoxId + " class=\"msgBox\">" + divTitle + "<div>" + divContainer + (options.showButtons ? divButtons + "</div>" : "</div>") + "</div>");
						self.divMsgBox = $("#" + divMsgBoxId);
						self.divMsgBoxContent = $("#" + divMsgBoxContentId);
						self.divMsgBoxImage = $("#" + divMsgBoxImageId);
						self.divMsgBoxButtons = $("#" + divMsgBoxButtonsId);
						self.divMsgBoxBackGround = $("#" + divMsgBoxBackGroundId);
						
						self.divMsgBoxImage.remove();
						self.divMsgBoxButtons.css({
							"text-align": "center",
							"margin-top": "5px"
						});
						self.divMsgBoxContent.css({
							"width": "100%",
							"height": "100%"
						});
						self.divMsgBoxContent.html(divInputs);
					}else {
						$("body").append(divBackGround + "<div id=" + divMsgBoxId + " class=\"msgBox\">" + divTitle + "<div>" + divContainer + (options.showButtons ? divButtons + "</div>" : "</div>") + "</div>");
						self.divMsgBox = $("#" + divMsgBoxId);
						self.divMsgBoxContent = $("#" + divMsgBoxContentId);
						self.divMsgBoxImage = $("#" + divMsgBoxImageId);
						self.divMsgBoxButtons = $("#" + divMsgBoxButtonsId);
						self.divMsgBoxBackGround = $("#" + divMsgBoxBackGroundId);
					}
					self.show();
					Event.on(self.divMsgBoxBackGround,'click',function (e) {
				        if (!self.options.showButtons || self.options.autoClose) {
				            self.hide();
				        }else {
				            self.getFocus();
				        }
					});
					Event.on(DOM.get('.closeButton'),'click',function (e) {
				            self.hide();
					});
					Event.on(DOM.query('.msgButton'),'click',function(ev){
						ev.preventDefault();
						 var value = $(this).val();
						 if (self.options.type != "prompt") {
				            self.options.success(value);
				         }else {
				            var inputValues = [];
							S.each(DOM.query('.msgInput'),function(input){
								var name = $(input).attr("name");
				                var value = $(input).val();
				                var type = $(input).attr("type");
				                if (type == "checkbox" || type == "radiobutton") {
				                    inputValues.push({ name: name, value: value,checked: $(input).attr("checked")});
				                }else {
				                    inputValues.push({ name: name, value: value });
				                }
							})
				            self.options.success(value,inputValues);
				        }
				        self.hide();
					})
					
				}else if(options.dialogType == 'loading'){
					
					var divBackGround = "<div id=" + divMsgBoxBackGroundId + " class=\"msgBoxBackGround\"></div>";
					options.content = options.content == null ? "系统处理中，请稍等..." : options.content;
					$("body").append(divBackGround + "<div id=" + divMsgBoxId + " class=\"messages-prompt\"><div class=\"fbloader\"><img  src=\"http://img.huanleguang.com/hlg//fbloader.gif\" width=\"16\" height=\"11\" /></div><div class=\"mini_dialog_content\">" + options.content + "</div></div>");
					self.divMsgBox = $("#" + divMsgBoxId);
					self.divMsgBoxBackGround = $("#" + divMsgBoxBackGroundId);
					self.show();
					
				}else if(options.dialogType == 'msg'){
					self.image = "";
					switch (options.type) {
						case 'alert':
							var divContainer =	'<ul id="noty_top_layout_container" class="" style="top: 0px;left: 20%;position: fixed;_position:absolute;_left:expression(eval(document.documentElement.scrollLeft+20%));_top:expression(eval(document.documentElement.scrollTop));width: 60%;height: auto;margin: 0px;padding: 0px;list-style-type: none;z-index: 9999999;">'+
												'<li style="overflow: hidden; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAoCAYAAAAPOoFWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAPZJREFUeNq81tsOgjAMANB2ov7/7ypaN7IlIwi9rGuT8QSc9EIDAsAznxvY4pXPKr05RUE5MEVB+TyWfCEl9LZApYopCmo9C4FKSMtYoI8Bwv79aQJU4l6hXXCZrQbokJEksxHo9KMOgc6w1atHXM8K9DVC7FQnJ0i8iK3QooGgbnyKgMDygBWyYFZoqx4qS27KqLZJjA1D0jK6QJcYEQEiWv9PGkTsbqxQ8oT+ZtZB6AkdsJnQDnMoHXHLGKOgDYuCWmYhEERCI5gaamW0bnHdA3k2ltlIN+2qKRyCND0bhqSYCyTB3CAOc4WusBEIpkeBuPgJMAAX8Hs1NfqHRgAAAABJRU5ErkJggg==); background-attachment: scroll; background-color: rgb(255, 255, 255); border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 5px; border-bottom-left-radius: 5px; border-bottom-width: 2px; border-bottom-style: solid; border-color: rgb(204, 204, 204); border-left-width: 2px; border-left-style: solid; border-right-width: 2px; border-right-style: solid; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 2px 4px; color: rgb(68, 68, 68); cursor: pointer; background-position: 0% 0%; background-repeat: repeat no-repeat;">'+
												'<div class="noty_bar" ><div class="noty_message" style="font-size: 13px; line-height: 16px; text-align: center; padding: 8px 10px 9px; width: auto; position: relative;"><span class="noty_text">'+options.content+'</span></div></div></li></ul>';
						break;
						case 'info':
						case 'success':
							var divContainer =	'<ul id="noty_top_layout_container" class="" style="top: 0px;left: 20%;position: fixed;_position:absolute;_left:expression(eval(document.documentElement.scrollLeft+20%));_top:expression(eval(document.documentElement.scrollTop));width: 60%;height: auto;margin: 0px;padding: 0px;list-style-type: none;z-index: 9999999;">'+
												'<li style="overflow: hidden; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAoCAYAAAAPOoFWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAPZJREFUeNq81tsOgjAMANB2ov7/7ypaN7IlIwi9rGuT8QSc9EIDAsAznxvY4pXPKr05RUE5MEVB+TyWfCEl9LZApYopCmo9C4FKSMtYoI8Bwv79aQJU4l6hXXCZrQbokJEksxHo9KMOgc6w1atHXM8K9DVC7FQnJ0i8iK3QooGgbnyKgMDygBWyYFZoqx4qS27KqLZJjA1D0jK6QJcYEQEiWv9PGkTsbqxQ8oT+ZtZB6AkdsJnQDnMoHXHLGKOgDYuCWmYhEERCI5gaamW0bnHdA3k2ltlIN+2qKRyCND0bhqSYCyTB3CAOc4WusBEIpkeBuPgJMAAX8Hs1NfqHRgAAAABJRU5ErkJggg==); background-attachment: scroll; background-color: rgb(144, 238, 144); border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 5px; border-bottom-left-radius: 5px; border-bottom-width: 2px; border-bottom-style: solid; border-color: rgb(80, 194, 78); border-left-width: 2px; border-left-style: solid; border-right-width: 2px; border-right-style: solid; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 2px 4px; color: rgb(0, 100, 0); cursor: pointer; background-position: 0% 0%; background-repeat: repeat no-repeat;">'+
												'<div class="noty_bar" ><div class="noty_message" style="font-size: 13px; line-height: 16px; text-align: center; padding: 8px 10px 9px; width: auto; position: relative;"><span class="noty_text">'+options.content+'</span></div></div></li>';
						break;
						case 'error':
							var divContainer =	'<ul id="noty_top_layout_container" class="" style="top: 0px;left: 20%;position: fixed;_position:absolute;_left:expression(eval(document.documentElement.scrollLeft+20%));_top:expression(eval(document.documentElement.scrollTop));width: 60%;height: auto;margin: 0px;padding: 0px;list-style-type: none;z-index: 9999999;">'+
											'<li style="overflow: hidden; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAoCAYAAAAPOoFWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAPZJREFUeNq81tsOgjAMANB2ov7/7ypaN7IlIwi9rGuT8QSc9EIDAsAznxvY4pXPKr05RUE5MEVB+TyWfCEl9LZApYopCmo9C4FKSMtYoI8Bwv79aQJU4l6hXXCZrQbokJEksxHo9KMOgc6w1atHXM8K9DVC7FQnJ0i8iK3QooGgbnyKgMDygBWyYFZoqx4qS27KqLZJjA1D0jK6QJcYEQEiWv9PGkTsbqxQ8oT+ZtZB6AkdsJnQDnMoHXHLGKOgDYuCWmYhEERCI5gaamW0bnHdA3k2ltlIN+2qKRyCND0bhqSYCyTB3CAOc4WusBEIpkeBuPgJMAAX8Hs1NfqHRgAAAABJRU5ErkJggg==); background-attachment: scroll; background-color: red; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 5px; border-bottom-left-radius: 5px; border-bottom-width: 2px; border-bottom-style: solid; border-color: rgb(139, 0, 0); border-left-width: 2px; border-left-style: solid; border-right-width: 2px; border-right-style: solid; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 2px 4px; color: rgb(255, 255, 255); cursor: pointer; background-position: 0% 0%; background-repeat: repeat no-repeat;">'+
											'<div class="noty_bar" >'+
											'<div class="noty_message" style="font-size: 13px; line-height: 16px; text-align: center; padding: 8px 10px 9px; width: auto; position: relative; font-weight: bold;">'+
												'<span class="noty_text">'+options.content+'</span>'+
											'</div></div></li></ul>';
						break;
						default:
							var divContainer =	'<ul id="noty_top_layout_container" class="" style="top: 0px;left: 20%;position: fixed;_position:absolute;_left:expression(eval(document.documentElement.scrollLeft+20%));_top:expression(eval(document.documentElement.scrollTop));width: 60%;height: auto;margin: 0px;padding: 0px;list-style-type: none;z-index: 9999999;">'+
												'<li style="overflow: hidden; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAoCAYAAAAPOoFWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAPZJREFUeNq81tsOgjAMANB2ov7/7ypaN7IlIwi9rGuT8QSc9EIDAsAznxvY4pXPKr05RUE5MEVB+TyWfCEl9LZApYopCmo9C4FKSMtYoI8Bwv79aQJU4l6hXXCZrQbokJEksxHo9KMOgc6w1atHXM8K9DVC7FQnJ0i8iK3QooGgbnyKgMDygBWyYFZoqx4qS27KqLZJjA1D0jK6QJcYEQEiWv9PGkTsbqxQ8oT+ZtZB6AkdsJnQDnMoHXHLGKOgDYuCWmYhEERCI5gaamW0bnHdA3k2ltlIN+2qKRyCND0bhqSYCyTB3CAOc4WusBEIpkeBuPgJMAAX8Hs1NfqHRgAAAABJRU5ErkJggg==); background-attachment: scroll; background-color: rgb(255, 255, 255); border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 5px; border-bottom-left-radius: 5px; border-bottom-width: 2px; border-bottom-style: solid; border-color: rgb(204, 204, 204); border-left-width: 2px; border-left-style: solid; border-right-width: 2px; border-right-style: solid; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 2px 4px; color: rgb(68, 68, 68); cursor: pointer; background-position: 0% 0%; background-repeat: repeat no-repeat;">'+
												'<div class="noty_bar"><div class="noty_message" style="font-size: 13px; line-height: 16px; text-align: center; padding: 8px 10px 9px; width: auto; position: relative;"><span class="noty_text">'+options.content+'</span></div></div></li>';
						 break;
					}
					$("body").append("<div id=" + divMsgBoxId + " class=\"\">"+divContainer+"</div>");
					self.divMsgBox = $("#" + divMsgBoxId);
					self.show();
					
					Event.on(self.divMsgBox,'click',function (e) {
				            self.hide();
					});
					
				}
			    
				
			} ,
		    show :function() {
				var $ = S.all,self = this;
		        if (self.isShown) {
		            return;
		        }
				var options = self.options;
				
				if(options.dialogType == 'dialog'){
					var rs = self.center();
					var top = rs['top'];
					var left = rs['left'];
			        self.divMsgBox.css({ opacity: 0, top: top - 50, left: left });
			        self.divMsgBox.css("background-image", "url('"+self.msgBoxImagePath+"msgBoxBackGround.png')");
			        self.divMsgBoxBackGround.css({ opacity: options.opacity });
			        self.options.beforeShow();
			        self.divMsgBoxBackGround.css({ "width": $(document).width(), "height": self.getDocHeight() });
			        $(self.divMsgBoxId+","+self.divMsgBoxBackGroundId).fadeIn(0);
			        self.divMsgBox.animate({ opacity: 1, "top": top, "left": left }, 0.2);
			        setTimeout(self.options.afterShow, 200);
				}else if(options.dialogType == 'loading'){
					var rs = self.center();
					var top = rs['top'];
					var left = rs['left'];
			        self.divMsgBoxBackGround.css({ opacity: options.opacity });
					self.divMsgBoxBackGround.css({ "width": $(document).width(), "height": self.getDocHeight() });
					self.divMsgBox.css({ "top": top, "left": left }, 0.2);
					
				}else if(options.dialogType == 'msg'){
					self.divMsgBox.css({ opacity: 0, top: top - 50 });
					 self.divMsgBox.animate({ opacity: 1, "top": 0 }, 0.2);
					
				}
		        self.isShown = true;
				if (options.dialogType == 'dialog' || options.dialogType == 'loading') {
					$(window).on('resize', function(e){
						if(self.isShown){
							var rs = self.center();
							var top = rs['top'];
							var left = rs['left'];
							self.divMsgBox.css({
								"top": top,
								"left": left
							});
							
						}
						
					})
					function  msgRoll(){
						if (self.isShown) {
							var rs = self.center();
							var top = rs['top'];
							var left = rs['left'];
							self.divMsgBox.css({
								"top": top,
								"left": left
							});
						}
	            	}
	            	window.onscroll = msgRoll;
				}
    		},	
			/**
			 * 居中 
			 */
			center: function() { 
				var self = this, left, top;
				var elem = DOM.get("#"+self.divMsgBox.attr('id')),
					elemWidth = elem.offsetWidth,
					elemHeight = elem.offsetHeight;
				viewPortWidth = DOM.viewportWidth(),
				viewPortHeight = DOM.viewportHeight();
	            if (elemWidth < viewPortWidth) {
	               left = (viewPortWidth / 2) - (elemWidth / 2) + DOM.scrollLeft();
	            } else {
	                left = DOM.scrollLeft();
	            }
	
	            if (elemHeight < viewPortHeight) {
	                top = (viewPortHeight / 2) - (elemHeight / 2) + DOM.scrollTop();
	            } else {
	                top = DOM.scrollTop();
				}
				var result = {'top':top,'left':left};
	            return result;
			},
    		hide :function() {
				var $ = S.all,self = this;
		        if (!self.isShown) {
		            return;
		        }
				if (self.options.dialogType == 'dialog' || self.options.dialogType == 'loading') {
					var top = self.center()['top'];
					var left = self.center()['left'];
					self.options.beforeClose();
					self.divMsgBox.animate({
						opacity: 0,
						"top": top - 50,
						"left": left
					}, 0.2);
					self.divMsgBoxBackGround.fadeOut(300);
					setTimeout(function(){
						self.divMsgBox.remove();
						self.divMsgBoxBackGround.remove();
					}, 300);
					setTimeout(self.options.afterClose, 300);
				}else{
					self.divMsgBox.animate({
						opacity: 0,
						"top": top - 50
					}, 0.5);
					setTimeout(function(){
						self.divMsgBox.remove();
					}, 300);
				}
		        self.isShown = false;
    		},

    		getDocHeight :function() {
		        var D = document;
		        return Math.max(Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),Math.max(D.body.clientHeight, D.documentElement.clientHeight));
		    },

    		getFocus :function() {
				var self = this;
    			self.divMsgBox.fadeOut(0.2).fadeIn(0.2);
    		}
	})
	H.widget.msgBox = msgBox;
});
  
// 异步封装

H.add('widget~asyncRequest', function(HLG) {
	var S = KISSY, DOM = S.DOM, Event = S.Event, doc = document;
	
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
			if(textStatus){
				if(textStatus == 'timeout'){
					new H.widget.msgBox({ content: "请求超时，请检查网络是否连接正常", dialogType:"loading", autoClose:true, timeOut:8000 });
				}else{
					if(textStatus.search('存储空间不足') >= 0){
						new H.widget.msgBox({
						    title:"温馨提示",
						    content:'浏览器问题导致本次操作无法处理，<a href="http://bangpai.taobao.com/group/thread/609027-277519092.htm?spm=0.0.0.40.24059f" target="_blank">查看解决办法</a>',
						    type:"info"
						});
					}else{
						new H.widget.msgBox({ content: "系统出错"+textStatus+"，请联系欢乐逛", dialogType:"loading", autoClose:true, timeOut:8000 });
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
	H.widget.asyncRequest = asyncRequest;
});
 //循环倒计时
H.add('widget~countdown', function( HLG ) { 
  
	var S = KISSY, DOM = S.DOM, Event = S.Event, doc = document;

	function countdown(contain, endTime, mode) { //初始化属性 
		var self = this; 
        if (!(self instanceof countdown)) { 
        	return new countdown(contain, endTime, mode); 
        } 
        this.timer = null;
        self.init(contain, endTime, mode);	    
    }
	
	S.mix(countdown.prototype,{
		init: function(contain, endTime, mode) {
 	    	//var n = endTime || 1440; //剩余分钟数
 	    		var self = this;
			if (mode == '' || typeof(mode) == 'undefined') mode = 1;
			if(mode == 1){
				// 天 时 分 秒分 
				DOM.html(DOM.get(contain),' <span class="day"></span>天<span class="hour"></span>时<span class="min"></span>分<span class="sec"></span>秒 ');
			} 
			if(mode == 2){
				//  时 分 秒分 
				DOM.html(DOM.get(contain),' <span class="hour">19</span>时<span class="min">19</span>分<span class="sec">26</span>秒');
			} 
			if(mode == 3){
				//  时 分 秒分 
				DOM.html(DOM.get(contain),'<span class="hour"><b>0</b><b>0</b></span><span class="min"><b>0</b><b>0</b></span><span class="sec"><b>0</b><b>0</b></span>');
			} 
					   
            var fresh = function(data) {
            	var nowtime = new Date(), endtime = data;
				var leftsecond = parseInt((endtime.getTime() - nowtime.getTime()) / 1000);
                d = parseInt((leftsecond / 86400) % 10000);
                h = parseInt((leftsecond / 3600) % 24);
                m = parseInt((leftsecond / 60) % 60);
                s = parseInt(leftsecond % 60);
				if (mode == 3) {
					var h = h + d * 24;
				}	
				if(d>=0 && d<10){
					d= '0'+d;
				}
				if(h>=0 && h<10){
					h = '0'+h;
				}
				if(m>=0 && m<10){
					m = '0'+m;
				}
				if(s>=0 && s<10){
					s = '0'+s;
				}
                if( mode == 1 ){
					DOM.html(DOM.get(contain+' .day'), d);
                	DOM.html(DOM.get(contain+' .hour'), h);
                	DOM.html(DOM.get(contain+' .min'), m);
                	DOM.html(DOM.get(contain+' .sec'), s);
				}
				if( mode == 2 || mode == 3){
					if(mode == 3){
						var h = h.toString();
						var m = m.toString();
						var s = s.toString();
							h = '<b>'+h.charAt(0)+'</b><b>'+h.charAt(1)+'</b>';
							m = '<b>'+m.charAt(0)+'</b><b>'+m.charAt(1)+'</b>';
							s = '<b>'+s.charAt(0)+'</b><b>'+s.charAt(1)+'</b>';
					}
                	DOM.html(DOM.get(contain+' .hour'), h);
                	DOM.html(DOM.get(contain+' .min'), m);
                	DOM.html(DOM.get(contain+' .sec'), s);
				}
				if(leftsecond<=0){
					self.endDo();	
				}
            };
            //S.later(newendtime, n * 60000/*1s*/, true/*setInterval*/, null/*context*/, null);
            if(self.timer){
				self.timer.cancel();
			}
            self.timer = S.later(fresh, 1000 /*1s*/, true/*setInterval*/, null/*context*/, endTime);
		},
		//设置结束时 执行函数
        setRender: function(fn) {
			var self = this;
			this.endDo = fn;
			return this;
		},	
		endDo : function(){
			var self = this;
			self.timer.cancel();	
		}		  	   
	});

	H.widget.countdown = countdown;
});


