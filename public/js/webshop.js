const arrowRight = document.querySelectorAll(".fa-chevron-right")
let counter = 0

const translateObject = {
    0: "-1350px",
    1: "-2700px",
    2: "-3050px",
    3: "-4400px"
}

arrowRight.forEach(i => {
    i.addEventListener("click", (e) => {
        const currentBooks = Array.from(e.currentTarget.parentElement.parentElement.parentElement.parentElement.childNodes[3].childNodes).filter(node => node.nodeType === 1)
        console.log();
        
        currentBooks.forEach(f => {
            f.style.transform = `translate3d(${translateObject[counter]}, 0, 0)`
        })

        const currentArrowsParent = Array.from(e.currentTarget.parentElement.parentElement.childNodes).filter(node => node.nodeType === 1)
        currentArrowsParent.forEach(f => {
            f.classList.add("active")
        });
    })
})



// fetch("/konyvek")
// .then(result => result.json())
// .then(data => console.log(data))