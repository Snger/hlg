## 教程
-  [使用Kissy Pie快速构建](http://www.36ria.com/5536)
-  [kissy1.2最佳实践探索](http://www.36ria.com/5582)
-  [CSS模块化打包工具CSS-Combo](http://www.36ria.com/5898)
## 结构图： 


- common(公用函数集，组件集)
   - 包配置 package-config.js 
	- base.js 保留 H 命名空间 有 消息框 异步 倒计时 三种组件，页面可以直接 调用
	```
	H.widget.msgBox()
	H.widget.asyncRequest()
	H.widget.countdown()
	```
	- mian.js  一些公共函数，头部·左菜单栏
- docs(文档)
   - [kissy-kie](https://github.com/maxbbn/front-build) 
   - HTML编码规范-CSS编码规范
   - JavaScript语言规范
   
- util(组件集 ，工具集)
   - analytics （链接 跟踪统计）
   - randomBox （抽奖）
   - roll （上下无缝滚动）
   - showPages (分页)
   - utils 基本验证（价格，时间，邮箱，等）
   -  [弹出框](http:jquerymsgbox.ibrahimkalyoncu.com/)
   - share （分享）
   - showPermissions 子账号权限控制 版本控制
   - gallery 组件
- 其他模块名(promo)

## 使用
模块名 根据 后台定义  比如 core 模块   包配置里 自动配置包名 Mcore （加了个M）
除了 base 引入的 三个组件外，其他需要的自己引入



## TODO: 

优化 ：
	1.input  输入限制 
	




## hlg
===

前端JavaScript 代码

![前端知识结构](https://raw.github.com/JacksonTian/fks/master/figures/fks.jpg)
## [前端开发知识结构](https://github.com/JacksonTian/fks)
   
- 技能知识
  - html5  [基础知识](http://bbs.ambow.com/zhuanti/html5/)
  - [HTML5 Cross Browser Polyfills  浏览器兼容](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-browser-Polyfills)
  - [CSS参考手册](http://css.doyoe.com/)
  - [raphaeljs](http://raphaeljs.com/icons/#github)
  - [CSS解决方案](http://www.w3cplus.com/resources/css-solution.html)
  - [练习css3](http://css3please.com/)
  - [Raphaël](http://raphaeljs.com/)
  - [前端开发常用API-chm版](http://www.w3cplus.com/resources/676.html)
 
