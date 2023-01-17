import './style.css'
import '../lib/fullscreenchange';

const cellFullscreenElement = document.querySelector<HTMLTableCellElement>('#fullscreen-element')!;
const cellFullscreenBrowser = document.querySelector<HTMLTableCellElement>('#fullscreen-browser')!;

cellFullscreenElement.innerHTML = document.fullscreenElement
  ? document.fullscreenElement.tagName
  : "null";
cellFullscreenBrowser.innerHTML = document.fullscreenBrowser.toString();

document.addEventListener("fullscreenchange", e => {
  cellFullscreenElement.innerHTML = document.fullscreenElement
    ? document.fullscreenElement.tagName
    : "null";
  cellFullscreenBrowser.innerHTML = document.fullscreenBrowser.toString();

  console.debug("window", e.type, "event", '\n', 
    'timestamp:', Math.round(e.timeStamp * 1000) / 1000, '\n',
    "document.fullscreenElement:", document.fullscreenElement, '\n',
    "document.fullscreenBrowser:", document.fullscreenBrowser, '\n',
  );
})