const store = PetiteVue.reactive({
/*________________________________________________________________*/

title: "Every-Link",
description: "",

/*________________________________________________________________*/

R: {

//url 
name: window.location.hostname,
root: window.location.origin,
path: window.location.pathname,
url: window.location.origin + window.location.pathname, // nor params
currentUrl: window.location.href,
//url

/*________________________*/
get separator() { return this.currentUrl.includes('?') ? '&' : '?' },
get ref() { return "ref=" + this.name },
/*________________________*/

query: new URLSearchParams(window.location.search).get('q') || 'search',
tab: new URLSearchParams(window.location.search).get('tab') || "web",

q: new URLSearchParams(window.location.search).get('q'),
p: new URLSearchParams(window.location.search).get('page'),

get encodedQuery() { return encodeURIComponent(this.query) },


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

copy(text) {
navigator.clipboard.writeText(text)
.then(() => ui("#copy", 999))
.catch(err => console.error('Failed to copy text: ', err));
},


/*________________________________________________________________*/

//visibility
advancedVisibility: JSON.parse(localStorage.getItem("advanced") || "false"),
linksVisibility: JSON.parse(localStorage.getItem("linksVisibility") || "false"),
/*________________________________________________________________*/

X: {

Engines: [
  { N: "Google", B: "google.com/search", P: "q" },
  { N: "Bing", B: "bing.com/search", P: "q" },
  { N: "Yandex", B: "yandex.com/search/", P: "text" },
],

engine: JSON.parse(localStorage.getItem("engine")) || { N: "Google", B: "google.com/search", P: "q" },

get url(){ return `${this.engine.B}?${this.engine.P}=` },

site: null,

},

/*________________________________________________________________*/




/*________________________________________________________________*/


component: {

/*________________________________________________________________*/
navTop(s) {return {

theme: JSON.parse(localStorage.getItem('theme')) || "auto",
changeTheme() {
if (this.theme == "auto") { this.theme = "dark" }
else if (this.theme === "dark") { this.theme = "light" }
else if (this.theme === "light") { this.theme = "dark" };
this.$S.localSet("theme", this.theme);
if (this.theme != "auto") { document.body.className = this.theme }
},

settings: s,

$template: `

<button class="transparent border small-round" data-ui="#drawer">
<i>menu</i><span>Menu</span>
</button>

<div class="max"></div>
<h5 class="center-align" v-text="$S.title"></h5>
<div class="max"></div>

<button v-show="settings !== false" class="transparent border square" data-ui="#settings">
<i>edit_note</i><span class="l m">Edit</span>
</button>


<button class="transparent border square" @click="changeTheme()">
<i v-text="theme === 'auto' ? 'night_sight_auto' : theme + '_mode'"></i>
</button>

`}},
/*________________________________________________________________*/
share() {return {

async share() {
if (!navigator.share) { ui("#share") };
await navigator.share({ title: document.title, url: window.location.href })
},

$template: `

<button class="transparent border primary-border fill elevate small-round margin large fixed bottom right s m" @click="share" v-show="$S.Device.type === 'mobile' || $S.Device.type === 'tablet'"><i>share</i> </button>

<div class="snackbar error" id="share"> Your browser is not supported</div>

`}},
/*________________________________________________________________*/
drawer() {return {

// name, icon, class
menu: [
{ N: "Homepage", I: "home", C: "s m l", U: "/index.html", },
{ N: "search", I: "search", C: "s m l", U: "/search.html", },
{ N: "tmp", I: "link", C: "s m l", U: "/page.html", },
{ N: "tmp", I: "link", C: "s m l", U: "/TMP.html", },
],


$template: `
<div class="overlay small-blur"></div>

<dialog id="drawer" class="left scroll">

<header class="fixed">
<nav>
<h6 class="max" v-text="$S.title"></h6>
<button class="transparent border link small-round" data-ui="#drawer">
<span>Close</span> <i>close</i>
</button>
</nav>
</header>

<div class="space"> </div>

<ul class="list">

<li v-for="L in menu" :class="[{'fill border primary-border': $S.R.path === L.U}, L.C, 'wave', 'small-round']">
<a :href="L.U + ( $S.R.query ? '?q=' + $S.R.query : '')">
<i v-text="L.I"></i>
<span v-text="L.N"></span>
</a>
</li>


</ul>
</dialog>


`}},
/*________________________________________________________________*/
settings() {return {

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
}
    
// Clear IndexedDB (modern browsers)
if (window.indexedDB) {
  indexedDB.databases().then(dbs => {
    dbs.forEach(db => {indexedDB.deleteDatabase(db.name)});
  });
}
    
// Clear Service Worker registrations
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(registration => {registration.unregister()});
  });
}

// road page
window.location.reload();
},

$template: `

<div class="overlay small-blur"></div>
<dialog id="settings" class="right scroll no-padding">

<header class="fixed padding">
<nav>
<h6 class="max">Settings</h6>
<button class="transparent border link small-round" data-ui="#settings">
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
<div class="field label suffix border">
<select v-model="$S.X.engine" @change="$S.localSet('engine', $S.X.engine)">
<option v-for="(E, I) in $S.X.Engines" :key="E.B" :value="E" :selected="$S.X.engine.B === E.B" v-text="E.N"></option>
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

},

/*________________________________________________________________*/
mounted() {


const theme = JSON.parse(localStorage.getItem('theme')) || "auto";
if (theme !== "auto") {document.body.className = theme};



  
},

/*________________________________________________________________*/

});

// v-effect="watch()"
// @vue:mounted="mounted()"
