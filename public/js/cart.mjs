import { getCookie, setCookie } from "./cookie.mjs";
import { divCreate, imgCreate, spanCreate, buttonCreate } from "./html_element_create.mjs"
import { bookEventClick } from "./book_event_listeners.mjs"


fetch("/cart-get", {
    method: "POST",
    headers: {
        "Content-type": "application/json",
    },
    body: JSON.stringify({content: getCookie()})
})
.then(result => result.json())
.then(data => {
    const booksDiv = document.querySelector(".books")
    
    if (data == "Üres a lista!") {
        const emptyP = document.createElement("p")
        emptyP.innerHTML = "A kosár üres!"
        booksDiv.appendChild(emptyP)
        return
    }

    data.forEach(element => {
        const bookDiv = divCreate("book")
        bookDiv.setAttribute("data-url", element.url)
        bookDiv.setAttribute("data-id", element.id)

        const bookImg = imgCreate(element.image)
        const bookInformationDiv = divCreate("book-information")

        const book_name = element.book_name.split("-")
        const titleSpan = spanCreate("title", book_name[0].trim())
        const authorSpan = spanCreate("author", element.book_author)
        const deleteButton = buttonCreate("Törlés")


        bookInformationDiv.appendChild(titleSpan)
        bookInformationDiv.appendChild(authorSpan)

        bookDiv.appendChild(bookImg)
        bookDiv.appendChild(bookInformationDiv)
        bookDiv.appendChild(deleteButton)

        booksDiv.appendChild(bookDiv)
    });

    bookEventClick()
    deleteButtonEvent()

})


function deleteButtonEvent() {
    const deleteButtons = document.querySelectorAll("button")

    deleteButtons.forEach(element => {
        element.addEventListener("click", (e) => {
            e.stopPropagation()
            let cookieIDArray = getCookie()
            const removeBook = cookieIDArray.indexOf(e.currentTarget.parentElement.getAttribute("data-id"))
            cookieIDArray.splice(removeBook, 1)

            setCookie(cookieIDArray)
            location.reload()
        })
    })
}