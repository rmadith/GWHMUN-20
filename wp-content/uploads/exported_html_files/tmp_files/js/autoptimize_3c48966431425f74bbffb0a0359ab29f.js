/*! jQuery Migrate v1.4.1 | (c) jQuery Foundation and other contributors | jquery.org/license */
"undefined"==typeof jQuery.migrateMute&&(jQuery.migrateMute=!0),function(a,b,c){function d(c){var d=b.console;f[c]||(f[c]=!0,a.migrateWarnings.push(c),d&&d.warn&&!a.migrateMute&&(d.warn("JQMIGRATE: "+c),a.migrateTrace&&d.trace&&d.trace()))}function e(b,c,e,f){if(Object.defineProperty)try{return void Object.defineProperty(b,c,{configurable:!0,enumerable:!0,get:function(){return d(f),e},set:function(a){d(f),e=a}})}catch(g){}a._definePropertyBroken=!0,b[c]=e}a.migrateVersion="1.4.1";var f={};a.migrateWarnings=[],b.console&&b.console.log&&b.console.log("JQMIGRATE: Migrate is installed"+(a.migrateMute?"":" with logging active")+", version "+a.migrateVersion),a.migrateTrace===c&&(a.migrateTrace=!0),a.migrateReset=function(){f={},a.migrateWarnings.length=0},"BackCompat"===document.compatMode&&d("jQuery is not compatible with Quirks Mode");var g=a("<input/>",{size:1}).attr("size")&&a.attrFn,h=a.attr,i=a.attrHooks.value&&a.attrHooks.value.get||function(){return null},j=a.attrHooks.value&&a.attrHooks.value.set||function(){return c},k=/^(?:input|button)$/i,l=/^[238]$/,m=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,n=/^(?:checked|selected)$/i;e(a,"attrFn",g||{},"jQuery.attrFn is deprecated"),a.attr=function(b,e,f,i){var j=e.toLowerCase(),o=b&&b.nodeType;return i&&(h.length<4&&d("jQuery.fn.attr( props, pass ) is deprecated"),b&&!l.test(o)&&(g?e in g:a.isFunction(a.fn[e])))?a(b)[e](f):("type"===e&&f!==c&&k.test(b.nodeName)&&b.parentNode&&d("Can't change the 'type' of an input or button in IE 6/7/8"),!a.attrHooks[j]&&m.test(j)&&(a.attrHooks[j]={get:function(b,d){var e,f=a.prop(b,d);return f===!0||"boolean"!=typeof f&&(e=b.getAttributeNode(d))&&e.nodeValue!==!1?d.toLowerCase():c},set:function(b,c,d){var e;return c===!1?a.removeAttr(b,d):(e=a.propFix[d]||d,e in b&&(b[e]=!0),b.setAttribute(d,d.toLowerCase())),d}},n.test(j)&&d("jQuery.fn.attr('"+j+"') might use property instead of attribute")),h.call(a,b,e,f))},a.attrHooks.value={get:function(a,b){var c=(a.nodeName||"").toLowerCase();return"button"===c?i.apply(this,arguments):("input"!==c&&"option"!==c&&d("jQuery.fn.attr('value') no longer gets properties"),b in a?a.value:null)},set:function(a,b){var c=(a.nodeName||"").toLowerCase();return"button"===c?j.apply(this,arguments):("input"!==c&&"option"!==c&&d("jQuery.fn.attr('value', val) no longer sets properties"),void(a.value=b))}};var o,p,q=a.fn.init,r=a.find,s=a.parseJSON,t=/^\s*</,u=/\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/,v=/\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/g,w=/^([^<]*)(<[\w\W]+>)([^>]*)$/;a.fn.init=function(b,e,f){var g,h;return b&&"string"==typeof b&&!a.isPlainObject(e)&&(g=w.exec(a.trim(b)))&&g[0]&&(t.test(b)||d("$(html) HTML strings must start with '<' character"),g[3]&&d("$(html) HTML text after last tag is ignored"),"#"===g[0].charAt(0)&&(d("HTML string cannot start with a '#' character"),a.error("JQMIGRATE: Invalid selector string (XSS)")),e&&e.context&&e.context.nodeType&&(e=e.context),a.parseHTML)?q.call(this,a.parseHTML(g[2],e&&e.ownerDocument||e||document,!0),e,f):(h=q.apply(this,arguments),b&&b.selector!==c?(h.selector=b.selector,h.context=b.context):(h.selector="string"==typeof b?b:"",b&&(h.context=b.nodeType?b:e||document)),h)},a.fn.init.prototype=a.fn,a.find=function(a){var b=Array.prototype.slice.call(arguments);if("string"==typeof a&&u.test(a))try{document.querySelector(a)}catch(c){a=a.replace(v,function(a,b,c,d){return"["+b+c+'"'+d+'"]'});try{document.querySelector(a),d("Attribute selector with '#' must be quoted: "+b[0]),b[0]=a}catch(e){d("Attribute selector with '#' was not fixed: "+b[0])}}return r.apply(this,b)};var x;for(x in r)Object.prototype.hasOwnProperty.call(r,x)&&(a.find[x]=r[x]);a.parseJSON=function(a){return a?s.apply(this,arguments):(d("jQuery.parseJSON requires a valid JSON string"),null)},a.uaMatch=function(a){a=a.toLowerCase();var b=/(chrome)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||a.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},a.browser||(o=a.uaMatch(navigator.userAgent),p={},o.browser&&(p[o.browser]=!0,p.version=o.version),p.chrome?p.webkit=!0:p.webkit&&(p.safari=!0),a.browser=p),e(a,"browser",a.browser,"jQuery.browser is deprecated"),a.boxModel=a.support.boxModel="CSS1Compat"===document.compatMode,e(a,"boxModel",a.boxModel,"jQuery.boxModel is deprecated"),e(a.support,"boxModel",a.support.boxModel,"jQuery.support.boxModel is deprecated"),a.sub=function(){function b(a,c){return new b.fn.init(a,c)}a.extend(!0,b,this),b.superclass=this,b.fn=b.prototype=this(),b.fn.constructor=b,b.sub=this.sub,b.fn.init=function(d,e){var f=a.fn.init.call(this,d,e,c);return f instanceof b?f:b(f)},b.fn.init.prototype=b.fn;var c=b(document);return d("jQuery.sub() is deprecated"),b},a.fn.size=function(){return d("jQuery.fn.size() is deprecated; use the .length property"),this.length};var y=!1;a.swap&&a.each(["height","width","reliableMarginRight"],function(b,c){var d=a.cssHooks[c]&&a.cssHooks[c].get;d&&(a.cssHooks[c].get=function(){var a;return y=!0,a=d.apply(this,arguments),y=!1,a})}),a.swap=function(a,b,c,e){var f,g,h={};y||d("jQuery.swap() is undocumented and deprecated");for(g in b)h[g]=a.style[g],a.style[g]=b[g];f=c.apply(a,e||[]);for(g in b)a.style[g]=h[g];return f},a.ajaxSetup({converters:{"text json":a.parseJSON}});var z=a.fn.data;a.fn.data=function(b){var e,f,g=this[0];return!g||"events"!==b||1!==arguments.length||(e=a.data(g,b),f=a._data(g,b),e!==c&&e!==f||f===c)?z.apply(this,arguments):(d("Use of jQuery.fn.data('events') is deprecated"),f)};var A=/\/(java|ecma)script/i;a.clean||(a.clean=function(b,c,e,f){c=c||document,c=!c.nodeType&&c[0]||c,c=c.ownerDocument||c,d("jQuery.clean() is deprecated");var g,h,i,j,k=[];if(a.merge(k,a.buildFragment(b,c).childNodes),e)for(i=function(a){return!a.type||A.test(a.type)?f?f.push(a.parentNode?a.parentNode.removeChild(a):a):e.appendChild(a):void 0},g=0;null!=(h=k[g]);g++)a.nodeName(h,"script")&&i(h)||(e.appendChild(h),"undefined"!=typeof h.getElementsByTagName&&(j=a.grep(a.merge([],h.getElementsByTagName("script")),i),k.splice.apply(k,[g+1,0].concat(j)),g+=j.length));return k});var B=a.event.add,C=a.event.remove,D=a.event.trigger,E=a.fn.toggle,F=a.fn.live,G=a.fn.die,H=a.fn.load,I="ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",J=new RegExp("\\b(?:"+I+")\\b"),K=/(?:^|\s)hover(\.\S+|)\b/,L=function(b){return"string"!=typeof b||a.event.special.hover?b:(K.test(b)&&d("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"),b&&b.replace(K,"mouseenter$1 mouseleave$1"))};a.event.props&&"attrChange"!==a.event.props[0]&&a.event.props.unshift("attrChange","attrName","relatedNode","srcElement"),a.event.dispatch&&e(a.event,"handle",a.event.dispatch,"jQuery.event.handle is undocumented and deprecated"),a.event.add=function(a,b,c,e,f){a!==document&&J.test(b)&&d("AJAX events should be attached to document: "+b),B.call(this,a,L(b||""),c,e,f)},a.event.remove=function(a,b,c,d,e){C.call(this,a,L(b)||"",c,d,e)},a.each(["load","unload","error"],function(b,c){a.fn[c]=function(){var a=Array.prototype.slice.call(arguments,0);return"load"===c&&"string"==typeof a[0]?H.apply(this,a):(d("jQuery.fn."+c+"() is deprecated"),a.splice(0,0,c),arguments.length?this.bind.apply(this,a):(this.triggerHandler.apply(this,a),this))}}),a.fn.toggle=function(b,c){if(!a.isFunction(b)||!a.isFunction(c))return E.apply(this,arguments);d("jQuery.fn.toggle(handler, handler...) is deprecated");var e=arguments,f=b.guid||a.guid++,g=0,h=function(c){var d=(a._data(this,"lastToggle"+b.guid)||0)%g;return a._data(this,"lastToggle"+b.guid,d+1),c.preventDefault(),e[d].apply(this,arguments)||!1};for(h.guid=f;g<e.length;)e[g++].guid=f;return this.click(h)},a.fn.live=function(b,c,e){return d("jQuery.fn.live() is deprecated"),F?F.apply(this,arguments):(a(this.context).on(b,this.selector,c,e),this)},a.fn.die=function(b,c){return d("jQuery.fn.die() is deprecated"),G?G.apply(this,arguments):(a(this.context).off(b,this.selector||"**",c),this)},a.event.trigger=function(a,b,c,e){return c||J.test(a)||d("Global events are undocumented and deprecated"),D.call(this,a,b,c||document,e)},a.each(I.split("|"),function(b,c){a.event.special[c]={setup:function(){var b=this;return b!==document&&(a.event.add(document,c+"."+a.guid,function(){a.event.trigger(c,Array.prototype.slice.call(arguments,1),b,!0)}),a._data(this,c,a.guid++)),!1},teardown:function(){return this!==document&&a.event.remove(document,c+"."+a._data(this,c)),!1}}}),a.event.special.ready={setup:function(){this===document&&d("'ready' event is deprecated")}};var M=a.fn.andSelf||a.fn.addBack,N=a.fn.find;if(a.fn.andSelf=function(){return d("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"),M.apply(this,arguments)},a.fn.find=function(a){var b=N.apply(this,arguments);return b.context=this.context,b.selector=this.selector?this.selector+" "+a:a,b},a.Callbacks){var O=a.Deferred,P=[["resolve","done",a.Callbacks("once memory"),a.Callbacks("once memory"),"resolved"],["reject","fail",a.Callbacks("once memory"),a.Callbacks("once memory"),"rejected"],["notify","progress",a.Callbacks("memory"),a.Callbacks("memory")]];a.Deferred=function(b){var c=O(),e=c.promise();return c.pipe=e.pipe=function(){var b=arguments;return d("deferred.pipe() is deprecated"),a.Deferred(function(d){a.each(P,function(f,g){var h=a.isFunction(b[f])&&b[f];c[g[1]](function(){var b=h&&h.apply(this,arguments);b&&a.isFunction(b.promise)?b.promise().done(d.resolve).fail(d.reject).progress(d.notify):d[g[0]+"With"](this===e?d.promise():this,h?[b]:arguments)})}),b=null}).promise()},c.isResolved=function(){return d("deferred.isResolved is deprecated"),"resolved"===c.state()},c.isRejected=function(){return d("deferred.isRejected is deprecated"),"rejected"===c.state()},b&&b.call(c,c),c}}}(jQuery,window);
(function($){'use strict';})(jQuery);

