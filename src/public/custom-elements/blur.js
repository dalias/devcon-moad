// To debug this code, open wixDefaultCustomElement.js in Developer Tools.

const DEBUG_TEXT = 'Loading the code for Custom Element \'blur-box\'. To debug this code, open wixDefaultCustomElement.js in Developer Tools.';

const createStyle = () => {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = `
    blur-box {

      display: block;
      height: -moz-available;
      height: -webkit-fit-available;
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;

      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 10px;

      background-color: rgba(255, 255, 255, 0.4);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }
    `;
  return styleElement;
};

class WixDefaultCustomElement extends HTMLElement {
  constructor() {
    super();
    console.log(DEBUG_TEXT);
  }

  connectedCallback() {
    this.appendChild(createStyle());
  }
}
customElements.define('blur-box', WixDefaultCustomElement);