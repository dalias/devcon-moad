// To debug this code, open AnimatedTextStrip.js in Developer Tools.

const DEBUG_TEXT = 'Loading the code for Custom Element \'animated-text-strip\'. To debug this code, open wixDefaultCustomElement.js in Developer Tools.';

////////////////////  Parameters  ////////////////////


const repeatedText = 'SPIN FOR A PRIZE ! SPIN FOR A PRIZE !'
const repeatedTextSize = '145px'
const repeatedTextHeight = '140px'
const repeatedTextColor = '#000000'
const repeatedTexLineHeight = '140px'

const cycleSpeed = '1000s';

//////////////////////////////////////////////////////

var ticker_html_1st;
var line_height = (parseInt(repeatedTexLineHeight.slice(0, -2)) - 1).toString() + 'px';

const createTextContainer = () => {
    const textContainer = document.createElement('div');
    textContainer.id = 'ticker_box_1st';
    textContainer.setAttribute('class', 'ticker_box_1st');
    textContainer.setAttribute("aria-label", repeatedText);

    const text1 = document.createElement('div');
    text1.setAttribute('anim_1st', 'one');
    text1.setAttribute('class', 'ticker_1st');
    text1.setAttribute("aria-hidden", "true");
    text1.id = 'ticker_1_1st';

    const text2 = document.createElement('div');
    text2.setAttribute('anim_1st', 'two');
    text2.setAttribute('class', 'ticker_1st');
    text2.id = 'ticker_2_1st';
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

      .span_1st {
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

      .ticker_box_1st {
      	position: absolute;
      	left: 0px;
      	top: 0px;
      	width: 100%;
      	height: ${repeatedTextHeight};
      	overflow: hidden;
      }

      .ticker_1st {
      	position: absolute;
      	top: 0px;
      	height: ${repeatedTextHeight};
      	white-space: nowrap;
      }

      .ticker_box_1st .ticker_1st {
      	visibility: hidden;
      }

      .ticker_box_1st[anim_1st=start] .ticker_1st {
      	visibility: visible;
      }

      .ticker_box_1st[anim_1st=start] .ticker_1st[anim_1st=one] {
      	animation-name: ticker_anim_1_1st;
      	animation-duration: ${cycleSpeed};
      	animation-timing-function: linear;
      }

      .ticker_box_1st[anim_1st=start] .ticker_1st[anim_1st=two] {
      	animation-name: ticker_anim_2_1st;
      	animation-duration: ${cycleSpeed};
      	animation-timing-function: linear;
      }`;

    return styleElement;
};

const createTickerStyle = () => {
    const tickerStyleElement = document.createElement('style');
    tickerStyleElement.setAttribute('type', 'text/css');
    tickerStyleElement.id = 'ticker_style_1st';

    return tickerStyleElement;
}

const createScript = () => {
    const scriptElement = document.createElement('script');
    scriptElement.setAttribute('type', 'text/javascript');

    scriptElement.innerHTML = `
	ticker_html_1st = '<span class="span_1st" >&nbsp;${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText} ${repeatedText}</span>';
	
		ticker_1_1st.innerHTML = ticker_html_1st;
		ticker_2_1st.innerHTML = ticker_html_1st;

            setTimeout(function(){
			
	 		    var t_width_1st = parseInt(window.getComputedStyle(ticker_1_1st).width);
	 		    console.log(t_width_1st);
	 		    ticker_1_1st.style.left = "0px";
	 		    ticker_2_1st.style.left = t_width_1st + "px";
	 		    ticker_style_1st.textContent = '@keyframes ticker_anim_1_1st {0% {left: 0px;}  100% {left:-' + t_width_1st + 'px;} } @keyframes ticker_anim_2_1st {0% {left: ' + t_width_1st +'px;}  100% {left:-0px;} }';
			
	 		    ticker_1_1st.addEventListener("animationend", function(e){
	 		    	if (ticker_1_1st.getAttribute("anim_1st") == "one"){
	 		    		ticker_1_1st.setAttribute("anim_1st","two");
	 		    	} else {
	 		    		ticker_1_1st.setAttribute("anim_1st","one");
	 		    	}
	 		    });
			
	 		    ticker_2_1st.addEventListener("animationend", function(e){
	 		    	if (ticker_2_1st.getAttribute("anim_1st") == "one"){
	 		    		ticker_2_1st.setAttribute("anim_1st","two");
	 		    	} else {
	 		    		ticker_2_1st.setAttribute("anim_1st","one");
	 		    	}
	 		    });
			
			    ticker_box_1st.setAttribute("anim_1st","start");
		    } ,1000);
        `;	

    return scriptElement;
}

class AnimatedTextStrip extends HTMLElement {
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
customElements.define('animated-text-strip', AnimatedTextStrip);