const questions = {
    1: [
        {
            question: "Qual é a capital da França?",
            options: ["Paris", "Londres", "Berlim", "Roma"],
            correctOption: "Paris"
        },
        {
            question: "Qual é a maior montanha do mundo?",
            options: ["Monte Everest", "K2", "Kangchenjunga", "Lhotse"],
            correctOption: "Monte Everest"
        },
        {
            question: "Qual é o rio mais longo do mundo?",
            options: ["Rio Amazonas", "Rio Nilo", "Rio Yangtzé", "Rio Mississippi"],
            correctOption: "Rio Nilo"
        },
        {
            question: "Qual é o maior oceano do mundo?",
            options: ["Oceano Atlântico", "Oceano Pacífico", "Oceano Índico", "Oceano Ártico"],
            correctOption: "Oceano Pacífico"
        },
        {
            question: "Qual é a moeda do Japão?",
            options: ["Yuan", "Yen", "Won", "Baht"],
            correctOption: "Yen"
        }
    ],
    2: [
        {
            question: "Quem pintou a Mona Lisa?",
            options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Claude Monet"],
            correctOption: "Leonardo da Vinci"
        },
        {
            question: "Qual é a fórmula química da água?",
            options: ["H2O", "CO2", "O2", "N2"],
            correctOption: "H2O"
        },
        {
            question: "Quem escreveu 'Dom Quixote'?",
            options: ["Miguel de Cervantes", "William Shakespeare", "J.K. Rowling", "Gabriel Garcia Marquez"],
            correctOption: "Miguel de Cervantes"
        },
        {
            question: "Qual planeta é conhecido como o Planeta Vermelho?",
            options: ["Marte", "Júpiter", "Saturno", "Vênus"],
            correctOption: "Marte"
        },
        {
            question: "Qual é o símbolo químico do ouro?",
            options: ["Au", "Ag", "Fe", "Hg"],
            correctOption: "Au"
        }
    ],
    3: [
        {
            question: "Qual é a velocidade da luz no vácuo?",
            options: ["299.792.458 m/s", "150.000.000 m/s", "300.000.000 m/s", "299.792.458 km/s"],
            correctOption: "299.792.458 m/s"
        },
        {
            question: "Qual é o elemento mais abundante no universo?",
            options: ["Hidrogênio", "Oxigênio", "Carbono", "Hélio"],
            correctOption: "Hidrogênio"
        },
        {
            question: "Quem desenvolveu a teoria da relatividade?",
            options: ["Isaac Newton", "Albert Einstein", "Niels Bohr", "Galileo Galilei"],
            correctOption: "Albert Einstein"
        },
        {
            question: "Qual é a fórmula da circunferência de um círculo?",
            options: ["2πr", "πr^2", "2r", "πd"],
            correctOption: "2πr"
        },
        {
            question: "Quem escreveu a peça 'Hamlet'?",
            options: ["William Shakespeare", "Christopher Marlowe", "George Bernard Shaw", "John Milton"],
            correctOption: "William Shakespeare"
        }
    ]
};

let currentQuestionIndex = 0;
let selectedQuestions = [];

function startQuiz() {
    const difficulty = document.getElementById('difficulty').value;
    selectedQuestions = questions[difficulty];

    if (selectedQuestions.length === 0) {
        alert('Nenhuma pergunta disponível para este nível.');
        return;
    }

    currentQuestionIndex = 0;
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    showQuestion(currentQuestionIndex);
}

function showQuestion(index) {
    const question = selectedQuestions[index];
    document.getElementById('quiz-question').innerText = question.question;
    const optionsDiv = document.getElementById('quiz-options');
    optionsDiv.innerHTML = '';
    question.options.forEach(option => {
        const radioBtn = document.createElement('input');
        radioBtn.type = 'radio';
        radioBtn.name = 'quiz-option';
        radioBtn.value = option;
        radioBtn.id = option.replace(/\s/g, ''); // Remove espaços do ID para garantir validade

        const label = document.createElement('label');
        label.htmlFor = radioBtn.id;
        label.innerText = option;

        optionsDiv.appendChild(radioBtn);
        optionsDiv.appendChild(label);
        optionsDiv.appendChild(document.createElement('br'));
    });
}

function submitAnswer() {
    const selectedOption = document.querySelector('input[name="quiz-option"]:checked');
    if (!selectedOption) {
        alert('Por favor, selecione uma opção.');
        return;
    }

    const answer = selectedOption.value;
    const correctOption = selectedQuestions[currentQuestionIndex].correctOption;

    if (answer === correctOption) {
        alert('Você acertou!');
    } else {
        alert(`Resposta incorreta. A resposta correta é: ${correctOption}`);
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
        showQuestion(currentQuestionIndex);
    } else {
        alert('Você completou o quiz!');
        document.getElementById('quiz').style.display = 'none';
        document.getElementById('main-menu').style.display = 'block';
        currentQuestionIndex = 0;
    }
}

function showQuestionForm() {
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('question-form').style.display = 'block';
}

function cancelQuestionForm() {
    document.getElementById('question-form').style.display = 'none';
    document.getElementById('main-menu').style.display = 'block';
}

function saveQuestion() {
    alert('Funcionalidade de salvar pergunta não implementada.');
}

function confirmExit() {
    document.getElementById('confirmation-modal').style.display = 'block';
}

function closeConfirmationModal() {
    document.getElementById('confirmation-modal').style.display = 'none';
}

function exitQuiz() {
    document.getElementById('confirmation-modal').style.display = 'none';
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('main-menu').style.display = 'block';
    currentQuestionIndex = 0;
}
