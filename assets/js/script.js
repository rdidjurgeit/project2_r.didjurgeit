// Event listeners
// Event listeners
const startButton = document.getElementById("start-btn");
const startContainer = document.getElementById("start-container");
const questionContainerElemnt = document.getElementById("question-container");
const controlContainerElemnt = document.getElementById("controls");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");
const timerContainer = document.getElementById("timer-container");
const feedbackElement = document.getElementById("feedback");
const feedbackContainer = document.getElementById("feedback-container");
const hintButton = document.getElementById("hint-btn");
const reviewContainer = document.getElementById("review-container");
const reviewList = document.getElementById("review-list");

let shuffledQuestions, currentQuestionIndex;
let timer;
let wrongQuestions = [];
let gameFailed = false;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    if (!gameFailed) {
        currentQuestionIndex++;
        setNextQuestion();
        nextButton.classList.add("hide");
    }
});
hintButton.addEventListener("click", showHint);

function startGame() {
    gameFailed = false;
    addClassList();
    removeClassList();
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    zeroScore();
    wrongQuestions = [];
    startTimer(30);
    setNextQuestion();
}

function addClassList() {
    startButton.classList.add("hide");
    startContainer.classList.add("hide");
    nextButton.classList.add("hide");
    reviewContainer.classList.add("hide");
}

function removeClassList() {
    questionContainerElemnt.classList.remove("hide");
    controlContainerElemnt.classList.remove("hide");
    timerContainer.classList.remove("hide");
}

function zeroScore() {
    document.getElementById("score").innerText = 0;
    document.getElementById("incorrect").innerText = 0;
}

function setNextQuestion() {
    resetState();
    startTimer(30);
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
    if (question.hint) {
        hintButton.classList.remove("hide");
        hintButton.dataset.hint = question.hint;
    } else {
        hintButton.classList.add("hide");
    }
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    feedbackContainer.classList.add("hide");
}

function selectAnswer(e) {
    clearInterval(timer);
    const selectedButton = e.target;
    const buttons = document.querySelectorAll(".btn");
    const isCorrect = selectedButton.getAttribute("data-correct") === "true";

    buttons.forEach((button) => {
        if (button.dataset.correct === "true") {
            button.style.backgroundColor = "green";
        } else {
            button.style.backgroundColor = "red";
        }
        button.disabled = true;
    });

    feedbackContainer.classList.remove("hide");
    if (isCorrect) {
        feedbackElement.innerText = "Correct! Well done.";
        incrementScore();
    } else {
        feedbackElement.innerText = "Wrong! The correct answer is highlighted in green.";
        incrementWrongAnswer();
        wrongQuestions.push(shuffledQuestions[currentQuestionIndex]);
    }

    if (gameFailed || shuffledQuestions.length <= currentQuestionIndex + 1) {
        startButton.innerText = "Restart";
        startButton.classList.remove("hide");
        showReview();
    } else {
        nextButton.classList.remove("hide");
    }
}

function startTimer(duration) {
    let time = duration;
    timerElement.innerText = `${time} seconds left`;
    clearInterval(timer);
    timer = setInterval(() => {
        time--;
        timerElement.innerText = `${time} seconds left`;
        if (time <= 0) {
            clearInterval(timer);
            alert("Time's up!");
            startButton.innerText = "Restart";
            startButton.classList.remove("hide");
            showReview();
        }
    }, 1000);
}

function incrementScore() {
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;
    if (oldScore >= 7) {
        alert("You Pass");
        startButton.innerText = "Restart";
        startButton.classList.remove("hide");
        showReview();
    }
}

function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
    if (oldScore >= 4) {
        alert("Finish! You failed.");
        gameFailed = true;
        startButton.innerText = "Restart";
        startButton.classList.remove("hide");
        nextButton.classList.add("hide");
        showReview();
    }
}

function showHint() {
    const hint = hintButton.dataset.hint || "No hint available for this question.";
    alert(`Hint: ${hint}`);
}

function showReview() {
    reviewContainer.classList.remove("hide");
    reviewList.innerHTML = "";
    wrongQuestions.forEach((question, index) => {
        const li = document.createElement("li");
        li.innerText = `${index + 1}. ${question.question}`;
        reviewList.appendChild(li);
    });
}

