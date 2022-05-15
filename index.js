const body = document.querySelector(`body`);
const mainContainer = document.createElement(`div`);
mainContainer.classList.add(`main-container`);

const slider = document.createElement(`input`);
slider.setAttribute(`id`, `slider`);
slider.setAttribute(`type`, `range`);
slider.setAttribute(`min`, `12`);
slider.setAttribute(`max`, `100`);
slider.setAttribute(`value`, `16`);

const sliderLabel = document.createElement(`label`);
sliderLabel.setAttribute(`for`, `slider`);
sliderLabel.textContent = slider.value;

const gridContainer = document.createElement(`div`);
gridContainer.classList.add(`grid-container`);

const buttons = document.createElement(`div`);
buttons.classList.add(`buttons`);

const drawBtn = document.createElement(`button`);
drawBtn.setAttribute(`type`, `button`);
drawBtn.textContent = `Draw`;

const gridLinesBtn = document.createElement(`button`);
gridLinesBtn.setAttribute(`type`, `button`);
gridLinesBtn.textContent = `grid lines`;

const eraserBtn = document.createElement(`button`);
eraserBtn.setAttribute(`type`, `button`);
eraserBtn.textContent = `eraser`;

const clearBtn = document.createElement(`button`);
clearBtn.setAttribute(`type`, `reset`);
clearBtn.textContent = `clear`;

// Insert elements into the DOM
body.appendChild(mainContainer);
mainContainer.appendChild(gridContainer);
mainContainer.insertBefore(sliderLabel, gridContainer);
mainContainer.insertBefore(slider, gridContainer);
mainContainer.appendChild(buttons);
buttons.appendChild(drawBtn);
buttons.appendChild(gridLinesBtn);
buttons.appendChild(eraserBtn);
buttons.appendChild(clearBtn);

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
		grid[i].style.cssText = `
            background-color: #474B4F;
        `;
		grid[i].style.width = 400 / slider.value + `px`;
		grid[i].style.height = 400 / slider.value + `px`;
		gridContainer.appendChild(grid[i]);
	}
}
makeGrid();

// Change grid size based on the slider value
slider.addEventListener(`input`, () => {
	sliderLabel.textContent = `${slider.value}`;
	// Remove previously created grid elements
	grid = [];
	makeGrid(slider.value);
});

// Color grid pixels on click/mouseEnter
function toggleColoring(e) {
	gridContainer.classList.toggle(`start-coloring`);
	if (!gridContainer.classList.contains(`start-coloring`)) {
		return stopColoringGrid();
	}
	e.target.style.backgroundColor = `#86C232`;
	grid.forEach((gridPixel) => {
		gridPixel.addEventListener(`mouseenter`, startColoringGrid);
	});
}

function startColoringGrid(e) {
	e.target.style.backgroundColor = `#86C232`;
}
function stopColoringGrid() {
	grid.forEach((gridPixel) => {
		gridPixel.removeEventListener(`mouseenter`, startColoringGrid);
	});
}

// Start coloring
drawBtn.addEventListener(`click`, () => {
	grid.forEach((gridPixel) => {
		gridPixel.removeEventListener(`mouseenter`, resetGridPixelColor);
	});
	gridContainer.addEventListener(`click`, toggleColoring);
})

// Toggle grid lines
gridLinesBtn.addEventListener(`click`, () => {
	gridContainer.classList.toggle(`grid-border`);
});

// Erase the color of a specific grid pixel
function resetGridPixelColor(e) {
	e.target.style.backgroundColor = `#474B4F`;
}
eraserBtn.addEventListener(`click`, () => {
	gridContainer.removeEventListener(`click`, toggleColoring);
	grid.forEach((gridPixel) => {
		gridPixel.addEventListener(`mouseenter`, resetGridPixelColor);
	});
});

// Clear grid
clearBtn.addEventListener(`click`, () => {
	grid.forEach((gridPixel) => {
		gridPixel.style.backgroundColor = `#474B4F`;
	});
	stopColoringGrid();
	gridContainer.classList.remove(`start-coloring`);
});