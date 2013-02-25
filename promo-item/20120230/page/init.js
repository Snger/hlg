/*
combined files : 

page/mods/header
utils/urlParse
page/init

*/
KISSY.add('page/mods/header',function(S) {
 
    return function(){
       
        alert('header of refund.');
    }
 
});
KISSY.add('utils/urlParse',function(S) {
 
    return {
       
        aa : 'a'
    }
 
});
/**
 * @fileOverview 
 * @author  
 */
KISSY.add('page/init',function(S, Header,RenderUploader,urlParse) {
 	
    return function(){
        Header();
		console.log(RenderUploader)
		console.log(urlParse)
		alert('a');
        return 'this is demo page.';
    }
 
}, {requires:['./mods/header','gallery/form/1.2/uploader/index','utils/urlParse']});
