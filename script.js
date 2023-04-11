// element variables
var timerEl = document.querySelector('.time');
var startButton = document.querySelector('.start-button');
var quizContainer = document.querySelector('.quiz');
var questionContainer = document.querySelector('.question-container');
var answerContainer = document.querySelector('.answer-container');
var nextButton = document.querySelector('.next-button');
var resultsContainer = document.querySelector('.results');
var highscores = document.querySelector('.scoreForm');
var initials = document.querySelector('.initials');
var submitButton = document.querySelector('.submit-button');

// global function variables
var timer;
var timerCount;
var currentQuestion;
var index = 0;

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

// starts the game/timer
function startGame() {
   timerCount = 45;
   startTimer();
   showQuiz();

}

// sets the timer
function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerEl.textContent = timerCount;
        if (timerCount >= 0) {
        }
        if (timerCount === 0) {
            clearInterval(timer);
				questionContainer.innerHTML = '<div>Sorry you ran out of time. Click start to try again.</div>';
				startButton.style.display = 'block';
        }
    }, 1000);
}

// shows the quiz questions and answers
function showQuiz() {
	var currentQuestion = myQuestions[index];
	var output = [];
	var answers = [];

	for (letter in currentQuestion.answers) {
		 answers.push(
			  '<button class="answer-button" onclick="checkAnswer(this, ' + index + ')" name="question' + index + '"value="' + letter + '">' + letter + ': ' + currentQuestion.answers[letter] + '</button>'
		 );
	}

	output.push(
		'<div class="question">' + currentQuestion.question + '</div>' +
		'<div class="answer-container">' + answers.join('') + '</div>'
	);

	questionContainer.innerHTML = output.join('');
}

 
// checks answer and makes button green or red depending if correct or wrong 
function checkAnswer(button, questionNumber) {
	var userAnswer = button.value;
	var correctAnswer = myQuestions[questionNumber].correctAnswer;
	button.disabled = true;
	index++;

	if (index >= myQuestions.length) {
		clearInterval(timer);
		showResults();
	} else {
		showQuiz();
	}
}
 
// shows results and user can save their score
function showResults() {
	var numCorrect = 0;
	var answerButtons = document.querySelectorAll('.answer-button');
	
	answerButtons.forEach(function(button) {
		var userAnswer = button.value;
		var questionIndex = parseInt(button.getAttribute('name').slice(-1));
		var correctAnswer = myQuestions[questionIndex].correctAnswer;

		if (userAnswer === correctAnswer) {
			  numCorrect++;
			  button.classList.add('correct');
		} else {
			  button.classList.add('incorrect');
		}

		button.disabled = true;
	});

	quizContainer.style.display = 'none';
	resultsContainer.style.display = 'block';

	highscores.innerHTML = 'You got ' + numCorrect + ' out of ' + myQuestions.length + ' correct!';
	resultsContainer.style.display = 'block';
}

startButton.addEventListener('click', startGame);
