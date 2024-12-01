const hamburger = document.querySelector(".nav__hamburger");
const linksContainer = document.querySelector(".nav__menu");
const links = document.querySelectorAll(".nav__menu__link");
const logo = document.querySelector(".nav__logo");

// Add the initial class to start off-screen
logo.classList.add("initial");

hamburger.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default anchor behavior
    linksContainer.classList.toggle("active");
    hamburger.classList.toggle("active");

    // Toggle the logo position class
    logo.classList.toggle("logo-active");
    logo.classList.toggle("initial");
});

// Function to close the menu if clicked outside
document.addEventListener("click", (event) => {
    if (!hamburger.contains(event.target) && !linksContainer.contains(event.target)) {
        closeMenu();
    }
});

// Close the menu when a link is clicked
links.forEach((link) => {
    link.addEventListener("click", () => {
        closeMenu();
    });
});

function closeMenu() {
    linksContainer.classList.remove("active");
    hamburger.classList.remove("active");
    logo.classList.remove("logo-active");
    logo.classList.add("initial");
}





/* Nav bar two colour change */
 // Select the nav bar and all links within it
 const nav = document.querySelector('.nav');
 const navLinks = document.querySelectorAll('.nav__menu li a');

 // Function to change all nav text to black on nav hover
 nav.addEventListener('mouseenter', () => {
     navLinks.forEach(link => link.style.color = 'black');
 });

 // Function to revert all nav text to white on nav mouse leave
 nav.addEventListener('mouseleave', () => {
     navLinks.forEach(link => link.style.color = 'white');
 });

 // Adding individual hover effects for each nav item
 navLinks.forEach(link => {
     link.addEventListener('mouseenter', () => {
         link.style.color = '#0070ad'; // Color for individual item hover
     });
     link.addEventListener('mouseleave', () => {
         link.style.color = 'black'; // Revert to black when leaving item hover
     });
 });







/* the below is all for the scroll starting the nav bar hover style. Up to line 150*/ 

document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav__menu li a');
    const logo = document.querySelector('.nav__logo');
    const hamburgerLines = document.querySelectorAll('.nav__hamburger__line'); // Select the hamburger lines
    let hasScrolled = false;
    let isHovering = false;

    // Function to activate the "hover" styles
    const activateHoverState = () => {
        if (!isHovering) {
            nav.style.background = "#ffffff";
            nav.style.color = "#0070ad";
            logo.style.color = "#0070ad";
            navLinks.forEach(link => link.style.color = "black");
            if (window.innerWidth <= 550) {
                hamburgerLines.forEach(line => line.style.backgroundColor = "#0070ad"); // Match logo color
            }
        }
    };

    // Function to deactivate the "hover" styles
    const deactivateHoverState = () => {
        if (!isHovering) {
            nav.style.background = "linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.01))";
            nav.style.color = "#fff";
            logo.style.color = "#fff";
            navLinks.forEach(link => link.style.color = "#fff");
            if (window.innerWidth <= 550) {
                hamburgerLines.forEach(line => line.style.backgroundColor = "white"); // Reset to white
            }
        }
    };

    // Scroll event listener
    window.addEventListener("scroll", () => {
        if (window.scrollY > 0 && !hasScrolled) {
            hasScrolled = true;
            activateHoverState();
        } else if (window.scrollY === 0 && hasScrolled) {
            hasScrolled = false;
            deactivateHoverState();
        }
    });

    // Event listeners for mouse hover
    nav.addEventListener("mouseenter", () => {
        isHovering = true;
        nav.style.background = "#ffffff";
        nav.style.color = "#0070ad";
        logo.style.color = "#0070ad";
        navLinks.forEach(link => link.style.color = "black");
        if (window.innerWidth <= 550) {
            hamburgerLines.forEach(line => line.style.backgroundColor = "#0070ad"); // Match logo color
        }
    });

    nav.addEventListener("mouseleave", () => {
        isHovering = false;
        if (window.scrollY > 0) {
            activateHoverState();
        } else {
            deactivateHoverState();
        }
    });
});


