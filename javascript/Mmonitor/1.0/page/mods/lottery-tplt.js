   		 
/**
 * @fileOverview 
 * @author  
 */
KISSY.add(function(C) {
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