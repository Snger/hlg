/*链接跟踪
	@parame ，
	@parame data-track  跟踪标签名，
	@parame url  保存地址
*/

KISSY.add(function (S, Node) {
    var $ = Node.all;
    return {
        init: function () {
            $('body').on('click', function(ev){
                var $et = $(ev.target);
                var trackType = $et.attr('data-track');
                if (trackType) {
				  	S.io.get(TRACK_URL,{
					    name:trackType
					});
                }
            });
        }
    }

}, {
    requires: ['node']
});