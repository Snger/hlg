KISSY.add("utils/showPages/index",function(a){function e(a){var b=this;if(!(b instanceof e))return new e(a);this.pageNum=4,this.name=a,this.page=1,this.pageCount=200,this.argName="page"}var b=a.DOM,c=a.Event,d=document;return a.mix(e.prototype,{jump:function(){return undefined},checkPages:function(){isNaN(parseInt(this.page))&&(this.page=1),isNaN(parseInt(this.pageCount))&&(this.pageCount=1),this.page<1&&(this.page=1),this.pageCount<1&&(this.pageCount=1),this.page>this.pageCount&&(this.page=this.pageCount),this.page=parseInt(this.page),this.pageCount=parseInt(this.pageCount)},_createHtml:function(a){var b=this,c="",d=this.page-1,e=this.page+1;if(a==""||typeof a=="undefined")a=1;switch(a){case 1:c+='<span class="number">',this.page!=1&&(c+='<span title="Page 1"><a href="javascript:'+b.name+'.toPage(1);">1</a></span>'),this.page>=5&&(c+="<span>...</span>");if(this.pageCount>this.page+2)var f=this.page+2;else var f=this.pageCount;for(var g=this.page-2;g<=f;g++)g>0&&(g==this.page?c+='<span title="Page '+g+'">'+g+"</span>":g!=1&&g!=this.pageCount&&(c+='<span title="Page '+g+'"><a href="javascript:'+b.name+".toPage("+g+');">'+g+"</a></span>"));this.page+3<this.pageCount&&(c+="<span>...</span>"),this.page!=this.pageCount&&(c+='<span title="Page '+this.pageCount+'"><a href="javascript:'+b.name+".toPage("+this.pageCount+');">'+this.pageCount+"</a></span>"),c+="</span><br />";break;case 2:if(this.pageCount>1){c+='<div class="page-bottom"> <div class="sabrosus">',d<1?c+='<span class="pre-none page-pic-no"></span>':c+='<a class="" href="javascript:'+b.name+".toPage("+d+');" title="\u4e0a\u4e00\u9875"><span class="pre page-pic-no"></span></a>',this.page==1;if(this.page-2<=0){var h=1;if(this.pageCount>this.page+4)var f=this.page+4;else var f=this.pageCount}else if(this.page+2>=this.pageCount){var h=this.pageCount-4;if(this.pageCount>this.page+4)var f=this.page+4;else var f=this.pageCount}else{var h=this.page-2;if(this.pageCount>this.page+2)var f=this.page+2;else var f=this.pageCount}for(var g=h;g<=f;g++)g>0&&(g==this.page?c+='<span class="current a-padding">'+g+"</span>":c+='<a class="a-padding" href="javascript:'+b.name+".toPage("+g+');">'+g+"</a>");this.page+5<this.pageCount&&(c+='<a class="a-padding" title="" href="javascript:'+b.name+".toPage("+(this.page+3)+');">...</a>'),this.page==this.pageCount,e>this.pageCount?c+='<span class="next-none page-pic-no"></span>':c+='<a class="" href="javascript:'+b.name+".toPage("+e+');" title="\u4e0b\u4e00\u9875"><span class="next page-pic-no"></span></a>',this.pageCount>5&&(c+='<font class="number">',c+="\u5171"+this.pageCount+"\u9875&nbsp;\u5230\u7b2c&nbsp;",this.page>=this.pageCount?c+='<input style="" type="text" class="page-pic-no w-30 bg-img" id="pageInput'+b.name+'"  value="'+this.pageCount+'" onkeypress="return window.'+b.name+'.formatInputPage(event);" onfocus="this.select()">&nbsp;\u9875':c+='<input style="" type="text" class="page-pic-no w-30 bg-img" id="pageInput'+b.name+'"  value="'+(this.page+1)+'" onkeypress="return window.'+b.name+'.formatInputPage(event);" onfocus="this.select()">&nbsp;\u9875',c+='<input type="button" value="" class="page-pic-no gray-btm-h-go w-30 btm-go" onclick="javascript:var page = document.getElementById(\'pageInput'+b.name+"').value; if(isNaN(Number(page))|| Number(page)==0) { var turnTo = 1;} else if(page>"+this.pageCount+"){ var turnTo = "+this.pageCount+";} else{var turnTo = page;}  window."+b.name+'.toPage(turnTo);">',c+="</font>"),c+='<div style="clear:both"></div></div></div> '}break;case 3:c+='<div class="page-top"><div class="sabrosus"><span class="count">'+this.page+" / "+this.pageCount+"</span>",d<1?c+=' <span class="pre-none page-pic-no"></span>':c+='<a class="border-left-dedede" href="javascript:'+b.name+".toPage("+d+');" title="\u4e0a\u4e00\u9875"><span class="pre page-pic-no"></span></a>',e>this.pageCount?c+='<span class="next-none page-pic-no"></span>':c+='<a href="javascript:'+b.name+".toPage("+e+');" title="\u4e0b\u4e00\u9875"><span class="next page-pic-no"></span></a>',c+='<div style="clear:both"></div></div></div>'}return c},formatInputPage:function(a){var b=navigator.appName=="Microsoft Internet Explorer"?!0:!1;if(!b)var c=a.which;else var c=event.keyCode;return c==8||c==46||c>=48&&c<=57?!0:!1},toPage:function(a,b){var c=1,d=this;typeof a=="object"?c=a.options[a.selectedIndex].value:c=a,d.jump(c,b,"")},printHtml:function(a,c){return this.checkPages(),b.html(a,this._createHtml(c)),this},setPageCount:function(a){return this.pageCount=a,this},getPageCount:function(){return this.pageCount},setRender:function(a){return this.jump=a,this},setPageNum:function(a){return this.pageNum=a,this},setPage:function(a){return this.page=a,this}}),e}),KISSY.add("page/item-init",function(S,showPages){var DOM=S.DOM,Event=S.Event;return PromopropsItem={panel:null,msg:null,paginator:null,promotionItemPaginator:null,init:function(){Event.delegate(document,"click",".J_Editor_Promo",function(a){if(!showPermissions("editor_promoprops","\u4fc3\u9500\u9053\u5177"))return;var b=DOM.attr(a.currentTarget,"data"),c=IsExpired();if(c>-5e3){var d=function(a){window.location.href=b},e=function(a){KISSY.Event.fire(".J_TopExpired","click")},f="";(new H.widget.asyncRequest).setURI(isExpiredUrl).setMethod("GET").setHandle(d).setErrorHandle(e).setData(f).send()}else window.location.href=b}),Event.delegate(document,"click",".J_AddToPromo",function(a){var b=DOM.attr(a.currentTarget,"data"),c=function(a){DOM.val("#J_TotalPromoItems",a.payload);if(a.payload>=150)new H.widget.msgBox({title:"\u6e29\u99a8\u63d0\u793a",content:"\u975e\u5168\u5e97\u7c7b\u578b\u9053\u5177\u5361\u5b9d\u8d1d\u6570\u91cf\u4e0d\u80fd\u5927\u4e8e150\u4e2a\uff0c\u73b0\u5728\u5df2\u7ecf\u52a0\u5165"+a.payload+"\u8bf7\u5220\u9664\u591a\u4f59\u7684\u5b9d\u8d1d.",type:"info"});else{var c=IsExpired();if(c>-5e3){var d=function(a){b=="1"&&PromopropsItem.addSelectItemsToPromotion()},e=function(a){KISSY.Event.fire(".J_TopExpired","click")},f="";(new H.widget.asyncRequest).setURI(isExpiredUrl).setMethod("GET").setHandle(d).setErrorHandle(e).setData(f).send()}else b=="1"&&PromopropsItem.addSelectItemsToPromotion()}},d=function(a){new H.widget.msgBox({title:"\u9519\u8bef\u63d0\u793a",content:a.desc,type:"error"})},e="promo_id="+pid;(new H.widget.asyncRequest).setURI(getPromoItemNumUrl).setMethod("GET").setHandle(c).setErrorHandle(d).setData(e).send()}),Event.on("#J_TopCheckAll","click",PromopropsItem.checkAll),Event.on("#J_RightSearchBtn","click",PromopropsItem.loadPromotionItems),Event.on("#J_RightCheckAll","click",PromopropsItem.rightCheckAll),Event.on("#J_BatchAddBtn","click",PromopropsItem.batchAddItems),Event.on("#J_RemovePromotionItems","click",PromopropsItem.removePromotionItemHandle)},searchTbItems:function(a){var b=function(a){DOM.removeClass(".J_ItemSelectBtnHolder","ks-hidden"),DOM.get("#J_NoteIcon").style.display="none",totalRecords=a.payload.totalRecords,totalRecords>0?(DOM.get("#J_LEmpty").style.display="none",DOM.css(DOM.query(".J_ItemSelectBtnHolder"),"display","")):(DOM.get("#J_LEmpty").style.display="",DOM.css(DOM.query(".J_ItemSelectBtnHolder"),"display","none")),DOM.html(DOM.get("#J_TbItemList"),a.payload.body,!0);var b=DOM.query("#J_TbItemList .J_TbItem");Event.on(b,"mouseenter mouseleave click",function(a){var b=DOM.get(".J_CheckBox",a.currentTarget);if(b.disabled)return;a.type=="mouseenter"?DOM.addClass(a.currentTarget,"mouseover"):a.type=="mouseleave"?DOM.removeClass(a.currentTarget,"mouseover"):a.type=="click"&&(b.checked==0?(DOM.addClass(a.currentTarget,"selected"),b.checked=!0):(DOM.removeClass(a.currentTarget,"selected"),DOM.attr("#J_TopCheckAll","checked",!1),b.checked=!1))}),Event.on(DOM.query("#J_TbItemList .J_CheckBox"),"click",function(a){a.stopPropagation();var b=a.currentTarget.value;a.currentTarget.checked==1?DOM.addClass("#J_TbItem_"+b,"selected"):DOM.removeClass("#J_TbItem_"+b,"selected")}),pageCount=Math.ceil(totalRecords/a.payload.pageNum),PromopropsItem.paginator=(new showPages("PromopropsItem.paginator")).setRender(PromopropsItem.handlePagination).setPageCount(pageCount).printHtml("#J_Paging",2),PromopropsItem.paginator.printHtml("#J_TopPaging",3),DOM.hide("#J_LeftLoading"),DOM.show("#J_MainLeftContent")},c=function(a){DOM.hide("#J_LeftLoading"),DOM.show("#J_MainLeftContent"),new H.widget.msgBox({title:"\u9519\u8bef\u63d0\u793a",content:a.desc,type:"error"})};if(DOM.val(DOM.get("#J_SearchTitle"))!="\u5173\u952e\u5b57\u3001\u5546\u54c1\u94fe\u63a5\u3001\u5546\u54c1\u7f16\u7801")var d=encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle")));else var d="";var e=DOM.val(DOM.get("#J_SelectItemPage")),f=DOM.val(DOM.get("#J_SelectItemCid")),g=DOM.val(DOM.get("#J_SearchSelling")),h=DOM.val(DOM.get("#J_SelectItemOrder")),i="q="+d+"&cid="+f+"&type="+g;i+="&itemOrder="+h+"&pageSize="+e,i+="&pid="+pid;if(g==0){var j=DOM.val(DOM.get("#J_StartPrice")),k=DOM.val(DOM.get("#J_EndPrice"));i+="&start_price="+j+"&end_price="+k}DOM.show("#J_LeftLoading"),DOM.hide("#J_MainLeftContent"),(new H.widget.asyncRequest).setURI(getItemsFromTbUrl).setMethod("GET").setHandle(b).setErrorHandle(c).setData(i).setDataType("json").send()},checkAll:function(a){checkBoxs=DOM.query("#J_TbItemList .J_CheckBox"),len=checkBoxs.length;for(i=0;i<len;i++){var b=checkBoxs[i].value;if(checkBoxs[i].disabled)continue;this.checked?(checkBoxs[i].checked=!0,DOM.addClass("#J_TbItem_"+b,"selected")):(checkBoxs[i].checked=!1,DOM.removeClass("#J_TbItem_"+b,"selected"))}},handlePagination:function(a){pageId=a;var b=function(a){totalRecords=a.payload.totalRecords,DOM.attr("#J_TopCheckAll","checked",!1),totalRecords>0?(DOM.get("#J_LEmpty").style.display="none",DOM.css(DOM.query(".J_ItemSelectBtnHolder"),"display","")):(DOM.get("#J_LEmpty").style.display="",DOM.css(DOM.query(".J_ItemSelectBtnHolder"),"display","none")),pageCount=Math.ceil(totalRecords/a.payload.pageNum),PromopropsItem.paginator.setPage(pageId).setPageCount(pageCount).printHtml("#J_Paging",2),PromopropsItem.paginator.setPage(pageId).setPageCount(pageCount).printHtml("#J_TopPaging",3),DOM.html(DOM.get("#J_TbItemList"),a.payload.body,!0);var b=DOM.query("#J_TbItemList .J_TbItem");Event.on(b,"mouseenter mouseleave click",function(a){var b=DOM.get(".J_CheckBox",a.currentTarget);if(b.disabled)return;a.type=="mouseenter"?DOM.addClass(a.currentTarget,"mouseover"):a.type=="mouseleave"?DOM.removeClass(a.currentTarget,"mouseover"):a.type=="click"&&(b.checked==0?(DOM.addClass(a.currentTarget,"selected"),b.checked=!0):(DOM.removeClass(a.currentTarget,"selected"),DOM.attr("#J_TopCheckAll","checked",!1),b.checked=!1))}),Event.on(DOM.query("#J_TbItemList .J_CheckBox"),"click",function(a){a.stopPropagation();var b=a.currentTarget.value;a.currentTarget.checked==1?DOM.addClass("#J_TbItem_"+b,"selected"):DOM.removeClass("#J_TbItem_"+b,"selected")}),DOM.hide("#J_LeftLoading"),DOM.show("#J_MainLeftContent")};if(DOM.val(DOM.get("#J_SearchTitle"))!="\u5173\u952e\u5b57\u3001\u5546\u54c1\u94fe\u63a5\u3001\u5546\u54c1\u7f16\u7801")var c=encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle")));else var c="";var d=DOM.val(DOM.get("#J_SelectItemPage")),e=DOM.val(DOM.get("#J_SelectItemCid")),f=DOM.val(DOM.get("#J_SearchSelling")),g=DOM.val(DOM.get("#J_SelectItemOrder")),h="q="+c+"&cid="+e+"&type="+f;h+="&itemOrder="+g+"&pageSize="+d,h+="&pid="+pid+"&page_id="+pageId;if(f==0){var i=DOM.val(DOM.get("#J_StartPrice")),j=DOM.val(DOM.get("#J_EndPrice"));h+="&start_price="+i+"&end_price="+j}DOM.show("#J_LeftLoading"),DOM.hide("#J_MainLeftContent"),(new H.widget.asyncRequest).setURI(getItemsFromTbUrl).setMethod("GET").setHandle(b).setData(h).send()},addSelectItemsToPromotion:function(iid){if(!showPermissions("editor_promoprops","\u4fc3\u9500\u9053\u5177"))return;DOM.attr("#J_TopAddToPromo","disabled",!0),DOM.replaceClass("#J_TopAddToPromo","btm-caozuo-orange","btm-caozuo-gray-none"),checkBoxs=DOM.query("#J_TbItemList .J_CheckBox");var json=[];len=checkBoxs.length;var translateDiv=DOM.get("#J_Translate");for(i=0;i<len;i++){var flag=!1;iid!=undefined?checkBoxs[i].value==iid&&!checkBoxs[i].disabled&&(flag=!0):checkBoxs[i].checked&&!checkBoxs[i].disabled&&(flag=!0);if(flag==1){var totalNum=Number(DOM.val("#J_TotalPromoItems"));totalNum+=1;if(totalNum>150){new H.widget.msgBox({title:"\u6e29\u99a8\u63d0\u793a",content:"\u975e\u5168\u5e97\u7c7b\u578b\u9053\u5177\u5361\u5b9d\u8d1d\u6570\u91cf\u4e0d\u80fd\u5927\u4e8e150\u4e2a\uff0c\u5f53\u524d\u5df2\u52a0\u5165"+totalNum+"\u4e2a\u5b9d\u8d1d\uff0c\u8bf7\u5220\u9664\u591a\u4f59\u7684\u5b9d\u8d1d\u3002",type:"info"});break}DOM.val("#J_TotalPromoItems",totalNum);var id=checkBoxs[i].value,title=H.util.strProcess(DOM.val(DOM.get("#J_ItemTitle_"+id))),picUrl=DOM.val(DOM.get("#J_ItemPic_"+id)),price=DOM.val(DOM.get("#J_ItemPrice_"+id)),outId=H.util.strProcess(DOM.val(DOM.get("#J_ItemOuterId_"+id)));o='{"id":"'+id+'", "outer_id":"'+outId+'", "title":"'+title+'", "price":"'+price+'", "pic_url":"'+picUrl+'"}',o=eval("("+o+")"),json.push(o);if(iid!=undefined)break}}if(json.length==0){new H.widget.msgBox({title:"\u9519\u8bef\u63d0\u793a",content:"\u672a\u9009\u62e9\u4efb\u4f55\u5b9d\u8d1d\uff01",type:"error",autoClose:!0,timeOut:2e3}),DOM.attr("#J_TopAddToPromo","disabled",!1),DOM.replaceClass("#J_TopAddToPromo","btm-caozuo-gray-none","btm-caozuo-orange");return}var itemsJson=KISSY.JSON.stringify(json),submitHandle=function(a){DOM.attr("#J_TopAddToPromo","disabled",!1),DOM.replaceClass("#J_TopAddToPromo","btm-caozuo-gray-none","btm-caozuo-orange"),a.payload.limit!=null&&new H.widget.msgBox({title:"\u64cd\u4f5c\u5931\u8d25",content:a.payload.limit,type:"error"}),PromopropsItem.paginator?PromopropsItem.paginator.toPage(PromopropsItem.paginator.page):PromopropsItem.searchTbItems()},errorHandle=function(a){DOM.attr("#J_TopAddToPromo","disabled",!1),DOM.replaceClass("#J_TopAddToPromo","btm-caozuo-gray-none","btm-caozuo-orange"),new H.widget.msgBox({title:"\u9519\u8bef\u63d0\u793a",content:a.desc,type:"error"})},data="pid="+pid+"&items="+itemsJson+"&form_key="+FORM_KEY;(new H.widget.asyncRequest).setURI(addPromoItemsUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send()},loadPromotionItems:function(){var a=function(a){totalRecords=a.payload.totalRecords,totalRecords>0?(DOM.get("#J_REmpty").style.display="none",DOM.css(DOM.query(".J_PromotionItemBtnHolder"),"display",""),totalRecords==1&&new H.widget.msgBox({title:"\u6e29\u99a8\u63d0\u793a",content:"\u975e\u5168\u5e97\u9053\u5177\u5361\u5b9d\u8d1d\u6570\u91cf\u9700\u5927\u4e8e1\u4e2a\uff0c\u5426\u5219\u6d3b\u52a8\u4e0d\u4f1a\u751f\u6548\u3002",type:"info"})):(DOM.get("#J_REmpty").style.display="",DOM.css(DOM.query(".J_PromotionItemBtnHolder"),"display","none")),DOM.html(DOM.get("#J_PromotionItemList"),a.payload.body,!0),DOM.hide("#J_RightLoading"),DOM.show("#J_MainRightContent"),pageCount=Math.ceil(totalRecords/a.payload.pageNum),PromopropsItem.renderPromoItems(),PromopropsItem.promotionItemPaginator=(new showPages("PromopropsItem.promotionItemPaginator")).setRender(PromopropsItem.promotionItemPaginationHandle).setPageCount(pageCount).printHtml("#J_PromotionItemPaging",2)};if(DOM.val(DOM.get("#J_RightSearchTitle"))!="\u5173\u952e\u5b57\u3001\u5546\u54c1\u94fe\u63a5\u3001\u5546\u54c1\u7f16\u7801")var b=encodeURIComponent(DOM.val(DOM.get("#J_RightSearchTitle")));else var b="";var c=DOM.val(DOM.get("#J_SearchStatus")),d=DOM.val(DOM.get("#J_RightSelectItemPage")),c=DOM.val(DOM.get("#J_SearchStatus")),e="pid="+pid+"&status="+c+"&q="+b+"&page_size="+d;DOM.show("#J_RightLoading"),DOM.hide("#J_MainRightContent"),(new H.widget.asyncRequest).setURI(loadPromotionItemsUrl).setMethod("GET").setHandle(a).setData(e).send()},renderPromoItems:function(){var a=DOM.query("#J_PromotionItemList .J_TbItem");Event.on(a,"mouseenter mouseleave click",function(a){var b=DOM.get(".J_CheckBox",a.currentTarget);if(b.disabled)return;a.type=="mouseenter"?DOM.addClass(a.currentTarget,"hover"):a.type=="mouseleave"?DOM.removeClass(a.currentTarget,"hover"):a.type=="click"&&(b.checked==0?b.checked=!0:(DOM.attr("#J_RightCheckAll","checked",!1),b.checked=!1))}),Event.on(DOM.query("#J_PromotionItemList .J_CheckBox"),"click",function(a){a.stopPropagation();var b=a.currentTarget.value;a.currentTarget.checked==1?DOM.addClass("#J_Item_"+b,"selected"):DOM.removeClass("#J_Item_"+b,"selected")})},promotionItemPaginationHandle:function(a){pageId=a;var b=function(a){DOM.get("#J_RightCheckAll").checked=!1,totalRecords=a.payload.totalRecords,totalRecords>0?(DOM.get("#J_REmpty").style.display="none",DOM.css(DOM.query(".J_PromotionItemBtnHolder"),"display",""),totalRecords==1&&new H.widget.msgBox({title:"\u6e29\u99a8\u63d0\u793a",content:"\u975e\u5168\u5e97\u9053\u5177\u5361\u5b9d\u8d1d\u6570\u91cf\u9700\u5927\u4e8e1\u4e2a\uff0c\u5426\u5219\u6d3b\u52a8\u4e0d\u4f1a\u751f\u6548\u3002",type:"info"})):(DOM.get("#J_REmpty").style.display="",DOM.css(DOM.query(".J_PromotionItemBtnHolder"),"display","none")),pageCount=Math.ceil(totalRecords/a.payload.pageNum),PromopropsItem.promotionItemPaginator.setPage(pageId).setPageCount(pageCount).printHtml("#J_PromotionItemPaging",2),DOM.html(DOM.get("#J_PromotionItemList"),a.payload.body),PromopropsItem.renderPromoItems(),DOM.hide("#J_RightLoading"),DOM.show("#J_MainRightContent")};DOM.show("#J_RightLoading"),DOM.hide("#J_MainRightContent");if(DOM.val(DOM.get("#J_RightSearchTitle"))!="\u5173\u952e\u5b57\u3001\u5546\u54c1\u94fe\u63a5\u3001\u5546\u54c1\u7f16\u7801")var c=encodeURIComponent(DOM.val(DOM.get("#J_RightSearchTitle")));else var c="";var d=DOM.val(DOM.get("#J_SearchStatus")),e=DOM.val(DOM.get("#J_RightSelectItemPage")),d=DOM.val(DOM.get("#J_SearchStatus")),f="pid="+pid+"&status="+d+"&q="+c+"&page_size="+e+"&page_id="+pageId;(new H.widget.asyncRequest).setURI(loadPromotionItemsUrl).setMethod("GET").setHandle(b).setData(f).send()},removePromotionItemHandle:function(a,b,c){if(!showPermissions("editor_promoprops","\u4fc3\u9500\u9053\u5177"))return;DOM.attr("#J_RemovePromotionItems","disabled",!0),DOM.replaceClass("#J_RemovePromotionItems","btm-caozuo-orange","btm-caozuo-gray-none"),itemIds=[];if(a&&b)itemIds.push(a),pid=b;else{checkBoxs=DOM.query("#J_PromotionItemList .J_CheckBox"),len=checkBoxs.length;for(i=0;i<len;i++)checkBoxs[i].checked&&!checkBoxs[i].disabled&&itemIds.push(checkBoxs[i].value)}if(itemIds.length==0){new H.widget.msgBox({title:"\u9519\u8bef\u63d0\u793a",content:"\u672a\u9009\u62e9\u4efb\u4f55\u5b9d\u8d1d\uff01",type:"error",autoClose:!0,timeOut:3e3}),DOM.attr("#J_RemovePromotionItems","disabled",!1),DOM.replaceClass("#J_RemovePromotionItems","btm-caozuo-gray-none","btm-caozuo-orange");return}var d=function(a){DOM.attr("#J_RemovePromotionItems","disabled",!1),DOM.replaceClass("#J_RemovePromotionItems","btm-caozuo-gray-none","btm-caozuo-orange"),c!="promoItems"?PromopropsItem.loadPromotionItems():iconControl.paginator?iconControl.paginator.toPage(iconControl.paginator.page):iconControl.searchPromoItems()},e="pid="+pid+"&item_ids="+itemIds+"&form_key="+FORM_KEY;(new H.widget.asyncRequest).setURI(removePromotionItemUrl).setMethod("POST").setHandle(d).setData(e).send()},rightCheckAll:function(a){checkBoxs=DOM.query("#J_PromotionItemList .J_CheckBox"),len=checkBoxs.length;for(i=0;i<len;i++){var b=checkBoxs[i].value;if(checkBoxs[i].disabled)continue;this.checked?checkBoxs[i].checked=!0:checkBoxs[i].checked=!1}},retry:function(a,b){if(!showPermissions("editor_promoprops","\u4fc3\u9500\u9053\u5177"))return;var c=function(a){PromopropsItem.msg.hide(),PromopropsItem.promotionItemPaginator?PromopropsItem.promotionItemPaginator.toPage(PromopropsItem.promotionItemPaginator.page):PromopropsItem.loadPromotionItems()},d="promo_item_id="+a+"&force="+b;PromopropsItem.msg=new H.widget.msgBox({title:"",dialogType:"loading",content:"\u7cfb\u7edf\u6b63\u5728\u5904\u7406\u4e2d\uff0c\u8bf7\u7a0d\u5019"}),(new H.widget.asyncRequest).setURI(retryUrl).setMethod("GET").setHandle(c).setData(d).send()}}},{requires:["utils/showPages/index"]}); 