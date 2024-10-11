document.addEventListener('DOMContentLoaded', () => {
    console.log('The Food Fairy is ready to spread magic!');
    
    // Fetch and display recent donations
    fetch('/delivery-records/recent')
        .then(response => response.json())
        .then(donations => {
            const recentDonationsList = document.getElementById('recent-donations');
            donations.forEach(donation => {
                const li = document.createElement('li');
                li.textContent = `${donation.donor_name} donated ${donation.quantity} ${donation.food_type} on ${new Date(donation.delivery_date).toLocaleDateString()}`;
                recentDonationsList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching recent donations:', error));

    // Fetch and display distribution centers
    fetch('/distribution-centers')
        .then(response => response.json())
        .then(centers => {
            const centersList = document.getElementById('distribution-centers');
            centers.forEach(center => {
                const li = document.createElement('li');
                li.textContent = `${center.name} - Capacity: ${center.capacity}`;
                centersList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching distribution centers:', error));
});