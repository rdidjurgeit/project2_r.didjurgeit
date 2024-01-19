// When DOM is loaded, run the game
// Event listeners

const startButton = document.getElementById('start-btn')
const startContainer = document.getElementById('start-container')
const questionContainerElemnt = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('andswer-buttons')
let shuffledQuestions,  currentQuestionIndex


startButton.addEventListener('click', startGame)

function startGame(){
    startButton.classList.add("hide")
    startContainer.classList.add("hide")
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide') 
    setNextQuestion()

}

function setNextQuestion(){
    showQuestion(shuffledQuestions[currentQuestionIndex])
}
function showQuestion(question){
 questionElement.innerText = question.question
}

function selectAnswer(){

}

const questions =[
 {
question:"54.When driving at 6 knots or more in a powered vessel, what is the minimum distance you must keep from moored vessels where possible?",
    options:[
    {text: "A. 30 metres", correct: true},
    {text: "B. 10 metres", correct: false},
    {text: "C. 20 metres", correct: false}
    ],
imageUrl:"/assets/images/54q.JPG"
},
{
question:"61.Looking at the cardinal mark pictured, what would be the safest side to drive your vessel?",
options:[
    {text: "A. East", correct: false},
    {text: "B. North", correct: false},
    {text: "C. West", correct: true}
],
imageUrl:"/assets/images/61q.JPG"
},
 {
question:"102.Vessel A is using its sails and vessel B is using its engine. Who must give way?",
options:[
    {text: "A. Whichever vessel is travelling the slowest", correct: false}, 
    {text: "B. Vessel B  the powered vessel", correct: true},
    {text: "C. Vessel A  the sailing vessel", correct: false}
],
correctAnswer:"B. Vessel B  the powered vessel",
imageUrl:"/assets/images/102q.JPG"
 },
]

