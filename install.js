(() => {
  const button = document.getElementById('vnInstallAppBtn');
  if (!button) return;
  let deferredPrompt = null;
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

  if (isStandalone) {
    button.hidden = false;
    button.innerHTML = '<i class="fa-solid fa-check"></i><span>App Installed</span>';
    button.disabled = true;
    button.setAttribute('aria-label', 'Vidya Nirman is installed');
    return;
  }

  // On iOS Safari, installation is done through Share > Add to Home Screen.
  if (isIOS) {
    button.hidden = false;
    button.addEventListener('click', () => {
      alert('Vidya Nirman install karne ke liye Safari ke Share button par tap karein, phir “Add to Home Screen” choose karein.');
    });
    return;
  }

  // Chromium browsers fire this only when installation criteria are met.
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    button.hidden = false;
  });

  button.addEventListener('click', async () => {
    if (!deferredPrompt) {
      alert('Install option browser ke menu mein bhi mil sakta hai: Chrome ke ⋮ menu > Cast, save and share (ya More tools) > Install page as app. Agar option nahi dikhe, website ko HTTPS par kholein aur page reload karein.');
      return;
    }
    deferredPrompt.prompt();
    try { await deferredPrompt.userChoice; } catch (_) {}
    deferredPrompt = null;
    button.hidden = true;
  });

  window.addEventListener('appinstalled', () => {
    button.hidden = false;
    button.innerHTML = '<i class="fa-solid fa-check"></i><span>App Installed</span>';
    button.disabled = true;
  });
})();