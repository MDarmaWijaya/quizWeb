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
const expression = document.getElementById('expression');

let shuffledQuestions, currentQuestionIndex, i;

startGames.addEventListener('click', startGame);
// restartButton.addEventListener('click', startGame);
showScore.addEventListener('click', function () {
  displayQuiz.classList.remove('d-none');
  card.classList.remove('d-none');
  displayQuiz.classList.add('d-none');
  if (score.textContent == 100) {
    expression.innerHTML = 'Kamu Indonesia Banget !!!';
  } else if (score.textContent > 80) {
    expression.innerHTML = 'Good Job, Belajar lagi ya !!!';
  } else if (score.textContent > 60) {
    expression.innerHTML = 'Kurang Greget Kamuu !!!';
  } else if (score.textContent < 50) {
    expression.innerHTML = 'Kamu kurang Aqua';
  }
});

backHome.addEventListener('click', function () {
  displayQuiz.classList.add('d-none');
  home.classList.remove('d-none');
  card.classList.add('d-none');
});

restartButton.addEventListener('click', function () {
  answerButtonsElement.classList.remove('d-none');
  card.classList.add('d-none');
  startGame();
});

function startGame() {
  home.classList.add('d-none');
  displayQuiz.classList.remove('d-none');
  // berguna untuk mengacak pertanyaan
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  i = 0;
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
      i++;
      score.innerHTML = i * 10;
      answerButtonsElement.classList.remove('d-none');
      currentQuestionIndex++;
      setNextQuestion();
    } else {
      answerButtonsElement.classList.remove('d-none');
      currentQuestionIndex++;
      setNextQuestion();
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
      { text: 'Palembang', correct: true },
      { text: 'Lampung', wrong: false },
      { text: 'Martapura', wrong: false },
      { text: 'Sumatra selatan', wrong: false },
    ],
  },
  {
    question: 'Nama Ibu Kota Jambi ?',
    answers: [
      { text: 'Lampung', wrong: false },
      { text: 'Sumatra selatan', wrong: false },
      { text: 'Jambi', correct: true },
      { text: 'Martapura', wrong: false },
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
    question: 'Makanan Khas Palembang?',
    answers: [
      { text: 'Pempek', correct: true },
      { text: 'Bakso', wrong: false },
      { text: 'Ikan bakar', wrong: false },
      { text: 'Nasi Uduk', wrong: false },
    ],
  },
  {
    question: 'Makanan Khas padang?',
    answers: [
      { text: 'Pindang', wrong: false },
      { text: 'Rendang', correct: true },
      { text: 'Seruit', wrong: false },
      { text: 'Tekwan', wrong: false },
    ],
  },
  {
    question: 'Ibu kota DKI Jakarta ?',
    answers: [
      { text: 'Bogor', wrong: false },
      { text: 'Ambon', wrong: false },
      { text: 'Jakarta', correct: true },
      { text: 'Lontong', wrong: false },
    ],
  },
  {
    question: 'Ibu kota Jawa Barat',
    answers: [
      { text: 'Jakarta', wrong: false },
      { text: 'Bandung', correct: true },
      { text: 'Ambon', wrong: false },
      { text: 'Medan', wrong: false },
    ],
  },
  {
    question: 'Tari Saman Berasal Dari ?',
    answers: [
      { text: 'Australia', wrong: false },
      { text: 'Jakarta', wrong: false },
      { text: 'Papua', wrong: false },
      { text: 'Aceh', correct: true },
    ],
  },
  {
    question: 'Sunda merupakan suku dari ?',
    answers: [
      { text: 'Jawa Timur', wrong: false },
      { text: 'Bali', wrong: false },
      { text: 'Jawa Barat', correct: true },
      { text: 'Belitang', wrong: false },
    ],
  },
  {
    question: 'Dimanakah letak dari Monas ?',
    answers: [
      { text: 'Taman Tani Merdeka', wrong: false },
      { text: 'Belitang', wrong: false },
      { text: 'Talang sipin', wrong: false },
      { text: 'DKI Jakarta', correct: true },
    ],
  },
];
