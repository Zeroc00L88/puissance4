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
                displayContent(i, j, player);
                if (player == 1) {
                    playerSwitch = 2;
                } else {
                    playerSwitch = 1;
                }
                check(i, j, player);
                break;
            }
        } else if (array[i + 1][j] != 0 && e[j] == 0) {
            e[j] = player;
            displayContent(i, j, player);
            if (player == 1) {
                playerSwitch = 2;
            } else {
                playerSwitch = 1;
            }
            check(i, j, player);
            break;
        }
    }
}

function displayContent(i, j, player) {
    const row = document.querySelector(`#gridContainer > :nth-child(${i + 1})`);
    const cell = row.querySelector(`:nth-child(${j + 1})`);
    if (player == 1) {
        tokenAnimation(i, cell, redToken);
    } else if (player == 2) {
        tokenAnimation(i, cell, yellowToken);
    }
}

function tokenAnimation(rowIndex, cell, token) {
    const dropHeight = rowIndex * cell.clientHeight + cell.clientHeight;
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

function check(i, j, player) {
    let winLine = [];

    //Lines
    for (let index = 0; index < array[i].length; index++) {
        const e = array[i][index];
        if (e == player) {
            winLine.push([i, index]);
        } else {
            winLine = [];
        }
        if (winLine.length == 4) {
            return gameOver(winLine, player);
        }
    }
    winLine = [];

    //Cols
    for (let index = 0; index < array.length; index++) {
        const e = array[index][j];
        if (e == player) {
            winLine.push([index, j]);
        } else {
            winLine = [];
        }
        if (winLine.length == 4) {
            return gameOver(winLine, player);
        }
    }
    winLine = [];

    //Diag right
    let indexI = i;
    let indexJ = j;
    while (indexI < array.length - 1 && indexJ > 0) {
        indexI++;
        indexJ--;
    }

    while (indexI >= 0 && indexJ < array[i].length) {
        if (array[indexI][indexJ] == player) {
            winLine.push([indexI, indexJ]);
        } else {
            winLine = [];
        }
        if (winLine.length == 4) {
            return gameOver(winLine, player);
        }
        indexI--;
        indexJ++;
    }
    winLine = [];

    //Diag Left
    indexI = i;
    indexJ = j;
    while (indexI < array.length - 1 && indexJ < array[i].length) {
        indexI++;
        indexJ++;
    }
    while (indexI >= 0 && indexJ >= 0) {
        if (array[indexI][indexJ] == player) {
            winLine.push([indexI, indexJ]);
        } else {
            winLine = [];
        }
        if (winLine.length == 4) {
            return gameOver(winLine, player);
        }
        indexI--;
        indexJ--;
    }
}

function gameOver(line, player) {
    let winMsg = "";
    if (player == 1) {
        winMsg = "Red win !";
    } else {
        winMsg = "Yellow win !";
    }
    console.log(winMsg);
    document
        .querySelectorAll(".dropCell")
        .forEach((e) => (e.style.pointerEvents = "none"));
}

displayGrid();
