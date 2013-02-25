/*
combined files : 

page/mods/header
utils/urlParse
page/init-3

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
KISSY.add('page/init-3',function(S, Header,RenderUploader,urlParse) {
 	
    return function(){
        Header();
		console.log(RenderUploader)
		console.log(urlParse)
		alert('a');
        return 'this is demo page.';
    }
 
}, {requires:['./mods/header','gallery/form/1.2/uploader/index','utils/urlParse']});
