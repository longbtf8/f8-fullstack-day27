let currentStream = null;

const video = document.getElementById("video");
const photoPreview = document.getElementById("photoPreview");
//   Button
const startBtn = document.querySelector(".start-btn");
const stopBtn = document.querySelector(".stop-btn");
const captureBtn = document.querySelector(".capture-btn");
const downloadBtn = document.querySelector(".download-btn");

// Trang thai camera
const statusCamera = document.querySelector(".status-camera");

//  tạo canvas
const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

//  update Trang thai
function updateCameraStatus(isActive) {
  if (isActive) {
    statusCamera.textContent = "Camera: Đang Hoat Động";
    statusCamera.style.color = "#4CAF50";
  } else {
    statusCamera.textContent = "Camera: Tắt";
    statusCamera.style.color = "#666";
  }
}

//  hàm bật came
async function startCamera() {
  try {
    currentStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    video.srcObject = currentStream;
    //  Cập nhật nút
    startBtn.style.display = "none";
    stopBtn.style.display = "inline-block";
    captureBtn.style.display = "inline-block";
    updateCameraStatus(true);
    alert(" Camera đã được bật!");
  } catch (e) {
    alert("Không thể bật camera " + e.message);
  }
}
//  stop
function stopCamera() {
  if (currentStream) {
    currentStream.getTracks().forEach((track) => {
      track.stop();
    });
    currentStream = null;
    video.srcObject = null;
    startBtn.style.display = "inline-block";
    stopBtn.style.display = "none";
    captureBtn.style.display = "none";

    updateCameraStatus(false);
    alert("Camera đã tắt");
  }
}

function takePhoto() {
  if (!currentStream) {
    alert("Bật camera đi rồi chụp");
    return;
  }
  const videoWidth = video.videoWidth;
  const videoHeight = video.videoHeight;

  //    Thiết lập canvas cùng kích thước với video
  canvas.width = videoWidth;
  canvas.height = videoHeight;
  context.drawImage(video, 0, 0, videoWidth, videoHeight);

  // Chuyển canvas thành hình ảnh (data URL)
  const imageData = canvas.toDataURL("image/png");

  //  Hiển thị ảnh vừa chụp
  photoPreview.src = imageData;
  photoPreview.style.display = "block";

  downloadBtn.style.display = "inline-block";
}

function downloadPhoto() {
  // Kiểm tra có ảnh không
  if (!photoPreview.src) {
    alert("Chưa có ảnh để download!");
    return;
  }

  // Tạo element để download
  const link = document.createElement("a");
  link.download = "photo.png";
  link.href = canvas.toDataURL(); // Data URL từ canvas
  link.click(); // Trigger download

  alert("Đã tải ảnh về máy!");
}
startBtn.addEventListener("click", startCamera);
stopBtn.addEventListener("click", stopCamera);
captureBtn.addEventListener("click", takePhoto);
downloadBtn.addEventListener("click", downloadPhoto);

stopBtn.style.display = "none";
captureBtn.style.display = "none";
downloadBtn.style.display = "none";
photoPreview.style.display = "none";

updateCameraStatus(false);
