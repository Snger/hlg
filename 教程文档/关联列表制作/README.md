## 什么是列表模板？
- 将750、790、950、990四种规格的列表配置成后台可识别、有规则的代码。</br>
- 优点：提高了工作效率，缩短代码的冗余，使代码简洁明了。


## 模板的组成部分
 - 1 .**海报头**     
 >注意：如果列表有海报时，写入如下代码，反之省略不写。     
  
	<tr>
        <td align="left" colspan="跨行数">
           <div id="J_DesignDiv_海报id" newId="海报id" class="J_DesignDiv"></div>
        </td>
    </tr>  

  - 2 、 **宝贝块**  

>注意：  
  (1) **#main_blocks#**：代表列表结构中存放所有宝贝区域块  
  (2) **#child_blocks#**: 该区域代表存放列表单个宝贝的区域块<br/>
  (3)  规则列表中，各个宝贝用**#el#**分隔开，代码一个完整的宝贝块，不规则使用**#feature_el#**
  (4) **宝贝块：**为列表中属于一个宝贝的内容代码段，而判断该代码是否是宝贝块，可通过测试该代码是否可以代替该列表中的其余宝贝项的内容。如下示例所示：

	<!--第一行宝贝块-->
		<table>
			<tr>
			<td align="center">
				<!--列表主要区域块开始-->
				#main_blocks#
				<!--列表主要区域块结束-->
			</td>
			</tr>
		</table>
		#el#
		<!--one_line start-->
		<table>
			<tr> 
			<!--单个宝贝块开始-->
			#child_blocks#  
			<!--单个宝贝块结束-->
			</tr>
		</table>
	<!--宝贝块结束-->
  	#el#
    
<<<<<<< HEAD
- 3 、 **预留宝贝块**
>作用：预留宝贝块，是为了防止列表操作时，实际选择宝贝数与列表要求宝贝数不一致，</br>导致列表显示不正常，则在配置列表最后需要加上预留宝贝块代码。如下代码：   
>  
	<td align="center">   
		<table width="宝贝宽度" cellspacing="0" cellpadding="0" border="0">
       </table>
	</td>   
=======
- 3 、 **预留宝贝块**   
>作用：预留宝贝块，是为了防止列表操作时，实际选择宝贝数与列表要求宝贝数不一致，</br>导致列表显示不正常，则在配置列表最后需要加上预留宝贝块代码。如下代码：
>
     <td align="center">
            <table width="宝贝宽度" cellspacing="0" cellpadding="0" border="0">
           </table>
      </td>   
>>>>>>> 8aab7d618fab4cd789e0db779bd5dcf10fb80902

