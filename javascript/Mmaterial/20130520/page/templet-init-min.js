KISSY.add("page/templet-init",function(a,b){var c=a.DOM,d=a.Event;return templet={panel:null,msg:null,init:function(){els=c.query(".J_Templet");var a=function(a){a.preventDefault();var b=c.attr(this,"tid");templet.get(b)};d.on(els,"click",a),d.on(c.query(".J_StartDesign"),"click",function(a){a.preventDefault();if(!showPermissions("editor_material","\u4fc3\u9500\u7d20\u6750"))return;var b=c.attr(a.currentTarget,"data-url");if(isVersionPer("material",!1)){new H.widget.msgBox({title:"\u6e29\u99a8\u63d0\u793a",content:"\u53ea\u63d0\u4f9b\u5236\u4f5c\u4f53\u9a8c\uff0c\u5c0a\u4eab\u7248\u624d\u80fd\u4eab\u53d7\u7d20\u6750\u6295\u653e\u529f\u80fd",type:"info",buttons:[{value:"\u7ee7\u7eed\u4f53\u9a8c"},{value:"\u5173\u95ed"}],success:function(a){a=="\u7ee7\u7eed\u4f53\u9a8c"&&window.open(b,"_blank")}});return}}),d.on(c.query(".J_ReleaseCode"),"click",function(a){var b=c.attr(a.currentTarget,"data-url");if(!showPermissions("editor_material","\u4fc3\u9500\u7d20\u6750"))return;if(isVersionPer("material"))return;window.location.href=b})},get:function(a){if(!showPermissions("editor_material","\u4fc3\u9500\u7d20\u6750"))return;if(isVersionPer("material"))return;templet.panel||(templet.panel=new b.Dialog({width:395,headerContent:"\u83b7\u53d6\u4ee3\u7801",bodyContent:"",mask:!1,align:{points:["cc","cc"]},closable:!0,draggable:!0,aria:!0}));var c=function(a){templet.panel.set("bodyContent",'<div><textarea style="width:380px;height:200px;margin:5px" id="J_Templet_Content" onclick="this.select()">'+a.payload+'</textarea></br><span class="btm-68-gray fl"><a href="#2"  class="J_Copy"><span>\u70b9\u6b64\u590d\u5236</span></a></span><span style="height:31px; line-height:31px">\u9f20\u6807\u4e8e\u6846\u5185CTRL+C\uff1a\u590d\u5236\u3001CTRL+V\uff1a\u7c98\u8d34</span></div>'),templet.panel.show(),H.util.clipboard(".J_Copy","#J_Templet_Content")},d=function(a){new H.widget.msgBox({title:"\u9519\u8bef\u63d0\u793a",content:a.desc,type:"error"})},e="tid="+a;(new H.widget.asyncRequest).setURI(getTempletUrl).setMethod("GET").setHandle(c).setErrorHandle(d).setData(e).send()},share:function(a,b){business=c.val(c.get("#J_Business_"+b)),type=c.val(c.get("#J_Type_"+b)),size=c.val(c.get("#J_Size_"+b)),festival=c.val(c.get("#J_Festival_"+b)),level=c.val(c.get("#J_Level_"+b));var d=function(a){c.get("#J_Oper_"+b).innerHTML="\u5171\u4eab\u6210\u529f"},e="material_type="+a+"&id="+b+"&business="+business+"&type="+type+"&size="+size+"&festival="+festival+"&level="+level;(new H.widget.asyncRequest).setURI(shareTempletUrl).setMethod("GET").setHandle(d).setData(e).send()},levelAction:function(a,b){var d=c.val(c.get("#J_Level_"+b)),e=function(a){new H.widget.msgBox({title:"\u6210\u529f\u63d0\u793a",content:"\u64cd\u4f5c\u6210\u529f",type:"info"})},f="material_type="+a+"&id="+b+"&level="+d;(new H.widget.asyncRequest).setURI(levelTempletUrl).setMethod("GET").setHandle(e).setData(f).send()},design:function(a){var b="",c=document.getElementsByName("J_Mid_"+a);for(var d=0;d<c.length;d++)if(c[d].checked){b=c[d].value;break}var e=designUrl+"&templet_id="+b;window.open(e,"_blank")},designOld:function(a){var b="",c=document.getElementsByName("J_Mid_"+a);for(var d=0;d<c.length;d++)if(c[d].checked){b=c[d].value;break}var e=designUrl+"&templet_id="+b+"&isOld=1";window.open(e,"_blank")},turn:function(a,b,d){var e=function(e){c.html("#J_Content_"+a,e.payload),c.html("#J_TempletIdBox"+a,b),c.html("#J_TempletUseNumBox"+a,d)},f="&templet_id="+b;(new H.widget.asyncRequest).setURI(getContentUrl).setMethod("GET").setHandle(e).setData(f).send()},cancelAssociate:function(a){var b=function(a){new H.widget.msgBox({title:"\u6210\u529f\u63d0\u793a",content:"\u64cd\u4f5c\u6210\u529f",type:"info"}),window.location.reload()},c=function(a){new H.widget.msgBox({title:"\u9519\u8bef\u63d0\u793a",content:a.desc,type:"error"});return},d="templet_id="+a;(new H.widget.asyncRequest).setURI(cancelAssociateUrl).setMethod("GET").setHandle(b).setErrorHandle(c).setData(d).send()},associate:function(){var a=function(a){new H.widget.msgBox({title:"\u6210\u529f\u63d0\u793a",content:"\u64cd\u4f5c\u6210\u529f",type:"info"}),window.location.reload()},b=function(a){new H.widget.msgBox({title:"\u9519\u8bef\u63d0\u793a",content:a.desc,type:"error"});return},c="",d=document.getElementsByName("ass_ids[]");for(var e=0;e<d.length;e++)d[e].checked&&(c=c+d[e].value+",");c=c.substr(0,c.length-1);var f="ass_ids="+c;(new H.widget.asyncRequest).setURI(associateUrl).setMethod("GET").setHandle(a).setErrorHandle(b).setData(f).send()},associateByHand:function(){var a=function(a){new H.widget.msgBox({title:"\u6210\u529f\u63d0\u793a",content:"\u64cd\u4f5c\u6210\u529f",type:"info"}),window.location.reload()},b=function(a){new H.widget.msgBox({title:"\u9519\u8bef\u63d0\u793a",content:a.desc,type:"error"});return},d=c.val("#J_AssIds");if(d.split(",").length<2){new H.widget.msgBox({title:"\u9519\u8bef\u63d0\u793a",content:"\u8bf7\u8f93\u5165\u81f3\u5c112\u4e2a\u4e0d\u540c\u89c4\u683c\u6d77\u62a5\uff0c\u7528,\u5206\u9694",type:"error"});return}var e="ass_ids="+d;(new H.widget.asyncRequest).setURI(associateUrl).setMethod("GET").setHandle(a).setErrorHandle(b).setData(e).send()},collect:function(a){var b=function(b){c.html("#J_Collect_"+a,"\u5df2\u6536\u85cf")},d=function(a){new H.widget.msgBox({title:"\u9519\u8bef\u63d0\u793a",content:a.desc,type:"error"});return},e="share_id="+a;(new H.widget.asyncRequest).setURI(collectUrl).setMethod("GET").setHandle(b).setErrorHandle(d).setData(e).send()},cancelCollect:function(a){var b=function(b){c.remove("#J_Bm_Wrap_"+a)},d=function(a){new H.widget.msgBox({title:"\u9519\u8bef\u63d0\u793a",content:a.desc,type:"error"});return},e="favorite_id="+a;(new H.widget.asyncRequest).setURI(cancelCollectUrl).setMethod("GET").setHandle(b).setErrorHandle(d).setData(e).send()},setTop:function(){var a=function(a){new H.widget.msgBox({title:"\u6210\u529f\u63d0\u793a",content:a.desc,type:"info"});return},b=function(a){new H.widget.msgBox({title:"\u9519\u8bef\u63d0\u793a",content:a.desc,type:"error"});return},d="festival="+c.val(c.get("#J_TopFestival"));(new H.widget.asyncRequest).setURI(setTopFestivalUrl).setMethod("GET").setHandle(a).setErrorHandle(b).setData(d).send()},add_ding:function(a){var b=function(b){c.html("#J_Ding_"+a,"\u5df2\u8d5e");var d=Number(c.html("#J_Ding_Number_"+a))+1;c.html("#J_Ding_Number_"+a,d)},d=function(a){new H.widget.msgBox({title:"\u9519\u8bef\u63d0\u793a",content:a.desc,type:"error"});return},e="share_id="+a;(new H.widget.asyncRequest).setURI(praiseUrl).setMethod("GET").setHandle(b).setErrorHandle(d).setData(e).send()}}},{requires:["overlay"]}); 