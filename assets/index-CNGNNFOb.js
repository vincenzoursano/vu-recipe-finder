var b=Object.defineProperty;var m=(t,e,r)=>e in t?b(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var l=(t,e,r)=>m(t,typeof e!="symbol"?e+"":e,r);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();const p="recipe-favorite-toggle",u="recipe-filter-favorite-only",h="recipe-filter-query",y=":host{--input-width: clamp(200px, 60vw, 300px);--input-border-size: 2px}label{display:block;margin-bottom:var(--spacing-sm);font-size:var(--text-sm);color:var(--color-text);font-weight:500}input{width:var(--input-width);padding:var(--spacing-sm);border:var(--input-border-size) solid var(--color-border);border-radius:var(--border-radius);font-size:var(--text-sm);background-color:var(--color-rice)}input:hover{border-color:var(--color-primary-light);box-shadow:var(--shadow-sm)}input:focus{outline:none;border-color:var(--color-primary);box-shadow:var(--shadow-sm)}input::placeholder{color:var(--color-text-light);opacity:.7}";class w extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get observedAttributes(){return["placeholder","label"]}get placeholder(){return this.getAttribute("placeholder")||"Search..."}set placeholder(e){this.setAttribute("placeholder",e)}get label(){return this.getAttribute("label")||""}set label(e){this.setAttribute("label",e)}get id(){return this.getAttribute("id")||""}set id(e){this.setAttribute("id",e)}attributeChangedCallback(e){(e==="placeholder"||e==="label")&&this.render()}connectedCallback(){this.render(),this.addEventListener("input",()=>{const e=this.shadowRoot.querySelector("input").value,r=new CustomEvent(h,{detail:{query:e},bubbles:!0,composed:!0});this.dispatchEvent(r)})}render(){this.shadowRoot.innerHTML=`
      <style>${y}</style>
      ${this.label?`<label for="${this.id}">${this.label}</label>`:""}
      <input type="search" id="${this.id}" placeholder="${this.placeholder}">
    `}}customElements.define("search-bar",w);const E=":host{display:block;background:var(--color-rice);box-shadow:var(--shadow-sm)}.card{position:relative;cursor:pointer;display:flex;flex-direction:column}img{width:100%;height:180px;object-fit:cover}.content{padding:var(--spacing-md)}h3{margin:0 0 var(--spacing-sm) 0;font-size:var(--text-lg);color:var(--color-black-pepper)}p{margin:0;color:var(--color-black-pepper);font-size:var(--text-sm);line-height:1.4;opacity:.8}.favorite-btn{position:absolute;top:var(--spacing-sm);right:var(--spacing-sm);border-radius:var(--radius-md);cursor:pointer;font-size:var(--text-md);padding:var(--spacing-sm);box-shadow:var(--shadow-sm);background:var(--color-turmeric);border:2px groove var(--color-turmeric)}";class x extends HTMLElement{constructor(){super();l(this,"toggleFavorite",r=>{r.stopPropagation();const a=this.getAttribute("favorite")==="true";this.setAttribute("favorite",(!a).toString()),this.shadowRoot.querySelector(".favorite-btn").innerHTML=this.getInnerFavoriteButton();const o=new CustomEvent(p,{detail:{id:this.getAttribute("recipe-id")},bubbles:!0,composed:!0});this.dispatchEvent(o)});l(this,"handleClick",()=>{const r=document.createElement("recipe-detail");r.setAttribute("recipe-id",this.getAttribute("recipe-id")),document.getElementById("modals").appendChild(r)});this.attachShadow({mode:"open"})}static get observedAttributes(){return["title","description","image","favorite","recipe-id"]}connectedCallback(){this.render(),this.shadowRoot.querySelector(".favorite-btn").addEventListener("click",this.toggleFavorite),this.shadowRoot.querySelector(".card").addEventListener("click",this.handleClick)}getInnerFavoriteButton(){return this.getAttribute("favorite")==="true"?"❤️":"🤍"}render(){this.shadowRoot.innerHTML=`
      <style>${E}</style>
      <div class="card">
        <button class="favorite-btn" aria-label="Toggle favorites">
          ${this.getInnerFavoriteButton()}
        </button>
        <img src="${this.getAttribute("image")}" alt="${this.getAttribute("title")}">
        <div class="content">
          <h3>${this.getAttribute("title")}</h3>
          <p>${this.getAttribute("description")}</p>
        </div>
      </div>
    `}}customElements.define("recipe-card",x);const S=":host{position:absolute;top:0;left:0;width:100dvw;height:100dvh;background:var(--color-rice);z-index:var(--z-index-modals-1);overflow-y:auto}.container{position:relative;background:var(--color-rice);max-width:var(--container-width);margin:auto;padding:var(--spacing-lg)}.close-btn{position:fixed;cursor:pointer;border-radius:var(--radius-sm);top:var(--spacing-md);right:var(--spacing-md);font-size:var(--text-xl);padding:var(--spacing-sm);background-color:var(--color-rice);color:var(--color-black-pepper);border:2px groove var(--color-tandoor)}.header{display:grid;grid-template-columns:1fr;gap:var(--spacing-lg);margin-bottom:var(--spacing-xl)}.header .recipe-image{width:100%;max-width:300px;height:300px;object-fit:cover;justify-self:center}.header-content{flex:1;display:flex;flex-direction:column;gap:var(--spacing-md)}.header-content h2{margin:0;font-size:var(--text-3xl);color:var(--color-curry)}.header-content p{font-size:var(--text-lg);color:var(--color-black-pepper)}.content{display:grid;grid-template-columns:1fr;gap:var(--spacing-xl)}.content .list h3{margin:0;font-size:var(--text-xl);color:var(--color-curry)}.content .list li{margin-bottom:var(--spacing-sm);color:var(--color-black-pepper);font-size:var(--text-md)}@media (min-width: 768px){.container{padding:var(--spacing-xl)}.close-btn{position:absolute}.header{grid-template-columns:300px 1fr}.header .recipe-image{justify-self:start}.content{grid-template-columns:minmax(250px,1fr) 2fr}}",v="recipesFavorites";async function R(){return await(await fetch("recipes.json")).json()}const i={recipes:[],favorites:new Set,initialized:!1,subscribers:[],filter:{query:"",favoritesOnly:!1}};async function L(){if(!i.initialized)try{i.recipes=await R(),i.favorites=new Set(I()),i.initialized=!0}catch(t){throw console.error("Failed to initialize:",t),t}}function $(t){return i.subscribers.push(t),()=>{i.subscribers=i.subscribers.filter(e=>e!==t)}}function d(){i.subscribers.forEach(t=>t(i.recipes))}function A(t=""){if(!t.trim()){resolve(i.recipes);return}const e=t.toLowerCase();return i.recipes.filter(a=>a.title.toLowerCase().includes(e)||a.ingredients.some(o=>o.toLowerCase().includes(e)))}function C(t){const e=parseInt(t);i.favorites.has(e)?i.favorites.delete(e):i.favorites.add(e),_(i.favorites),d()}function I(){const t=localStorage.getItem(v);return t?JSON.parse(t):[]}function _(t){localStorage.setItem(v,JSON.stringify([...t]))}function f(t){const e=parseInt(t);return i.favorites.has(e)}function F(t){i.filter.query=t,d()}function O(){i.filter.favoritesOnly=!i.filter.favoritesOnly,d()}function T(){return i.filter}function z(){var e,r;let t=i.recipes;return(e=i==null?void 0:i.filter)!=null&&e.query&&(t=A(i.filter.query)),(r=i==null?void 0:i.filter)!=null&&r.favoritesOnly&&(t=t.filter(a=>f(a.id))),t}function k(){return i.recipes}document.addEventListener(p,t=>{const{id:e}=t.detail;C(e)});document.addEventListener(u,O);document.addEventListener(h,t=>{const{query:e}=t.detail;F(e)});const n={initialize:L,isFavorite:f,subscribe:$,getFilteredRecipes:z,getAllRecipes:k,getFilters:T};class q extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get observedAttributes(){return["recipe-id"]}async connectedCallback(){const e=this.getAttribute("recipe-id");e&&await this.loadRecipe(e)}disconnectedCallback(){document.body.style.overflow=""}async attributeChangedCallback(e,r,a){e==="recipe-id"&&r!==a&&await this.loadRecipe(a)}async loadRecipe(e){const r=await n.getAllRecipes();this._recipe=r.find(a=>a.id===parseInt(e)),this._recipe?(document.body.style.overflow="hidden",window.scrollTo(0,0),this.render()):this.remove()}render(){this._recipe&&(this.shadowRoot.innerHTML=`
      <style>
        ${S}
      </style>
      <div class="container">
        <button class="close-btn" aria-label="Close recipe details">❌</button>
        <div class="header">
          <img src="${this._recipe.image}" alt="${this._recipe.title}" class="recipe-image">
          <div class="header-content">
            <h2>${this._recipe.title}</h2>
            <p>${this._recipe.description}</p>
            <div class="time" aria-label="Preparation time">
              ⏲️ => ${this._recipe.prepTime}
            </div>
            <div class="spicy-level" aria-label="Spicy Level: ${this._recipe.spicyLevel}">
              🥵 => ${"🌶".repeat(this._recipe.spicyLevel)}
            </div>
          </div>
        </div>
        <div class="content">
          <div class="list ingredients">
            <h3>Ingredients</h3>
            <ul>
              ${this._recipe.ingredients.map(e=>`<li>${e}</li>`).join("")}
            </ul>
          </div>
          <div class="list instructions">
            <h3>Instructions</h3>
            <ol>
              ${this._recipe.instructions.map(e=>`<li>${e}</li>`).join("")}
            </ol>
          </div>
        </div>
      </div>
    `,this.shadowRoot.querySelector(".close-btn").addEventListener("click",()=>{this.remove()}))}}customElements.define("recipe-detail",q);n.initialize().then(N);function g(t,e){const{query:r="",favoritesOnly:a=!1}=e||{};if(t.length===0)return r!==""?`<p>No recipes found matching "${r}"</p>`:a?"<p>No favorite recipes yet</p>":"<p>No recipes available</p>";let o="";return t.forEach(s=>{const c=n.isFavorite(s.id);o+=`
      <recipe-card
        recipe-id="${s.id}"
        title="${s.title}"
        description="${s.description}"
        image="${s.image}"
        favorite="${c}"
      ></recipe-card>
    `}),o}n.subscribe(()=>{const t=n.getFilters(),e=n.getFilteredRecipes();document.querySelector("#recipesContainer").innerHTML=g(e,t),favoritesButton.classList.toggle("active",t.favoritesOnly)});function N(){const t=n.getAllRecipes();document.querySelector("#app").innerHTML=`
    <header class="site-header">
      <div class="container">
        <h1><span class="rainbow-filter">🌷</span> Spice Garden <span class="rainbow-filter">🌷</span></h1>
        <p>Authentic Indian Cuisine</p>
      </div>
    </header>

    <nav class="menu-header">
      <div class="container menu-header-content">
        <search-bar 
          id="recipeSearchInput"
          label="Search recipes"
          placeholder="Enter ingredients..."
        ></search-bar>
        <button
          id="favoritesButton"
          class="menu-header-favorite-btn"
          aria-label="Show only favorites"
        >🥰</button>
      </div>
    </nav>

    <main>
      <div class="container">
        <div class="menu-grid" id="recipesContainer">
          ${g(t)}
        </div>
      </div>
    </main>

    <footer class="site-footer">
      <div class="container rainbow-filter">
        <p>🌷🌿🌷🌿🌷🌿🌷🌿🌷🌿🌷🌿🌷🌿🌷🌿🌷</p>
      </div>
    </footer>
  `,document.querySelector("#favoritesButton").addEventListener("click",()=>{const r=new CustomEvent(u,{bubbles:!0,composed:!0});document.dispatchEvent(r)})}