## 模板原型样例
	规则的模板
	<div style="width:模板宽度;" class="liebiao-templet">
		<table width="模板宽度;" cellspacing="0" cellpadding="0" border="0" >
			<tr>
		        <td align="left" colspan="跨行数">
		           <!--DESIGN-BEGIN--><div id="J_DesignDiv_海报id" newId="海报id" class="J_DesignDiv"></div><!--DESIGN-END-->
		        </td>
	    	</tr>
			<tr>
	        	<td>
	            	<table>
	                	#main_blocks#  
	                </table>
	            </td>
        	</tr>
		</table>
	</div>
	#el#
	<tr>
		#child_blocks#                  
	</tr>
	#el# //具体宝贝
	<td width="246"  align="center" style="padding:3px 0px;">
		<div style="padding:2px; width:242px; overflow:hidden; ">
			<table cellspacing="0" cellpadding="0" border="0">
	        	#pic_url#
	 			标题：  #title#
    		 	原价：  #price#
	        </table>
		</div>
	</td>
	#el#   //预留宝贝块
	<td width="246"  align="center" style="padding:3px 0px;">
		<div style="padding:2px; width:242px; overflow:hidden; ">
	   		<table cellspacing="0" cellpadding="0" border="0">
	         </table>
		</div>
	</td>
	#el#
	不规则的模板
	<div class="liebiao-templet" style="width:750px;">
		#main_blocks#
	</div>
	#el#
	<table cellpadding="0" cellspacing="0" border="0" width="750" style="font-size:12px;background-color:#FFFFFF;">
	        <tr>
	        <td colspan="4" align="left" style="padding:0 0 9px;">
	            <!--DESIGN-BEGIN--><div id="J_DesignDiv_1995072" newId="1995072" class="J_DesignDiv"></div><!--DESIGN-END-->
	        </td>
	    </tr>
	    <tr>
			#child_blocks# 
	    </tr>
	</table>
	#el#
		<td>宝贝1</td>
       #feature_el#
            <td align="center">
            	<table  height="460" cellpadding="0" cellspacing="0" border="0">
                	<tr>
					 	<td style="padding:1px 1px;">	
            			宝贝2
           				 </td> 
						#feature_el#
			             <td style="padding:1px 1px;">		
			                 宝贝3           
			             </td> 
						#feature_el#
	                    </tr>
	                    <tr>
	         				<td style="padding:1px 1px;">宝贝4</td> 
						#feature_el#
			 				<td style="padding:1px 1px;">宝贝5</td> 
						#feature_el#
					   <td>宝贝6</td> 
				    </tr>
				</table>
		   </td>
	#el#


