import plaingDeskTemplate from '../templates/plaing-desk.hbs';
import refs from './refs';

const matrix = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, null];
let mixedCellsArr = [];
let emtyCellPosition = {};

//function
function shuffledCells(arr) {
  return arr.sort(function () {
    return Math.random() - 0.5;
  });
}

function createMixedCellsArray(cells) {
  const mix = shuffledCells(cells);

  const upper = mix.slice(0, 4);

  const middleUpper = mix.slice(4, 8);

  const middleBottom = mix.slice(8, 12);

  const bottom = mix.slice(12, 16);

  mixedCellsArr = [upper, middleUpper, middleBottom, bottom];
}

function createStartCellsMarkup(cells) {
  const markup = plaingDeskTemplate(cells);

  refs.cellsDesk.innerHTML = '';
  refs.cellsDesk.insertAdjacentHTML('beforeend', markup);
}

function createCellsMarkup(cellsArr) {
  refs.cellsDesk.innerHTML = '';
  for (let iY = 0; iY < 4; iY++) {
    for (let jX = 0; jX < 4; jX++) {
      // console.log(cellsArr[iY][jX]);

      if (cellsArr[iY][jX] == null) {
        emtyCellPosition.top = iY;
        emtyCellPosition.left = jX;
        // console.log(emtyCellPosition);
      }

      const markup = `<div draggable="true" class="cells__item js-cells__item--number-${cellsArr[iY][jX]}"><span class="cells__number">${cellsArr[iY][jX]}</span>
</div>`;
      refs.cellsDesk.insertAdjacentHTML('beforeend', markup);
    }
  }
}

function moveLeft(event) {
  console.log(emptyCellPosition.left);
  [
    mixedCellsArr[emptyCellPosition.top][emptyCellPosition.left],
    mixedCellsArr[emptyCellPosition.top][emptyCellPosition.left - 1],
  ] = [
    mixedCellsArr[emptyCellPosition.top][emptyCellPosition.left - 1],
    mixedCellsArr[emptyCellPosition.top][emptyCellPosition.left],
  ];
}

//handles
function handleMixBtn() {
  createMixedCellsArray(matrix);
  createCellsMarkup(mixedCellsArr);
}

//listener
refs.mixBtn.addEventListener('click', handleMixBtn);

window.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') {
    moveLeft();
  }
});

createStartCellsMarkup(matrix);
