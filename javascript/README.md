## 代码结构原理 @by abing
	-common(公用函数集，组件集)
		|- package-config.js //包配置
		|- base.js //保留 H 命名空间 有 消息框 异步 倒计时 三种组件，页面可以直接 调用	  
				  //H.widget.msgBox()
				  //H.widget.asyncRequest()
				  //H.widget.countdown() 
		|- mian.js  //一些公共函数，头部·左菜单栏
	-docs(文档)
	-utils(组件集 ，工具集)
		|- analytics （链接 跟踪统计）
		|- randomBox （抽奖）	
		|- msgBox（消息框）
		|- roll （上下无缝滚动）
		|- showPages (分页)
		|- utils 基本验证（价格，时间，邮箱，等）
		|- share （分享插件）
		|- gallery (kissy组件)
	-Mcore （其他模块）
	...
[前台验证模块validator](https://github.com/chriso/node-validator)  
[图表控件highcharts](http://www.highcharts.com/)
 

## 需掌握知识点： 
-  [使用Kissy Pie快速构建](http://www.36ria.com/5536)
-  [kissy1.2最佳实践探索](http://www.36ria.com/5582) 
-  [kissy-kie](https://github.com/maxbbn/front-build) 


## 快速开发
1. 配置环境  
	>配置包，具体看package-config.js 的方法
	>
		<script src="http://a.tbcdn.cn/s/kissy/1.2.0/??kissy-min.js"> </script>
		<script src="路径/js/hlg/v3/common/package-config.js?t=20130505"></script>
		<script type="text/javascript">
		    window.config = {
		    		  oldpath: '路径/js/hlg/version-2',
		              path:'路径/js/hlg/v3',   // 基路径（模块路径寻址的基点）
		              version:'1.0',   // 源码目录名（fb的目录约定版本号目录即源码目录），也会拼入模块js路径中
		              debug: <?php echo empty($isMin)?'true':'false';?>,
		    		  name: '<?php echo 'M'.$ModuleNam;?>',
		    		  pub:window.PAGECONFIG.<?php echo 'M'.$ModuleNam;?> ? window.PAGECONFIG.<?php echo 'M'.$ModuleNam;?> : window.PAGECONFIG.pub  // 发布目录日期
		    }
		    FB.config(config);
		</script>
		<script src="路径/js/hlg/v3/common/base-min.js" type="text/javascript" ></script>

   
2. 创建模块&命名规则 
	> 模块名 : （大写 “M”开头） 根据后台定义,比如core模块,  包配置文件加入模块名 Mcore   
	> 入口名 ： 页面名称-init.js 比如首页 dashboard-init.js     
	> 返回对象名： 页面名称Control 比如首页 dashboardControl
	> 
		KISSY.add(function (S) {
			var S= KISSY,DOM = S.DOM, Event = S.Event;
			// your code here
			return  dashboardControl = {
					init : function(){ //初始化
					}
			}    
		}, {
			requires: [] //模块或者分解的业务逻辑模块
		}); 
	创建 -Mcore/1.0/page/dashboard-init.js   

3.  页面调用  
	>
		KISSY.ready(function(S) {
		    KISSY.use('page/dashboard-init',function(S,dashboardControl){
		    	dashboardControl.init()
		    })
    	}) 



##如何快速发布
1.  使用 kissy-kie 管理 代码语法检查，代码模块依赖，压缩，上线；
2.  ki add home/1.0  //创建一个Page或版本 
3.  ki build Mcore/1.0 -t 20121221 打包 发布 Mcore 模块
4.  ki build common //打包Common目录
5.  ***手动上传发布目录的代码到 ace 目录下***  
6.  ***修改配置文件模块的发布日期 并上传***  //比如 Mcore 改成 20121221  
>注意点： 一定要先将发布代码上传到ace 在更改上传配置文件，以免线上代码出现问题。

使用ANT 快速发布代码  
[ant 学习](http://book.36ria.com/ant/index.html)
## TODO: 

优化 ：
	


## 总结
 
