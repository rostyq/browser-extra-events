import './style.css'
import '@browser-extra-events/zoomchange';
import '../lib/windowdisplace';

const x = document.querySelector<HTMLTableCellElement>('#window-x')!;
const y = document.querySelector<HTMLTableCellElement>('#window-y')!;

x.innerHTML = window.innerX.toString();
y.innerHTML = window.innerY.toString();

window.addEventListener("displace", e => {
  x.innerHTML = window.innerX.toString();
  y.innerHTML = window.innerY.toString();

  console.debug("window", e.type, "event", '\n', 
    'timestamp:', Math.round(e.timeStamp * 1000) / 1000, '\n',
    "window.innerX:", window.innerX, '\n',
    "window.innerY:", window.innerY, '\n',
    "displaceX:", e.detail.displaceX, '\n',
    "displaceY:", e.detail.displaceY,
  );
})