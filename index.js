let isColoringInGreen = false;
let isColoringInRainbow = false;
let isErasing = false;

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
gridContainer.classList.add(`grid-container`, `grid-border`);

const gridLines = document.createElement(`div`);
gridLines.classList.add(`grid-lines`);

const gridLinesLabel = document.createElement(`label`);
gridLinesLabel.setAttribute(`for`, `grid-lines-input`);
gridLinesLabel.classList.add(`grid-lines-label`);
gridLinesLabel.textContent = `Grid Lines`;

const gridLinesInput = document.createElement(`input`);
gridLinesInput.setAttribute(`id`, `grid-lines-input`);
gridLinesInput.setAttribute(`type`, `checkbox`);
gridLinesInput.setAttribute(`checked`, `true`);

const gridLinesSlider = document.createElement(`span`);
gridLinesSlider.classList.add(`slider`);
const gridLinesCircle = document.createElement(`span`);
gridLinesCircle.classList.add(`circle`);

const inputAndButtons = document.createElement(`div`);
inputAndButtons.classList.add(`input-and-buttons`);

const colorPickersAndLabel = document.createElement(`div`);
colorPickersAndLabel.setAttribute(`class`, `color-pickers-and-label`);

const colorPickers = document.createElement(`div`);
colorPickers.style.cssText = `
	align-items: center;
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	width: 130px;
	`;

const colorPickerSwatch = document.createElement(`input`);
colorPickerSwatch.setAttribute(`type`, `color`);
colorPickerSwatch.setAttribute(`value`, `#39B240`);
colorPickerSwatch.setAttribute(`id`, `swatch`);
colorPickerSwatch.style.marginBottom = `0px`;

const colorPickerSwatchLabel = document.createElement(`label`);
colorPickerSwatchLabel.setAttribute(`for`, `swatch`);
colorPickerSwatchLabel.textContent = `Pick a color`;

const colorPickerHex = document.createElement(`input`);
colorPickerHex.setAttribute(`type`, `text`);
colorPickerHex.setAttribute(`maxlength`, `7`);
colorPickerHex.setAttribute(`value`, `#39B240`);
colorPickerHex.setAttribute(`spellcheck`, `false`);
colorPickerHex.style.cssText = `
	background-color: rgba(0, 0, 0, 0.5);
	border: none;
	border-radius: 2px;
	color: #39B240;
	font-size: 0.75rem;
	font-weight: 400;
	letter-spacing: 0.08rem;
	padding: 0.2rem 0.6rem;
	min-height: fit-content;
	max-width: calc(93px - 0.6rem);
	text-align: center;
	`;
colorPickerHex.setAttribute(`area-label`, `Pick a color in hex format`);

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
colorPickersAndLabel.appendChild(colorPickerSwatchLabel);
colorPickersAndLabel.appendChild(colorPickers);
colorPickers.appendChild(colorPickerSwatch);
colorPickers.appendChild(colorPickerHex);
inputAndButtons.appendChild(buttons);
buttons.appendChild(drawBtn);
buttons.appendChild(rainbowBtn);
buttons.appendChild(eraserBtn);
buttons.appendChild(clearBtn);
body.appendChild(footer);
footer.appendChild(footerText);
footerText.appendChild(githubIcon);

// Tell the user which tool is currently in use
let x = document.querySelectorAll(`.buttons > button`);
x.forEach((button) => {
	button.addEventListener(`click`, (e) => {
		x.forEach((button) => button.classList.remove(`pressed`));
		e.target.classList.add(`pressed`);
	});
});

let max;
let grid = [];
function makeGrid(side = 16) {
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
		grid[i].style.backgroundColor = `#474B4F`;
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

// Make input change the color, and vice versa
colorPickerHex.addEventListener(`change`, (e) => {
	let hexCode = e.target.value;
	if (!hexCode.startsWith(`#`)) {
		hexCode = `#` + hexCode;
	}
	if (hexCode.length === 4) {
		hexCode = hexCode + hexCode.slice(1);
	}
	colorPickerHex.value = hexCode;
	colorPickerHex.style.color = hexCode;
	colorPickerSwatch.value = hexCode;
});
colorPickerSwatch.addEventListener(`input`, () => {
	colorPickerHex.style.color = colorPickerSwatch.value;
	colorPickerHex.value = colorPickerSwatch.value.toUpperCase();
});

// Color the grid in green on first click
// Stop it on second click
function startColoringInGreen(e) {
	isColoringInGreen = !isColoringInGreen;
	if (!isColoringInGreen) {
		gridContainer.removeEventListener(`mouseover`, colorGridInGreen);
		return;
	}
	e.target.style.backgroundColor = colorPickerSwatch.value;
	gridContainer.addEventListener(`mouseover`, colorGridInGreen);
}
function colorGridInGreen(e) {
	e.target.style.backgroundColor = colorPickerSwatch.value;
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
	e.target.style.backgroundColor = `#474B4F`;
	gridContainer.addEventListener(`mouseover`, eraseGridPixelColor);
}
function eraseGridPixelColor(e) {
	e.target.style.backgroundColor = `#474B4F`;
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
	grid.forEach((gridPixel) => (gridPixel.style.backgroundColor = `#474B4F`));

	isColoringInGreen = false;
	isColoringInRainbow = false;
});
