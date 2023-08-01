'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPERFOOD = '🍟'
const CHERRY = '🍒'
const gEmptyCells = []
var gIntervalCherry



var gGame = {
    score: 0,
    isOn: false
}
var gBoard

function init() {
    // console.log('hello')
    const elVictory = document.querySelector('.victory')
    elVictory.style.display = 'none'
    const elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
    
    gGame.score = 0
    updateScore(0)

    gBoard = buildBoard()

    createPacman(gBoard)
    createGhosts(gBoard)
    renderBoard(gBoard, '.board-container')
    

   gIntervalCherry = setInterval(addCherry, 15000)
    gGame.isOn = true
}


function buildBoard() {
    const SIZE = 10
    const board = []

    for (var i = 0; i < SIZE; i++) {
        board.push([])

        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL
            }

            if (i === 1 && j === 1 || i === 1 && j === SIZE - 2 ||
                i === SIZE - 2 && j === 1 || i === SIZE - 2 && j === SIZE - 2) {
                board[i][j] = SUPERFOOD

            }
        }
    }
    return board
}


function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    const elModal = document.querySelector('.modal')
    elModal.style.display = 'block'
    console.log('Game Over')
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    clearInterval (gIntervalCherry)
}

function victory() {
    const elVictory = document.querySelector('.victory')
    elVictory.style.display = 'block'
    console.log('You Won')
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    clearInterval (gIntervalCherry)
}


function checkIfFood() {
    for (var i = 0; i < gBoard.length; i++) {
        console.log(gBoard.length);
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] === FOOD) return true
        }
    }
    return false
}


function addCherry() {
      
    for (var i = 0; i < gBoard.length; i++) {
        console.log(gBoard.length);
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] === CHERRY) {
                gBoard[i][j] === EMPTY
                renderCell({ i, j }, EMPTY)
            }
            if (gBoard[i][j] === EMPTY) {
                gEmptyCells.push({ i, j })
                
            }
        }
    }

    var emptyCellIdx = getRandomIntInclusive(0, gEmptyCells.length - 1)
    renderCell(gEmptyCells[emptyCellIdx], CHERRY)
    gBoard[gEmptyCells[emptyCellIdx].i][gEmptyCells[emptyCellIdx].j] = CHERRY
}



