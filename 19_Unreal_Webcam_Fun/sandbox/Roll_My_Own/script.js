const video = document.querySelector("video");
const cameraSelect = document.querySelector("#cameraSelect");
populateCameraSelect();
const constraints = {
  audio: false,
  video: {
    width: 640,
    height: 480,
    facingMode: "user",
    deviceId: cameraSelect.value,
  },
};
getDeviceStream(constraints);

video.addEventListener("canplay", () => video.play());

function populateCameraSelect() {
  navigator.mediaDevices
    .enumerateDevices()
    .then(collectVideoInputs)
    .then((mediaDeviceInfoArray) => {
      const cameraSelect = document.querySelector("#cameraSelect");
      const optionElements = mediaDeviceInfoArray
        .map((mediaDeviceInfo, index) => {
          console.log("mediaDevicInfo", mediaDeviceInfo);
          //select first option on page load
          const selected = index === 0 ? "selected" : "";
          return `
          <option ${selected} value="${mediaDeviceInfo.deviceId}">${mediaDeviceInfo.label}</option> 
        `;
        })
        .join("");
      cameraSelect.innerHTML = optionElements;
    })
    .catch((err) => console.error(err));
}

function collectVideoInputs(devices) {
  return devices.filter((device) => device.kind === "videoinput");
}

function getDeviceStream(constraints) {
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
}

cameraSelect.addEventListener("change", (e) => {
  const constraints = {
    audio: false,
    video: {
      width: 640,
      height: 480,
      facingMode: "user",
      deviceId: e.target.value,
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
});
