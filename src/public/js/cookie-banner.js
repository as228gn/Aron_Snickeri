/**
 * The cookie-banner web component module.
 *
 * @author Anna Ståhlberg <as228gn@student.lnu.se>
 * @version 1.1.0
 */

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
    #cookieBanner {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      padding: 1rem;
      background-color: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
      text-align: center;
      z-index: 1000;
      font-family: system-ui, sans-serif;
    }

    button {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 0.375rem 0.75rem;
      font-size: 0.875rem;
      border-radius: 0.25rem;
      margin-left: 1rem;
      cursor: pointer;
    }

    button:hover {
      background-color: #0056b3;
    }
  </style>
<div id="cookieBanner">
  Vi sparar sessionsdata för att hantera din varukorg och kassa. Inga personuppgifter lagras.
  <button>OK</button>
</div>  
`

customElements.define('cookie-banner',
  /**
   * Represents a bath-temperature element.
   */
  class extends HTMLElement {
    #cookieBanner
    /**
     * Creates an instance of the current type.
     */
    constructor() {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

        this.#cookieBanner = this.shadowRoot.querySelector('#cookieBanner')
    }

    connectedCallback() {
      this.#cookieBanner.addEventListener('click', () => {
        localStorage.setItem('cookieAccepted', 'true')
        this.remove()
      })
    }

  }
)
