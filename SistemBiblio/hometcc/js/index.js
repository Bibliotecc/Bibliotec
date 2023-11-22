// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC95RHcPl1VhNT484rnwWDaE_E8cC_q4ZQ",
    authDomain: "tccsb-39f62.firebaseapp.com",
    projectId: "tccsb-39f62",
    storageBucket: "tccsb-39f62.appspot.com",
    messagingSenderId: "446535834077",
    appId: "1:446535834077:web:b43e6da142918afae53e34",
    measurementId: "G-QFJFTQ66ZC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
import { getDatabase, ref, set, get, child, onValue, update, remove } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

const db = getDatabase();
//------- Referencias -----------

var nomeLivro = document.getElementById("nomeLivro");
var nomeLivroP = document.getElementById("nomeLivroP");
var insBtn = document.getElementById("Insbtn");
var slctBtn = document.getElementById("Slctbtn");
var filtroFc = document.getElementById("filtroFc");

// ---------- insert function ---------------------------

function InserirDados() {
    set(ref(db, "livros/" + nomeLivro.value), {
        nomeLivro: nomeLivro.value
    })
        .then(() => {
            alert("dados inseridos");
        })
        .catch((error) => {
            alert("Erro: " + error);
        });
}
// ---------- select function ---------------------------

function SelecionarDados() {
    const dbref = ref(db);

    get(child(dbref, "livros/" + nomeLivro.value))
        .then((snapshot) => {
            if (snapshot.exists()) {
                nomeLivroP.value = snapshot.val().nomeLivro;
            }
            else {
                alert("Não há dados");
            }

        })
        .catch((error) => {
            alert("Erro: " + error);
        })
}
function SelecionarDadosFiltro() {
    window.location = "../index.html";
    const dbref = ref(db);

    get(child(dbref, "livros/" + search.value))
        .then((snapshot) => {
            if (snapshot.exists()) {
                // FILTRO COM IF :

            }
            else {
                alert("Não há dados");
            }

        })
        .catch((error) => {
            alert("Erro: " + error);
        })
}




//  GET ALL 
var stdNo = 0;
//v0ar cntrPrin = document.getElementById('container-principal');
var cBooksR = document.getElementById('container-books-Romance');
var cBooksF = document.getElementById('container-books-Ficcao');
var cBooksA = document.getElementById('container-books-Acao');
var cBooksC = document.getElementById('container-books-Comedia');
var bookCR = document.getElementById('container-principal-R');
var bookCF = document.getElementById('container-principal-F');
var bookCA = document.getElementById('container-principal-A');
var bookCC = document.getElementById('container-principal-C');

var divBtnR = document.getElementById("btnVmR");
var divBtnFC = document.getElementById("btnVmFC");
var divBtnC = document.getElementById("btnVmC");
var divBtnA = document.getElementById("btnVmA");

var urlAtual = window.location.href;

var urlFiltro = new URL(urlAtual);
var urlSearch = new URL(urlAtual);
var search = urlSearch.searchParams.get("search");
var filtro = urlFiltro.searchParams.get("filtro");
var urlArray = urlAtual.split('/');
var ultimaBarra = urlArray[urlArray.length - 1];

let romanceHeaderAdded = false;
let ficcaoHeaderAdded = false;
let acaoHeaderAdded = false;
let comediaHeaderAdded = false;

