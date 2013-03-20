//编辑模块


KISSY.add(function (S) {
    // your code here
    var DOM = S.DOM, Event = S.Event, win = window, doc = document,  IE = S.UA.ie,  
		DATA_ID 		= 'data-id',
		DATA_URI 		= 'data-uri',
		DATA_RENDER     = 'data-render',
		DATA_WIDTH      = 'data-width',
		BAR_CLASS_UP	= 'ds-bar-moveup',
		BAR_CLASS_DOWN  = 'ds-bar-movedown',
		BAR_CLASS_NOUP	= 'no-move-up',
		BAR_CLASS_NODOWN= 'no-move-down',
	    paginator=null;
		/*
	     * g_ds_del_list  删除模块列表
	     * */
	    window.g_ds_del_list = [];
		function fixIE6Hover(el) {
	        if (IE && 6 === IE) {
	            el = DOM.get(el);
	            if ( !el ) return;
	            Event.add( el, 'mouseenter', function(evt) {
	                DOM.addClass( this, 'hover' );
	            });
	
	            Event.add( el, 'mouseleave', function(evt) {
	                DOM.removeClass( this, 'hover' );
	            });
	        }
	    }
		function getbar( elem ) {
	        var bar 	= doc.createElement( 'bar' ),
	            barbd   = doc.createElement( 'barbd' ),
	            baracts = doc.createElement( 'baracts' ),
	            BAR_ACT_TPL = '<a href="#2" class="ds-bar-%CLASS" title="%TITLE"><span>%TITLE</span></a>',
				act 	= '', ret = /%TITLE/g, rec = /%CLASS/;
				//edit 	= DOM.attr( elem, DATA_ISEDIT),
				//del 	= DOM.attr( elem, DATA_ISDEL ),
				//target 	= DOM.attr( elem, DATA_ISTARGET ),
				//uri 	= DOM.attr( elem, DATA_URI ),
				//move    = DOM.attr(	elem, DATA_ISMOVE);	
			act += BAR_ACT_TPL.replace( ret, '编辑' ).replace( rec, 'edit' );
	        baracts.innerHTML = act;
	        bar.appendChild( barbd );
	        bar.appendChild( baracts );
			return bar;
	    }
		return  IF = {
				
			/*
	         * 重新渲染模块toolbar位置, 允许指定像素
	         * */
			reflowbar: function( box, bar, pixel ) {
	            if( !box ) return;
			
	            var h, ph, pb, HEIGHT = 'height', MIN = 'tb-minimize', POS = 'position', REL = 'relative', children;
	            children = DOM.children( box );
	            if ( !bar ) {
	                bar = children[children.length - 1];
	            }
		
				if (children.length > 0 &&  children[children.length - 1].tagName.toLowerCase() === 'bar' ) {
					children.pop();
				}
	     
	           // DOM.css( box, HEIGHT, '' );
				DOM.css( children, HEIGHT, '' );
				// 处理box padding-bottom值，导致margin-top 错位问题
				pb = parseFloat( DOM.css( box, 'padding-bottom' ) );
	            h = ( pixel || DOM.height(box) ) - pb; 
				ph = h;
				 h =  DOM.height(box);
	//			S.each(children, function(c){
	//				var ch = c.offsetHeight;
	//				ph = ph - ch;
	//				ph >= 0 ? DOM.css( c, HEIGHT, ch + 'px') : DOM.css( c, HEIGHT, 0);
	//			}); 
	
	            // 如果指定像素, 那使用指定值
	            DOM.css( box, HEIGHT, h );
				DOM.css(bar, {height: h, 'margin-top': -h});
				DOM.css( DOM.children( bar )[0], {height: h - 4, width: box.offsetWidth - 4}); 
	        },
	
	        /*
	         * 内部初始化模块功能, 添加模块bar, 拖拽等
	         * */
	        _initMod: function( mod ) {
	            var self = this, bar = getbar( mod );
				
	            self.reflowbar( mod, bar );
	            mod.appendChild( bar );
				if ( IE ) {
					Event.add( mod, 'mouseenter', function(evt) {
						DOM.removeClass( this, 'fix-ie-hover' );
					});
				}
	            fixIE6Hover(bar);
	        },
			init: function(box) {
	            var self = this;
	            self._initMod( box );
			}			
		};
}, {
    requires: []
})


	
	
