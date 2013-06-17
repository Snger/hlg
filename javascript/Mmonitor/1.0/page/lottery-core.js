
/**
 * @fileOverview 
 * @author  
 */
KISSY.add(function(S, char, popup , roll) {
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