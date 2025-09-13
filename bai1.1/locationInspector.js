const locationProperties = [
  { name: "href" },
  { name: "protocol" },
  { name: "hostname" },
  { name: "host" },
  { name: "port" },
  { name: "pathname" },
  { name: "search" },
  { name: "hash" },
  { name: "origin" },
];
function UpLoadLocation() {
  const propertiesList = document.querySelector(".properties-list");
  propertiesList.innerHTML = "";
  locationProperties.forEach((prop) => {
    const value = location[prop.name];
    const listItem = document.createElement("li");
    listItem.className = "property-item";
    listItem.innerHTML = `<div class="prop-name">PropertyName:location.${
      prop.name
    }</div>
          <div class="prop-value ${
            value === "" ? "empty" : ""
          }">Current Value : ${value === "" ? "empty" : value}</div>`;
    propertiesList.appendChild(listItem);
  });
}
// Khi load trang
document.addEventListener("DOMContentLoaded", UpLoadLocation());
