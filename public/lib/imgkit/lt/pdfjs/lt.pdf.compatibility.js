/* Copyright 2017 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
if(!("undefined"!==typeof PDFJSDev&&PDFJSDev.test("FIREFOX || MOZCENTRAL || CHROME")||"undefined"!==typeof PDFJS&&PDFJS.compatibilityChecked)){var globalScope="undefined"!==typeof window?window:"undefined"!==typeof global?global:"undefined"!==typeof self?self:this,userAgent="undefined"!==typeof navigator&&navigator.userAgent||"",isAndroid=/Android/.test(userAgent),isAndroidPre3=/Android\s[0-2][^\d]/.test(userAgent),isAndroidPre5=/Android\s[0-4][^\d]/.test(userAgent),isChrome=0<=userAgent.indexOf("Chrom"),
isChromeWithRangeBug=/Chrome\/(39|40)\./.test(userAgent),isIOSChrome=0<=userAgent.indexOf("CriOS"),isIE=0<=userAgent.indexOf("Trident"),isIOS=/\b(iPad|iPhone|iPod)(?=;)/.test(userAgent),isOpera=0<=userAgent.indexOf("Opera"),isSafari=/Safari\//.test(userAgent)&&!/(Chrome\/|Android\s)/.test(userAgent),hasDOM="object"===typeof window&&"object"===typeof document;"undefined"===typeof PDFJS&&(globalScope.PDFJS={});PDFJS.compatibilityChecked=!0;(function(){function b(a,c){return new h(this.slice(a,c))}function e(a,
c){2>arguments.length&&(c=0);for(var b=0,e=a.length;b<e;++b,++c)this[c]=a[b]&255}function a(b,e){this.buffer=b;this.byteLength=b.length;for(b=this.length=e;f<b;)Object.defineProperty(a.prototype,f,c(f)),f++}function c(a){return{get:function(){var c=this.buffer,b=a<<2;return(c[b]|c[b+1]<<8|c[b+2]<<16|c[b+3]<<24)>>>0},set:function(c){var b=this.buffer,e=a<<2;b[e]=c&255;b[e+1]=c>>8&255;b[e+2]=c>>16&255;b[e+3]=c>>>24&255}}}function h(a){var c,h;if("number"===typeof a){var f=[];for(c=0;c<a;++c)f[c]=0}else if("slice"in
a)f=a.slice(0);else for(f=[],c=0,h=a.length;c<h;++c)f[c]=a[c];f.subarray=b;f.buffer=f;f.byteLength=f.length;f.set=e;"object"===typeof a&&a.buffer&&(f.buffer=a.buffer);return f}if("undefined"!==typeof Uint8Array)"undefined"===typeof Uint8Array.prototype.subarray&&(Uint8Array.prototype.subarray=function(a,c){return new Uint8Array(this.slice(a,c))},Float32Array.prototype.subarray=function(a,c){return new Float32Array(this.slice(a,c))}),"undefined"===typeof Float64Array&&(globalScope.Float64Array=Float32Array);
else{a.prototype=Object.create(null);var f=0;globalScope.Uint8Array=h;globalScope.Int8Array=h;globalScope.Int32Array=h;globalScope.Uint16Array=h;globalScope.Float32Array=h;globalScope.Float64Array=h;globalScope.Uint32Array=function(){if(3===arguments.length){if(0!==arguments[1])throw Error("offset !== 0 is not supported");return new a(arguments[0],arguments[2])}return h.apply(this,arguments)}}})();(function(){if(hasDOM&&window.CanvasPixelArray){var b=window.CanvasPixelArray.prototype;"buffer"in b||
(Object.defineProperty(b,"buffer",{get:function(){return this},enumerable:!1,configurable:!0}),Object.defineProperty(b,"byteLength",{get:function(){return this.length},enumerable:!1,configurable:!0}))}})();(function(){globalScope.URL||(globalScope.URL=globalScope.webkitURL)})();(function(){if("undefined"!==typeof Object.defineProperty){var b=!0;try{hasDOM&&Object.defineProperty(new Image,"id",{value:"test"});var e=function(){};e.prototype={get id(){}};Object.defineProperty(new e,"id",{value:"",configurable:!0,
enumerable:!0,writable:!1})}catch(a){b=!1}if(b)return}Object.defineProperty=function(a,c,b){delete a[c];"get"in b&&a.__defineGetter__(c,b.get);"set"in b&&a.__defineSetter__(c,b.set);"value"in b&&(a.__defineSetter__(c,function(a){this.__defineGetter__(c,function(){return a});return a}),a[c]=b.value)}})();(function(){if("undefined"!==typeof XMLHttpRequest){var b=XMLHttpRequest.prototype,e=new XMLHttpRequest;"overrideMimeType"in e||Object.defineProperty(b,"overrideMimeType",{value:function(a){}});"responseType"in
e||(Object.defineProperty(b,"responseType",{get:function(){return this._responseType||"text"},set:function(a){if("text"===a||"arraybuffer"===a)this._responseType=a,"arraybuffer"===a&&"function"===typeof this.overrideMimeType&&this.overrideMimeType("text/plain; charset=x-user-defined")}}),"undefined"!==typeof VBArray?Object.defineProperty(b,"response",{get:function(){return"arraybuffer"===this.responseType?new Uint8Array((new VBArray(this.responseBody)).toArray()):this.responseText}}):Object.defineProperty(b,
"response",{get:function(){if("arraybuffer"!==this.responseType)return this.responseText;var a=this.responseText,c,b=a.length,e=new Uint8Array(b);for(c=0;c<b;++c)e[c]=a.charCodeAt(c)&255;return e.buffer}}))}})();(function(){"btoa"in globalScope||(globalScope.btoa=function(b){var e="",a;var c=0;for(a=b.length;c<a;c+=3)var h=b.charCodeAt(c)&255,f=b.charCodeAt(c+1)&255,l=b.charCodeAt(c+2)&255,r=(h&3)<<4|f>>4,f=c+1<a?(f&15)<<2|l>>6:64,l=c+2<a?l&63:64,e=e+("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(h>>
2)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(r)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(f)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(l));return e})})();(function(){"atob"in globalScope||(globalScope.atob=function(b){b=b.replace(/=+$/,"");if(1===b.length%4)throw Error("bad atob input");for(var e=0,a,c,h=0,f="";c=b.charAt(h++);~c&&(a=e%4?64*a+c:c,e++%4)?f+=String.fromCharCode(255&a>>(-2*e&6)):0)c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(c);
return f})})();(function(){"undefined"===typeof Function.prototype.bind&&(Function.prototype.bind=function(b){var e=this,a=Array.prototype.slice.call(arguments,1);return function(){var c=a.concat(Array.prototype.slice.call(arguments));return e.apply(b,c)}})})();(function(){hasDOM&&("dataset"in document.createElement("div")||Object.defineProperty(HTMLElement.prototype,"dataset",{get:function(){if(this._dataset)return this._dataset;for(var b={},e=0,a=this.attributes.length;e<a;e++){var c=this.attributes[e];
if("data-"===c.name.substring(0,5)){var h=c.name.substring(5).replace(/\-([a-z])/g,function(a,c){return c.toUpperCase()});b[h]=c.value}}Object.defineProperty(this,"_dataset",{value:b,writable:!1,enumerable:!1});return b},enumerable:!0}))})();(function(){function b(a,c,b,e){var f=(a.className||"").split(/\s+/g);""===f[0]&&f.shift();var h=f.indexOf(c);0>h&&b&&f.push(c);0<=h&&e&&f.splice(h,1);a.className=f.join(" ");return 0<=h}if(hasDOM&&!("classList"in document.createElement("div"))){var e={add:function(a){b(this.element,
a,!0,!1)},contains:function(a){return b(this.element,a,!1,!1)},remove:function(a){b(this.element,a,!1,!0)},toggle:function(a){b(this.element,a,!0,!0)}};Object.defineProperty(HTMLElement.prototype,"classList",{get:function(){if(this._classList)return this._classList;var a=Object.create(e,{element:{value:this,writable:!1,enumerable:!0}});Object.defineProperty(this,"_classList",{value:a,writable:!1,enumerable:!1});return a},enumerable:!0})}})();(function(){if(!("undefined"===typeof importScripts||"console"in
globalScope)){var b={};globalScope.console={log:function(){var b=Array.prototype.slice.call(arguments);globalScope.postMessage({targetName:"main",action:"console_log",data:b})},error:function(){var b=Array.prototype.slice.call(arguments);globalScope.postMessage({targetName:"main",action:"console_error",data:b})},time:function(e){b[e]=Date.now()},timeEnd:function(e){var a=b[e];if(!a)throw Error("Unknown timer name "+e);this.log("Timer:",e,Date.now()-a)}}}})();(function(){hasDOM&&("console"in window?
"bind"in console.log||(console.log=function(b){return function(e){return b(e)}}(console.log),console.error=function(b){return function(e){return b(e)}}(console.error),console.warn=function(b){return function(e){return b(e)}}(console.warn)):window.console={log:function(){},error:function(){},warn:function(){}})})();(function(){function b(a){e(a.target)&&a.stopPropagation()}function e(a){return a.disabled||a.parentNode&&e(a.parentNode)}isOpera&&document.addEventListener("click",b,!0)})();(function(){if(isIE||
isIOSChrome)PDFJS.disableCreateObjectURL=!0})();(function(){"undefined"===typeof navigator||"language"in navigator||(PDFJS.locale=navigator.userLanguage||"en-US")})();(function(){if(isSafari||isAndroidPre3||isChromeWithRangeBug||isIOS)PDFJS.disableRange=!0,PDFJS.disableStream=!0})();(function(){!hasDOM||history.pushState&&!isAndroidPre3||(PDFJS.disableHistory=!0)})();(function(){if(hasDOM)if(window.CanvasPixelArray)"function"!==typeof window.CanvasPixelArray.prototype.set&&(window.CanvasPixelArray.prototype.set=
function(a){for(var c=0,b=this.length;c<b;c++)this[c]=a[c]});else{var b=!1;isChrome?b=(b=userAgent.match(/Chrom(e|ium)\/([0-9]+)\./))&&21>parseInt(b[2]):isAndroid?b=isAndroidPre5:isSafari&&(b=(b=userAgent.match(/Version\/([0-9]+)\.([0-9]+)\.([0-9]+) Safari\//))&&6>parseInt(b[1]));if(b){var b=window.CanvasRenderingContext2D.prototype,e=b.createImageData;b.createImageData=function(a,c){a=e.call(this,a,c);a.data.set=function(a){for(var c=0,b=this.length;c<b;c++)this[c]=a[c]};return a};b=null}}})();(function(){function b(){window.requestAnimationFrame=
function(b){return window.setTimeout(b,20)};window.cancelAnimationFrame=function(b){window.clearTimeout(b)}}hasDOM&&(isIOS?b():"requestAnimationFrame"in window||(window.requestAnimationFrame=window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame,window.requestAnimationFrame||b()))})();(function(){if(isIOS||isAndroid)PDFJS.maxCanvasPixels=5242880})();(function(){hasDOM&&isIE&&window.parent!==window&&(PDFJS.disableFullscreen=!0)})();(function(){hasDOM&&("currentScript"in document||Object.defineProperty(document,
"currentScript",{get:function(){var b=document.getElementsByTagName("script");return b[b.length-1]},enumerable:!0,configurable:!0}))})();(function(){if(hasDOM){var b=document.createElement("input");try{b.type="number"}catch(a){var b=b.constructor.prototype,e=Object.getOwnPropertyDescriptor(b,"type");Object.defineProperty(b,"type",{get:function(){return e.get.call(this)},set:function(a){e.set.call(this,"number"===a?"text":a)},enumerable:!0,configurable:!0})}}})();(function(){if(hasDOM&&document.attachEvent){var b=
document.constructor.prototype,e=Object.getOwnPropertyDescriptor(b,"readyState");Object.defineProperty(b,"readyState",{get:function(){var a=e.get.call(this);return"interactive"===a?"loading":a},set:function(a){e.set.call(this,a)},enumerable:!0,configurable:!0})}})();(function(){hasDOM&&"undefined"===typeof Element.prototype.remove&&(Element.prototype.remove=function(){this.parentNode&&this.parentNode.removeChild(this)})})();(function(){if(globalScope.Promise)"function"!==typeof globalScope.Promise.all&&
(globalScope.Promise.all=function(a){var c=0,b=[],e,l,r=new globalScope.Promise(function(a,c){e=a;l=c});a.forEach(function(a,f){c++;a.then(function(a){b[f]=a;c--;0===c&&e(b)},l)});0===c&&e(b);return r}),"function"!==typeof globalScope.Promise.resolve&&(globalScope.Promise.resolve=function(a){return new globalScope.Promise(function(c){c(a)})}),"function"!==typeof globalScope.Promise.reject&&(globalScope.Promise.reject=function(a){return new globalScope.Promise(function(c,b){b(a)})}),"function"!==typeof globalScope.Promise.prototype.catch&&
(globalScope.Promise.prototype.catch=function(a){return globalScope.Promise.prototype.then(void 0,a)});else{var b={handlers:[],running:!1,unhandledRejections:[],pendingRejectionCheck:!1,scheduleHandlers:function(a){0!==a._status&&(this.handlers=this.handlers.concat(a._handlers),a._handlers=[],this.running||(this.running=!0,setTimeout(this.runHandlers.bind(this),0)))},runHandlers:function(){for(var a=Date.now()+1;0<this.handlers.length;){var c=this.handlers.shift(),b=c.thisPromise._status,e=c.thisPromise._value;
try{1===b?"function"===typeof c.onResolve&&(e=c.onResolve(e)):"function"===typeof c.onReject&&(e=c.onReject(e),b=1,c.thisPromise._unhandledRejection&&this.removeUnhandeledRejection(c.thisPromise))}catch(l){b=2,e=l}c.nextPromise._updateStatus(b,e);if(Date.now()>=a)break}0<this.handlers.length?setTimeout(this.runHandlers.bind(this),0):this.running=!1},addUnhandledRejection:function(a){this.unhandledRejections.push({promise:a,time:Date.now()});this.scheduleRejectionCheck()},removeUnhandeledRejection:function(a){a._unhandledRejection=
!1;for(var b=0;b<this.unhandledRejections.length;b++)this.unhandledRejections[b].promise===a&&(this.unhandledRejections.splice(b),b--)},scheduleRejectionCheck:function(){var a=this;this.pendingRejectionCheck||(this.pendingRejectionCheck=!0,setTimeout(function(){a.pendingRejectionCheck=!1;for(var b=Date.now(),e=0;e<a.unhandledRejections.length;e++)if(500<b-a.unhandledRejections[e].time){var f=a.unhandledRejections[e].promise._value,l="Unhandled rejection: "+f;f.stack&&(l+="\n"+f.stack);try{throw Error(l);
}catch(r){console.warn(l)}a.unhandledRejections.splice(e);e--}a.unhandledRejections.length&&a.scheduleRejectionCheck()},500))}},e=function(a){this._status=0;this._handlers=[];try{a.call(this,this._resolve.bind(this),this._reject.bind(this))}catch(c){this._reject(c)}};e.all=function(a){function b(a){2!==l._status&&(q=[],f(a))}var h,f,l=new e(function(a,b){h=a;f=b}),r=a.length,q=[];if(0===r)return h(q),l;for(var u=0,t=a.length;u<t;++u){var v=a[u],x=function(a){return function(b){2!==l._status&&(q[a]=
b,r--,0===r&&h(q))}}(u);e.isPromise(v)?v.then(x,b):x(v)}return l};e.isPromise=function(a){return a&&"function"===typeof a.then};e.resolve=function(a){return new e(function(b){b(a)})};e.reject=function(a){return new e(function(b,e){e(a)})};e.prototype={_status:null,_value:null,_handlers:null,_unhandledRejection:null,_updateStatus:function(a,c){1!==this._status&&2!==this._status&&(1===a&&e.isPromise(c)?c.then(this._updateStatus.bind(this,1),this._updateStatus.bind(this,2)):(this._status=a,this._value=
c,2===a&&0===this._handlers.length&&(this._unhandledRejection=!0,b.addUnhandledRejection(this)),b.scheduleHandlers(this)))},_resolve:function(a){this._updateStatus(1,a)},_reject:function(a){this._updateStatus(2,a)},then:function(a,c){var h=new e(function(a,b){this.resolve=a;this.reject=b});this._handlers.push({thisPromise:this,onResolve:a,onReject:c,nextPromise:h});b.scheduleHandlers(this);return h},catch:function(a){return this.then(void 0,a)}};globalScope.Promise=e}})();(function(){function b(){this.id=
"$weakmap"+e++}if(!globalScope.WeakMap){var e=0;b.prototype={has:function(a){return!!Object.getOwnPropertyDescriptor(a,this.id)},get:function(a,b){return this.has(a)?a[this.id]:b},set:function(a,b){Object.defineProperty(a,this.id,{value:b,enumerable:!1,configurable:!0})},delete:function(a){delete a[this.id]}};globalScope.WeakMap=b}})();(function(){function b(a){""===a&&(h.call(this),this._isInvalid=!0);return a.toLowerCase()}function e(a){var b=a.charCodeAt(0);return 32<b&&127>b&&-1===[34,35,60,62,
63,96].indexOf(b)?a:encodeURIComponent(a)}function a(a){var b=a.charCodeAt(0);return 32<b&&127>b&&-1===[34,35,60,62,96].indexOf(b)?a:encodeURIComponent(a)}function c(c,f,m){function n(a){w.push(a)}var k=f||"scheme start",l=0,g="",r=!1,y=!1,w=[];a:for(;(c[l-1]!==t||0===l)&&!this._isInvalid;){var d=c[l];switch(k){case "scheme start":if(d&&v.test(d))g+=d.toLowerCase(),k="scheme";else if(f){n("Invalid scheme.");break a}else{g="";k="no scheme";continue}break;case "scheme":if(d&&x.test(d))g+=d.toLowerCase();
else if(":"===d){this._scheme=g;g="";if(f)break a;void 0!==q[this._scheme]&&(this._isRelative=!0);k="file"===this._scheme?"relative":this._isRelative&&m&&m._scheme===this._scheme?"relative or authority":this._isRelative?"authority first slash":"scheme data"}else if(f){d!==t&&n("Code point not allowed in scheme: "+d);break a}else{g="";l=0;k="no scheme";continue}break;case "scheme data":"?"===d?(this._query="?",k="query"):"#"===d?(this._fragment="#",k="fragment"):d!==t&&"\t"!==d&&"\n"!==d&&"\r"!==d&&
(this._schemeData+=e(d));break;case "no scheme":if(m&&void 0!==q[m._scheme]){k="relative";continue}else n("Missing scheme."),h.call(this),this._isInvalid=!0;break;case "relative or authority":if("/"===d&&"/"===c[l+1])k="authority ignore slashes";else{n("Expected /, got: "+d);k="relative";continue}break;case "relative":this._isRelative=!0;"file"!==this._scheme&&(this._scheme=m._scheme);if(d===t){this._host=m._host;this._port=m._port;this._path=m._path.slice();this._query=m._query;this._username=m._username;
this._password=m._password;break a}else if("/"===d||"\\"===d)"\\"===d&&n("\\ is an invalid code point."),k="relative slash";else if("?"===d)this._host=m._host,this._port=m._port,this._path=m._path.slice(),this._query="?",this._username=m._username,this._password=m._password,k="query";else if("#"===d)this._host=m._host,this._port=m._port,this._path=m._path.slice(),this._query=m._query,this._fragment="#",this._username=m._username,this._password=m._password,k="fragment";else{var k=c[l+1],p=c[l+2];if("file"!==
this._scheme||!v.test(d)||":"!==k&&"|"!==k||p!==t&&"/"!==p&&"\\"!==p&&"?"!==p&&"#"!==p)this._host=m._host,this._port=m._port,this._username=m._username,this._password=m._password,this._path=m._path.slice(),this._path.pop();k="relative path";continue}break;case "relative slash":if("/"===d||"\\"===d)"\\"===d&&n("\\ is an invalid code point."),k="file"===this._scheme?"file host":"authority ignore slashes";else{"file"!==this._scheme&&(this._host=m._host,this._port=m._port,this._username=m._username,this._password=
m._password);k="relative path";continue}break;case "authority first slash":if("/"===d)k="authority second slash";else{n("Expected '/', got: "+d);k="authority ignore slashes";continue}break;case "authority second slash":k="authority ignore slashes";if("/"!==d){n("Expected '/', got: "+d);continue}break;case "authority ignore slashes":if("/"!==d&&"\\"!==d){k="authority";continue}else n("Expected authority, got: "+d);break;case "authority":if("@"===d){r&&(n("@ already seen."),g+="%40");r=!0;for(d=0;d<
g.length;d++)p=g[d],"\t"===p||"\n"===p||"\r"===p?n("Invalid whitespace in authority."):":"===p&&null===this._password?this._password="":(p=e(p),null!==this._password?this._password+=p:this._username+=p);g=""}else if(d===t||"/"===d||"\\"===d||"?"===d||"#"===d){l-=g.length;g="";k="host";continue}else g+=d;break;case "file host":if(d===t||"/"===d||"\\"===d||"?"===d||"#"===d){2!==g.length||!v.test(g[0])||":"!==g[1]&&"|"!==g[1]?(0!==g.length&&(this._host=b.call(this,g),g=""),k="relative path start"):k=
"relative path";continue}else"\t"===d||"\n"===d||"\r"===d?n("Invalid whitespace in file host."):g+=d;break;case "host":case "hostname":if(":"!==d||y)if(d===t||"/"===d||"\\"===d||"?"===d||"#"===d){this._host=b.call(this,g);g="";k="relative path start";if(f)break a;continue}else"\t"!==d&&"\n"!==d&&"\r"!==d?("["===d?y=!0:"]"===d&&(y=!1),g+=d):n("Invalid code point in host/hostname: "+d);else if(this._host=b.call(this,g),g="",k="port","hostname"===f)break a;break;case "port":if(/[0-9]/.test(d))g+=d;else if(d===
t||"/"===d||"\\"===d||"?"===d||"#"===d||f){""!==g&&(g=parseInt(g,10),g!==q[this._scheme]&&(this._port=g+""),g="");if(f)break a;k="relative path start";continue}else"\t"===d||"\n"===d||"\r"===d?n("Invalid code point in port: "+d):(h.call(this),this._isInvalid=!0);break;case "relative path start":"\\"===d&&n("'\\' not allowed in path.");k="relative path";if("/"!==d&&"\\"!==d)continue;break;case "relative path":if(d!==t&&"/"!==d&&"\\"!==d&&(f||"?"!==d&&"#"!==d))"\t"!==d&&"\n"!==d&&"\r"!==d&&(g+=e(d));
else{"\\"===d&&n("\\ not allowed in relative path.");if(p=u[g.toLowerCase()])g=p;".."===g?(this._path.pop(),"/"!==d&&"\\"!==d&&this._path.push("")):"."===g&&"/"!==d&&"\\"!==d?this._path.push(""):"."!==g&&("file"===this._scheme&&0===this._path.length&&2===g.length&&v.test(g[0])&&"|"===g[1]&&(g=g[0]+":"),this._path.push(g));g="";"?"===d?(this._query="?",k="query"):"#"===d&&(this._fragment="#",k="fragment")}break;case "query":f||"#"!==d?d!==t&&"\t"!==d&&"\n"!==d&&"\r"!==d&&(this._query+=a(d)):(this._fragment=
"#",k="fragment");break;case "fragment":d!==t&&"\t"!==d&&"\n"!==d&&"\r"!==d&&(this._fragment+=d)}l++}}function h(){this._username=this._schemeData=this._scheme="";this._password=null;this._port=this._host="";this._path=[];this._fragment=this._query="";this._isRelative=this._isInvalid=!1}function f(a,b){void 0===b||b instanceof f||(b=new f(String(b)));this._url=a;h.call(this);a=a.replace(/^[ \t\r\n\f]+|[ \t\r\n\f]+$/g,"");c.call(this,a,null,b)}var l=!1;try{if("function"===typeof URL&&"object"===typeof URL.prototype&&
"origin"in URL.prototype){var r=new URL("b","http://a");r.pathname="c%20d";l="http://a/c%20d"===r.href}}catch(n){}if(!l){var q=Object.create(null);q.ftp=21;q.file=0;q.gopher=70;q.http=80;q.https=443;q.ws=80;q.wss=443;var u=Object.create(null);u["%2e"]=".";u[".%2e"]="..";u["%2e."]="..";u["%2e%2e"]="..";var t,v=/[a-zA-Z]/,x=/[a-zA-Z0-9\+\-\.]/;f.prototype={toString:function(){return this.href},get href(){if(this._isInvalid)return this._url;var a="";if(""!==this._username||null!==this._password)a=this._username+
(null!==this._password?":"+this._password:"")+"@";return this.protocol+(this._isRelative?"//"+a+this.host:"")+this.pathname+this._query+this._fragment},set href(a){h.call(this);c.call(this,a)},get protocol(){return this._scheme+":"},set protocol(a){this._isInvalid||c.call(this,a+":","scheme start")},get host(){return this._isInvalid?"":this._port?this._host+":"+this._port:this._host},set host(a){!this._isInvalid&&this._isRelative&&c.call(this,a,"host")},get hostname(){return this._host},set hostname(a){!this._isInvalid&&
this._isRelative&&c.call(this,a,"hostname")},get port(){return this._port},set port(a){!this._isInvalid&&this._isRelative&&c.call(this,a,"port")},get pathname(){return this._isInvalid?"":this._isRelative?"/"+this._path.join("/"):this._schemeData},set pathname(a){!this._isInvalid&&this._isRelative&&(this._path=[],c.call(this,a,"relative path start"))},get search(){return this._isInvalid||!this._query||"?"===this._query?"":this._query},set search(a){!this._isInvalid&&this._isRelative&&(this._query=
"?","?"===a[0]&&(a=a.slice(1)),c.call(this,a,"query"))},get hash(){return this._isInvalid||!this._fragment||"#"===this._fragment?"":this._fragment},set hash(a){this._isInvalid||(this._fragment="#","#"===a[0]&&(a=a.slice(1)),c.call(this,a,"fragment"))},get origin(){var a;if(this._isInvalid||!this._scheme)return"";switch(this._scheme){case "data":case "file":case "javascript":case "mailto":return"null"}return(a=this.host)?this._scheme+"://"+a:""}};var w=globalScope.URL;w&&(f.createObjectURL=function(a){return w.createObjectURL.apply(w,
arguments)},f.revokeObjectURL=function(a){w.revokeObjectURL(a)});globalScope.URL=f}})()};