if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((reg) => console.log("SW is registered", reg))
    .catch((err) => console.warn("SW is not registered", err));
}


