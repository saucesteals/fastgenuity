const script = document.createElement("script");
script.type = "text/javascript";
script.src = chrome.runtime.getURL('src/player.js');
(document.head||document.documentElement).appendChild(script);