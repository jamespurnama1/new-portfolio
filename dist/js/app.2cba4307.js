(function(e){function t(t){for(var i,r,s=t[0],l=t[1],c=t[2],f=0,p=[];f<s.length;f++)r=s[f],Object.prototype.hasOwnProperty.call(a,r)&&a[r]&&p.push(a[r][0]),a[r]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(e[i]=l[i]);u&&u(t);while(p.length)p.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],i=!0,s=1;s<n.length;s++){var l=n[s];0!==a[l]&&(i=!1)}i&&(o.splice(t--,1),e=r(r.s=n[0]))}return e}var i={},a={app:0},o=[];function r(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=i,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var u=l;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"092a":function(e,t,n){e.exports=n.p+"fonts/35-FTR-LightOblique.04758c5f.woff2"},"09b3":function(e,t,n){"use strict";var i=n("b491"),a=n.n(i);a.a},"16a3":function(e,t,n){"use strict";var i=n("cd8c"),a=n.n(i);a.a},1771:function(e,t,n){var i={"./ISS.png":"b13b","./belladonna.png":"ae43","./eyureka.jpg":"afd1","./fonts/35-FTR-Black.woff2":"a87e","./fonts/35-FTR-BlackOblique.woff2":"7c51","./fonts/35-FTR-Bold.woff2":"3530","./fonts/35-FTR-BoldOblique.woff2":"72e9","./fonts/35-FTR-DemiBold.woff2":"da50","./fonts/35-FTR-DemiBoldOblique.woff2":"a44f","./fonts/35-FTR-ExtraBold.woff2":"3b0a","./fonts/35-FTR-ExtraBoldOblique.woff2":"f458","./fonts/35-FTR-Light.woff2":"36c4","./fonts/35-FTR-LightOblique.woff2":"092a","./fonts/35-FTR-Medium.woff2":"7e41","./fonts/35-FTR-MediumOblique.woff2":"b818","./fonts/35-FTR-Regular.woff2":"e8c8","./fonts/35-FTR-RegularOblique.woff2":"b771","./fonts/logo.png":"f715","./jtc1_700.jpg":"880a","./logo.png":"cf05","./munlite.png":"712f","./planets/Blue.png":"d63e","./planets/Cream.png":"a560","./planets/Magenta.png":"1888","./planets/Pink.png":"a580","./planets/Purple.png":"f7c5","./planets/Red.png":"3430","./portrait.jpg":"c496","./reel.mp4":"58b7","./reel.webm":"4fa2","./sagoo6.mp4":"8405","./tremors1_700.jpg":"3468"};function a(e){var t=o(e);return n(t)}function o(e){if(!n.o(i,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return i[e]}a.keys=function(){return Object.keys(i)},a.resolve=o,e.exports=a,a.id="1771"},1888:function(e,t,n){e.exports=n.p+"img/Magenta.2a4d41c2.png"},"21c2":function(e,t,n){"use strict";var i=n("f3d2"),a=n.n(i);a.a},2382:function(e,t,n){},"24dd":function(e,t,n){},"27f3":function(e,t,n){"use strict";var i=n("2382"),a=n.n(i);a.a},"2a44":function(e,t,n){"use strict";var i=n("c754"),a=n.n(i);a.a},3430:function(e,t,n){e.exports=n.p+"img/Red.87315f28.png"},3468:function(e,t,n){e.exports=n.p+"img/tremors1_700.f8db5473.jpg"},3530:function(e,t,n){e.exports=n.p+"fonts/35-FTR-Bold.5928c756.woff2"},"36c4":function(e,t,n){e.exports=n.p+"fonts/35-FTR-Light.afcf4585.woff2"},"37b6":function(e,t,n){},"3b0a":function(e,t,n){e.exports=n.p+"fonts/35-FTR-ExtraBold.4025e5ca.woff2"},"3dfd":function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"main"}},[n("transition",{attrs:{name:"navbar"}},[n("Navbar",{directives:[{name:"show",rawName:"v-show",value:e.showNavbar,expression:"showNavbar"}]})],1),n("main",[n("transition",{attrs:{name:"fade",mode:"out-in"}},[n("router-view")],1)],1),n("transition",{attrs:{name:"fade"}},[n("scrollTop",{directives:[{name:"show",rawName:"v-show",value:e.showScrollToTop,expression:"showScrollToTop"}],nativeOn:{click:function(t){e.scrollToTop(),e.$refs.fullpage.api.moveTo(3)}}})],1)],1)},a=[],o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"navbar"},[n("nav",[n("ul",[n("li",[n("router-link",{staticClass:"logo",attrs:{to:"/"}},[e._v("jh")])],1),n("li",[n("router-link",{staticClass:"margin",attrs:{to:"/about"}},[e._v("about")]),n("router-link",{directives:[{name:"scroll-to",rawName:"v-scroll-to",value:"#discoveries",expression:"'#discoveries'"}],staticClass:"margin",attrs:{to:"/"},nativeOn:{click:function(t){e.hover=!1},mouseover:function(t){e.hover=!0},mouseleave:function(t){return e.delay()}}},[e._v("discover")]),n("router-link",{staticClass:"margin",attrs:{to:"/principles"}},[e._v("principles")])],1),n("li",[n("a",{attrs:{href:"http://www.be.net/jamespurnama",target:"_blank"}},[e._v("behance "),n("feather",{attrs:{type:"external-link",stroke:"#575F6B",size:15}})],1)])])]),n("div",{on:{mouseover:function(t){e.hoverDrop=!0},mouseleave:function(t){return e.delayDrop()}}},[n("transition",{attrs:{name:"slide"}},[n("Dropdown",{directives:[{name:"show",rawName:"v-show",value:e.hover||e.hoverDrop,expression:"hover || hoverDrop"}]})],1)],1)])},r=[],s=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},l=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"dropdown"}},[n("ul",[n("li",[n("a",{staticClass:"margin",attrs:{href:"/interactivity"}},[e._v("interactivity")])]),n("li",[n("a",{staticClass:"margin",attrs:{href:"/photography"}},[e._v("photography")])]),n("li",[n("a",{staticClass:"margin",attrs:{href:"/motion"}},[e._v("motion")])]),n("li",[n("a",{staticClass:"margin",attrs:{href:"/branding"}},[e._v("branding")])]),n("li",[n("a",{staticClass:"margin",attrs:{href:"/works"}},[e._v("all works")])])])])}],c={name:"Dropdown",props:{}},u=c,f=(n("21c2"),n("2877")),p=Object(f["a"])(u,s,l,!1,null,"087f8068",null),d=p.exports,v={name:"Navbar",components:{Dropdown:d},data:function(){return{hover:!1,hoverDrop:!1}},methods:{delay:function(){var e=this;setTimeout((function(){e.hover=!1}),500)},delayDrop:function(){var e=this;setTimeout((function(){e.hoverDrop=!1}),500)}}},m=v,h=(n("16a3"),n("09b3"),Object(f["a"])(m,o,r,!1,null,"63f17c5a",null)),b=h.exports,g=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"center clickable"},[n("feather",{attrs:{type:"arrow-up",stroke:"#575F6B",size:27}})],1)},w=[],_={name:"scrollTop"},y=_,x=(n("d232"),Object(f["a"])(y,g,w,!1,null,"21c13d71",null)),T=x.exports,k={name:"JamesHenry",components:{Navbar:b,scrollTop:T},data:function(){return{lastScrollPosition:0,showNavbar:!0,showScrollToTop:!1}},methods:{scrollToTop:function(){window.scrollTo({top:0,behavior:"smooth"})},onScroll:function(){var e=window.pageYOffset||document.documentElement.scrollTop;e<0||Math.abs(e-this.lastScrollPosition)<60||(this.showNavbar=e<this.lastScrollPosition,this.lastScrollPosition=e,this.showScrollToTop=e>50)}},created:function(){window.addEventListener("scroll",this.onScroll)},beforeDestroy:function(){window.removeEventListener("scroll",this.onScroll)}},C=k,O=(n("5c0b"),Object(f["a"])(C,i,a,!1,null,null,null));t["a"]=O.exports},"404d":function(e,t,n){"use strict";var i=n("ee67"),a=n.n(i);a.a},"4bd5":function(e,t,n){var i={"./Blue.png":"d63e","./Cream.png":"a560","./Magenta.png":"1888","./Pink.png":"a580","./Purple.png":"f7c5","./Red.png":"3430"};function a(e){var t=o(e);return n(t)}function o(e){if(!n.o(i,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return i[e]}a.keys=function(){return Object.keys(i)},a.resolve=o,e.exports=a,a.id="4bd5"},"4c8d":function(e,t,n){"use strict";var i=n("7db6"),a=n.n(i);a.a},"4f6f":function(e,t){function n(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id="4f6f"},"4fa2":function(e,t,n){e.exports=n.p+"media/reel.89c24309.webm"},"56d7":function(e,t,n){"use strict";n.r(t),function(e){n("e260"),n("e6cf"),n("cca6"),n("a79d");var t=n("a45e"),i=n.n(t),a=n("2b0e"),o=n("2f62"),r=n("8c4f"),s=n("289d"),l=n("62ad"),c=n.n(l),u=n("335a"),f=n("dcb8"),p=n.n(f),d=n("f13c"),v=n.n(d),m=n("8f5c"),h=n("3dfd"),b=n("57d0"),g=n("a1d1"),w=n("9269");a["a"].use(o["a"]);var _=new a["a"],y=new o["a"].Store({});a["a"].use(s["a"]),a["a"].use(v.a),a["a"].use(r["a"]),a["a"].use(c.a),a["a"].use(i.a),a["a"].use(p.a,{eventEmitter:_,store:y,idleTime:3e3,startAtIdle:!1,events:["scroll","mousemove","keydown","mousedown","touchstart"]}),a["a"].component("vue-aspect-ratio",u["a"]),a["a"].config.productionTip=!1;var x=[{path:"/",component:m["a"]},{path:"/about",component:g["a"]},{path:"/discover",component:b["a"]},{path:"/principles",component:w["a"]},{path:"/interactivity",component:w["a"]},{path:"/motion",component:w["a"]},{path:"/branding",component:w["a"]},{path:"/photography",component:w["a"]},{path:"/works",component:w["a"]}],T=new r["a"]({mode:"history",base:e,routes:x});new a["a"]({router:T,render:function(e){return e(h["a"])}}).$mount("#app")}.call(this,"/")},"57d0":function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div")},a=[],o={Name:"Discover"},r=o,s=n("2877"),l=Object(s["a"])(r,i,a,!1,null,"ad682c08",null);t["a"]=l.exports},"58b7":function(e,t,n){e.exports=n.p+"media/reel.6c164852.mp4"},"5c0b":function(e,t,n){"use strict";var i=n("9c0c"),a=n.n(i);a.a},6175:function(e,t,n){"use strict";var i=n("c274"),a=n.n(i);a.a},"6ba7":function(e,t,n){},"712f":function(e,t,n){e.exports=n.p+"img/munlite.cd1b863a.png"},"72e9":function(e,t,n){e.exports=n.p+"fonts/35-FTR-BoldOblique.c19b77c9.woff2"},"7c51":function(e,t,n){e.exports=n.p+"fonts/35-FTR-BlackOblique.ea1207b8.woff2"},"7c6f":function(e,t,n){"use strict";var i=n("d946"),a=n.n(i);a.a},"7db6":function(e,t,n){},"7e41":function(e,t,n){e.exports=n.p+"fonts/35-FTR-Medium.c68d4645.woff2"},8405:function(e,t,n){e.exports=n.p+"media/sagoo6.4e4c089b.mp4"},"880a":function(e,t,n){e.exports=n.p+"img/jtc1_700.9807e3f3.jpg"},"8f5c":function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{class:{noScroll:e.overlayVideo},attrs:{id:"landing"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:e.overlayVideo,expression:"overlayVideo"}],staticClass:"center",attrs:{id:"overlay"}},[i("feather",{attrs:{id:"close",type:"x",stroke:"#575F6B",size:27},on:{click:function(t){e.overlayVideo=!1,e.stopVideo()}}}),i("video",{ref:"reel",attrs:{controls:""}},[i("source",{attrs:{src:n("4fa2"),type:"video/webm"}}),i("source",{attrs:{src:n("58b7"),type:"video/mp4"}})])],1),i("div",{staticClass:"block"},[e._m(0),i("div",{attrs:{id:"description"}},[i("p",[e._v("Meet your multi-talented graphic designer based in Malaysia. I’m best at branding, UI/UX, Front-end Development, and a whole lot more.")]),i("button",{on:{click:function(t){e.overlayVideo=!0,e.startVideo()}}},[e._v("view video reel")]),i("video",{staticClass:"bg",attrs:{loop:"",muted:"",src:e.video},domProps:{muted:!0}})])]),i("Hint"),i("div",{staticClass:"block nextBlock"},[e._m(1),i("div",{staticClass:"horizontalScroll"},[i("Card",{attrs:{viewport:e.viewport,cardTitle:e.cardTitle.one,caption:e.caption.one,thumbnail:e.thumbnail.one}}),i("Card",{attrs:{viewport:e.viewport,cardTitle:e.cardTitle.two,caption:e.caption.two,thumbnail:e.thumbnail.two}}),i("Card",{attrs:{viewport:e.viewport,cardTitle:e.cardTitle.three,caption:e.caption.three,thumbnail:e.thumbnail.three}}),i("Card",{attrs:{viewport:e.viewport,cardTitle:e.cardTitle.four,caption:e.caption.four,thumbnail:e.thumbnail.four}}),i("Card",{attrs:{viewport:e.viewport,cardTitle:e.cardTitle.five,caption:e.caption.five,thumbnail:e.thumbnail.five}})],1)]),i("Hint"),i("div",{staticClass:"block nextBlock",attrs:{id:"discoveries"}},[e._m(2),i("div",{staticClass:"horizontalScroll"},[i("Planet",{attrs:{planet:e.planet[0],planetImage:e.planetImage[0]}}),i("Planet",{attrs:{planet:e.planet[1],planetImage:e.planetImage[1]}}),i("Planet",{attrs:{planet:e.planet[2],planetImage:e.planetImage[2]}}),i("Planet",{attrs:{planet:e.planet[3],planetImage:e.planetImage[3]}}),i("Planet",{attrs:{planet:e.planet[4],planetImage:e.planetImage[4]}}),i("Planet",{attrs:{planet:e.planet[4],planetImage:e.planetImage[4]}})],1)])],1)},a=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("h1",[e._v("james"),n("br"),e._v(" henry")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("h1",{staticClass:"featured"},[e._v("featured"),n("br"),e._v("works")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"long"},[n("h1",[e._v("explore my discoveries")]),n("h1",[e._v("discoveries explore my")])])}],o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("vue-aspect-ratio",{staticClass:"card",style:e.viewport,attrs:{ar:"3:2",width:"30vw"}},[i("div",{staticStyle:{height:"100%"}},[i("div",{staticClass:"center thumb"},[i("img",{attrs:{src:n("1771")("./"+e.thumbnail)}})]),i("div",{attrs:{id:"caption"}},[i("h3",[e._v(e._s(e.cardTitle))]),i("p",[e._v(e._s(e.caption.title))]),i("p",[e._v(e._s(e.caption.type))]),i("p",[e._v(e._s(e.caption.year))])])])])],1)},r=[],s={name:"Card",data:function(){return{}},props:{cardTitle:String,thumbnail:String,caption:Object,viewport:String}},l=s,c=(n("6175"),n("2877")),u=Object(c["a"])(l,o,r,!1,null,"112694ff",null),f=u.exports,p=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"absoluteCenter"}},[n("transition",{attrs:{name:"fade"}},[n("p",{directives:[{name:"show",rawName:"v-show",value:e.idle,expression:"idle"}],staticClass:"clickable",on:{click:function(t){return e.nextBlock(0)}}},[e._v(" Scroll down to discover more ")])])],1)},d=[],v={name:"Hint",data:function(){return{idle:!1}},onIdle:function(){this.idle=!0},onActive:function(){this.idle=!1}},m=v,h=(n("2a44"),Object(c["a"])(m,p,d,!1,null,"e4b3ec5c",null)),b=h.exports,g=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticStyle:{margin:"0 3%","min-width":"25vw"}},[i("router-link",{staticClass:"center planet",attrs:{to:"planet/motion"}},[i("div",{staticClass:"center planetImage"},[i("img",{attrs:{src:n("4bd5")("./"+e.planetImage)}})]),i("button",[i("p",[e._v(e._s(e.planet)+" planet")])])])],1)},w=[],_={name:"Card",data:function(){return{}},props:{planet:String,planetImage:String}},y=_,x=(n("27f3"),Object(c["a"])(y,g,w,!1,null,"2cc47a06",null)),T=x.exports,k={name:"JamesHenry",components:{Card:f,Hint:b,Planet:T},data:function(){return{overlayVideo:!1,video:"",viewport:"width: 30vw",planet:["motion","branding","UI/UX","photography","tools"],planetImage:["Red.png","Magenta.png","Blue.png","Purple.png","Cream.png"],cardTitle:{one:"jack the clipper",two:"tremors",three:"eyureka",four:"mun lite",five:"belladonna lyric video"},caption:{one:{title:"Re-branding",type:"The One Academy College Project",year:"2019"},two:{title:"Photography",type:"The One Academy College Project",year:"2018"},three:{title:"Branding, UI/UX",type:"Freelance",year:"2020"},four:{title:"Branding, UI/UX",type:"Freelance",year:"2020"},five:{title:"Motion Graphics",type:"Freelance",year:"2020"}},thumbnail:{one:"jtc1_700.jpg",two:"tremors1_700.jpg",three:"eyureka.jpg",four:"munlite.png",five:"belladonna.png"},isInactive:!1,userActivityThrottlerTimeout:null,userActivityTimeout:null}},methods:{nextBlock:function(e){var t=this.$el.getElementsByClassName("nextBlock")[e];t.scrollIntoView({behavior:"smooth"})},stopVideo:function(){this.$refs.reel.pause()},startVideo:function(){this.$refs.reel.play(),window.innerWidth<1080&&this.$refs.reel.requestFullscreen()},onResize:function(){window.innerWidth<1080?this.viewport="width: 60vw":this.viewport="width: 30vw"}},mounted:function(){var e=this;this.$nextTick((function(){window.addEventListener("resize",e.onResize)}))},beforeDestroy:function(){window.removeEventListener("resize",this.onResize)}},C=k,O=(n("404d"),Object(c["a"])(C,i,a,!1,null,"508817e0",null));t["a"]=O.exports},9269:function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"principle"}},[n("full-page",{ref:"fullPage",attrs:{options:e.options,id:"fullpage"}},[n("div",{staticClass:"section"},[n("Front")],1),n("div",{staticClass:"section"},[n("Philosophies",{attrs:{title:e.title.one,subtitle:e.subtitle.one}})],1),n("div",{staticClass:"section"},[n("Philosophies",{attrs:{title:e.title.two,subtitle:e.subtitle.two}})],1),n("div",{staticClass:"section"},[n("Philosophies",{attrs:{title:e.title.three,subtitle:e.subtitle.three}})],1),n("div",{staticClass:"section"},[n("Philosophies",{attrs:{title:e.title.four,subtitle:e.subtitle.four}})],1),n("div",{staticClass:"section"},[n("Philosophies",{attrs:{title:e.title.five,subtitle:e.subtitle.five}})],1),n("div",{staticClass:"section"},[n("Philosophies",{attrs:{title:e.title.six,subtitle:e.subtitle.six}})],1),n("div",{staticClass:"section"},[n("Philosophies",{attrs:{title:e.title.seven,subtitle:e.subtitle.seven}})],1),n("div",{staticClass:"section"},[n("Philosophies",{attrs:{title:e.title.eight,subtitle:e.subtitle.eight}})],1),n("div",{staticClass:"section",on:{click:function(t){return e.$refs.fullpage.api.moveTo(0)}}},[n("Philosophies",{attrs:{title:e.title.nine,subtitle:e.subtitle.nine}})],1),n("div",{staticClass:"section"},[n("Philosophies",{attrs:{title:e.title.ten,subtitle:e.subtitle.ten}})],1),n("div",{staticClass:"section"},[n("Familiar")],1)])],1)},a=[],o=n("cffa"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"hello"},[n("h1",[e._v("Principles")]),n("h3",[e._v("Philosophies")]),n("ul",[e._m(0),e._m(1),e._m(2),e._m(3),n("li",[n("a",{attrs:{href:"#5",rel:"noopener"}},[n("strike",[e._v("Less is More.")]),e._v(" Enough is Best.")],1)]),e._m(4),e._m(5),e._m(6),e._m(7),e._m(8)]),e._m(9)])},s=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",[n("a",{attrs:{href:"#1",rel:"noopener"}},[e._v("Human-Centered Design")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",[n("a",{attrs:{href:"#2",rel:"noopener"}},[e._v("Design With Familiarity & Uniqueness.")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",[n("a",{attrs:{href:"#3",rel:"noopener"}},[e._v("Form Compliments Function. Not Higher.")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",[n("a",{attrs:{href:"#4",rel:"noopener"}},[e._v("Natural Design. Not Fully Organic.")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",[n("a",{attrs:{href:"#6",rel:"noopener"}},[e._v("Design is a solution.")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",[n("a",{attrs:{href:"#7",rel:"noopener"}},[e._v("Design should communicate.")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",[n("a",{attrs:{href:"#8",rel:"noopener"}},[e._v("Design is an experience.")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",[n("a",{attrs:{href:"#9",rel:"noopener"}},[e._v("Design is self explanatory.")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",[n("a",{attrs:{href:"#10",rel:"noopener"}},[e._v("Design is not fully subjective.")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"center"},[n("p",[e._v(" Scroll down to view the interactivity ")])])}],l={name:"Front"},c=l,u=(n("a956"),n("2877")),f=Object(u["a"])(c,r,s,!1,null,"1b87e4b6",null),p=f.exports,d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h1",[e._v(e._s(e.title))]),n("p",[e._v(e._s(e.subtitle))])])},v=[],m=(n("3294"),{name:"Philosophies",props:{title:String,subtitle:String},components:{},data:function(){return{}},methods:{}}),h=m,b=(n("b390"),Object(u["a"])(h,d,v,!1,null,"2041fb96",null)),g=b.exports,w=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("lottie-player",{ref:"firstLottie",attrs:{id:"lottie",src:"/Familiar.json",hover:"true"}})],1)},_=[],y={name:"Communicate",components:{},data:function(){return{}},methods:{}},x=y,T=(n("cc8f"),Object(u["a"])(x,w,_,!1,null,"afb6f20e",null)),k=T.exports,C={name:"Principles",components:{Front:p,Philosophies:g,Familiar:k},data:function(){return{gsap1:new o["a"].timeline,options:{anchors:["","1","2","3","4","5","6","7","8","9","10","11"]},title:{one:"1. A design at its fundamental should be made for human.",two:"2. Form should always compliment function but never be prioritized higher.",three:"3. Design should always have a sense of familiarity while keeping its uniqueness.",four:"4. A good design is natural but not fully organic.",five:"5. Less is more. Enough is best.",six:"6. Design is a solution, it should not create problems.",seven:"7. A design should communicate.",eight:"8. Design is an experience.",nine:"9. Design is self explanatory.",ten:"10. Design is not fully subjective."},subtitle:{one:"Every design is meant to be experienced and enjoyed by humans not machine or aliens. So it should be a priority to keep the audience in mind.",two:"Adding to human centered design, the form then should be made “ergonomic” for use.",three:"A familiar design reduces learning curve and gives a better user experience overall.",four:"It’s a personal preference to copy a design from nature but never to be copied 100%.",five:"Minimalism destroys not only distinctness in design but also cultural patterns & designer’s background.",six:"Every design objective is a problem required to be solved not add upon.",seven:"Whether it communicates little or much, it should reflect a certain message/feeling.",eight:"Every project should consider the 5 human senses before started.",nine:"If it requires a really in-depth explanation then it probably didn’t communicate well.",ten:"There’s such thing as good design in general."}}},methods:{},mounted:function(){this.gsap1.to(this.$refs.fullPage,{duration:4,backgroundColor:"black"})}},O=C,j=(n("7c6f"),Object(u["a"])(O,i,a,!1,null,"98b7eff2",null));t["a"]=j.exports},"9c0c":function(e,t,n){},"9f51":function(e,t,n){},a1d1:function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"block"},[e._m(0),n("div",{staticClass:"text"},[n("p",[e._v("Born in Jakarta, Indonesia & grew up in Bandung. Took advertising & graphic design in The One Academy, Malaysia. Always has been amused with tech, design, and keeping up with trends.")]),n("button",[n("a",{attrs:{href:"http://www.instagram.com/jamespurnama1",target:"_blank"}},[e._v("instagram")]),n("feather",{attrs:{type:"external-link",stroke:"#575F6B",size:15}})],1),n("button",[n("a",{attrs:{href:"http://www.be.net/jamespurnama",target:"_blank"}},[e._v("behance")]),n("feather",{attrs:{type:"external-link",stroke:"#575F6B",size:15}})],1),n("button",[n("a",{attrs:{href:"http://www.github.com/jamespurnama1",target:"_blank"}},[e._v("github")]),n("feather",{attrs:{type:"external-link",stroke:"#575F6B",size:15}})],1),n("button",[n("a",{attrs:{href:"mailto:jamespurnama1@gmail.com",target:"_blank"}},[e._v("email")]),n("feather",{attrs:{type:"external-link",stroke:"#575F6B",size:15}})],1)])])])},a=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"center about"},[i("img",{staticClass:"clip",attrs:{src:n("c496")}}),i("h3",[e._v("james henry")])])}],o={Name:"About"},r=o,s=(n("4c8d"),n("2877")),l=Object(s["a"])(r,i,a,!1,null,"6628696d",null);t["a"]=l.exports},a44f:function(e,t,n){e.exports=n.p+"fonts/35-FTR-DemiBoldOblique.a732a16e.woff2"},a560:function(e,t,n){e.exports=n.p+"img/Cream.eab73b30.png"},a580:function(e,t,n){e.exports=n.p+"img/Pink.43b90091.png"},a87e:function(e,t,n){e.exports=n.p+"fonts/35-FTR-Black.413574da.woff2"},a956:function(e,t,n){"use strict";var i=n("6ba7"),a=n.n(i);a.a},ae43:function(e,t,n){e.exports=n.p+"img/belladonna.56c29df8.png"},afd1:function(e,t,n){e.exports=n.p+"img/eyureka.560c6262.jpg"},b13b:function(e,t,n){e.exports=n.p+"img/ISS.5790b8ed.png"},b390:function(e,t,n){"use strict";var i=n("24dd"),a=n.n(i);a.a},b491:function(e,t,n){},b771:function(e,t,n){e.exports=n.p+"fonts/35-FTR-RegularOblique.e62cf1ee.woff2"},b818:function(e,t,n){e.exports=n.p+"fonts/35-FTR-MediumOblique.28a33efa.woff2"},c274:function(e,t,n){},c496:function(e,t,n){e.exports=n.p+"img/portrait.cb814428.jpg"},c754:function(e,t,n){},cc8f:function(e,t,n){"use strict";var i=n("9f51"),a=n.n(i);a.a},cd8c:function(e,t,n){},cf05:function(e,t,n){e.exports=n.p+"img/logo.82b9c7a5.png"},d232:function(e,t,n){"use strict";var i=n("37b6"),a=n.n(i);a.a},d63e:function(e,t,n){e.exports=n.p+"img/Blue.cc0aae3d.png"},d946:function(e,t,n){},da50:function(e,t,n){e.exports=n.p+"fonts/35-FTR-DemiBold.07455633.woff2"},e8c8:function(e,t,n){e.exports=n.p+"fonts/35-FTR-Regular.65f10c2d.woff2"},ee67:function(e,t,n){},f3d2:function(e,t,n){},f458:function(e,t,n){e.exports=n.p+"fonts/35-FTR-ExtraBoldOblique.6fbc2ea6.woff2"},f715:function(e,t,n){e.exports=n.p+"img/logo.65f10c2d.png"},f7c5:function(e,t,n){e.exports=n.p+"img/Purple.9f2f19a1.png"}});
//# sourceMappingURL=app.2cba4307.js.map