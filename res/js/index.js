
const App = PetiteVue.createApp({
/*________________________________________________________________*/
$delimiters: ['{{', '}}'],
/*________________________________________________________________*/



title: "Every-Link",
description: "",

/*________________________________________________________________*/

Router: {
// router


// v-if="hash.path === '/'"

// hash: window.location.hash || "#/",


hash: {},
getHash() {
const hash = location.hash.slice(1);
const [path, queryString] = hash.split('?');
const query = new URLSearchParams(queryString || '');
  this.hash = {
    path: path || '/',
    tab: query.get('tab') || '',
    q: query.get('q') || ''
  };
},

hashUpdate(){
  this.getHash(); // Set initial value
  window.addEventListener('hashchange', () => this.getHash());
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
tab: new URLSearchParams(window.location.search).get('tab'),
page: new URLSearchParams(window.location.search).get('page') || 'homepage',





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
engine: JSON.parse(localStorage.getItem("engine")) || { N: "Google", L: {b: "google.com/search", p: "q"} },
get url(){ return `${this.engine.L.b}?${this.engine.L.p}=` },
},

/*________________________________________________________________*/

component: {

/*________________________________________________________________*/
navTop(m) {return {

theme: JSON.parse(localStorage.getItem('theme')) || "light",
changeTheme() {
if (this.theme === "light") {this.theme = "dark"}
else if (this.theme === "dark") {this.theme = "light"}
document.body.className = this.theme; 
this.localSet("theme", this.theme);
},

moreMenu: m,

$template: `

<button :class="[ Device.display === 's' ? 'square' : 'small-round', 'transparent border extra']" data-ui="#drawer">
<i>menu</i><span v-if="Device.display != 's'">Menu</span>
</button>

<div class="max"></div>
<h5 class="center-align" v-text="title"></h5>
<div class="max"></div>

<button v-show="moreMenu !== false" :class="[ Device.display === 's' ? 'square' : 'small-round', 'transparent border']" data-ui="#moreMenu">
<i>edit_note</i><span v-if="Device.display != 's'">Edit</span>
</button>


<button :class="[ Device.display === 's' ? 'square' : 'small-round', 'transparent border']" @click="changeTheme()">
<i v-text="theme + '_mode'"></i>
</button>

`}},
/*________________________________________________________________*/
share() {return {

title: document.title, 
url: window.location.href,


$template: `

<button class="transparent border primary-border fill elevate small-round margin large fixed bottom right s m" @click="share(title, url)" v-show="Device.type === 'mobile' || Device.type === 'tablet'"><i>share</i> </button>

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

<li v-for="L in menu" :class="[{'fill border primary-border': Router.path === L.U}, L.C, '', 'wave small-round']">
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

<li v-for="(C, I) in Categories" :key="C.id">
<i v-text="C.I"></i>
<h6 class="small" v-text="C.N"></h6>
<div class="max"></div>
<label class="switch icon">
<input v-model="C.V" type="checkbox" @change="localSet('categories', Categories)" :disabled="I === 0">
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
<input v-model="linksVisibility" type="checkbox" @change="localSet('linksVisibility', linksVisibility)">
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
<input v-model="advancedVisibility" type="checkbox" @change="localSet('advanced', advancedVisibility)">
<span> <i>visibility_off</i> <i>visibility</i> </span>
</label>
</li>

</ul>

<div class="margin">
<div class="field label prefix suffix border" v-scope="component.input()"></div>
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

<form class="middle-align center-align top-margin bottom-margin" :action="Router.path" target="_self" method="GET">
<nav :class="Device.display === 's' ? 'medium-width' : 'large-width'" class="medium-width">

<div class="max field border small-round primary-border">
<input type="text" name="q" v-model="Router.query">
</div>
<button type="submit" class="transparent border primary-border fill small-round large">
<i>search</i> <span class="m l">Search</span>
</button>

</nav>
</form>

`}},
/*________________________________________________________________*/
tabs() {return {

scroll() {
document.querySelector(`[data-tab=${this.Router.tab}]`).scrollIntoView({ behavior: 'auto', block: 'center', inline: 'center' });
},


$template: `

<nav class="row scroll" @vue:mounted="scroll">

<a v-for="(C, I) in Categories.filter(C => C.V || C.id == Router.tab )" :key="C.id" :class="[{'border primary-border fill' : C.id == Router.tab}, 'vertical padding small-round']" :href="Router.path + '?tab=' + C.id + '&q=' + Router.encodedQuery" :data-tab="C.id">
  <i v-text="C.I"></i> <span v-text="C.N"></span>
</a>


<a data-ui="#links" :class="[{'border primary-border fill' : Router.tab == 'my-links'}, 'vertical padding small-round']" v-show="linksVisibility || Router.tab == 'my-links'" :href="Router.path + '?tab=my-links' + '&q=' + Router.encodedQuery" data-tab="my-links">
<i>edit_note</i> <span>My List</span>
</a>


<a data-ui="#advanced" :class="[{'border primary-border fill' : Router.tab == 'advanced'}, 'vertical padding small-round']" v-show="advancedVisibility || Router.tab == 'advanced'" :href="Router.path + '?tab=advanced' + '&q=' + Router.encodedQuery" data-tab="advanced">
<i>pageview</i> <span>Advanced</span>
</a>


<button data-ui="#moreMenu" class="transparent vertical padding small-round">
<i>forms_add_on</i> <span>More</span>
</button>

</nav>

`}},
/*________________________________________________________________*/
content(s,m) {return {

data: s || [],
myLinks: m || {},

$template: `

<div v-if="data == null" class="middle-align vertical padding">
<progress class="circle"></progress> 
<span>Loading</span>
</div>




<div v-else class="grid">
<article v-for="(S, I) in data" :class="[S.C, 's12 m6 l4 small-round']">

<div class="row">

<a v-if="S.L" class="row max" :href="'https://' + S.L.b + (S.L.p ? S.L.p + Router.encodedQuery : '') + (S.L.s ? S.L.s : '')" rel="nofollow" target="_blank">
<img class="round" :src="'https://www.google.com/s2/favicons?sz=256&domain=' + (S.I ? S.I : S.L.b)" alt="icon" loading="lazy">
<div class="max">
<h5 class="small" v-text="S.N"></h5>
<p class="row no-space" style="word-break: break-all; overflow: hidden;">
<i v-if="!S.L.p" class="red-text">search_off</i>
<span v-text="'https://' + S.L.b + (S.L.p ? S.L.p + Router.query : '') + (S.L.s ? S.L.s : '')" class="link"></span>
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

<menu :id="'sites-menu-' + I" :class="[I == 0 && Device.display == 's' ? 'bottom' : I <= 1 && Device.display == 'm' ? 'bottom' : I <= 2 && Device.display == 'l' ? 'bottom' : 'top' , 'left no-wrap no-padding']">

<li v-if="S.L && S.L.p">
<a class="row" :href="'https://' + S.L.b" rel="nofollow" target="_blank">
<i class="green-text">home_app_logo</i> <span>Homepage</span>
</a>
</li>
<li v-if="S.L && S.L.x !== false">
<a class="row" :href="'https://' + X.url + 'site:' + S.L.b + '+&quot;' + Router.encodedQuery + '&quot;'" rel="nofollow" target="_blank">
<i class="blue-text">travel_explore</i> <span v-text="X.engine.N + ' Search'"></span>
</a>
</li>
<li v-if="S.DL && (Device.os == 'android' || Device.os == 'ios' || Device.os == 'harmony')">
<a class="row" :href="S.DL.b + (S.DL.p ? S.DL.p + Router.encodedQuery : '') + (S.DL.s ? S.DL.s : '')" rel="nofollow">
<i>phone_iphone</i> <span>Open App</span>
</a>
</li>
<li v-if="S.A && Device.os == 'android'">
<a class="row" :href="'market://details?id=' + S.A.a" rel="nofollow">
<i>system_update</i> <span>Download App</span>
</a>
</li>
<li v-if="S.A && Device.os == 'ios'">
<a class="row" :href="'itms-apps://itunes.apple.com/app/' + S.A.i" rel="nofollow">
<i>system_update</i> <span>Download App</span>
</a>
</li>

<div class="divider"></div>

<li v-if="S.L" @click="copy( 'https://' + S.L.b + (S.L.p ? S.L.p + Router.encodedQuery : '') + (S.L.s ? S.L.s : '') )">
  <i>content_copy</i> <span>Copy link</span>
</li>

<li v-if="S.L && (Device.os == 'android' || Device.os == 'ios' )" @click="share( S.N, 'https://' + S.L.b + (S.L.p ? S.L.p + Router.encodedQuery : '') + (S.L.s ? S.L.s : '') )">
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
<a class="row" :href="'https://' + s.L.b + (s.L.p ? s.L.p + Router.encodedQuery : '') + (s.L.s ? s.L.s : '')" rel="nofollow" target="_blank">
<i :class="s.L.p ? 'green-text' : 'red-text'" v-text="s.L.p ? 'pageview' : 'search_off'"></i> <span v-text="s.L.p ? 'open' : 'Homepage'"></span>
</a>
</li>
<li v-if="s.L.p">
<a class="row" :href="'https://' + s.L.b" rel="nofollow" target="_blank">
<i class="green-text">home_app_logo</i> <span>Homepage</span>
</a>
</li>
<li v-if="s.L && s.L.x !== false">
<a class="row" :href="'https://' + X.url + 'site:' + s.L.b + '+&quot;' + Router.encodedQuery + '&quot;'" rel="nofollow" target="_blank">
<i class="blue-text">travel_explore</i> <span v-text="X.engine.N + ' Search'"></span>
</a>
</li>
<li v-if="s.DL && (Device.os == 'android' || Device.os == 'ios' || Device.os == 'harmony')">
<a class="row" :href="s.DL.b + (s.DL.p ? s.DL.p + Router.encodedQuery : '') + (s.DL.s ? s.DL.s : '')" rel="nofollow">
<i>phone_iphone</i> <span>Open App</span>
</a>
</li>
<li v-if="s.A && Device.os == 'android'">
<a class="row" :href="'market://details?id=' + s.A.a" rel="nofollow">
<i>system_update</i> <span>Download App</span>
</a>
</li>
<li v-if="s.A && Device.os == 'ios'">
<a class="row" :href="'itms-apps://itunes.apple.com/app/' + s.A.i" rel="nofollow">
<i>system_update</i> <span>Download App</span>
</a>
</li>

<div class="divider"></div>

<li v-if="s.L" @click="copy( 'https://' + s.L.b + (s.L.p ? s.L.p + Router.encodedQuery : '') + (s.L.s ? s.L.s : '') )">
<i>content_copy</i> <span>Copy link</span>
</li>
<li v-if="s.L && (Device.os == 'android' || Device.os == 'ios' )" @click="share(s.N, 'https://' + s.L.b + (s.L.p ? s.L.p + Router.encodedQuery : '') + (s.L.s ? s.L.s : '') )">
<i>share</i> <span>Share link</span>
</li>

</menu>
</li>

</menu>
</button>

</div>
</article>
</div>

<div class="snackbar" id="copy"><i>done</i> <span>Copied</span></div>


`}},
/*________________________________________________________________*/
myLinks() {return {

myLinks: {
  
  edit: false,
  
  links: JSON.parse(localStorage.getItem('links')) || [],
  newLink: { N: "", L: {b: "", p: "" }},
  
  saveLinks() { localStorage.setItem("links", JSON.stringify(this.links)) },
  
  removeLink(index) {
    this.links.splice(index, 1); 
    this.saveLinks() 
  },
  
  addLink() { 
  this.links.push({ N: this.newLink.N, L: { b: this.newLink.L.b,  p: this.newLink.L.p }});
  this.saveLinks();
  this.edit = false;
  this.newLink.N = '';
  this.newLink.L.b = '';
  this.newLink.L.p = '';
},

},



$template: `



<div v-scope="component.content(myLinks.links, myLinks)"></div>




<nav class="right-align" v-show="!myLinks.edit">
<button class="fill border primary-border small-round large" @click="myLinks.edit = !myLinks.edit">
<i>forms_add_on</i>
</button>
</nav>


<form class="middle-align center-align" @submit.prevent="myLinks.addLink()" v-show="myLinks.edit">

<div :class="[Device.display === 's' ? 'medium-width' : 'large-width', 'grid']">

<p class="row no-space s12 m12 l12">
<s class="red-text">https://</s><span class="green-text">google.com</span>
<b class="blue-text">/search?q=</b><s class="red-text">news</s>
</p>

<div class="field label border large s12 m12 l12">
<input type="text" v-model="myLinks.newLink.N" required>
<label><b class="red-text">*</b>website name</label>
</div>

<div class="field label border large s12 m8 l7">
<input type="text" v-model="myLinks.newLink.L.b" required>
<label>
<b class="red-text">*</b><s>https://</s><b class="green-text">website.com</b>
</label>
</div>

<div class="max field label border large s12 m4 l5">
<input type="text" v-model="myLinks.newLink.L.p">
<label> ex:<b class="blue-text">/search?q=</b></label>
</div>

<nav class="center-align s12 m12 l12">

<button class="small-round border large" @click="myLinks.edit = false">
<i>close</i>
</button>

<button class="transparent fill border border-primary small-round large" type="submit">
<span>add</span> <i>add</i>
</button>
</nav>

</div>


</form>





`}},
/*________________________________________________________________*/
advanced() {return {

site: "",

$template: `

<form class="middle-align center-align" method="GET" :action="'https://' + X.engine.L.b" target="_blank">
<input type="text" :name="X.engine.L.p" :value="'site:' + site + ' &quot;' + Router.query + '&quot;'" hidden>

<div :class="[Device.display === 's' ? 'medium-width' : 'large-width', 'grid']">

<div class="field label suffix border large s12 m8 l7">
<input type="text" v-model="site" required>
<label>website.com</label>
<i>link</i>
</div>

<div class="field label prefix suffix border large s12 m4 l5" v-scope="component.input()"></div>

<nav class="center-align s12 m12 l12">
<button class="transparent border primary-border fill large small-round" type="submit">
<span>search</span> <i>search</i>
</button>
</nav>

</div>


</form>


`}},
/*________________________________________________________________*/
input() {return {

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

$template: `
<i>search</i>
<select v-model="X.engine" @change="localSet('engine', X.engine)">
<option v-for="(E, I) in Engines" :key="E.L.b" :value="E" :selected="X.engine.L.b === E.L.b" v-text="E.N"></option>
</select>

<label>advanced Search Engine</label>
<i>arrow_drop_down</i>
`}},
/*________________________________________________________________*/





},



/*________________________________________________________________*/


//content
sites: null,

async load() {
try { this.sites ||= await fetch(`/res/json/${this.Router.tab}.json`).then(data => data.json()) } catch (error) { this.sites = null }
},

/*________________________________________________________________*/







/*________________________________________________________________*/
mounted() {


//serviceWorker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
;}


//router
this.Router.hashUpdate();



const theme = JSON.parse(localStorage.getItem('theme')) || null;
if (theme) {document.body.className = theme};




},
/*________________________________________________________________*/
}).mount("#app") 