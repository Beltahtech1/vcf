// Persistent storage
let users = JSON.parse(localStorage.getItem("vcfUsers")) || [];

function saveUsers() {
  localStorage.setItem("vcfUsers", JSON.stringify(users));
}

// Registration logic
function registerUser(e) {
  e.preventDefault();

  // Confirm reCAPTCHA
  if (!document.getElementById("humanCheck").checked) {
    alert("Please confirm you are human!");
    return;
  }

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const code = document.getElementById("countryCode").value.trim();
  const phone = document.getElementById("phone").value.trim();

  // Combine into standard format
  const fullNumber = "+" + code + phone;

  // Prevent duplicates
  if (users.find(u => u.phone === fullNumber)) {
    alert("This number is already registered!");
    return;
  }

  // Save new user
  users.push({ name: firstName + " " + lastName, phone: fullNumber });
  saveUsers();

  // Success message
  document.getElementById("success").innerHTML = `
    ✅ Registration successful! <br>
    <span class="success-whatsapp">📱 WhatsApp Ready</span><br>
    <a href="https://chat.whatsapp.com/example" target="_blank">Join WhatsApp Public Group</a>
  `;

  // Launch celebration
  launchCelebration();
}

// Celebration animations
function launchCelebration() {
  // Balloons floating up
  for (let i = 0; i < 6; i++) {
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.textContent = "🎈";
    balloon.style.left = (10 + i * 15) + "%";
    balloon.style.animation = "balloons 4s cubic-bezier(0.16, 1, 0.3, 1) forwards";
    document.body.appendChild(balloon);
    setTimeout(() => balloon.remove(), 4000);
  }

  // Fireworks burst
  for (let i = 0; i < 4; i++) {
    const firework = document.createElement("div");
    firework.className = "firework";
    firework.textContent = "🎆";
    firework.style.left = (20 + i * 20) + "%";
    firework.style.top = "50%";
    firework.style.animation = "fireworks 2s cubic-bezier(0.16, 1, 0.3, 1) forwards";
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

// Show admin list
function showAdminList() {
  const list = document.getElementById("adminList");
  list.innerHTML = users.map(u => `<p>${u.name} - ${u.phone}</p>`).join("");
}

// Download VCF
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
