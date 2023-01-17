import './style.css'
import '../lib/zoomchange';

const cell = document.querySelector<HTMLTableCellElement>('#zoom')!;

cell.innerHTML = (window.zoomRatio * 100).toFixed(0);

window.addEventListener("zoom", e => {
  cell.innerHTML = (window.zoomRatio * 100).toFixed(0);

  console.debug("window", e.type, "event", '\n', 
    'timestamp:', Math.round(e.timeStamp * 1000) / 1000, '\n',
    "zoom:", e.detail.zoomRatio,
  );
})