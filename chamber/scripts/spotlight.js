fetch('./data/members.json')
    .then(response => response.json())
    .then(data => {
        // Assuming membership: 3 is Gold, 2 is Silver
        const goldSilverMembers = data.filter(member => member.membership === 3 || member.membership === 2);
        const selectedMembers = goldSilverMembers.sort(() => 0.5 - Math.random()).slice(0, 3);
        const spotlightContainer = document.getElementById('spotlight-container');
        spotlightContainer.innerHTML = ''; // Clear existing content
        selectedMembers.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('spotlight-card');
            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name} logo">
                <h3>${member.name}</h3>
                <p class="tagline">${member.tagline}</p>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p><a href="mailto:${member.email}">${member.email}</a></p>
                <p><a href="${member.website}" target="_blank">${member.website}</a></p>
                <p>Membership: ${member.membership === 3 ? 'Gold' : 'Silver'}</p>
                <p class="description">${member.description}</p>
            `;
            spotlightContainer.appendChild(card);
        });
    })
    .catch(error => console.error('Error fetching members:', error));