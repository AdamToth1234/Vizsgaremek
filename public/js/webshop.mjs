import { divCreate, imgCreate, spanCreate, buttonCreate, brCreate } from "./html_element_create.mjs"
import { bookEventClick, buttonEventClick } from "./book_event_listeners.mjs"


const categoryNames = ["Érdekel a törénelem? Történelmi könyveink", "Kocka vagy? Számtech könyveink", "Rajongsz a regényekért? Szépirodalmi könyveink", "Lexikonok rajongója vagy? Lexikonok és enciklopédiák", "Benne vagy a kriptóban? Pénz és gazdaság könyveink", "Most kezded az iskolát, vagy netán érettségizel? Segédkönyveink", "Társadalomtudomány könyveink", "Tudomány és természet könyveink", "Érdekel a sport? Sport könyveink", "Kezdő szülő vagy? Család és szülő könyveink"]


fetch("/konyvek", {
    method: "GET",
    headers: {
        "Fetch-header": "only-fetch"
    }
})
.then(result => result.json())
.then(data => {
    const booksAndCategoryDiv = document.querySelector(".library")
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
            bookDiv.setAttribute("data-id", currentBook.id)

            const bookImg = imgCreate(currentBook.image)
            bookImg.setAttribute("title", currentBook.book_name)

            const book_name = currentBook.book_name.split("-")
            const titleSpan = spanCreate("title", book_name[0].trim())
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

    bookEventClick()
    buttonEventClick()
})