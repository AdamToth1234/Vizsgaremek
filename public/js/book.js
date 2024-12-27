fetch(`/webshop/lekeres/${location.href.split("/")[4]}`)
.then(result => result.json())
.then(data => {

    const thTextObject = {"Író": "book_author", "Kiadás éve": "year_of_publication", "Oldalak száma": "number_of_pages", "ISBN-szám": "ISBN"}

    const informationDiv = document.querySelector(".information")

    const imgAndTitleDiv = divCreate("img-and-title")

    const imgDiv = divCreate("img")
    const bookImg = imgCreate(data[0].image)

    const titleAndTableDiv = divCreate("title-and-table")
    const bookNameP = pCreate("book-name", data[0].book_name)

    let tableElement = document.createElement("table")
    tableElement.classList.add("table", "table-dark", "table-striped")

    let tbodyElement = document.createElement("tbody")

    const thTextObjectKeys = Array.from(Object.keys(thTextObject))
    const thTextObjectValues = Array.from(Object.values(thTextObject))

    const descriptionP = pCreate("description", data[0].description)


    for (let i = 0; i < 4; i++) {
        const trElement = trCreate()
        const thElement = thCreate(thTextObjectKeys[i])
        const tdElement = tdCreate(data[0][thTextObjectValues[i]])

        trElement.appendChild(thElement)
        trElement.appendChild(tdElement)

        tbodyElement.appendChild(trElement)
    }
    
    tableElement.appendChild(tbodyElement)

    titleAndTableDiv.appendChild(bookNameP)
    titleAndTableDiv.appendChild(tableElement)

    imgDiv.appendChild(bookImg)

    imgAndTitleDiv.appendChild(imgDiv)
    imgAndTitleDiv.appendChild(titleAndTableDiv)

    informationDiv.appendChild(imgAndTitleDiv)
    informationDiv.appendChild(descriptionP)


    moreBooksCreate(data)

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
        

        while (currentBook.id == data[0].id) {
            const randomNumber = Math.floor(Math.random() * currentBooks.length)
            var currentBook = currentBooks[randomNumber]
        }

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

        currentBooks.splice(randomNumber, 1)
    }

    categoryDiv.appendChild(categoryNameP)
    categoryDiv.appendChild(booksDiv)

    moreBooks.appendChild(categoryDiv)
}