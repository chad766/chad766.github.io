document.addEventListener('DOMContentLoaded', function () {
  // Array with texts to type in the typewriter
  var dataText = [
    "Welcome to my portfolio. I'm a Business Management graduate with a strong interest in business analysis, consulting, and organisational change and transformation. This space showcases key parts of my university journey, personal projects, and growing technical skills. I created it to reflect both my curiosity and my commitment to continuous improvement. I’m always open to new opportunities and collaboration. Feel free to reach out if you'd like to connect. And thanks for visiting! (This site is a work-in-progress. Just like me.)"
  ];

  // Variables to track typing progress
  var currentTextIndex = 0;
  var currentCharIndex = 0;
  var typingPaused = false;
  var typingInterval = 40; // Desired typing speed in milliseconds , changed to 60 from 80 based on feedback 
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
