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
var nomeLivro = document.getElementById("nomeLivro");
var nomeAutor = document.getElementById("nomeAutor");
var editora = document.getElementById("editora");
var genLivro = document.getElementById("genLivro");
var nomeColecao = document.getElementById("nomeColecao");
var idioma = document.getElementById("idioma");
var tipoItem = document.getElementById("tipoItem");
var lançamento = document.getElementById("lançamento");
var edicao = document.getElementById("edição");
var numExemplar = document.getElementById("numExemplar");
var numTombo =  document.getElementById("numTombo");
var numPagina = document.getElementById("numPagina");
var CDD = document.getElementById("CDD");
var Cutter = document.getElementById("Cutter");
var ISBN =document.getElementById("ISBN");
var dataAquisicao = document.getElementById("dataAquisicao");
var volume = document.getElementById("volume");


//-----------------------------------------------------------------Referencia Botão
var btnCadastrar = document.getElementById("btnCadastrar");
//-------------------------------------------

function InsertLivroAutor(newId, newAutorId){

    console.log(newId);
    console.log(newAutorId);
    if(newId == undefined || newId == null){
        newId = 1;
    }
    if(newAutorId == undefined || newAutorId == null){
        newAutorId = 1;
    }
    alert("InsertLivroAutor (ID LIVRO NOVO): "+newId);
    alert("InsertLivroAutor (ID AUTOR NOVO): "+newAutorId);
    set(ref(db, "livros/"+nomeLivro.value),{
        idLivro: newId,
        nomeLivro: nomeLivro.value,
        autorId: newAutorId,
        editora: editora.value,
        gênero: genLivro.value,
        nomeColecao: nomeColecao.value,
        idioma: idioma.value,
        tipoItem: tipoItem.value,
        lançamento: lançamento.value,
        edição: edicao.value,
        numExemplar: numExemplar.value,
        numTombo: numTombo.value,
        CDD: CDD.value,
        Cutter: Cutter.value,
        ISBN: ISBN.value,
        dataAquisicao: dataAquisicao.value,
        numPagina: numPagina.value,        
        volume: volume.value
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
    if(newId == undefined || newId == null){
        newId = 1;
    }
    alert("Fase InsertLivro (ID NOVO): "+newId);
    alert("Fase InsertLivro (ID ATUAL DO AUTOR): "+autalIdAutor);

    set(ref(db, "livros/"+nomeLivro.value),{
        idLivro: newId,
        nomeLivro: nomeLivro.value,
        autorId: autalIdAutor,
        editora: editora.value,
        gênero: genLivro.value,
        nomeColecao: nomeColecao.value,
        idioma: idioma.value,
        tipoItem: tipoItem.value,
        lançamento: lançamento.value,
        edição: edicao.value,
        numExemplar: numExemplar.value,
        numTombo: numTombo.value,
        CDD: CDD.value,
        Cutter: Cutter.value,
        ISBN: ISBN.value,
        dataAquisicao: dataAquisicao.value,
        numPagina: numPagina.value,        
        volume: volume.value     
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

    })
    .catch(()=>{
        var newIdLivros = 1;
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
    
    FUNCTIONS
    function limparString(txt) {
        return txt.toLowerCase().normalize('NFD').replace(/[^\w\s\u0300-\u036f]/gi, '');
    }
    function PadraoValue(texto){
        var textoPadrao;
        // Limpa a string do texto
        return textoPadrao = limparString(texto);
    }

*/