  // ==UserScript==
// @name         CoinMinter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Mints coins
// @author       Cruel
// @match        https://*.plemiona.pl/game.php*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        unsafeWindow
// @grant        GM_notification
// ==/UserScript==
!function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e,n){t.exports=function(){"use strict";var t="millisecond",e="second",n="minute",r="hour",i="day",s="week",o="month",a="quarter",u="year",c=/^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/,h=/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,l=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},d={s:l,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+l(r,2,"0")+":"+l(i,2,"0")},m:function(t,e){var n=12*(e.year()-t.year())+(e.month()-t.month()),r=t.clone().add(n,o),i=e-r<0,s=t.clone().add(n+(i?-1:1),o);return Number(-(n+(e-r)/(i?r-s:s-r))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(c){return{M:o,y:u,w:s,d:i,h:r,m:n,s:e,ms:t,Q:a}[c]||String(c||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},f={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m="en",g={};g[m]=f;var p=function(t){return t instanceof S},$=function(t,e,n){var r;if(!t)return m;if("string"==typeof t)g[t]&&(r=t),e&&(g[t]=e,r=t);else{var i=t.name;g[i]=t,r=i}return n||(m=r),r},y=function(t,e,n){if(p(t))return t.clone();var r=e?"string"==typeof e?{format:e,pl:n}:e:{};return r.date=t,new S(r)},w=d;w.l=$,w.i=p,w.w=function(t,e){return y(t,{locale:e.$L,utc:e.$u,$offset:e.$offset})};var S=function(){function l(t){this.$L=this.$L||$(t.locale,null,!0),this.parse(t)}var d=l.prototype;return d.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(w.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(c);if(r)return n?new Date(Date.UTC(r[1],r[2]-1,r[3]||1,r[4]||0,r[5]||0,r[6]||0,r[7]||0)):new Date(r[1],r[2]-1,r[3]||1,r[4]||0,r[5]||0,r[6]||0,r[7]||0)}return new Date(e)}(t),this.init()},d.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},d.$utils=function(){return w},d.isValid=function(){return!("Invalid Date"===this.$d.toString())},d.isSame=function(t,e){var n=y(t);return this.startOf(e)<=n&&n<=this.endOf(e)},d.isAfter=function(t,e){return y(t)<this.startOf(e)},d.isBefore=function(t,e){return this.endOf(e)<y(t)},d.$g=function(t,e,n){return w.u(t)?this[e]:this.set(n,t)},d.year=function(t){return this.$g(t,"$y",u)},d.month=function(t){return this.$g(t,"$M",o)},d.day=function(t){return this.$g(t,"$W",i)},d.date=function(t){return this.$g(t,"$D","date")},d.hour=function(t){return this.$g(t,"$H",r)},d.minute=function(t){return this.$g(t,"$m",n)},d.second=function(t){return this.$g(t,"$s",e)},d.millisecond=function(e){return this.$g(e,"$ms",t)},d.unix=function(){return Math.floor(this.valueOf()/1e3)},d.valueOf=function(){return this.$d.getTime()},d.startOf=function(t,a){var c=this,h=!!w.u(a)||a,l=w.p(t),d=function(t,e){var n=w.w(c.$u?Date.UTC(c.$y,e,t):new Date(c.$y,e,t),c);return h?n:n.endOf(i)},f=function(t,e){return w.w(c.toDate()[t].apply(c.toDate(),(h?[0,0,0,0]:[23,59,59,999]).slice(e)),c)},m=this.$W,g=this.$M,p=this.$D,$="set"+(this.$u?"UTC":"");switch(l){case u:return h?d(1,0):d(31,11);case o:return h?d(1,g):d(0,g+1);case s:var y=this.$locale().weekStart||0,S=(m<y?m+7:m)-y;return d(h?p-S:p+(6-S),g);case i:case"date":return f($+"Hours",0);case r:return f($+"Minutes",1);case n:return f($+"Seconds",2);case e:return f($+"Milliseconds",3);default:return this.clone()}},d.endOf=function(t){return this.startOf(t,!1)},d.$set=function(s,a){var c,h=w.p(s),l="set"+(this.$u?"UTC":""),d=(c={},c[i]=l+"Date",c.date=l+"Date",c[o]=l+"Month",c[u]=l+"FullYear",c[r]=l+"Hours",c[n]=l+"Minutes",c[e]=l+"Seconds",c[t]=l+"Milliseconds",c)[h],f=h===i?this.$D+(a-this.$W):a;if(h===o||h===u){var m=this.clone().set("date",1);m.$d[d](f),m.init(),this.$d=m.set("date",Math.min(this.$D,m.daysInMonth())).toDate()}else d&&this.$d[d](f);return this.init(),this},d.set=function(t,e){return this.clone().$set(t,e)},d.get=function(t){return this[w.p(t)]()},d.add=function(t,a){var c,h=this;t=Number(t);var l=w.p(a),d=function(e){var n=y(h);return w.w(n.date(n.date()+Math.round(e*t)),h)};if(l===o)return this.set(o,this.$M+t);if(l===u)return this.set(u,this.$y+t);if(l===i)return d(1);if(l===s)return d(7);var f=(c={},c[n]=6e4,c[r]=36e5,c[e]=1e3,c)[l]||1,m=this.$d.getTime()+t*f;return w.w(m,this)},d.subtract=function(t,e){return this.add(-1*t,e)},d.format=function(t){var e=this;if(!this.isValid())return"Invalid Date";var n=t||"YYYY-MM-DDTHH:mm:ssZ",r=w.z(this),i=this.$locale(),s=this.$H,o=this.$m,a=this.$M,u=i.weekdays,c=i.months,l=function(t,r,i,s){return t&&(t[r]||t(e,n))||i[r].substr(0,s)},d=function(t){return w.s(s%12||12,t,"0")},f=i.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},m={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:w.s(a+1,2,"0"),MMM:l(i.monthsShort,a,c,3),MMMM:c[a]||c(this,n),D:this.$D,DD:w.s(this.$D,2,"0"),d:String(this.$W),dd:l(i.weekdaysMin,this.$W,u,2),ddd:l(i.weekdaysShort,this.$W,u,3),dddd:u[this.$W],H:String(s),HH:w.s(s,2,"0"),h:d(1),hh:d(2),a:f(s,o,!0),A:f(s,o,!1),m:String(o),mm:w.s(o,2,"0"),s:String(this.$s),ss:w.s(this.$s,2,"0"),SSS:w.s(this.$ms,3,"0"),Z:r};return n.replace(h,(function(t,e){return e||m[t]||r.replace(":","")}))},d.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},d.diff=function(t,c,h){var l,d=w.p(c),f=y(t),m=6e4*(f.utcOffset()-this.utcOffset()),g=this-f,p=w.m(this,f);return p=(l={},l[u]=p/12,l[o]=p,l[a]=p/3,l[s]=(g-m)/6048e5,l[i]=(g-m)/864e5,l[r]=g/36e5,l[n]=g/6e4,l[e]=g/1e3,l)[d]||g,h?p:w.a(p)},d.daysInMonth=function(){return this.endOf(o).$D},d.$locale=function(){return g[this.$L]},d.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=$(t,e,!0);return r&&(n.$L=r),n},d.clone=function(){return w.w(this.$d,this)},d.toDate=function(){return new Date(this.valueOf())},d.toJSON=function(){return this.isValid()?this.toISOString():null},d.toISOString=function(){return this.$d.toISOString()},d.toString=function(){return this.$d.toUTCString()},l}();return y.prototype=S.prototype,y.extend=function(t,e){return t(e,S,y),y},y.locale=$,y.isDayjs=p,y.unix=function(t){return y(1e3*t)},y.en=g[m],y.Ls=g,y}()},function(t,e,n){"use strict";n.r(e);class r{constructor(t="keyval-store",e="keyval"){this.storeName=e,this._dbp=new Promise((n,r)=>{const i=indexedDB.open(t,1);i.onerror=()=>r(i.error),i.onsuccess=()=>n(i.result),i.onupgradeneeded=()=>{i.result.createObjectStore(e)}})}_withIDBStore(t,e){return this._dbp.then(n=>new Promise((r,i)=>{const s=n.transaction(this.storeName,t);s.oncomplete=()=>r(),s.onabort=s.onerror=()=>i(s.error),e(s.objectStore(this.storeName))}))}}let i;function s(){return i||(i=new r),i}var o=n(0);class a extends Error{constructor(...t){super(t),Error.captureStackTrace&&Error.captureStackTrace(this,a),this.name="LocationError"}}class u extends Error{constructor(...t){super(t),Error.captureStackTrace&&Error.captureStackTrace(this,u),this.name="WorkerError"}}class c{static get unsafeWindow(){return unsafeWindow}static get gameData(){return this.unsafeWindow.game_data}static sleep(t){return new Promise(e=>setTimeout(e,t))}static get resourceNames(){return["wood","stone","iron"]}}c.TIMEOUT=150,c.RESOURCE_DELAY=9e5,c.MINT_DELAY=1e4;class h{constructor(t,e,n){this.name=t,this.worker=e,this.timeSpan=n,this.nextExecution=this.calcNextExecution(),this.previousExecution=null}calcNextExecution(){return o().add(this.timeSpan,"ms").toDate()}get delay(){return o(this.nextExecution).diff(o())}}class l{constructor(){this.jobs={},this.executors=[],this.isChangingLocation=!1}async addWorker(t,e,n){this.jobs[t]?this.jobs[t].worker=e:this.jobs[t]=new h(t,e,n)}async save(){await function(t,e,n=s()){return n._withIDBStore("readwrite",n=>{n.put(e,t)})}("jobs",this.jobs)}async load(){const t=await function(t,e=s()){let n;return e._withIDBStore("readonly",e=>{n=e.get(t)}).then(()=>n.result)}("jobs");return!!t&&(Object.keys(t).map(e=>{const n=new h;return Object.assign(n,t[e])}).forEach(t=>{this.jobs[t.name]=t}),!0)}async executeJob(t){try{t.previousExecution=t.nextExecution,t.nextExecution=t.calcNextExecution(),await this.save(),this.isChangingLocation=t.worker.run()}catch(e){e instanceof a?(t.nextExecution=t.previousExecution,await this.save(),this.isChangingLocation=!0,location=t.worker.location):e instanceof u?console.info(`Skipping execution due to worker error: ${e}`):console.error(`Failed ${t.name} execution, ex: ${e}`)}finally{console.log(`Executed ${t.name} prev: ${t.previousExecution} next: ${t.nextExecution}`),this.isChangingLocation||(await c.sleep(c.TIMEOUT),this.run())}}run(){const t=Object.keys(this.jobs).map(t=>this.jobs[t]).reduce((t,e)=>e.delay<t.delay?e:t);console.log(`Scheduled ${t.name} on: ${t.nextExecution}`),setTimeout(async t=>{await this.executeJob(t)},t.delay,t)}}const d=Object.freeze({CALL_RESOURCES:{screen:"market",mode:"call",params:{page:-1}},MINT:{screen:"snob",mode:null,params:{}},RECRUIT:{screen:"barracks",mode:"train",params:{}},BUILD:{screen:"main",mode:null,params:{}}});class f{constructor(t,e=c.gameData){this.page=t,this.gameData=e}get location(){let t=`${this.gameData.link_base_pure}${this.page.screen}`;return this.page.mode&&(t+=`&mode=${this.page.mode}`),t+=`&${Object.keys(this.page.params).map(t=>`${t}=${this.page.params[t]}`).join("&")}`,t}get isCaptchaPresent(){return!1}get pageValid(){return this.gameData.screen===this.page.screen&&this.gameData.mode===this.page.mode}validatePage(){if(!this.pageValid)throw new a("Invalid Page")}run(){throw new Error("Method 'run' not implemented")}}class m extends f{constructor(t,e="a#coin_mint_fill_max + input[type=submit]"){super(t),this.mintSelector=e}mintCoins(){const t=document.querySelector(this.mintSelector);if(!t){if(!this.areResourcesValid)throw new a("Snoob page needs to be refreshed");throw new u("Mint button not found")}t.click()}get areResourcesValid(){const t=c.resourceNames.map(t=>({name:t,value:c.gameData.village[t]})).reduce((t,e)=>e.value<t.value?e:t);return c.unsafeWindow.BuildingSnob.Modes.train.storage_item[t.name]>t.value}selectAllCoins(){c.unsafeWindow.BuildingSnob.Modes.train.fillMaxMintable()}run(){return this.validatePage(),this.selectAllCoins(),this.mintCoins(),!0}}class g extends f{constructor(t,e="input[name=select-all]",n="form[name=call-resources] > input[type=submit]"){super(t),this.toggleAllSelector=e,this.submitSelector=n}clickButton(t,e){const n=document.querySelector(t);if(!n)throw new u(`${e} button could not be found!`);n.click()}run(){return this.validatePage(),this.clickButton(this.toggleAllSelector,"toggleAllVillages"),this.clickButton(this.submitSelector,"submitForm"),!1}}async function p(){const t=new l,e=new m(d.MINT),n=new g(d.CALL_RESOURCES);await t.load(),t.addWorker("minter",e,c.MINT_DELAY),t.addWorker("caller",n,c.RESOURCE_DELAY),t.run()}window.main=p,p()}]);