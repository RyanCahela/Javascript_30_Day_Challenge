const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

navigator.mediaDevices
  .getUserMedia({ video: { width: 1280, height: 720 }, audio: false })
  .then((mediaStreamObj) => {
    if ("srcObject" in video) {
      video.srcObject = mediaStreamObj;
      console.log(video.srcObject);
    } else {
      video.src = window.URL.createObjectURL(mediaStreamObj);
    }
  })
  .catch((err) => console.error(err));

video.addEventListener("canplay", (e) => {
  video.play();
});
