export type MoveEvent = CustomEvent<{ movementX: number, movementY: number }>;

declare global {
  interface Window {
    onmove: ((this: GlobalEventHandlers, ev: MoveEvent) => any)
      & ((this: Window, ev: MoveEvent) => any) | null;
  }

  interface WindowEventMap {
    "move": MoveEvent
  }
}

if ("onmove" in window === false) {

  let screenX = window.screenX;
  let screenY = window.screenY;

  let listener: typeof window.onmove = null;

  const update = () => {
    const movementX = window.screenX - screenX;
    const movementY = window.screenY - screenY;

    if (movementX != 0 || movementY != 0) {
      screenX = window.screenX;
      screenY = window.screenY;

      const event = new CustomEvent("move", {
        detail: {
          movementX,
          movementY
        }
      });

      window.dispatchEvent(event);
    }
    window.requestAnimationFrame(update);
  }

  Object.defineProperty(window, "onmove", {
    get() {
      return listener;
    },
    set(value: typeof listener) {
      if (typeof value == "function") {
        listener && window.removeEventListener("move", listener);
        listener = value;
        window.addEventListener("move", listener);
      } else if (!value && listener) {
        window.removeEventListener("move", listener);
        listener = null;
      }
    }
  });
  window.requestAnimationFrame(update);
}
