export {}

declare global {
  interface Document {
    fullscreenBrowser: boolean;
  }
}

if ("fullscreenBrowser" in document === false) {
  const query = matchMedia("all and (display-mode: fullscreen)");
  let browserIsFullscreen = query.matches;

  Object.defineProperty(document, "fullscreenBrowser", {
    get() {
      return browserIsFullscreen;
    }
  })

  query.addEventListener("change", e => {
    if ((e.matches != Boolean(document.fullscreenElement)) || browserIsFullscreen) {
      browserIsFullscreen = e.matches;
      document.dispatchEvent(new Event("fullscreenchange"));
    }
  })
}