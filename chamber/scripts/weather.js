// Set last modified date
document.getElementById("last-modified").textContent = document.lastModified;

// const apiKey = "c3110f449717d52885e2a7cfdcb4f398";
const city = "Osaka,JP";
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

// Fetch current weather
fetch(weatherUrl)
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("current-temp").textContent = data.main.temp;
    document.getElementById("weather-desc").textContent =
      data.weather[0].description;
  })
  .catch((error) => console.error("Error fetching weather:", error));

// Fetch 3-day forecast
fetch(forecastUrl)
  .then((response) => response.json())
  .then((data) => {
    const forecastContainer = document.getElementById("forecast-cards");
    const dailyData = data.list
      .filter((reading) => reading.dt_txt.includes("12:00:00"))
      .slice(0, 3);
    dailyData.forEach((day) => {
      const date = new Date(day.dt_txt).toLocaleDateString("en-US", {
        weekday: "short",
      });
      const temp = day.main.temp;
      const card = document.createElement("div");
      card.classList.add("forecast-card");
      card.innerHTML = `<p>${date}: ${temp}°C</p>`;
      forecastContainer.appendChild(card);
    });
  })
  .catch((error) => console.error("Error fetching forecast:", error));

// Fetch and display spotlight members
fetch("data/members.json")
  .then((response) => response.json())
  .then((data) => {
    const goldSilverMembers = data.filter(
      (member) =>
        member.membershipLevel === "Gold" ||
        member.membershipLevel === "Silver",
    );
    const selectedMembers = goldSilverMembers
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const spotlightContainer = document.getElementById("spotlight-container");
    selectedMembers.forEach((member) => {
      const card = document.createElement("div");
      card.classList.add("spotlight-card");
      card.innerHTML = `
                <img src="images/${member.logo}" alt="${member.name} logo">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p><a href="${member.website}" target="_blank">${member.website}</a></p>
                <p>Membership: ${member.membershipLevel}</p>
            `;
      spotlightContainer.appendChild(card);
    });
  })
  .catch((error) => console.error("Error fetching members:", error));
