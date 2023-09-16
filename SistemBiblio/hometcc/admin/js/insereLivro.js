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

function InsertLivro(newId, newAutorId){

    console.log(newId);
    alert("Fase 2: "+newId);

    set(ref(db, "livros/"+nomeLivro.value),{
        autor: newAutorId,
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
        alert("Dados Inseridos");
    })
    .catch((error)=>{
        alert("Erro: "+ error);
    });

    set(ref(db, "autores/"+newAutorId),{
        autorNome: nomeAutor.value,      
    })
    .then(()=>{
        alert("Autor Inserido na tabela Autores");
    })
    .catch((error)=>{
        alert("Erro: "+ error);
    });

}



function GetUltimoId(){
    const dbref = ref(db);

    get(child(dbref, "autores"))
    .then((snapshot)=>{
        var autores =[];

        snapshot.forEach(childSnapshot => {
            autores.push(childSnapshot.val());
        })

         var idAutor = autores[autores.length - 1].autorId;
         var nomeAutor = autores[autores.length - 1].autorNome;


    });


    get(child(dbref, "livros"))
    .then((snapshot)=>{
        var livros =[];

        snapshot.forEach(childSnapshot => {
            livros.push(childSnapshot.val());
        });

        var newId = livros[livros.length - 1].idLivro + 1;
        var newAutorId = livros[livros.length - 1].autorId + 1;
//-----------------------------------------------------------------------------
    
        

    });
}


//EVENTOS
btnCadastrar.addEventListener('click', GetUltimoId);



// NOTAS :
/*
    22/08/2023 ---- 20h36 
            Esse arquivo está funcionando corretamente! É necessário ajustar detalhes. 

    Dev. Lucas Moreira :>        
*/