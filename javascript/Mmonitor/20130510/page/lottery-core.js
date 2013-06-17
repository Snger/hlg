/*
combined files : 

page/mods/lottery-char
page/mods/lottery-popup
page/mods/lottery-tplt
utils/roll/index
page/lottery-core

*/
KISSY.add('page/mods/lottery-char',function(S) {
	var DOM = S.DOM,Event = S.Event,E = S.Anim;
	var G = window.lotteryConfig.lotteryChars,
	I = window.lotteryConfig.winChars,
	F = DOM.query(".J_LotteryItem"),
	H = [],
	C = [],
	L = 0.3,
	D = 0.15,
	B = window.lotteryConfig.processDuration;
	var J = {
		_scrollItem: function(R, N) {
			var Q = this,
			P = DOM.get(".J_LotteryScrollWrap", R),
			O = -1 * DOM.height(P) / 2;
			if (H[N]) {
				H[N].cancel();
				H[N] = null
			} 
			if (C[N]) {
				C[N].stop();
				C[N] = null
			}
			H[N] = S.later(function() {
				var U = DOM.query("img", P),
				S = U[0],
				T = U[1],
				V = G[Math.floor(Math.random() * G.length)];
				C[N] = new E(P, {
					top: O
				},
				D, "easeNone",
				function() {
					S.src = V;
					DOM.append(S, P);
					DOM.css(P, {
						top: 0
					})
				}).run()
			},
			D * 1100, true)
		}, 
		lotteryAnimReset: function() {
			
			
		},
		lotteryAnimStart: function() {
			var N = this;
			S.each(F,
			function(P, O) {
				S.later(function() {
					N._scrollItem(P, O)
				},
				O * L * 1000, false)
			})
		},
		lotteryAnimStop: function(N, P ,type) {
			var O = this;
			//N = false;
			S.later(function() {
				S.each(F,
				function(R, Q) {
					S.later(function() {
						var W = DOM.get(".J_LotteryScrollWrap", R),
						V = -1 * DOM.height(W) / 2,
						U = DOM.query("img", W),
						S = U[0],
						T = U[1],
						X;
						if (H[Q]) {
							H[Q].cancel()
						}
						if (C[Q]) {
							C[Q].stop(true)
						}
						if(Q == Math.floor(Math.random() * G.length)){
							X = N ? I[type][0] : I[2][0];
						}else{ 
							X = N ? I[type][0] : G[Math.floor(Math.random() * G.length)];
						}
						S.src = X;
						T.src = X;
						//console.log(X)
					},
					Q * L * 1000, false)
				});
				S.later(function() {
					S.isFunction(P) && P()
				},
				F.length * (L + D) * 1000, false)
			},
			B * 1000, false)
		}
	};
	return J
});
KISSY.add('page/mods/lottery-popup',function(E, B, F, D) {
	var A = E.Event;
	var C = new B.Popup({
		prefixCls: "lottery-",
		elCls: "lottery-popup-root",
		zIndex: 99999,
		content: "",
		closable: true,
		mask: true
	});
	A.on(window, "resize",
	function(H) {
		C.center()
	});
	var G = {
		show: function(I) {
			var J = I.payload.code,
			H = D.MAP_RESULT[J],
			K;
//			if (I.data !== "") {
//				H.data = I.data
//			}
			K = F(D.TPLT).render(H);
			C.set("content", K);
			C.center();
			C.show()
		},
		hide: function() {
			C.set("content", "");
			C.hide()
		}
	};
	return G
},
{
	requires: ["overlay", "template", "./lottery-tplt"]
});
   		 
/**
 * @fileOverview 
 * @author  
 */
KISSY.add('page/mods/lottery-tplt',function(C) {
	var A = '<div class="lottery-popup-content {{icon_cls}}"><div class="lottery-popup-title"><p class="lottery-popup-title-main">{{title_main}}</p><p class="lottery-popup-title-sub">{{#if data}} {{data}} {{/if}}{{title_sub}}</p></div><div class="lottery-popup-button">{{#each buttons as button}}<a href="{{button.href}}" class="{{button.cls}}">{{button.text}}</a>{{/each}}</div></div>';
	var B = {
		"1": {
			title_main: "亲，您还不是欢乐逛的用户<br />暂时无法抽奖哦！",
			title_sub: "您可以先开通免费版再来抽奖",
			icon_cls: "lottery-icon-1",
			buttons: [{
				text: "开通免费版",
				cls: "",
				href: "http://fuwu.taobao.com/ser/assembleParam.htm?subParams=itemCode:appstore-10687-1,cycleNum:12,cycleUnit:2"
			}]
		},
		"2": {
			title_main: "亲，恭喜您抽中“免费季度尊享版”啦",
			title_sub: "您只要退出并重新登录软件，系统就会自动帮您升级哦",
			icon_cls: "lottery-icon-2",
			buttons: [{
				text: "确定",
				cls: "J_LotteryPopHide",
				href: ""
			}]
		}, 
		"3": {
			title_main: "亲，手气不是很好哦！",
			title_sub: "不要气馁，后续还有更多活动哦",
			icon_cls: "lottery-icon-3",
			buttons: [{
				text: "确定",
				cls: "J_LotteryPopHide",
				href: ""
			}]
		},
		"4": {
			title_main: "亲，请先登录哦！",
			title_sub: "\u7acb\u523b\u767b\u5f55\uff0c\u53c2\u4e0e\u62bd\u5956",
			icon_cls: "lottery-icon-4",
			buttons: [{
				text: "\u7acb\u523b\u767b\u5f55",
				cls: "J_LotteryLogin",
				href: "https://oauth.taobao.com/authorize?client_id=12029422&response_type=code&redirect_uri=http://tb.huanleguang.com/"
			}]
		},
		"5": {
			title_main: "亲，恭喜您抽中“诺基亚手机”啦",
			title_sub: "速速查看<a target=\"_blank\" href=\"http://bangpai.taobao.com/group/thread/609027-282269816.htm?spm=0.0.0.0.Ssas6x\">【领取注意事项】</a>吧！",
			icon_cls: "lottery-icon-2",
			buttons: [{
				text: "确定",
				cls: "J_LotteryPopHide",
				href: ""
			}]
		},  
	
	
		"6": {
			title_main: "亲，每个人只有一次抽奖机会哦！",
			title_sub: " ",
			icon_cls: "lottery-icon-6",
			buttons: [{
				text: "确定",
				cls: "J_LotteryPopHide",
				href: ""
			}]
		},

		"7": {
			title_main: "\u6d3b\u52a8\u592a\u706b\u7206\u4e86\uff0c\u7a0d\u7b49\u4e00\u4f1a\u513f\u3002",
			title_sub: "\u518d\u6765\u8bd5\u4e00\u6b21\u5427\uff01",
			icon_cls: "lottery-icon-5",
			buttons: [{
				text: "确定",
				cls: "J_LotteryPopHide",
				href: ""
			}]
		},

		"8": {
			title_main: "亲，该活动还未开始哦！",
			title_sub: "请您在活动开始之后再来抽奖哦",
			icon_cls: "lottery-icon-8",
			buttons: [{
				text: "确定",
				cls: "J_LotteryPopHide",
				href: ""
			}]
		},
		"9": {
			title_main: "亲，不好意思",
			title_sub: "该活动已经结束了哦",
			icon_cls: "lottery-icon-8",
			buttons: [{
				text: "确定",
				cls: "J_LotteryPopHide",
				href: ""
			}]
		}
	};
	return {
		TPLT: A,
		MAP_RESULT: B
	}
});
/**
 * @fileOverview 
 * @author  
 */
