//we are making sure the page doen't run until it is ready 
$(document).ready(function(){

  // start the game when user clicks on Start button
  $("#start-button").on("click", gameState.startTimer);

});

// we are creating a variable to see the state of the game
var gameState = {

  // now we are setting the timer to 90 seconds
  timeRemaining : 90,

  // Create a function so when we start the timer it hides the start page and shows the questions
  startTimer: function() {
    $("#timer").text("Time remaining: " + gameState.timeRemaining);
    setInterval(gameState.countdown, 1000);
    $("#start-page").hide();
    trivia.displayQuestions();
  },

  // Create a function that decreases the time and and when the time stops game ends.
  countdown: function() {
    gameState.timeRemaining--;
    $("#timer").text("Time remaining: " + gameState.timeRemaining);
    if (gameState.timeRemaining === 0) {
      gameState.stopTimer();
      $("#timer").empty();
    }
  },

  // when time is stopped we check the answers 
  stopTimer: function() {
    clearInterval();
    trivia.checkAnswers();
  },

  // Now we move onto the result/end page--> hide the quetions and show the results
  showEndPage: function(numCorrect, numIncorrect, numUnanswered) {
    $("#end-page").show();
    $("#questions-box").empty();
    $("#timer").empty();
    $("#timer").hide();
    $("#correct-answers").text("Correct answers: " + numCorrect);
    $("#incorrect-answers").text("Incorrect answers: " + numIncorrect);
    $("#unanswered").text("Skipped questions: " + numUnanswered);
  }
}

// Create a function to to build the question page from the question bank and determine what is the correct answer
var trivia = {
  displayQuestions: function() {
    var divContainer = $("#questions-box");
    var answerGroup = $(".form-check");
    divContainer.append('<h2>Answer the following questions:</h2>');
            
    for (var i = 0; i < questionBank.length; i++) {
      divContainer.append('<div id="question">' + questionBank[i].question + '</div>');

      var answer1 = questionBank[i].answers[0];
      var answer2 = questionBank[i].answers[1];
      var answer3 = questionBank[i].answers[2];

      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer1 + '</label></div>');
      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer2 + '</label></div>');
      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer3 + '</label></div>');
    }

    // done button with click event that registers the games state
    var doneButton = '<button class="btn btn-primary" id="done-button" type="submit">Done</button>';
    divContainer.append(doneButton);
    $("#done-button").on("click", gameState.stopTimer);
  },

  // test if the user answers are correct, incorrect, or if there are unanswered questions
  checkAnswers: function() {
    var correctAnswer;
    var userAnswer;
    var numCorrect = 0;
    var numIncorrect = 0;
    var numUnanswered = 0;

    // for loop  so i can see how many of the radiolabels match to the users choice
    // 
    for (var i = 0; i < questionBank.length; i++) {
      correctAnswer = questionBank[i].correct;
      userAnswer = $('input[id=radio'+i+']:checked + label').text();
      //tally information  with ++ for correct, unanswered and incorrect
      if (userAnswer === correctAnswer) {
        numCorrect++;
      } else if (userAnswer === "") {
        numUnanswered++;
      } else if (userAnswer !== correctAnswer) {
        {
          numIncorrect++;
        }
      }
    }

    // Results page
    gameState.showEndPage(numCorrect, numIncorrect, numUnanswered);
  },
}

// array was created for the variable questionBank. I created questions, possible answers, and the correct answers--> all of these become objects
var questionBank =
[
  {
    question: "Where is Bob's Burgers the resturant located?",
    answers: ["Wonder Warf Street", "Ocean Avenue", "Kings Head Island"],
    correct: "Ocean Avenue"
  },

  {
    question: "Which Bob's Burger's customer lives next door?",
    answers: ["Mort", "Teddy", "Mr. Fischoeder"],
    correct: "Mort"
  },
  {
    question: "What was the name of Tina's ghost boyfriend?",
    answers: ["Ben", "Jeff", "Alex"],
    correct: "Jeff"
  },
  {
    question: "What was the name of the biker gang that befriends the Belchers?",
    answers: ["Buzzard Kings", "The Warfland Outlaws","One Eyed Snakes"],
    correct: "One Eyed Snakes"
  },
  {
    question: "Who did Linda almost marry?",
    answers: ["Hugo", "Ron", "Teddy"],
    correct: "Hugo"
  },
  {
    question: "what was the name of the underground casino made by the children during Fleet Week?",
    answers: ["The Meatgrinder", "The Atlantic Burger", "The Sunny Sideup"],
    correct: "The Meatgrinder"
  },
  {
    question: "Who was the oldest Pesto twin?",
    answers: ["Ollie", "Jimmy Jr.", "Andy"],
    correct: "Ollie"
  },
  {
    question: "Who is Linda's best friend but has yet to make a cameo on the show?",
    answers: ["Liz", "Monica", "Ginger"],
    correct: "Ginger"
  },
  {
    question: "What dish does Linda's Mother add to the menu while Bob was stuck in the crawl space?",
    answers: ["Greens Greens,Get Your Greens (veggie burger)", "The Tunami (tuna burger)", "Silence of the Lambs Burger (lamb chop burger)"],
    correct: "The Tunami (tuna burger)"
  },
  {
    question: "Which Boyz4now member did Louise fall in love with?",
    answers: ["Griffin", "Allen","Boo Boo"],
    correct: "Boo Boo"
  }
]

