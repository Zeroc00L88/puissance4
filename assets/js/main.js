let array = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
];

const gameContainer = document.querySelector("#gameContainer");

function displayGrid() {
    const gridContainer = document.createElement("div");
    gridContainer.id = "gridContainer";
    gameContainer.appendChild(gridContainer);
    array.forEach((e, i) => {
        const row = document.createElement("div");
        row.classList.add("row");
        gridContainer.appendChild(row);
        e.forEach((el, j) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            row.appendChild(cell);
            cell.addEventListener("click", () => {
                pvpPlay(j);
                console.log(array);
            });
        });
    });
}

function pvpPlay(j) {
    array.forEach((e, i) => {
        if (i == array.length - 1) {
            e[j] = 1;
        } else if (array[i + 1][j] != 0) {
            e[j] = 1;
        }
    });
}

displayGrid();

const cells = document.querySelectorAll(".cell");
cells.forEach((element) => {
    const redToken = document.createElement("img");
    redToken.src = "./assets/images/red-token.png";
    redToken.style.width = "63px";
    element.appendChild(redToken);
});