function AddItemToTable(nomeLivro, gênero, urlImg) {
    console.log(filtro);
    console.log(search);
    console.log(ultimaBarra);

    var searchSimilar = [];
        searchSimilar = trataSearch(search);
      //  console.log(searchSimilar);  
    var nomeLivroSimilar = [];
        nomeLivroSimilar = similaLivro(nomeLivro);
        if (!romanceHeaderAdded && gênero === "Romance" ) {
            let br = document.createElement("br");
            let h1 = document.createElement("h1");
                h1.innerText = gênero;
            let btn = document.createElement("button");
                btn.className = "estil-botao-vermais";
                btn.innerText = "Ver Mais";
                btn.onclick = function (){
                    verMais(gênero)
                }  
            divBtnR.appendChild(btn);
                
            bookCR.appendChild(h1);
            bookCR.appendChild(br);
            romanceHeaderAdded = true;
        } else if (!ficcaoHeaderAdded && gênero === "Ficção Cientifica" ) {
            let br = document.createElement("br");
            let h1 = document.createElement("h1");
                h1.innerText = gênero;
            let btn = document.createElement("button");
                btn.className = "estil-botao-vermais";
                btn.innerText = "Ver Mais";
                btn.onclick = function (){
                    verMais(gênero)
                }  

            divBtnFC.appendChild(btn);

            bookCF.appendChild(h1);
            bookCF.appendChild(br);
            ficcaoHeaderAdded = true;
        } else if (!acaoHeaderAdded && gênero === "Ação" ) {
            let h1 = document.createElement("h1");
                h1.innerText = gênero;
            let btn = document.createElement("button");
                btn.className = "estil-botao-vermais";
                btn.innerText = "Ver Mais";
                btn.onclick = function (){
                    verMais(gênero)
                }  

            divBtnA.appendChild(btn);

            bookCA.appendChild(h1);
            acaoHeaderAdded = true;
        } else if (!comediaHeaderAdded && gênero === "Comédia" ) {
            let h1 = document.createElement("h1");
                h1.innerText = gênero;
            let btn = document.createElement("button");
                btn.className = "estil-botao-vermais";
                btn.innerText = "Ver Mais";
                btn.onclick = function (){
                    verMais(gênero)
                }
        
            divBtnC.appendChild(btn);    

            bookCC.appendChild(h1);
            comediaHeaderAdded = true;
        }
        
    // -------------------------------------------------------- SEM PESQUISA E FILTRO
    if (ultimaBarra == 'index.html' || ultimaBarra == '' || search == '') {

        let divE = document.createElement("div");
            divE.className = 'estil-books';
        let img = document.createElement("img");
            img.src = urlImg;
        let a = document.createElement("a");
            a.innerText = 'Reservar';
        a.href = "aluguel.html?alugar=" + nomeLivro;

        divE.appendChild(img);
        divE.appendChild(a);

        if(gênero == "Romance"){
            
            cBooksR.appendChild(divE);
        }
        if(gênero == "Ficção Cientifica"){
            cBooksF.appendChild(divE);
        }
        if(gênero == "Ação"){
            cBooksA.appendChild(divE);
        }
        if(gênero == "Comédia"){
            cBooksC.appendChild(divE);
        }
    }
    // ----------------------------------------------------- PESQUISA POR NOME
    if (search == nomeLivro ||correspondeString(searchSimilar, nomeLivroSimilar) && filtro == null) {
        console.log("URL DA IMAGEM"+urlImg);
        let divE = document.createElement("div");
        divE.className = 'estil-books';
        let img = document.createElement("img");
        img.src = urlImg;
        let a = document.createElement("a");
        a.innerText = 'Reservar';
        a.href = "aluguel.html?alugar=" + nomeLivro;

        divE.appendChild(img);
        divE.appendChild(a);

        
        if(gênero == "Romance"){
            cBooksR.appendChild(divE);
        }
        if(gênero == "Ficção Cientifica"){
            cBooksF.appendChild(divE);
        }
        if(gênero == "Ação"){
            cBooksA.appendChild(divE);
        }
        if(gênero == "Comédia"){
            cBooksC.appendChild(divE);
        }
    }
    // ----------------------------------------------------- PESQUISA POR GÊNERO    
    if (gênero == filtro) {
        let divE = document.createElement("div");
        divE.className = 'estil-books';
        let img = document.createElement("img");
            img.src = urlImg;
        let a = document.createElement("a");
        a.innerText = 'Reservar';
        a.href = "aluguel.html?alugar=" + nomeLivro;

        divE.appendChild(img);
        
        divE.appendChild(a);

        
        if(gênero == "Romance"){
            cBooksR.appendChild(divE);
        }
        if(gênero == "Ficção Cientifica"){
            cBooksF.appendChild(divE);
        }
        if(gênero == "Ação"){
            cBooksA.appendChild(divE);
        }
        if(gênero == "Comédia"){
            cBooksC.appendChild(divE);
        }
    }
}
function AddAllItemToTable(livro) {
    stdNo = 0;
    cBooksR.innerHTML = "";
    cBooksF.innerHTML = "";
    bookCA.innerHTML = "";
    bookCC.innerHTML = "";

    livro.forEach(element => {
        AddItemToTable(element.nomeLivro, element.gênero, element.urlImg);
    });
}
//---------GET ALL DADOS-----------------
function GetAllDataOnce() {
    const dbref = ref(db);
    get(child(dbref, "livros"))
        .then((snapshot) => {
            var livros = [];
            snapshot.forEach(childSnapshot => {

                livros.push(childSnapshot.val());
            });
            GetAllDataRealTime();
        });
}
//----------GET ALL TEMPO REAL------------
function GetAllDataRealTime() {
    const dbref = ref(db, "livros");

    onValue(dbref, (snapshot) => {
        var livros = [];
        snapshot.forEach(childSnapshot => {
            livros.push(childSnapshot.val());
        });

        AddAllItemToTable(livros);
    })
}

