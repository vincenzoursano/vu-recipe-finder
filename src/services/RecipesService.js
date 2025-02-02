import { EVENT_RECIPE_FAVORITE_TOGGLE, EVENT_RECIPE_FILTER_FAVORITE_ONLY, EVENT_RECIPE_FILTER_QUERY } from "../constants/event.js";
import { STORAGE_RECIPES_FAVORITES_IDS_KEY } from "../constants/storage.js";
import { fetchRecipes } from "./ApiService.js";

/** @type {RecipesState} */
const state = {
  recipes: [],
  favorites: new Set(),
  initialized: false,
  subscribers: [],
  filter: {
    query: "",
    favoritesOnly: false
  }
};

/**
 * @async
 * @throws {Error}
 * @returns {Promise<void>}
 */
async function initialize() {
  if (state.initialized) {
    return;
  }

  try {
    state.recipes = await fetchRecipes();
    state.favorites = new Set(loadFavorites());
    state.initialized = true;
  } catch (error) {
    console.error("Failed to initialize:", error);
    throw error;
  }
}

function subscribe(callback) {
  state.subscribers.push(callback);
  return () => {
    state.subscribers = state.subscribers.filter(sub => sub !== callback);
  };
}

function notifySubscribers() {
  state.subscribers.forEach(callback => callback(state.recipes));
}

/**
 * @param {string} [query=""]
 * @returns {Promise<Recipe[]>}
 */
function searchRecipes(query = "") {
  if (!query.trim()) {
    resolve(state.recipes);
    return;
  }
  const normalizedQuery = query.toLowerCase();
  const results = state.recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(normalizedQuery) ||
      recipe.ingredients.some((i) =>
        i.toLowerCase().includes(normalizedQuery)
      )
  );
  return results;
}

/**
 * @param {number} id
 */
function toggleFavorite(id) {
  const recipeId = parseInt(id);
  if (state.favorites.has(recipeId)) {
    state.favorites.delete(recipeId);
  } else {
    state.favorites.add(recipeId);
  }
  saveFavorites(state.favorites);
  notifySubscribers();
}

/**
 * @returns {number[]}
 */
function loadFavorites() {
  const saved = localStorage.getItem(STORAGE_RECIPES_FAVORITES_IDS_KEY);
  return saved ? JSON.parse(saved) : [];
}

/**
 * @param {number[]} favorites
 */
function saveFavorites(favorites) {
  localStorage.setItem(STORAGE_RECIPES_FAVORITES_IDS_KEY, JSON.stringify([...favorites]));
}

/**
 * @param {number} id
 * @returns {boolean}
 */
function isFavorite(id) {
  const recipeId = parseInt(id);
  return state.favorites.has(recipeId);
}

/**
 * @param {string} query
 */
function setSearchQuery(query) {
  state.filter.query = query;
  notifySubscribers();
}

/**
 * @param {boolean} favoritesOnly
 */
function toggleFavoritesOnly() {
  state.filter.favoritesOnly = !state.filter.favoritesOnly;
  notifySubscribers();
}

function getFilters() {
  return state.filter;
}

/**
 * @returns {Recipe[]}
 */
function getFilteredRecipes() {
  let filtered = state.recipes;

  if (state?.filter?.query) {
    filtered = searchRecipes(state.filter.query);
  }

  if (state?.filter?.favoritesOnly) {
    filtered = filtered.filter(recipe => isFavorite(recipe.id));
  }

  return filtered;
}

/**
 * @returns {Recipe[]}
 */
function getAllRecipes() {
  return state.recipes;
}

document.addEventListener(EVENT_RECIPE_FAVORITE_TOGGLE, (event) => {
  const { id } = event.detail;
  toggleFavorite(id);
});

document.addEventListener(EVENT_RECIPE_FILTER_FAVORITE_ONLY, toggleFavoritesOnly);

document.addEventListener(EVENT_RECIPE_FILTER_QUERY, (event) => {
  const { query } = event.detail;
  setSearchQuery(query)
});

export const recipesService = {
  initialize,
  isFavorite,
  subscribe,
  getFilteredRecipes,
  getAllRecipes,
  getFilters
};
