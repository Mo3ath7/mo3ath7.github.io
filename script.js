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
// ===== NAVBAR SCROLL EFFECT =====

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (!navbar) return;

    navbar.classList.toggle(
        "navbar-scrolled",
        window.scrollY > 50
    );
});

// ===== MO3ATH 3D LOGO =====
(async function () {
    const container = document.querySelector(".moath-new-logo");
    if (!container) return;

    try {
        const THREE = await import(
            "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js"
        );

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            45,
            container.clientWidth / container.clientHeight,
            0.1,
            100
        );
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setClearColor(0x000000, 0);

        renderer.domElement.style.cssText =
            "position:absolute;inset:0;width:100%;height:100%;z-index:3;";

        container.appendChild(renderer.domElement);

        // 3D M shape
        const shape = new THREE.Shape();

        shape.moveTo(-1.3, -1.1);
        shape.lineTo(-1.3, 1.1);
        shape.lineTo(-0.85, 1.1);
        shape.lineTo(0, 0.1);
        shape.lineTo(0.85, 1.1);
        shape.lineTo(1.3, 1.1);
        shape.lineTo(1.3, -1.1);
        shape.lineTo(0.85, -1.1);
        shape.lineTo(0.85, 0.35);
        shape.lineTo(0, -0.65);
        shape.lineTo(-0.85, 0.35);
        shape.lineTo(-0.85, -1.1);
        shape.closePath();

        const geometry = new THREE.ExtrudeGeometry(shape, {
            depth: 0.35,
            bevelEnabled: true,
            bevelSegments: 4,
            steps: 1,
            bevelSize: 0.07,
            bevelThickness: 0.07
        });

        geometry.center();

        const material = new THREE.MeshStandardMaterial({
            color: 0x39ff14,
            metalness: 0.8,
            roughness: 0.2,
            emissive: 0x087a00,
            emissiveIntensity: 0.6
        });

        const logo = new THREE.Mesh(geometry, material);
        scene.add(logo);

        // Neon edges
        const edges = new THREE.EdgesGeometry(geometry);
        const edgeLines = new THREE.LineSegments(
            edges,
            new THREE.LineBasicMaterial({ color: 0x9cff80 })
        );
        logo.add(edgeLines);

        // Lighting
        scene.add(new THREE.AmbientLight(0xffffff, 1.2));

        const greenLight = new THREE.PointLight(0x39ff14, 35);
        greenLight.position.set(2, 2, 3);
        scene.add(greenLight);

        const whiteLight = new THREE.PointLight(0xffffff, 15);
        whiteLight.position.set(-2, -1, 2);
        scene.add(whiteLight);

        // Floating particles
        const particleCount = 130;
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 1.35 + Math.random() * 0.35;

            positions[i * 3] = Math.cos(angle) * radius;
            positions[i * 3 + 1] = Math.sin(angle) * radius;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
        }

        const particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(positions, 3)
        );

        const particleMaterial = new THREE.PointsMaterial({
    color: 0x39ff14,
    size: 0.09,
    transparent: true,
    opacity: 1,
    sizeAttenuation: true
});

        const particles = new THREE.Points(
            particleGeometry,
            particleMaterial
        );

        scene.add(particles);

        // Hide old 2D logo after successful setup
        const oldLogo = container.querySelector(".logo-art");
        if (oldLogo) oldLogo.style.display = "none";

        // Animation
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        function animate() {
            requestAnimationFrame(animate);

            if (!reducedMotion) {
                logo.rotation.y = Math.sin(Date.now() * 0.0007) * 0.22;
                logo.rotation.x = Math.sin(Date.now() * 0.0005) * 0.08;
                particles.rotation.z += 0.0015;
            }

            renderer.render(scene, camera);
        }

        animate();

        // Responsive size
        const resizeObserver = new ResizeObserver(() => {
            const width = container.clientWidth;
            const height = container.clientHeight;

            if (!width || !height) return;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        });

        resizeObserver.observe(container);

    } catch (error) {
        console.error("3D logo failed to load:", error);
    }
})();
