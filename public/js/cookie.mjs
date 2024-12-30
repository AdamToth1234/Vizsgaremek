function getCookie() {
    let dCookie = decodeURIComponent(document.cookie)
    if (dCookie == "") {
        const date = new Date()
        date.setTime(date.getTime() + 3 * 24 * 60 * 60 * 1000)
        document.cookie = `cart=${JSON.stringify([])}; expires=${date}; path=/`
        return JSON.parse(decodeURIComponent(document.cookie).split("cart=")[1])
    }

    return JSON.parse(decodeURIComponent(document.cookie).split("cart=")[1])
}

function setCookie(cookieIDArray) {
    const date = new Date()
    date.setTime(date.getTime() + 3 * 24 * 60 * 60 * 1000)
    document.cookie = `cart=${JSON.stringify(cookieIDArray)}; expires=${date}; path=/`
}

export { getCookie, setCookie }