document.querySelectorAll(".tooltip").forEach((timeout) => {
  let cleanupTimer = null;

  timeout.addEventListener("mouseenter", () => {
    clearTimeout(cleanupTimer);

    const text = timeout.querySelector(".tooltiptext");
    if (!text) return;

    const triggerRect = timeout.getBoundingClientRect();
    const tooltipWidth = text.offsetWidth; // works since visibility:hidden keeps it in layout
    const pad = 8;

    const naturalLeft =
      triggerRect.left + triggerRect.width / 2 - tooltipWidth / 2;
    const naturalRight = naturalLeft + tooltipWidth;

    let shift = 0;
    if (naturalLeft < pad) {
      shift = pad - naturalLeft;
    } else if (naturalRight > window.innerWidth - pad) {
      shift = window.innerWidth - pad - naturalRight;
    }

    timeout.style.setProperty(
      "--tooltip-shift",
      `${Math.round(shift)}px`,
    );
  });

  timeout.addEventListener("mouseleave", () => {
    cleanupTimer = setTimeout(() => {
      timeout.style.removeProperty("--tooltip-shift");
    }, 600);
  });
});

const mobileDialog = document.querySelector("#mobile-dialog");

mobileDialog.addEventListener("click", (e) => {
  if (e.target === mobileDialog) {
    mobileDialog.close();
  }
});

function openMobileDialog() {
  mobileDialog.showModal();
}

function closeMobileDialog() {
  mobileDialog.close();
}

function setColorMode(mode) {
  document.documentElement.setAttribute("color-mode", mode);
  localStorage.setItem("color-mode", mode);

  const lightButton = document.querySelector(
    ".header__button.light-mode-only",
  );
  const darkButton = document.querySelector(
    ".header__button.dark-mode-only",
  );

  lightButton.classList.remove("slide-in");
  darkButton.classList.remove("slide-in");
}

function setSoundMode(mode) {
  document.documentElement.setAttribute("sound-mode", mode);
  localStorage.setItem("sound-mode", mode);

  const soundButton = document.querySelector(
    ".header__button.sound-on-only",
  );
  const mutedButton = document.querySelector(
    ".header__button.sound-muted-only",
  );

  soundButton.classList.remove("slide-in");
  mutedButton.classList.remove("slide-in");
}

const lightOnAudio = document.getElementById("sound-lighton");
function playLightOn() {
  if (document.documentElement.getAttribute("sound-mode") === "muted")
    return;

  lightOnAudio.currentTime = 0;
  lightOnAudio.play();
}

const lightOffAudio = document.getElementById("sound-lightoff");
function playLightOff() {
  if (document.documentElement.getAttribute("sound-mode") === "muted")
    return;

  lightOffAudio.currentTime = 0;
  lightOffAudio.play();
}
