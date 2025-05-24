const memberList = document.getElementById("member-list");
const isChamber = document.getElementsByClassName("active")[0].innerHTML.toLowerCase === "Chamber".toLowerCase;


function setGridView() {
  memberList.classList.remove("list-view");
  memberList.classList.add("grid-view");
}

function setListView() {
  memberList.classList.remove("grid-view");
  memberList.classList.add("list-view");
}

async function loadMembers() {
  try {
    const response = await fetch("./data/members.json");
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error("Failed to load member data:", error);
  }
}

function displayMembers(members) {
  memberList.innerHTML = "";
  members.forEach((member) => {
    const card = document.createElement("div");
    card.classList.add("member-card");

    card.innerHTML = `
      <h3>${member.name}</h3>
      <p><em>${member.tagline}</em></p>
      <img src="./images/${member.image}" alt="${member.name}" loading="lazy">
      <p><strong>Email:</strong> <a href="mailto:${member.email}">${member.email}</a></p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
    `;

    memberList.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.querySelector("nav");

  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
});


document.getElementById("last-modified").textContent = document.lastModified;


if(isChamber){
  loadMembers();
}