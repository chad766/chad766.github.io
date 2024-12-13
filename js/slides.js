// Object to track the current slide index for each slideshow
let slideIndexes = {};

// Initialize all slideshows
document.querySelectorAll('.slideshow-container').forEach(slideshow => {
    const slideshowId = slideshow.id;
    slideIndexes[slideshowId] = 1; // Start each slideshow at the first slide
    showSlides(1, slideshowId);
});

// Modified navigation functions
function plusSlides(n, slideshowId) {
    const currentSlideIndex = slideIndexes[slideshowId];
    const slides = document.querySelectorAll(`#${slideshowId} .mySlides`);
    resetMediaStyles(slides[currentSlideIndex - 1].querySelector('img, video')); // Reset styles of current slide
    slideIndexes[slideshowId] += n;
    showSlides(slideIndexes[slideshowId], slideshowId);
}

function currentSlide(n, slideshowId) {
    const currentSlideIndex = slideIndexes[slideshowId];
    const slides = document.querySelectorAll(`#${slideshowId} .mySlides`);
    resetMediaStyles(slides[currentSlideIndex - 1].querySelector('img, video')); // Reset styles of current slide
    slideIndexes[slideshowId] = n;
    showSlides(slideIndexes[slideshowId], slideshowId);
}

// Function to show slides and update dots
function showSlides(n, slideshowId) {
    let slides = document.querySelectorAll(`#${slideshowId} .mySlides`);
    let dots = document.querySelectorAll(`#${slideshowId} .dot`);

    if (n > slides.length) {
        slideIndexes[slideshowId] = 1;
    }
    if (n < 1) {
        slideIndexes[slideshowId] = slides.length;
    }

    // Hide all slides and deactivate all dots
    slides.forEach(slide => {
        slide.style.display = 'none';
        const media = slide.querySelector('img, video');
        if (media) resetMediaStyles(media); // Reset styles for all media
    });
    dots.forEach(dot => dot.classList.remove('active1'));

    // Show the current slide and activate the corresponding dot
    const currentSlide = slides[slideIndexes[slideshowId] - 1];
    currentSlide.style.display = 'block';
    dots[slideIndexes[slideshowId] - 1].classList.add('active1');

    // Adjust media in fullscreen if applicable
    const media = currentSlide.querySelector('img, video');
    if (media && isFullscreenActive(slideshowId)) {
        adjustMediaToFullscreen(media);
    }
}

// Check if fullscreen mode is active
function isFullscreenActive(slideshowId) {
    return document.querySelector(`#${slideshowId}.fullscreen`) !== null;
}

// Fullscreen toggle logic
let isFullscreen = false;

function toggleFullscreen(media) {
    const parentSlide = media.closest('.slideshow-container');
    if (!isFullscreen) {
        // Enter fullscreen mode
        parentSlide.classList.add('fullscreen');
        document.body.style.overflow = 'hidden'; // Disable scrolling
        adjustMediaToFullscreen(media);
        isFullscreen = true;
    } else {
        // Exit fullscreen mode
        parentSlide.classList.remove('fullscreen');
        document.body.style.overflow = ''; // Re-enable scrolling
        resetMediaStyles(media);
        isFullscreen = false;
    }
}

function adjustMediaToFullscreen(media) {
    if (media.tagName === 'VIDEO') {
        adjustVideoToFullscreen(media);
    } else if (media.tagName === 'IMG') {
        adjustImageToFullscreen(media);
    }
}

function adjustVideoToFullscreen(video) {
    video.style.width = '100%';         // Scale the width to 100% of the viewport
    video.style.height = 'auto';       // Maintain aspect ratio
    video.style.objectFit = 'contain'; // Ensure the video fits inside the fullscreen container
    video.style.maxWidth = '100vw';    // Do not exceed the viewport width
    video.style.maxHeight = '100vh';   // Do not exceed the viewport height
    video.style.minWidth = '100vw';    // Enforce fullscreen width for smaller resolution videos
    video.style.minHeight = '100vh';   // Enforce fullscreen height for smaller resolution videos
}

function adjustImageToFullscreen(image) {
    const aspectRatio = image.naturalWidth / image.naturalHeight;
    const viewportRatio = window.innerWidth / window.innerHeight;

    if (aspectRatio > viewportRatio) {
        image.style.width = '100%';
        image.style.height = 'auto';
    } else {
        image.style.width = 'auto';
        image.style.height = '100%';
    }

    image.style.maxWidth = '100vw';
    image.style.maxHeight = '100vh';
    image.style.minWidth = '100vw';
    image.style.minHeight = '100vh';
}

function resetMediaStyles(media) {
    if (media) {
        media.style.width = '';
        media.style.height = '';
        media.style.maxWidth = '';
        media.style.maxHeight = '';
        media.style.minWidth = '';
        media.style.minHeight = '';
        media.style.objectFit = ''; // Reset object-fit for videos
    }
}

// Add event listeners for media click
document.addEventListener("DOMContentLoaded", () => {
    const slideshows = document.querySelectorAll('.slideshow-container');

    slideshows.forEach(slideshow => {
        const mediaItems = slideshow.querySelectorAll('.mySlides img, .mySlides video');

        mediaItems.forEach(item => {
            item.addEventListener('click', () => toggleFullscreen(item));
        });
    });
});

// Video play when visible and stop when not 
// Use Intersection Observer to control video playback
// Also has a pause button functionality when clicked however, no visual animation yet 
document.addEventListener("DOMContentLoaded", () => {
  const videos = document.querySelectorAll(".slideshow-container video");

  const observer = new IntersectionObserver(
      (entries) => {
          entries.forEach((entry) => {
              const video = entry.target;

              if (entry.isIntersecting && !video.hasAttribute("data-user-paused")) {
                  video.play();
              } else {
                  video.pause();
              }
          });
      },
      { threshold: 0.5 } // Trigger when 50% of the video is visible
  );

  videos.forEach((video) => {
      // Add observer to track visibility
      observer.observe(video);

      /* Add click event to toggle play/pause manually
      video.addEventListener("click", () => {
          if (video.paused) {
              video.play();
              video.removeAttribute("data-user-paused");
          } else {
              video.pause();
              video.setAttribute("data-user-paused", "true");
          }
      }); */
  });
});

// handles scroll and the offset makes it stop scrolling correctly 

document.addEventListener("DOMContentLoaded", function () {
    const hash = window.location.hash;

    if (hash) {
        const targetId = hash.substring(1);
        window.location.hash = '';

        // Scroll to top first
        window.scrollTo({ top: 0, behavior: "smooth" });

        setTimeout(() => {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                // Get the position of the element
                const topPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;

                // Adjust scroll position (e.g., subtract header height if necessary)
                const offset = 150; // Adjust this value as needed
                window.scrollTo({
                    top: topPosition - offset,
                    behavior: "smooth"
                });
            }
        }, 1200); // Adjust delay as needed
    }
});



