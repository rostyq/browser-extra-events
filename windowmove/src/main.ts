import './style.css'
import '../lib/windowmove';

const x = document.querySelector<HTMLTableCellElement>('#screen-x')!;
const y = document.querySelector<HTMLTableCellElement>('#screen-y')!;

x.innerHTML = window.screenX.toString();
y.innerHTML = window.screenY.toString();

window.addEventListener("move", e => {
  x.innerHTML = window.screenX.toString();
  y.innerHTML = window.screenY.toString();

  console.debug("window", e.type, "event", '\n', 
    'timestamp:', Math.round(e.timeStamp * 1000) / 1000, '\n',
    "window.screenX:", screenX, '\n',
    "window.screenY:", screenY, '\n',
    "movementX:", e.detail.movementX, '\n',
    "movementY:", e.detail.movementY,
  );
})