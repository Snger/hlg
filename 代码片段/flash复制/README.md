## 使用
		<div class="demo-area">
          <button id="d_clip_button" class="my_clip_button" title="Click me to copy to clipboard." data-clipboard-target="fe_text" data-clipboard-text="Default clipboard text from attribute"><b>Copy To Clipboard...</b></button>
          <h4><label for="fe_text">Change Copy Text Here</label></h4>
          <textarea id="fe_text" cols="50" rows="3">Copy me!</textarea>
          <h4><label for="testarea">Paste Text Here</label></h4>
          <textarea id="testarea" cols="50" rows="3"></textarea>
          <p><button id="clear-test">Clear Test Area</button></p>
        </div>
		<script type="text/javascript" src="javascripts/ZeroClipboard.js"></script>
		<script language="JavaScript">

		  	$(document).ready(function() {
			    var clip = new ZeroClipboard($("#d_clip_button"), {
			      moviePath: "javascripts/ZeroClipboard.swf"
			    });
		
			    clip.on('load', function (client) {
			      debugstr("Flash movie loaded and ready.");
			    });
		
			    clip.on('noFlash', function (client) {
			      $(".demo-area").hide();
			      debugstr("Your browser has no Flash.");
			    });
		
			    clip.on('wrongFlash', function (client, args) {
			      $(".demo-area").hide();
			      debugstr("Flash 10.0.0+ is required but you are running Flash " + args.flashVersion.replace(/,/g, "."));
			    });
		
			    clip.on('complete', function (client, args) {
			      debugstr("Copied text to clipboard: " + args.text);
			    });
		
			    // jquery stuff (optional)
			    function debugstr(text) {
			      $("#d_debug").append($("<p>").text(text));
			    }
		
			    $("#clear-test").on("click", function(){
			      $("#fe_text").val("Copy me!");
			      $("#testarea").val("");
			    });
		  });
		</script>
[ZeroClipboard](http://jonrohan.github.io/ZeroClipboard/)





   
 
