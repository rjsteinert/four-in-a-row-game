import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * @customElement
 * @polymer
 */
class FiarCell extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          background: #BBB;
          width: 40px;
          height: 40px;
          border-radius: 20px;
          border-color: yellow;
          font-size: 3em;
        }
        .inner-circle {
          display: block;
          background: #EEE;
          opacity: .3;
          width: 36px;
          height: 36px;
          border-radius: 20px;
          border-color: yellow;
          font-size: 3em;
        }
        :host([fill="RED_TEAM"]) {
          background: red;
        }
        :host([fill="BLUE_TEAM"]) {
          background: blue;
        }
      </style>
      <div class="inner-circle"></div>
    `;
  }
  static get properties() {
    return {
      fill: {
        type: String,
        value: null
      },
      row: {
        type: Number,
        value: null,
      },
      column: {
        type: Number,
        value: null
      }
    };
  }

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('click', () => this.dispatchEvent(new CustomEvent('fiar-cell-click', {bubbles: true})))
  }

}

window.customElements.define('fiar-cell', FiarCell);
