let questions = [];

function showQuestionForm() {
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('question-form').style.display = 'block';
}

function hideQuestionForm() {
    document.getElementById('question-form').style.display = 'none';
    document.getElementById('main-menu').style.display = 'block';
}

function saveQuestion() {
    const question = document.getElementById('question').value;
    const options = [
        document.getElementById('option1').value,
        document.getElementById('option2').value,
        document.getElementById('option3').value,
        document.getElementById('option4').value
    ];
    const correctOption = document.getElementById('correctOption').value;

    if (question && options.every(option => option) && options.includes(correctOption)) {
        questions.push({ question, options, correctOption });
        alert('Pergunta salva com sucesso!');
        document.getElementById('question-form').reset();
        hideQuestionForm();
    } else {
        alert('Por favor, preencha todos os campos corretamente.');
    }
}

let currentQuestionIndex = 0;

function startQuiz() {
    if (questions.length === 0) {
        alert('Nenhuma pergunta cadastrada.');
        return;
    }
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    showQuestion(0);
}

function showQuestion(index) {
    const question = questions[index];
    document.getElementById('quiz-question').innerText = question.question;
    const optionsDiv = document.getElementById('quiz-options');
    optionsDiv.innerHTML = '';
    question.options.forEach(option => {
        const radioBtn = document.createElement('input');
        radioBtn.type = 'radio';
        radioBtn.name = 'quiz-option';
        radioBtn.value = option;
        radioBtn.id = option;

        const label = document.createElement('label');
        label.htmlFor = option;
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
    const correctOption = questions[currentQuestionIndex].correctOption;

    if (answer === correctOption) {
        alert('Você acertou!');
    } else {
        alert(`Resposta incorreta. A resposta correta é: ${correctOption}`);
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex);
    } else {
        alert('Você completou o quiz!');
        document.getElementById('quiz').style.display = 'none';
        document.getElementById('main-menu').style.display = 'block';
    }
}
