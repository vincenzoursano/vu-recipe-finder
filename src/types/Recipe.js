/**
 * @typedef {Object} Recipe
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {string} image
 * @property {string} prepTime
 * @property {number} spicyLevel
 * @property {string[]} ingredients
 * @property {string[]} instructions
 */

/**
 * @typedef {Object} RecipesStateFilter
 * @property {string} query
 * @property {boolean} favoritesOnly
 */

/**
 * @typedef {Object} RecipesState
 * @property {Recipe[]} recipes
 * @property {Set<number>} favorites
 * @property {boolean} initialized
 * @property {Function[]} subscribers
 * @property {RecipesStateFilter} filter
 */