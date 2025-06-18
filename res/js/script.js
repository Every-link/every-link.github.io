const App = PetiteVue.createApp({ 
/*________________________________________________________________*/
$delimiters: ['{{', '}}'],
// S : store,
/*________________________________________________________________*/

W: {
  
title: "Every-Link",

menu: [
{name: "Homepage", icon: "home", device: "s m l", url: "/index.html", },
{name: "search", icon: "search", device: "s m l", url: "/search.html", },
{name: "tmp", icon: "link", device: "s m l", url: "/TMP.html", },
],


},//W
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
get separator(){return this.currentUrl.includes('?') ? '&' : '?'},
get ref(){return "ref=" + this.name},
/*________________________*/

query: new URLSearchParams(window.location.search).get('q'),
tab: new URLSearchParams(window.location.search).get('tab') || "web",

q: new URLSearchParams(window.location.search).get('q'),
p: new URLSearchParams(window.location.search).get('page'),

get encodedQuery() {return encodeURIComponent(this.query)},


},//router
/*________________________________________________________________*/

device: {

get display() {
  if (window.innerWidth < 601) {return "s"}
  else if (window.innerWidth < 993) {return "m"}
  else if (window.innerWidth > 993) {return "l"}
},
/*________________________*/
get screen(){
  if (window.screen.width < 601) {return "small"}
  else if (window.screen.width < 993) {return "medium"}
  else if (window.screen.width > 993) {return "large"} 
},
/*________________________*/
get type(){
if (/Mobile|iPhone|Android|Harmony|HUAWEI/i.test(navigator.userAgent) && window.screen.width < 601) {return "mobile"}
else if (/Tablet|iPad|Android|Harmony|HUAWEI/i.test(navigator.userAgent) && window.screen.width < 993) {return "tablet"}
else if (/Desktop|Macintosh|Mac OS X|Windows NT|X11|linux|CrOS/i.test(navigator.userAgent) && screen.width > 993) {return "desktop"}
else if (/SmartTV|Smart-TV|HbbTV|NetCast|Tizen|Web0S/i.test(navigator.userAgent) && window.screen.width > 993) {return "tv"}
else if (/Xbox|PlayStation|Nintendo/i.testnavigator.userAgent) {return "gaming"}
else {return "unknown"}
},
/*________________________*/
get os() {
  if (/Android/i.test(navigator.userAgent)) {return "android"}
  else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {return "ios"}
  else if (/Harmony|HUAWEI/i.test(navigator.userAgent)) {return "harmony"}
  else if (/Windows NT/i.test(navigator.userAgent)) {return "windows"}
  else if (/Macintosh|Mac OS X//i.test(navigator.userAgent)) {return "mac"}
  else if (/Linux/i.test(navigator.userAgent)) {return "linux"}
  else if (/CrOS/i.test(navigator.userAgent)) {return "chromeOs"}
  else if (/KaiOS/i.test(navigator.userAgent)) {return "kaios"}
  else if (/Tizen/i.test(navigator.userAgent)) {return "tizen"}
  else {return "unknown"}
},
/*________________________*/
get browser(){
  if (/Chrome/i.test(navigator.userAgent)) {return "chrome"}
  else if (/Safari/i.test(navigator.userAgent)) {return "safari"}
  else if (/Firefox/i.test(navigator.userAgent)) {return "firefox"}
  else if (/Edg|Edge/i.test(navigator.userAgent)) {return "edge"}
  else if (/Opera|OPR/i.test(navigator.userAgent)) {return "opera"}
  else if (/MSIE|Trident/i.test(navigator.userAgent)) {return "IE"}
  else {return "unknown"}
},

},//device


/*________________________________________________________________*/
advancedVisibility: JSON.parse(localStorage.getItem("advanced") || "false"),
  
linksVisibility: JSON.parse(localStorage.getItem("linksVisibility") || "false"),
  /*________________________________________________________________*/

engines: [
  {name:"Google",url:"google.com/search?q="},
  {name:"Bing",url:"bing.com/search?q="},
  {name:"Yandex",url:"yandex.com/search?text="},
],

engine: JSON.parse(localStorage.getItem("engine")) || {name:"Google",url:"google.com/search?q="},

select(){ localStorage.setItem('engine', JSON.stringify(this.engine)) },
 
 /*________________________________________________________________*/
categories: JSON.parse(localStorage.getItem('categories')) || [
  { name: "Web", id: "web", icon: "globe", v: true },
  { name: "AI", id: "ai", icon: "robot_2", v: true },
  { name: "Information", id: "information", icon: "description", v: false },
  { name: "News", id: "news", icon: "newspaper", v: false },
  { name: "Maps", id: "maps", icon: "location_on", v: false },
  { name: "Translation", id: "translation", icon: "translate", v: false },
  { name: "Sports", id: "sports", icon: "sports_soccer", v: false },
  { name: "Social Media", id: "socialMedia", icon: "groups", v: false },
  { name: "Jobs", id: "jobs", icon: "badge", v: false },
  { name: "Images", id: "images", icon: "image", v: false },
  { name: "Videos", id: "videos", icon: "smart_display", v: false },
  { name: "Music", id: "music", icon: "library_music", v: false },
  { name: "Movies & Shows", id: "moviesShows", icon: "movie", v: false },
  { name: "Books", id: "books", icon: "menu_book", v: false },
  { name: "Shopping", id: "shopping", icon: "shopping_cart", v: false },
  { name: "Hotels", id: "hotels", icon: "apartment", v: false },
  { name: "Flights", id: "flights", icon: "flight", v: false },
  { name: "Education", id: "education", icon: "school", v: false },
  { name: "Contacts", id: "contacts", icon: "contacts", v: false },
  { name: "Apps", id: "apps", icon: "apps", v: false },
  { name: "Developers", id: "developers", icon: "terminal", v: false },
  { name: "torrent", id: "torrent", icon: "dns", v: false },
  { name: "Others", id: "others", icon: "more_horiz", v: false },
],
  




/*________________________________________________________________*/
C: { //components

navTop() {return {

theme: JSON.parse(localStorage.getItem('theme')) || "auto",
changeTheme() {
  if (this.theme ==  null ) { this.theme = "dark" }
  else if (this.theme === "dark") { this.theme = "light" }
  else if (this.theme === "light") { this.theme = "dark" };
  localStorage.setItem('theme', JSON.stringify(this.theme))
  document.body.className = this.theme;
  },

$template: `

<button class="border small-round transparent" data-ui="#drawer">
<i>menu</i><span>Menu</span>
</button>

<div class="max"></div>
<h5 class="center-align" v-text="W.title"></h5>
<div class="max"></div>

<button v-show="settings !== false" :class="[{'square': device.display == 's'}, 'chip', 'transparent']" data-ui="#settings">
  <i>settings</i><span class="l m">Settings</span>
</button>


<button class="chip square transparent" @click="changeTheme()">
 <i v-text="theme === 'auto' ? 'night_sight_auto' : theme + '_mode'"></i>
</button>



`}},
/*________________________________________________________________*/
navLeft() {return {

$template: `

ads area


`}},
/*________________________________________________________________*/
navBottom() {return {

$template: `

ads area


`}},
/*________________________________________________________________*/
navDialog() {return {

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

<ul class="list" >
<li v-for="link in W.menu" :class="[{'fill border primary-border': R.path === link.url}, link.device, 'wave', 'small-round']">
<a :href="link.url + ( R.query ? '?q=' + R.query : '')">
<i v-text="link.icon"></i>
<span v-text="link.name"></span>
</a>
</li> 


</ul>


`}},
/*________________________________________________________________*/
settingsDialog() {return {
  
visibility(name, status){localStorage.setItem(name, JSON.stringify(status))},

categoriesVisibility(){
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
<div class = "space" > </div>


<ul class="list border">

<li v-for="(cat, i) in categories" :key="cat.id">
  <i v-text="cat.icon"></i>
  <h6 class="small max" v-text="cat.name"></h6>
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
</div>



<div class="field label suffix border">
<select v-model="engine" @change="select()">
  <option v-for="e in engines" :key="e.url" :value="e" :selected="engine.url === e.url" v-text="e.name"></option>
</select> 
  <label>Default Search Engine</label>
  <i>arrow_drop_down</i>
</div>










`}},
/*________________________________________________________________*/
share() {return {

async share() {
  if (!navigator.share) { ui("#share") };
  await navigator.share({ title: document.title, url: window.location.href })
},

$template: `

<button class="transparent border primary-border fill small-round margin large fixed bottom right s m" @click="share" v-show="device.type === 'mobile' || device.type === 'tablet'"><i>share</i> </button >

<div class="snackbar error" id="share"> Your browser is not supported</div> 


`}},
/*________________________________________________________________*/
form() {return {

$template: `


<form v-if="!R.q" :action="R.path" target="_self" method="GET">
<input type="hidden" name="tab" :value="R.tab">

<div class="padding">
  
  
<div class="grid">
    
<div class="s12 m9 l0">
<div class="field prefix label border">
  <i class="front">search</i>
  <input type="text" name="q" required>
  <label>search</label>
</div>
</div>
    
<div class="s12 m3 l2">
<div class="field prefix border label">
  <i class="front">list</i>
  <select v-model="R.tab" required>
  <option v-for="C in categories.filter(C => C.v)" :key="C.id" v-text="C.name" :value="C.id"></option>
  <option v-if="linksVisibility" value="links">My List</option>
  <option v-if="advancedVisibility" value="advanced">Advanced Search</option>
  </select>
  <label>Category</label>
</div>
</div>
    
</div>


<div class="space"></div>

<nav class="center-align">
<button type="button" class="border large small-round" data-ui="#settings">
  <i>edit_note</i>
</button>

<button type="submit" class="transparent border primary-border fill large small-round ">
  <span>Search</span><i>search</i>
</button>
</nav>


</div>
</form>




<form v-else-if="R.q" class="middle-align center-align top-margin bottom-margin" :action="R.path" target="_self" method="GET">
<nav :class="device.display === 's' ? 'medium-width' : 'large-width'" class="medium-width">
  
<div class="max field border small-round primary-border">
  <input type="hidden" name="tab" :value="R.tab">
  <input type="text" name="q" v-model="R.query">
</div>
<button type="submit" class="transparent border primary-border fill small-round large">
  <i>search</i>
  <span class="m l">Search</span>
</button>

</nav>
</form>



`}},
/*________________________________________________________________*/
tabs() {return {
  
scroll(){
if (this.R.query) { document.querySelector(`[data-tab="${this.R.tab}"]`).scrollIntoView({behavior: 'auto', block: 'center', inline: 'center'});}
},

$template: `

<nav class="medium-width scroll" @vue:mounted="scroll">

<a v-for="(C, I) in categories.filter(C => C.v || C.id == R.tab )" :key="C.id" :class="[{'border primary-border fill' : C.id == R.tab}, 'vertical padding small-round']" :href="R.path + '?tab=' + C.id + '&q=' + R.encodedQuery" :data-tab=" C.id">
<i v-text="C.icon"></i> <span v-text="C.name"></span>
</a>


<a data-ui="#advanced" :class="[{'border primary-border fill' : R.tab == 'advanced'}, 'vertical padding small-round']" v-show="advancedVisibility" :href="R.path + '?tab=advanced&q=' + R.encodedQuery" data-tab="advanced">
  <i>pageview</i> <span>Advanced</span>
</a>


<a data-ui="#links" :class="[{'border primary-border fill' : R.tab == 'links'}, 'vertical padding small-round']" v-show="linksVisibility" :href="R.path + '?tab=links&q=' + R.encodedQuery" data-tab="links">
  <i>forms_add_on</i> <span>My List</span>
</a>

<a data-ui="#settings" class="vertical padding small-round">
  <i>edit_note</i> <span>Edit</span>
</a>

</nav>


`}},
/*________________________________________________________________*/
content() {return {

sites: null,

async load(){
if (this.R.tab != 'advanced' && this.R.tab != 'links') {
  try { this.sites ||= await fetch(`/res/json/${this.R.tab}.json`).then(data => data.json()) } catch (error) { this.sites = null }
}
},



$template: `

<div v-if="sites === null" class="middle-align vertical padding">
  <progress class="circle"></progress> <span>Loading</span>
</div>


<div class="grid" @vue:mounted="load">
<article class="s12 m6 l4 small-round" v-for="(S, I) in sites || []">

<div class="row">
<a class="row max" :href="'https://' + S.link.b + (S.link.p ? S.link.p + R.encodedQuery : '') + (S.link.s ? S.link.s : '') + (S.link.p || S.link.s ? '&' : '?') + R.ref" rel="nofollow" target="_blank">
  
<img class="round" :src="'https://www.google.com/s2/favicons?sz=256&domain=' + (S.icon ? S.icon : S.link.b)" alt="icon" loading="lazy">
    
<div class="max">
<h5 class="small" v-text="S.name"></h5>
<p class="wrap">
<span v-text="'https://' + S.link.b + (S.link.p ? S.link.p + R.query : '') + (S.link.s ? S.link.s : '')" class="link"></span>
<i v-if="!S.link.p" class="red-text">search_off</i>
</p>

</div>
</a>

<button :data-ui="'#sites-menu-' + I" class="transparent small-round">
 <i>more_vert</i>
 
<menu :id="'sites-menu-' + I" class="left no-wrap">

<li v-if="S.link.p">
<a class="row" :href="'https://' + S.link.b + '?' + R.ref" rel="nofollow" target="_blank">
  <i class="green-text">home_app_logo</i>
  <span>Homepage</span>
</a>
</li>
<li v-if="S.link.x != false">
<a class="row" :href="'https://' + engine.url + 'site:' + S.link.b + '+&quot;' + R.encodedQuery + '&quot;'" rel="nofollow" target="_blank">
  <i class="blue-text">travel_explore</i>
  <span v-text="engine.name + ' Search'"></span>
</a>
</li>
<li v-if="S.deepLink !== undefined && device.type == 'mobile'">
  <a class="row" :href="S.deepLink.b + (S.deepLink.p ? S.deepLink.p + R.encodedQuery : '') + (S.deepLink.s ? S.deepLink.s : '')" rel="nofollow">
    <i>phone_iphone</i>
    <span v-text="S.name + ' App'"></span>
  </a>
</li>
<li v-if="S.app !== undefined && device.os == 'android'">
<a class="row" :href="'market://details?id=' + S.app.android" rel="nofollow">
  <i>system_update</i>
  <span>Download App</span>
</a>
</li>
<li v-if="S.app !== undefined && device.os == 'ios'">
<a class="row" :href="'itms-apps://itunes.apple.com/app/' + S.app.ios" rel="nofollow">
  <i>system_update</i>
  <span>Download App</span>
</a>
</li>

<div v-show="S.alt" class="divider"></div>

<li v-for="(s, i) in S.alt || []" :data-ui="'#menu-' + s.link.p">
<div class="left-padding row">
  <img class="tiny square" :src="'https://www.google.com/s2/favicons?sz=256&domain=' + (s.icon ? s.icon : s.link.b)" alt="icon" loading="lazy">
  <span v-text="s.name"></span>
  <i>arrow_drop_down</i>
</div>

<menu :id="'menu-' + s.link.p" class="left no-wrap">
<li v-if="s.link.b">
<a class="row" :href="'https://' + s.link.b + (s.link.p ? s.link.p + R.encodedQuery : '') + (s.link.s ? s.link.s : '') + (s.link.p || s.link.s ? '&' : '?') + R.ref" rel="nofollow" target="_blank">
  <i class="green-text" v-text="s.link.p ? 'pageview' : 'home_app_logo'"></i>
  <span v-text="s.name"></span>
</a>
</li>
<li v-if="s.link.x != false">
<a class="row" :href="'https://' + engine.url + 'site:' + s.link.b + '+&quot;' + R.encodedQuery + '&quot;'" rel="nofollow" target="_blank">
  <i class="blue-text">travel_explore</i>
  <span v-text="engine.name + ' Search'"></span>
</a>
</li>
<li v-if="s.deepLink !== undefined && device.type == 'mobile'">
<a class="row" :href="s.deepLink.b + (s.deepLink.p ? s.deepLink.p + R.encodedQuery : '') + (s.deepLink.s ? s.deepLink.s : '')" rel="nofollow">
  <i>phone_iphone</i>
  <span v-text="'s.name + ' App'"></span>
</a>
</li>
<li v-if="s.app !== undefined && device.os == 'android'">
<a class="row" :href="'market://details?id=' + s.app.android" rel="nofollow">
  <i>system_update</i><span>Download App</span>
</a>
</li>
<li v-if="s.app !== undefined && device.os == 'ios'">
<a class="row" :href="'itms-apps://itunes.apple.com/app/' + s.app.ios" rel="nofollow">
  <i>system_update</i><span>Download App</span>
</a>
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
advanced() {return {

site: "",
exSearch(){ 
  window.open(`https://${this.engine.url}site:${this.site}+"${this.R.encodedQuery}"`
 , '_blank') 
},

$template: `


<form class="padding" @submit.prevent="exSearch()">

<div class="grid">
  
<div class="field label suffix border large s12 m8 l8">
  <input type="text" v-model="site" required>
  <label>website.com</label> <i>link</i>
</div>

<div class="field label suffix border large s12 m4 l4">
  <select v-model="engine" @change="select()">
    <option v-for="e in engines" :key="e.url" :value="e" :selected="engine.url === e.url" v-text="e.name"></option>
  </select> 
  
  <label>Select Search Engine</label>
  <i>arrow_drop_down</i>
</div>

</div>


<nav class="center-align">
 <button class="transparent border primary-border fill large small-round" type="submit">
  <span>search</span><i>search</i>
</button>
</nav>
    
</form>



`}},
/*________________________________________________________________*/
links() {return {

edit: false,
links: JSON.parse(localStorage.getItem('links')) || [],
newLink: {n: "", b: "", p: ""},
saveLinks(){localStorage.setItem('links', JSON.stringify(this.links))},
removeLink(index) {this.links.splice(index, 1); this.saveLinks()},

addLink() {
this.links.push({n: this.newLink.n, b: this.newLink.b, p: this.newLink.p});
this.newLink.n = ''; this.newLink.b = ''; this.newLink.p = '';
this.saveLinks();
},

$template: `

<div class="grid">
  
<article class="s12 m6 l4 small-round padding" v-for="(link, I) in links">

<div class="row">
<a class="row max" :href="'https://' + (link.p ? link.b + link.p + R.encodedQuery : engine.url + 'site:' + link.b + '+&quot;' + R.encodedQuery + '&quot;')" rel="nofollow" target="_blank">

<img class="round" :src="'https://www.google.com/s2/favicons?sz=256&domain=' + link.b" alt="icon" loading="lazy">
    
<div class="max">
  <h5 class="small" v-text="link.n"></h5>
  <p v-text="'https://' + (link.p ? link.b + link.p + R.encodedQuery : engine.url + 'site:' + link.b + '+&quot;' + R.encodedQuery + '&quot;')" class="link wrap"></p>
</div>
</a>


<button v-show="edit" class="small-round border" @click="removeLink(I)" >
  <i class="red-text">delete</i>
</button>

<button v-show="!edit" :data-ui="'#links-menu-' + I" class="transparent small-round">
 <i>more_vert</i>

<menu :id="'links-menu-' + I" class="left no-wrap">
  
<li>
  <a class="row" :href="'https://' + link.b + '?' + R.ref" rel="nofollow" target="_blank">
    <i class="green-text">home_app_logo</i>
    <span>Homepage</span>
  </a>
</li>

<li v-if="link.p">
  <a class="row" :href="'https://' + engine.url + 'site:' + link.b + '+&quot;' + R.encodedQuery + '&quot;'" rel="nofollow" target="_blank">
    <i class="blue-text">travel_explore</i>
    <span v-text="engine.name + ' Search'"></span>
  </a>
</li>

</menu>
</button>

</div>



</article>

 </div>

 
 
<nav class="right-align" v-show="!edit">
<button class="fill border primary-border small-round large" @click="edit = !edit">
  <i>forms_add_on</i>
</button>
</nav>


<form class="padding" @submit.prevent="addLink()" v-show="edit">

<p class="row no-space">
<s class="red-text">https://</s><span class="green-text">google.com</span>
<b class="blue-text">/search?q=</b><s class="red-text">news</s>
</p>


<div class="grid">
  
<div class="field label border large s12 m12 l12">
  <input type="text" v-model="newLink.n" required>
  <label><b class="red-text">*</b>website name</label> 
</div>

<div class="field label border large s12 m8 l8">
  <input type="text" v-model="newLink.b" required>
<label>
<b class="red-text">*</b><s>https://</s><b class="green-text">website.com</b>
</label> 
</div>

<div class="max field label border large s12 m4 l4">
  <input type="text" v-model="newLink.p">
  <label> ex:<b class="blue-text">/search?q=</b></label> 
</div>

</div>


<nav class="center-align">


<button class="small-round border large" @click="edit = false">
  <i>close</i>
</button>
  
 <button class="transparent fill border border-primary small-round large" type="submit">
  <span>add</span><i>add</i>
</button>
</nav>
    
</form>




`}},
/*________________________________________________________________*/


},//components
/*________________________________________________________________*/






/*________________________________________________________________*/
watch(){ },
/*________________________________________________________________*/
mounted() {

  
const theme = JSON.parse(localStorage.getItem('theme'));
if (theme != null) {document.body.className = theme}

},
/*________________________________________________________________*/
}).mount("#app")
