/*
combined files : 

page/mods/header
page/init

*/
KISSY.add('page/mods/header',function(S) {
 
    return function(){
       
        alert('header of refund.');
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
