// Persistent storage
let users = JSON.parse(localStorage.getItem("vcfUsers")) || [];

function saveUsers() {
  localStorage.setItem("vcfUsers", JSON.stringify(users));
}
function registerUser(e) {
  e.preventDefault();
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const code = document.getElementById("countryCode").value.trim();
  const phone = document.getElementById("phone").value.trim();

  // Combine into standard format
  const fullNumber = "+" + code + phone;

  // Prevent duplicates
  let users = JSON.parse(localStorage.getItem("vcfUsers")) || [];
  if (users.find(u => u.phone === fullNumber)) {
    alert("This number is already registered!");
    return;
  }

  // Confirm reCAPTCHA
  if (!document.getElementById("humanCheck").checked) {
    alert("Please confirm you are human!");
    return;
  }

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const code = document.getElementById("countryCode").value.trim();
  const phone = document.getElementById("phone").value.trim();

  const fullNumber = "+" + code + phone;

  // Prevent duplicates
  let users = JSON.parse(localStorage.getItem("vcfUsers")) || [];
  if (users.find(u => u.phone === fullNumber)) {
    alert("This number is already registered!");
    return;
  }

  users.push({ name: firstName + " " + lastName, phone: fullNumber });
  localStorage.setItem("vcfUsers", JSON.stringify(users));

  // Success message
  document.getElementById("success").innerHTML = `
    ✅ Registration successful! <br>
    <a href="https://chat.whatsapp.com/example" target="_blank">Join WhatsApp Public Group</a>
  `;

  // Celebration animations
  launchCelebration();
}

function launchCelebration() {
  // Balloons
  for (let i = 0; i < 5; i++) {
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.textContent = "🎈";
    balloon.style.left = (10 + i * 15) + "%";
    document.body.appendChild(balloon);
    setTimeout(() => balloon.remove(), 4000);
  }

  // Fireworks
  for (let i = 0; i < 3; i++) {
    const firework = document.createElement("div");
    firework.className = "firework";
    firework.textContent = "🎆";
    firework.style.left = (30 + i * 20) + "%";
    firework.style.top = "50%";
    document.body.appendChild(firework);
    setTimeout(() => firework.remove(), 2000);
  }
}

// Admin login
function adminLogin() {
  const pass = document.getElementById("adminPass").value;
  if (pass === "Beltah@2026") {
    document.getElementById("adminContent").style.display = "block";
    showAdminList();
  } else {
    alert("Wrong password!");
  }
}
function autoFillCode() {
  const code = document.getElementById("countryCode").value;
  const phoneInput = document.getElementById("phone");
  phoneInput.value = code + " ";
}
function autoFillCode() {
  const code = document.getElementById("countryCode").value;
  const phoneInput = document.getElementById("phone");
  // Only insert code if not already present
  if (!phoneInput.value.startsWith(code)) {
    phoneInput.value = code + " ";
  }
}

function showAdminList() {
  const list = document.getElementById("adminList");
  list.innerHTML = users.map(u => `<p>${u.name} - ${u.phone}</p>`).join("");
}

function downloadVCF() {
  let vcf = "";
  users.forEach(u => {
    vcf += `BEGIN:VCARD\nVERSION:3.0\nFN:${u.name}\nTEL:${u.phone}\nEND:VCARD\n`;
  });
  const blob = new Blob([vcf], { type: "text/vcard" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "vcf-gains.vcf";
  link.click();
}
function handleCountrySelect() {
  const code = document.getElementById("countryCode").value;
  const phoneInput = document.getElementById("phone");

  // Auto-fill code into phone field
  phoneInput.value = code + " ";

  // Hide search box after selection
  const searchBox = document.getElementById("countrySearchBox");
  if (searchBox) {
    searchBox.style.display = "none";
  }
}
// Country list
function loadCountries() {
  const select = document.getElementById("countryCode");
  countries.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.dial_code;
    opt.textContent = `${c.flag} ${c.name} (${c.dial_code})`;
    select.appendChild(opt);
  });
}
function autoFillCode() {
  const code = document.getElementById("countryCode").value;
  const phoneInput = document.getElementById("phone");
  if (!phoneInput.value.startsWith(code)) {
    phoneInput.value = code + " ";
  }
}

function filterCountries() {
  const search = document.getElementById("searchCountry").value.toLowerCase();
  const select = document.getElementById("countryCode");
  select.innerHTML = "";
  countries.filter(c => c.name.toLowerCase().includes(search)).forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.dial_code;
    opt.textContent = `${c.flag} ${c.name} (${c.dial_code})`;
    select.appendChild(opt);
  });
}

window.onload = () => {
  if (document.getElementById("countryCode")) loadCountries();
};
