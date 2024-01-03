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
                displayContent();
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

function displayContent() {
    array.forEach((e, i) => {
        i++;
        const row = document.querySelector(`#gridContainer > :nth-child(${i})`);
        e.forEach((el, j) => {
            j++;
            const cell = row.querySelector(`:nth-child(${j})`);
            if (el == 1) {
                cell.innerHTML = "";
                const img = document.createElement("img");
                img.src = "./assets/images/red-token.png";
                img.style.width = "63px";
                cell.appendChild(img);
            }
        });
    });
}

displayGrid();
