$(document).ready(function() {
  var winCount = 0;
  var lossCount = 0;
  var guessCount = 0;
  var guessChars = [];

  var alphabets = "abcdefghijklmnopqrstuvwxyz".split("");
  var randomChar = "";
  var startFlag = true;

  var initGame = () => {
    winCount = 0;
    lossCount = 0;
    guessCount = 9;
    guessChars = [];
  };

  var updateCounters = () => {
    $("#winCount").text(winCount);
    $("#lossCount").text(lossCount);
    $("#guessCount").text(guessCount);
  };

  var updateGuessChars = () => {
    $("#guessChars").text(guessChars);
  };

  var genRandomChar = () => {
    return alphabets[Math.floor(Math.random() * alphabets.length + 1)];
  };

  var showError = err => {
    $(".modal-title").text("Loser!");
    addElem("<p>", ".modal-body", err);

    // Show the dialog & play the sound
    $("#overlay").modal("show");

    // Hide the dialog after 3 seconds
    setTimeout(function() {
      $("#overlay").modal("hide");
      $(".modal-body").empty();
    }, 3000);
  };

  var addElem = (elTag, elClass, elText) => {
    var newElem = $(elTag);
    newElem.text(elText);
    $(elClass).append(newElem);
  };

  var showResult = result => {
    var sound = new Audio();

    // Play a different sound in case of lose and win
    // Display differnt messages as well
    if (result === "lose") {
      sound.src = "./assets/sound/Loser.mp3";
      $(".modal-title").text("Loser!!");
      addElem("<p>", ".modal-body", "Beat me if you can!");
    } else {
      sound.src = "./assets/sound/WooHoo.mp3";
      $(".modal-title").text("You Win!!");
      addElem("<p>", ".modal-body", "Beat me again if you can!");
    }
    // Show the dialog & play the sound
    $("#overlay").modal("show");
    sound.play();

    // Hide the dialog after 3 seconds
    setTimeout(function() {
      $("#overlay").modal("hide");
      $(".modal-body").empty();
    }, 3000);
  };

  $(document).keyup(function(e) {
    // Start the when space key press
    var guessKey = e.key;

    if (startFlag) {
      initGame();
      updateCounters();
      updateGuessChars();

      randomChar = genRandomChar();
      console.log("Char: " + randomChar);
      startFlag = false;

      $("#start").empty();
    } else {
      console.log("User Char: " + guessKey);
      if (alphabets.includes(guessKey)) {
        if (guessKey === randomChar) {
          winCount++;
          guessCount = 9;
          guessChars = [];

          showResult("win");
          updateCounters();
          updateGuessChars();

          randomChar = genRandomChar();
          console.log("Char: " + randomChar);
        } else {
          if (!guessChars.includes(guessKey)) {
            guessCount--;
            guessChars.push(guessKey);

            if (guessCount === 0) {
              lossCount++;
              guessCount = 9;
              guessChars = [];

              showResult("lose");
              randomChar = genRandomChar();
              console.log("Char: " + randomChar);
            }

            updateCounters();
            updateGuessChars();
          } else {
            showError("Losing one chance wasn't enough?");
          }
        }
      } else {
        showError("Alphabets only dummy!");
      }
    }
  });
});
