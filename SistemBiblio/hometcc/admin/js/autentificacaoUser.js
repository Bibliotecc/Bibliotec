
const initApp = () => {
    if (localStorage.getItem('keepLoggedIn') != "yes") {
        window.location = '../login.html';
    }

    else if (localStorage.getItem('typeUser') == "leitor") {
        window.location = '../index.html';
    }
}