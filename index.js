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

const button = document.createElement(`button`);
button.textContent = `grid lines`;

// Insert elements into the DOM
body.appendChild(mainContainer);
mainContainer.appendChild(gridContainer);
mainContainer.insertBefore(sliderLabel, gridContainer);
mainContainer.insertBefore(slider, gridContainer);
mainContainer.appendChild(button);

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

gridContainer.addEventListener(`click`, (e) => {
	gridContainer.classList.toggle(`start-coloring`);
	if (!gridContainer.classList.contains(`start-coloring`)) {
		return stopColoringGrid();
	}
	e.target.style.backgroundColor = `#86C232`;
	grid.forEach((gridSquare) => {
		gridSquare.addEventListener(`mouseenter`, startColoringGrid);
	});
});

function startColoringGrid(e) {
	e.target.style.backgroundColor = `#86C232`;
}
function stopColoringGrid() {
	grid.forEach((gridSquare) => {
		gridSquare.removeEventListener(`mouseenter`, startColoringGrid);
	});
}

button.addEventListener(`click`, () => {
	grid.forEach((gridSquare) => {
		gridSquare.classList.toggle(`grid-border`);
	})
});