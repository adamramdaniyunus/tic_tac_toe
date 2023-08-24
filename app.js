const boardGame = document.getElementById('board');
const infoGame = document.getElementById('info');
const restart = document.getElementById('button');
const startCells = [
    "", "", "",
    "", "", "",
    "", "", ""
];

let go = "circle"
infoGame.textContent = "Circle go First!"

function createBoards() {
    // Membuat cell sebanyak 9 dari 0 - 8
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.id = index;
        cellElement.classList.add('square');
        // Nanti function addGo dipanggil disni
        cellElement.addEventListener('click', addGo);
        boardGame.append(cellElement); // nanti board bakalan di tambahin cell pake append function
    });
}

createBoards()

// Menambahkan Bulat dan Silang pada kotak yang diklik
function addGo(e) {
    const goDisplay = document.createElement('div');
    goDisplay.classList.add(go)
    e.target.append(goDisplay)
    go = go === "circle" ? "cross" : "circle"
    infoGame.textContent = "it is now " + go + " turnn!";
    // ini berfungsi agar nanti ketika kotak sudah ada isinya maka tidak akan ditimpa
    e.target.removeEventListener("click", addGo);
    // panggil function score
    checkScore()
}


function checkScore() {
    const allSquares = document.querySelectorAll(".square");
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    let hasWinner = false

    winningCombos.forEach(array => {
        const cirlceWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('circle'));
        const crossWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('cross'));
        if (cirlceWins) {
            infoGame.textContent = "Circle Wins!"
            hasWinner = true
            button.classList.add('show')
        } else if (crossWins) {
            infoGame.textContent = "Cross Wins!"
            hasWinner = true
            button.classList.add('show')
        }
    })

    if (!hasWinner && Array.from(allSquares).every(square => square.firstChild !== null)) {
        infoGame.textContent = "It's a Tie!";
        allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
        button.classList.add('show')
    }

}

function reload() {
    location.reload()
}
