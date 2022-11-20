
let questionNumber;
let punteggio = 0;
let userAnswer = [];

const startQuiz = (questionNumber) => {
    console.log('func.startQuiz');

    if(questionNumber === undefined){
        const newButt = document.createElement('button');
        newButt.innerHTML = 'START';
        const buttonStart = document.getElementById('submit');
        buttonStart.appendChild(newButt);
        newButt.id = 'init';
        newButt.addEventListener('click', event => {
            console.log('func.startQuiz->click event');
            setStart();
         });
    } else {
        console.log('func.startQuiz->display.questionNumber ' + questionNumber);
        console.log('func.startQuiz->go.to.displayQuestion');
        const removeStart = document.getElementById('init');
        removeStart.remove();
        createConfirm();
        displayQuestion();
    }
}

const setStart = () => {
    console.log(questionNumber);
    //inizialize
    questionNumber = 0;
    startQuiz(questionNumber);
}

const currentQuestion = () => questions[questionNumber];


const displayQuestion = () => {
    console.log('func.displayQuestion->start.with.questionNumer: ' + questionNumber);
    if(questionNumber !== undefined){
        document.getElementById('question').innerHTML = currentQuestion().question; 
        displayAnswer();
    }
}

const displayAnswer = () => {
    console.log('func.displayAnswer->start');
    const current = currentQuestion();

    //select the answer of the current question
    const wrongAnswers = current.incorrect_answers;
    const rightAnswer = current.correct_answer;
    const allAnswers = [rightAnswer,...wrongAnswers].sort((a,b) => 0.5 - Math.random());

    const answersContainer = document.getElementById('answers');
    answersContainer.innerHTML = '';

    for(const elem of allAnswers){
        //create button
        const ans = document.createElement('button');
        ans.innerHTML = elem;
        ans.onclick = onAnswered;
        ans.value = elem;
        answersContainer.appendChild(ans);
    }
}

const createConfirm = () => {
    const current = currentQuestion();

    //create confirm button
    const confirmButt = document.getElementById('submit');
    const btnConfirm = document.createElement('button');
    btnConfirm.innerHTML = 'CONFERMA';
    btnConfirm.onclick = onConfirm;
    btnConfirm.value = questionNumber;
    btnConfirm.id = 'confirm-btn';
    confirmButt.appendChild(btnConfirm);
}

const onConfirm = event => {
    console.log('func.onConfirm->event click');
    console.log({questionNumber, userAnswer, punteggio});
    if(userAnswer[questionNumber]){
        nextQuestion();
    } else {
        alert('seleziona una risposta!');
    }
}

const onAnswered = event => {
    console.log('func.onAnswered->event click');
    userAnswer[questionNumber] = event.target.value;
    console.log('Value selected: ' + userAnswer[questionNumber]);
};

const nextQuestion = event => {
    console.log('func.nextQuestion->event click');
    
    if(questionNumber >= questions.length - 1){
        //fine del quiz
        const emptyAnswers = document.getElementById('answers');
        emptyAnswers.innerHTML = '';
        emptyAnswers.classList.add('no-margin');

        const emptySubmit = document.getElementById('submit');
        emptySubmit.remove();

        const replaceH1 = document.getElementById('question');
        replaceH1.innerHTML = "Quiz finished! Your total score is: ".toUpperCase();
    } 

    if(questionNumber > questions.length - 1){
        return;
    } 

    calculateScore();

    questionNumber++;

    if (questionNumber < questions.length){
        displayQuestion();
    }
}

const calculateScore = () => {
    console.log('Punteggio attuale: ' + punteggio);
    console.log({questionNumber});
    if (userAnswer[questionNumber] === currentQuestion().correct_answer) {
        punteggio++;
    }
    displayScore();
}

const displayScore = () => {
    console.log('func.displayScore ' + punteggio);
    if(userAnswer.length === questions.length){
        console.log('func.displayScore-->finish ' + punteggio);
        const printScore = document.getElementById('counter');
        printScore.innerText = '';

        const newScore = document.createElement('div');
        printScore.appendChild(newScore);
        newScore.classList.add('total-score');
        newScore.innerHTML = punteggio + '/' + questions.length;
    } else {
        printScore = document.getElementById('counter').innerHTML = 'Score: ' + punteggio + '/' + questions.length;
    }
};

window.onload = () =>{
    startQuiz(questionNumber);
}