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

function InsertLivroAutor(newId, newAutorId){

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
    alert("Fase 2: "+newId);

    set(ref(db, "livros/"+nomeLivro.value),{
        autor: autalIdAutor,
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


function GetUltimoId(tbllivros){
    const dbref = ref(db);

    get(child(dbref, tbllivros))
    .then((snapshot)=>{
        var livros =[];

        snapshot.forEach(childSnapshot => {
            livros.push(childSnapshot.val());
        });

        var newId = livros[livros.length - 1].idLivro + 1;
        console.log("Novo ID livro:"+newId);
        return newId
//-----------------------------------------------------------------------------
   

    });
}

function verificaAutorExiste(){
    const dbref = ref(db);

    get(child(dbref, "autores"))
    .then((snapshot)=>{
        var autores =[];

        snapshot.forEach(childSnapshot => {
            autores.push(childSnapshot.val());
        })

        var nomeAutorVal = nomeAutor.value;
        var ultimoId = GetUltimoId("livros");
        var nAutor = autores.find((element) => element.autorNome == nomeAutorVal);
        var nAutorId = autores[autores.length - 1].autorId + 1;
        if(nAutor){
            console.log("Este Autor Existe! Vou linka-lo ao novo livro inserido");
            InsertLivro(ultimoId);
        }else{
            console.log("Novo Autor Inserido:");
            InsertLivroAutor(nAutorId, ultimoId);
           /* console.log(""+nomeAutorVal);
              console.log(nAutorId); */
        }
    });

}


//EVENTOS
btnCadastrar.addEventListener('click', verificaAutorExiste);



// NOTAS :
/*
    22/08/2023 ---- 20h36 
            Esse arquivo está funcionando corretamente! É necessário ajustar detalhes. 

    Dev. Lucas Moreira :>        
*/