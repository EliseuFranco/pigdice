'use strict';

const currentScoreZero = document.getElementById("current--0")
const currentScoreOne = document.getElementById("current--1")
const dice = document.querySelector(".dice")
const btnRoll = document.querySelector(".btn--roll")
const playerZero = document.querySelector(".player--0")
const playerOne = document.querySelector(".player--1")
let current = 0;
let turn = 0;
const btnHold = document.querySelector(".btn--hold")
const scoreZero = document.querySelector("#score--0")
const scoreOne = document.querySelector("#score--1")
const btnNewGame = document.querySelector(".btn--new")
let jogo, activeplayer;

const playersScores = {
    p0: 0,
    p1: 0
}

function init(){
    jogo = true
    activeplayer = 0
    playersScores.p0 = 0
    playersScores.p1 = 0

    current = 0
    currentScoreZero.textContent = 0
    currentScoreOne.textContent = 0
    scoreZero.textContent = 0
    scoreOne.textContent = 0
    dice.classList.add("hidden")

    playerZero.classList.add('player--active')
    playerOne.classList.remove('player--active')
    playerZero.classList.remove('player--winner')
    playerOne.classList.remove('player--winner')
}

init() 

const endGame = function(){
    jogo = false
}

function getDice(){
    return  Math.ceil(Math.random() * 6)
}

function switchPlayer(){
    document.getElementById(`current--${activeplayer}`).textContent = 0
    activeplayer = activeplayer === 0 ? 1: 0

    playerZero.classList.toggle("player--active")
    playerOne.classList.toggle("player--active")
}

function checkDice(randomDice){
    return randomDice === 1
}

function checkWinner(){
    if (playersScores['p0'] >= 100){
        playerZero.classList.add('player--winner')
        endGame()
    } 
    else if (playersScores['p1'] >= 100) {
        playerOne.classList.add('player--winner')
        endGame()
        
    }
}

function game(){

    if (jogo){

        const randomDice = getDice()
        dice.classList.remove('hidden')
        dice.src = `dice-${randomDice}.png`

        if(!checkDice(randomDice)){
            current += randomDice
            document.getElementById(`current--${activeplayer}`).textContent = current
            return
        } 
        switchPlayer()
    }    
}

function holdScore(){

    playersScores[`p${activeplayer}`] += current
    document.getElementById(`score--${activeplayer}`).textContent = playersScores[`p${activeplayer}`]
    current = 0
    checkWinner()
    if (jogo){
        switchPlayer()
    }
}

const resetGame = () =>{
    init()
}

btnHold.addEventListener("click", holdScore)
btnRoll.addEventListener("click", game)
btnNewGame.addEventListener("click", resetGame)
