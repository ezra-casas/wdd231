const url =
  "https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json";
const cards = document.querySelector("#cards");

async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  displayProphets(data.prophets);
}

function displayProphets(data) {
  data.forEach((prophet) => {
    let card = document.createElement("section");
    let fullNameH2 = document.createElement("h2");
    let portrait = document.createElement("img");
    const fullName = `${prophet.name} ${prophet.lastname}`;
    fullNameH2.textContent = fullName;

    portrait.setAttribute("src", prophet.imageurl);
    portrait.setAttribute("alt", `Portrait of ${fullName}`);
    portrait.setAttribute("loading", "lazy");
    portrait.setAttribute("width", "340");
    portrait.setAttribute("height", "440");

    card.appendChild(fullNameH2);
    card.appendChild(portrait);

    cards.appendChild(card);
  });
}

getProphetData();
