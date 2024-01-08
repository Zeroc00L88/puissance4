// Array that define the map of the game
let array = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
];

let playerSwitch = 1; // Variable to chose player
let isGameOver = false; // Boolean game over

// Tokens properties :
const redToken = "./assets/images/red-token.png";
const yellowToken = "./assets/images/yellow-token.png";
const redTokenColor = "#FF3C2F";
const yellowTokenColor = "#FFD933";

// DOM queries
const gameContainer = document.querySelector("#gameContainer");
const main = document.querySelector("main");
const gameOverMenu = document.querySelector("#gameOver");
const menu = document.querySelector("#menu");
const pvpBtn = document.querySelector("#pvpBtn");
const pvcBtn = document.querySelector("#pvcBtn");

// Listeners
pvpBtn.addEventListener("click", () => {
    isGameOver = false;
    displayGrid("pvp");
    menu.classList.add("hidden");
});

pvcBtn.addEventListener("click", () => {
    isGameOver = false;
    displayGrid("pvc");
    menu.classList.add("hidden");
});

// Random Nbr generator
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Toggle player : change arrow indicator property
function playerToggle() {
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
}

// Displaying main game
function displayGrid(mode) {
    const dropLine = document.createElement("div");
    dropLine.id = "dropLine";
    main.prepend(dropLine);
    array[0].forEach((elmt, index) => {
        const dropCell = document.createElement("div");
        dropCell.classList.add("dropCell");
        dropLine.appendChild(dropCell);
        dropCell.addEventListener("click", () => {
            switch (mode) {
                case "pvp":
                    play(index, playerSwitch);
                    playerToggle();
                    break;
                case "pvc":
                    console.log("pvc");
                    play(index, playerSwitch);
                    playerToggle();
                    // Block player click during computer play
                    clickable(false);
                    if (!isGameOver) {
                        setTimeout(() => {
                            play(
                                getRandom(0, array[0].length - 1),
                                playerSwitch,
                            );
                            playerToggle();
                            // Unblock
                            clickable(true);
                        }, 1000);
                    }
                    break;
            }
        });
    });
    const gridContainer = document.createElement("div");
    gridContainer.id = "gridContainer";
    gameContainer.appendChild(gridContainer);
    array.forEach((e) => {
        const row = document.createElement("div");
        row.classList.add("row");
        gridContainer.appendChild(row);
        e.forEach(() => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            row.appendChild(cell);
        });
    });
}

function clickable(clickable) {
    if (clickable) {
        document
            .querySelectorAll(".dropCell")
            .forEach((e) => (e.style.pointerEvents = "auto"));
    } else {
        document
            .querySelectorAll(".dropCell")
            .forEach((e) => (e.style.pointerEvents = "none"));
    }
}

// Play function : chose the last free (0) from top to bottom
function play(j, player) {
    for (let i = array.length - 1; i >= 0; i--) {
        const e = array[i];
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
    }
}

// Refresh to display token (call tokenAnimate function)
function displayContent(i, j, player) {
    const row = document.querySelector(`#gridContainer > :nth-child(${i + 1})`);
    const cell = row.querySelector(`:nth-child(${j + 1})`);
    if (player == 1) {
        tokenAnimation(i, cell, redToken);
    } else if (player == 2) {
        tokenAnimation(i, cell, yellowToken);
    }
}

// Animate the token
function tokenAnimation(rowIndex, cell, token) {
    let dropHeight = rowIndex * cell.clientHeight + cell.clientHeight;
    let dropTime = dropHeight / 0.9; // this number set the speed (px/ms)
    dropHeight = "-" + dropHeight + "px";
    dropTime = dropTime + "ms";
    const img = document.createElement("img");
    cell.appendChild(img);
    img.src = token;
    img.style.width = "63px";
    document.documentElement.style.setProperty("--dropHeight", dropHeight);
    document.documentElement.style.setProperty("--dropTime", dropTime);
    img.classList.add("tokenAnim");
}

// Check for win on each turn
async function check(i, j, player) {
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
            return await gameOver(winLine, player);
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
            return await gameOver(winLine, player);
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
            return await gameOver(winLine, player);
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
            return await gameOver(winLine, player);
        }
        indexI--;
        indexJ--;
    }

    // draw match
    if (!array.some((e) => e.includes(0))) {
        await gameOver(null, player);
        return true;
    }
}

// gameOver function : display which color win dans reset game variables.
async function gameOver(line, player) {
    isGameOver = true;
    playerSwitch = 1;
    let winMsg = "";
    if (player == 1 && line != null) {
        winMsg = "Red win !";
    } else if (player == 2 && line != null) {
        winMsg = "Yellow win !";
    } else {
        winMsg = "Draw !";
    }
    gameOverMenu.classList.remove("hidden");
    gameOverMenu.querySelector("p").innerHTML = winMsg;
    document.querySelector("#replay").addEventListener("click", () => {
        document.querySelector("#dropLine").remove();
        document.querySelector("#gridContainer").remove();
        gameOverMenu.classList.add("hidden");
        menu.classList.remove("hidden");
        array.map((e) => {
            e.fill(0);
        });
    });
    for (let i = 0; i < line.length; i++) {
        const e = line[i];
        const row = document.querySelector(
            `#gridContainer > :nth-child(${e[0] + 1})`,
        );
        const cellImage = row.querySelector(`:nth-child(${e[1] + 1}) > img`);
        await sleep(0.125);
        cellImage.classList.remove("tokenAnim");
        cellImage.classList.add("bright");
    }
}
async function sleep(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}
