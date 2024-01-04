let array = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
];

let playerSwitch = true;
let cellH;
const redToken = "./assets/images/red-token.png";
const yellowToken = "./assets/images/yellow-token.png";

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
            });
        });
    });
}

function pvpPlay(j) {
    array.forEach((e, i) => {
        if (i == array.length - 1) {
            e[j] = 1;
            displayContent(i);
        } else if (array[i + 1][j] != 0) {
            e[j] = 1;
            displayContent(i);
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
            if (el == 1 && cell.innerHTML == "") {
                insertToken(i, cell, redToken);
            } else if (el == 2) {
                insertToken(i, cell, yellowToken);
            }
        });
    });
}

function insertToken(rowIndex, cell, token) {
    const dropHeight = rowIndex * cell.clientHeight;
    const dropTime = dropHeight / 0.9; // this number set the speed (px/ms)
    const img = document.createElement("img");
    img.src = token;
    img.style.width = "63px";
    img.style.transform = `translateY(-${dropHeight}px)`;
    setTimeout(() => {
        img.style.transition = `transform ${dropTime}ms ease-in`;
        img.style.transform = "translateY(0)";
    }, 50);
    cell.appendChild(img);
}

displayGrid();
