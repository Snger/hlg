/*
 * phpOpenTracker
 * 
 * Copyright (c) 2000-2009, Sebastian Bergmann <sb@sebastian-bergmann.de> and
 * Copyright (c) 2009, Arne Blankerts <arne@blankerts.de>. All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 * 
 * Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 * 
 * Neither the name of Sebastian Bergmann nor the names of his contributors may
 * be used to endorse or promote products derived from this software without
 * specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRIC LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 * 
 */

(function() {
   (window.pot || (window.pot = {})).a = {};
   var a = window.pot.a;   
   a.version = '1.0';  
   a.clk = function(e,a,c) {
      var u=encodeURIComponent || escape;
      (new Image).src=[
         location.protocol+'//'+location.host+'/pot.php?a=c',
         't='+a.nodeName.toLowerCase(),
         'c='+c,
         'i='+u(a.id),
         'r='+u(a.rel),
         'h='+u(a.href),         
         'ti='+u(a.title),         
         'w='+u(location.href),
         'cx='+e.clientX,
         'cy='+e.clientY,
         'px='+e.pageX,
         'py='+e.pageY,
         'sx='+e.screenX,
         'sy='+e.screenY
         ].join('&');
   };
   a.register = function(e,o,h){
     var args = Array.prototype.slice.call(arguments,3);
     if (o.addEventListener) {
        o.addEventListener(e,function(evt){
               h.apply(a.clk,[evt].concat(args));
            },false);
        return;
     }
     if (o.attachEvent) {
        return o.attachEvent('on'+e,function() {
            h.apply(null,[window.event].concat(args));
        });
        return;
      }                 
   };   
   a.register('load',window,function(){
      var x=document.getElementsByTagName('A');
      for(var y in x){
         a.register('click',x[y],a.clk,x[y],y);
      }
   });   
})();