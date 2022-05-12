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

body.appendChild(mainContainer);
mainContainer.appendChild(gridContainer);
mainContainer.insertBefore(sliderLabel, gridContainer);
mainContainer.insertBefore(slider, gridContainer);

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
            outline: 2px solid #6B6E70;
        `;
        grid[i].style.width = 400 / slider.value + `px`;
        grid[i].style.height = 400 / slider.value + `px`;
        gridContainer.appendChild(grid[i]);
    };
}
makeGrid();

// Change grid elements style on click & mouse enter
gridContainer.addEventListener(`click`, (e) => {
    e.target.style.backgroundColor = `#86C232`;
    grid.forEach((gridSquare) => {
        gridSquare.addEventListener(`mouseenter`, () => {
            gridSquare.style.backgroundColor = `#86C232`;
        })
    });
});

// Change grid elements amount based on the slider value
slider.addEventListener(`input`, () => {
    sliderLabel.textContent = `${slider.value}`;
    // Remove previously created grid elements
    grid = [];
    makeGrid(slider.value);
});
