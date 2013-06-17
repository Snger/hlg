KISSY.add(function(E, B, F, D) {
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