function getGenres() {
    const dbref = ref(db, "livros");

    return get(dbref)
        .then((snapshot) => {
            const genres = new Set();

            snapshot.forEach(childSnapshot => {
                const genre = childSnapshot.val().gênero;
                genres.add(genre);
            });

            return Array.from(genres);
        })
        .catch((error) => {
            console.error("Erro ao obter gêneros: ", error);
            return [];
        });
}
function populateGenreDropdown(genres) {
    const dropdown = document.getElementById("Fltr");
    const divD = document.createElement("div");
    divD.className = "dropdown-menu";

    genres.forEach((genre) => {
        const a = document.createElement("a");
        a.href = "buscaGen.html?gen=" + genre;
        a.innerText = genre;

        divD.appendChild(a);
    });

    dropdown.appendChild(divD);
}

// EVENTOS
window.onload = function() {
    getGenres().then((genres) => {
        // Agora você tem a lista de gêneros, você pode usá-la para preencher o menu suspenso
        populateGenreDropdown(genres);
        // Em seguida, carregue os dados ou faça outras operações necessárias
        GetAllDataOnce();
    });
}


// TRATAMENTOS
// TRATAMENTO DO SEARCH
function trataSearch(search){
    if(!search){
        console.log("Nada Pesquisado!");

    }
    else{
    var searchSimilar = search;

    var palavras = searchSimilar.split(" ");
    for (let i = 0; i < palavras.length; i++) {
        palavras[i] = palavras[i][0].toUpperCase() + palavras[i].substr(1);
    }
        //console.log(palavras);
        palavras = palavras.join(" ");
       palavras = palavras.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    console.log("TRATA SEARCH: "+ palavras);
    return palavras;
    }
}
// TARATAMENTO PARA O NOME LIVROS
function similaLivro(nomeLivro){
    return nomeLivro.split(" ")
    .map(word => word.charAt(0)
    .toUpperCase() + word.slice(1))
    .join(" ")
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function correspondeString(searchSimilar, nomeLivroSimilar){
    console.log("CORRESPONDE STRING 1: ");
    console.log(nomeLivroSimilar);
    console.log("-------------------");
    console.log("CORRESPONDE STRING 2: ");
    console.log(searchSimilar);
    console.log("-------------------");
    if (searchSimilar && nomeLivroSimilar) {
        for (let i = 0; i < nomeLivroSimilar.length; i++) {
            if (nomeLivroSimilar[i].includes(searchSimilar) || nomeLivroSimilar == searchSimilar) {
                return true;
            }else{
                // nomeLivroSimilar = nomeLivroSimilar.split(" ");
                // searchSimilar = searchSimilar.split(" ");
                // console.log(Array(nomeLivroSimilar));
                // console.log("-------------------");
                // console.log(Array(searchSimilar));
                // console.log("-------------------");
                    // if(nomeLivroSimilar[i] == searchSimilar[i]){
                    //     return true;
                    // }
            }
        }
    }
    return false;
}
