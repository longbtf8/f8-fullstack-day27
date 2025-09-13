const pages = {
  home: {
    title: " Trang Chủ",
    content: "Chào mừng đến với trang chủ! Đây là nội dung của trang Home.",
  },
  about: {
    title: "About",
    content:
      "Thông tin về chúng tôi. Chúng tôi là công ty chuyên về công nghệ web.",
  },
  services: {
    title: "Services",
    content:
      "Các dịch vụ của chúng tôi: Thiết kế web, Lập trình ứng dụng, Tư vấn công nghệ.",
  },
  contact: {
    title: "Contact",
    content:
      "Liên hệ với chúng tôi: Email: contact@example.com, Phone: 0123456789",
  },
};
const contentEl = document.querySelector(".content");
const historyEl = document.querySelector(".history-length-child");

function renderConTent(pageKey) {
  const data = pages[pageKey] || pages.home;
  contentEl.innerHTML = `${data.content}`;
  //   Cập nhật tiêu đề
  document.title = `${data.title}`;

  historyEl.textContent = history.length;
}
document.addEventListener("DOMContentLoaded", () => {
  // gắn click cho từng link
  document.querySelectorAll("nav a[data-page]").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const key = a.dataset.page;
      const url = key === "home" ? "/" : `/${key}`;
      history.pushState({ page: key }, "", url);
      renderConTent(key);
      setActiveNav(key);
    });
  });
  const initKey = keyFromPath(window.location.pathname);
  const initUrl = initKey === "home" ? "/" : `/${initKey}`;
  history.replaceState({ page: initKey }, "", initUrl);
  renderConTent(initKey);
  setActiveNav(initKey);
});
function setActiveNav(currentKey) {
  document.querySelectorAll("nav a[data-page]").forEach((a) => {
    a.classList.toggle("active", a.dataset.page == currentKey);
  });
}
const pathToKey = {
  "/": "home",
  "/about": "about",
  "/services": "services",
  "/contact": "contact",
};

// lấy ra tên page
function keyFromPath(pathname) {
  return pathToKey[pathname] || "home";
}
window.addEventListener("popstate", (e) => {
  const key = e.state?.page || keyFromPath(window.location.pathname);
  renderConTent(key);
  setActiveNav(key);
});
