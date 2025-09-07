(function(){
  const DATA = {
    eventDate: '21 December 2025 09:00:00',
    venueMapQuery: 'Sky Turf',
    seatsTotal: 100,
    seatsBooked: 29
  };

  function updateProgress() {
    const total = DATA.seatsTotal;
    const booked = DATA.seatsBooked;
    const pct = Math.round((booked / total) * 100);

    document.getElementById('bog-progress-fill').style.width = pct + '%';
    document.getElementById('bog-progress-value').textContent = pct + '%';
    document.getElementById('bog-seats-booked').textContent = booked;
    document.getElementById('bog-seats-total').textContent = total;
  }

  // Progress bar init
  updateProgress();

  // Map link
  document.getElementById('bog-map-link').href = 
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(DATA.venueMapQuery)}`;

  // Register button - increments seats
  document.getElementById('bog-register-btn').addEventListener('click', () => {
    if (DATA.seatsBooked < DATA.seatsTotal) {
      DATA.seatsBooked++;
      updateProgress();
      alert("🎉 Seat registered successfully!");
    } else {
      alert("Sorry, all seats are booked!");
    }
  });

  // Sign in button
  document.getElementById('bog-signin-btn').addEventListener('click', () => {
    alert("Sign in coming soon!");
  });

  // Countdown
  function updateCountdown() {
    const eventDate = new Date(DATA.eventDate).getTime();
    const now = new Date().getTime();
    const diff = eventDate - now;

    if (diff <= 0) {
      document.getElementById('bog-countdown').textContent = "✅ Event Started!";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById('bog-countdown').textContent =
      `⏳ ${days}d ${hours}h ${mins}m left`;
  }

  setInterval(updateCountdown, 60000);
  updateCountdown();
})();
