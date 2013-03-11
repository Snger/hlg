/**
 * @ 消息组件
 * @author  
 */
KISSY.add(function (S) {
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
	            image = "alert.png";
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
					var divTitle = "<div class=\"msgBoxTitle\">" + self.options.title + "</div>";
					var divContainer = "<div class=\"msgBoxContainer\"><div id=" + divMsgBoxImageId + " class=\"msgBoxImage\"><img src=\"" + self.msgBoxImagePath + image + "\"/></div><div id=" + divMsgBoxContentId + " class=\"msgBoxContent\"><p><span>" + options.content + "</span></p></div></div>";
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

	return msgBox;
});