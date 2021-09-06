const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");


let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let value = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
  {
    question: 'What colour do you want to start with?',
    choice1: 'black',
    choice2: 'white',
    choice3: "Doesn't matter",
    choice4: 'orange'
  },
  {
    question: 'What play style best describes you?',
    choice1: 'I like to play the slow game and gradually over take my opponent with positional play',
    choice2: 'I like to trap my opponents and take a quick win through big win early',
    choice3: 'I like to go all out attack and get board space as fast as possible',
    choice4: "I like a balanced approach with a good mix of creating offensive opportunities as well as having a good fundamental structure "
  },
  {
    question: 'What is your current rating?',
    choice1: '< 1000',
    choice2: '1000 < rating > 1400',
    choice3: '1400 < rating > 2000',
    choice4: '> 2000'
  },
  {
    question: 'How much complexity and theory will you want in your opening?',
    choice1: 'Very little theory, I just want a simple opening',
    choice2: 'Moderate theory, I want some complexity based on opponent responses',
    choice3: 'Heavy theory, I want to study many if not all the possibilities or advanced positions',
    choice4: 'No theory'
  }
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;
let questionIndex = 0;

startGame = () => {
  questionCounter = 0;
  value = 0;
  availableQuestions = [...questions]
  getNewQuestion()
}

getNewQuestion = () => {
  if (availableQuestions.length == 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', value)

    return window.location.assign('../pages/end.html')
  }

  questionCounter++
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
  progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`

  currentQuestion = availableQuestions[questionIndex]
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
  })

  availableQuestions.splice(questionIndex, 1)

  acceptingAnswers = true;

}

choices.forEach(choices => {
  choices.addEventListener('click', e => {
    if (!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']

    if(selectedAnswer == 1) {
      value += 100;
    } else if( selectedAnswer == 2){
      value += 200;
    } else if (selectedAnswer == 3){
      value += 300;
    } else {
      value += 400;
    }

    selectedChoice.parentElement.classList.add('correct');

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove('correct')
      getNewQuestion()
    }, 1000)
  })
})

incrementScore = num => {
  score += num
  scoreText.innerText = score
}

startGame();
