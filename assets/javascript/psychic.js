$(document).ready(function() {
  var winCount = 0;
  var lossCount = 0;
  var guessCount = 0;
  var guessChars = [];

  var alphabets = "abcdefghijklmnopqrstuvwxyz".split("");
  var randomChar = "";
  var startFlag = true;

  $(document).keyup(function(e) {
    // Start the when space key press
    if (startFlag) {
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
      startFlag = false;

      $("#start").empty();
    } else {
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
      } else {
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
    }
  });
});
