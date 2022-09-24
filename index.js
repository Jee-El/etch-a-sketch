let isColoringInGreen = false;
let isColoringInRainbow = false;
let isErasing = false;
// #d4ffd8
const body = document.querySelector(`body`);
const mainContainer = document.createElement(`div`);
mainContainer.classList.add(`main-container`);

const subContainer = document.createElement(`div`);
subContainer.classList.add(`sub-container`);

const gridSizeSliderAndLabel = document.createElement(`div`);
gridSizeSliderAndLabel.classList.add(`grid-size`);

const gridSizeSlider = document.createElement(`input`);
gridSizeSlider.setAttribute(`id`, `slider`);
gridSizeSlider.setAttribute(`type`, `range`);
gridSizeSlider.setAttribute(`min`, `12`);
gridSizeSlider.setAttribute(`max`, `80`);
gridSizeSlider.setAttribute(`value`, `16`);

const gridSizeLabel = document.createElement(`label`);
gridSizeLabel.setAttribute(`for`, `slider`);
gridSizeLabel.style.marginBottom = `0.25rem`;
gridSizeLabel.textContent = `${gridSizeSlider.value} x ${gridSizeSlider.value}`;

const gridContainer = document.createElement(`div`);
gridContainer.classList.add(`grid-container`);

const gridLines = document.createElement(`div`);
gridLines.classList.add(`grid-lines`);

const gridLinesLabel = document.createElement(`label`);
gridLinesLabel.setAttribute(`for`, `grid-lines-input`);
gridLinesLabel.classList.add(`grid-lines-label`);
gridLinesLabel.textContent = `Grid Lines`;

const gridLinesInput = document.createElement(`input`);
gridLinesInput.setAttribute(`id`, `grid-lines-input`);
gridLinesInput.setAttribute(`type`, `checkbox`);

const gridLinesSlider = document.createElement(`span`);
gridLinesSlider.classList.add(`slider`);
const gridLinesCircle = document.createElement(`span`);
gridLinesCircle.classList.add(`circle`);

const inputAndButtons = document.createElement(`div`);
inputAndButtons.classList.add(`input-and-buttons`);

const colorPickersAndLabel = document.createElement(`div`);
colorPickersAndLabel.setAttribute(`class`, `color-pickers-and-label`);

const penColorPickerAndLabel = document.createElement('div');
penColorPickerAndLabel.setAttribute('class', 'pen-color-picker-and-label');

const penColorPicker = document.createElement(`input`);
penColorPicker.setAttribute(`type`, `color`);
penColorPicker.setAttribute(`value`, `#39B240`);
penColorPicker.setAttribute(`id`, `pen-swatch`);

const penColorPickerLabel = document.createElement(`label`);
penColorPickerLabel.setAttribute(`for`, `pen-swatch`);
penColorPickerLabel.textContent = `Pen Color`;
penColorPickerLabel.style.marginBottom = '0.25rem';

const backgroundColorPickerAndLabel = document.createElement('div');
backgroundColorPickerAndLabel.setAttribute(
  'class',
  'bg-color-picker-and-label'
);

const backgroundColorPicker = document.createElement(`input`);
backgroundColorPicker.setAttribute(`type`, `color`);
backgroundColorPicker.setAttribute(`value`, `#d4ffd8`);
backgroundColorPicker.setAttribute(`id`, `bg-swatch`);
backgroundColorPicker.style.marginBottom = `0px`;

const backgroundColorPickerLabel = document.createElement(`label`);
backgroundColorPickerLabel.setAttribute(`for`, `bg-swatch`);
backgroundColorPickerLabel.textContent = `Background Color`;
backgroundColorPickerLabel.style.marginBottom = '0.25rem';

const buttons = document.createElement(`div`);
buttons.classList.add(`buttons`);

const drawBtn = document.createElement(`button`);
drawBtn.setAttribute(`type`, `button`);
drawBtn.textContent = `Draw`;

const rainbowBtn = document.createElement(`button`);
rainbowBtn.setAttribute(`type`, `button`);
rainbowBtn.textContent = `rainbow`;

const eraserBtn = document.createElement(`button`);
eraserBtn.setAttribute(`type`, `button`);
eraserBtn.textContent = `eraser`;

