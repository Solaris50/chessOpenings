const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");


let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
  {
    question: 'What is your favourite fruit',
    choice1: 'apple',
    choice2: 'banna',
    choice3: 'peach',
    choice4: 'orange',
    answer: 1,
  },
  {
    question: 'What is your favourite vegetable',
    choice1: 'carrot',
    choice2: 'cucumber',
    choice3: 'onion',
    choice4: 'lettuce',
    answer: 2,
  },
  {
    question: 'What is your favourite animal',
    choice1: 'fish',
    choice2: 'cheetah',
    choice3: 'lion',
    choice4: 'dog',
    answer: 3,
  },
  {
    question: 'What is your favourite planet',
    choice1: 'mars',
    choice2: 'earth',
    choice3: 'moon',
    choice4: 'Sun #donthate',
    answer: 4,
  }
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions]
  getNewQuestion()
}

getNewQuestion = () => {
  if (availableQuestions.length == 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score)

    return window.location.assign('../pages/end.html')
  }

  questionCounter++
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
  progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`

  const questionIndex = Math.floor(Math.random() * availableQuestions.length)

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

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

    if (classToApply === 'correct') {
      incrementScore(SCORE_POINTS)
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion()
    }, 1000)
  })
})

incrementScore = num => {
  score += num
  scoreText.innerText = score
}

startGame();
