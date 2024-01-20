// When DOM is loaded, run the game
// Event listeners

const startButton = document.getElementById('start-btn')
const startContainer = document.getElementById('start-container')
const questionContainerElemnt = document.getElementById('question-container')
const controlContainerElemnt = document.getElementById('controls')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const nextButton = document.getElementById('next-btn')
let shuffledQuestions,  currentQuestionIndex


startButton.addEventListener('click', startGame)

function startGame(){
    startButton.classList.add("hide")
    startContainer.classList.add("hide")
    questionContainerElemnt.classList.remove('hide')
    controlContainerElemnt.classList.remove('hide')  
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    setNextQuestion()

}

function setNextQuestion(){
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
      const button = document.createElement('button')
      button.innerText = answer.text
      button.classList.add('btn')
      if (answer.correct) {
        button.dataset.correct = answer.correct
      }
      button.addEventListener('click', selectAnswer)
      answerButtonsElement.appendChild(button)
    })
  }
  function resetState(){
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
  }


function selectAnswer(e){
    const selectedButton = e.target
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
          // Check if the data-correct attribute is true
          const isCorrect = button.getAttribute('data-correct') === 'true';
      
          // Display a message based on the result
          if (isCorrect) {
            alert('Correct!');
          } else {
            alert('Incorrect!');
          }
        });
      });
}

function checkAnswer(option){
    
    
}




const questions =[
 {
question:'54.When driving at 6 knots or more in a powered vessel, what is the minimum distance you must keep from moored vessels where possible?',
answers:[
    {text: 'A. 30 metres', correct: true},
    {text: 'B. 10 metres', correct: false},
    {text: 'C. 20 metres', correct: false}
    ],
},
{
question:'61.Looking at the cardinal mark pictured, what would be the safest side to drive your vessel?',
answers:[
    {text: 'A. East', correct: false},
    {text: 'B. North', correct: false},
    {text: 'C. West', correct: true}
],
},
 {
question:'102.Vessel A is using its sails and vessel B is using its engine. Who must give way?',
answers:[
    {text: 'A. Whichever vessel is travelling the slowest', correct: false}, 
    {text: 'B. Vessel B  the powered vessel', correct: true},
    {text: 'C. Vessel A  the sailing vessel', correct: false}
]
 },
]

