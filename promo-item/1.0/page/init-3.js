/**
 * @fileOverview 
 * @author  
 */
KISSY.add(function(S, Header,RenderUploader,urlParse) {
 	
    return function(){
        Header();
		console.log(RenderUploader)
		console.log(urlParse)
		alert('a');
        return 'this is demo page.';
    }
 
}, {requires:['./mods/header','gallery/form/1.2/uploader/index','utils/urlParse']});