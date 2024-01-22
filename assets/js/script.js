// When DOM is loaded, run the game
// Event listeners

const startButton = document.getElementById("start-btn");
const startContainer = document.getElementById("start-container");
const questionContainerElemnt = document.getElementById("question-container");
const controlContainerElemnt = document.getElementById("controls");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

//Will make the question be scuffled and not show in the same order use Let instead of const other wise he will not be a variable that can populated.
let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
  nextButton.classList.add("hide");
});

//Game Start
function startGame() {
  addClassList()
  removeClassList()
  //Will sort the question
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  //reset score from previous game.
  zeroScore()
  setNextQuestion();
}

function addClassList(){
  startButton.classList.add("hide");
  startContainer.classList.add("hide");
  nextButton.classList.add("hide");
}

function removeClassList(){
  questionContainerElemnt.classList.remove("hide");
  controlContainerElemnt.classList.remove("hide");
}

function zeroScore(){
  document.getElementById("score").innerText = 0;
  document.getElementById("incorrect").innerText = 0;
}

function setNextQuestion() {
  resetState();
  //show Question at the corrent question Index
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

//Show question fon the List
function showQuestion(question) {
  //Made so the text inside is populate by info from question
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    //Great Button so the text inside is populate by info from question
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  try{
    const selectedButton = e.target;
    //collect all btn data
    const buttons = document.querySelectorAll(".btn");
    // Check if the data-correct attribute is true
    const isCorrect = selectedButton.getAttribute("data-correct") === "true";
    selectedButton.style.backgroundColor = isCorrect ? "green" : "red";
    // Display a message based on the result
    if (isCorrect) {
    incrementScore();
    } else {
    incrementWrongAnswer();
    }
    buttons.forEach((disableButton) => {
      disableButton.disabled = true;
      //It check if it is the lest question and let restart the game
      if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove("hide");
      } else {
      startButton.innerText = "Restart";
      startButton.classList.remove("hide");
      }
  });
  } catch {
    alert('Error Reload')
  }
}

//FUnction to Increment Score  Correct and Incorrect
function incrementScore() {
  let oldScore = parseInt(document.getElementById("score").innerText);
  document.getElementById("score").innerText = ++oldScore;
  if (oldScore >= 4) {
    alert("You Pass");
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function incrementWrongAnswer() {
  let oldScore = parseInt(document.getElementById("incorrect").innerText);
  document.getElementById("incorrect").innerText = ++oldScore;
  if (oldScore >= 3) {
    alert("Finish you fail");
    startGame();
  }
}

//Constans List of question
const questions = [
  {
    question:
      "54.When driving at 6 knots or more in a powered vessel, what is the minimum distance you must keep from moored vessels where possible?",
    answers: [
      { text: "A. 30 metres", correct: true },
      { text: "B. 10 metres", correct: false },
      { text: "C. 20 metres", correct: false },
    ],
  },
  {
    question:
      "You are travelling towards a bridge, and read a sign giving the maximum vessel height (clearance height).When might this height be less than signposted??",
    answers: [
      { text: "A. During floods", correct: true },
      { text: "B. At low tide", correct: false },
      { text: "C. At night", correct: false },
    ],
  },
  {
    question:
      "102.Vessel A is using its sails and vessel B is using its engine. Who must give way?",
    answers: [
      { text: "A. Whichever vessel is travelling the slowest", correct: false },
      { text: "B. Vessel B  the powered vessel", correct: true },
      { text: "C. Vessel A  the sailing vessel", correct: false },
    ],
  },
  {
    question:
      "07.What should you consider about your vessel before travelling to open waters?",
    answers: [
      { text: "A. How your vessel performs when towing", correct: false },
      { text: "B. Whether your vessel is stable in enclosed waters", correct: false },
      { text: "C. Whether your vessel is suitable for large waves", correct: true },
    ],
  },
  {
    question:
      "12.What is an example of a tidal impact to consider when you are planning to go on the water?",
    answers: [
      { text: "A. Tide may indicate thunderstorms approaching", correct: false },
      { text: "B. No example, tides have no impact on boating", correct: false },
      { text: "C. Tide may impact your ability to launch or return to safe harbour", correct: true },
    ],
  },
  {
    question:
      "18.If keeping a proper lookout is difficult, you should:",
    answers: [
      { text: "A. Carry on anyway", correct: false },
      { text: "B. Speed up to get home quicker", correct: false },
      { text: "C. Slow down and assess the conditions", correct: true },
    ],
  },
  {
    question:
      "38.If you see a whale and its calf in the water ahead of your vessel you should:",
    answers: [
      { text: "A. Slow down or stop and maintain a distance of at least 300 metres", correct: true },
      { text: "B. Quickly turn off your motor", correct: false },
      { text: "C. Hold your course and wait for the whales to avoid you", correct: false },
    ],
  },
  {
    question:
      "66.Are you allowed to attach your vessel to a navigation aid or bridge?",
    answers: [
      { text: "A. Yes if it is a cardinal mark", correct: false },
      { text: "B. No", correct: true },
      { text: "C. Yes if it is high tide", correct: false },
    ],
  },
];
