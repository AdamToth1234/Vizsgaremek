const kaka = document.querySelector(".book")

fetch("/konyvek")
.then(result => result.json())
.then(data => console.log(data))

kaka.addEventListener("click", (e) => {
    console.log(e.currentTarget.getAttribute("data-id"));
})