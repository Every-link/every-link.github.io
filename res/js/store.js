const store = PetiteVue.reactive({
/*________________________________________________________________*/


//settings
  
W: {
  
title: "Every-Link",

menu: [
{name: "Homepage", icon: "home", device: "s m l", url: "/index.html", },
{name: "search", icon: "search", device: "s m l", url: "/search.html", },
{name: "tmp", icon: "link", device: "s m l", url: "/TMP.html", },
],


},//W

/*________________________________________________________________*/
//router
R: {
url: window.location.origin + window.location.pathname,
currentUrl: window.location.href,
path: window.location.pathname,
get separator(){return this.currentUrl.includes('?') ? '&' : '?'},


q:"",
get query() {
  if (this.q) {return this.q}
  else {return new URLSearchParams(window.location.search).get('q')}
},
  
get encodedQuery() {return encodeURIComponent(this.query)},

get tab() {return new URLSearchParams(window.location.search).get('tab') || "web"},

get mobile(){return new URLSearchParams(window.location.search).get('m') === '1' ? 1 : 0},

},//router

  

device: {

get display() {
  if (window.innerWidth < 601) {return "s"}
  else if (window.innerWidth < 993) {return "m"}
  else if (window.innerWidth > 993) {return "l"}
},

get screen(){
  if (window.screen.width < 601) {return "small"}
  else if (window.screen.width < 993) {return "medium"}
  else if (window.screen.width > 993) {return "large"} 
},

get type(){
if (/Mobile|iPhone|Android|Harmony|HUAWEI/i.test(navigator.userAgent) && window.screen.width < 601) {return "mobile"}
else if (/Tablet|iPad|Android|Harmony|HUAWEI/i.test(navigator.userAgent) && window.screen.width < 993) {return "tablet"}
else if (/Desktop|Macintosh|Mac OS X|Windows NT|X11|linux|CrOS/i.test(navigator.userAgent) && screen.width > 993) {return "desktop"}
else if (/SmartTV|Smart-TV|HbbTV|NetCast|Tizen|Web0S/i.test(navigator.userAgent) && window.screen.width > 993) {return "tv"}
else if (/Xbox|PlayStation|Nintendo/i.testnavigator.userAgent) {return "gaming"}
else {return "unknown"}
},

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
visibility(name, status){localStorage.setItem(name, JSON.stringify(status))},
exVisibility: JSON.parse(localStorage.getItem("advanced") || "false"),
cVisibility: JSON.parse(localStorage.getItem("linksVisibility") || "false"),
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
  
categoriesV(){
  localStorage.setItem('categories', JSON.stringify(this.categories))
},
/*________________________________________________________________*/








/*________________________________________________________________*/

template(props) {return {
p: props,

$template: `

<button @click="p.i++">more {{p.i}}</button>

    
`,}},



/*________________________________________________________________*/

navTop(s) {return {

settings: s,
theme: JSON.parse(localStorage.getItem('theme')) || "auto",
updateTheme() { document.body.className = this.theme; },
changeTheme() {
  if (this.theme === "auto") { this.theme = "dark" }
  else if (this.theme === "dark") { this.theme = "light" }
  else if (this.theme === "light") { this.theme = "dark" };
          localStorage.setItem('theme', JSON.stringify(this.theme))
          this.updateTheme();
  },

$template: `


<button class="border round transparent" data-ui="#drawer">
<i>menu</i><span>Menu</span>
</button>

<div class="max"></div>
<h5 class="center-align" v-text="$S.W.title"></h5>
<div class="max"></div>

<button v-show="settings !== false" :class="[{'circle': $S.device.display == 's'}, 'chip', 'transparent']" data-ui="#settings">
  <i>settings</i><span class="l m">Settings</span>
</button>

<button class="chip circle transparent" @click="changeTheme()">
 <i v-text="theme === 'auto' ? 'night_sight_auto' : theme + '_mode'"></i>
</button>
`}},
/*________________________________________________________________*/

/*________________________________________________________________*/
navLeft() {return {

$template: `

<header class="fixed">
<h6 class="max lin" v-text="$S.W.title"></h6>
</header>

<div class="space"></div>

<a v-for="link in $S.W.menu" :class="[{'fill border primary-border': $S.R.path === link.url}, link.device, 'wave', 'round']" :href="link.url + ( $S.R.query ?'?q=' + $S.R.query : '')">
<i v-text="link.icon">
</i><span v-text="link.name"></span>
</a>


`}},
/*________________________________________________________________*/
navDialog() {return {

$template: `

<header class="fixed">
<nav>
<h6 class="max lin" v-text="$S.W.title"></h6>
<button class="transparent border link" data-ui="#drawer">
<span>Close</span> <i>close</i>
</button>
</nav>
</header> 

<div class="space"> </div>

<ul class="list" >
<li v-for="link in $S.W.menu" :class="[{'fill border primary-border': $S.R.path === link.url}, link.device, 'wave', 'round']">
<a :href="link.url + ( $S.R.query ? '?q=' + $S.R.query : '')">
<i v-text="link.icon"></i>
<span v-text="link.name"></span>
</a>
</li> 


</ul>


`}},
/*________________________________________________________________*/

settingsDialog() {return {
$template: `


<header class="fixed">
<nav>
<h6 class="max">Settings</h6>
<button class="transparent border link" data-ui="#settings">
<span>Close</span><i>close</i>
</button>
</nav>
</header> 
<div class = "space" > </div>


<ul class="list border">

<li v-for="(cat, i) in $S.categories" :key="cat.id">
  <i v-text="cat.icon"></i>
  <div class="max">
    <h6 class="small" v-text="cat.name"></h6>
  <!--  <div>Supporting text</div> -->
  </div>
  <label class="switch icon">
    <input v-model="cat.v" type="checkbox" @change="$S.categoriesV()" :disabled="i === 0">
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
    <input v-model="$S.cVisibility" type="checkbox" @change="$S.visibility('linksVisibility', $S.cVisibility)">
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
    <input v-model="$S.exVisibility" type="checkbox" @change="$S.visibility('advanced', $S.exVisibility)">
    <span> <i>visibility_off</i> <i>visibility</i> </span>
  </label>
</li>

</ul>
</div>



<div class="field label suffix border">
<select v-model="$S.engine" @change="$S.select()">
  <option v-for="e in $S.engines" :key="e.url" :value="e" :selected="$S.engine.url === e.url" v-text="e.name"></option>
</select> 
  <label>Default Search Engine</label>
  <i>arrow_drop_down</i>
</div>










`}},
/*________________________________________________________________*/


/*________________________________________________________________*/

mounted(){

let theme = JSON.parse(localStorage.getItem('theme')) || "auto";
 document.body.className = theme;


/* // mobile version
if (this.R.mobile !== 1 && this.device.type === 'mobile') {
window.location.href = this.R.currentUrl + this.R.separator + 'm=1';
};
*/


},
/*________________________________________________________________*/
});