!function(e,t){"function"==typeof define&&define.amd?define([],t):"object"==typeof module&&module.exports?module.exports=t():e.PDFObject=t()}(this,function(){"use strict";if("undefined"==typeof window||"undefined"==typeof navigator)return!1;var e=window.navigator.userAgent,t=void 0!==navigator.mimeTypes&&void 0!==navigator.mimeTypes["application/pdf"],v=void 0!==window.Promise,o=-1!==e.indexOf("irefox")&&-1===e.indexOf("Mobile")&&-1===e.indexOf("Tablet")&&18<parseInt(e.split("rv:")[1].split(".")[0],10),b=/iphone|ipad|ipod/i.test(e.toLowerCase()),n=function(e){var t;try{t=new ActiveXObject(e)}catch(e){t=null}return t},i=function(){return!!(window.ActiveXObject||"ActiveXObject"in window)},h=!b&&navigator.vendor&&-1!==navigator.vendor.indexOf("Apple")&&navigator.userAgent&&-1!==navigator.userAgent.indexOf("Safari"),r=function(){return!(!n("AcroPDF.PDF")&&!n("PDF.PdfCtrl"))},y=!b&&(o||t||i()&&r()),w=function(e){var t,o="";if(e){for(t in e)e.hasOwnProperty(t)&&(o+=encodeURIComponent(t)+"="+encodeURIComponent(e[t])+"&");o=o&&(o="#"+o).slice(0,o.length-1)}return o},d=function(e){"undefined"!=typeof console&&console.log&&console.log("[PDFObject] "+e)},P=function(e){return d(e),!1},D=function(e){var t=document.body;return"string"==typeof e?t=document.querySelector(e):"undefined"!=typeof jQuery&&e instanceof jQuery&&e.length?t=e.get(0):void 0!==e.nodeType&&1===e.nodeType&&(t=e),t},s=function(e){var t="pdfobject-container",o=e.className.split(/\s+/);-1===o.indexOf(t)&&(o.push(t),e.className=o.join(" "))},T=function(e,t,o,n,i){var r=n+"?file="+encodeURIComponent(t)+o,d="<div style='"+(b?"-webkit-overflow-scrolling: touch; overflow-y: scroll; ":"overflow: hidden; ")+"position: absolute; top: 0; right: 0; bottom: 0; left: 0;'><iframe  "+i+" src='"+r+"' style='border: none; width: 100%; height: 100%;' frameborder='0'></iframe></div>";return s(e),e.style.position="relative",e.style.overflow="auto",e.innerHTML=d,e.getElementsByTagName("iframe")[0]},j=function(e,t,o,n,i,r,d){var a="",a=t&&t!==document.body?"width: "+i+"; height: "+r+";":"position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%;";return s(e),e.innerHTML="<embed "+d+" class='pdfobject' src='"+o+n+"' type='application/pdf' style='overflow: auto; "+a+"'/>",e.getElementsByTagName("embed")[0]},F=function(e,t,o,n,i,r,d){var a="",a=t&&t!==document.body?"width: "+i+"; height: "+r+";":"position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%;";return e.className+=" pdfobject-container",e.innerHTML="<iframe "+d+" class='pdfobject' src='"+o+n+"' type='application/pdf' style='border: none; "+a+"'/>",e.getElementsByTagName("iframe")[0]};return{embed:function(e,t,o){if("string"!=typeof e)return P("URL is not valid");t=void 0!==t&&t;var n,i=(o=void 0!==o?o:{}).id&&"string"==typeof o.id?"id='"+o.id+"'":"",r=!!o.page&&o.page,d=o.pdfOpenParams?o.pdfOpenParams:{},a=void 0===o.fallbackLink||o.fallbackLink,s=o.width?o.width:"100%",f=o.height?o.height:"100%",p="boolean"!=typeof o.assumptionMode||o.assumptionMode,l="boolean"==typeof o.forcePDFJS&&o.forcePDFJS,c="boolean"==typeof o.supportRedirect&&o.supportRedirect,u=!!o.PDFJS_URL&&o.PDFJS_URL,m=D(t),g="";return m?(r&&(d.page=r),n=w(d),l&&u?T(m,e,n,u,i):y||p&&v&&!b?(c&&h?F:j)(m,t,e,n,s,f,i):u?T(m,e,n,u,i):(a&&(g="string"==typeof a?a:"<p>This browser does not support inline PDFs. Please download the PDF to view it: <a href='[url]'>Download PDF</a></p>",m.innerHTML=g.replace(/\[url\]/g,e)),P("This browser does not support embedded PDFs"))):P("Target element cannot be determined")},pdfobjectversion:"2.1.1",supportsPDFs:y}});
jQuery(function(r){r(".ead-iframe-wrapper").each(function(){var e=r(this),t=e.find(".ead-iframe"),i=e.parent(".ead-document").data("viewer"),a=void 0!==i&&0<i.length&&i,d=r('<iframe class="ead-iframe"></iframe>');d.attr({src:t.attr("src"),style:t.attr("style"),title:t.attr("title")}),a||d.css("visibility","visible"),d.on("load",function(){r(this).parents(".ead-document").find(".ead-document-loading").css("display","none")}),e.html(d)}),r(".ead-document[data-pdf-src]").each(function(){var e,t=r(this),i=t.find(".ead-iframe"),a=t.data("pdfSrc"),d=void 0!==(d=t.data("viewer"))&&0<a.length&&0<d.length&&d,n="pdfjs"in eadPublic&&0<eadPublic.pdfjs.length&&"built-in"===d;d&&("browser"===d||n)&&(PDFObject.supportsPDFs||n?(e={},e=n?{forcePDFJS:!0,PDFJS_URL:eadPublic.pdfjs}:{width:i.css("width"),height:i.css("height")},PDFObject.embed(a,t,e)):i.css("visibility","visible"))}),r(document).on("click",".ead-reload-btn",function(e){e.preventDefault();var t=r(this).parents(".ead-document"),i=t.find(".ead-iframe").attr("src");t.find(".ead-iframe").attr("src",i)})});
!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e){function n(t,e){var n;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return o(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return o(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,i=function(){};return{s:i,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,u=!0,f=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return u=t.done,t},e:function(t){f=!0,a=t},f:function(){try{u||null==n.return||n.return()}finally{if(f)throw a}}}}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}var r=["none","bounce","flash","pulse","rubberBand","shake","headShake","swing","tada","wobble","jello","heartBeat","hinge","jackInTheBox","bounceIn","bounceInDown","bounceInLeft","bounceInRight","bounceInUp","bounceOut","bounceOutDown","bounceOutLeft","bounceOutRight","bounceOutUp","fadeIn","fadeInDown","fadeInDownBig","fadeInLeft","fadeInLeftBig","fadeInRight","fadeInRightBig","fadeInUp","fadeOut","fadeOutDown","fadeOutDownBig","fadeOutLeft","fadeOutLeftBig","fadeOutRight","fadeOutRightBig","fadeOutUp","fadeOutUpBig","flip","flipInX","flipInY","flipOutX","flipOutY","lightSpeedIn","lightSpeedOut","rotateIn","rotateInDownLeft","rotateInDownRight","rotateInUpLeft","rotateInUpRight","rotateOut","rotateOutDownLeft","rotateOutDownRight","rotateOutUpLeft","rotateOutUpRight","slideInDown","slideInLeft","slideInRight","slideInUp","slideOutDown","slideOutLeft","slideOutRight","slideOutUp","zoomIn","zoomInDown","zoomInLeft","zoomInRight","zoomInUp","zoomOut","zoomOutDown","zoomOutLeft","zoomOutRight","zoomOutUp","rollIn","rollOut"],i=["bounceOut","bounceOutDown","bounceOutLeft","bounceOutRight","bounceOutUp","fadeOut","fadeOutDown","fadeOutDownBig","fadeOutLeft","fadeOutLeftBig","fadeOutRight","fadeOutRightBig","fadeOutUp","fadeOutUpBig","flipOutX","flipOutY","lightSpeedOut","rotateOut","rotateOutDownLeft","rotateOutDownRight","rotateOutUpLeft","rotateOutUpRight","slideOutDown","slideOutLeft","slideOutRight","slideOutUp","zoomOut","zoomOutDown","zoomOutLeft","zoomOutRight","zoomOutUp","rollOut"],a=["none","delay-100ms","delay-200ms","delay-500ms","delay-1s","delay-2s","delay-3s","delay-4s","delay-5s"],u=["none","slow","slower","fast","faster"];window.onload=function(){var t,e=document.querySelectorAll(".animated"),o=n(e);try{var l=function(){var e=t.value;if(classes=e.classList,e.animationClasses=[],!f(e)){var n=r.find((function(t){return Array.from(classes).find((function(e){return e===t}))})),o=a.find((function(t){return Array.from(classes).find((function(e){return e===t}))})),l=u.find((function(t){return Array.from(classes).find((function(e){return e===t}))}));e.classList.add("hidden-animated"),n&&(e.animationClasses.push(n),e.classList.remove(n)),o&&(e.animationClasses.push(o),e.classList.remove(o)),l&&(e.animationClasses.push(l),e.classList.remove(l))}i.forEach((function(t){e.className.includes(t)&&e.addEventListener("animationend",(function(){e.classList.remove(t)}))}))};for(o.s();!(t=o.n()).done;)l()}catch(t){o.e(t)}finally{o.f()}window.onscroll=function(){var t,o=n(e);try{var r=function(){var e=t.value;e.getBoundingClientRect().top<=.75*window.innerHeight&&0<e.getBoundingClientRect().top&&(e.animationClasses&&0<e.animationClasses.length&&(e.animationClasses.forEach((function(t){return e.classList.add(t)})),e.classList.remove("hidden-animated"),delete e.animationClasses))};for(o.s();!(t=o.n()).done;)r()}catch(t){o.e(t)}finally{o.f()}}};var f=function(t){var e=window.scrollY||window.pageYOffset,n=t.getBoundingClientRect().top+e,o=e,r=e+window.innerHeight,i=n,a=n+t.clientHeight;return a>=o&&a<=r||i<=r&&i>=o}}]);
!function(){"use strict";var e,t=()=>window.innerWidth<=960,n=function(e,t){for(var n=0;n<e.length;n++)t(e[n])},r=e=>{var t=e.split("#");return t.length>1?t[0]:e},o=(e,t,n)=>{for(var r=e instanceof NodeList?e:[e],o=0;o<r.length;o++)r[o]&&r[o].addEventListener(t,n)},i=(e,t)=>{l(e,t,"toggle")},a=(e,t)=>{l(e,t,"add")},d=(e,t)=>{l(e,t,"remove")},l=(e,t,n)=>{for(var r=t.split(" "),o=e instanceof NodeList?e:[e],i=0;i<o.length;i++)o[i]&&o[i].classList[n].apply(o[i].classList,r)},s=null,u=null,c=2,v=()=>!("enabled"!==NeveProperties.masonry||NeveProperties.masonryColumns<2)&&(null!==(u=document.querySelector(".nv-index-posts .posts-wrapper"))&&void imagesLoaded(u,()=>{s=new Masonry(u,{itemSelector:"article.layout-grid",columnWidth:"article.layout-grid",percentPosition:!0})})),p=()=>"enabled"===NeveProperties.infiniteScroll&&(null!==document.querySelector(".nv-index-posts .posts-wrapper")&&void function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:.5,r=new IntersectionObserver(e=>{e[0].intersectionRatio<=n||t()});r.observe(e)}(document.querySelector(".infinite-scroll-trigger"),()=>{if(parent.wp.customize)return parent.wp.customize.requestChangesetUpdate().then(()=>{m()}),!1;m()})),m=()=>{var e=document.querySelector(".infinite-scroll-trigger");if(null===e)return!1;if(document.querySelector(".nv-loader").style.display="block",c>NeveProperties.infiniteScrollMaxPages)return e.parentNode.removeChild(e),document.querySelector(".nv-loader").style.display="none",!1;var t,r,o,i,a=document.querySelector(".nv-index-posts .posts-wrapper"),d=g(NeveProperties.infiniteScrollEndpoint+c);c++,t=d,r=e=>{if("enabled"!==NeveProperties.masonry)a.innerHTML+=JSON.parse(e);else{var t=document.createElement("div");t.innerHTML=JSON.parse(e),n(t.children,e=>{u.append(e),s.appended(e)})}},o=NeveProperties.infiniteScrollQuery,(i=new XMLHttpRequest).onload=()=>{4===i.readyState&&200===i.status&&r(i.response)},i.onerror=e=>{console.error(e)},i.open("POST",t,!0),i.setRequestHeader("Content-Type","application/json; charset=UTF-8"),i.send(o)},g=e=>void 0===wp.customize?e:(e+="?customize_changeset_uuid="+wp.customize.settings.changeset.uuid+"&customize_autosaved=on","undefined"==typeof _wpCustomizeSettings?e:e+="&customize_preview_nonce="+_wpCustomizeSettings.nonce.preview),y=()=>{var t,o;e=window.location.href,f(),function(){var t=document.querySelectorAll(".nv-nav-wrap a");if(0===t.length)return!1;n(t,t=>{t.addEventListener("click",t=>{var n=t.target.getAttribute("href");if(null===n)return!1;r(n)===r(e)&&window.HFG.toggleMenuSidebar(!1)})})}(),t=document.querySelectorAll(".caret-wrap"),n(t,e=>{e.addEventListener("click",t=>{t.preventDefault();var n=e.parentNode.parentNode.querySelector(".sub-menu");i(e,"dropdown-open"),i(n,"dropdown-open")})}),h(),w(),!0===/(Trident|MSIE|Edge)/.test(window.navigator.userAgent)&&(o=document.querySelectorAll('.header--row[data-show-on="desktop"] .sub-menu'),n(o,e=>{var t=e.parentNode;t.addEventListener("mouseenter",()=>{a(e,"dropdown-open")}),t.addEventListener("mouseleave",()=>{d(e,"dropdown-open")})})),window.HFG.initSearch=function(){h()}},f=()=>{if(t())return!1;var e=document.querySelectorAll(".sub-menu .sub-menu");if(0===e.length)return!1;var r=window.innerWidth;n(e,e=>{var t=e.getBoundingClientRect(),n=t.left;/webkit.*mobile/i.test(navigator.userAgent)&&(t-=window.scrollX),n+t.width>=r&&(e.style.right="100%",e.style.left="auto")})};function h(){var e=document.querySelectorAll(".nv-nav-search"),r=document.querySelectorAll(".menu-item-nav-search"),o=document.querySelectorAll(".close-responsive-search");n(r,e=>{e.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation(),i(e,"active"),e.querySelector(".search-field").focus(),t()||function(e,t){var n=document.querySelector(".nav-clickaway-overlay");if(null!==n)return!1;n=document.createElement("div"),a(n,"nav-clickaway-overlay");var r=document.querySelector("header.header");r.parentNode.insertBefore(n,r),n.addEventListener("click",()=>{d(e,t),n.parentNode.removeChild(n)})}(e,"active")})}),n(e,e=>{e.addEventListener("click",e=>{e.stopPropagation()})}),n(o,e=>{e.addEventListener("click",e=>{e.preventDefault(),n(r,e=>{d(e,"active")});var t=document.querySelector(".nav-clickaway-overlay");null!==t&&t.parentNode.removeChild(t)})})}function w(){var e=document.querySelectorAll(".header--row .nv-nav-cart");0!==e.length&&n(e,e=>{e.getBoundingClientRect().left<0&&(e.style.left=0)})}window.addEventListener("resize",w);var S,b=function(){this.options={menuToggleDuration:300},this.init()};function q(){window.HFG=new b,(()=>{if(null===document.querySelector(".blog.nv-index-posts"))return!1;v(),p()})(),y()}function L(){f()}b.prototype.init=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=".menu-mobile-toggle";!1===e&&(t+=", #header-menu-sidebar .close-panel, .close-sidebar-panel");var r=document.querySelectorAll(t),i=function(e){e.preventDefault(),this.toggleMenuSidebar()};n(r,function(e){e.removeEventListener("click",i.bind(this))}.bind(this)),o(r,"click",i.bind(this));var a=document.querySelector(".header-menu-sidebar-overlay");o(a,"click",function(){this.toggleMenuSidebar(!1)}.bind(this))},b.prototype.toggleMenuSidebar=function(e){var t=document.querySelectorAll(".menu-mobile-toggle");d(document.body,"hiding-header-menu-sidebar"),document.body.classList.contains("is-menu-sidebar")||!1===e?(a(document.body,"hiding-header-menu-sidebar"),d(document.body,"is-menu-sidebar"),d(t,"is-active"),setTimeout(function(){d(document.body,"hiding-header-menu-sidebar")}.bind(this),1e3)):(a(document.body,"is-menu-sidebar"),a(t,"is-active"))},window.addEventListener("load",()=>{q()}),window.addEventListener("resize",()=>{clearTimeout(S),S=setTimeout(L,500)})}();
/*! This file is auto-generated */
window.addComment=function(s){var u,f,v,y=s.document,p={commentReplyClass:"comment-reply-link",cancelReplyId:"cancel-comment-reply-link",commentFormId:"commentform",temporaryFormId:"wp-temp-form-div",parentIdFieldId:"comment_parent",postIdFieldId:"comment_post_ID"},e=s.MutationObserver||s.WebKitMutationObserver||s.MozMutationObserver,i="querySelector"in y&&"addEventListener"in s,n=!!y.documentElement.dataset;function t(){r(),function(){if(!e)return;new e(d).observe(y.body,{childList:!0,subtree:!0})}()}function r(e){if(i&&(u=I(p.cancelReplyId),f=I(p.commentFormId),u)){u.addEventListener("touchstart",a),u.addEventListener("click",a);var t=function(e){if((e.metaKey||e.ctrlKey)&&13===e.keyCode)return f.removeEventListener("keydown",t),e.preventDefault(),f.submit.click(),!1};f&&f.addEventListener("keydown",t);for(var n,r=function(e){var t,n=p.commentReplyClass;e&&e.childNodes||(e=y);t=y.getElementsByClassName?e.getElementsByClassName(n):e.querySelectorAll("."+n);return t}(e),d=0,o=r.length;d<o;d++)(n=r[d]).addEventListener("touchstart",l),n.addEventListener("click",l)}}function a(e){var t=I(p.temporaryFormId);t&&v&&(I(p.parentIdFieldId).value="0",t.parentNode.replaceChild(v,t),this.style.display="none",e.preventDefault())}function l(e){var t=this,n=m(t,"belowelement"),r=m(t,"commentid"),d=m(t,"respondelement"),o=m(t,"postid");n&&r&&d&&o&&!1===s.addComment.moveForm(n,r,d,o)&&e.preventDefault()}function d(e){for(var t=e.length;t--;)if(e[t].addedNodes.length)return void r()}function m(e,t){return n?e.dataset[t]:e.getAttribute("data-"+t)}function I(e){return y.getElementById(e)}return i&&"loading"!==y.readyState?t():i&&s.addEventListener("DOMContentLoaded",t,!1),{init:r,moveForm:function(e,t,n,r){var d=I(e);v=I(n);var o,i,a,l=I(p.parentIdFieldId),m=I(p.postIdFieldId);if(d&&v&&l){!function(e){var t=p.temporaryFormId,n=I(t);if(n)return;(n=y.createElement("div")).id=t,n.style.display="none",e.parentNode.insertBefore(n,e)}(v),r&&m&&(m.value=r),l.value=t,u.style.display="",d.parentNode.insertBefore(v,d.nextSibling),u.onclick=function(){return!1};try{for(var c=0;c<f.elements.length;c++)if(o=f.elements[c],i=!1,"getComputedStyle"in s?a=s.getComputedStyle(o):y.documentElement.currentStyle&&(a=o.currentStyle),(o.offsetWidth<=0&&o.offsetHeight<=0||"hidden"===a.visibility)&&(i=!0),"hidden"!==o.type&&!o.disabled&&!i){o.focus();break}}catch(e){}return!1}}}}(window);
!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=33)}({33:function(e,t){function n(){window.scrollTo({top:0,behavior:"smooth"})}window.addEventListener("load",(function(){!function(){var e=document.getElementById("scroll-to-top");if(!e)return!1;e.addEventListener("click",(function(){n()})),e.addEventListener("keydown",(function(e){"Enter"===e.key&&n()})),window.addEventListener("scroll",(function(){var t=window.pageYOffset,n=scrollOffset.offset;t>n&&(e.style.visibility="visible",e.style.opacity="1"),t<=n&&(e.style.opacity="0",e.style.visibility="hidden")}))}()}))}});
!function(e){var t={};function r(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(o,n,function(t){return e[t]}.bind(null,n));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=34)}({34:function(e,t){function r(){var e=document.querySelectorAll(".header--row.hide-on-mobile.is_sticky"),t=document.querySelectorAll(".header--row.hide-on-desktop.is_sticky");(e.length>0||t.length>0)&&(!function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=document.querySelector(".sticky-header-placeholder"),o=document.querySelector(".hfg_header"),n=document.querySelector(".neve-transparent-header");null===r&&null===n&&((r=document.createElement("div")).classList.add("sticky-header-placeholder"),o.parentNode.insertBefore(r,o.nextSibling));!e&&r&&r.classList.add("hide-on-mobile","hide-on-tablet");!t&&r&&r.classList.add("hide-on-desktop");e&&o.classList.add("has-sticky-rows--mobile");t&&o.classList.add("has-sticky-rows--desktop");null!==r&&(r.style.height=o.offsetHeight+"px")}(t.length>0,e.length>0),o(document.querySelector(".hfg_header"),document.querySelector("header.header")))}function o(e,t){new IntersectionObserver((function(t){if(!0===t[0].isIntersecting)return e.classList.remove("is-stuck"),!1;e.classList.add("is-stuck")}),{rootMargin:"20px 0px 25px 0px"}).observe(t)}function n(){document.querySelectorAll(".footer--row.is_sticky").length>0&&(!function(){var e=document.querySelector(".sticky-footer-placeholder"),t=document.querySelector(".hfg_footer");null===e&&((e=document.createElement("div")).classList.add("sticky-footer-placeholder"),t.parentNode.insertBefore(e,t.nextSibling));t.classList.add("has-sticky-rows"),e.style.height=t.offsetHeight+"px"}(),o(document.querySelector(".hfg_footer"),document.querySelector("footer")))}var i;window.addEventListener("load",(function(){r(),n()})),window.addEventListener("selective-refresh-content-rendered",(function(e){if("hfg_header_layout_partial"===e.detail){var t=document.querySelector(".sticky-header-placeholder"),o=document.querySelector(".hfg_header");t&&t.remove(),o.classList.remove("has-sticky-rows--mobile","has-sticky-rows--desktop"),r()}if("hfg_footer_layout_partial"===e.detail){var i=document.querySelector(".hfg_footer"),c=document.querySelector(".sticky-footer-placeholder");c&&c.remove(),i.classList.remove("has-sticky-rows"),n()}})),window.addEventListener("resize",(function(){clearTimeout(i),i=setTimeout((function(){r(),n()}),500)}))}});
/*! This file is auto-generated */
!function(d,l){"use strict";var e=!1,o=!1;if(l.querySelector)if(d.addEventListener)e=!0;if(d.wp=d.wp||{},!d.wp.receiveEmbedMessage)if(d.wp.receiveEmbedMessage=function(e){var t=e.data;if(t)if(t.secret||t.message||t.value)if(!/[^a-zA-Z0-9]/.test(t.secret)){var r,a,i,s,n,o=l.querySelectorAll('iframe[data-secret="'+t.secret+'"]'),c=l.querySelectorAll('blockquote[data-secret="'+t.secret+'"]');for(r=0;r<c.length;r++)c[r].style.display="none";for(r=0;r<o.length;r++)if(a=o[r],e.source===a.contentWindow){if(a.removeAttribute("style"),"height"===t.message){if(1e3<(i=parseInt(t.value,10)))i=1e3;else if(~~i<200)i=200;a.height=i}if("link"===t.message)if(s=l.createElement("a"),n=l.createElement("a"),s.href=a.getAttribute("src"),n.href=t.value,n.host===s.host)if(l.activeElement===a)d.top.location.href=t.value}}},e)d.addEventListener("message",d.wp.receiveEmbedMessage,!1),l.addEventListener("DOMContentLoaded",t,!1),d.addEventListener("load",t,!1);function t(){if(!o){o=!0;var e,t,r,a,i=-1!==navigator.appVersion.indexOf("MSIE 10"),s=!!navigator.userAgent.match(/Trident.*rv:11\./),n=l.querySelectorAll("iframe.wp-embedded-content");for(t=0;t<n.length;t++){if(!(r=n[t]).getAttribute("data-secret"))a=Math.random().toString(36).substr(2,10),r.src+="#?secret="+a,r.setAttribute("data-secret",a);if(i||s)(e=r.cloneNode(!0)).removeAttribute("security"),r.parentNode.replaceChild(e,r)}}}}(window,document);
/*This file was exported by "Export WP Page to Static HTML" plugin which created by ReCorp (https://myrecorp.com) */