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
    options: ["Venus", "Mars", "Jupiter", "Mercury"],
    correctAnswer: "Mars"
  }
];

let currentQuiz = 0;
let correctAnswerCount = 0;
let timerInterval;
let timeLeft = 30; 

const qCount = document.getElementById("qCount");
const questionEl = document.getElementById("questions");
const optionsEl = document.getElementById("options");
const timerDisplay = document.querySelector(".timer h3"); 

function loadQuiz() {
  const quiz = quizzes[currentQuiz];
  qCount.textContent = "Question " + (currentQuiz + 1);
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
  timerDisplay.textContent = timeLeft + "s";

  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft + "s";

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      btnNext(); 
    }
  }, 1000);
}

function btnNext() {
  clearInterval(timerInterval);

  const selectedOption = document.querySelector('input[name="quizOption"]:checked');

  if (selectedOption) {
    const answer = selectedOption.value;
    const correct = quizzes[currentQuiz].correctAnswer;

    if (answer === correct) {
      alert(" Correct!");
      correctAnswerCount++;
    } else {
      alert(` Wrong! Correct answer: ${correct}`);
    }
  } else {
    loadQuiz();
  }

  currentQuiz++;
  if (currentQuiz < quizzes.length) {
    loadQuiz();
  } else {
    document.querySelector(".quzeSection").innerHTML = `
      <h2 class="text-success text-center">🎉 You completed all quizzes!</h2>
      <h3 class="text-primary text-center">You got ${correctAnswerCount} correct answers!</h3>
    `;
    timerDisplay.textContent = "✅ Done";
  }
}

// Start quiz
loadQuiz();
