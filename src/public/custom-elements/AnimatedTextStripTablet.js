// To debug this code, open AnimatedTextStripTablet.js in Developer Tools.

const DEBUG_TEXT = 'Loading the code for Custom Element \'animated-text-strip-tablet\'. To debug this code, open wixDefaultCustomElement.js in Developer Tools.';

////////////////////  Parameters  ////////////////////

const backgroundColor = ''

const repeatedText = 'SPIN FOR A PRIZE ! SPIN FOR A PRIZE !'
const repeatedTextSize = '95px'
const repeatedTextHeight = '90px'
const repeatedTextColor = '#000000'
const repeatedTexLineHeight = '90px'

const cycleSpeed = '1000s';

//////////////////////////////////////////////////////

var ticker_html_2nd;
var line_height = (parseInt(repeatedTexLineHeight.slice(0, -2)) - 1).toString() + 'px';

const createTextContainer = () => {
    const textContainer = document.createElement('div');
    textContainer.id = 'ticker_box_2nd';
    textContainer.setAttribute('class', 'ticker_box_2nd');
    textContainer.setAttribute("aria-label", repeatedText);

    const text1 = document.createElement('div');
    text1.setAttribute('anim_2nd', 'one');
    text1.setAttribute('class', 'ticker_2nd');
    text1.setAttribute("aria-hidden", "true");
    text1.id = 'ticker_1_2nd';

    const text2 = document.createElement('div');
    text2.setAttribute('anim_2nd', 'two');
    text2.setAttribute('class', 'ticker_2nd');
    text2.id = 'ticker_2_2nd';
    text2.setAttribute("aria-hidden", "true");

    textContainer.appendChild(text1);
    textContainer.appendChild(text2);

    return textContainer;
};

const createStyle = () => {
    const styleElement = document.createElement('style');
    styleElement.setAttribute('type', 'text/css');

    styleElement.innerHTML = `
      @font-face {
	    font-family: 'Madefor';
		    src: url("https://static.parastorage.com/services/santa-resources/resources/viewer/user-site-fonts/fonts/WixMadefor/v3/WixMadeforDisplay_W_Bd.woff2") format("woff");
		}

      .span_2nd {
        font-family: Madefor;
      	color: ${repeatedTextColor};
      	font-size: ${repeatedTextSize};
        font-style: italic;
      	font-weight: bold;
      	text-decoration: none;
      	line-height: ${line_height};
      }

      a:hover {
      	color: #cacaca;
      }

      .ticker_box_2nd {
        background-color: ${backgroundColor};
      	position: absolute;
      	left: 0px;
      	top: 0px;
      	width: 100%;
      	height: ${repeatedTextHeight};
      	overflow: hidden;
      }

      .ticker_2nd {
      	position: absolute;
      	top: 0px;
      	height: ${repeatedTextHeight};
      	white-space: nowrap;
      }

      .ticker_box_2nd .ticker_2nd {
      	visibility: hidden;
      }

      .ticker_box_2nd[anim_2nd=start] .ticker_2nd {
      	visibility: visible;
      }

      .ticker_box_2nd[anim_2nd=start] .ticker_2nd[anim_2nd=one] {
      	animation-name: ticker_anim_1_2nd;
      	animation-duration: ${cycleSpeed};
      	animation-timing-function: linear;
      }

      .ticker_box_2nd[anim_2nd=start] .ticker_2nd[anim_2nd=two] {
      	animation-name: ticker_anim_2_2nd;
      	animation-duration: ${cycleSpeed};
      	animation-timing-function: linear;
      }`;

    return styleElement;
};

const createTickerStyle = () => {
    const tickerStyleElement = document.createElement('style');
    tickerStyleElement.setAttribute('type', 'text/css');
    tickerStyleElement.id = 'ticker_style_2nd';

    return tickerStyleElement;
}

const createScript = () => {
    const scriptElement = document.createElement('script');
    scriptElement.setAttribute('type', 'text/javascript');

    scriptElement.innerHTML = `
	ticker_html_2nd = '<span class="span_2nd" >&nbsp;${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText}</span>';
	
		ticker_1_2nd.innerHTML = ticker_html_2nd;
		ticker_2_2nd.innerHTML = ticker_html_2nd;

            setTimeout(function(){
			
	 		    var t_width_2nd = parseInt(window.getComputedStyle(ticker_1_2nd).width);
	 		    console.log(t_width_2nd);
	 		    ticker_1_2nd.style.left = "0px";
	 		    ticker_2_2nd.style.left = t_width_2nd + "px";
	 		    ticker_style_2nd.textContent = '@keyframes ticker_anim_1_2nd {0% {left: 0px;}  100% {left:-' + t_width_2nd + 'px;} } @keyframes ticker_anim_2_2nd {0% {left: ' + t_width_2nd +'px;}  100% {left:-0px;} }';
			
	 		    ticker_1_2nd.addEventListener("animationend", function(e){
	 		    	if (ticker_1_2nd.getAttribute("anim_2nd") == "one"){
	 		    		ticker_1_2nd.setAttribute("anim_2nd","two");
	 		    	} else {
	 		    		ticker_1_2nd.setAttribute("anim_2nd","one");
	 		    	}
	 		    });
			
	 		    ticker_2_2nd.addEventListener("animationend", function(e){
	 		    	if (ticker_2_2nd.getAttribute("anim_2nd") == "one"){
	 		    		ticker_2_2nd.setAttribute("anim_2nd","two");
	 		    	} else {
	 		    		ticker_2_2nd.setAttribute("anim_2nd","one");
	 		    	}
	 		    });
			
			    ticker_box_2nd.setAttribute("anim_2nd","start");
		    } ,1000);
        `;	

    return scriptElement;
}

class AnimatedTextStripTablet extends HTMLElement {
    constructor() {
        super();
        console.log(DEBUG_TEXT);

        this.parentElement.style.margin = '0px';

        this.parentElement.style.width = '100%';
        this.parentElement.style.minWidth = '100%';
        this.parentElement.style.maxWidth = '100v%';

        this.style.width = '100%';
        this.style.minWidth = '100%';
        this.style.maxWidth = '100%';
    }

    connectedCallback() {
        this.appendChild(createTextContainer());
        this.appendChild(createStyle());
        this.appendChild(createTickerStyle());
        this.appendChild(createScript());
    }
}
customElements.define('animated-text-strip-tablet', AnimatedTextStripTablet);