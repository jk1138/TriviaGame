$(document).ready(function(){

    // start the game when user clicks on Start button
    $("#start-button").on("click", gameState.startTimer);
  
  });
  
  // information about the state of game play
  var gameState = {
  
    // set the time at 90 seconds, and count down by 1 second
    timeRemaining : 90,
  
    // start the timer, hide the start page, show the questions
    startTimer: function() {
      $("#timer").text("Time remaining: " + gameState.timeRemaining);
      setInterval(gameState.countdown, 1000);
      $("#start-page").hide();
      trivia.displayQuestions();
    },
  
    // decrement the timer and update the UI; stop the timer at 0
    countdown: function() {
      gameState.timeRemaining--;
      $("#timer").text("Time remaining: " + gameState.timeRemaining);
      if (gameState.timeRemaining === 0) {
        gameState.stopTimer();
        $("#timer").empty();
      }
    },
  
    // stop the timer and check the answers
    stopTimer: function() {
      clearInterval();
      trivia.checkAnswers();
    },
  
    // hide the quetions and display the end page with results
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
  
  // functions to handle the building questions page and scoring
  var trivia = {
  
    // pull questions from the array of questions, loop through them, and append to UI
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
  
      // add a Done button to the end of the page and register its click handler
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
  
      // loop through to compare the text of the label with the user answers
      // increment score counts appropriately
      for (var i = 0; i < questionBank.length; i++) {
        correctAnswer = questionBank[i].correct;
        userAnswer = $('input[id=radio'+i+']:checked + label').text();
  
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
  
      // show the end page with the score tally
      gameState.showEndPage(numCorrect, numIncorrect, numUnanswered);
    },
  }
  
  // array of objects with the questions, possible answers, and the correct answer
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