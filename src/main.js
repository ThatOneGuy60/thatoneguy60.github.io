// ===== Birthday "database" =====
const people = {
  Raven: { name: "Raven", month: 0, day: 7, page: "raven-birthday.html" },
  Jess: { name: "Jess", month: 0, day: 10, page: "jess-birthday.html" },
  Nai: { name: "Nai", month: 1, day: 11, page: "/nai" },
  DNA: { name: "DNA", month: 5, day: 2, page: "dna-birthday.html" },
  Unknown: { name: "Unknown", month: 1, day: 22, page: "unknown-birthday.html" },
  Lola: { name: "Lola", month: 7, day: 27, page: "lola-birthday.html" }
};

const app = document.getElementById("app");
let countdownInterval;

// Show directory with all names
function showDirectory() {
  clearInterval(countdownInterval);
  app.innerHTML = `
    <h1>🎂 Birthday Directory</h1>
    <p>Select your name</p>
    <div class="directory">
      ${Object.keys(people).map(id => `<button onclick="handleClick('${id}')">${people[id].name}</button>`).join("")}
    </div>
  `;
}

// Handle click on a name
function handleClick(id) {
  const person = people[id];
  if (!person) return;

  const today = new Date();
  const birthdayToday = today.getMonth() === person.month && today.getDate() === person.day;

  if (birthdayToday) {
    // Redirect to dedicated birthday page if it's the birthday
    window.location.href = person.page;
    return;
  }

  // Show locked popup style
  showLockedPerson(person);
}

// Show the locked popup like your previous script
function showLockedPerson(person) {
  clearInterval(countdownInterval);

  function updateCountdown() {
    const now = new Date();
    let birthdayThisYear = new Date(now.getFullYear(), person.month, person.day);
    if (now > birthdayThisYear) birthdayThisYear.setFullYear(now.getFullYear() + 1);
    const diff = birthdayThisYear - now;

    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff / (1000*60*60)) % 24);
    const minutes = Math.floor((diff / (1000*60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    app.innerHTML = `
      <div class="locked">🔒</div>
      <h1>Locked</h1>
      <p>This page unlocks on ${person.month + 1}/${person.day}</p>
      <div class="countdown">${days}d ${hours}h ${minutes}m ${seconds}s remaining</div>
      <div class="back" onclick="showDirectory()">← Back</div>
    `;
  }

  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
}

// Initialize homepage
showDirectory();