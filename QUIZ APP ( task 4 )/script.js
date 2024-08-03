const questions = [
    {
        question: "What is the chemical symbol for water?",
        options: ["H2O", "O2", "CO2", "NaCl"],
        answer: "H2O"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "Mark Twain"],
        answer: "Harper Lee"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Jupiter", "Saturn", "Venus"],
        answer: "Mars"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
        answer: "Pacific Ocean"
    },
    {
        question: "In what year did the Titanic sink?",
        options: ["1912", "1905", "1923", "1898"],
        answer: "1912"
    },
    {
        question: "What is the capital city of Japan?",
        options: ["Tokyo", "Kyoto", "Osaka", "Hiroshima"],
        answer: "Tokyo"
    },
    {
        question: "Which element has the atomic number 1?",
        options: ["Hydrogen", "Helium", "Carbon", "Oxygen"],
        answer: "Hydrogen"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Leonardo da Vinci", "Vincent van Gogh", "Claude Monet", "Pablo Picasso"],
        answer: "Leonardo da Vinci"
    }
];

let currentQuestionIndex = 0;
let score = 0;
const userAnswers = []; // Array to store user answers
let selectedOption = null; // To keep track of selected option

const homeScreen = document.getElementById('home');
const quizScreen = document.getElementById('quiz');
const resultScreen = document.getElementById('result');

document.getElementById('startQuiz').addEventListener('click', startQuiz);
document.getElementById('nextQuestion').addEventListener('click', nextQuestion);
document.getElementById('retry').addEventListener('click', retry);

function startQuiz() {
    homeScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('questionNumber').textContent = `Question ${currentQuestionIndex + 1}`;
    document.getElementById('question').textContent = question.question;
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    question.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-button');
        button.addEventListener('click', () => handleOptionClick(button, option));
        optionsContainer.appendChild(button);
    });

    // Clear previously selected option style
    const allButtons = optionsContainer.querySelectorAll('button');
    allButtons.forEach(button => button.classList.remove('selected'));

    // Highlight previously selected option if any
    if (selectedOption) {
        const selectedButton = Array.from(allButtons).find(button => button.textContent === selectedOption);
        if (selectedButton) {
            selectedButton.classList.add('selected');
        }
    }
}

function handleOptionClick(button, option) {
    if (selectedOption) {
        // Do nothing if an option is already selected
        return;
    }
    selectedOption = option;
    button.classList.add('selected');
    checkAnswer(option);
}

function checkAnswer(selectedOption) {
    const question = questions[currentQuestionIndex];
    userAnswers[currentQuestionIndex] = {
        question: question.question,
        selected: selectedOption,
        correct: selectedOption === question.answer
    };
    if (selectedOption === question.answer) {
        score++;
    }

    document.getElementById('nextQuestion').classList.remove('hidden');
}

function nextQuestion() {
    currentQuestionIndex++;
    selectedOption = null; // Reset selected option for the next question
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    document.getElementById('score').textContent = `Your score is ${score} out of ${questions.length}`;

    const answersContainer = document.getElementById('answers');
    answersContainer.innerHTML = '';

    userAnswers.forEach((answer, index) => {
        const answerDiv = document.createElement('div');
        answerDiv.innerHTML = `
            <p><strong>Question ${index + 1}:</strong> ${answer.question}</p>
            <p class="${answer.correct ? 'correct' : 'incorrect'}"><strong>Your answer:</strong> ${answer.selected}</p>
            <p><strong>Correct answer:</strong> ${questions[index].answer}</p>
        `;
        answersContainer.appendChild(answerDiv);
    });
}

function retry() {
    score = 0;
    currentQuestionIndex = 0;
    userAnswers.length = 0; // Clear user answers
    resultScreen.classList.add('hidden');
    homeScreen.classList.remove('hidden');
}
