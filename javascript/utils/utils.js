/**
 * @fileOverview 工具类
 * @author  <lzlu.com>
 */

KISSY.add(function(S) {

    /**
     * 常用工具类
     */
    var utils = {

        log: S.log,

        /**
         * 转化为JSON对象
         * @param {Object} str
         * @return {Object}
         */
        toJSON: function(str) {
            try {
                eval("var result=" + str);
            } catch(e) {
                return {};
            }
            return result;
            //return S.JSON.parse(str);
        },
		 /**
         * JSON ajax 传参转换
         * @param {Object} str
         * @return {Object}
         */
		strProcess : function(str){
				return str.replace(/\\/g, '\\\\').replace(/\"/g, '\\"').replace(/[\t\n&]/g, '%26').replace(/%/g, '%25');
		},

        /**
         * 判断是否为空字符串
         * @param {Object} v
         * @return {Boolean}
         */
        isEmpty: function(v) {
            return v === null || v === undefined || v === '';
        },

        /**
         * 格式化参数
         * @param {Object} str 要格式化的字符串
         * @return {String}
         */
        format: function(str) {
            //format("金额必须在{0}至{1}之间",80,100); //result:"金额必须在80至100之间"
            var args = Array.prototype.slice.call(arguments, 1);
            return str.replace(/\{(\d+)\}/g, function(m, i) {
                return args[i];
            });
        },

        /**
         * 转换成数字
         * @param {Object} n
         * @return {number}
         */
        toNumber: function(n) {
            n = new String(n);
            n = n.indexOf(".") > -1 ? parseFloat(n) : parseInt(n);
            return isNaN(n) ? 0 : n;
        },

        /**
         * 获取字符串的长度
         * @example getStrLen('a啊',true); //结果为3
         * @param {Object} str
         * @param {Object} realLength
         * @return {number}
         */
        getStrLen: function(str, realLength) {
            return realLength ? str.replace(/[^\x00-\xFF]/g, '**').length : str.length;
        },
		/**
         * 将日期 2011-6-27 10:22:30 格式 转为  Date 
         * @example stringToDate('2012-12-08 15:12:12'); //结果为
         * @param {Object} str
         * @return {date}
         */
		//
		stringToDate: function(DateStr) {
			 if(typeof DateStr=="undefined")
				 return new Date();
			 if(typeof DateStr=="date")
				 return DateStr;
			 var converted = Date.parse(DateStr);
			 var myDate = new Date(converted);
			 if(isNaN(myDate)){
				 DateStr=DateStr.replace(/:/g,"-");
				 DateStr=DateStr.replace(" ","-");
				 DateStr=DateStr.replace(".","-");
				 var arys= DateStr.split('-');
				 switch(arys.length){
				 	case 7 : 
					 	myDate = new Date(arys[0],--arys[1],arys[2],arys[3],arys[4],arys[5],arys[6]);
				        break;
				 	case 6 : 
					 	myDate = new Date(arys[0],--arys[1],arys[2],arys[3],arys[4],arys[5]);
					 	break;
					default: 
						myDate = new Date(arys[0],--arys[1],arys[2]);
						break;
				};
			 };
			 return myDate;
			},
			/**
	         * 格式化数字
	         * @example formatNumber(100.888,2); //结果为100.88
	         * @param {Object} str
	         * @return {date}
	         */
			
		formatNumber: function(srcStr,nAfterDot){
				var srcStr,nAfterDot;
				var resultStr,nTen;
				srcStr = ""+srcStr+"";
				strLen = srcStr.length;
				dotPos = srcStr.indexOf(".",0);
				if (dotPos == -1){
					resultStr = srcStr+".";
					for (i=0;i<nAfterDot;i++){
						resultStr = resultStr+"0";
					}
					return resultStr;
				}else{if ((strLen - dotPos - 1) >= nAfterDot){
						nAfter = dotPos + nAfterDot + 1;
						nTen =1;
						for(j=0;j<nAfterDot;j++){
						nTen = nTen*10;
						}
						resultStr = Math.ceil(parseFloat(srcStr)*nTen)/nTen;
						return resultStr;
					}else{
						resultStr = srcStr;
							for (i=0;i<(nAfterDot - strLen + dotPos + 1);i++){
							resultStr = resultStr+"0";
							}
						return resultStr;
					}
				}
		},
		
		/**
         * 表单验证
         * 
         */
        formValidate: function() {
            
			
        },
        /**
         * 简单的存储类
         */
        storage: function() {
            this.cache = {};
        }

    };
	S.augment(utils.formValidate, {

            /**
             * 验证身份证号
             * @param {Object} v
             */
            idCard: function(v) {
				var idReg = /^((11|12|13|14|15|21|22|23|31|32|33|34|35|36|37|41|42|43|44|45|46|50|51|52|53|54|61|62|63|64|65)[0-9]{4})(([1|2][0-9]{3}[0|1][0-9][0-3][0-9][0-9]{3}[X0-9])|([0-9]{2}[0|1][0-9][0-3][0-9][0-9]{3}))$/i;
				if ( !idReg.test( v ) ){
					return '请填写正确的身份证号';
				}
				return 'ok';
            },
			/**
             * 验证电子邮箱地址
             * @param {Object} v
             */
            email: function(v) {
				var emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
				if ( !emailReg.test( v ) ){
					return '请填写正确的电子邮箱地址';
				}
				return 'ok';
            },
			/**
             * 验证手机号码
             * @param {Object} v
             */
            mobile: function(v) {
				var telReg = /^0\d{2,4}-?\d{7,8}|1\d{10}$/;
				if ( !telReg.test( v ) ){
					return '请填写正确的手机号码';
				}
				return 'ok';
            },
			/**
             * 验证url
             * @param {Object} v
             */
            url: function(v) {
				var murl = v.match(/(?:http|https):\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/g);
				if ( murl == null || murl.length != 1 ) {
					return '请填写正确的url地址';
				}
				return 'ok';
            },
			/**
             * 折扣验证
             * @param {Object} v
             */
			checkDiscount : function(v){
				
				if(isNaN(Number(v)) || v <= 0 || v >=10){
					return '折扣范围在 0.00~9.99之间哦！';
				}else {
					var re = /(^[0-9]([.][0-9]{1,2})?$)|(^1[0-9]([.][0-9]{1,2})?$)|(^2[0-3]([.][0-9]{1,2})?$)|(^10([.]0{1,2})?$)/;
					if(!re.test(v)){
						return '折扣范围在 0.00~9.99之间哦！';
					}
				}
				return 'ok';
			},
			/**
             * 价格判断
             * @param {Object} v
             */
			checkPrice : function(v){
				if (isNaN(Number(v)) == true || v<=0) {
					error = true;
					return '价格是数字哦！';
				}
				return 'ok';
			}
			
    });
    S.augment(utils.storage, {

            /**
             * 增加对象
             * @param {Object} key
             * @param {Object} value
             * @param {Object} cover
             */
            add: function(key, value, cover) {
                var self = this, cache = self.cache;
                if (!cache[key] || (cache[key] && (cover == null || cover ))) {
                    cache[key] = value;
                }
            },

            /**
             * 移除对象
             * @param {Object} key
             */
            remove: function(key) {
                var self = this, cache = self.cache;
                if (cache[key]) {
                    delete cache[key]
                }
            },

            /**
             * 获取对象
             * @param {Object} key
             */
            get: function(key) {
                var self = this, cache = self.cache;
                return cache[key] ? cache[key] : null;
            },

            /**
             * 获取所有对象
             */
            getAll: function() {
                return this.cache;
            },

            /**
             * each
             * @param {Object} fun
             */
            each: function(fun) {
                var self = this, cache = self.cache;
                for (var item in cache) {
                    if (fun.call(self, item, cache[item]) === false)break;
                }
            }

        });

    return utils;

});