const clearBtn = document.createElement(`button`);
clearBtn.setAttribute(`type`, `reset`);
clearBtn.textContent = `clear`;

const footer = document.createElement(`footer`);
footer.style.cssText = `
	align-items: center;
	display: flex;
	height: 44px;
	justify-content: center;
	box-shadow: 0 -0.5px 3px #39b240;
	`;
const footerText = document.createElement(`a`);
footerText.style.cssText = `
	color: #39b240;
	font-size: 0.72rem;
	font-weight: 500;
	letter-spacing: 0.1rem;
	text-decoration: none;
	text-transform: capitalize;
	`;
footerText.textContent = `by jee-el `;
footerText.href = `https://github.com/Jee-El/etch-a-sketch`;
const githubIcon = document.createElement(`i`);
githubIcon.classList.add(`icon-github`);
githubIcon.style.cssText = `
	color: #39b240;
	font-size: 0.9rem;
	`;

// Insert elements into the DOM
body.appendChild(mainContainer);
mainContainer.appendChild(subContainer);
subContainer.appendChild(gridSizeSliderAndLabel);
gridSizeSliderAndLabel.appendChild(gridSizeLabel);
gridSizeSliderAndLabel.appendChild(gridSizeSlider);
subContainer.appendChild(gridContainer);
subContainer.appendChild(gridLines);
gridLines.appendChild(gridLinesLabel);
gridLinesLabel.appendChild(gridLinesInput);
gridLinesLabel.appendChild(gridLinesSlider);
gridLinesSlider.appendChild(gridLinesCircle);
mainContainer.appendChild(inputAndButtons);
inputAndButtons.appendChild(colorPickersAndLabel);
colorPickersAndLabel.appendChild(penColorPickerAndLabel);
penColorPickerAndLabel.appendChild(penColorPickerLabel);
penColorPickerAndLabel.appendChild(penColorPicker);
colorPickersAndLabel.appendChild(backgroundColorPickerAndLabel);
backgroundColorPickerAndLabel.appendChild(backgroundColorPickerLabel);
backgroundColorPickerAndLabel.appendChild(backgroundColorPicker);
inputAndButtons.appendChild(buttons);
buttons.appendChild(drawBtn);
buttons.appendChild(rainbowBtn);
buttons.appendChild(eraserBtn);
buttons.appendChild(clearBtn);
body.appendChild(footer);
footer.appendChild(footerText);
footerText.appendChild(githubIcon);

// Tell the user which tool is currently in use
Array.from(buttons.children)
  .slice(0, -1)
  .forEach((button) => {
    button.addEventListener(`click`, (e) => {
      Array.from(buttons.children).forEach((button) =>
        button.classList.remove(`pressed`)
      );
      e.target.classList.add(`pressed`);
    });
  });

let max;
let grid = [];
function makeGrid(side = 16, color = backgroundColorPicker.value) {
  // Remove previous grid from the web page
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }

  // Make new grid elements
  for (let i = 1; i <= side * side; i++) {
    grid.push(document.createElement(`div`));
  }

  // Fit grid elements into the grid container
  for (let i = 0; i < grid.length; i++) {
    grid[i].style.backgroundColor = color;
    grid[i].style.width = max;
    grid[i].style.height = max;
    gridContainer.appendChild(grid[i]);
  }
}
window.addEventListener(`load`, () => {
  max =
    parseInt(
      window.getComputedStyle(gridContainer).getPropertyValue(`max-width`)
    ) /
      gridSizeSlider.value +
    `px`;
  makeGrid();
});
window.addEventListener(`resize`, () => {
  max =
    parseInt(
      window.getComputedStyle(gridContainer).getPropertyValue(`max-width`)
    ) /
      gridSizeSlider.value +
    `px`;
  for (let i = 0; i < grid.length; i++) {
    grid[i].style.width = max;
    grid[i].style.height = max;
  }
});

backgroundColorPicker.addEventListener('input', (e) => {
  grid = [];
  makeGrid(gridSizeSlider.value, e.target.value);
});

// Change grid size based on the slider value
gridSizeSlider.addEventListener(`input`, () => {
  gridSizeLabel.textContent = `${gridSizeSlider.value} x ${gridSizeSlider.value}`;
  // Remove previously created grid elements
  grid = [];
  max =
    parseInt(
      window.getComputedStyle(gridContainer).getPropertyValue(`max-width`)
    ) /
      gridSizeSlider.value +
    `px`;
  makeGrid(gridSizeSlider.value);
});

