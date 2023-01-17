import extendEventTarget from "extend-event-target";

declare global {
  interface ScreenEventMap {
    "change": UIEvent
  }

  interface Screen {
    addEventListener<T extends keyof ScreenEventMap>(
      type: T,
      listener: (this: Screen, ev: UIEvent) => any,
    ): void;
    removeEventListener<T extends keyof ScreenEventMap>(
      type: T,
      listener: (this: Screen, ev: UIEvent) => any,
    ): void;
    dispatchEvent(event: Event): boolean;
  }

  interface Screen {
    onchange: ((this: Screen, ev: UIEvent) => any) | null;
    availLeft: number;
    availTop: number;
  }
}

if ("dispatchEvent" in screen === false) {
  extendEventTarget(screen);
}

if ("onchange" in screen === false) {
  let availLeft: number = screen.availLeft;
  let availTop: number = screen.availTop;
  let width: number = screen.width;
  let height: number = screen.height;
  let colorDepth: number = screen.colorDepth;
  let pixelDepth: number = screen.pixelDepth;

  let listener: typeof screen.onchange = null;

  const update = () => {
    if ((
        availTop != screen.availTop ||
        availLeft != screen.availLeft ||
        width != screen.width ||
        height != screen.height ||
        colorDepth != screen.colorDepth ||
        pixelDepth != screen.pixelDepth
      )) {
      availTop = screen.availTop;
      availLeft = screen.availLeft;
      width = screen.width;
      height = screen.height;
      colorDepth = screen.colorDepth;
      pixelDepth = screen.pixelDepth;

      screen.dispatchEvent(new Event("change"));
    }
    window.requestAnimationFrame(update);
  }

  Object.defineProperty(screen, "onchange", {
    get() {
      return listener;
    },
    set(value: typeof listener) {
      if (typeof value == "function") {
        listener && screen.removeEventListener("change", listener);
        listener = value;
        screen.addEventListener("change", listener);
      } else if (!value && listener) {
        screen.removeEventListener("change", listener);
        listener = null;
      }
    }
  });

  window.requestAnimationFrame(update);
}
