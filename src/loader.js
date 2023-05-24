const fsdPath = document.currentScript.getAttribute("fsgPath");
iFN.listen("ChildFrameLoaded", function (data) {
  if (data.source[0].fsG) {
    data.source[0].fsG.log("already loaded, skipping");
    return;
  }
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = fsdPath;
  const doc = document.querySelector("#stageFrame").contentDocument;
  doc.head.appendChild(script);
});
