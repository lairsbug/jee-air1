fetch('quotes.json')
  .then(res => res.json())
  .then(data => document.getElementById('quoteBody').textContent = `"${data[Math.floor(Math.random() * data.length)]}"`)
  .catch(err => console.error('Error loading quotes:', err));

const monthsBetweenDates = (startDate, endDate) => {
  const start = new Date(startDate), end = new Date(endDate);
  let months = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();
  return months <= 0 ? 0 : months;
};
document.getElementById('months').textContent = monthsBetweenDates('2025-04-14', '2027-01-01');

const daysLeftInMonth = () => new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() - new Date().getDate();
document.getElementById('days').textContent = daysLeftInMonth();

const startDecreasingClock = () => {
  const formatTime = seconds => `${String(Math.floor(seconds / 3600)).padStart(2, '0')}:${String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  let totalSeconds = Math.floor((new Date().setHours(24, 0, 0, 0) - new Date()) / 1000);
  const interval = setInterval(() => {
    if (totalSeconds <= 0) { clearInterval(interval); document.getElementById('time').textContent = '00:00:00'; return; }
    document.getElementById('time').textContent = formatTime(totalSeconds--);
  }, 1000);
};
startDecreasingClock();

document.addEventListener("keydown", (e) => {
  if (e.key === "F12" || (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) || (e.ctrlKey && e.key === "U")) {
    e.preventDefault();
    alert("Dev tools are off-limits, bruh.");
  }
});



const backgroundImages = document.querySelectorAll('.background-image');

const loadBackgroundImage = (entry, observer) => {
  if (entry.isIntersecting) {
    const imageElement = entry.target;
    const imageUrl = imageElement.getAttribute('data-bg');
    imageElement.style.backgroundImage = imageUrl;
    imageElement.style.opacity = 1;
    observer.unobserve(imageElement); // Stop observing once the image is loaded
  }
};

const observerOptions = {
  root: null, // Use the viewport as the root
  threshold: 0.1 // Load the image when 10% of the element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => loadBackgroundImage(entry, observer));
}, observerOptions);

backgroundImages.forEach(image => observer.observe(image));
