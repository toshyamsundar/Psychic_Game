$(document).ready(function() {
  var winCount = 0;
  var lossCount = 0;
  var guessCount = 0;
  var guessChars = [];

  var alphabets = "abcdefghijklmnopqrstuvwxyz".split("");
  var randomChar = "";
  var startFlag = false;

  $(document).keyup(function(e) {
    // Start the when space key press
    if (e.keyCode === 32) {
      winCount = 0;
      lossCount = 0;
      guessCount = 9;
      guessChars = [];

      $("#winCount").text(winCount);
      $("#lossCount").text(lossCount);
      $("#guessCount").text(guessCount);
      $("#guessChars").text(guessChars);

      randomChar = alphabets[Math.floor(Math.random() * alphabets.length) + 1];
      console.log("Char: " + randomChar);
      startFlag = true;
    }

    if (startFlag) {
      console.log("User Char: " + e.key);
      if (e.key === randomChar) {
        winCount++;
        guessCount = 9;
        guessChars = [];

        $("#winCount").text(winCount);
        $("#guessCount").text(guessCount);
        $("#guessChars").text(guessChars);

        randomChar = alphabets[Math.floor(Math.random() * alphabets.length) + 1];
        console.log("Char: " + randomChar);
      } else if (e.keyCode !== 32) {
        guessCount--;
        guessChars.push(e.key);

        if (guessCount === 0) {
          lossCount++;
          guessCount = 9;
          guessChars = [];

          randomChar = alphabets[Math.floor(Math.random() * alphabets.length) + 1];
          console.log("Char: " + randomChar);
        }

        $("#lossCount").text(lossCount);
        $("#guessCount").text(guessCount);
        $("#guessChars").text(guessChars);
      }
    } else {
      alert("Press SPACE key to start");
    }
  });
});
