// element variables
var timerEl = document.querySelector('.time');
var startButton = document.querySelector('.start-button');
var quizContainer = document.querySelector('.quiz');
var questionContainer = document.querySelector('.question-container');
var answerContainer = document.querySelector('.answer-container');
var resultsContainer = document.querySelector('.results');
var scoreResult = document.querySelector('.score');
var initials = document.querySelector('.initials');
var submitButton = document.querySelector('.submit-button');
var highscoreContainer = document.querySelector('.highscore-container');
var resetButton = document.querySelector('.reset-button');


var timerCount;
var currentQuestionNumber = 0;
var numCorrect = 0;
var score = 0;
var initialsInput;
var answers = myQuestions.answers

var currentQuestion = [];


// quiz questions
var myQuestions = [
   {
      question: 'What year did the Florida Gators win the national championship in both football and basketball?',
        answers: {
         a: '2005',
         b: '2006',
         c: '2007',
         d: '2008',
        },
        correctAnswer: 'b'
   },
   {
      question: 'Who is the current head coach for the Gators?',
        answers: {
         a: 'Billy Napier',
         b: 'Steve Spurier',
         c: 'Urban Meyer',
         d: 'Dan Mullen',
      },
      correctAnswer: 'a'
   },
   {
      question: 'Which quarterback gave the infamous post game speech and won the national championship that same year?',
      answers: {
         a: 'Chris Leak',
         b: 'Kyle Trask',
         c: 'Tim Tebow',
         d: 'Cam Newton',
      },
      correctAnswer: 'c'
   },
   {
      question: 'Which Florida Gator earned the knickname "Joker"?',
      answers: {
         a: 'Kyle Pitts',
         b: 'Percy Harvin',
         c: 'Aaron Hernandez',
         d: 'Kadarius Toney',
      },
      correctAnswer: 'd'
   }
];

function reset() {
   // Reset game variables
   currentQuestionIndex = 0;
   score = 0;
 
}
 

// starts the game/timer
function startGame() {
   timerCount = 10;
   startTimer();
   showQuiz();
}

// sets the timer
function startTimer() {
   timer = setInterval(function() {
       timerCount--;
       timerEl.textContent = timerCount;
       if (timerCount === 0) {
           clearInterval(timer);
           questionContainer.innerHTML = '<div>Sorry you ran out of time. Click start to try again.</div>';
           startButton.style.display = 'block';
        }
     }, 1000);
}

function showQuiz() {
   var currentQuestion = myQuestions[currentQuestionNumber];
   var output = [];
   var answerButtons = [];
 
   for (letter in currentQuestion.answers) {
     var isCorrect = (letter === currentQuestion.correctAnswer);
       answerButtons.push(
          '<button class="answer-button" onclick="checkAnswer(this)" name="question' + currentQuestionNumber + '" value="' + letter + '" data-correct="' + isCorrect + '">' + letter + ': ' + currentQuestion.answers[letter] + '</button>'
         );
   }
 
   output.push(
     '<div class="question">' + currentQuestion.question + '</div>' +
     '<div class="answer-container">' + answerButtons.join('') + '</div>'
   );
 
   questionContainer.innerHTML = output.join('');
}
 


function nextQuestion() {
  currentQuestionNumber++; // update currentQuestionNumber

  if (currentQuestionNumber >= myQuestions.length) { // use currentQuestionNumber instead of index
    clearInterval(timer);
    showResults();
   } else {
    showQuiz();
   }
}

function checkAnswer(button) {
  var userAnswer = button.value;
  var isCorrect = button.dataset.correct === 'true';

  if (isCorrect) {
    score++;
    button.classList.add('correct');
   } else {
    button.classList.add('incorrect');
   }

  var answerButtons = document.querySelectorAll('.answer-button');
  answerButtons.forEach(function(button) {
    button.disabled = true;
   });

  setTimeout(nextQuestion, 1000);
}

function showResults() {
  var numCorrect = score;
  scoreResult.innerHTML = 'You got ' + numCorrect + ' out of ' + myQuestions.length + ' correct!';
  resultsContainer.classList.remove('results');
}

function highscore(event) {
   event.preventDefault();
   var output = [];
   var newHighscore = {
      initials: document.querySelector('#initials').value,
      score: score
   };
   
   // create highscore container element, 
   output.push(
      '<div class="highscore-container">' +
        '<h2>Highscore</h2>' +
        '<p>Initials: ' + newHighscore.initials + '</p>' +
        '<p>Score: ' + newHighscore.score + '</p>' +
      '</div>'
   );
    

   quizContainer.style.display = "none";
   resultsContainer.style.display = "none";
   resetButton.style.display = "block";
}
    

 

startButton.addEventListener('click', startGame);
submitButton.addEventListener('click', highscore);
// resetButton.addEventListener('click', reset);
