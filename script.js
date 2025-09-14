const gridContainer = document.getElementById("grid-container");
const setGridButton = document.getElementById("set-grid");
const clearGridButton = document.getElementById("clear-grid");
const toggleModeButton = document.getElementById("toggle-mode");
const gridSizeInput = document.getElementById("grid-size");
const eraserButton = document.getElementById("eraser");
const colorModeButton = document.getElementById("color-mode");
const colorPicker = document.getElementById("color-picker");
const rainbowModeCheckbox = document.getElementById("rainbow-mode");
const showGridCheckbox = document.getElementById("show-grid");

let selectedColor = colorPicker.value;
let currentMode = "color"; // "color" or "eraser"
let isDrawing = false;

function createGrid(size) {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size*size; i++) {
        const box = document.createElement("div");
        box.classList.add("box");
        if (showGridCheckbox.checked) {
            box.style.border = "1px solid #c0b0b0";
        }
        gridContainer.appendChild(box);
    }
    currentMode = "color";
    enableDrawing(); // Attach listeners to new boxes
}

function enableDrawing() {
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
        box.onmousedown = () => {
            isDrawing = true;
            box.style.backgroundColor = currentMode === "color" ? selectedColor || `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})` : "";
        };
        box.onmouseover = () => {
            if (isDrawing) {
                box.style.backgroundColor = currentMode === "color" ? selectedColor || `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})` : "";
            }
        };
        box.onmouseup = () => {
            isDrawing = false;
        };
    });
}

// Set grid
setGridButton.addEventListener("click", () => {
    const size = parseInt(gridSizeInput.value);
    if (size > 0 && size <= 100) {
        createGrid(size);
    } else {
        alert("Please enter a size between 1 and 100.");
    }
});

// Clear grid
clearGridButton.addEventListener("click", () => {
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => box.style.backgroundColor = "");
    currentMode = "color";
});

// Eraser
eraserButton.addEventListener("click", () => {
    currentMode = "eraser";
});
// Color mode
colorModeButton.addEventListener("click", () => {
    currentMode = "color";
});
// Color picker
["mousedown", "input"].forEach(event =>
    colorPicker.addEventListener(event, () => {
        selectedColor = colorPicker.value;
        currentMode = "color";
    })
);


// Show/hide grid
showGridCheckbox.addEventListener("change", () => {
    const boxes = document.querySelectorAll(".box");
    if (!showGridCheckbox.checked) {
        boxes.forEach(box => box.style.border = "none");
    } else {
        boxes.forEach(box => box.style.border = "1px solid #c0b0b0");
    }
});

rainbowModeCheckbox.addEventListener("change", () => {
    if (rainbowModeCheckbox.checked) {
        colorPicker.disabled = true;
        selectedColor = null;
    } else {
        colorPicker.disabled = false;
    }
});

// Initialize default grid
createGrid(16);
