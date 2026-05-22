// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");

const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answer-container");

const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-questions");

const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");

const resultMessage = document.getElementById("result-message");
const progressBar = document.getElementById("progress");


// Questions
const quizeQuestions = [
    {
        question: "What is the capital of France?",
        answer: [
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Paris", correct: true },
            { text: "Madrid", correct: false }
        ]
    },

    {
        question: "Which planet is known as the Red Planet?",
        answer: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Venus", correct: false }
        ]
    },

    {
        question: "Who developed the Java programming language?",
        answer: [
            { text: "James Gosling", correct: true },
            { text: "Dennis Ritchie", correct: false },
            { text: "Bjarne Stroustrup", correct: false },
            { text: "Guido van Rossum", correct: false }
        ]
    },

    {
        question: "What does HTML stand for?",
        answer: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Text Machine Language", correct: false },
            { text: "Hyper Transfer Markup Language", correct: false },
            { text: "Home Tool Markup Language", correct: false }
        ]
    },

    {
        question: "Which is the largest ocean on Earth?",
        answer: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true }
        ]
    }
];


// Quiz State
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionSpan.textContent = quizeQuestions.length;
maxScoreSpan.textContent = quizeQuestions.length;


// Event Listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);


// Start Quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    scoreSpan.textContent = score;

    startScreen.classList.remove("active");
    resultScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}


// Show Question
function showQuestion() {

    answersDisabled = false;

    const currentQuestion = quizeQuestions[currentQuestionIndex];

    questionText.textContent = currentQuestion.question;

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    answersContainer.innerHTML = "";

    currentQuestion.answer.forEach(answer => {

        const button = document.createElement("button");

        button.innerText = answer.text;

        button.classList.add("answer-btn");

        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);

        answersContainer.appendChild(button);
    });

    updateProgressBar();
}


// Select Answer
function selectAnswer(e) {

    if (answersDisabled) return;

    answersDisabled = true;

    const selectedButton = e.target;

    const isCorrect =
        selectedButton.dataset.correct === "true";

    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
        selectedButton.classList.add("correct");
    } else {
        selectedButton.classList.add("incorrect");
    }

    Array.from(answersContainer.children).forEach(button => {

        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }

        button.disabled = true;
    });

    setTimeout(() => {

        currentQuestionIndex++;

        if (currentQuestionIndex < quizeQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }

    }, 1000);
}


// Show Results
function showResults() {

    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    if (score === quizeQuestions.length) {
        resultMessage.textContent =
            "Excellent! Perfect Score!";
    }
    else if (score >= 3) {
        resultMessage.textContent =
            "Good Job! Keep it up!";
    }
    else {
        resultMessage.textContent =
            "Keep Practicing!";
    }
}


// Restart Quiz
function restartQuiz() {

    resultScreen.classList.remove("active");
    startQuiz();
}


// Progress Bar
function updateProgressBar() {

    const progress =
        (currentQuestionIndex / quizeQuestions.length) * 100;

    progressBar.style.width = progress + "%";
}