console.log("Привет, Сакура");
const restoran = "Сакура";
let tables = 15;
let clicks = 0;
console.log(restoran);
console.log(tables);

const bookBtn = document.querySelector(".book-btn");
const cancelBtn = document.querySelector(".cancel-btn");

function booktable() {
    bookBtn.textContent = "Забронировано✓(" + clicks + ")";
}

cancelBtn.addEventListener("click", function () {
    clicks = 0;
    bookBtn.textContent = "Забронировать стол";
});

bookBtn.addEventListener("click", function () {
    clicks = clicks + 1;
    console.log(clicks);
    booktable();
});

const burger = document.querySelector(".burger-btn");
const nav = document.querySelector("nav");
const imagesGroup = document.querySelectorAll(".nav-images");
const allImages = document.querySelectorAll(".nav-images img");

let isOpen = false;
let position = 0;
let groupHeight = 0;
let direction = -1;
let moveImages = null; 

if (imagesGroup.length > 0) {
    imagesGroup[0].querySelectorAll("img").forEach(function(img) {
        groupHeight += img.offsetHeight + 20; 
    });
}
burger.addEventListener("click", function () {
    if (isOpen === true) {
        burger.textContent = "☰";
        nav.classList.remove("open");
        isOpen = false;
        
        if (moveImages) {
            clearInterval(moveImages);
            moveImages = null;
        }
    } else {
        burger.textContent = "✖";
        nav.classList.add("open");
        isOpen = true;
        setTimeout(function() {
            if (isOpen) {  
                moveImages = setInterval(function(){
                    if (isOpen) {  
                        position += direction;
                        if (position <= -groupHeight) {
                            direction = 1;
                        } 
                        else if (position >= 0) {
                            direction = -1;
                        }
                        
                        allImages.forEach(function(img){
                            img.style.transform = "translateY(" + position + "px)";
                        });
                    }
                }, 15);
            }
        }, 500);
    }
});

const title = document.querySelector(".hero h1");

document.addEventListener("mousemove", function (e) {
    const rect = title.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const rotateY = ((mouseX - centerX) / centerX) * 15;
    title.style.transform = "rotateY(" + rotateY + "deg)";
});

const preloader = document.querySelector(".preloader");
setTimeout(function () {
    preloader.style.transform = "translateY(-100%)";
}, 3000);

const span = document.querySelectorAll(".preloader h1 span");
for (let i = 0; i < span.length; i++) {
    const currentSpan = span[i];
    const delay = 1.1 + (i * 0.1);
    currentSpan.style.animationDelay = delay + "s";
}

const menuRows = document.querySelectorAll(".menu-row");
const menuPreview = document.querySelector(".preview-img");

menuRows.forEach(function (row) {
    row.addEventListener("mouseenter", function () {
        const imagePath = this.getAttribute("data-img");
        menuPreview.src = imagePath;
        menuPreview.classList.add("active");
    });
    row.addEventListener("mouseleave", function () {
        menuPreview.classList.remove("active");
    });
});

// паралаксируем


const sections = document.querySelectorAll(".hero, .menu-section, .events-section, .news-section");

const tops = [];
sections.forEach(function (s) {
    tops.push(s.offsetTop);
});

window.addEventListener("scroll", function () {
    const scroll = window.scrollY;

    sections.forEach(function (section, i) {
        const progress = scroll - tops[i];

        let transform, opacity;
        if (progress > 0) {
            const translateY = -progress * 0.6;
            const scale = 1 - progress * 0.0002;
            opacity = Math.max(0, 1 - progress * 0.0008);
            transform = "translateY(" + translateY + "px) scale(" + scale + ")";
        } else {
            transform = "translateY(0px) scale(1)";
            opacity = 1;
        }

        // Применяем ко ВСЕМ прямым детям секции, кроме фонового видео
        for (let k = 0; k < section.children.length; k++) {
            const el = section.children[k];
            if (el.classList.contains("hero-video")) { continue; }
            el.style.transform = transform;
            el.style.opacity = opacity;
        }
    });
});