document.addEventListener("DOMContentLoaded", function() {

    if (typeof initCanvas === "function") {
        initCanvas();
    } else {
        console.error("initCanvas function not found. Ensure animations.js is loaded.");
    }
    if (typeof createSnowflakes === "function") {
        createSnowflakes(); 
    } else {
        console.error("createSnowflakes function not found. Ensure animations.js is loaded.");
    }

    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // const headerOffset = document.querySelector("header")?.offsetHeight || 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            } else {
                console.warn(`Smooth scroll target not found: ${targetId}`);
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll("section, .stat-card, .feature-card").forEach(el => {
        observer.observe(el);
    });


    window.addEventListener("load", () => {
        const loader = document.getElementById("loader-wrapper");
        if (loader) {
            loader.classList.add("hidden");
            loader.addEventListener("transitionend", () => {
                 if (loader.parentElement) {
                    loader.parentElement.removeChild(loader);
                 }
            }, { once: true });
        } else {
            console.warn("Loader wrapper element not found.");
        }
    });
});