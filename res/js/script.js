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
    
    query: new URLSearchParams(window.location.search).get('q'),
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
    { name: "Google", url: "google.com/search?q=" },
    { name: "Bing", url: "bing.com/search?q=" },
    { name: "Yandex", url: "yandex.com/search?text=" },
  ],
  engine: JSON.parse(localStorage.getItem("engine")) || { name: "Google", url: "google.com/search?q=" },
  select() { localStorage.setItem('engine', JSON.stringify(this.engine)) },
  
  site: "",
  exSearch() {
    window.open(`https://${this.engine.url}site:${this.site}+"${this.R.encodedQuery}"`, '_blank')
  },
  
  /*________________________________________________________________*/
  //links
  
  linksVisibility: JSON.parse(localStorage.getItem("linksVisibility") || "false"),
  
  
  edit: false,
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
  //tabs
  
  scroll() {
    if (this.R.query) { document.querySelector(`[data-tab="${this.R.tab}"]`).scrollIntoView({ behavior: 'auto', block: 'center', inline: 'center' }); }
  },
  
  /*________________________________________________________________*/
  //settings
  
  
  
  visibility(name, status) { localStorage.setItem(name, JSON.stringify(status)) },
  
  categoriesVisibility() {
    localStorage.setItem('categories', JSON.stringify(this.categories))
  },
  /*________________________________________________________________*/
  //theme
  
  theme: JSON.parse(localStorage.getItem('theme') || "auto"),
  
  updateTheme() {
    if (this.theme != "auto") { document.body.className = this.theme }
  },
  
  changeTheme() {
    if (this.theme == "auto") { this.theme = "dark" }
    else if (this.theme === "dark") { this.theme = "light" }
    else if (this.theme === "light") { this.theme = "dark" };
    localStorage.setItem('theme', JSON.stringify(this.theme))
    this.updateTheme();
  },
  
  /*________________________________________________________________*/
  //share
  async share() {
    if (!navigator.share) { ui("#share") };
    await navigator.share({ title: document.title, url: window.location.href })
  },
  /*________________________________________________________________*/
  
  
  
  
  
  
  
  
  
  /*________________________________________________________________*/
  comp() {
    return {
      
      $template: `

`
    }
  },
  /*________________________________________________________________*/
  
  
  
  /*________________________________________________________________*/
  watch() {},
  /*________________________________________________________________*/
  mounted() {
    
    this.updateTheme();
    
  },
  /*________________________________________________________________*/
}).mount("#app")