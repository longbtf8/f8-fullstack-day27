const textCopy = document.getElementById("textCopy");
const textPaste = document.getElementById("Paste");

const copyBtn = document.getElementById("btnCopy");
const pasteBtn = document.getElementById("idPaste");

copyBtn.addEventListener("click", () => {
  const text = textCopy.value.trim();
  if (!text) return;
  navigator.clipboard.writeText(text);
  textCopy.value = "";
});
pasteBtn.addEventListener("click", () => {
  if (navigator.clipboard?.readText) {
    navigator.clipboard.readText().then((text) => {
      textPaste.value = text ?? "";
    });
  }
});
