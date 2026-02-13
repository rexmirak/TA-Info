const profileCard = document.getElementById("profileCard");
const sparkleLayer = document.getElementById("sparkleLayer");
const copyEmailBtn = document.getElementById("copyEmailBtn");
const statusLine = document.getElementById("statusLine");

const taEmail = "karim.abdel-aziz@guc.edu.eg";
const sparkleCount = 20;

function createSparkles() {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < sparkleCount; i += 1) {
    const sparkle = document.createElement("span");
    sparkle.className = "sparkle";
    moveSparkle(sparkle);
    fragment.appendChild(sparkle);
  }

  sparkleLayer.appendChild(fragment);
}

function moveSparkle(sparkle) {
  sparkle.style.left = `${Math.random() * 100}%`;
  sparkle.style.top = `${Math.random() * 100}%`;
  sparkle.style.setProperty("--size", `${3 + Math.random() * 7}px`);
  sparkle.style.setProperty("--delay", `${Math.random() * 2.5}s`);
}

function updateCardTilt(event) {
  const rect = profileCard.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateY = ((x - centerX) / centerX) * 6;
  const rotateX = -((y - centerY) / centerY) * 6;

  profileCard.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
  profileCard.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
  profileCard.style.setProperty("--my", `${(y / rect.height) * 100}%`);
}

function resetCardTilt() {
  profileCard.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  profileCard.style.setProperty("--mx", "50%");
  profileCard.style.setProperty("--my", "50%");
}

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(taEmail);
    statusLine.textContent = "Email copied to clipboard.";
  } catch {
    statusLine.textContent = `Copy failed. Please copy manually: ${taEmail}`;
  }

  setTimeout(() => {
    statusLine.textContent = "";
  }, 2200);
}

profileCard.addEventListener("mousemove", updateCardTilt);
profileCard.addEventListener("mouseleave", resetCardTilt);
copyEmailBtn.addEventListener("click", copyEmail);

createSparkles();
setInterval(() => {
  document.querySelectorAll(".sparkle").forEach(moveSparkle);
}, 1900);
