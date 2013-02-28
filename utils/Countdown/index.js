/**
 * @fileOverview 
 * @author  
 */
KISSY.add(function (S) {
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

	return  countdown;
  
});