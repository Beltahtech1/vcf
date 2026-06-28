let registered = 0;
const target = 1000;
const users = new Set();

function updateStats() {
  document.getElementById("registered").textContent = registered;
  document.getElementById("remaining").textContent = target - registered;
  document.getElementById("progress").style.width = (registered / target * 100) + "%";

  if (registered >= target) {
    const btn = document.getElementById("downloadBtn");
    btn.disabled = false;
    btn.textContent = "Download VCF";
    btn.onclick = downloadVCF;
  }
}

function registerUser(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (users.has(phone)) {
    alert("This number is already registered!");
    return;
  }

  users.add(phone);
  registered++;
  updateStats();

  document.getElementById("success").innerHTML = `
    ✅ Registration successful! <br>
    <a href="https://chat.whatsapp.com/example" target="_blank">Join WhatsApp Public Group</a>
  `;
}

function showCountries(region) {
  const list = document.getElementById("country-list");
  list.innerHTML = `<p>Showing ${region} countries (demo)...</p>`;
}

function showContacts() {
  const list = document.getElementById("contacts-list");
  list.innerHTML = Array.from(users).map(u => `<p>${u}</p>`).join("");
}

function downloadVCF() {
  let vcf = "BEGIN:VCARD\nVERSION:3.0\n";
  users.forEach(phone => {
    vcf += `FN:Verified User\nTEL:${phone}\nEND:VCARD\nBEGIN:VCARD\nVERSION:3.0\n`;
  });
  const blob = new Blob([vcf], { type: "text/vcard" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "vcf-gains.vcf";
  link.click();
}
