let deckId
let computerScore = 0
let myScore = 0
const newDeckBtn = document.getElementById("new-deck-btn")
const drawCardsBtn = document.getElementById("draw-cards")
const restartGameBtn = document.getElementById("restart-game")
const remainingText = document.getElementById("remaining")
const cardsContainer = document.getElementById("cards")
const myScoreEl = document.getElementById("my-score")
const computerScoreEl = document.getElementById("computer-score")
const header = document.getElementById("header")
const cards = document.getElementById("cards")
const instr = document.getElementById("instr")


newDeckBtn.addEventListener("click", handleClick)

function handleClick() {
    fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            remainingText.textContent = `Remaining Cards: ${data.remaining}`
            deckId = data.deck_id
            console.log(deckId)
        })
}

drawCardsBtn.addEventListener("click", () => {
    fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            remainingText.textContent = `Remaining Cards: ${data.remaining}`

            cardsContainer.children[0].innerHTML = `<img src=${data.cards[0].image} class="card">`
            cardsContainer.children[1].innerHTML = `<img src=${data.cards[1].image} class="card">`

            const winnerText = determineCardWinner(data.cards[0], data.cards[1])
            header.textContent = winnerText
            
            if(data.remaining === 0) {
                    restartGame()
                if(computerScore > myScore) {
                    header.textContent = `Computer is the final winner!`
                    instr.style.display = "none"
                    cards.style.visibility = "hidden"
                } else if (computerScore < myScore) {
                    header.textContent = `You are the final winner!`
                    instr.style.display = "none"
                    cards.style.visibility = "hidden"
                } else {
                    header.textContent = `It's a tie!`
                    instr.style.display = "none"
                    cards.style.visibility = "hidden"
                }
            }
        })
})

function determineCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)
    
    if(card1ValueIndex > card2ValueIndex) {
        computerScore++
        computerScoreEl.textContent = `Computer Score: ${computerScore}`
        return "Computer wins!"
    } else if(card1ValueIndex < card2ValueIndex) {
        myScore++
        myScoreEl.textContent = `My Score: ${myScore}`
        return "You win!"
    } else {
        return "War!"
    }
}

function restartGame() {
    newDeckBtn.style.display = "none"
    drawCardsBtn.style.display = "none"
    restartGameBtn.style.display = "block"
    drawCardsBtn.disabled = false
}

restartGameBtn.addEventListener("click", () => {
    newDeckBtn.style.display = "block"
    drawCardsBtn.style.display = "block"
    restartGameBtn.style.display = "none"
    instr.style.display = "block"
    cards.style.visibility = "visible"

    computerScore = 0
    myScore = 0

    computerScoreEl.textContent = `Computer Score: ${computerScore}`
    myScoreEl.textContent = `My Score: ${myScore}`
    header.textContent = "Game of War"
})