const questions = [
  {
      question:
          "54.When driving at 6 knots or more in a powered vessel, what is the minimum distance you must keep from moored vessels where possible?",
      answers: [
          { text: "A. 30 metres", correct: true },
          { text: "B. 10 metres", correct: false },
          { text: "C. 20 metres", correct: false },
      ],
      hint: "Think about safety margins."
  },
  {
      question:
          "You are travelling towards a bridge, and read a sign giving the maximum vessel height (clearance height). When might this height be less than signposted?",
      answers: [
          { text: "A. During floods", correct: true },
          { text: "B. At low tide", correct: false },
          { text: "C. At night", correct: false },
      ],
      hint: "Consider natural conditions that affect water levels."
  },
  {
      question:
          "102.Vessel A is using its sails and vessel B is using its engine. Who must give way?",
      answers: [
          { text: "A. Whichever vessel is travelling the slowest", correct: false },
          { text: "B. Vessel B the powered vessel", correct: true },
          { text: "C. Vessel A the sailing vessel", correct: false },
      ],
      hint: "Sail before power!"
  },
  {
      question:
          "07.What should you consider about your vessel before travelling to open waters?",
      answers: [
          { text: "A. How your vessel performs when towing", correct: false },
          { text: "B. Whether your vessel is stable in enclosed waters", correct: false },
          { text: "C. Whether your vessel is suitable for large waves", correct: true },
      ],
      hint: "Open waters have large waves."
  },
  {
      question:
          "12.What is an example of a tidal impact to consider when you are planning to go on the water?",
      answers: [
          { text: "A. Tide may indicate thunderstorms approaching", correct: false },
          { text: "B. No example, tides have no impact on boating", correct: false },
          { text: "C. Tide may impact your ability to launch or return to safe harbour", correct: true },
      ],
      hint: "Tides affect launching."
  },
  {
      question:
          "18.If keeping a proper lookout is difficult, you should:",
      answers: [
          { text: "A. Carry on anyway", correct: false },
          { text: "B. Speed up to get home quicker", correct: false },
          { text: "C. Slow down and assess the conditions", correct: true },
      ],
      hint: "Safety comes first."
  },
  {
      question:
          "38.If you see a whale and its calf in the water ahead of your vessel you should:",
      answers: [
          { text: "A. Slow down or stop and maintain a distance of at least 300 metres", correct: true },
          { text: "B. Quickly turn off your motor", correct: false },
          { text: "C. Hold your course and wait for the whales to avoid you", correct: false },
      ],
      hint: "Respect marine life."
  },
  {
      question:
          "66.Are you allowed to attach your vessel to a navigation aid or bridge?",
      answers: [
          { text: "A. Yes if it is a cardinal mark", correct: false },
          { text: "B. No", correct: true },
          { text: "C. Yes if it is high tide", correct: false },
      ],
      hint: "Navigation aids are not for mooring."
  },
  {
      question:
          "91.What equipment is legally required on a powered vessel at night?",
      answers: [
          { text: "A. Navigation lights", correct: true },
          { text: "B. A whistle", correct: false },
          { text: "C. A radar", correct: false },
      ],
      hint: "Think about visibility at night."
  },
  {
      question:
          "110.What is the primary purpose of a marine radio?",
      answers: [
          { text: "A. To listen to music", correct: false },
          { text: "B. To communicate with other vessels and authorities", correct: true },
          { text: "C. To navigate", correct: false },
      ],
      hint: "Communication is key on water."
  },
  {
      question:
          "131.When should you file a float plan?",
      answers: [
          { text: "A. When going on extended trips", correct: true },
          { text: "B. Only during races", correct: false },
          { text: "C. Never", correct: false },
      ],
      hint: "Long trips need preparation."
  },
  {
      question:
          "145.What is the primary purpose of a bilge pump?",
      answers: [
          { text: "A. To clean the deck", correct: false },
          { text: "B. To remove water from the hull", correct: true },
          { text: "C. To power the engine", correct: false },
      ],
      hint: "Keeps the hull dry."
  },
  {
      question:
          "165.What action should you take when another vessel is approaching head-on?",
      answers: [
          { text: "A. Turn to port", correct: false },
          { text: "B. Turn to starboard", correct: true },
          { text: "C. Speed up", correct: false },
      ],
      hint: "Rules of the road apply."
  },
  {
      question:
          "182.What should you do if you run aground?",
      answers: [
          { text: "A. Rev the engine to free the boat", correct: false },
          { text: "B. Stop the engine and assess damage", correct: true },
          { text: "C. Jump off and push", correct: false },
      ],
      hint: "Safety first in emergencies."
  },
  {
      question:
          "195.What should you always check before starting the engine?",
      answers: [
          { text: "A. The weather forecast", correct: false },
          { text: "B. The oil level", correct: true },
          { text: "C. The radio", correct: false },
      ],
      hint: "Engine maintenance is key."
  }
];
