// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  console.log('Enabling widescreen for ' + tab.url );
  chrome.tabs.executeScript({
    code: 'document.querySelector("#netflix-player > div.player-video-wrapper > div").style.cssText = "position: relative; width: 134%; height: 134%; margin-left:-585px; margin-top:-246px;"'
  });
});