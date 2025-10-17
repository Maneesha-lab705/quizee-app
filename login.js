function login(event) {
    event.preventDefault(); 
    let userName = document.getElementById("username").value.trim();

    if (userName) {
        sessionStorage.setItem("userName", userName);
        window.location.href = "quizeForm.html";
    } else {
        alert("Please enter your name");
    }
}