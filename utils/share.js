/**
 * @fileOverview 分享类
 * @author  <lzlu.com>
 */

KISSY.add(function(S) {

    /**
     * 常用分享
     */
    var share = {


        /**
         * qq
         * @param {Object} str
         * @return {Object}
         */
       	shareToQzone : function(item_id, title){
			url = 'http://item.taobao.com/item.htm?id='+item_id;
			window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+encodeURIComponent(url)+'&title'+encodeURIComponent(title));
			return false;
		},
		shareToSina : function(item_id,title){
			url = 'http://item.taobao.com/item.htm?id='+item_id;
			void((function(s,d,e){try{}catch(e){}
			var f='http://v.t.sina.com.cn/share/share.php?',u=url,p=['url=',e(u),'&title=',e(title),'&appkey=1226626340'].join
				('');function a(){if(!window.open([f,p].join(''),'mb',['toolbar=0,status=0,resizable=1,width=620,height=450,left=',(s.width-
				620)/2,',top=',(s.height-450)/2].join('')))u.href=[f,p].join('');};if(/Firefox/.test(navigator.userAgent)){setTimeout(a,0)}
				else{a()}})(screen,document,encodeURIComponent));
		},		
		shareToQq : function(item_id, title){
			url = 'http://item.taobao.com/item.htm?id='+item_id;
			window.open( 'http://v.t.qq.com/share/share.php?url='+encodeURIComponent(url)+'&appkey=&site=&title='+encodeURI(title),'', 'width=700, height=680, top=0, left=0, toolbar=no,menubar=no, scrollbars=no, location=yes, resizable=no, status=no' );
			return false;
		},
		shareToRenren : function(item_id, title){
			url = 'http://item.taobao.com/item.htm?id='+item_id;
			void((function(s,d,e){
				if(/xiaonei\.com/.test(url))return;
				var f='http://share.xiaonei.com/share/buttonshare.do?link=',
					u=url,l=title,p=[e(u),'&title=',e(l)].join('');
				function a(){
					if(!window.open([f,p].join(''),'xnshare',['toolbar=0,status=0,resizable=1,width=626,height=436,left=',(s.width-626)/2,',top=',(s.height-436)/2].join('')))u.href=[f,p].join('');};if(/Firefox/.test(navigator.userAgent))setTimeout(a,0);else a();})(screen,document,encodeURIComponent));
		},
		shareToKaixin : function(item_id, title){
			var url = 'http://item.taobao.com/item.htm?id='+item_id;
			d=document;t=d.selection?(d.selection.type!='None'?d.selection.createRange().text:''):
				(d.getSelection?d.getSelection():'');void(kaixin=window.open('http://www.kaixin001.com/~repaste/repaste.php?&rurl='+escape
				(url)+'&rtitle='+escape(title)+'&rcontent='+escape(d.title),'kaixin'));kaixin.focus();

		},
		shareToDouban : function(item_id, title){
			var url = 'http://item.taobao.com/item.htm?id='+item_id;
			void(function(){var 
				d=document,e=encodeURIComponent,s1=window.getSelection,s2=d.getSelection,s3=d.selection,s=s1?s1():s2?s2():s3?s3.createRange
				().text:'',r='http://www.douban.com/recommend/?url='+e(url)+'&title='+e(title)+'&sel='+e(s)+'&v=1',x=function
				(){if(!window.open(r,'douban','toolbar=0,resizable=1,scrollbars=yes,status=1,width=700,height=680'))
				location.href=r+'&r=1'};if(/Firefox/.test(navigator.userAgent)){setTimeout(x,0)}else{x()}})()
		},
		shareToBaidu : function(item_id, title){
			url = 'http://item.taobao.com/item.htm?id='+item_id;
			window.open('http://apps.hi.baidu.com/share/?title='+encodeURIComponent(title.substring(0,76))+'&url='+encodeURIComponent(url));
			return false;
		}

    };


    return share;

});