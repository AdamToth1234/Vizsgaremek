const categoryNames = ["Érdekel a törénelem? Történelmi könyveink", "Kocka vagy? Számtech könyveink", "Rajongsz a regényekért? Szépirodalmi könyveink", "Benne vagy a kriptóban? Pénz és gazdaság könyveink", "Most kezded az iskolát, vagy netán érettségizel? Segédkönyveink", "Lexikonok rajongója vagy? Lexikonok és enciklopédiák", "Érdekel a sport? Sport könyveink", "Kezdő szülő vagy? Család és szülő könyveink"]


fetch("/konyvek")
.then(result => result.json())
.then(data => {
    const booksAndCategoryDiv = document.querySelector(".books-and-category")
    let counter = 0
    categoryNames.forEach(element => {
        const categoryDiv = divCreate("category")

        const categoryNameP = document.createElement("p")
        categoryNameP.classList.add("category-name")
        categoryNameP.innerHTML = `<span>${element}</span>`

        const booksDiv = divCreate("books")
        booksDiv.classList.add("row", "row-cols-6")

        const currentBooks = data[counter]

        for (let i = 0; i < 6; i++) {
            const currentBook = currentBooks[i]


            const bookDiv = divCreate("book")
            bookDiv.setAttribute("data-url", currentBook.url)

            const bookImg = imgCreate(currentBook.image)

            const book_name = currentBook.book_name.split("-")
            const titleSpan = spanCreate("title", book_name[0])
            const authorSpan = spanCreate("author", currentBook.book_author)

            const cartButton = buttonCreate("Kosárba")

            const brElement = brCreate()


            bookDiv.appendChild(bookImg)
            bookDiv.appendChild(brElement)

            bookDiv.appendChild(titleSpan)
            bookDiv.appendChild(brElement)

            bookDiv.appendChild(authorSpan)
            bookDiv.appendChild(brElement)

            bookDiv.appendChild(cartButton)

            booksDiv.appendChild(bookDiv)
        }

        categoryDiv.appendChild(categoryNameP)
        categoryDiv.appendChild(booksDiv)

        booksAndCategoryDiv.appendChild(categoryDiv)

        counter++
    })

})



function divCreate(className) {
    let divElement = document.createElement("div")
    divElement.classList.add(className)
    return divElement
}

function imgCreate(src) {
    let imgElement = document.createElement("img")
    imgElement.src = src
    return imgElement
}

function spanCreate(className, text) {
    let spanElement = document.createElement("span")
    spanElement.classList.add(className)
    spanElement.innerHTML = text
    return spanElement
}

function buttonCreate(text) {
    let buttonElement = document.createElement("button")
    buttonElement.innerHTML = text
    return buttonElement
}

function brCreate() {
    let brElement = document.createElement("br")
    return brElement
}