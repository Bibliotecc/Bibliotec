// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyC95RHcPl1VhNT484rnwWDaE_E8cC_q4ZQ",
  authDomain: "tccsb-39f62.firebaseapp.com",
  projectId: "tccsb-39f62",
  storageBucket: "tccsb-39f62.appspot.com",
  messagingSenderId: "446535834077",
  appId: "1:446535834077:web:b43e6da142918afae53e34",
  measurementId: "G-QFJFTQ66ZC"
};

// Inicia Firebase
const app = initializeApp(firebaseConfig);
import {getDatabase, ref, set, get, child, onValue, update, remove, limitToLast, orderByKey, limitToFirst } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";
const db = getDatabase();

//-------------------------------------------------------------------REFERÊNCIAS 
var nomeAutor = document.getElementById("nomeAutor");
var editora = document.getElementById("editora");
var genLivro = document.getElementById("genLivro");
var idioma = document.getElementById("idioma");
var lançamento = document.getElementById("lançamento");
var nomeLivro = document.getElementById("nomeLivro");
var numExemplar = document.getElementById("numExemplar");
var numPagina = document.getElementById("numPagina");
//-----------------------------------------------------------------Referencia Botão
var btnCadastrar = document.getElementById("btnCadastrar");
//-------------------------------------------
function limparString(txt) {
    return txt.toLowerCase().replace(/[^\w\s]/gi, '');
}
function PadraoValue(texto){
// Limpa a string do texto
return textoPadrao = limparString(texto);
}
function InsertLivroAutor(newId, newAutorId){

    console.log(newId);
    alert("InsertLivroAutor (ID LIVRO NOVO): "+newId);
    alert("InsertLivroAutor (ID AUTOR NOVO): "+newAutorId);

    set(ref(db, "livros/"+nomeLivro.value),{
        autorId: newAutorId,
        editora: editora.value,
        gênero: genLivro.value,
        idLivro: newId,
        idioma: idioma.value,
        lançamento: lançamento.value,
        nomeLivro: nomeLivro.value,
        numExemplar: numExemplar.value,
        numPagina: numPagina.value        
    })
    .then(()=>{
        alert("Dados do Livro Inseridos");
    })
    .catch((error)=>{
        alert("Erro: "+ error);
    });

    set(ref(db, "autores/"+newAutorId),{
        autorId: newAutorId,
        autorNome: nomeAutor.value      
    })
    .then(()=>{
        alert("Autor Inserido na tabela Autores");
    })
    .catch((error)=>{
        alert("Erro: "+ error);
    });

}

function InsertLivro(newId, autalIdAutor){
    console.log(newId);
    alert("Fase InsertLivro (ID NOVO): "+newId);
    alert("Fase InsertLivro (ID ATUAL DO AUTOR): "+autalIdAutor);
    var nomeLivroReg = PadraoValue(nomeLivro.value);
    set(ref(db, "livros/"+nomeLivroReg.value),{
        autorId: autalIdAutor,
        editora: editora.value,
        gênero: genLivro.value,
        idLivro: newId,
        idioma: idioma.value,
        lançamento: lançamento.value,
        nomeLivro: nomeLivro.value,
        numExemplar: numExemplar.value,
        numPagina: numPagina.value        
    })
    .then(()=>{
        alert("Dados do Livro Inseridos");
    })
    .catch((error)=>{
        alert("Erro: "+ error);
    });

}

function GetUltimoId(){
    const dbref = ref(db);

    get(child(dbref, "livros"))
    .then((snapshot)=>{
        var livros =[];

        snapshot.forEach(childSnapshot => {
            livros.push(childSnapshot.val());
        });

        var newIdLivros = livros[livros.length - 1].idLivro + 1;
        console.log("Novo ID livro:"+newIdLivros);
        verificaAutorExiste(newIdLivros);

    });
}

function verificaAutorExiste(newIdLivros){
    const dbref = ref(db);

    get(child(dbref, "autores"))
    .then((snapshot)=>{
        var autores =[];

        snapshot.forEach(childSnapshot => {
            autores.push(childSnapshot.val());
        })

        var nomeAutorVal = nomeAutor.value; // Nome do Autor
        var nAutor = autores.find((element) => element.autorNome == nomeAutorVal); // Nome do Autor
        var novoAutorId = autores[autores.length -1].autorId + 1; // Novo ID do Autores
//                                 ^^^^ SOBRE O AUTOR ^^^^

        var novoIdLivro = newIdLivros; // Novo ID do Livro 

        if(nAutor){
            InsertLivro(novoIdLivro, nAutor.autorId);
        }else{
            InsertLivroAutor(novoIdLivro, novoAutorId);
        }
    });

}


//EVENTOS
btnCadastrar.addEventListener('click', GetUltimoId);
//btnCadastrar.addEventListener('click', tst);


// NOTAS :
/*
    22/08/2023 ---- 20h36 
            Esse arquivo está funcionando corretamente! É necessário ajustar detalhes. 

    Dev. Lucas Moreira :>
    27/09/2023 ---- 22h50 
            Esse arquivo está funcionando corretamente! É necessário ajustar detalhes das informações do livro. 

    Dev. Lucas Moreira :>          
*/