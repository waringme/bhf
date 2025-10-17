// add delayed functionality here
import {
  getMetadata, loadScript, fetchPlaceholders,
  sampleRUM,
} from './aem.js';
import {
  a, span, i,
} from './dom-helpers.js';
import {
  isInternalPage,
} from './utils.js';

// Adobe Target - start

window.targetGlobalSettings = {
  bodyHidingEnabled: true,
};

function loadAT() {
  function targetPageParams() {
    return {
      "at_property": "549d426b-0bcc-be60-ce27-b9923bfcad4f"
    };
  }
  
  // Add target-ready class when Target is loaded and has processed
  function markTargetReady() {
    // Small delay to ensure Target has fully processed personalization
    setTimeout(() => {
      document.body.classList.add('target-ready');
      console.log('Target ready - content fragments now visible');
    }, 50);
  }
  
  // Check if Target is already loaded
  if (window.adobe && window.adobe.target) {
    markTargetReady();
  } else {
    // Wait for Target to load
    const checkTarget = setInterval(() => {
      if (window.adobe && window.adobe.target) {
        clearInterval(checkTarget);
        markTargetReady();
      }
    }, 50);
    
    // Fallback timeout
    setTimeout(() => {
      clearInterval(checkTarget);
      markTargetReady();
    }, 2000);
  }
  
  loadScript(window.hlx.codeBasePath+'/scripts/at-lsig.js');
}
// Adobe Target - end



// refactor tweetable links function
/**
 * Opens a popup for the Twitter links autoblock.
 */
function openPopUp(popUrl) {
  const popupParams = `height=450, width=550, top=${(window.innerHeight / 2 - 275)}`
   + `, left=${(window.innerWidth / 2 - 225)}`
   + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0';
  window.open(popUrl, 'fbShareWindow', popupParams);
}

/**
 * Finds and embeds custom JS and css
 */
function embedCustomLibraries() {
  const externalLibs = getMetadata('js-files');
  const libsArray = externalLibs?.split(',').map(url => url.trim());

  libsArray.forEach((url, index) => {
    //console.log(`Loading script ${index + 1}: ${url}`);
    loadScript(`${url}`);
  });
  
}

/**
 * Finds and decorates anchor elements with Twitter hrefs
 */
function buildTwitterLinks() {
  const main = document.querySelector('main');
  if (!main) return;

  // get all paragraph elements
  const paras = main.querySelectorAll('p');
  const url = window.location.href;
  const encodedUrl = encodeURIComponent(url);

  [...paras].forEach((paragraph) => {
    const tweetables = paragraph.innerHTML.match(/&lt;tweetable[^>]*&gt;([\s\S]*?)&lt;\/tweetable&gt;/g);
    if (tweetables) {
      tweetables.forEach((tweetableTag) => {
        const matchedContent = tweetableTag.match(
          /&lt;tweetable(?:[^>]*data-channel=['"]([^'"]*)['"])?(?:[^>]*data-hashtag=['"]([^'"]*)['"])?[^>]*&gt;([\s\S]*?)&lt;\/tweetable&gt;/,
        );
        const channel = matchedContent[1] || '';
        const hashtag = matchedContent[2] || '';
        const tweetContent = matchedContent[3];

        let modalURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetContent)}`
          + `&original_referrer=${encodedUrl}&source=tweetbutton`;
        if (channel) modalURL += `&via=${encodeURIComponent(channel.charAt(0) === '@' ? channel.substring(1) : channel)}`;
        if (hashtag) modalURL += `&hashtags=${encodeURIComponent(hashtag)}`;

        const tweetableEl = span(
          { class: 'tweetable' },
          a({ href: modalURL, target: '_blank', tabindex: 0 }, tweetContent, i({ class: 'lp lp-twit' })),
        );
        paragraph.innerHTML = paragraph.innerHTML.replace(tweetableTag, tweetableEl.outerHTML);
      });
    }
    [...paragraph.querySelectorAll('.tweetable > a')].forEach((twitterAnchor) => {
      twitterAnchor.addEventListener('click', (event) => {
        event.preventDefault();
        const apiURL = twitterAnchor.href;
        openPopUp(apiURL);
      });
    });
  });
}

if (!window.location.hostname.includes('localhost')) {
  
  embedCustomLibraries();
  loadAT();
}
