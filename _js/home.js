const contactForm = document.getElementById("contact-form");
const sendButton = contactForm.querySelector("button[type='submit']");

contactForm.addEventListener("submit", async () => {
  sendButton.textContent = "Sending...";
  sendButton.disabled = true;
});
