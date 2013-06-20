## CSS最佳实践（or规范）：

1.命名:

- 1.1、采用通俗易懂的英文单词并按内容/功能命名;
 {常用命名英文：page、wrap、layout、header(head)、footer(foot、ft)、content(cont)、menu、nav、main、submain、sidebar(side)、logo、banner、        title(tit)、popo(pop)、icon、note、btn、txt、iblock、window(win)、tips等}。
- 1.2、一律采用小写中划线方式命名，如：widget-title，widget-bd ;
- 1.3、除布局、唯一独立模块外建议少用id，必须保证id唯一性;
- 1.4、尽可能提高代码模块的复用{外观和感觉可以通用，而位置不可以}，给模块进行命名空间，如：.widget{...};.widget-title{...};.widget-bd{...};
- 1.5、为了保证性能，请避免元素选择器和类选择器以及id选择器混用;例如ul#nav{}；div.error{}；

2.CSS书写：

- 2.1、顺序：
<1>显示属性： display | position| z-index  | list-style|float | clear | overflow | zoom| cursor | ... ；
  <2>盒模型：margin | padding | width | height | border ；
  <3>文本属性:vertical-align | white-space | text-decoration | text-align | color | font | content | ... ;
  <4>背景：background ；

- 2.2、属性能缩写的尽量缩写，如margin、padding、font{font-style font-variant font-weight font-size/line-height font-family}、border{border-width   border-style border-color}、background(background-color background-image background-repeat background-attachment background-position)等。

- 2.3、a标签伪类书写要严格按照a:link，a:visited，a:hover，a:active的顺序,否则在某些浏览器中会失效。

3.编码：

- 3.1、采用utf-8编码。在样式文件的第一行加入：@charset "utf-8";
- 3.2、为了防止文件合并及编码转换时造成问题，建议将样式中文字体名字改成对应的英文名字，如：黑体(SimHei) 宋体(SimSun) 微软雅黑(Microsoft Yahei，几个单词中间有空格组成的必须加引号)。

4.重置：

- 4.1、重置标签的默认样式,获得跨浏览器一致的效果，如：body,h1-h6,p,ul,ol,li,dl,dt,dd,...{margin:0;padding:0}。
- 4.2、body元素一定要设置background-color,避免用户修改默认值后引起兼容性问题，如：background-color:"#ffffff"。
- 4.3、如果字体大小要使用em，可以设定body{font-size:62.5%}，这就等于把基准大小从16像素改为10像素（16×62.5%=10）,如：1em等于10像素，1.5em等于15像素；
- 4.3、推荐根据Eric Meyer's reset.css 或 YUI's reset.css进行扩展。

5.布局：

- 5.1、减少使用影响性能的属性, 比如position:absolute || float ;
- 5.2、浮动非图片元素时，必须给它设定宽度，否则后果难以预料;图片无所谓，因为它本身有默认的宽度 ;
- 5.3、{overflow:hidden}的2个作用:<1>.防止包含元素被超大内容撑大;<2>.可靠地迫使父元素包含其浮动的子元素 ;
- 5.4、z-index必须清晰明确，页面弹窗为最顶层{取值范围900~999,如showWin、pop等};气泡为中间层级{取值范围100~899};普通区块为最底层{取值范围为1~99} ;
- 5.5、应该给所有栏的外包装元素应用word-wrap:break-word声明，以便所有栏及其内容继承这个设定,以解决潜在换行的问题 ;

6.图片：

- 6.1、命名全部用小写英文字母、数字、_的组合，命名分头尾两部分,用下划线隔开,如:ad_banner.jpg, btn_submit.png ;
- 6.2、图片格式仅限于 gif || png || jpg ;
- 6.3、在保证视觉效果的情况下选择最小的图片格式与图片质量, 以减少加载时间{PS中保存图片一定要使用"文件--存储为Web所有格式..."或者快捷键Alt+Shift+Ctrl+S} ;
- 6.4、用png格式的图片时,要求图片格式为png-8格式,若png-8实在影响图片质量或其中有半透明效果, 请为ie6单独定义背景图片 ;
- 6.5、背景图片请尽可能使用sprite技术{按模块制作},减小http请求，{注意,请务必备份你的sprite psd源文件} ;
- 6.6、所有页面元素类图片均放入img文件夹,测试用图片放于img/demo/文件夹中 ;


7.0后面不要加上单位;小数前不要加上0 。

8.字体粗细采用具体数值,粗体bold写为700,正常normal写为400 。

9.设置颜色时统一使用十六进制的颜色单位,使用color:#ff0000替代color:red 。

10.能不用时尽量不用CSS Hack,出现兼容性问题时，首先检查自己的代码是符合标准 。

11.除了CSS Hack和浏览器私有属性,推荐使用w3c css validator 或 csslint 校验代码 。
