//Initial Data
let currentQuestion = 0;  //questão atual
let correctAnswers = 0;   //perguntas corretas


showQuestion();

//Events
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);



//Functions
function showQuestion() {         //mostrar questão atual
    if(questions[currentQuestion]) {
            let q = questions[currentQuestion];

            let pct = Math.floor((currentQuestion / questions.length) * 100);   //barra de carregamento
            //porcentagem em relação a questão atual à quantidade de questoes; Math.floor = arredondar
            document.querySelector('.progress--bar').style.width = `${pct}%`; //acessando o css da barra para aumentar a largura da barra de progresso

            document.querySelector('.scoreArea').style.display = 'none';   //esconder 'scoreArea'
            document.querySelector('.questionArea').style.display = 'block';   //mostrar 'questionArea'

            document.querySelector('.question').innerHTML = q.question;
            document.querySelector('.options').innerHTML = '';    //limpando as questões

            let optionsHtml = '';
        for (let i in q.options) {
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span> ${q.options[i]}</div>`;    //parseInt: transformando o i em inteiro(era uma string); ${q.options[i]}: puxa as opções do question.js
        }

        document.querySelector('.options').innerHTML = optionsHtml;  //inserindo as opções na tela

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);        //adicionando botões de clique
        });


    }  else {
        finishQuiz();
    }
}

function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if(questions[currentQuestion].answer === clickedOption) {  //se a resposta da questão atual é igual a resposta correta
        correctAnswers++;    //soma as respostas corretas
    } 

    currentQuestion++; 
    showQuestion();
}

function finishQuiz() {
    let points = Math.floor((correctAnswers / questions.length) * 100);  //calculando a porcentagem da quantidade de acertos sobre o total de questões

    if(points <= 30) {
        document.querySelector('.scoreText1').innerHTML = 'Tá ruim, em?!';
        document.querySelector('.scorePct').style.color = '#FF0000';
    } else if(points >= 30 && points <70) {
        document.querySelector('.scoreText1').innerHTML = 'Muito bom!';
        document.querySelector('.scorePct').style.color = '#FFFF00';
    } else if(points >= 70) {
        document.querySelector('.scoreText1').innerHTML = 'Parabéns!';
        document.querySelector('.scorePct').style.color = '#0D630D';
    }



    document.querySelector('.scorePct').innerHTML =`Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`;

    document.querySelector('.scoreArea').style.display = 'block';   //mostrar 'scoreArea'
    document.querySelector('.questionArea').style.display = 'none';   //esconder 'questionArea'
    document.querySelector('.progress--bar').style.width = '100%';   //completar 100% da barra quando terminar as perguntas

}

function resetEvent() {
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();
}