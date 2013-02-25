Javascript:

	1. 文件编码统一为utf-8, 书写过程过, 每行代码结束必须有分号; 原则上所有功能均根据XXX项目需求原生开发, 以避免网上down下来的代码造成的代码污染(沉冗代码 || 与现有代码冲突 || ...);

	2. 库引入: 原则上仅引入KISSY库, 若需引入第三方库, 须与团队其他人员讨论决定;目前 还有用jQuery在图表

	3. 变量命名: 仅在JavaScript代码中当作hook{钩子}用的id或class,命名规则为J_UpperCamelCase，
注意：如果在JavaScript和CSS中都需要用到,则不用遵守本约定。
	4.前缀规范
		每个局部变量都需要有一个类型前缀，按照类型可以分为：
			s：表示字符串。例如：sName，sHtml；
			n：表示数字。例如：nPage，nTotal；
			b：表示逻辑。例如：bChecked，bHasLogin；
			a：表示数组。例如：aList，aGroup；
			r：表示正则表达式。例如：rDomain，rEmail；
			f：表示函数。例如：fGetHtml，fInit；
			o：表示以上未涉及到的其他对象，例如：oButton，oDate；
		例外情况：
			1：作用域不大临时变量可以简写，比如：str，num，bol，obj，fun，arr。
			2：循环变量可以简写，比如：i，j，k等。

		全局变量使用g作为前缀，定义在window下。例如gUserName，gLoginTime。
		涉及返回逻辑值的函数可以使用is，has等表示逻辑的词语代替动词
		另, 要求变量集中声明, 避免全局变量.

	5.模块书写：
		KISSY.add(function(S) {
	    		function model(){
	 
	    		}
	    		return model;
		  }, {requires:[]});

	6.通用模块 （组件）书写规范：
		。模块返回类，使用new 方式调用；
		。类继承kissy的Base类，使用getter/setter方式控制属性；	
		。暴露出自定义事件供外部监听；
		。可配置性，思考扩展性；
		。更为仔细的注释
		比如：KISSY.add(function(S) {
			var  DOM = S.DOM, Event = S.Event, doc = document, IE = S.UA.ie;
		
			var defConfig = {
				
				
			},
			/**
			 * 所有自定义事件列表
			 */
			 SHOW = "show";					//show
	
			function Dialog (config) {
				var self = this; 
		        	if (!(self instanceof Dialog)) { 
		            		return new Dialog(config); 
		        	}		
				this.config = S.merge(defConfig, config || {});
				var self = this, cfg = self.config, k ,DD;
				
			}
			//
			S.mix(DP, S.EventTarget);
			S.mix(DP, {
				/* *私有变量 */
				_status: 400,
		
				/*** 居中 return this*/
			
				/*** show*/
		        show: function() {
		            var self = this, cfg = this.config;
		            self.fire( BEFORE_SHOW );
				
			
				},
				公有函数 lotteryAnimStop :function(){
				},
		
				私有 _updateButtonEvent	:function(){
				},
				
			});
	    	return Uploader;
		});
		
	7.业务模块
		清晰明确的模块文件名： 比如 lottery-core.js 抽奖下的业务逻辑 lottery-char.js lottery-popup.js 

	8. 命名语义化, 尽可能利用英文单词或其缩写;
	
	9. 尽量避免使用存在兼容性及消耗资源的方法或属性, 比如eval() & innerText;
	
	10. 后期优化中, JavaScript非注释类中文字符须转换成unicode编码使用, 以避免编码错误时乱码显示;
	
	11. 代码结构明了, 加适量注释. 提高函数重用率;
	
	12. 注重与html分离, 减小reflow, 注重性能.

			

	


12. TODO: 1.input  输入限制 
	      2.基本验证（价格，时间，邮箱，等）	
		3.json 传参 特殊字符处理	

		模块/一堆入口文件 mods 子模块  ？？？ 模块/子模块 /一个入口文件 mods 子模块
