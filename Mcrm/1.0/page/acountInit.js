/**
 * @fileOverview 
 * @author  
 */
KISSY.add(function (S,msgBox,msg) {
    // your code here
	var submitHandle = function(o){
		alert(o)
	}
	var data ='';
	new msgBox().setURI(buyDetailUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
    
	new msg('asd');
}, {
    requires: ['utils/asyncRequest/index','utils/msgBox/index']
});