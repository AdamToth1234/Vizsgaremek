fetch(`/webshop/lekeres/${location.href.split("/")[4]}`)
.then(result => result.json())
.then(data => {

    const thTextObject = {"Író": "book_author", "Kiadás éve": "year_of_publication", "Oldalak száma": "number_of_pages", "ISBN-szám": "ISBN"}

    const bookCardInformationDiv = document.querySelector(".book-card-information")

    const bookCardDiv = divCreate("book-card")

    const bookCardImgDiv = divCreate("book-card-img")
    const bookCardImg = imgCreate(data[0].image)

    const bookCardDetailsDiv = divCreate("book-card-details")
    bookCardDetailsDiv.setAttribute("data-id", data[0].id)
    const bookNameP = pCreate("book-name", data[0].book_name)

    let tableElement = document.createElement("table")
    tableElement.classList.add("table", "table-dark", "table-striped")

    let tbodyElement = document.createElement("tbody")

    const thTextObjectKeys = Array.from(Object.keys(thTextObject))
    const thTextObjectValues = Array.from(Object.values(thTextObject))

    const cartButton = buttonCreate("Kosárba")

    const descriptionP = pCreate("book-card-description", data[0].description)


    for (let i = 0; i < 4; i++) {
        const trElement = trCreate()
        const thElement = thCreate(thTextObjectKeys[i])
        const tdElement = tdCreate(data[0][thTextObjectValues[i]])

        trElement.appendChild(thElement)
        trElement.appendChild(tdElement)

        tbodyElement.appendChild(trElement)
    }
    
    tableElement.appendChild(tbodyElement)

    bookCardDetailsDiv.appendChild(bookNameP)
    bookCardDetailsDiv.appendChild(tableElement)
    bookCardDetailsDiv.appendChild(cartButton)

    bookCardImgDiv.appendChild(bookCardImg)

    bookCardDiv.appendChild(bookCardImgDiv)
    bookCardDiv.appendChild(bookCardDetailsDiv)

    bookCardInformationDiv.appendChild(bookCardDiv)
    bookCardInformationDiv.appendChild(descriptionP)


    moreBooksCreate(data)


    document.title = `${data[0].book_name.split("-")[0]} - Könyvmolyok menedéke`


    document.querySelectorAll(".book").forEach(element => {
        element.addEventListener("click", (e) => {
            const currentLocationURL = location.href.split("/")
            const newLocationURL = `${currentLocationURL[0]}//${currentLocationURL[2]}/webshop/${e.currentTarget.getAttribute("data-url")}`

            location.href = newLocationURL
            
        })
    })

    document.querySelectorAll("button").forEach(element => {
        element.addEventListener("click", (e) => {
            e.stopPropagation()
            alert("A kurva anyád :)")
        })
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

function pCreate(className, text) {
    let pElement = document.createElement("p")
    pElement.classList.add(className)
    pElement.innerHTML = text
    return pElement
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

function trCreate() {
    let trElement = document.createElement("tr")
    return trElement
}

function thCreate(text) {
    let thElement = document.createElement("th")
    thElement.scope = "row"
    thElement.innerHTML = text
    return thElement
}

function tdCreate(text) {
    let tdElement = document.createElement("td")
    tdElement.innerHTML = text
    return tdElement
}


function moreBooksCreate(data) {
    const moreBooks = document.querySelector(".more-books")
    const categoryDiv = divCreate("category")

    const categoryNameP = document.createElement("p")
    categoryNameP.classList.add("category-name")
    categoryNameP.innerHTML = `<span>Hasonló könyvek</span>`

    const booksDiv = divCreate("books")
    booksDiv.classList.add("row", "row-cols-6")

    const currentBooks = data[1]

    for (let i = 0; i < 6; i++) {
        const randomNumber = Math.floor(Math.random() * currentBooks.length)
        
        var currentBook = currentBooks[randomNumber]
        delete currentBooks[randomNumber]
        

        while (currentBook.id == data[0].id) {
            const randomNumber = Math.floor(Math.random() * currentBooks.length)
            var currentBook = currentBooks[randomNumber]
        }

        const bookDiv = divCreate("book")
        bookDiv.setAttribute("data-url", currentBook.url)

        const bookCardImg = imgCreate(currentBook.image)

        const book_name = currentBook.book_name.split("-")
        const titleSpan = spanCreate("title", book_name[0])
        const authorSpan = spanCreate("author", currentBook.book_author)

        const cartButton = buttonCreate("Kosárba")

        const brElement = brCreate()


        bookDiv.appendChild(bookCardImg)
        bookDiv.appendChild(brElement)

        bookDiv.appendChild(titleSpan)
        bookDiv.appendChild(brElement)

        bookDiv.appendChild(authorSpan)
        bookDiv.appendChild(brElement)

        bookDiv.appendChild(cartButton)

        booksDiv.appendChild(bookDiv)

        currentBooks.splice(randomNumber, 1)
    }

    categoryDiv.appendChild(categoryNameP)
    categoryDiv.appendChild(booksDiv)

    moreBooks.appendChild(categoryDiv)
}