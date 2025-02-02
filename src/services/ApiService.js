/**
 * @returns {Promise<Recipe[]>}
 */
async function fetchRecipes() {
  const result = await fetch("recipes.json");
  return await result.json();
}

export {
  fetchRecipes,
};
