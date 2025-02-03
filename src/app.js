import "./style.css";
import "./components";
import { recipesService } from "./services/RecipesService.js";
import { EVENT_RECIPE_FILTER_FAVORITE_ONLY } from "./constants/event.js";

recipesService.initialize().then(render);

/**
 * @param {Recipe[]} recipes
 * @param {RecipesStateFilter} filters
 * @returns {string}
 */
function renderRecipesCards(recipes, filters) {
  const { query = "", favoritesOnly = false } = filters || {};
  if (recipes.length === 0) {
    if (query !== "") {
      return `<p>No recipes found matching "${query}"</p>`;
    }
    if (favoritesOnly) {
      return `<p>No favorite recipes yet</p>`;
    }
    return `<p>No recipes available</p>`;
  }

  let template = "";
  recipes.forEach((recipe) => {
    const isFavorite = recipesService.isFavorite(recipe.id);
    template += `
      <recipe-card
        recipe-id="${recipe.id}"
        title="${recipe.title}"
        description="${recipe.description}"
        image="${recipe.image}"
        favorite="${isFavorite}"
      ></recipe-card>
    `
  });
  return template;
}

recipesService.subscribe(() => {
  const filters = recipesService.getFilters();
  const recipes = recipesService.getFilteredRecipes();
  document.querySelector("#recipesContainer").innerHTML = renderRecipesCards(recipes, filters);
  favoritesButton.classList.toggle("active", filters.favoritesOnly);
});

function render() {
  const recipes = recipesService.getAllRecipes();

  document.querySelector("#app").innerHTML = `
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
          ${renderRecipesCards(recipes)}
        </div>
      </div>
    </main>

    <footer class="site-footer">
      <div class="container rainbow-filter">
        <p>🌷🌿🌷🌿🌷🌿🌷🌿🌷🌿🌷🌿🌷🌿🌷🌿🌷</p>
      </div>
    </footer>
  `;

  const favoritesButton = document.querySelector("#favoritesButton");
  favoritesButton.addEventListener("click", () => {
    const favoritesOnlyEvent = new CustomEvent(EVENT_RECIPE_FILTER_FAVORITE_ONLY, {
      bubbles: true,
      composed: true
    });
    document.dispatchEvent(favoritesOnlyEvent);
  });
}
