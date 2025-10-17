window.onload = function () {
  let userName = sessionStorage.getItem("userName");
  if (userName) {
    document.getElementById("userNameDisplay").innerText = userName;
  }
};

let currentQuiz = 0;
let correctAnswerCount = 0;
let timerInterval;
let timeLeft = 30; 

const quizzes = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Hyper Text Preprocessor",
      "Hyper Text Multiple Language",
      "Hyper Tool Multi Language"
    ],
    correctAnswer: "Hyper Text Markup Language"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Creative Style System",
      "Colorful Style Syntax",
      "Computer Style Sheet"
    ],
    correctAnswer: "Cascading Style Sheets"
  },
  {
    question: "Who developed Java?",
    options: [
      "James Gosling",
      "Guido van Rossum",
      "Bjarne Stroustrup",
      "Dennis Ritchie"
    ],
    correctAnswer: "James Gosling"
  },
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Jupiter", "Mars", "Mercury"],
    correctAnswer: "Mars"
  }
];



const qCount = document.getElementById("qCount");
const questionEl = document.getElementById("questions");
const optionsEl = document.getElementById("options");
const timerDisplay = document.querySelector(".timer h3"); 

function loadQuiz() {
  const quiz = quizzes[currentQuiz];
  qCount.textContent = "Question " + (currentQuiz + 1)+"/"+(quizzes.length);
  questionEl.textContent = quiz.question;
  optionsEl.innerHTML = "";

  for (let i = 0; i < quiz.options.length; i++) {
  const opt = quiz.options[i];
  const div = document.createElement("div");
  div.className = "form-check mb-2";

  const input = document.createElement("input");
  input.type = "radio";
  input.className = "form-check-input";
  input.name = "quizOption";
  input.id = "option" + i;
  input.value = opt;

  const label = document.createElement("label");
  label.className = "form-check-label";
  label.htmlFor = "option" + i;
  label.textContent = opt;

      input.addEventListener("change", () => {
     
      const allLabels = optionsEl.querySelectorAll("label");
      allLabels.forEach(l => l.style.color = "black");

      if (input.value === quiz.correctAnswer) {
        input.style.backgroundColor = "green";
        label.style.color = "green"; 
      } else {
        label.style.color = "red";
      }
    });
  div.appendChild(input);
  div.appendChild(label);
  optionsEl.appendChild(div);
}


  resetTimer();
}

function resetTimer() {
  clearInterval(timerInterval);
  timeLeft = 30;
  updateTimerDisplay(timeLeft);

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      btnNext();
    }
  }, 1000);
}

function updateTimerDisplay(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function btnNext() {
  clearInterval(timerInterval);

  const selectedOption = document.querySelector('input[name="quizOption"]:checked');

  if (selectedOption) {
    const answer = selectedOption.value;
    const correct = quizzes[currentQuiz].correctAnswer;

    if (answer === correct) {
      correctAnswerCount++;
    }
  }
   const animationBox = document.getElementById("animation");
  animationBox.classList.remove("animate-slide");
  void animationBox.offsetWidth;
  animationBox.classList.add("animate-slide");


  currentQuiz++;

  if (currentQuiz < quizzes.length) {
    loadQuiz(); 
  } else {
    clearInterval(timerInterval);
    document.querySelector(".quzeSection").innerHTML = `
      <h2 class="text-success text-center">${correctAnswerCount} Answers Correct!</h2>
      <h2 class="text-success text-center">You've completed all quizzes!</h2>
    `;
    timerDisplay.textContent = "Done";
    document.getElementById("btnNext").style.display = "none";
  }
}


    loadQuiz();