// When DOM is loaded, run the game
// Event listeners

const startButton = document.getElementById('start-btn')
const startContainer = document.getElementById('start-container')
const questionContainerElemnt = document.getElementById('question-container')
const controlContainerElemnt = document.getElementById('controls')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const nextButton = document.getElementById('next-btn')

//Will make the question be scuffled and not show in the same order use Let instead of const other wise he will not be a variable that can populated.
let shuffledQuestions,  currentQuestionIndex


startButton.addEventListener('click', startGame)
nextButton. addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
    nextButton.classList.add('hide')
})
//Game Start
function startGame(){
    startButton.classList.add("hide")
    startContainer.classList.add("hide")
    nextButton.classList.add('hide')
    questionContainerElemnt.classList.remove('hide')
    controlContainerElemnt.classList.remove('hide') 
    //Will sort the question  
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    //reset score from previous game.
    document.getElementById('score').innerText= 0;
    document.getElementById('incorrect').innerText= 0;
    setNextQuestion()
}

function setNextQuestion(){
    resetState()
    //show Question at the corrent question Index
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

//Show question fon the List
function showQuestion(question) {
    //Made so the text inside is populate by info from question
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
      const button = document.createElement('button')

       //Great Button so the text inside is populate by info from question
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
    //collect all btn data
    const buttons = document.querySelectorAll('.btn');

   
        
          // Check if the data-correct attribute is true
          const isCorrect = selectedButton.getAttribute('data-correct') === 'true';

          selectedButton.style.backgroundColor = isCorrect ? 'green' : 'red';
          // Display a message based on the result
          if (isCorrect) {
            incrementScore();
          } else {
            incrementWrongAnswer(); 
          }
          buttons.forEach(disableButton =>{
            disableButton.disabled = true ;
            //It check if it is the lest question and let restart the game 
            if (shuffledQuestions.length > currentQuestionIndex + 1) {
                nextButton.classList.remove('hide')
              } else {
                startButton.innerText = 'Restart'
                startButton.classList.remove('hide')
              }
          })      
      };


      //FUnction to Increment Score  Correct and Incorrect
function incrementScore() {

    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;

}

function incrementWrongAnswer() {

    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;

    if (oldScore>=3){
        alert('Finish')
        startGame()
    }
    
}

//Constans List of question
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

