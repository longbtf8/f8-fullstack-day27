//  lấy element
const reloadBtn = document.querySelector(".btn-reload");
const replaceBtn = document.querySelector(".btn-replace");
const navigateBtn = document.querySelector(".btn-navigate");
// cập nhật url
function UpdateCurrentUrl() {
  document.querySelector("#currentUrl").textContent = location.href;
}
// Build url preview
function BuildUrlFromInputs(showAlert = true) {
  const protocol = document.querySelector("#protocol").value;
  const port = document.querySelector("#port").value.trim();
  const hostname = document.querySelector("#hostname").value.trim();
  const pathname = document.querySelector("#pathname").value.trim();
  const search = document.querySelector("#search").value.trim();
  const hash = document.querySelector("#hash").value.trim();
  if (!hostname) {
    if (showAlert) {
      alert("Vui long nhap hostname");
      return null;
    }
  }
  let url = protocol + "//" + hostname;
  if (port) {
    url += ":" + port;
  }
  if (pathname) {
    if (!pathname.startsWith("/")) {
      url += "/" + pathname;
    }
    url += pathname;
  }
  if (search) {
    if (search.startsWith("?")) {
      url += "?" + search;
    }
    url += search;
  }
  if (hash) {
    if (hash.startsWith("#")) {
      url += "#" + hash;
    }
    url += hash;
  }
  return url;
}
function UpdateUrlPreview() {
  const url = BuildUrlFromInputs(false);
  if (!url) {
    document.querySelector(".url-display").textContent =
      "Vui long nhap host name";
  }
  document.querySelector(".url-display").textContent = url;
}

//  option btn
reloadBtn.addEventListener("click", () => {
  if (confirm("Bạn có chắc chắn muốn tải lại trang?")) {
    location.reload();
  }
});

replaceBtn.addEventListener("click", () => {
  const url = BuildUrlFromInputs();
  if (url) {
    try {
      window.location.replace(url);
    } catch (e) {
      alert("khong ton tai duong dan" + e.message);
    }
  }
});
navigateBtn.addEventListener("click", () => {
  const url = BuildUrlFromInputs();
  if (url) {
    try {
      window.location.assign(url);
    } catch (e) {
      alert(e.message);
    }
  }
});

// Update duLieu khi nhap
document.addEventListener("DOMContentLoaded", function () {
  UpdateCurrentUrl();
  const inputs = ["protocol", "hostname", "port", "pathname", "search", "hash"];
  inputs.forEach((input) => {
    const element = document.getElementById(input);
    element.addEventListener("input", UpdateUrlPreview);
    element.addEventListener("change", UpdateCurrentUrl);
  });
  document.getElementById("hostname").value = "example.com";
  document.getElementById("pathname").value = "/demo";
  UpdateUrlPreview();
});
// load trang cập nhập url hiện tại
document.addEventListener("DOMContentLoaded", UpdateCurrentUrl);