## 列表如何配置？

 ![步骤1](https://raw.github.com/xiaoz/hlg/master/%E6%95%99%E7%A8%8B%E6%96%87%E6%A1%A3/%E5%85%B3%E8%81%94%E5%88%97%E8%A1%A8%E5%88%B6%E4%BD%9C/images/%E5%88%97%E8%A1%A8%E9%85%8D%E7%BD%AE%E6%AD%A5%E9%AA%A41.png)
 ![步骤2](https://raw.github.com/xiaoz/hlg/master/%E6%95%99%E7%A8%8B%E6%96%87%E6%A1%A3/%E5%85%B3%E8%81%94%E5%88%97%E8%A1%A8%E5%88%B6%E4%BD%9C/images/%E5%88%97%E8%A1%A8%E9%85%8D%E7%BD%AE%E6%AD%A5%E9%AA%A42.png)
 ![步骤3](https://raw.github.com/xiaoz/hlg/master/%E6%95%99%E7%A8%8B%E6%96%87%E6%A1%A3/%E5%85%B3%E8%81%94%E5%88%97%E8%A1%A8%E5%88%B6%E4%BD%9C/images/%E5%88%97%E8%A1%A8%E9%85%8D%E7%BD%AE%E6%AD%A5%E9%AA%A43.png)
 ![步骤4](https://raw.github.com/xiaoz/hlg/master/%E6%95%99%E7%A8%8B%E6%96%87%E6%A1%A3/%E5%85%B3%E8%81%94%E5%88%97%E8%A1%A8%E5%88%B6%E4%BD%9C/images/%E5%88%97%E8%A1%A8%E9%85%8D%E7%BD%AE%E6%AD%A5%E9%AA%A44.png)





## 列表配置支持参数

 1.宝贝块：
   
   > 
     原价文案：  #ori_price_writer#
	 特价文案：  #cur_price_writer#
	 独立小标签：#tiny_labels#
	 预留参数1： #item_param1# （保留输入框让用户输入）： 
	 预留参数2： #item_param2#
	 预留参数3： #item_param3#
     宝贝ID：#id#
	 图片：  #pic_url#
	 标题：  #title#
     原价：  #price#
	 特价：  #spec_price#
	 特价a： #spec_price_a#   （100.50中的11）
	 特价b： #spec_price_b#   （100.50中的50）
	 节省的钱：#save#
	 折扣：  #discount#
    
  2.列表块：
   >
      更多链接：#more_link#
	  品质图片：#quality_pics#
	  关键字：  #keywords#
	  预留参数1： #list_param1# < （保留输入框让用户输入）：
	  预留参数2： #list_param2#
	  预留参数3： #list_param3#
	  预留参数4： #list_param4#
      预留参数5： #list_param5# < （保留输入框让用户输入）：
	  预留参数6： #list_param6#
	  预留参数7： #list_param7#
	  预留参数8： #list_param8#
	 


 3.评价块内容：
   >  
      买家昵称：#buyer_nick#
	  买家级别：#buyer_level_pic#
	  评价内容：#content#
	  评价时间：#rate_created#
	  销量：  #sales_num_pic#
	  好评数：#rates_num_pic#
      卖家昵称： #nick#
	  卖家店铺ID：#tbShopId# 

 4.颜色：

- 列表中如果有多种需要能自定义颜色时，可以在列表对应颜色值中用#colorN#来表示，<br/>从0开始逐一增加N代码第几种自定义颜色标识，通过配置可以分别改变N值对应下的颜<br/>色的自由选择。
   > 
      如：666666_E4E4E4_BB0000 
	    666666 -> #color0#    
	    E4E4E4 -> #color1#   
	    BB0000 -> #color2#
	    图片如：http://asfasf.#colorN#.jpg

 5.每行宝贝数：<br/>

- 如下实例中，950代表列表规格大小，350为宝贝实际宽度，310为宝贝图片大小，2为每行宝贝的数目，多个规格之间用#分隔
  >
    如：950_350_310_2
	    350 -> #item_width#
	    310 -> #pic_width#
	    注：_b.jpg的图片需要替换成 #pic_url#_#pic_width#x#pic_width#.
	
 6.分享
   
   >
    店铺地址 http://shop#tbShopId#.taobao.com/
    按销量   http://shop#tbShopId#.taobao.com/search.htm?orderType=_hotsell
    按人气   http://shop#tbShopId#.taobao.com/search.htm?orderType=_coefp
    按价格   http://shop#tbShopId#.taobao.com/search.htm?orderType=_price
    按收藏   http://shop#tbShopId#.taobao.com/search.htm?orderType=_hotkeep
    按新品   http://shop#tbShopId#.taobao.com/search.htm?orderType=newOn
    收藏     http://favorite.taobao.com/popup/add_collection.htm?id=#tbShopId#&itemtype=0
    所有宝贝 http://shop#tbShopId#.taobao.com/search.htm
    宝贝地址：http://item.taobao.com/item.htm?id=#id#  

 7.海报

- newId:为海报制作时获取的海报id值
> 
	<!--DESIGN-BEGIN-->
	<div id="J_DesignDiv_海报id值" newId="海报id值" class="J_DesignDiv">
	</div>
   <!--DESIGN-END--> 
	
 
 
## 列表配置地址

     制作 material/option/index 
     上传 material/option/add 
     
## 列表图片上传地址
 
   - 文件名：文件名要与列表配置时，获取的id值来命名</br>
   >
    hlg/www/img/list/文件名

	

## 列表制作注意事项：
 （1） 如果列表需要用到图片，比如按钮、标签等，制作时一定要将图片，写在tb标签中,否则列表正确制作后，将不能在详情页正常显示出所引用的图片。  

（2）列表制作完成后，一定要在火狐、谷歌、360、ie中测试是否正常后，才可共享制作的列表。  
 （3） 列表制作时，有宝贝参数和列表参数，宝贝参数注意是针对宝贝相关参数的设定，比如宝贝销量数量、宝贝按钮上的文字，而列表参数常用来表示一个列表的标题文字等。  
（4）在配置列表时，需要预留一块宝贝块代码，防止列表不能正常显示。  
（5）列表制作需要与效果图保持一致，针对不可实现效果，开发中可与设计者沟通。  
（6）图片切图，保存图片时，图片的名字要用图片的颜色来命名，方便后面颜色参数表示。



 
