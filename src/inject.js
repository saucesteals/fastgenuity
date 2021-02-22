const fsGPath = chrome.runtime.getURL('src/player.js');

const listener = `
iFN.listen("ChildFrameLoaded", function(data) {
    if (data.source[0].fsG) {
        data.source[0].fsG.log("already loaded, skipping")
        return
    }
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = {{path}};
    const doc = document.querySelector("#stageFrame").contentDocument
    doc.head.appendChild(script);
})
`

function loadFastGenuity() {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = listener.replace("{{path}}", '"' + fsGPath + '"');
    document.head.appendChild(script);
};


loadFastGenuity()