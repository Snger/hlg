## css结构
	-common(公用css)
		|- fonts //存放字体文件 因为icomoon 在Firefox不支持跨域引用所以引用的是相对路径，不要随意移动该目录
		|- base.css //包括reset 按钮 字体颜色 输入框
		|- font.css //icomoon web字体图标样式
	-layout(整体布局结构)
			|- mods
				|- global.css //	main里面部分结构公共样式
				|- left.css //菜单样式
				|- header.css //头部样式
				|- footer.css //尾部样式
		|- layout.css  //布局入口文件
	-utils(常用的模块样式集，已做好兼容)
		|- ui-list.css //列表展示
		|- ui-edit.css //创建，编辑	
		|- ...
	-region(模块范围，入口文件)
		|- promotion.css //促销
		|- crm.css //会员
		|- tool.css //工具
		|- ...
	-Mcare(根据对应的页面建立模块样式文件)
			|- mods
				|- public.css //该模块下面用到的公用样式
				|- list.css //	也是对应页面文件命名，
				|- add.css 
				|- ...
		|- care.css  //入口文件，Mcare里面所有的文件都在这里引用: @import 'mods/public.css';
	...

## 使用条件注释判断浏览器
	<!DOCTYPE html>
	<!--[if lt ie 7]>
	<html class="no-js ie ie6 lte9 lte8 lte7">
	<![endif]-->
	<!--[if ie 7]>
	<html class="no-js ie ie7 lte9 lte8 lte7"> 
	<![endif]-->
	<!--[if ie 8]>
	<html class="no-js ie ie8 lte9 lte8"> 
	<![endif]-->
	<!--[if ie 9]>
	<html class="no-js ie ie9 lte9"> 
	<![endif]-->
	<!--[if !IE]><!-->
	<html> 
	<!--<![endif]-->
	<head>
	
	</head>

1.使用条件注释判断浏览器对浏览器写样式，不再写css hack 如：

	.ui-list ul li:after{ 
		content:'\20'; 
		display:block; 
		height:0; 
		clear:both; 
		visibility:hidden;
	}

	html.lte8 .ui-list ul li{ 
		zoom:1;
	}

注意点：对特定的浏览器写样式必须写在后面，如上

## html整体结构

	<div class="hlg-app">
 
		<!-- header start -->
		<header class="header">头部</header>
		<!-- header end -->
		
		<!-- content start -->
		<div class="main">
			<menu class="menu">菜单</menu>
			<div class="content">内容</div>
		</div>
		<!-- content end -->
		
		<!-- footer end -->
		<footer class="footer"></footer>
		<!-- footer end --> 
	 
	</div>	

## html content结构
	<section class="ui-tab">
		<menu class="ui-tab-list">
			<li class="current"><a href="#">列表页</a></li>
		</menu>
		<div class="action-btn">
			<input class="btm-caozuo-orange" type="button" value="创建"/>
		</div>
	</section>
	
	<section class="spacing"> //spacing 有间距，不需间距可去掉class="spacing"
		...自由布局你的代码，页面上很多相同的布局结构都已经有写可直接复制html粘贴，用到utils样式直接引用，如设计效果跟utils、全局样式文件 中的样式有部分区别，可定义一个新的class将其重置，尽量不要去修改utils 、全局样式文件中的样式
	</section>

## 需掌握知识点： 
-  [CSS模块化打包工具CSS-Combo](http://www.36ria.com/5898)
-  [316 Icomoon Icon UI](http://www.w3cplus.com/demo/icomoon-icon-ui.html)

## 快速开发
1. 模块引用 

	###例：	

		@charset "utf-8";
	 	/** 欢乐逛促销入口样式文件promotion.css **/

		/*页面基础样式*/
		@import '../common/base.css';
		
		/*页面布局样式*/
		@import '../layout/layout.css';
		 
		/*页面utils样式*/
		@import '../utils/ui-list.css';  /*列表*/
		@import '../utils/ui-edit.css';  /*编辑*/
		@import '../utils/ui-page.css'; /*分页*/
		@import '../utils/ui-calendar.css';  /*日历*/
		@import '../utils/ui-step.css';  /*步骤条*/
		@import '../utils/ui-tab.css';  /*tab*/
		@import '../utils/ui-return.css';  /*返回*/

		-------注意点：utils 必须在子模块之前引用 因为子模块中可能需要重置-----------
		
		/*促销活动样式promo.css*/
		@import '../Mpromo/promo.css';
		
		/*促销道具样式promoprops.css*/
		@import '../Mpromoprops/promoprops.css';
		
		/*促销图标样式icon.css*/
		@import '../Micon/icon.css';
		
		/*促销展示样式promodesc.css*/
		@import '../Mpromodesc/promodesc.css';
		
		/*店铺模块样式smart.css*/
		@import '../Msmart/smart.css';

2. 创建模块&命名规则

	模块名 : （大写 “M”开头） 取页面命名,比如core模块, css文件加入模块名 Mcore 
	
	模块里面的目录跟目录里面的文件跟页面相同也取页面名为命名


##如何快速发布

1.  使用 CSS-Combo 管理模块，打包压缩，上线；
2.  到入口文件目录 csscombo -x promotion.css promotion-min.css 打包 压缩模块为promotion-min.css
3.  ***手动上传发布目录的样式表到 ace 目录下*** 
4.  使用ant 一键 压缩 上传 

## 优点，缺点

-  优点：可以解决页面上乱插入样式的问题，容易对单独某一块的样式管理，修改 删除
  
-  缺点：文件多，测试环境增加了http请求
 
-  [优点缺点这里都有](http://www.36ria.com/5898)

## 总结