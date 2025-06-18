const App = PetiteVue.createApp({
/*________________________________________________________________*/

$delimiters: ['{{', '}}'],
// S : store,
/*________________________________________________________________*/

W: {

title: "Every-Link",

menu: [
{ name: "Homepage", icon: "home", device: "s m l", url: "/index.html", },
{ name: "search", icon: "search", device: "s m l", url: "/search.html", },
{ name: "tmp", icon: "link", device: "s m l", url: "/TMP.html", },
],


}, //W

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

device: {

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
categories: JSON.parse(localStorage.getItem('categories')) || [
{ n: "Web", id: "web", i: "globe", v: true },
{ n: "AI", id: "ai", i: "robot_2", v: true },
{ n: "Information", id: "information", i: "description", v: false },
{ n: "News", id: "news", i: "newspaper", v: false },
{ n: "Maps", id: "maps", i: "location_on", v: false },
{ n: "Translation", id: "translation", i: "translate", v: false },
{ n: "Sports", id: "sports", i: "sports_soccer", v: false },
{ n: "Social Media", id: "socialMedia", i: "groups", v: false },
{ n: "Jobs", id: "jobs", i: "badge", v: false },
{ n: "Images", id: "images", i: "image", v: false },
{ n: "Videos", id: "videos", i: "smart_display", v: false },
{ n: "Music", id: "music", i: "library_music", v: false },
{ n: "Movies & Shows", id: "moviesShows", i: "movie", v: false },
{ n: "Books", id: "books", i: "menu_book", v: false },
{ n: "Shopping", id: "shopping", i: "shopping_cart", v: false },
{ n: "Hotels", id: "hotels", i: "apartment", v: false },
{ n: "Flights", id: "flights", i: "flight", v: false },
{ n: "Education", id: "education", i: "school", v: false },
{ n: "Contacts", id: "contacts", i: "contacts", v: false },
{ n: "Apps", id: "apps", i: "apps", v: false },
{ n: "Developers", id: "developers", i: "terminal", v: false },
{ n: "torrent", id: "torrent", i: "dns", v: false },
{ n: "Others", id: "others", i: "more_horiz", v: false },
],
/*________________________________________________________________*/

//tabs

scroll() {
if (this.R.query) { document.querySelector(`[data-tab="${this.R.tab}"]`).scrollIntoView({ behavior: 'auto', block: 'center', inline: 'center' }); }
},

/*________________________________________________________________*/

//content
sites: null,

async load() {
if (this.R.tab != 'advanced' && this.R.tab != 'links') {
try { this.sites ||= await fetch(`/res/json/${this.R.tab}.json`).then(data => data.json()) } catch (error) { this.sites = null }
}
},
/*________________________________________________________________*/
//advanced

advancedVisibility: JSON.parse(localStorage.getItem("advanced") || "false"),

engines: [
{ n: "Google", u: "google.com/search?q=" },
{ n: "Bing", u: "bing.com/search?q=" },
{ n: "Yandex", u: "yandex.com/search?text=" },
],
engine: JSON.parse(localStorage.getItem("engine")) || { n: "Google", u: "google.com/search?q=" },
select() { localStorage.setItem('engine', JSON.stringify(this.engine)) },

site: "",
exSearch() {
window.open(`https://${this.engine.url}site:${this.site}+"${this.R.encodedQuery}"`, '_blank')
},

/*________________________________________________________________*/
//links

linksVisibility: JSON.parse(localStorage.getItem("linksVisibility") || "false"),


links: JSON.parse(localStorage.getItem('links')) || [],
newLink: { n: "", b: "", p: "" },
saveLinks() { localStorage.setItem('links', JSON.stringify(this.links)) },
removeLink(index) { this.links.splice(index, 1);
this.saveLinks() },

addLink() {
this.links.push({ n: this.newLink.n, b: this.newLink.b, p: this.newLink.p });
this.newLink.n = '';
this.newLink.b = '';
this.newLink.p = '';
this.saveLinks();
},
/*________________________________________________________________*/



component: {

/*________________________________________________________________*/
navTop(s) {return {

theme: JSON.parse(localStorage.getItem('theme')) || "auto",
changeTheme() {
if (this.theme == "auto") { this.theme = "dark" }
else if (this.theme === "dark") { this.theme = "light" }
else if (this.theme === "light") { this.theme = "dark" };
localStorage.setItem('theme', JSON.stringify(this.theme))
if (this.theme != "auto") { document.body.className = this.theme }
},

settings: s,

$template: `

<button class="transparent border small-round" data-ui="#drawer">
<i>menu</i><span>Menu</span>
</button>

<div class="max"></div>
<h5 class="center-align" v-text="W.title"></h5>
<div class="max"></div>

<button v-show="settings !== false" class="transparent border square" data-ui="#settings">
<i>edit_note</i><span class="l m">Settings</span>
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

<button class="transparent border primary-border fill small-round margin large fixed bottom right s m" @click="share" v-show="device.type === 'mobile' || device.type === 'tablet'"><i>share</i> </button>

<div class="snackbar error" id="share"> Your browser is not supported</div>

`}},
/*________________________________________________________________*/
drawer() {return {

$template: `

<header class="fixed">
<nav>
<h6 class="max lin" v-text="W.title"></h6>
<button class="transparent border link small-round" data-ui="#drawer">
<span>Close</span> <i>close</i>
</button>
</nav>
</header>

<div class="space"> </div>

<ul class="list">

<li v-for="link in W.menu" :class="[{'fill border primary-border': R.path === link.url}, link.device, 'wave', 'small-round']">
<a :href="link.url + ( R.query ? '?q=' + R.query : '')">
<i v-text="link.icon"></i>
<span v-text="link.name"></span>
</a>
</li>


</ul>


`}},
/*________________________________________________________________*/

settings() {return {

visibility(name, status) { localStorage.setItem(name, JSON.stringify(status)) },

categoriesVisibility() {
localStorage.setItem('categories', JSON.stringify(this.categories))
},

$template: `

<header class="fixed">
<nav>
<h6 class="max">Settings</h6>
<button class="transparent border link small-round" data-ui="#settings">
<span>Close</span><i>close</i>
</button>
</nav>
</header>

<ul class="list border">

<li v-for="(cat, i) in categories" :key="cat.id">
<i v-text="cat.i"></i>
<h6 class="small max" v-text="cat.n"></h6>
<label class="switch icon">
<input v-model="cat.v" type="checkbox" @change="categoriesVisibility()" :disabled="i === 0">
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
<input v-model="linksVisibility" type="checkbox" @change="visibility('linksVisibility', linksVisibility)">
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
<input v-model="advancedVisibility" type="checkbox" @change="visibility('advanced', advancedVisibility)">
<span> <i>visibility_off</i> <i>visibility</i> </span>
</label>
</li>

</ul>

<div class="field label suffix border">
<select v-model="engine" @change="select()">
<option v-for="e in engines" :key="e.u" :value="e" :selected="engine.u === e.u" v-text="e.n"></option>
</select>
<label>Default Search Engine</label>
<i>arrow_drop_down</i>
</div>


`}},
/*________________________________________________________________*/

},



/*________________________________________________________________*/
watch() {},
/*________________________________________________________________*/
mounted() {

const theme = JSON.parse(localStorage.getItem('theme')) || "auto";
if (theme !== "auto") {document.body.className = theme};


},
/*________________________________________________________________*/
}).mount("#app")