// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// Quiz questions
const quizQuestions = [
  {
    question: "What is the capital of Philippines?",
    answers: [
      { text: "Davao", correct: false },
      { text: "Cebu", correct: false },
      { text: "Manila", correct: true },
      { text: "Maguindanao", correct: false },
    ],
  },
  {
    question: "Who is our national hero in the Philippines?",
    answers: [
      { text: "Apolinario Mabini", correct: false },
      { text: "Jose Rizal", correct: true },
      { text: "Andres Bonifacio", correct: false },
      { text: "J Rizz", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

// Quiz State Variables
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners

startButton.addEventListener("click", startQuiz)
restartButton.addEventListener("click", restartQuiz)

function startQuiz(){
    console.log("Quiz Started")
    // reset vars
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion()
}

function showQuestion(){
    // reset state
    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];
    
    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;

    progressBar.style.width = progressPercent + "%"
    // ex, width: 50%

    questionText.textContent = currentQuestion.question;

    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");
        
        // dataset is basically a property of a button element allowing us to store costum data to the button itself
        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);

        answersContainer.appendChild(button);
    })
}

function selectAnswer(event) {
    // optimization check
    if (answersDisabled) return;

    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true"

    Array.from(answersContainer.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        } else if(button === selectedButton){
            button.classList.add("incorrect"); //  you may also change the condition to else if(button === selectedButton)
        }
    })

    if(isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;

        // checks if there are more questions or if the quiz is over
        if(currentQuestionIndex < quizQuestions.length){
            showQuestion();
        } else {
            showResults();
        }
    }, 1000)
}

function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;
    
    const percentage = (score/quizQuestions.length) * 100;

    if (percentage === 100){
        resultMessage.textContent = "Perfect! You're a genius!";
    } else if (percentage >= 80){
        resultMessage.textContent = "Great Job! You know your stuff!";
    } else if (percentage >= 60){
        resultMessage.textContent = "Good Effort! Keep Learning!";
    } else if (percentage >= 40){
        resultMessage.textContent = "Not Bad! Try to improve!";
    } else {
        resultMessage.textContent = "Keep studying! You'll get better!";
    }
}

function restartQuiz(){
    console.log("Quiz Restarted");

    resultScreen.classList.remove("active");
    startQuiz();
}