KISSY.add('utils/roll/index',function (S) {
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

/**
 * @fileOverview 
 * @author  
 */
KISSY.add('page/lottery-core',function(S, char, popup , roll) {
	var DOM = S.DOM,
	Event = S.Event,
	E = document.body;
	var G = {
		init: function() {
			var I = this,
			H = DOM.get(".J_LotteryButton");
			if (!H) {
				return
			}
			I.lotteryButton = H;
			I._updateButtonEvent(I._lottery);
			I._initEventMap()
			var arr = KISSY.DOM.children('#J_WinnerListUl');
			 if(arr.length > 8){
				 new roll('#J_WinnerList','up',100)
			};
		},
		_updateButtonEvent: function(I) {
			var H = this.lotteryButton;
			Event.remove(H, "click");
			Event.on(H, "click", I, this)
		},
		_lottery: function(J) {
			J.preventDefault();
			var I = this;
			I._lotteryQuery()
		},
		_lotteryQuery: function() {
			var H = this;
			H._updateButtonEvent(H._showLotterying);
			char.lotteryAnimStart();
			S.io({
				url: window.lotteryConfig.api.lotteryURI,
				type: "get",
				data: {
					_tb_token_: window.lotteryConfig.token
				},
				dataType: "json", 
				success: function(J) {	
					var I = (J.payload.status === "success");
					//获奖类型
					var type = J.payload.type; 
					char.lotteryAnimStop(I,function() {
							switch (J.payload.code) {
								case '1':
								case 1 :
									H._updateButtonEvent(H._showLotteryOrder);
									break;
								case 4:
								case '4':
									H._updateButtonEvent(H._showLotteryLogin);
									break;
								case 6:
								case '6':
									H._updateButtonEvent(H._showLotteryChanceOver);
									break;
								case 8:
								case '8':
									H._updateButtonEvent(H._showLotteryLimit);
									break;
								case 9:
								case '9':
									H._updateButtonEvent(H._showLotteryExpired);
									break;
								default:
									H._updateButtonEvent(H._lottery);
									break ;
							}
						popup.show(J) 
					}, type)
				},
				error: function(K, I, J) {
					char.lotteryAnimStop(false,
					function() {
						popup.show({
							"payload":{code: 7} 
						});
						H._updateButtonEvent(H._lottery)
					})
				}
			})
		},
		_initEventMap: function() {
			var H = this;

			Event.delegate(E, "click", ".J_LotteryPopHide",
			function(I) {
				I.preventDefault();
				popup.hide()
			});
			Event.delegate(E, "click", ".J_LotteryShare",
			function(I) {
				I.preventDefault()
			})
		},
		_showLotterying: function(H) {
			H && H.preventDefault && H.preventDefault()
		},
		_showLotteryOrder : function(H){
			H && H.preventDefault && H.preventDefault();
			popup.show({
				"payload":{code: 1} 
			});
		},
		_showLotteryLogin : function(H){
			H && H.preventDefault && H.preventDefault();
			popup.show({
				"payload":{code: 4} 
			});
			
		},
		_showLotteryChanceOver : function(H){
			H && H.preventDefault && H.preventDefault();
			popup.show({
				"payload":{code: 6} 
			});
		},
		_showLotteryLimit : function(H){
			H && H.preventDefault && H.preventDefault();
			popup.show({
				"payload":{code: 8} 
			});
		},
		_showLotteryExpired :function(H){
			H && H.preventDefault && H.preventDefault();
			popup.show({
				"payload":{code: 9} 
			});
		}
	};
	return G
},{
	requires: ['./mods/lottery-char', './mods/lottery-popup', 'utils/roll/index' ]
});
