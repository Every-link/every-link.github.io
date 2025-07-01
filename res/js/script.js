const store = PetiteVue.reactive({
/*________________________________________________________________*/

title: "Every-Link",
description: "",

/*________________________________________________________________*/

R: {
// router





// v-if="hash === '/'"

hash: window.location.hash || "#/",

hashUpdate(){
window.addEventListener('hashchange', () => {this.hash = window.location.hash})
},


//url 
name: window.location.hostname,
root: window.location.origin,
path: window.location.pathname,
url: window.location.origin + window.location.pathname, // nor params
currentUrl: window.location.href,
//url

/*________________________*/

query: new URLSearchParams(window.location.search).get('q') || 'search',
get encodedQuery() { return encodeURIComponent(this.query) },

q: new URLSearchParams(window.location.search).get('q'),



}, //router

/*________________________________________________________________*/

Device: {

get display() {
if (window.innerWidth < 601) { return "s" }
else if (window.innerWidth < 993) { return "m" }
else if (window.innerWidth > 993) { return "l" }
},
/*________________________*/
get screen() {
if (window.screen.width < 601) { return "small" }
else if (window.screen.width < 993) { return "medium" }
else if (window.screen.width > 993) { return "large" }
},
/*________________________*/
get type() {
if (/Mobile|iPhone|Android|Harmony|HUAWEI/i.test(navigator.userAgent) && window.screen.width < 601) { return "mobile" }
else if (/Tablet|iPad|Android|Harmony|HUAWEI/i.test(navigator.userAgent) && window.screen.width < 993) { return "tablet" }
else if (/Desktop|Macintosh|Mac OS X|Windows NT|X11|linux|CrOS/i.test(navigator.userAgent) && screen.width > 993) { return "desktop" }
else if (/SmartTV|Smart-TV|HbbTV|NetCast|Tizen|Web0S/i.test(navigator.userAgent) && window.screen.width > 993) { return "tv" }
else if (/Xbox|PlayStation|Nintendo/i.testnavigator.userAgent) { return "gaming" }
else { return "unknown" }
},
/*________________________*/
get os() {
if (/Android/i.test(navigator.userAgent)) { return "android" }
else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) { return "ios" }
else if (/Harmony|HUAWEI/i.test(navigator.userAgent)) { return "harmony" }
else if (/Windows NT/i.test(navigator.userAgent)) { return "windows" }
else if (/Macintosh|Mac OS X/ / i.test(navigator.userAgent)) { return "mac" }
else if (/Linux/i.test(navigator.userAgent)) { return "linux" }
else if (/CrOS/i.test(navigator.userAgent)) { return "chromeOs" }
else if (/KaiOS/i.test(navigator.userAgent)) { return "kaios" }
else if (/Tizen/i.test(navigator.userAgent)) { return "tizen" }
else { return "unknown" }
},
/*________________________*/
get browser() {
if (/Chrome/i.test(navigator.userAgent)) { return "chrome" }
else if (/Safari/i.test(navigator.userAgent)) { return "safari" }
else if (/Firefox/i.test(navigator.userAgent)) { return "firefox" }
else if (/Edg|Edge/i.test(navigator.userAgent)) { return "edge" }
else if (/Opera|OPR/i.test(navigator.userAgent)) { return "opera" }
else if (/MSIE|Trident/i.test(navigator.userAgent)) { return "IE" }
else { return "unknown" }
},

}, //device

/*________________________________________________________________*/

Categories: JSON.parse(localStorage.getItem('categories')) || [
{ N: "Web", id: "web", I: "globe", V: true },
{ N: "AI", id: "ai", I: "robot_2", V: true },
{ N: "Information", id: "information", I: "description", V: false },
{ N: "News", id: "news", I: "newspaper", V: false },
{ N: "Maps", id: "maps", I: "location_on", V: false },
{ N: "Translation", id: "translation", I: "translate", V: false },
{ N: "Sports", id: "sports", I: "sports_soccer", V: false },
{ N: "Social Media", id: "socialMedia", I: "groups", V: false },
{ N: "Jobs", id: "jobs", I: "badge", V: false },
{ N: "Images", id: "images", I: "image", V: false },
{ N: "Videos", id: "videos", I: "smart_display", V: false },
{ N: "Music", id: "music", I: "library_music", V: false },
{ N: "Movies & Shows", id: "moviesShows", I: "movie", V: false },
{ N: "Books", id: "books", I: "menu_book", V: false },
{ N: "Shopping", id: "shopping", I: "shopping_cart", V: false },
{ N: "Hotels", id: "hotels", I: "apartment", V: false },
{ N: "Flights", id: "flights", I: "flight", V: false },
{ N: "Education", id: "education", I: "school", V: false },
{ N: "Contacts", id: "contacts", I: "contacts", V: false },
{ N: "Apps", id: "apps", I: "apps", V: false },
{ N: "SEO", id: "seo", I: "web_traffic", V: false },
{ N: "Marketing", id: "marketing", I: "bar_chart", V: false },
{ N: "Developers", id: "developers", I: "terminal", V: false },
{ N: "torrent", id: "torrent", I: "dns", V: false },
{ N: "Others", id: "others", I: "more_horiz", V: false },
],





/*________________________________________________________________*/

//general

localSet(name, value) {localStorage.setItem(name, JSON.stringify(value))},
localGet(name, fall = null){
if(name) {return JSON.parse(localStorage.getItem(name))} else {return fall}
},

async copy(text) {
try { await navigator.clipboard.writeText(text); ui("#copy", 999);} 
catch (error) { console.warn("Copy failed:", error) }
},

async share(name, text) {
if (!navigator.share) {ui("#share"); return;};
try { await navigator.share({ title: name, url: text }) } 
catch (error) { console.warn("Share canceled:", error) }
},

/*________________________________________________________________*/

//visibility
advancedVisibility: JSON.parse(localStorage.getItem("advanced") || "false"),
linksVisibility: JSON.parse(localStorage.getItem("linksVisibility") || "false"),
/*________________________________________________________________*/

X: {

Engines: [
  { N: "Google", L: {b: "google.com/search", p: "q"} },
  { N: "Bing", L: {b: "bing.com/search", p: "q"} },
  { N: "Yandex", L: {b: "yandex.com/search/", p: "text"} },
  { N: "Yahoo", L: {b: "search.yahoo.com/search", p: "p"} },
  { N: "Startpage", L: {b: "startpage.com/do/search", p: "q"} },
  { N: "Qwant", L: {b: "www.qwant.com", p: "q"} },
  { N: "Ecosia", L: {b: "ecosia.org/search", p: "q"} },
  { N: "Entireweb", L: {b: "entireweb.com/search.php", p: "q"} },
  { N: "Aol", L: {b: "search.aol.com/aol/search/", p: "q"} },
  { N: "Searchalot", L: {b: "searchalot.com", p: "q"} },
  { N: "Marginalia", L: {b: "marginalia-search.com/search", p: "query"} },
  { N: "Duckduckgo", L: {b: "duckduckgo.com", p: "q"} },
  { N: "Brave", L: {b: "search.brave.com/search", p: "q"} },
  { N: "Yep", L: {b: "yep.com/web", p: "q"} },
  { N: "Gibiru", L: {b: "gibiru.com/results.html", p: "q"} },
  { N: "Myallsearch", L: {b: "www.myallsearch.com/search", p: "q"} },
],

engine: JSON.parse(localStorage.getItem("engine")) || { N: "Google", L: {b: "google.com/search", p: "q"} },

get url(){ return `${this.engine.L.b}?${this.engine.L.p}=` },


},

/*________________________________________________________________*/




/*________________________________________________________________*/


component: {

/*________________________________________________________________*/
navTop(m) {return {

theme: JSON.parse(localStorage.getItem('theme')) || "light",
changeTheme() {
if (this.theme === "light") {this.theme = "dark"}
else if (this.theme === "dark") {this.theme = "light"}
document.body.className = this.theme; 
this.$S.localSet("theme", this.theme);
},

moreMenu: m,

$template: `

<button :class="[ $S.Device.display === 's' ? 'square' : 'small-round', 'transparent border extra']" data-ui="#drawer">
<i>menu</i><span v-if="$S.Device.display != 's'">Menu</span>
</button>

<div class="max"></div>
<h5 class="center-align" v-text="$S.title"></h5>
<div class="max"></div>

<button v-show="moreMenu !== false" :class="[ $S.Device.display === 's' ? 'square' : 'small-round', 'transparent border']" data-ui="#moreMenu">
<i>edit_note</i><span v-if="$S.Device.display != 's'">Edit</span>
</button>


<button :class="[ $S.Device.display === 's' ? 'square' : 'small-round', 'transparent border']" @click="changeTheme()">
<i v-text="theme + '_mode'"></i>
</button>

`}},
/*________________________________________________________________*/
share() {return {

title: document.title, 
url: window.location.href,


$template: `

<button class="transparent border primary-border fill elevate small-round margin large fixed bottom right s m" @click="$S.share(title, url)" v-show="$S.Device.type === 'mobile' || $S.Device.type === 'tablet'"><i>share</i> </button>

<div class="snackbar error" id="share"> Your browser is not supported</div>

`}},
/*________________________________________________________________*/
drawer() {return {

// name, icon, class
menu: [
{ N: "Homepage", I: "home", C: "s m l", U: "/index.html", },
{ N: "web", I: "search", C: "s m l", U: "/search/web.html", },
{ N: "ai", I: "link", C: "s m l", U: "/search/ai.html", },
{ N: "tmp", I: "link", C: "s m l", U: "/TMP.html", },
],


$template: `
<div class="overlay small-blur"></div>

<dialog id="drawer" class="left scroll">

<header class="fixed">
<nav>
<h6 class="max large">Menu</h6>
<button class="transparent border link small-round" data-ui="#drawer">
<span>Close</span> <i>close</i>
</button>
</nav>
</header>

<div class="space"> </div>

<ul class="list">

<li v-for="L in menu" :class="[{'fill border primary-border': $S.R.path === L.U}, L.C, '', 'wave small-round']">
<a :href="L.U"><i v-text="L.I"></i> <span v-text="L.N"></span></a>
</li>

</ul>

</dialog>


`}},
/*________________________________________________________________*/
moreMenu() {return {

reset(){

// Clear cookies
document.cookie.split(";").forEach(cookie => {
const name = cookie.split("=")[0].trim();
document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
});
    
localStorage.clear(); // Clear localStorage
sessionStorage.clear(); // Clear sessionStorage

    
// Clear cache
if ('caches' in window) {
  caches.keys().then(cacheNames => {
    cacheNames.forEach(cacheName => {caches.delete(cacheName)});
});
};
    
// Clear IndexedDB (modern browsers)
if (window.indexedDB) {
  indexedDB.databases().then(dbs => {
    dbs.forEach(db => {indexedDB.deleteDatabase(db.name)});
  });
};
    
// Clear Service Worker registrations
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(registration => {registration.unregister()});
  });
};

// road page
window.location.reload();

},

$template: `

<div class="overlay small-blur"></div>
<dialog id="moreMenu" class="right scroll no-padding">

<header class="fixed padding">
<nav>
<h6 class="max">Categories</h6>
<button class="transparent border link small-round" data-ui="#moreMenu">
<span>Close</span><i>close</i>
</button>
</nav>
</header>

<ul class="list border">

<li v-for="(C, I) in $S.Categories" :key="C.id">
<i v-text="C.I"></i>
<h6 class="small" v-text="C.N"></h6>
<div class="max"></div>
<label class="switch icon">
<input v-model="C.V" type="checkbox" @change="$S.localSet('categories', $S.Categories)" :disabled="I === 0">
<span> <i>visibility_off</i> <i>visibility</i> </span>
</label>
</li>


<li>
<i>forms_add_on</i>
<div class="max">
<h6 class="small">My Links</h6>
<div class="wrap">Add more websites</div>
</div>
<label class="switch icon">
<input v-model="$S.linksVisibility" type="checkbox" @change="$S.localSet('linksVisibility', $S.linksVisibility)">
<span> <i>visibility_off</i> <i>visibility</i> </span>
</label>
</li>


<li>
<i>pageview</i>
<div class="max">
<h6 class="small">Advanced Search</h6>
<div class="wrap">Use search engines</div>
</div>
<label class="switch icon">
<input v-model="$S.advancedVisibility" type="checkbox" @change="$S.localSet('advanced', $S.advancedVisibility)">
<span> <i>visibility_off</i> <i>visibility</i> </span>
</label>
</li>

</ul>

<div class="margin">
<div class="field label prefix suffix border">
<i>search</i>
<select v-model="$S.X.engine" @change="$S.localSet('engine', $S.X.engine)">
<option v-for="(E, I) in $S.X.Engines" :key="E.L.b" :value="E" :selected="$S.X.engine.L.b === E.L.b" v-text="E.N"></option>
</select>

<label>Default Search Engine</label>
<i>arrow_drop_down</i>
</div>
</div>


<div class="divider"></div>

<nav class="right-align padding">
<button class="error small-round" data-ui="#reset">
<i>refresh</i>
<span>reset</span>
</button>
</nav>

</dialog>


<div class="overlay small-blur"></div>
<dialog id="reset">
  <h5 class="small">Reset your preferences </h5>
  <p>this will reset hidden categories , Preferred Search engine, and delete your custom Links as well.</p>
  <nav class="right-align no-space">
    <button class="transparent link" data-ui="#reset">Cancel</button>
    <button class="border error-text error-border small-round" @click="reset()">Confirm</button>
  </nav>
</dialog>



`}},
/*________________________________________________________________*/
comments(i) {return {

identifier: i,

comments(){

if (this.identifier) {
var disqus_config = function () {
this.page.url = window.location.origin + window.location.pathname;
this.page.identifier = this.identifier;
};
}

const script = document.createElement('script');
script.src = 'https://every-link.disqus.com/embed.js';
script.async = true;
script.setAttribute('data-timestamp', Date.now());
document.body.appendChild(script);
},

$template: `
<div id="disqus_thread" @vue:mounted="comments">
<div class="middle-align vertical padding">
<progress class="circle"></progress> 
<span>Loading</span>
</div>
</div>
`}},
/*________________________________________________________________*/
form() {return {


$template: `

<form class="middle-align center-align top-margin bottom-margin" :action="$S.R.path" target="_self" method="GET">
<nav :class="$S.Device.display === 's' ? 'medium-width' : 'large-width'" class="medium-width">

<div class="max field border small-round primary-border">
<input type="text" name="q" v-model="$S.R.query">
</div>
<button type="submit" class="transparent border primary-border fill small-round large">
<i>search</i> <span class="m l">Search</span>
</button>

</nav>
</form>

`}},
/*________________________________________________________________*/
tabs(t) {return {

tab: t,

scroll() {
document.querySelector(`[data-tab=${this.tab}]`).scrollIntoView({ behavior: 'auto', block: 'center', inline: 'center' });
},


$template: `

<nav class="row scroll" @vue:mounted="scroll">

<a v-for="(C, I) in $S.Categories.filter(C => C.V || C.id == tab )" :key="C.id" :class="[{'border primary-border fill' : C.id == tab}, 'vertical padding small-round']" :href="'/search/' + C.id + '.html' + '?q=' + $S.R.encodedQuery" :data-tab="C.id">
  <i v-text="C.I"></i> <span v-text="C.N"></span>
</a>


<a data-ui="#links" :class="[{'border primary-border fill' : tab == 'my-links'}, 'vertical padding small-round']" v-show="$S.linksVisibility || tab == 'my-links'" :href="'/search/my-links.html' + '?q=' + $S.R.encodedQuery" data-tab="my-links">
<i>edit_note</i> <span>My List</span>
</a>


<a data-ui="#advanced" :class="[{'border primary-border fill' : tab == 'advanced'}, 'vertical padding small-round']" v-show="$S.advancedVisibility || tab == 'advanced'" :href="'/search/advanced.html' + '?q=' + $S.R.encodedQuery" data-tab="advanced">
<i>pageview</i> <span>Advanced</span>
</a>


<button data-ui="#moreMenu" class="transparent vertical padding small-round">
<i>forms_add_on</i> <span>More</span>
</button>

</nav>

`}},
/*________________________________________________________________*/
content(s,m) {return {

sites: s,
myLinks: m || {},

$template: `

<div class="grid">
<article v-for="(S, I) in sites || []" :class="[S.C, 's12 m6 l4 small-round']">

<div class="row">

<a v-if="S.L" class="row max" :href="'https://' + S.L.b + (S.L.p ? S.L.p + $S.R.encodedQuery : '') + (S.L.s ? S.L.s : '')" rel="nofollow" target="_blank">
<img class="round" :src="'https://www.google.com/s2/favicons?sz=256&domain=' + (S.I ? S.I : S.L.b)" alt="icon" loading="lazy">
<div class="max">
<h5 class="small" v-text="S.N"></h5>
<p class="row no-space" style="word-break: break-all; overflow: hidden;">
<i v-if="!S.L.p" class="red-text">search_off</i>
<span v-text="'https://' + S.L.b + (S.L.p ? S.L.p + $S.R.query : '') + (S.L.s ? S.L.s : '')" class="link"></span>
</p>
</div>
</a>


<div v-if="S.alt && !S.L" class="row max">
<button v-if="S.I" class="transparent fill square extra"><i class="extra" v-text="S.I"></i></button>
<button v-if="S.I === undefined" class="transparent fill square extra"><i class="extra">data_table</i></button>
<div class="max">
<h5 class="small" v-text="S.N"></h5>
<p class="row link" v-if="S.D" v-text="S.D" style="word-break: break-all; overflow: hidden;"></p>
</div>
</div>


<button class="small-round transparent border" v-if="myLinks.edit !== undefined && myLinks.edit === true" @click="myLinks.removeLink(I)">
  <i class="red-text">delete</i>
</button>

<button :data-ui="'#sites-menu-' + I" class="small-round transparent border">
  <i>more_vert</i><span v-if="!S.L">menu</span>

<menu :id="'sites-menu-' + I" :class="[I == 0 && $S.Device.display == 's' ? 'bottom' : I <= 1 && $S.Device.display == 'm' ? 'bottom' : I <= 2 && $S.Device.display == 'l' ? 'bottom' : 'top' , 'left no-wrap no-padding']">

<li v-if="S.L && S.L.p">
<a class="row" :href="'https://' + S.L.b" rel="nofollow" target="_blank">
<i class="green-text">home_app_logo</i> <span>Homepage</span>
</a>
</li>
<li v-if="S.L && S.L.x !== false">
<a class="row" :href="'https://' + $S.X.url + 'site:' + S.L.b + '+&quot;' + $S.R.encodedQuery + '&quot;'" rel="nofollow" target="_blank">
<i class="blue-text">travel_explore</i> <span v-text="$S.X.engine.N + ' Search'"></span>
</a>
</li>
<li v-if="S.DL && ($S.Device.os == 'android' || $S.Device.os == 'ios' || $S.Device.os == 'harmony')">
<a class="row" :href="S.DL.b + (S.DL.p ? S.DL.p + $S.R.encodedQuery : '') + (S.DL.s ? S.DL.s : '')" rel="nofollow">
<i>phone_iphone</i> <span>Open App</span>
</a>
</li>
<li v-if="S.A && $S.Device.os == 'android'">
<a class="row" :href="'market://details?id=' + S.A.a" rel="nofollow">
<i>system_update</i> <span>Download App</span>
</a>
</li>
<li v-if="S.A && $S.Device.os == 'ios'">
<a class="row" :href="'itms-apps://itunes.apple.com/app/' + S.A.i" rel="nofollow">
<i>system_update</i> <span>Download App</span>
</a>
</li>

<div class="divider"></div>

<li v-if="S.L" @click="$S.copy( 'https://' + S.L.b + (S.L.p ? S.L.p + $S.R.encodedQuery : '') + (S.L.s ? S.L.s : '') )">
  <i>content_copy</i> <span>Copy link</span>
</li>

<li v-if="S.L && ($S.Device.os == 'android' || $S.Device.os == 'ios' )" @click="$S.share( S.N, 'https://' + S.L.b + (S.L.p ? S.L.p + $S.R.encodedQuery : '') + (S.L.s ? S.L.s : '') )">
  <i>share</i> <span>Share link</span>
</li>


<div v-show="S.alt" class="divider"></div>

<li v-for="(s, i) in S.alt || []" :data-ui="'#sites-menu-sub-' + i" :class="s.C">
<div class="horizontal-padding row">
<img class="tiny square" :src="'https://www.google.com/s2/favicons?sz=256&domain=' + (s.I ? s.I : s.L.b)" alt="icon" loading="lazy">
<span v-text="s.N"></span> <i>arrow_drop_down</i>
</div>

<menu :id="'sites-menu-sub-' + i" class="top left no-wrap no-padding">

<li v-if="s.L">
<a class="row" :href="'https://' + s.L.b + (s.L.p ? s.L.p + $S.R.encodedQuery : '') + (s.L.s ? s.L.s : '')" rel="nofollow" target="_blank">
<i :class="s.L.p ? 'green-text' : 'red-text'" v-text="s.L.p ? 'pageview' : 'search_off'"></i> <span v-text="s.L.p ? 'open' : 'Homepage'"></span>
</a>
</li>
<li v-if="s.L.p">
<a class="row" :href="'https://' + s.L.b" rel="nofollow" target="_blank">
<i class="green-text">home_app_logo</i> <span>Homepage</span>
</a>
</li>
<li v-if="s.L && s.L.x !== false">
<a class="row" :href="'https://' + $S.X.url + 'site:' + s.L.b + '+&quot;' + $S.R.encodedQuery + '&quot;'" rel="nofollow" target="_blank">
<i class="blue-text">travel_explore</i> <span v-text="$S.X.engine.N + ' Search'"></span>
</a>
</li>
<li v-if="s.DL && ($S.Device.os == 'android' || $S.Device.os == 'ios' || $S.Device.os == 'harmony')">
<a class="row" :href="s.DL.b + (s.DL.p ? s.DL.p + $S.R.encodedQuery : '') + (s.DL.s ? s.DL.s : '')" rel="nofollow">
<i>phone_iphone</i> <span>Open App</span>
</a>
</li>
<li v-if="s.A && $S.Device.os == 'android'">
<a class="row" :href="'market://details?id=' + s.A.a" rel="nofollow">
<i>system_update</i> <span>Download App</span>
</a>
</li>
<li v-if="s.A && $S.Device.os == 'ios'">
<a class="row" :href="'itms-apps://itunes.apple.com/app/' + s.A.i" rel="nofollow">
<i>system_update</i> <span>Download App</span>
</a>
</li>

<div class="divider"></div>

<li v-if="s.L" @click="$S.copy( 'https://' + s.L.b + (s.L.p ? s.L.p + $S.R.encodedQuery : '') + (s.L.s ? s.L.s : '') )">
<i>content_copy</i> <span>Copy link</span>
</li>
<li v-if="s.L && ($S.Device.os == 'android' || $S.Device.os == 'ios' )" @click="$S.share(s.N, 'https://' + s.L.b + (s.L.p ? s.L.p + $S.R.encodedQuery : '') + (s.L.s ? s.L.s : '') )">
<i>share</i> <span>Share link</span>
</li>

</menu>
</li>

</menu>
</button>

</div>
</article>
</div>



`}},
/*________________________________________________________________*/



},

/*________________________________________________________________*/
mounted() {

//serviceWorker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
;}


//router
this.R.hashUpdate();



const theme = JSON.parse(localStorage.getItem('theme')) || null;
if (theme) {document.body.className = theme};



  
},

/*________________________________________________________________*/

});

// v-effect="watch()"
// @vue:mounted="mounted()"