// Color the grid in green on first click
// Stop it on second click
function startColoringInGreen(e) {
  isColoringInGreen = !isColoringInGreen;
  if (!isColoringInGreen) {
    gridContainer.removeEventListener(`mouseover`, colorGridInGreen);
    return;
  }
  e.target.style.backgroundColor = penColorPicker.value;
  gridContainer.addEventListener(`mouseover`, colorGridInGreen);
}
function colorGridInGreen(e) {
  e.target.style.backgroundColor = penColorPicker.value;
}
// Stop coloring in any color other than green
function stopColoringInRainbow() {
  gridContainer.removeEventListener(`click`, startColoringInRainbow);
  gridContainer.removeEventListener(`mouseover`, colorGridInRainbow);
  if (isColoringInGreen) isColoringInGreen = false;
  if (isColoringInRainbow) isColoringInRainbow = false;
  gridContainer.addEventListener(`click`, startColoringInGreen);
}
drawBtn.addEventListener(`click`, (e) => {
  if (isErasing) stopErasing();
  stopColoringInRainbow();
});

// Color the grid in rainbow on first click
// Stop it on second click
function startColoringInRainbow(e) {
  isColoringInRainbow = !isColoringInRainbow;
  if (!isColoringInRainbow) {
    gridContainer.removeEventListener(`mouseover`, colorGridInRainbow);
    return;
  }
  e.target.style.backgroundColor = `rgb(${Math.floor(
    Math.random() * 255
  )}, 194, ${Math.floor(Math.random() * 255)})`;
  gridContainer.addEventListener(`mouseover`, colorGridInRainbow);
}
function colorGridInRainbow(e) {
  e.target.style.backgroundColor = `rgb(${Math.floor(
    Math.random() * 255
  )}, 194, ${Math.floor(Math.random() * 255)})`;
}
// Stop coloring in any color other than rainbow
function stopColoringInGreen() {
  gridContainer.removeEventListener(`click`, startColoringInGreen);
  gridContainer.removeEventListener(`mouseover`, colorGridInGreen);

  if (isColoringInGreen) isColoringInGreen = false;
  if (isColoringInRainbow) isColoringInRainbow = false;

  gridContainer.addEventListener(`click`, startColoringInRainbow);
}
rainbowBtn.addEventListener(`click`, () => {
  if (isErasing) stopErasing();
  stopColoringInGreen();
});

// Toggle grid lines
gridLinesInput.addEventListener(`change`, () => {
  gridContainer.classList.toggle(`grid-border`);
});

// Erase the color of a specific grid pixel
function startErasingGridPixelColor(e) {
  isErasing = !isErasing;
  if (!isErasing) {
    gridContainer.removeEventListener(`mouseover`, eraseGridPixelColor);
    return;
  }
  e.target.style.backgroundColor = backgroundColorPicker.value;
  gridContainer.addEventListener(`mouseover`, eraseGridPixelColor);
}
function eraseGridPixelColor(e) {
  e.target.style.backgroundColor = backgroundColorPicker.value;
}
function stopColoringAll() {
  gridContainer.removeEventListener(`click`, startColoringInGreen);
  gridContainer.removeEventListener(`mouseover`, colorGridInGreen);
  gridContainer.removeEventListener(`click`, startColoringInRainbow);
  gridContainer.removeEventListener(`mouseover`, colorGridInRainbow);
  gridContainer.addEventListener(`click`, startErasingGridPixelColor);
}
function stopErasing() {
  isErasing = false;
  gridContainer.removeEventListener(`click`, startErasingGridPixelColor);
  gridContainer.removeEventListener(`mouseover`, eraseGridPixelColor);
}
eraserBtn.addEventListener(`click`, stopColoringAll);

// Clear grid
clearBtn.addEventListener(`click`, () => {
  gridContainer.removeEventListener(`mouseover`, colorGridInGreen);
  gridContainer.removeEventListener(`mouseover`, colorGridInRainbow);
  grid.forEach(
    (gridPixel) =>
      (gridPixel.style.backgroundColor = backgroundColorPicker.value)
  );

  isColoringInGreen = false;
  isColoringInRainbow = false;
});
