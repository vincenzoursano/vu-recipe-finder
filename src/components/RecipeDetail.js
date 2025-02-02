import RecipeDetailStyle from './RecipeDetail.css?inline'
import { recipesService } from '../services/RecipesService.js';

export class RecipeDetail extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['recipe-id'];
  }

  async connectedCallback() {
    const recipeId = this.getAttribute('recipe-id');
    if (recipeId) {
      await this.loadRecipe(recipeId);
    }
  }

  disconnectedCallback() {
    document.body.style.overflow = '';
  }

  async attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'recipe-id' && oldValue !== newValue) {
      await this.loadRecipe(newValue);
    }
  }

  async loadRecipe(id) {
    const recipes = await recipesService.getAllRecipes();
    this._recipe = recipes.find(r => r.id === parseInt(id));
    
    if (this._recipe) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
      this.render();
    } else {
      this.remove();
    }
  }

  render() {
    if (!this._recipe) return;

    this.shadowRoot.innerHTML = `
      <style>
        ${RecipeDetailStyle}
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
              🥵 => ${'🌶'.repeat(this._recipe.spicyLevel)}
            </div>
          </div>
        </div>
        <div class="content">
          <div class="list ingredients">
            <h3>Ingredients</h3>
            <ul>
              ${this._recipe.ingredients.map(i => `<li>${i}</li>`).join('')}
            </ul>
          </div>
          <div class="list instructions">
            <h3>Instructions</h3>
            <ol>
              ${this._recipe.instructions.map(i => `<li>${i}</li>`).join('')}
            </ol>
          </div>
        </div>
      </div>
    `;

    this.shadowRoot.querySelector('.close-btn').addEventListener('click', () => {
      this.remove();
    });
  }
}

customElements.define('recipe-detail', RecipeDetail);