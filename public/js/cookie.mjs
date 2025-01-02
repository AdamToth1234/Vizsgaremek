function getCookie() {
    let dCookie = decodeURIComponent(document.cookie)
    if (dCookie == "") {
        setCookie([])
    }

    return JSON.parse(decodeURIComponent(document.cookie).split("cart=")[1])
}

function setCookie(cookieIDArray) {
    const date = new Date()
    date.setTime(date.getTime() + 3 * 24 * 60 * 60 * 1000)
    document.cookie = `cart=${JSON.stringify(cookieIDArray)}; expires=${date.toUTCString()}; path=/`
}


export { getCookie, setCookie }