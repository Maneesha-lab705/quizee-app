
    function login() {
      let userName = document.getElementById("username").value;
      console.log(userName)
    sessionStorage.setItem('userName', userName);
    window.location.href = 'quzeForm.html';
}
    