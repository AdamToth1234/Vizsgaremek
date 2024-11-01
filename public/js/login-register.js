const passwordInput = document.getElementById("password")
const passwordReveal = document.querySelector(".fa-eye")

passwordReveal.addEventListener("click", () => {
    if (passwordInput.type == "password") {
        passwordInput.type = "text"
        passwordReveal.classList.replace("fa-eye", "fa-eye-slash")
    } else {
        passwordInput.type = "password"
        passwordReveal.classList.replace("fa-eye-slash", "fa-eye")
    }
})