// When the extension is installed or upgraded
chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // That fires when a page URL matches a WiPlayer page
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: 'www.netflix.com', urlContains: 'WiPlayer' },
          })
        ],
        // Show the widescreen pageaction
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});

// Widescreen enabled flag
var ultrawide = false;

// Called when the user clicks on the page action
chrome.pageAction.onClicked.addListener(function(tab){
  if (ultrawide == false) {
    console.log('Enabling widescreen for ' + tab.url );
    // Resize the video wrapper to fill screen
    chrome.tabs.executeScript({
      code: 'document.querySelector("#netflix-player > div.player-video-wrapper > div").style.cssText = "position: relative; width: 134%; height: 134%; margin-left:-585px; margin-top:-246px;"'
    });
    // Set page icon to active state
    chrome.pageAction.setIcon({path: "img/icon_on_19.png", tabId: tab.id});
    ultrawide = true;
  } else {
    console.log('Disabling widescreen for ' + tab.url );
    // Restore original scaling
    chrome.tabs.executeScript({
      code: 'document.querySelector("#netflix-player > div.player-video-wrapper > div").style.cssText = "position: relative; width: 100%; height: 100%; overflow: hidden;"'
    });
    // Set page icon to inactive state
    chrome.pageAction.setIcon({path: "img/icon_off_19.png", tabId: tab.id});
    ultrawide = false;
  }
});
