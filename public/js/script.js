const navbar = document.querySelector(".navbar")
const closeButton = document.querySelector(".close")
const hamburger = document.querySelector(".hamburger")
const overlay = document.querySelector(".overlay")
const menuOverlay = Array.from(document.querySelector(".menu-overlay").children)
const body = document.body;


menuOverlay.forEach(element => {
    element.addEventListener("click", () => {
        overlay.classList.remove("transform")
    })
});


hamburger.addEventListener("click", () => {
    overlay.classList.add("transform")
    body.classList.toggle('menu-open');
})


closeButton.addEventListener("click", () => {
    overlay.classList.remove("transform")
    body.classList.toggle('menu-open');
})