(function(t){function e(e){for(var n,o,s=e[0],c=e[1],u=e[2],d=0,f=[];d<s.length;d++)o=s[d],Object.prototype.hasOwnProperty.call(i,o)&&i[o]&&f.push(i[o][0]),i[o]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);l&&l(e);while(f.length)f.shift()();return a.push.apply(a,u||[]),r()}function r(){for(var t,e=0;e<a.length;e++){for(var r=a[e],n=!0,s=1;s<r.length;s++){var c=r[s];0!==i[c]&&(n=!1)}n&&(a.splice(e--,1),t=o(o.s=r[0]))}return t}var n={},i={app:0},a=[];function o(e){if(n[e])return n[e].exports;var r=n[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=t,o.c=n,o.d=function(t,e,r){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)o.d(r,n,function(e){return t[e]}.bind(null,n));return r},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var u=0;u<s.length;u++)e(s[u]);var l=c;a.push([0,"chunk-vendors"]),r()})({0:function(t,e,r){t.exports=r("56d7")},"00ba":function(t,e,r){"use strict";var n=r("ba92"),i=r.n(n);i.a},"029d":function(t,e,r){"use strict";var n=r("e52c"),i=r.n(n);i.a},"0aea":function(t,e,r){},"131b":function(t,e,r){"use strict";var n=r("2b4f"),i=r.n(n);i.a},"1a52":function(t,e,r){"use strict";var n=r("2a39"),i=r.n(n);i.a},"1a89":function(t,e,r){"use strict";var n=r("49b5"),i=r.n(n);i.a},"219a":function(t,e,r){},2338:function(t,e,r){},2469:function(t,e,r){"use strict";var n=r("ed51"),i=r.n(n);i.a},"2a39":function(t,e,r){},"2b4f":function(t,e,r){},4389:function(t,e,r){},"439e":function(t,e,r){"use strict";var n=r("6873"),i=r.n(n);i.a},"49b5":function(t,e,r){},"56d7":function(t,e,r){"use strict";r.r(e);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"app"}},[r("Header",{scopedSlots:t._u([{key:"left",fn:function(){},proxy:!0},{key:"right",fn:function(){},proxy:!0}])}),r("AppFrame",{attrs:{rect:t.rect}},[r("Vid",{on:{ready:t.readyVideo}}),r("Picture",{ref:"picture",attrs:{src:t.src,rect:t.rect}}),r("ContextConsumer",{attrs:{contextKey:[t.POINTS_KEY.EYES,"PRODUCT_ID","PRODUCTS"]},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.context;return[t.shooted?r("FaceMesh",{ref:"mesh",attrs:{rect:t.rect,products:n["PRODUCTS"],productId:n["PRODUCT_ID"],points:n[t.POINTS_KEY.EYES],zIndex:5}}):t._e(),t.shooted?r("Eyes",{ref:"eyes",attrs:{rect:t.rect,products:n["PRODUCTS"],productId:n["PRODUCT_ID"],points:n[t.POINTS_KEY.EYES],zIndex:4}}):t._e()]}}])})],1),t.shooted?t._e():r("Shoot",{on:{shoot:t.shoot}}),t.shooted?r("ProductFrame",{attrs:{rect:t.rect}},[r("transition",{attrs:{name:"product-fade"}},[t.shooted?r("div",{staticClass:"products-list"},[r("ContextConsumer",{attrs:{contextKey:["PRODUCTS","CATEGORY"]},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.context;return[r("ProductList",{attrs:{productType:t.PRODUCT_TYPE.MAKEUP,products:n["PRODUCTS"],categoryId:n["CATEGORY"]},on:{setProductId:t.setProductId}}),r("transition",{attrs:{name:"slide-fade"}},[r("CategoryList",{attrs:{productType:t.PRODUCT_TYPE.MAKEUP,items:n["PRODUCTS"]}})],1)]}}],null,!1,1451714873)})],1):t._e()])],1):t._e(),r("AppFrame",{attrs:{rect:t.rect}},[t.shooted?r("Clear",{on:{action:t.clearPicture}}):t._e()],1),t.onFlash?r("div",{attrs:{id:"white"}}):t._e()],1)},a=[],o=(r("96cf"),r("89ba")),s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("header",{staticClass:"global-header"},[r("div",[t._t("left")],2),r("h1",{staticClass:"logo"},[t._v("facy")]),r("div",[t._t("right")],2)])},c=[],u=(r("1a89"),r("2877")),l={},d=Object(u["a"])(l,s,c,!1,null,"48b23425",null),f=d.exports,h=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{ref:"videoframe",staticClass:"videoFrame"},[r("video",{ref:"video",staticClass:"video",attrs:{id:"srcVideo",playsinline:"",muted:"",autoplay:""},domProps:{muted:!0}})])},p=[],m=(r("d3b7"),r("2ef0")),g=(r("ac1f"),r("841c"),r("1276"),function(){for(var t={},e=location.search.substring(1).split("&"),r=0;e[r];r++){var n=e[r].split("=");t[n[0]]=n[1]}return t}),v=(document.location.hostname,g()),y=m["has"](v,"preview"),b=y?375:window.innerWidth,w=y?812:window.innerHeight,O=(window.devicePixelRatio,function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{left:0};console.log("option",e.left);var r={w:t.videoWidth,h:t.videoHeight},n=w/r.h,i={w:r.w*n,h:w},a=(i.w-b)/2,o=(i.h-w)/2,s={width:i.w+"px",height:i.h+"px",left:-a-e.left+"px",top:-o+"px"},c={x:a,y:o,width:i.w,height:i.h,rate:n};return t.width=i.w,t.height=i.h,t.style.width=s.width,t.style.height=s.height,t.style.left=s.left,t.style.top=s.top,console.log("video_rect.width",c.width,i.w),{src:t,rect:c}}),_={name:"vid",data:function(){return{}},mounted:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e,r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.initCamera(this.$refs.video);case 2:e=this.videoFramAdjust(),r=e.left,n=O(this.$refs.video,{left:r}),this.$emit("ready",n);case 5:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),methods:{videoFramAdjust:function(){var t=this.$refs.videoframe.getBoundingClientRect(),e=(b-t.width)/2;return{left:e}},initCamera:function(t){return new Promise((function(e,r){var n=navigator.mediaDevices.getUserMedia({audio:!1,video:{facingMode:"user"}});n.then((function(r){t.muted=!0,t.playsinline=!0,t.onloadedmetadata=function(t){e(!0)},t.srcObject=r})).catch((function(t){alert(t),r(!1)}))}))}}},x=_,j=(r("db90"),Object(u["a"])(x,h,p,!1,null,"649d3ad4",null)),C=j.exports,P=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{ref:"pictureFrame",staticClass:"pictureFrame"},[r("LoadingOverlay",{attrs:{loading:t.loading},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.context;return[r("canvas",{ref:"image2",staticClass:"clopImage",class:n,attrs:{id:"image2",width:t.frame_rect.width,height:t.frame_rect.height}})]}}])})],1)},E=[],T=(r("a4d3"),r("4de4"),r("4160"),r("e439"),r("dbb4"),r("b64b"),r("159b"),r("2fa7")),S=r("bc3a"),R=r.n(S),$=location.origin+"/data/facy-data.json",A="http://127.0.0.1:5000/api";function k(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function I(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?k(r,!0).forEach((function(e){Object(T["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):k(r).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var D=function(t){var e=function(t){return 200===t.status?I({result:!0},t):(503===t.data.status&&alert("メンテナンス中"),I({result:!1},t))},r=function(t){return I({result:!1},t.response)};return R()(t).then(e).catch(r)},U={get:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(e){var r,n,i=arguments;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=i.length>1&&void 0!==i[1]?i[1]:{},t.next=3,D({method:"GET",url:e,params:r});case 3:return n=t.sent,t.abrupt("return",n);case 5:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),post:function(t,e){return D({method:"POST",url:t,data:e,headers:{"Content-type":"application/json; charset=UTF-8"}})},put:function(t,e){return D({method:"POST",url:t,data:e,headers:{"Content-type":"application/json; charset=UTF-8"}})},delete:function(t,e){return D({method:"DELETE",url:t,data:e,headers:{"Content-type":"application/json; charset=UTF-8"}})}},M={get:function(t,e){var r=A+t;return U.get(r,e)},post:function(t,e){var r=A+t;return U.post(r,e)},put:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(e,r,n){var i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return i=A+e+"/"+r,t.abrupt("return",U.post(i,n));case 2:case"end":return t.stop()}}),t)})));function e(e,r,n){return t.apply(this,arguments)}return e}(),delete:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(e,r){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=A+e,t.abrupt("return",U.post(n,r));case 2:case"end":return t.stop()}}),t)})));function e(e,r){return t.apply(this,arguments)}return e}()},F={get:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(e,r){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=$+e,t.next=3,U.get(n,r);case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)})));function e(e,r){return t.apply(this,arguments)}return e}(),post:function(t,e){var r=$+t;return U.post(r,e)},put:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(e,r,n){var i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return i=$+e+"/"+r,t.abrupt("return",U.post(i,n));case 2:case"end":return t.stop()}}),t)})));function e(e,r,n){return t.apply(this,arguments)}return e}(),delete:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(e,r){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=$+e,t.abrupt("return",U.post(n,r));case 2:case"end":return t.stop()}}),t)})));function e(e,r){return t.apply(this,arguments)}return e}()},L=function(){var t=[],e={},r=function(){m["each"](t,(function(t){t(e)}))},n=function(n){t.push(n),Object.keys(e).length>0&&r()},i=function(t,n){e[t]=n,r()};return{subscribe:r,getContext:n,setContext:i}},Y=L();function N(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function B(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?N(r,!0).forEach((function(e){Object(T["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):N(r).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var H={EYES:"eyes"},K=function(){var t={id:0,base64:null,points:[]},e=function(e){return new Promise(function(){var r=Object(o["a"])(regeneratorRuntime.mark((function r(n){var i,a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,M.post("/face",e);case 2:i=r.sent,i.result?(a=B({},t),a.points=JSON.parse(i.data)["points"],a.base64=e.face_image,a.id=m["random"](9999999999),console.log("data",a),Y.setContext(H.EYES,a.points),n({result:!0})):n({result:!1});case 4:case"end":return r.stop()}}),r)})));return function(t){return r.apply(this,arguments)}}())};return{uploadImage:e}},G=K(),V=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"loading"},[t._t("default",null,{context:t.loading?"is":""}),r("div",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"message"},[t._v("Loading")])],2)},Z=[],z={props:{loading:Boolean}},q=z,Q=(r("2469"),Object(u["a"])(q,V,Z,!1,null,null,null)),X=Q.exports,J={data:function(){return{loading:!1,frame_rect:null}},mounted:function(){this.frame_rect=this.$refs.pictureFrame.getBoundingClientRect(),this.layoutUpdate()},props:{rect:Object,src:HTMLVideoElement},components:{LoadingOverlay:X},methods:{layoutUpdate:function(){this.rect&&this.frame_rect&&(this.frame_rect.shift_left=(b-this.frame_rect.width)/2)},clearCanvas:function(){var t=this.$refs.image2.getContext("2d");t.clearRect(0,0,this.frame_rect.width,this.frame_rect.height)},shoot:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e,r,n,i,a=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return Y.setContext(H.EYES,{}),this.loading=!0,e={sx:(this.rect.x+this.frame_rect.shift_left)/this.rect.rate,sy:0,sw:this.frame_rect.width/this.rect.rate,sh:this.frame_rect.height/this.rect.rate,dx:0,dy:0,dw:this.frame_rect.width,dh:this.frame_rect.height},r=this.$refs.image2.getContext("2d"),r.clearRect(0,0,this.frame_rect.width,this.frame_rect.height),r.save(),r.drawImage(this.src,e.sx,e.sy,e.sw,e.sh,e.dx,e.dy,e.dw,e.dh),n=this.$refs.image2.toDataURL("image/jpeg").split(",")[1],t.next=10,G.uploadImage({face_image:n});case 10:i=t.sent,i.result||alert("通信エラー"),setTimeout((function(){a.loading=!1}),1e3);case 13:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},watch:{rect:{immediate:!0,handler:function(t){this.layoutUpdate()}}}},W=J,tt=(r("7cd6"),Object(u["a"])(W,P,E,!1,null,"a2e6a5a4",null)),et=tt.exports,rt=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("button",{staticClass:"shoot-button",on:{click:t.shoot}},[r("div",{staticClass:"icon"},[r("Camera",{attrs:{size:48}})],1)])},nt=[],it=r("69db"),at={components:{Camera:it["a"]},data:function(){return{}},methods:{shoot:function(){this.$emit("shoot")}}},ot=at,st=(r("881e"),r("131b"),Object(u["a"])(ot,rt,nt,!1,null,"68f7d4f6",null)),ct=st.exports,ut=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("button",{staticClass:"button",on:{click:t.action}},[r("div",{staticClass:"icon"},[r("Close",{attrs:{size:20}})],1)])},lt=[],dt=r("7eb5"),ft={components:{Close:dt["a"]},data:function(){return{}},methods:{action:function(){this.$emit("action")}}},ht=ft,pt=(r("de50"),Object(u["a"])(ht,ut,lt,!1,null,"9d6ed6ca",null)),mt=pt.exports,gt=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ul",{staticClass:"product-list"},t._l(t.itemList,(function(e){return r("li",{key:e.id,staticClass:"list-item"},[r("Product",{attrs:{item:e,selected:t.selected},on:{setProductId:t.setProductId}})],1)})),0)},vt=[],yt=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"product",class:t.selectSelf?"selected":"",on:{click:function(e){return t.selectedProduct()}}},[r("transition",{attrs:{name:"rotate-fade"}},[t.selectSelf?r("CheckCircle",{staticClass:"icon",attrs:{size:24}}):t._e()],1),r("div",{staticClass:"product-image"},[r("img",{attrs:{src:t.getImagePath(t.item)}})]),r("p",{staticClass:"description"},[t._v(t._s(t.item.name))]),r("transition",{attrs:{name:"slide-fade"}},[t.selectSelf?r("a",{staticClass:"shop-link",attrs:{href:t.item.url,target:"_blank"}},[t._v("Buy now !")]):t._e()])],1)},bt=[],wt=(r("99af"),r("a9e3"),r("0fea")),Ot={data:function(){return{selectSelf:!1}},props:{item:{type:Object},selected:Number},components:{CheckCircle:wt["a"]},methods:{getImagePath:function(t){return"".concat(window.location.origin,"/images/").concat(t.category,"/").concat(t.image)},selectedProduct:function(){this.selectSelf=!this.selectSelf,this.$emit("setProductId",this.selectSelf?this.item.id:null)}},watch:{selected:{immediate:!0,handler:function(t){this.selectSelf=t===this.item.id}}}},_t=Ot,xt=(r("9e49"),Object(u["a"])(_t,yt,bt,!1,null,"5e49605a",null)),jt=xt.exports,Ct={data:function(){return{items:[],selected:null}},props:{products:{type:Object},productType:{type:String},categoryId:{type:Object,default:null}},components:{Product:jt},mounted:function(){},methods:{setProductId:function(t){this.selected=t,t?this.$emit("setProductId",{productId:this.selected,productType:this.productType}):this.$emit("setProductId",{productId:null,productType:this.productType})}},computed:{itemList:function(){var t=this;return this.products&&this.productType&&this.categoryId?m["filter"](this.products[this.productType].products,(function(e){return e.category===t.categoryId.id})):[]}}},Pt=Ct,Et=(r("00ba"),Object(u["a"])(Pt,gt,vt,!1,null,"46a024e8",null)),Tt=Et.exports,St=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ul",{staticClass:"category-list"},t._l(t.itemList,(function(e){return r("li",{key:e.id,staticClass:"list-item"},[r("Category",{attrs:{item:e},on:{clickHandler:t.setCategory}})],1)})),0)},Rt=[],$t=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("button",{staticClass:"category",on:{click:function(e){return t.clickHandler(t.item.id)}}},[r("img",{attrs:{src:t.getImagePath(t.item)}})])},At=[],kt={props:{item:{type:Object}},methods:{getImagePath:function(t){return"".concat(window.location.origin,"/images/category/").concat(t.image)},clickHandler:function(t){this.$emit("clickHandler",t)}}},It=kt,Dt=(r("a60a"),Object(u["a"])(It,$t,At,!1,null,"fb4cba8a",null)),Ut=Dt.exports,Mt={data:function(){return{categories:[]}},props:{productType:{type:String},items:{type:Object}},components:{Category:Ut},methods:{setCategory:function(t){Y.setContext("CATEGORY",{id:t})}},computed:{itemList:function(){return this.items&&this.productType?this.items[this.productType].category:[]}}},Ft=Mt,Lt=(r("1a52"),Object(u["a"])(Ft,St,Rt,!1,null,"30257baf",null)),Yt=Lt.exports,Nt=function(t){return new Promise((function(e){setTimeout((function(){e()}),t)}))},Bt=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[t._t("default",null,{context:t.data})],2)},Ht=[],Kt=void 0;function Gt(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function Vt(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?Gt(r,!0).forEach((function(e){Object(T["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):Gt(r).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var Zt={data:function(){return{data:{},get:Y.getContext.bind(Kt)}},props:{contextKey:{type:Array}},watch:{contextKey:{immediate:!0,handler:function(t){var e=this;m["map"](t,(function(t){e.data=Object(T["a"])({},t,null)}))}}},mounted:function(){var t=this;Y.getContext((function(e){m["map"](t.contextKey,(function(r){if(m["has"](e,r)){var n=Vt({},t.data);n[r]=Vt({},e[r]),t.data=n}}))}))}},zt=Zt,qt=Object(u["a"])(zt,Bt,Ht,!1,null,null,null),Qt=qt.exports,Xt=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{ref:"overlayFrame",staticClass:"overlayFrame"},[r("canvas",{ref:"canvas_left",staticClass:"overlay",style:t.getStyle,attrs:{width:t.frame_rect.width,height:t.frame_rect.height}}),r("canvas",{ref:"canvas_right",staticClass:"overlay",style:t.getStyle,attrs:{width:t.frame_rect.width,height:t.frame_rect.height}})])},Jt=[],Wt=(r("cb29"),r("d81d"),{LENS:"lens",MAKEUP:"makeup"});r("b680");function te(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function ee(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?te(r,!0).forEach((function(e){Object(T["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):te(r).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var re={data:function(){return{frame_rect:{width:0,height:0},product:null,productType:Wt.LENS,lens_image:"",canvas_rect:{}}},mounted:function(){var t=this;this.frame_rect=this.$refs.overlayFrame.getBoundingClientRect(),this.layoutUpdate(),this.$nextTick((function(){t.clearCanvas()}))},props:{rect:{type:Object,default:null},points:Object,productId:Object,products:Object,zIndex:{type:Number,default:3}},methods:{draw:function(t,e){var r=t.left,n=t.right,i=function(t,e){var r=m(e).map((function(t){return{x:t[0],y:t[1]}})).filter((function(t,e){return e%2===0})).value(),n=function(t){var e=t.p1,r=t.p2,n=t.p3,i=t.p4,a=.5*((i.x-r.x)*(e.y-r.y)-(i.y-r.y)*(e.x-r.x)),o=.5*((i.x-r.x)*(r.y-n.y)-(i.y-r.y)*(r.x-n.x));return{x:e.x+(n.x-e.x)*(a/(a+o)),y:e.y+(n.y-e.y)*(a/(a+o))}},i=n({p1:r[0],p2:r[2],p3:r[1],p4:r[3]}),a=(i.x,i.y,i.y,r[2].y,n({p1:r[3],p2:r[5],p3:r[4],p4:r[0]})),o={x:(r[1].x+r[2].x)/2,y:(r[1].y+r[2].y)/2},s={x:(r[0].x+o.x)/2.1,y:(r[0].y+o.y)/2.04},c={x:(o.x+r[3].x)/1.9,y:(o.y+r[3].y)/2.04},u=t.getContext("2d");u.fillStyle="rgb(0,0,0)",u.save(),u.globalCompositeOperation="source-over",u.lineWidth=2,u.strokeStyle="rgb(0,0,0)",u.beginPath(),u.moveTo(r[0].x,r[0].y),u.quadraticCurveTo(s.x,s.y,o.x,o.y),u.quadraticCurveTo(c.x,c.y,r[3].x,r[3].y),u.lineTo(r[4].x,r[4].y),u.quadraticCurveTo(a.x,a.y,r[5].x,r[5].y),u.lineTo(r[0].x,r[0].y),u.closePath(),u.fill()},a=function(t,e,r){var n={x:e[0]-e[2],y:e[1]-e[2],width:2*e[2],height:2*e[2]},i=new Image;i.onload=function(){var e=t.getContext("2d");e.globalCompositeOperation="source-in",e.drawImage(i,n.x,n.y,n.width,n.height),e.restore()},i.src=r},o=ee({},r),s=ee({},n),c=o.pupil[2]<s.pupil[2]?o.pupil[2]:s.pupil[2];o.pupil[2]=c,s.pupil[2]=c,i(this.$refs.canvas_left,o.eyelid),e&&a(this.$refs.canvas_left,o.pupil,e),i(this.$refs.canvas_right,s.eyelid),e&&a(this.$refs.canvas_right,s.pupil,e)},clearCanvas:function(){var t=this,e=function(e){var r=e.getContext("2d");r.restore(),console.log("clear",t.frame_rect.width,t.frame_rect.height),r.clearRect(0,0,t.frame_rect.width,t.frame_rect.height),r.beginPath(),r.moveTo(0,0),r.lineTo(0,0),r.stroke()};e(this.$refs.canvas_left),e(this.$refs.canvas_right)},layoutUpdate:function(){if(this.rect&&this.frame_rect.width&&this.frame_rect.height){this.frame_rect.width;this.$refs.canvas_left.style.width="".concat(this.frame_rect.width,"px"),this.$refs.canvas_left.style.height="".concat(this.frame_rect.height,"px"),this.$refs.canvas_right.style.width="".concat(this.frame_rect.width,"px"),this.$refs.canvas_right.style.height="".concat(this.frame_rect.height,"px");var t=this.rect.width-2*this.rect.x;this.canvas_rect={width:t,height:this.rect.height}}}},watch:{productId:{immediate:!0,handler:function(t,e){t||this.clearCanvas();var r=m["find"](this.products[this.productType].products,(function(e){return e.id===t.productId}));r&&(this.product=r,this.lens_image="".concat(window.location.origin,"/images/").concat(r.category,"/").concat(r.image),this.draw(this.points.eyes,this.lens_image))}},rect:{immediate:!0,handler:function(){this.layoutUpdate()}}},computed:{getStyle:function(){var t="";return t+="z-index:".concat(this.z,";"),t}}},ne=re,ie=(r("029d"),Object(u["a"])(ne,Xt,Jt,!1,null,"0b86e05c",null)),ae=ie.exports,oe=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{ref:"overlayFrame",staticClass:"overlayFrame mesh"},[r("canvas",{ref:"mesh",staticClass:"overlay",style:t.getStyle,attrs:{id:"mesh",width:t.frame_rect.width,height:t.frame_rect.height}})])},se=[],ce=r("284c"),ue={data:function(){return{frame_rect:{width:0,height:0},product:null,productType:Wt.MAKEUP,item_image:""}},props:{rect:{type:Object,default:null},points:Object,productId:Object,products:Object,zIndex:{type:Number,default:3}},mounted:function(){var t=this;this.frame_rect=this.$refs.overlayFrame.getBoundingClientRect(),this.layoutUpdate(),this.$nextTick((function(){t.clearCanvas()}))},methods:{draw:function(t,e){for(var r=t,n=[].concat(Object(ce["a"])(r.jaw),Object(ce["a"])(r.right_eyebrow),Object(ce["a"])(r.left_eyebrow),Object(ce["a"])(r.nose),Object(ce["a"])(r.right_eye),Object(ce["a"])(r.left_eye),Object(ce["a"])(r.mouth)),i=0;i<n.length;i++)n[i]={x:n[i][0],y:n[i][1],z:0};console.log("_points",n);var a=e;drawFaceMask(n,this.frame_rect,a)},clearCanvas:function(){var t=this,e=function(e){console.log("clear mesh",t.frame_rect.width,t.frame_rect.height),scene.remove(face),geometry.dispose(),material.dispose(),texture.dispose()};e(this.$refs.mesh)},layoutUpdate:function(){if(this.rect&&this.frame_rect.width&&this.frame_rect.height){this.frame_rect.width;this.$refs.mesh.style.width="".concat(this.frame_rect.width,"px"),this.$refs.mesh.style.height="".concat(this.frame_rect.height,"px")}}},watch:{productId:{immediate:!0,handler:function(t,e){t||this.clearCanvas();var r=m["find"](this.products[this.productType].products,(function(e){return e.id===t.productId}));r&&(this.product=r,this.item_image="".concat(window.location.origin,"/images/").concat(r.category,"/").concat(r.image),this.draw(this.points.face,this.item_image))}},rect:{immediate:!0,handler:function(){this.layoutUpdate()}}},computed:{getStyle:function(){var t="";return t+="z-index:".concat(this.z,";"),t}}},le=ue,de=(r("dbf6"),Object(u["a"])(le,oe,se,!1,null,"674ba35e",null)),fe=de.exports,he=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{ref:"appframe",staticClass:"appframe"},[r("div",{ref:"inner",staticClass:"inner"},[t._t("default")],2)])},pe=[],me={data:function(){return{frame_rect:null,bottom:0}},props:{rect:{type:Object,default:null}},components:{},mounted:function(){var t=this;this.$nextTick((function(){t.frame_rect=t.$refs.appframe.getBoundingClientRect(),t.layoutUpdate()}))},methods:{layoutUpdate:function(){if(this.rect&&this.frame_rect){var t=(b-this.frame_rect.width)/2;this.$refs.appframe.style.left="".concat(t,"px")}}},watch:{rect:{immediate:!0,handler:function(t,e){this.layoutUpdate()}}}},ge=me,ve=(r("439e"),Object(u["a"])(ge,he,pe,!1,null,null,null)),ye=ve.exports,be=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{ref:"productframe",staticClass:"productframe"},[r("div",{ref:"inner",staticClass:"inner",class:t.isMove?"isMove":""},[r("AreaSwipe",{on:{callback:t.getGesture}},[r("div",{staticClass:"area"},[r("div",{staticClass:"products"},[t._t("default")],2),r("ToggleButton",{attrs:{isOpen:t.isOpen},on:{toggle:function(e){return t.toggle()}}})],1)])],1)])},we=[],Oe=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{ref:"area",staticClass:"area"},[t._t("default")],2)},_e=[],xe={START:"start",END:"end",MOVING:"moving"},je=function(t){var e=t,r=function(t){window.addEventListener("mousedown",t),window.addEventListener("touchstart",t)},n=function(){window.addEventListener("mousemove",e),window.addEventListener("touchmove",e)},i=function(t){var r=function(){e=null,t()};window.addEventListener("mouseup",r),window.addEventListener("touchend",r)},a=function(){window.removeEventListener("mousemove",e),window.removeEventListener("touchmove",e)};return{moveStart:r,moveRelease:a,moveEndAll:i,moveUpdate:n}},Ce={data:function(){return{isMove:!1,startPoint:{x:0,y:0},movePoint:{x:0,y:0},pointer:null}},mounted:function(){this.pointer=je(this.updateHandler),this.initHandler()},methods:{initHandler:function(){var t=this;this.pointer.moveStart((function(e){var r={x:e.pageX,y:e.pageY};t.getRectHit(r)&&(t.startHandler(),t.isMove=!0,t.startPoint={x:e.pageX,y:e.pageY})})),this.pointer.moveUpdate(),this.pointer.moveEndAll((function(){t.isMove=!1,t.callback(xe.END)}))},startHandler:function(){this.callback(xe.START)},updateHandler:function(t){this.isMove&&(this.movePoint={x:t.pageX-this.startPoint.x,y:this.startPoint.y-t.pageY},this.callback(xe.MOVING))},endHandler:function(){this.callback(xe.END)},callback:function(t){this.$emit("callback",{gesture:t,position:this.movePoint})},getRectHit:function(t){var e=this.$refs.area.getBoundingClientRect();return console.log("area",e,t),e.x<t.x&&e.y<t.y&&e.y+e.height>t.y&&e.x+e.width>t.x}}},Pe=Ce,Ee=(r("f0a5"),Object(u["a"])(Pe,Oe,_e,!1,null,null,null)),Te=Ee.exports,Se=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("button",{staticClass:"category-toggle-button",class:{open:t.isOpen},on:{click:function(e){return t.$emit("toggle")}}},[r("img",{attrs:{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEMAAABECAMAAADtEXj5AAAAPFBMVEUAAAA4i585jZ85jZ85jZ85jZ9Aip85jZ84jZ84i5s5jZ84i585jJ85jZ84jZ05jZ85jJ85i585jp45jZ8MKH/vAAAAE3RSTlMAIN+ggO8Qv2BAj0DPr2BwUHBvAS/zpQAAANZJREFUWMPtksESwiAMRIUCQmltNf//r6a9ZKyVJTrjKe9GgbDbeRfDMAzDMP5GHpz6TpnSy/pKFHQT3Hy84gYif+ufkEKkGN7meqLZ9dbgw6ftM2+MrqcGN5+qrPWFUiCK98YLE09pR8mR06b2EWl6RuEa19oT1S8f9kaukcEA+S3lZOPRqAELSQ2ncD3QQaG0hVvbrgNxdy2T2vVVChUvNZSuL/wppF1LX79wXdKN8qLWdUlHQ/rR9TxXcx24DsGuY7DrGOw6BruOwa5jgOs6xHXDMDaeUQYOqX4hpyEAAAAASUVORK5CYII="}})])},Re=[],$e={props:{isOpen:{type:Boolean}}},Ae=$e,ke=(r("c50e"),Object(u["a"])(Ae,Se,Re,!1,null,"2c5cc71b",null)),Ie=ke.exports,De={data:function(){return{isMove:!1,frame_rect:null,bottom:0,limitTop:86,limitBottom:0,forceUp:40,forceDown:39,tmp_y:0,isOpen:!1}},props:{rect:Object},components:{AreaSwipe:Te,ToggleButton:Ie},mounted:function(){this.frame_rect=this.$refs.productframe.getBoundingClientRect(),this.layoutUpdate()},methods:{toggle:function(){this.isOpen=!this.isOpen,this.bottom=this.isOpen?this.limitTop:this.limitBottom,this.$refs.inner.style.transform="translateY(".concat(-this.bottom,"px)")},layoutUpdate:function(){if(this.rect&&this.frame_rect){var t=(b-this.frame_rect.width)/2;this.$refs.productframe.style.left="".concat(t,"px")}},getGesture:function(t){var e=t.gesture,r=t.position;if(e===xe.START&&(this.tmp_y=0,this.isMove=!0),e===xe.END&&(this.isMove=!1),e===xe.MOVING&&this.bottom<this.limitTop&&this.bottom>this.limitBottom){var n=r.y-this.tmp_y;this.bottom+=n,this.$refs.inner.style.transform="translateY(".concat(-this.bottom,"px)"),this.tmp_y=r.y}this.bottom<=this.limitBottom&&(this.bottom=this.limitBottom+1),this.bottom>=this.limitTop&&(this.bottom=this.limitTop-1),!this.isMove&&this.bottom>this.forceUp&&(this.bottom=this.limitTop-1,this.$refs.inner.style.transform="translateY(".concat(-this.bottom,"px)"),this.isOpen=!0),!this.isMove&&this.bottom<this.forceDown&&(this.bottom=this.limitBottom+1,this.$refs.inner.style.transform="translateY(".concat(-this.bottom,"px)"),this.isOpen=!1)}},watch:{rect:{immediate:!0,handler:function(t,e){this.layoutUpdate()}}}},Ue=De,Me=(r("c493"),Object(u["a"])(Ue,be,we,!1,null,null,null)),Fe=Me.exports,Le={name:"app",data:function(){return{src:null,rect:{},points:{},onFlash:!1,shooted:!1,show:!1,lensColor:null,products:[],categories:[],POINTS_KEY:H,PRODUCT_TYPE:Wt}},components:{Header:f,AppFrame:ye,ProductFrame:Fe,Vid:C,Shoot:ct,Clear:mt,Picture:et,ProductList:Tt,CategoryList:Yt,ContextConsumer:Qt,Eyes:ae,FaceMesh:fe},mounted:function(){this.getProducts()},methods:{readyVideo:function(t){console.log(t),this.rect=t.rect,this.src=t.src},shoot:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.onFlash=!0,t.next=3,Nt(100);case 3:return this.$refs.picture.shoot(),t.next=6,Nt(240);case 6:this.onFlash=!1,this.shooted=!0;case 8:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),clearPicture:function(){this.shooted=!1,Y.setContext("CATEGORY",{id:null}),Y.setContext("PRODUCT_ID",{productId:null}),this.$refs.picture.clearCanvas(),this.$refs.eyes.clearCanvas()},setProductId:function(t){var e=t.productId;t.productType;Y.setContext("PRODUCT_ID",{productId:e})},getProducts:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,F.get("",{});case 2:e=t.sent,console.log("getProducts",e.data),Y.setContext("PRODUCTS",e.data);case 5:case"end":return t.stop()}}),t)})));function e(){return t.apply(this,arguments)}return e}()}},Ye=Le,Ne=(r("5c0b"),Object(u["a"])(Ye,i,a,!1,null,null,null)),Be=Ne.exports;n["a"].config.productionTip=!1,new n["a"]({render:function(t){return t(Be)}}).$mount("#app")},"5aa4":function(t,e,r){},"5c0b":function(t,e,r){"use strict";var n=r("9c0c"),i=r.n(n);i.a},"64a0":function(t,e,r){},6873:function(t,e,r){},"7cd6":function(t,e,r){"use strict";var n=r("2338"),i=r.n(n);i.a},"881e":function(t,e,r){"use strict";var n=r("c0c4"),i=r.n(n);i.a},"9a00":function(t,e,r){},"9c0c":function(t,e,r){},"9e49":function(t,e,r){"use strict";var n=r("219a"),i=r.n(n);i.a},a60a:function(t,e,r){"use strict";var n=r("d544"),i=r.n(n);i.a},ba92:function(t,e,r){},c0c4:function(t,e,r){},c493:function(t,e,r){"use strict";var n=r("64a0"),i=r.n(n);i.a},c50e:function(t,e,r){"use strict";var n=r("5aa4"),i=r.n(n);i.a},c6cb:function(t,e,r){},d544:function(t,e,r){},db90:function(t,e,r){"use strict";var n=r("9a00"),i=r.n(n);i.a},dbf6:function(t,e,r){"use strict";var n=r("c6cb"),i=r.n(n);i.a},de50:function(t,e,r){"use strict";var n=r("4389"),i=r.n(n);i.a},e52c:function(t,e,r){},ed51:function(t,e,r){},f0a5:function(t,e,r){"use strict";var n=r("0aea"),i=r.n(n);i.a}});
//# sourceMappingURL=app.fce21e3e.js.map