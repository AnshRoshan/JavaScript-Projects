const questions = [
  {
    question: 'What is the capital of France?',
    answers: ['London', 'Paris', 'Berlin', 'Rome'],
    correct_answer: 'Paris',
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    answers: ['Harper Lee', 'J.K. Rowling', 'Stephen King', 'Charles Dickens'],
    correct_answer: 'Harper Lee',
  },
  {
    question: 'What is the chemical symbol for water?',
    answers: ['W', 'H', 'O', 'H2O'],
    correct_answer: 'H2O',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    answers: ['Earth', 'Mars', 'Venus', 'Jupiter'],
    correct_answer: 'Mars',
  },
  {
    question: 'Who painted the Mona Lisa?',
    answers: [
      'Leonardo da Vinci',
      'Pablo Picasso',
      'Vincent van Gogh',
      'Michelangelo',
    ],
    correct_answer: 'Leonardo da Vinci',
  },
  {
    question: 'What is the tallest mountain in the world?',
    answers: ['Mount Everest', 'K2', 'Kangchenjunga', 'Lhotse'],
    correct_answer: 'Mount Everest',
  },
  {
    question: 'Which country is famous for the tulip festival?',
    answers: ['Netherlands', 'Belgium', 'Turkey', 'France'],
    correct_answer: 'Netherlands',
  },
  {
    question: "Who wrote '1984'?",
    answers: [
      'George Orwell',
      'J.R.R. Tolkien',
      'F. Scott Fitzgerald',
      'Ernest Hemingway',
    ],
    correct_answer: 'George Orwell',
  },
  {
    question: 'What is the chemical symbol for gold?',
    answers: ['Au', 'Ag', 'Pb', 'Fe'],
    correct_answer: 'Au',
  },
  {
    question: 'What is the largest mammal in the world?',
    answers: ['Blue whale', 'Elephant', 'Giraffe', 'Hippopotamus'],
    correct_answer: 'Blue whale',
  },
  {
    question: 'What is the capital of Australia?',
    answers: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
    correct_answer: 'Canberra',
  },
  {
    question: "Who is the author of 'Harry Potter' series?",
    answers: [
      'J.K. Rowling',
      'Stephen King',
      'George R.R. Martin',
      'J.R.R. Tolkien',
    ],
    correct_answer: 'J.K. Rowling',
  },
  {
    question: 'What is the chemical symbol for iron?',
    answers: ['Ir', 'Fe', 'In', 'Au'],
    correct_answer: 'Fe',
  },
  {
    question: 'What is the largest ocean on Earth?',
    answers: [
      'Atlantic Ocean',
      'Indian Ocean',
      'Arctic Ocean',
      'Pacific Ocean',
    ],
    correct_answer: 'Pacific Ocean',
  },
  {
    question: 'Who discovered penicillin?',
    answers: [
      'Alexander Fleming',
      'Marie Curie',
      'Isaac Newton',
      'Albert Einstein',
    ],
    correct_answer: 'Alexander Fleming',
  },
  {
    question: "Which planet is known as the 'Morning Star' or 'Evening Star'?",
    answers: ['Mars', 'Venus', 'Mercury', 'Saturn'],
    correct_answer: 'Venus',
  },
  {
    question: "Who painted 'The Starry Night'?",
    answers: [
      'Pablo Picasso',
      'Vincent van Gogh',
      'Leonardo da Vinci',
      'Claude Monet',
    ],
    correct_answer: 'Vincent van Gogh',
  },
  {
    question: 'Which element has the atomic number 1?',
    answers: ['Hydrogen', 'Oxygen', 'Nitrogen', 'Helium'],
    correct_answer: 'Hydrogen',
  },
  {
    question: "Which country is known as the 'Land of the Rising Sun'?",
    answers: ['China', 'India', 'Japan', 'South Korea'],
    correct_answer: 'Japan',
  },
  {
    question: 'Who was the first woman to win a Nobel Prize?',
    answers: [
      'Marie Curie',
      'Rosalind Franklin',
      'Mother Teresa',
      'Jane Goodall',
    ],
    correct_answer: 'Marie Curie',
  },
]
// question: 'What is the capital of France?',
// answers: ['London', 'Paris', 'Berlin', 'Rome'],
// correct_answer: 'Paris',

const questionElement = document.querySelector('.question')
const answerButtonContainer = document.querySelector('.answer-button')
const nextButton = document.querySelector('.next')

let currentQuestionIndex = 0
let score = 0
let selectedQuestions = []

// Ensure selectedQuestions has unique, random questions each time
function selectRandomQuestions(numQuestions) {
  if (numQuestions > questions.length) {
    console.error(
      'Error: Requested number of questions exceeds available questions.'
    )
    return
  }

  const usedIndices = new Set()
  while (selectedQuestions.length < numQuestions) {
    const randomIndex = Math.floor(Math.random() * questions.length)
    if (!usedIndices.has(randomIndex)) {
      selectedQuestions.push(randomIndex)
      usedIndices.add(randomIndex)
    }
  }
}

function startQuiz(numQuestions = 4) {
  currentQuestionIndex = 0
  score = 0
  selectedQuestions = [] // Clear previous selection
  selectRandomQuestions(numQuestions) // Generate new random questions
  showQuestion()
}

function resetState() {
  answerButtonContainer.innerHTML = '' // Clear answer buttons
  nextButton.style.display = 'none' // Hide next button initially
}

// Randomize the order of answers
// currentQuestion.answers = currentQuestion.answers
//   .slice()
//   .sort(() => Math.random() - 0.5)
function showQuestion() {
  resetState()

  const currentQuestion = questions[selectedQuestions[currentQuestionIndex]]
  questionElement.textContent = currentQuestion.question

  currentQuestion.answers.forEach((answer) => {
    const answerButton = document.createElement('button')
    answerButton.textContent = answer
    answerButton.classList.add('answer-button')
    answerButtonContainer.appendChild(answerButton)

    answerButton.addEventListener('click', () =>
      selectAnswer(event, currentQuestion)
    )
  })
}
function selectAnswer(event, currentQuestion) {
  const selectedButton = event.target
  const isCorrect =
    selectedButton.textContent === currentQuestion.correct_answer

  if (isCorrect) {
    score++
    selectedButton.classList.add('correct')
  } else selectedButton.classList.add('incorrect')

  Array.from(answerButtonContainer.children).forEach((option) => {
    if (option.innerHTML === currentQuestion.correct_answer)
      option.classList.add('correct')
  })

  // Disable all buttons after selection
  for (const button of answerButtonContainer.children) {
    button.disabled = true
  }

  // Show "Next" button unless it's the last question
  if (currentQuestionIndex < selectedQuestions.length - 1)
    nextButton.textContent = 'Next'
  else nextButton.textContent = 'Submit'
  nextButton.style.display = 'block'
}

function showScore() {
  questionElement.textContent = `You scored ${score} out of ${selectedQuestions.length}!`
  questionElement.style.textAlign = 'center'
  resetState()
  nextButton.textContent = 'Play Again'
  nextButton.style.display = 'block'
}

nextButton.addEventListener('click', () => {
  if (currentQuestionIndex++ < selectedQuestions.length - 1) {
    showQuestion()
  } else {
    showScore()
    currentQuestionIndex = 0
  }
})

// Start the quiz with a default of 5 questions
startQuiz()

// Optional: Add event listener for "Play Again" button to call startQuiz again.
