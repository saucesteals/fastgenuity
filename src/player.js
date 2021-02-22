window.fsG = window.fsG || {
  inited: false,
  lastVideoSource: "",
  log: (message) => console.log("[fastgenuity] " + message),
  removeInvisDiv: () => {
    const elem = $("#invis-o-div");
    elem && elem.remove();
  },

  showAllQuestions: () => {
    API.childWindow.document.querySelectorAll("[fstack]").forEach((elem) => {
      elem.style = "";
    });
  },

  MessageHandler: (e) => {
    setTimeout(fsG.startVideoTask, 6000);
    fsG.startQuestionTask();
  },

  startVideoTask: () => {
    if (API.Video.video && API.Video.video.src !== fsG.lastVideoSource) {
      fsG.log("starting video task");
      fsG.lastVideoSource = API.Video.video.src;

      API.Video.video.addEventListener("progress", () => {
        fsG.log("attemping to skip on progress event");
        API.FrameChain.nextFrame();
      });

      API.Video.video.addEventListener("ended", () => {
        console.log("attemping to skip on ended event");
        API.FrameChain.nextFrame();
      });
      
    }
  },

  startQuestionTask: () => {
    fsG.log("starting question task");
    fsG.removeInvisDiv();
    fsG.showAllQuestions();
  },

  init: () => {
    fsG.log("operating on a new staging frame");
    window.parent.addEventListener("message", fsG.MessageHandler);
    fsG.inited = true;
  },
};
var fsG = window.fsG;

if (!fsG.inited) fsG.init();
