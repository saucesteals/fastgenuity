const fsGPath = chrome.runtime.getURL("src/player.js");
const loaderPath = chrome.runtime.getURL("src/loader.js");

const script = document.createElement("script");
script.type = "text/javascript";
script.src = loaderPath;
script.setAttribute("fsgPath", fsGPath);
(document.head || document.documentElement).appendChild(script);
