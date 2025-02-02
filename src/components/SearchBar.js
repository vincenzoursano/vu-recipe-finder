import { EVENT_RECIPE_FILTER_QUERY } from '../constants/event';
import SearchBarStyle from './SearchBar.css?inline'

export class SearchBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['placeholder', 'label'];
  }

  get placeholder() {
    return this.getAttribute('placeholder') || 'Search...';
  }

  set placeholder(value) {
    this.setAttribute('placeholder', value);
  }

  get label() {
    return this.getAttribute('label') || '';
  }

  set label(value) {
    this.setAttribute('label', value);
  }

  get id() {
    return this.getAttribute('id') || '';
  }

  set id(value) {
    this.setAttribute('id', value);
  }

  attributeChangedCallback(name) {
    if (name === 'placeholder' || name === 'label') {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
    this.addEventListener('input', () => {
      const inputValue = this.shadowRoot.querySelector('input').value;
      const searchEvent = new CustomEvent(EVENT_RECIPE_FILTER_QUERY, {
        detail: { query: inputValue },
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(searchEvent);
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${SearchBarStyle}</style>
      ${this.label ? `<label for="${this.id}">${this.label}</label>` : ''}
      <input type="search" id="${this.id}" placeholder="${this.placeholder}">
    `;
  }
}

customElements.define('search-bar', SearchBar);