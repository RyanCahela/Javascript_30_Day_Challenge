const video = document.querySelector("video");

const constraints = {
  audio: false,
  video: {
    width: 640,
    height: 480,
    facingMode: "user",
  },
};

navigator.mediaDevices
  .getUserMedia(constraints)
  .then((mediaStreamObj) => {
    if ("srcObject" in video) {
      video.srcObject = mediaStreamObj;
    } else {
      video.src = window.URL.createObjectURL(mediaStreamObj);
    }
  })
  .catch((err) => console.error(err));

video.addEventListener("canplay", () => video.play());
