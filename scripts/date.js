document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("currentyear");
  yearSpan.textContent = new Date().getFullYear();

  const lastModified = document.getElementById("lastModified");
  lastModified.textContent = `Last updated: ${document.lastModified}`;
})
