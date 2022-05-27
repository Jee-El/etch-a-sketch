const body = document.querySelector(`body`);
const mainContainer = document.createElement(`div`);
mainContainer.classList.add(`main-container`);

const subContainer = document.createElement(`div`);
subContainer.classList.add(`sub-container`);

const sliderAndLabel = document.createElement(`div`);
sliderAndLabel.style.cssText = `
	align-items: center;
	display:flex;
	justify-content: space-between;
	margin-bottom: 1rem;
	width: 175px;
	`;

const slider = document.createElement(`input`);
slider.setAttribute(`id`, `slider`);
slider.setAttribute(`type`, `range`);
slider.setAttribute(`min`, `12`);
slider.setAttribute(`max`, `100`);
slider.setAttribute(`value`, `16`);

const sliderLabel = document.createElement(`label`);
sliderLabel.setAttribute(`for`, `slider`);
sliderLabel.style.marginTop = `-5px`;
sliderLabel.textContent = `${slider.value} x ${slider.value}`;

const gridAndButtons = document.createElement(`div`);
gridAndButtons.classList.add(`grid-and-buttons`);

const gridContainer = document.createElement(`div`);
gridContainer.classList.add(`grid-container`);

const buttons = document.createElement(`div`);
buttons.classList.add(`buttons`);

const colorPickersAndLabel = document.createElement(`div`);
colorPickersAndLabel.setAttribute(`class`, `color-picker-label`);
colorPickersAndLabel.style.cssText = `
	display: flex;
	justify-content: center;
	flex-flow: column nowrap;
	`;

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
colorPickerSwatch.setAttribute(`id`, `color-picker`);
colorPickerSwatch.style.marginBottom = `0px`;

const colorPickerSwatchLabel = document.createElement(`label`);
colorPickerSwatchLabel.setAttribute(`for`, `color-picker`);
colorPickerSwatchLabel.style.marginBottom = `0.5rem`;
colorPickerSwatchLabel.textContent = `Pick a color`;

const colorPickerHex = document.createElement(`input`);
colorPickerHex.setAttribute(`type`, `text`);
colorPickerHex.setAttribute(`value`, `#39B240`);
colorPickerHex.style.cssText = `
	background-color: #000;
	border: none;
	border-radius: 10px;
	color: #39B240;
	letter-spacing: 0.06rem;
	padding: 0.2rem 0.6rem;
	min-height: fit-content;
	max-width: calc(93px - 0.8rem);
	`;
colorPickerHex.setAttribute(`area-label`, `Pick a color in hex format`);

const draw = document.createElement(`button`);
draw.setAttribute(`type`, `button`);
draw.textContent = `Draw`;

const rainbowColorBtn = document.createElement(`button`);
rainbowColorBtn.setAttribute(`type`, `button`);
rainbowColorBtn.textContent = `rainbow`;

const gridLinesLabel = document.createElement(`label`);
gridLinesLabel.setAttribute(`for`, `grid-lines-toggle`);
gridLinesLabel.textContent = `Grid Lines`;

const gridLinesCheckbox = document.createElement(`input`);
gridLinesCheckbox.setAttribute(`type`, `checkbox`);
gridLinesCheckbox.setAttribute(`id`, `grid-lines-toggle`);
gridLinesCheckbox.textContent = `grid lines`;
gridLinesCheckbox.style.alignSelf = `flex-start`;

