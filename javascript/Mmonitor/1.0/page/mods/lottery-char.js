KISSY.add(function(S) {
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