import { getCookie, setCookie } from "./cookie.mjs"


function bookEventClick() {
    document.querySelectorAll(".book").forEach(element => {
        element.addEventListener("click", (e) => {
            const currentLocationURL = location.href.split("/")
            const newLocationURL = `${currentLocationURL[0]}//${currentLocationURL[2]}/webshop/${e.currentTarget.getAttribute("data-url")}`

            location.href = newLocationURL
        })
    })
}


function buttonEventClick() {
    document.querySelectorAll("button").forEach(element => {
        element.addEventListener("click", (e) => {
            e.stopPropagation()

            const cookieCart = getCookie()
            cookieCart.push(element.parentElement.getAttribute("data-id"))

            setCookie(cookieCart)

            alert("Sikeresen hozzáadtad a kosárhoz!")
        })
    })
}
export { bookEventClick, buttonEventClick } 