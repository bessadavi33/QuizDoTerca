// script.js

let currentQuestionIndex = 0;
let score = 0;
const questions = {
    1: [
        {
            question: "Qual é a capital da França?",
            options: ["Paris", "Londres", "Berlim", "Madri"],
            correctAnswer: 0
        },
        // Adicione mais perguntas de nível 1 aqui
    ],
    2: [
        {
            question: "Qual é o maior oceano do mundo?",
            options: ["Atlântico", "Índico", "Ártico", "Pacífico"],
            correctAnswer: 3
        },
        // Adicione mais perguntas de nível 2 aqui
    ],
    3: [
        {
            question: "Quem pintou a Mona Lisa?",
            options: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"],
            correctAnswer: 1
        },
        // Adicione mais perguntas de nível 3 aqui
    ]
};

let selectedLevel = 1;
let selectedAnswer = null;

function startQuiz() {
    const level = document.getElementById('difficulty').value;
    selectedLevel = parseInt(level);
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    const quizDiv = document.getElementById('quiz');
    const questionObj = questions[selectedLevel][currentQuestionIndex];
    quizDiv.innerHTML = `
        <h2>${questionObj.question}</h2>
        ${questionObj.options.map((option, index) => `
            <label>
                <input type="radio" name="answer" value="${index}">
                ${option}
            </label><br>
        `).join('')}
        <button onclick="submitAnswer()">Enviar</button>
        <button onclick="confirmExit()">Sair</button>
    `;
    document.getElementById('main-menu').style.display = 'none';
    quizDiv.style.display = 'block';
}

function submitAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        selectedAnswer = parseInt(selectedOption.value);
        checkAnswer();
    } else {
        alert('Por favor, selecione uma resposta!');
    }
}

function checkAnswer() {
    const questionObj = questions[selectedLevel][currentQuestionIndex];
    const quizDiv = document.getElementById('quiz');
    quizDiv.innerHTML = `
        <h2>${questionObj.question}</h2>
        ${questionObj.options.map((option, index) => `
            <label style="text-decoration: ${index === questionObj.correctAnswer ? 'underline' : ''}; color: ${index === questionObj.correctAnswer ? 'green' : (index === selectedAnswer ? 'red' : '')};">
                ${option}
            </label><br>
        `).join('')}
        <button onclick="nextQuestion()">Próxima Pergunta</button>
    `;

    if (selectedAnswer === questionObj.correctAnswer) {
        score++;
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions[selectedLevel].length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    const quizDiv = document.getElementById('quiz');
    quizDiv.innerHTML = `
        <h2>Você acertou ${score} de ${questions[selectedLevel].length} perguntas!</h2>
        <button onclick="returnToMenu()">Retornar ao Menu</button>
    `;
}

function returnToMenu() {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('main-menu').style.display = 'block';
}

function confirmExit() {
    const confirmation = confirm("Você tem certeza que deseja sair?");
    if (confirmation) {
        returnToMenu();
    }
}

function showQuestionForm() {
    const quizDiv = document.getElementById('quiz');
    quizDiv.innerHTML = `
        <h2>Cadastrar Pergunta (Apenas Visualização)</h2>
        <label for="question">Pergunta:</label>
        <input type="text" id="question" name="question"><br>
        <label for="option1">Opção 1:</label>
        <input type="text" id="option1" name="option1"><br>
        <label for="option2">Opção 2:</label>
        <input type="text" id="option2" name="option2"><br>
        <label for="option3">Opção 3:</label>
        <input type="text" id="option3" name="option3"><br>
        <label for="option4">Opção 4:</label>
        <input type="text" id="option4" name="option4"><br>
        <label for="correctAnswer">Selecione a resposta correta:</label>
        <input type="radio" name="correctAnswer" value="0"> Opção 1
        <input type="radio" name="correctAnswer" value="1"> Opção 2
        <input type="radio" name="correctAnswer" value="2"> Opção 3
        <input type="radio" name="correctAnswer" value="3"> Opção 4<br>
        <button onclick="returnToMenu()">Retornar ao Menu</button>
    `;
    document.getElementById('main-menu').style.display = 'none';
    quizDiv.style.display = 'block';
}
