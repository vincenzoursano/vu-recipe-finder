import { EVENT_RECIPE_FAVORITE_TOGGLE } from '../constants/event';
import RecipeCardStyle from './RecipeCard.css?inline'

export class RecipeCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['title', 'description', 'image', 'favorite', 'recipe-id'];
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector('.favorite-btn').addEventListener('click', this.toggleFavorite);
    this.shadowRoot.querySelector('.card').addEventListener('click', this.handleClick);
  }

  getInnerFavoriteButton() {
    return this.getAttribute('favorite') === 'true' ? '❤️' : '🤍';
  }

  toggleFavorite = (evt) => {
    evt.stopPropagation();
    const isFavorite = this.getAttribute('favorite') === 'true';
    this.setAttribute('favorite', (!isFavorite).toString());
    this.shadowRoot.querySelector('.favorite-btn').innerHTML = this.getInnerFavoriteButton();
    
    const favoriteEvent = new CustomEvent(EVENT_RECIPE_FAVORITE_TOGGLE, {
      detail: {
        id: this.getAttribute('recipe-id')
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(favoriteEvent);
  }

  handleClick = () => {
    const recipeDetail = document.createElement('recipe-detail');
    recipeDetail.setAttribute('recipe-id', this.getAttribute('recipe-id'));
    document.getElementById('modals').appendChild(recipeDetail);
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${RecipeCardStyle}</style>
      <div class="card">
        <button class="favorite-btn" aria-label="Toggle favorites">
          ${this.getInnerFavoriteButton()}
        </button>
        <img src="${this.getAttribute('image')}" alt="${this.getAttribute('title')}">
        <div class="content">
          <h3>${this.getAttribute('title')}</h3>
          <p>${this.getAttribute('description')}</p>
        </div>
      </div>
    `;
  }
}

customElements.define('recipe-card', RecipeCard);