const gridLinesToggleSlider = document.createElement(`span`);

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
subContainer.appendChild(sliderAndLabel);
sliderAndLabel.appendChild(sliderLabel);
sliderAndLabel.appendChild(slider);
subContainer.appendChild(gridAndButtons);
gridAndButtons.appendChild(gridContainer);
gridAndButtons.appendChild(buttons);
buttons.appendChild(draw);
buttons.insertBefore(colorPickersAndLabel, draw);
colorPickersAndLabel.appendChild(colorPickerSwatchLabel);
colorPickersAndLabel.appendChild(colorPickers);
colorPickers.appendChild(colorPickerSwatch);
colorPickers.appendChild(colorPickerHex);
buttons.appendChild(rainbowColorBtn);
buttons.appendChild(eraserBtn);
buttons.appendChild(clearBtn);
subContainer.appendChild(gridLinesLabel);
gridLinesLabel.appendChild(gridLinesCheckbox);
gridLinesLabel.appendChild(gridLinesToggleSlider);
body.appendChild(footer);
footer.appendChild(footerText);
footerText.appendChild(githubIcon);

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
		grid[i].style.width =
			parseInt(
				window.getComputedStyle(gridContainer).getPropertyValue(`max-width`)
			) /
				slider.value +
			`px`;
		grid[i].style.height =
			parseInt(
				window.getComputedStyle(gridContainer).getPropertyValue(`max-height`)
			) /
				slider.value +
			`px`;
		gridContainer.appendChild(grid[i]);
	}
}
window.addEventListener(`load`, () => {
	makeGrid();
});
window.addEventListener(`resize`, () => {
	grid.forEach((gridPixel) => {
		gridPixel.style.width =
			parseInt(
				window.getComputedStyle(gridContainer).getPropertyValue(`max-width`)
			) /
				slider.value +
			`px`;
		gridPixel.style.height =
			parseInt(
				window.getComputedStyle(gridContainer).getPropertyValue(`max-height`)
			) /
				slider.value +
			`px`;
	});
});

// Change grid size based on the slider value
slider.addEventListener(`input`, () => {
	sliderLabel.textContent = `${slider.value} x ${slider.value}`;
	// Remove previously created grid elements
	grid = [];
	makeGrid(slider.value);
});

// Make input change the color, and vice versa
colorPickerHex.addEventListener(`change`, (e) => {
	let hexCode = e.target.value;
	if (!(hexCode.startsWith(`#`))) {
		hexCode = `#` + hexCode;
	}
	if (hexCode.length === 4) {
		hexCode = hexCode + hexCode.slice(1);
	}
	colorPickerHex.value = hexCode;
	colorPickerSwatch.value = hexCode;
});
colorPickerSwatch.addEventListener(`input`, ( )=> {
	colorPickerHex.style.color = colorPickerSwatch.value;
});

// Color the grid in green on first click
// Stop it on second click
function startColoringInGreen(e) {
	gridContainer.classList.toggle(`start-green-coloring`);
	if (!gridContainer.classList.contains(`start-green-coloring`)) {
		grid.forEach((gridPixel) => {
			gridPixel.removeEventListener(`mouseenter`, colorGridInGreen);
		});
		return;
	}
	e.target.style.backgroundColor = colorPickerSwatch.value;
	grid.forEach((gridPixel) => {
		gridPixel.addEventListener(`mouseenter`, colorGridInGreen);
	});
}
function colorGridInGreen(e) {
	e.target.style.backgroundColor = colorPickerSwatch.value;
}
// Stop coloring in any color other than green
function stopColoringInRainbow() {
	gridContainer.removeEventListener(`click`, startColoringInRainbow);
	grid.forEach((gridPixel) => {
		gridPixel.removeEventListener(`mouseenter`, colorGridInRainbow);
	});
	if (gridContainer.classList.contains(`start-green-coloring`)) {
		gridContainer.classList.toggle(`start-green-coloring`);
	}
	if (gridContainer.classList.toggle(`start-rainbow-coloring`)) {
		gridContainer.classList.toggle(`start-rainbow-coloring`);
	}
	gridContainer.addEventListener(`click`, startColoringInGreen);
}
draw.addEventListener(`click`, () => {
	stopErasing();
	stopColoringInRainbow();
});

