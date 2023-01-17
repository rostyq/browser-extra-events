export type ZoomEvent = CustomEvent<{ zoomRatio: number }>;

declare global {
  interface Window {
    onzoom: ((this: GlobalEventHandlers, ev: ZoomEvent) => any)
      & ((this: Window, ev: ZoomEvent) => any) | null;
    defaultDevicePixelRatio: number;
    zoomRatio: number;
  }

  interface WindowEventMap {
    "zoom": ZoomEvent
  }
}

if ("onzoom" in window === false) {
  // @ts-ignore
  let availLeft: number = screen.availLeft;
  // @ts-ignore
  let availTop: number = screen.availTop;
  let width: number = screen.width;
  let height: number = screen.height;
  let colorDepth: number = screen.colorDepth;
  let pixelDepth: number = screen.pixelDepth;

  // @ts-ignore
  const getScreenId = () => btoa([availLeft, availTop, width, height, colorDepth, pixelDepth]);

  let ID = getScreenId();

  // assuming page was loaded with 100% browser zoom
  let defaultDevicePixelRatio: number = parseFloat(localStorage.getItem(ID) as string) || window.devicePixelRatio;
  let zoomRatio = window.devicePixelRatio / defaultDevicePixelRatio;

  if (!localStorage.getItem(ID)) localStorage.setItem(ID, window.devicePixelRatio.toString());

  let listener: typeof window.onzoom = null;

  const update = () => {
    // Need to check that `devicePixelRatio` change wasn't caused by
    // moving to another screen with different DPI.
    if ((
      // @ts-ignore
      availTop == screen.availTop &&
      // @ts-ignore
      availLeft == screen.availLeft &&
      width == screen.width &&
      height == screen.height &&
      colorDepth == screen.colorDepth &&
      pixelDepth == screen.pixelDepth
    )) {
      zoomRatio = defaultDevicePixelRatio == 1
        ? window.devicePixelRatio
        : window.devicePixelRatio / defaultDevicePixelRatio;
      window.dispatchEvent(new CustomEvent("zoom", { detail: { zoomRatio } }));
    } else {
      // @ts-ignore
      availTop = screen.availTop;
      // @ts-ignore
      availLeft = screen.availLeft;
      width = screen.width;
      height = screen.height;
      colorDepth = screen.colorDepth;
      pixelDepth = screen.pixelDepth;
      defaultDevicePixelRatio = devicePixelRatio / zoomRatio;
      ID = getScreenId();
      localStorage.setItem(ID, defaultDevicePixelRatio.toString());
    }
    matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`)
      .addEventListener("change", update, { once: true });
  }

  Object.defineProperties(window, {
    onzoom: {
      get() {
        return listener;
      },
      set(value: typeof listener) {
        if (typeof value == "function") {
          listener && window.removeEventListener("zoom", listener);
          listener = value;
          window.addEventListener("zoom", listener);
        } else if (!value && listener) {
          window.removeEventListener("zoom", listener);
          listener = null;
        }
      }
    },
    defaultDevicePixelRatio: {
      get() {
        return defaultDevicePixelRatio;
      },
      set(value: number) {
        if (typeof value === "number") {
          defaultDevicePixelRatio = value;
          localStorage.setItem(ID, value.toString());
          zoomRatio = value == 1 ? window.devicePixelRatio : window.devicePixelRatio / value;
        }
      }
    },
    zoomRatio: {
      get() {
        return zoomRatio;
      },
    }
  })

  update();
}