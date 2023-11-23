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

var divBtnR = document.getElementById("btnVmR");
var divBtnFC = document.getElementById("btnVmFC");
var divBtnC = document.getElementById("btnVmC");
var divBtnA = document.getElementById("btnVmA");




//  GET ALL 
var stdNo = 0;
//v0ar cntrPrin = document.getElementById('container-principal');
var cBooksR = document.getElementById('container-books-Romance');


var urlAtual = window.location.href;

var urlSearch = new URL(urlAtual);
var search = urlSearch.searchParams.get("search");
var generoPsq = urlSearch.searchParams.get("gen");
var urlArray = urlAtual.split('/');
var ultimaBarra = urlArray[urlArray.length - 1];


function AddItemToTable(nomeLivro, gênero, urlImg) {
    console.log(search);
    console.log(ultimaBarra);
    console.log(generoPsq);
    console.log(gênero);

    var searchSimilar = [];
        searchSimilar = trataSearch(search);
      //  console.log(searchSimilar);  
    var nomeLivroSimilar = [];
        nomeLivroSimilar = similaLivro(nomeLivro);
    // -------------------------------------------------------- SEM PESQUISA E FILTRO
    if (generoPsq == gênero) {
        console.log("OLHA EU AQUII!!");

        let divE = document.createElement("div");
            divE.className = 'estil-books';
        let img = document.createElement("img");
            img.src = urlImg;
        let a = document.createElement("a");
            a.innerText = 'Reservar';
        a.href = "aluguel.html?alugar=" + nomeLivro;

        divE.appendChild(img);
        divE.appendChild(a);


            
    cBooksR.appendChild(divE);


    }
    // ----------------------------------------------------- PESQUISA POR NOME
    // if (search == nomeLivro ||correspondeString(searchSimilar, nomeLivroSimilar) && generoPsq == gênero) {
    //     console.log("OLHA EU AQUII DOOISS!!");

    //     console.log("URL DA IMAGEM"+urlImg);
    //     let divE = document.createElement("div");
    //     divE.className = 'estil-books';
    //     let img = document.createElement("img");
    //     img.src = urlImg;
    //     let a = document.createElement("a");
    //     a.innerText = 'Reservar';
    //     a.href = "aluguel.html?alugar=" + nomeLivro;

    //     divE.appendChild(img);
    //     divE.appendChild(a);

        

    //         cBooksR.appendChild(divE);


    // }
    // ----------------------------------------------------- PESQUISA POR GÊNERO    

}
function AddAllItemToTable(livro) {
    stdNo = 0;
    cBooksR.innerHTML = "";

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
