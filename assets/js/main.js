let array = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
];

let playerSwitch = 1;
let cellH;
const redToken = "./assets/images/red-token.png";
const yellowToken = "./assets/images/yellow-token.png";
const redTokenColor = "#FF3C2F";
const yellowTokenColor = "#FFD933";

const gameContainer = document.querySelector("#gameContainer");
const main = document.querySelector("main");

function displayGrid() {
    const dropLine = document.createElement("div");
    dropLine.id = "dropLine";
    main.prepend(dropLine);
    array[0].forEach((elmt, index) => {
        const dropCell = document.createElement("div");
        dropCell.classList.add("dropCell");
        dropLine.appendChild(dropCell);
        dropCell.addEventListener("click", () => {
            pvpPlay(index, playerSwitch);
            if (playerSwitch == 1) {
                document.documentElement.style.setProperty(
                    "--indicatorColor",
                    redTokenColor,
                );
            } else {
                document.documentElement.style.setProperty(
                    "--indicatorColor",
                    yellowTokenColor,
                );
            }
        });
    });
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
        });
    });
}

function pvpPlay(j, player) {
    for (let i = array.length - 1; i >= 0; i--) {
        const e = array[i];
        if (i == array.length - 1) {
            if (e[j] == 0) {
                e[j] = player;
                displayContent();
                if (player == 1) {
                    playerSwitch = 2;
                } else {
                    playerSwitch = 1;
                }
                break;
            }
        } else if (array[i + 1][j] != 0 && e[j] == 0) {
            e[j] = player;
            displayContent();
            if (player == 1) {
                playerSwitch = 2;
            } else {
                playerSwitch = 1;
            }
            break;
        }
    }
}

function displayContent() {
    array.forEach((e, i) => {
        i++;
        const row = document.querySelector(`#gridContainer > :nth-child(${i})`);
        e.forEach((el, j) => {
            j++;
            const cell = row.querySelector(`:nth-child(${j})`);
            if (el == 1 && cell.innerHTML == "") {
                tokenAnimation(i, cell, redToken);
            } else if (el == 2 && cell.innerHTML == "") {
                tokenAnimation(i, cell, yellowToken);
            }
        });
    });
}

function tokenAnimation(rowIndex, cell, token) {
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

function check(i, j) {
    //Lines
    console.log("i :", i, "j :", j);
    //Cols
    //Diags
}

displayGrid();
