import './style.css'
import '../lib/screenchange';

const availLeftCell = document.querySelector<HTMLTableCellElement>('#avail-left')!;
const availTopCell = document.querySelector<HTMLTableCellElement>('#avail-top')!;
const widthCell = document.querySelector<HTMLTableCellElement>('#width')!;
const heightCell = document.querySelector<HTMLTableCellElement>('#height')!;
const pixelDepthCell = document.querySelector<HTMLTableCellElement>('#pixel-depth')!;
const colorDepthCell = document.querySelector<HTMLTableCellElement>('#color-depth')!;

const update = () => {
  availLeftCell.innerHTML = screen.availLeft.toString();
  availTopCell.innerHTML = screen.availTop.toString();
  widthCell.innerHTML = screen.width.toString();
  heightCell.innerHTML = screen.height.toString();
  pixelDepthCell.innerHTML = screen.pixelDepth.toString();
  colorDepthCell.innerHTML = screen.colorDepth.toString();
}

update();

screen.addEventListener("change", e => {
  update();

  console.debug("screen", e.type, "event", '\n', 
    'timestamp:', Math.round(e.timeStamp * 1000) / 1000, '\n',
    "screen:", screen,
  );
})