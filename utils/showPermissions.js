/**
 * @fileOverview 权限类
 * @author  <lzlu.com>
 */

KISSY.add(function(S) {

    /**
     * 
     */
    var permissions = {
			//子账号权限
			LIMIT-CONTENT : '由于淘宝优惠系统崩溃，11号2点半之前促销活动不可用，请亲们谅解',
			isSub : function(app){
				var str = DOM.val('#J_Permissions');
				// 需要 控制功能的时候 直接 判断
				if(window.FUNCTIONLIMIT){
					if(str.search(app) < 0){
						return false;
					}else{
						return true;
					}
				}else{
					var isRoot = DOM.val('#J_IsRoot');
					//如果是 主账户 和  免费版  都没有控制
					if(str == 3 || isRoot == 1){
						return true;
					}
					if(str.search(app) < 0){
						return false;
					}else{
						return true;
					}
					
				}
				
			},
			//版本权限
			// 
			isVersion : function(app){
				  var flag = DOM.val('#J_IsRoot');
				  var result = [];	
				  var versionBody = DOM.html("#zunxiang");
				  var Time = DOM.html("#J_times");
				  var shopId = DOM.val('#J_ShopId');
				  var isOk = false;  //有权限
				  var body = '';
				  switch (flag){
				  	case '1' :
										//一件优惠 ，一口价，团购， 免邮          ，满就送，阶梯价，限购           ，  限时折扣， 满就送彩票   详情                    图标
						var	activeIds = ['onetbspec','spec','tg','freepost','mjs','jtj','buyerlimit','tbspec', 'mjscp'];
					break;
					case '2' :
						/*【工具箱】免费版标准版（shopid>108250 的标准版）提示升级尊享版*/
					  	if(shopId > 108250){
							var	activeIds = ['onetbspec','spec','tg','freepost','mjs','jtj','buyerlimit','tbspec', 'mjscp','promodesc','icon','smart'];
						}else{
											//一件优惠 ，一口价，团购， 免邮          ，满就送，阶梯价，限购           ，  限时折扣， 满就送彩票   详情                    图标		店铺模块 ，工具箱
							var	activeIds = ['onetbspec','spec','tg','freepost','mjs','jtj','buyerlimit','tbspec', 'mjscp','promodesc','icon','smart','tool'];
						}
					break;
					case '3' :
						var	activeIds = ['onetbspec','spec','tg','freepost','mjs','jtj','buyerlimit','tbspec', 'mjscp','promodesc','icon','smart','tool'];
					break;
					default:
						var	activeIds = ['onetbspec','spec','tg','freepost','mjs','jtj','buyerlimit','tbspec', 'mjscp','promodesc','icon','smart','tool'];
					break;
				  }
				  if(flag != 3){
				  	
					if(!KISSY.inArray(app, activeIds)){
							body = '<div style="padding-bottom:5px;"><img src="http://cdn.huanleguang.com/img/hlg/v3/sorry.jpg"/></div><div style="font-size:14px;margin-bottom: 15px;">该功能仅针对尊享版用户开放，您可以通过下面优惠升级</div>'+versionBody+'<div style="background-color:#f5f5f5;color:#999;height:40px; line-height:40px;padding-left:50px;margin: 30px -50px -20px -50px;">'+Time+'</div>';
							isOk = true;
    				}
				  }
				result.push(isOk);
				result.push(body);
				return result;
			}

    };


    return permissions;

});