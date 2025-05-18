
const memberList = document.getElementById('member-list');

function setGridView() {
  memberList.classList.remove('list-view');
  memberList.classList.add('grid-view');
}

function setListView() {
  memberList.classList.remove('grid-view');
  memberList.classList.add('list-view');
}

// Load members from JSON
async function loadMembers() {
  try {
    const response = await fetch('data/members.json');
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error('Failed to load member data:', error);
  }
}

function displayMembers(members) {
  memberList.innerHTML = '';
  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('member-card');

    card.innerHTML = `
      <h3>${member.name}</h3>
      <p><strong>Membership:</strong> ${getMembershipLevel(member.membership)}</p>
      <p>${member.description}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
      <img src="images/${member.image}" alt="${member.name} logo" style="max-width: 100px; margin-top: 0.5rem;">
      `;

    memberList.appendChild(card);
  });
}

function getMembershipLevel(level) {
  switch (level) {
    case 1: return "Member";
    case 2: return "Silver";
    case 3: return "Gold";
    default: return "Unknown";
  }
}

// Footer dates
document.getElementById('last-modified').textContent = document.lastModified;

// Run the data loader
loadMembers();
