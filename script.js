// ===== SCROLL REVEAL =====

const sections = document.querySelectorAll(
    ".hero, .content-section"
);

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    { threshold: 0.15 }
);

sections.forEach((section) => {
    section.classList.add("reveal");
    observer.observe(section);
});

// ===== TYPING EFFECT =====

const subtitle = document.querySelector(".hero-subtitle");

const words = [
    "Future Developer.",
    "Creative Thinker.",
    "Future Builder."
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    if (!subtitle) return;

    const currentWord = words[wordIndex];

    subtitle.textContent = deleting
        ? currentWord.substring(0, charIndex--)
        : currentWord.substring(0, charIndex++);

    let speed = deleting ? 45 : 90;

    if (!deleting && charIndex > currentWord.length) {
        deleting = true;
        speed = 1300;
    }

    if (deleting && charIndex < 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        charIndex = 0;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();

// ===== ACTIVE NAVIGATION =====

const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 180) {
            current = section.id;
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + current
        );
    });
});

// ===== BACK TO TOP =====

const topButton = document.createElement("button");

topButton.textContent = "↑";
topButton.className = "back-to-top";
topButton.setAttribute("aria-label", "Back to top");

document.body.appendChild(topButton);

window.addEventListener("scroll", () => {
    topButton.classList.toggle(
        "visible",
        window.scrollY > 400
    );
});

topButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// ===== LOADING SCREEN =====

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    if (loader) {
        loader.classList.add("hide");

        setTimeout(() => {
            loader.style.display = "none";
        }, 600);
    }
});