// Color the grid in rainbow on first click
// Stop it on second click
function startColoringInRainbow(e) {
	gridContainer.classList.toggle(`start-rainbow-coloring`);
	if (!gridContainer.classList.contains(`start-rainbow-coloring`)) {
		grid.forEach((gridPixel) => {
			gridPixel.removeEventListener(`mouseenter`, colorGridInRainbow);
		});
		return;
	}
	e.target.style.backgroundColor = `rgb(${Math.floor(
		Math.random() * 255
	)}, 194, ${Math.floor(Math.random() * 255)})`;
	grid.forEach((gridPixel) => {
		gridPixel.addEventListener(`mouseenter`, colorGridInRainbow);
	});
}
function colorGridInRainbow(e) {
	e.target.style.backgroundColor = `rgb(${Math.floor(
		Math.random() * 255
	)}, 194, ${Math.floor(Math.random() * 255)})`;
}
// Stop coloring in any color other than rainbow
function stopColoringInGreen() {
	gridContainer.removeEventListener(`click`, startColoringInGreen);
	grid.forEach((gridPixel) => {
		gridPixel.removeEventListener(`mouseenter`, colorGridInGreen);
	});
	if (gridContainer.classList.contains(`start-green-coloring`)) {
		gridContainer.classList.toggle(`start-green-coloring`);
	}
	if (gridContainer.classList.contains(`start-rainbow-coloring`)) {
		gridContainer.classList.toggle(`start-rainbow-coloring`);
	}
	gridContainer.addEventListener(`click`, startColoringInRainbow);
}
rainbowColorBtn.addEventListener(`click`, () => {
	stopErasing();
	stopColoringInGreen();
});

// Toggle grid lines
// gridLinesBtn.addEventListener(`click`, () => {
// 	gridContainer.classList.toggle(`grid-border`);
// });

// Erase the color of a specific grid pixel
function startErasingGridPixelColor(e) {
	gridContainer.classList.toggle(`currently-erasing`);
	if (!gridContainer.classList.contains(`currently-erasing`)) {
		grid.forEach((gridPixel) => {
			gridPixel.removeEventListener(`mouseenter`, eraseGridPixelColor);
		});
		return;
	}
	e.target.style.backgroundColor = `#474B4F`;
	grid.forEach((gridPixel) => {
		gridPixel.addEventListener(`mouseenter`, eraseGridPixelColor);
	});
}
function eraseGridPixelColor(e) {
	e.target.style.backgroundColor = `#474B4F`;
}
function stopColoringAll() {
	gridContainer.removeEventListener(`click`, startColoringInGreen);
	grid.forEach((gridPixel) => {
		gridPixel.removeEventListener(`mouseenter`, colorGridInGreen);
	});
	gridContainer.removeEventListener(`click`, startColoringInRainbow);
	grid.forEach((gridPixel) => {
		gridPixel.removeEventListener(`mouseenter`, colorGridInRainbow);
	});
	grid.forEach((gridPixel) => {
		gridPixel.addEventListener(`click`, startErasingGridPixelColor);
	});
}
function stopErasing() {
	grid.forEach((gridPixel) => {
		gridPixel.removeEventListener(`click`, startErasingGridPixelColor);
	});
	grid.forEach((gridPixel) => {
		gridPixel.removeEventListener(`mouseenter`, eraseGridPixelColor);
	});
}
eraserBtn.addEventListener(`click`, stopColoringAll);

// Clear grid
clearBtn.addEventListener(`click`, () => {
	grid.forEach((gridPixel) => {
		gridPixel.style.backgroundColor = `#474B4F`;
		gridPixel.removeEventListener(`mouseenter`, colorGridInGreen);
		gridPixel.removeEventListener(`mouseenter`, colorGridInRainbow);
	});
	if (gridContainer.classList.contains(`start-green-coloring`)) {
		gridContainer.classList.toggle(`start-green-coloring`);
	}
	if (gridContainer.classList.toggle(`start-rainbow-coloring`)) {
		gridContainer.classList.toggle(`start-rainbow-coloring`);
	}
});
