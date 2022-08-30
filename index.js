let deckId
const newDeckBtn = document.getElementById("new-deck-btn")
const drawCardsBtn = document.getElementById("draw-cards")
const remainingText = document.getElementById("remaining")
const cardsContainer = document.getElementById("cards")
const myScore = document.getElementById("my-score")
const computerScore = document.getElementById("computer-score")

newDeckBtn.addEventListener("click", handleClick)

function handleClick() {
    fetch("https://www.deckofcardsapi.com/api/deck/new/")
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


            if(drawCardsBtn === 0) {
                drawCardsBtn.disabled = true
            }
        })
})

function determineCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)
    console.log(card1ValueIndex)
    console.log(card2ValueIndex)
    // if(card1ValueIndex > card2ValueIndex) {
        
    // }
}