const fsG = {
  inited: false,
  removeInvisDiv: () => {
    const elem = API.parentWindow.$("#invis-o-div")
    elem && elem.remove()
  },

  showAllQuestions: () => {
    API.childWindow.document.querySelectorAll("[fstack]").forEach((elem) => {elem.style = ""})
  },

  startTasks: () => {
    const videoDiv = API.parentWindow.$("#frameArea")[0].children[1]
    if (videoDiv && videoDiv.style.opacity !== "0.01") fsG.startVideoTask()
    fsG.startQuestionTask()

  },

  startVideoTask: () => {
    if (API.Video.video) API.Video.video.addEventListener("ended", API.FrameChain.nextFrame)
  },

  startQuestionTask: () => {
    fsG.removeInvisDiv();
    fsG.showAllQuestions();
  },

  init: () => {
    console.log("fastgenuity operating on new frame")
    fsG.inited = true
    fsG.startTasks()
  }
};


if (!fsG.inited) fsG.init()