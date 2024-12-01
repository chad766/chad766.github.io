

  

  document.addEventListener('DOMContentLoaded', function (event) {
  // Array with texts to type in the typewriter
  var dataText = ["Welcome to my portfolio. This is a place I created to show my interests and university journey. If you would like to collaborate please do reach out as I love to meet new people. Please also feel free to take a look around although some parts are still under construction."];

  // Function to type one text in the typewriter
  function typeWriter(text, i, fnCallback) {
    // Check if text isn't finished yet
    if (i < text.length) {
      // Add next character to h1
      document.querySelector("h1").innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"></span>';

      // Wait for a while and call this function again for the next character
      setTimeout(function () {
        typeWriter(text, i + 1, fnCallback);
      }, 80);
    } 
    // Text finished, call callback if there is a callback function
    else if (typeof fnCallback === 'function') {
      // Call callback after timeout
      setTimeout(fnCallback, 700);
    }
  }

  // Function to start a typewriter animation for a text in the dataText array
  function StartTextAnimation(i) {
    if (i < dataText.length) {
      // Text exists! Start typewriter animation
      typeWriter(dataText[i], 0, function () {
        // After callback (and whole text has been animated), start next text
        StartTextAnimation(i + 1);
      });
    } else {
      // After the last text, clear the screen and end
      setTimeout(function () {
      /*  document.querySelector("h1").innerHTML = ""; */ // Clear the screen
      }, 3000); // Optional delay before clearing the screen
    }
  }

  // Start the text animation
  StartTextAnimation(0);
});

