let deferredPrompt;

const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  installBtn.hidden = false;
  console.log("PWA install prompt is ready");
});

installBtn.addEventListener("click", async () => {
  if (!deferredPrompt) {
    return;
  }

  deferredPrompt.prompt();

  const { outcome } = await deferredPrompt.userChoice;
  console.log(`User response: ${outcome}`);

  deferredPrompt = null;
  installBtn.hidden = true;
});

window.addEventListener("appinstalled", () => {
  console.log("PWA was installed!");
  installBtn.hidden = true;
});
