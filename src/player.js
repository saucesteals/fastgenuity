window.fsG = window.fsG || {
  inited: false,
  log: (message) => console.log("[fastgenuity] " + message),

  next: () => {
    if (API.FrameChain.framesStatus.length == API.FrameChain.currentFrame) {
      fsG.log("attemping to go to the next activity")
      return window.parent.document.querySelector(".goRight").click()
    }

    fsG.log("attemping to go to the next frame")
    API.FrameChain.nextFrame()

  },


  removeInvisDiv: () => {
    const elem = $("#invis-o-div");
    elem && elem.remove();
  },

  showAllQuestions: () => {
    API.childWindow.document.querySelectorAll("[fstack]").forEach((elem) => {
      elem.style = "";
    });
  },
  
  bindToDoneButton: () => {
    const elem = document.querySelector("#btnCheck")
    if (elem && !elem.fsG) {
      elem.onclick = () => {
        API.Frame.check(); 

        setTimeout(() => {
          if (API.Frame.isComplete()) {
            fsG.next()
          }
        }, 500);
      }
      elem.fsG = true;
    }
  },

  MessageHandler: (e) => {
    setTimeout(fsG.startVideoTask, 6000);
    fsG.startQuestionTask();
  },

  startVideoTask: () => {
    if (API.Video.video && !API.Video.video.fsG) {
      API.Video.video.fsG = true;
      fsG.log("starting video task");

      API.Video.video.addEventListener("progress", () => {
        fsG.log("attemping to skip on progress event");
        fsG.next();
      });

      API.Video.video.addEventListener("ended", () => {
        console.log("attemping to skip on ended event");
        fsG.next();
      });
      
    }
  },

  startQuestionTask: () => {
    fsG.log("starting question task");
    fsG.removeInvisDiv();
    fsG.showAllQuestions();
    fsG.bindToDoneButton();
  },

  init: () => {
    fsG.log("operating on a new staging frame");
    window.parent.addEventListener("message", fsG.MessageHandler);
    fsG.inited = true;
  },
};
var fsG = window.fsG;

if (!fsG.inited) fsG.init();
