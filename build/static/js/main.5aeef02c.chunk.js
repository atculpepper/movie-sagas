(this["webpackJsonpredux-intro"]=this["webpackJsonpredux-intro"]||[]).push([[0],{17:function(e,n,t){e.exports=t(29)},23:function(e,n,t){},24:function(e,n,t){},29:function(e,n,t){"use strict";t.r(n);var o=t(7),r=t.n(o),a=t(0),i=t.n(a),c=t(11),s=t.n(c);t(23),t(24);class l extends a.Component{render(){return i.a.createElement("div",{className:"App"},i.a.createElement("p",null,"Empty Page"))}}var d=l;const u=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function p(e){navigator.serviceWorker.register(e).then(e=>{e.onupdatefound=()=>{const n=e.installing;n.onstatechange=()=>{"installed"===n.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}}).catch(e=>{console.error("Error during service worker registration:",e)})}var g=t(4),h=t(15),w=t(14),f=t.n(w),v=t(16),m=r.a.mark(E);function E(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),m)}const k=Object(v.a)(),b=Object(g.e)(Object(g.c)({movies:(e=[],n)=>{switch(n.type){case"SET_MOVIES":return n.payload;default:return e}},genres:(e=[],n)=>{switch(n.type){case"SET_GENRES":return n.payload;default:return e}}}),Object(g.a)(k,f.a));k.run(E),s.a.render(i.a.createElement(h.a,{store:b},i.a.createElement(d,null)),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("",window.location).origin!==window.location.origin)return;window.addEventListener("load",()=>{const e="".concat("","/service-worker.js");u?(!function(e){fetch(e).then(n=>{404===n.status||-1===n.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(e=>{e.unregister().then(()=>{window.location.reload()})}):p(e)}).catch(()=>{console.log("No internet connection found. App is running in offline mode.")})}(e),navigator.serviceWorker.ready.then(()=>{console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")})):p(e)})}}()}},[[17,1,2]]]);
//# sourceMappingURL=main.5aeef02c.chunk.js.map