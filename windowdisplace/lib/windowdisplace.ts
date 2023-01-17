export type DisplaceEvent = CustomEvent<{ displaceX: number, displaceY: number }>;

declare global {
  interface Window {
    ondisplace: ((this: Window, ev: DisplaceEvent) => any) | null;
    innerX: number;
    innerY: number;
  }

  interface WindowEventMap {
    "displace": DisplaceEvent
  }
}

if ("ondisplace" in window === false) {
  let previousX: number = 0;
  let previousY: number = 80;

  let innerX: number = previousX;
  let innerY: number = document.fullscreenElement ? 0 : previousY;

  let listener: typeof window.ondisplace = null;
  const target = document.documentElement;

  const onmouseevent = (e: MouseEvent) => {
    if (e.isTrusted) {
      // NOTE: browser zoom should be 100%.

      // @ts-ignore
      const zoomRatio = window.zoomRatio || 1;

      const windowX = Math.max(e.screenX - window.screenX - (e.clientX * zoomRatio), 0);
      const windowY = Math.max(e.screenY - window.screenY - (e.clientY * zoomRatio), 0);
      update(windowX, windowY);
    }
  }

  const update = (x: number, y: number) => {
    const displaceX = x - (innerX as number);
    const displaceY = y - (innerY as number);

    if (Math.abs(displaceX) > 1 || Math.abs(displaceY) > 1) {
      previousX = innerX;
      previousY = innerY;

      innerX = x;
      innerY = y;

      window.dispatchEvent(new CustomEvent("displace", {
        detail: {
          displaceX,
          displaceY
        }
      }));
    }
  }

  Object.defineProperties(window, {
    ondisplace: {
      get() {
        return listener;
      },
      set(value: typeof listener) {
        if (typeof value == "function") {
          listener && window.removeEventListener("displace", listener);
          listener = value;
          window.addEventListener("displace", listener);
        } else if (!value && listener) {
          window.removeEventListener("displace", listener);
          listener = null;
        }
      }
    },
    innerX: {
      get() { return innerX }
    },
    innerY: {
      get() { return innerY }
    },
  });

  target.addEventListener("mousemove", onmouseevent, { once: true });
  target.addEventListener("mouseover", onmouseevent);

  window.addEventListener("resize", () => {
    if (window.outerWidth == window.innerWidth) {
      update(0, innerY);
    } else {
      target.addEventListener("mousemove", onmouseevent, { once: true });
    }
  });

  matchMedia("all and (display-mode: fullscreen)").addEventListener("change", e => {
    if (e.matches) {
      update(0, 0);
    } else {
      update(previousX, previousY);
    }
  })
}
