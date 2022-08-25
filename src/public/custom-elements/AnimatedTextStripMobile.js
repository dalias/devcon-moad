// To debug this code, open AnimatedTextStripMobile.js in Developer Tools.

const DEBUG_TEXT = 'Loading the code for Custom Element \'animated-text-strip-mobile\'. To debug this code, open wixDefaultCustomElement.js in Developer Tools.';

////////////////////  Parameters  ////////////////////


const repeatedText = 'SPIN FOR A PRIZE ! SPIN FOR A PRIZE !'
const repeatedTextSize = '45px'
const repeatedTextHeight = '40px'
const repeatedTextColor = '#000000'
const repeatedTexLineHeight = '40px'

const cycleSpeed = '1000s';

//////////////////////////////////////////////////////

var ticker_html_3rd;
var line_height = (parseInt(repeatedTexLineHeight.slice(0, -2)) - 1).toString() + 'px';

const createTextContainer = () => {
    const textContainer = document.createElement('div');
    textContainer.id = 'ticker_box_3rd';
    textContainer.setAttribute('class', 'ticker_box_3rd');
    textContainer.setAttribute("aria-label", repeatedText);

    const text1 = document.createElement('div');
    text1.setAttribute('anim_3rd', 'one');
    text1.setAttribute('class', 'ticker_3rd');
    text1.setAttribute("aria-hidden", "true");
    text1.id = 'ticker_1_3rd';

    const text2 = document.createElement('div');
    text2.setAttribute('anim_3rd', 'two');
    text2.setAttribute('class', 'ticker_3rd');
    text2.id = 'ticker_2_3rd';
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

      .span_3rd {
        font-family: Madefor;
        background-color:;
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

      .ticker_box_3rd {
      	position: absolute;
      	left: 0px;
      	top: 0px;
      	width: 100%;
      	height: ${repeatedTextHeight};
      	overflow: hidden;
      }

      .ticker_3rd {
      	position: absolute;
      	top: 0px;
      	height: ${repeatedTextHeight};
      	white-space: nowrap;
      }

      .ticker_box_3rd .ticker_3rd {
      	visibility: hidden;
      }

      .ticker_box_3rd[anim_3rd=start] .ticker_3rd {
      	visibility: visible;
      }

      .ticker_box_3rd[anim_3rd=start] .ticker_3rd[anim_3rd=one] {
      	animation-name: ticker_anim_1_3rd;
      	animation-duration: ${cycleSpeed};
      	animation-timing-function: linear;
      }

      .ticker_box_3rd[anim_3rd=start] .ticker_3rd[anim_3rd=two] {
      	animation-name: ticker_anim_2_3rd;
      	animation-duration: ${cycleSpeed};
      	animation-timing-function: linear;
      }`;

    return styleElement;
};

const createTickerStyle = () => {
    const tickerStyleElement = document.createElement('style');
    tickerStyleElement.setAttribute('type', 'text/css');
    tickerStyleElement.id = 'ticker_style_3rd';

    return tickerStyleElement;
}

const createScript = () => {
    const scriptElement = document.createElement('script');
    scriptElement.setAttribute('type', 'text/javascript');

    scriptElement.innerHTML = `
	ticker_html_3rd = '<span class="span_3rd" >&nbsp;${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText}</span>';
	
		ticker_1_3rd.innerHTML = ticker_html_3rd;
		ticker_2_3rd.innerHTML = ticker_html_3rd;

            setTimeout(function(){
			
	 		    var t_width_3rd = parseInt(window.getComputedStyle(ticker_1_3rd).width);
	 		    console.log(t_width_3rd);
	 		    ticker_1_3rd.style.left = "0px";
	 		    ticker_2_3rd.style.left = t_width_3rd + "px";
	 		    ticker_style_3rd.textContent = '@keyframes ticker_anim_1_3rd {0% {left: 0px;}  100% {left:-' + t_width_3rd + 'px;} } @keyframes ticker_anim_2_3rd {0% {left: ' + t_width_3rd +'px;}  100% {left:-0px;} }';
			
	 		    ticker_1_3rd.addEventListener("animationend", function(e){
	 		    	if (ticker_1_3rd.getAttribute("anim_3rd") == "one"){
	 		    		ticker_1_3rd.setAttribute("anim_3rd","two");
	 		    	} else {
	 		    		ticker_1_3rd.setAttribute("anim_3rd","one");
	 		    	}
	 		    });
			
	 		    ticker_2_3rd.addEventListener("animationend", function(e){
	 		    	if (ticker_2_3rd.getAttribute("anim_3rd") == "one"){
	 		    		ticker_2_3rd.setAttribute("anim_3rd","two");
	 		    	} else {
	 		    		ticker_2_3rd.setAttribute("anim_3rd","one");
	 		    	}
	 		    });
			
			    ticker_box_3rd.setAttribute("anim_3rd","start");
		    } ,1000);
        `;	

    return scriptElement;
}

class AnimatedTextStripMobile extends HTMLElement {
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
customElements.define('animated-text-strip-mobile', AnimatedTextStripMobile);