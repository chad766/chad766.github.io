document.addEventListener('DOMContentLoaded', function () {
  var dataText = [
    "Welcome to my portfolio.<br><br>I'm a Business Management graduate with a strong interest in business analysis, process improvement, and change and transformation.<br><br>This space showcases key parts of my university journey, and my commitment to continuous improvement.<br><br>Feel free to reach out and connect, as I would love to help you achieve your business improvement goals."
  ];

  var currentTextIndex = 0;
  var currentCharIndex = 0;
  var typingPaused = false;
  var typingInterval = 40; // ms between characters
  var typingTimeout;

  function typeWriter() {
    if (typingPaused || currentCharIndex >= dataText[currentTextIndex].length) {
      return;
    }

    // Handle HTML tags (e.g. <br>) so they appear instantly, not letter by letter
    if (dataText[currentTextIndex].substring(currentCharIndex, currentCharIndex + 4) === '<br>') {
      currentCharIndex += 4; // skip the tag
      document.querySelector("h1").innerHTML += '<br>'; // instantly add the break
    } else {
      document.querySelector("h1").innerHTML +=
        dataText[currentTextIndex].charAt(currentCharIndex);
      currentCharIndex++;
    }

    typingTimeout = setTimeout(typeWriter, typingInterval);
  }

  function startTyping() {
    if (!typingPaused && currentCharIndex < dataText[currentTextIndex].length) {
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(typeWriter, typingInterval);
    }
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          typingPaused = false;
          startTyping();
        } else {
          typingPaused = true;
          clearTimeout(typingTimeout);
        }
      });
    },
    { threshold: 0.1 }
  );

  var h1Element = document.querySelector("h1");
  observer.observe(h1Element);
  startTyping();
});
