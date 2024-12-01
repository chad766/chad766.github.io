document.addEventListener('DOMContentLoaded', function () {
  // Array with texts to type in the typewriter
  var dataText = [
    "Welcome to my portfolio. This is a place I created to show my interests and university journey. If you would like to collaborate please do reach out as I love to meet new people. Please also feel free to take a look around although some parts are still under construction."
  ];

  // Variables to track typing progress
  var currentTextIndex = 0;
  var currentCharIndex = 0;
  var typingPaused = false;
  var typingInterval = 80; // Desired typing speed in milliseconds
  var typingTimeout; // Variable to hold the timeout reference

  // Function to type one text in the typewriter
  function typeWriter() {
    if (typingPaused || currentCharIndex >= dataText[currentTextIndex].length) {
      return; // Stop typing if paused or text is complete
    }

    document.querySelector("h1").innerHTML =
      dataText[currentTextIndex].substring(0, currentCharIndex + 1) + '<span aria-hidden="true"></span>';

    currentCharIndex++; // Increment character index

    typingTimeout = setTimeout(typeWriter, typingInterval); // Call again for the next character
  }

  // Function to start typing
  function startTyping() {
    if (!typingPaused && currentCharIndex < dataText[currentTextIndex].length) {
      clearTimeout(typingTimeout); // Clear any previous timeout
      typingTimeout = setTimeout(typeWriter, typingInterval); // Start with consistent speed
    }
  }

  // Intersection Observer to detect visibility
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          typingPaused = false; // Resume typing
          startTyping(); // Ensure typing starts when visible
        } else {
          typingPaused = true; // Pause typing
          clearTimeout(typingTimeout); // Clear timeout to stop typing
        }
      });
    },
    { threshold: 0.1 } // Trigger when at least 10% of the element is visible
  );

  // Observe the h1 element
  var h1Element = document.querySelector("h1");
  observer.observe(h1Element);

  // Start the initial typing
  startTyping();
});
