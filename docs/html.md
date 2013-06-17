## HTML规范

1.文件名后缀应统一是html，而不使用htm。

2.使用html5的规范<!DOCTYPE html>。

3.采用utf-8编码，文档中加入<meta charset="utf-8" />。

4.base可用场景：首页、频道等大部分链接都为新窗口打开的页面，如：<base target="_blank" />;

5.代码书写严格参照xhtml规范，标签必须全是小写，所有标签都要关闭，即有开始和结束标签，包括单个的标签<br/>等。

6.标签缩进统一为四个空格，使用Tab键需要设置软件的Tab键缩进4个空格，去除不必要的空格。

7.建议对超过10行的页面模块进行注释, 以降低开发人员的嵌套成本和后期的维护成本。

8.尽可能减少html标签的嵌套,提升DOM tree的渲染速度。

9.语义化标签，尽量使用html含样式标签替代div,span等无意义的标签，使用h1-h6作页面的标题，使用ul，ol，dl作列表。

10.标签的命名，多个单词使用中划线分隔，因为中划线会将长ID拆分为独立的单词，而下划线则将长ID显示成一个单词，中划线利于搜索引擎搜索。

11.属性全都使用小写，所有属性需要有属性值，属性值必须使用".."括起，没有属性值的应该像这样写：disabled = “disabled”。

12.通过给元素设置自定义属性来存放与JavaScript交互的数据, 属性名格式为data-xx，如：data-lazyload-url="url"。

13.h1用于表示当前页面最重要的内容的标题，一个页面只能出现一个h1标签。

14.em表示句意强调,加与不加会引起语义变化,可用于表示不同的心情或语调。

15.strong表示重要性强调,可用于局部或全局,strong强调的是重要性,不会改变句意。

16.书写a,img等地址时,必须避免重定向并忽略（Omit）协议，如：href="http://www.qq.com",应该书写为href="//www.qq.com/"。

17.多媒体标签保持向后兼容,记得加上alt属性,如果没有的话也要写上空的alt="",如:<img src="" alt="图片" />

18.给重要的元素和截断的元素加上title。

19.特殊符号尽可能使用html实体替代。如空格使用html实体&nbsp表示。

20.推荐使用fieldset,legend组织表单。

21.表单元素的name不能设定为action,enctype,method,novalidate,target,submit，否则会导致表单提交混乱。

22.必须为含有描述性表单元素input,textarea添加label,如:<label for="userName">userName:</label><input type="text" id="userName" />。

23.推荐使用 button 代替 input, 但必须声明 type。

24.仅在JavaScript代码中当作hook{钩子}用的id或class,命名规则为J_UpperCamelCase，注意：如果在JavaScript和CSS中都需要用到,则不用遵守本约定。

25.在自动化测试脚本中当作hook{钩子}用的id或class,命名规则为T_UpperCamelCase,其中字母T代表test。

26.不要使用标签的type属性！因为HTML5中已经规定为默认，
`如<style>...</style>，<script>...</script>,...。`

27.正常情况下，
```
<link rel="stylesheet" href="url.css" />必须放在<head>...</head>最后；
<script src="url.js"></script>必须放在<body>...</body>的最后。
```

28.引入JS库文件,文件名须包含库名称及版本号及是否为压缩版,比如jquery-1.8.1.min.js;引入插件文件,文件名格式为库名称+插件名称,比如jquery.cookie.js。

29.在用户代理不支持JavaScript的情况下使用<noscript>...</noscript>提供说明。
