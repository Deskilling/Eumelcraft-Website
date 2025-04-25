const snowflakeCount = 100;

function createSnowflakes() {
    const snowflakeContainer = document.querySelector(".snowflakes");


    if (!snowflakeContainer) {
        console.warn("Snowflake container not found.");
        return;
    }
    snowflakeContainer.innerHTML = "";

    /*
    for (let i = 0; i < snowflakeCount; i++) {
        createSingleSnowflake(snowflakeContainer);
    }
    */

    // Fake Multithread 
    let i = 0;
    function createNext() {
        if (i < snowflakeCount) {
            createSingleSnowflake(snowflakeContainer);
            i++;
            setTimeout(createNext, 0);
        }
    }
    createNext();
}

function createSingleSnowflake(container) {
    const snowflake = document.createElement("div");
    snowflake.innerHTML = "*";
    snowflake.classList.add("snowflake");

    snowflake.style.left = Math.random() * 100 + "%";

    const swing = (Math.random() - 0.5) * 240;
    const phase = Math.random() < 0.5 ? 1 : -1;
    snowflake.style.setProperty("--swing", swing * phase + "px");

    const baseDuration = 10;
    const durationVariance = 8;
    snowflake.style.animationDuration = (baseDuration + Math.random() * durationVariance) + "s";

    snowflake.style.animationDelay = Math.random() * 10 + "s";

    snowflake.style.opacity = Math.random() * 0.6 + 0.4;

    const baseSize = 0.5;
    const sizeVariance = 1.5;
    snowflake.style.fontSize = (baseSize + Math.random() * sizeVariance) + "em";

    container.appendChild(snowflake);

    // Respawn
    snowflake.addEventListener("animationend", () => {
         snowflake.remove();
         createSingleSnowflake(container);
    }, { once: true });
}

let trailElement = null;

document.addEventListener("mousemove", function(e) {
    if (!trailElement) {
        trailElement = document.createElement("div");
        trailElement.className = "snow-trail";
        document.body.appendChild(trailElement);
    }

    trailElement.style.left = (e.clientX - 10) + "px";
    trailElement.style.top = (e.clientY - 10) + "px";
});

document.addEventListener("mouseleave", function() {
    if (trailElement) {
        trailElement.remove();
        trailElement = null;
    }
});

let trailLine = null;

document.addEventListener("mousemove", function(e) {
    if (!trailLine) {
        trailLine = document.createElement("div");
        trailLine.className = "smooth-line-trail";
        document.body.appendChild(trailLine);
    }

    trailLine.style.left = (e.clientX - 1) + "px";
    trailLine.style.top = (e.clientY - 1) + "px";
});

document.addEventListener("mouseleave", function() {
    if (trailLine) {
        trailLine.remove();
        trailLine = null;
    }
});

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
let points = [];
const trailLength = 8;
const fadeSpeed = 0.1; 

function initCanvas() {
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "10000";
    document.body.appendChild(canvas);
    resizeCanvas();
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);

document.addEventListener("mousemove", (e) => {
    points.push({ x: e.clientX, y: e.clientY });
    if (points.length > trailLength) {
        points.shift();
    }
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (points.length > 1) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.stroke();
    }
    
    requestAnimationFrame(animate);
}

initCanvas();
animate();