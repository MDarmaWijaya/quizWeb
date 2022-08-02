const restartButton = document.getElementById('restartbutton');
const startGames = document.getElementById('startgame');
const home = document.getElementById('home');
const displayQuiz = document.getElementById('displayQuiz');
const backHome = document.getElementById('backhome');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const score = document.getElementById('score');
const card = document.getElementById('card');
const showScore = document.getElementById('showscore');

let shuffledQuestions, currentQuestionIndex, i;

startGames.addEventListener('click', startGame);
// restartButton.addEventListener('click', startGame);
showScore.addEventListener('click', function () {
  card.classList.remove('d-none');
  displayQuiz.classList.add('d-none');
});

backHome.addEventListener('click', function () {
  displayQuiz.classList.add('d-none');
  home.classList.remove('d-none');
  card.classList.add('d-none');
});

restartButton.addEventListener('click', function () {
  startGames();
  answerButtonsElement.classList.remove('d-none');
  card.classList.add('d-none');
});

function startGame() {
  home.classList.add('d-none');
  displayQuiz.classList.remove('d-none');
  // berguna untuk mengacak pertanyaan
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  i = 1;
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  //   // menampilkan pertanyaan
  questionElement.innerHTML = currentQuestionIndex + 1 + '. ' + question.question;

  // membuat elemnet button baru yang di isi dengan jawaban yang merujuk ke answer

  question.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.setAttribute('class', 'col-md-6 btn btn-outline-warning text-dark p-2');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  // menghilangkan button yang di html dan menyisakan button dari javascript:64
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  //   // memeriksa apakah masih ada pertanyaan atau tidak
  if (shuffledQuestions.length > currentQuestionIndex) {
    if (e.target.dataset.correct) {
      score.innerHTML = i++;
      setNextQuestion();
      answerButtonsElement.classList.remove('d-none');
      currentQuestionIndex++;
    } else {
      setNextQuestion();
      answerButtonsElement.classList.remove('d-none');
      currentQuestionIndex++;
    }
  } else {
    showScore.classList.remove('d-none');
    card.classList.remove('d-none');
    displayQuiz.classList.add('d-none');
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

const questions = [
  {
    question: 'Nama Ibu Kota Sumatera Selatan ?',
    answers: [
      { text: 'Lampung', wrong: false },
      { text: 'Palembang', correct: true },
      { text: 'Martapura', wrong: false },
      { text: 'Sumatra selatan', wrong: false },
    ],
  },
  {
    question: 'Nama Ibu Kota Jambi ?',
    answers: [
      { text: 'Lampung', wrong: false },
      { text: 'Jambi', correct: true },
      { text: 'Martapura', wrong: false },
      { text: 'Sumatra selatan', wrong: false },
    ],
  },
  {
    question: 'Kapan tanggal kemerdekaan Indonesia ?',
    answers: [
      { text: '18 September', wrong: false },
      { text: '17 Agustus', correct: true },
      { text: '22 Mei', wrong: false },
      { text: '1 Januari', wrong: false },
    ],
  },
  {
    question: 'Makanan Khas Palembang',
    answers: [
      { text: 'Nasi Uduk', wrong: false },
      { text: 'Bakso', wrong: false },
      { text: 'Ikan bakar', wrong: false },
      { text: 'Pempek', correct: true },
    ],
  },
  {
    question: 'Makanan Khas padang',
    answers: [
      { text: 'Pindang', wrong: false },
      { text: 'Rendang', correct: true },
      { text: 'Seruit', wrong: false },
      { text: 'Tekwan', wrong: false },
    ],
  },
  {
    question: 'Ibu kota DKI Jakarta',
    answers: [
      { text: 'Bogot', wrong: false },
      { text: 'Jakarta', correct: true },
      { text: 'Ambon', wrong: false },
      { text: 'Lontong', wrong: false },
    ],
  },
];
