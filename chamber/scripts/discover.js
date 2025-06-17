document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("attractions-container");

  fetch("./data/discover.json")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((place) => {
        const card = document.createElement("div");
        card.className = "attraction-card";
        card.innerHTML = `
                    <h2>${place.name}</h2>
                    <figure><img src="./images/${place.image}" alt="${place.name}"></figure>
                    <address>${place.address}</address>
                    <p>${place.description}</p>
                    <button>Learn More</button>
                `;
        container.appendChild(card);
      });
    });

  const msgContainer = document.getElementById("visit-msg");
  const lastVisit = localStorage.getItem("lastVisit");
  const now = Date.now();
  if (!lastVisit) {
    msgContainer.textContent =
      "Welcome! Let us know if you have any questions.";
  } else {
    const diffDays = Math.floor(
      (now - Number(lastVisit)) / (1000 * 60 * 60 * 24),
    );
    msgContainer.textContent =
      diffDays < 1
        ? "Back so soon! Awesome!"
        : `You last visited ${diffDays} day${diffDays > 1 ? "s" : ""} ago.`;
  }
  localStorage.setItem("lastVisit", now);
});
