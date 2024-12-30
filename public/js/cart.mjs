import { getCookie, setCookie } from "./cookie.mjs";


fetch("/cart-get", {
    method: "POST",
    headers: {"Content-type": "application/json"},
    body: JSON.stringify({content: getCookie()})
})
.then(result => result.json())
.then(data => console.log(data))
