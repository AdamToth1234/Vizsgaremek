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


function pCreate(className, text) {
    let pElement = document.createElement("p")
    pElement.classList.add(className)
    pElement.innerHTML = text
    return pElement
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


export { divCreate, imgCreate, spanCreate, buttonCreate, brCreate, pCreate, trCreate, thCreate }