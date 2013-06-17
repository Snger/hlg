/**
 * @fileOverview 
 * @author  
 */
KISSY.add(function (S) {
		/*结构
	<div id="demo">
		<div>放数据 </div>
		<div ></div>
	</div>
	*/	
	var DOM = S.DOM, Event = S.Event, doc = document;
		
	var LEFT = "left", RIGHT = "right", UP = "up", DOWN = "down";
	
	function roll(contain, mode,speed) { //初始化属性 
		var self = this;
		if (!(self instanceof roll)) { 
        	return new roll(contain, mode, speed); 
        } 
	    this.tab = DOM.get(contain);
		this.speed = speed;
		var child = DOM.children(this.tab);
	    if(child.length!=2) return;
	    this.tab1 = child[0];
		this.tab2 = child[1];
	   self.init(mode);	 
    }
	
	S.mix(roll.prototype,{
		init: function(mode) {
			
 	    	var self = this;   
            if (mode == '' || typeof(mode) == 'undefined') mode = UP;
			switch(mode){
				case UP:
					DOM.html(self.tab2,DOM.html(self.tab1));
					function MarqueeUp(){
						if (self.tab2.offsetTop - self.tab.scrollTop <= 0) {
							self.tab.scrollTop -= self.tab1.offsetHeight;
						}
						else {
							
							self.tab.scrollTop++;
						}
					}
					self.timer = S.later(MarqueeUp,self.speed,true,null,null);
					Event.on(self.tab,'mouseenter mouseleave',function(ev){
						if(ev.type == 'mouseenter'){
							self.timer.cancel();
						} else {
						    self.timer = S.later(MarqueeUp,self.speed,true,null,null);
						}
						
					});
					break;
					
				case DOWN: 
					DOM.html(self.tab2,DOM.html(self.tab1));
					self.tab.scrollTop=self.tab.scrollHeight;
					function MarqueeDown(){
						if(self.tab1.offsetTop-self.tab.scrollTop>=0)//当滚动至demo1与demo2交界时
							self.tab.scrollTop+=self.tab2.offsetHeight;//demo跳到最顶端
						else{
							self.tab.scrollTop--;
						}
					}
					self.timer = S.later(MarqueeDown,self.speed,true,null,null);
					Event.on(self.tab,'mouseenter mouseleave',function(ev){
						if(ev.type == 'mouseenter'){
							self.timer.cancel();
						} else {
						    self.timer = S.later(MarqueeDown,self.speed,true,null,null);
						}
						
					});
					break;
				case LEFT: 
					alert('left');
					break;
				case RIGHT: 
					alert('right');
					break;			
			}
		}
	});

	return roll;

});