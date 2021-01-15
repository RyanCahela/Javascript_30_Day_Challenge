const video = document.querySelector("video");
const cameraSelect = document.querySelector("#cameraSelect");

const constraints = {
  audio: false,
  video: {
    width: 640,
    height: 480,
    facingMode: "user",
    deviceId:
      "40824012d1094e03d97dafa0acb3c4132d4da26fe62f8dd37b4b228d8c5eceb1",
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

function populateCameraSelect() {
  navigator.mediaDevices
    .enumerateDevices()
    .then(collectVideoInputs)
    .then((mediaDeviceInfoArray) => {
      const cameraSelect = document.querySelector("#cameraSelect");
      const optionElements = mediaDeviceInfoArray
        .map((mediaDeviceInfo) => {
          console.log("mediaDevicInfo", mediaDeviceInfo);
          return `
          <option data-deviceId="${mediaDeviceInfo.deviceId}">${mediaDeviceInfo.label}</option> 
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

function insertDeviceInfoIntoDom(mediaDeviceInfoArray, parentElement) {
  const parent = document.querySelector(parentElement);
  const optionElements = mediaDeviceInfoArray
    .map((mediaDeviceInfo) => {
      console.log("mediaDevicInfo", mediaDeviceInfo);
      return `
      <option data-deviceId="${mediaDeviceInfo.deviceId}">${mediaDeviceInfo.label}</option> 
    `;
    })
    .join("");
  parent.innerHTML = optionElements;
}

populateCameraSelect();
