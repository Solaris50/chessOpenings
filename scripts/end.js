const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const endValue = localStorage.getItem('mostRecentScore')
const showErrorMessage = document.querySelector('.errorMessage')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 5;

let mostRecentScore = "";
  
  if (endValue <= 400) {
    mostRecentScore = "The Italian Game"
  } else if (endValue <= 800) {
    mostRecentScore = "The Sicilian Defense"
  } else if (endValue < 1600) {
    mostRecentScore = "The French Defense"
  } else {
    mostRecentScore = "The Ruy-Lopez"
  }
finalScore.innerText = mostRecentScore;

saveHighScore = e => {
  e.preventDefault()
  if(!username.value == true){
    showErrorMessage.style.display = "inline";
  }
  else{
    saveScoreBtn.disabled = false;  
    showErrorMessage.style.display = "none";
  const score = {
    score: mostRecentScore,
    name: username.value
  }

  highScores.push(score)

  highScores.sort((a, b) => {
    return b.score - a.score
  })

  highScores.splice(10)

  localStorage.setItem('highScores', JSON.stringify(highScores))
  window.location.assign('/')
}
}