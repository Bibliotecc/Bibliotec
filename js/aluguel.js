// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";

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
import {getDatabase, ref, set, get, child, onValue, 
        update, remove, orderByChild, equalTo,
        query } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";

const db = getDatabase();

//------- REFERENCIAS PARA OS EVENTOS -----------

// ---------- INSERT FUNCTION ---------------------------

// ---------- SELECT FUNCTION ---------------------------

// REFERÊNCIAS DO CONTAINER DE DESCRIÇÃO DO LIVRO 
    var cDescBooks = document.getElementById('desc-livro-content');

// REFERÊNCIAS PARA ADD O TITLE NO HEAD 
    var Head = document.getElementById('head');

// REFERÊNCIAS PARA ESPECIFICAÇÕES
    var cEspecLivro = document.getElementById("container-especificacao-livro");

    var autor;
    var lançamento;
    var editora; 
    var idioma;
    var numPagina;

// REFERÊNCIAS PARA PEGAR ELEMENTOS DA URL
   var urlAtual = window.location.href;
   var urlClass = new URL(urlAtual);
   var alugarLivro = urlClass.searchParams.get("alugar");
   var confirmaAluguel = urlClass.searchParams.get("confirmar");

//-------------------------------------------------------------------------------------------------------------
function AddItemToTable(nomeLivro, autor, lançamento, editora, idioma, numPagina){
   console.log(alugarLivro);
//Função Adiciona Itens no local desejado
   if(alugarLivro == nomeLivro){
//EXIBINDO CAPA DO LIVRO, DESCRIÇÃO E TÍTULO--------------------------------------------------------------------------
        let img = document.createElement("img");
            img.src = "img/livros/"+nomeLivro+".jpg";
        let divEspecLivro = document.createElement("div");
            divEspecLivro.className = 'espec-estil-livro';
            let h3 = document.createElement("h3");
                h3.innerText = nomeLivro;
            let p = document.createElement("p");
                p.innerText = 'Sem descrição curta no momento';
            let a = document.createElement("a");
                a.innerText = 'Reservar';
                a.href = 'aluguel.html?alugar='+nomeLivro+'&confirmar=pstv'; // pstv = positivo
                

        divEspecLivro.appendChild(h3);
        divEspecLivro.appendChild(p);
        divEspecLivro.appendChild(a);
        cDescBooks.appendChild(img);
        cDescBooks.appendChild(divEspecLivro);

//EXIBINDO ESPECIFICAÇÕES-------------------------------------------------------------------------------------
      
//---->> 1  
            let divItenEspec1 = document.createElement("div");
                    divItenEspec1.className = 'itens-especificacao';
            let h4A = document.createElement("h4");
                    h4A.innerText = "Autor(a)";
            let pA = document.createElement("p");
                    pA.innerText = autor;
            divItenEspec1.appendChild(h4A);
            divItenEspec1.appendChild(pA);
//---->>  2     
            let divItenEspec2 = document.createElement("div");
                    divItenEspec2.className = 'itens-especificacao';
            let h4L = document.createElement("h4");
                    h4L.innerText = "Data de Lançamento";
            let pL = document.createElement("p");
                    pL.innerText = lançamento;

            divItenEspec2.appendChild(h4L);
            divItenEspec2.appendChild(pL);
    //---->> 3
            let divItenEspec3 = document.createElement("div");
                    divItenEspec3.className = 'itens-especificacao';
            let h4E = document.createElement("h4");
                    h4E.innerText = "Editora";
            let pE = document.createElement("p");
                pE.innerText = editora;

            divItenEspec3.appendChild(h4E);
            divItenEspec3.appendChild(pE);
    //---->> 4        
            let divItenEspec4 = document.createElement("div");
                    divItenEspec4.className = 'itens-especificacao';
            let h4I = document.createElement("h4");
                    h4I.innerText = "Idioma";
            let pI = document.createElement("p");
                    pI.innerText = idioma;

            divItenEspec4.appendChild(h4I);
            divItenEspec4.appendChild(pI);
    //---->> 5     
            let divItenEspec5 = document.createElement("div");
                    divItenEspec5.className = 'itens-especificacao';
            let h4nP = document.createElement("h4");
                    h4nP.innerText = "Numero de Páginas";
            let pnP = document.createElement("p");
                    pnP.innerText = numPagina;

            divItenEspec5.appendChild(h4nP);
            divItenEspec5.appendChild(pnP);
    //--->>     
            cEspecLivro.appendChild(divItenEspec1);
            cEspecLivro.appendChild(divItenEspec2);
            cEspecLivro.appendChild(divItenEspec3);
            cEspecLivro.appendChild(divItenEspec4);
            cEspecLivro.appendChild(divItenEspec5);

//EXIBINDO TÍTULO DO LIVRO NO HEAD ---------------------------------------------------------------------------
        let title = document.createElement("title");
            title.innerText = nomeLivro+" - BiblioTec";

        Head.appendChild(title);
    }
  } 
//-------------------------------------------------------------------------------------------------------------
function AddAllItemToTable(livro){
   cDescBooks.innerHTML="";
   livro.forEach(element => {
       AddItemToTable(element.nomeLivro, element.autor, element.lançamento, element.editora, element.idioma, element.numPagina);

   });
  }
//-------------------------------------------------------------------------------------------------------------  
function GetAllDataOnce(){
    //-------- get all dados ---------
   const dbref = ref(db);

   get(child(dbref, "livros"), orderByChild("nomeLivro"), equalTo(alugarLivro))
   .then((snapshot)=>{
       var livros =[];

       snapshot.forEach(childSnapshot => {

           livros.push(childSnapshot.val());
       });
   
       GetAllDataRealTime();
   });
}
//-------------------------------------------------------------------------------------------------------------
function GetAllDataRealTime(){
  //GET ALL TEMPO REAL 
  const dbref = ref(db, "livros");

   onValue(dbref,(snapshot)=>{
       var livros =[];
       snapshot.forEach(childSnapshot => {

           livros.push(childSnapshot.val());
       });

       AddAllItemToTable(livros);
   }) 
}
//-------------------------------------------------------------------------------------------------------------
window.onload = GetAllDataOnce;
//-------------------------------------------------------------------------------------------------------------
var dp;
function ReservarLivro(){
    const dbref = ref(db);
//PRIMEIRO PEGA VALOR DE DISPONIBILIDADE (alugarLivro == nomeLivro)
console.log(alugarLivro);
    get(child(dbref,"livros/"+alugarLivro))
    .then((snapshot)=>{
        if(snapshot.exists()){
            dp = snapshot.val().dp;
            console.log(dp);
//ALUGANDO O LIVRO.            
            if(dp > 0){
                var dpNova = dp - 1;
                    set(ref(db, "livros/"+alugarLivro),{
                        autor: snapshot.val().autor,
                        dp: dpNova,
                        editora: snapshot.val().editora,
                        gênero: snapshot.val().gênero,
                        idLivro: snapshot.val().idLivro,
                        idioma: snapshot.val().idioma,
                        lançamento: snapshot.val().lançamento,
                        nomeLivro: snapshot.val().nomeLivro,
                        numExemplar: snapshot.val().numExemplar,
                        numPagina: snapshot.val().numPagina
                    })  
                    .then(()=>{
                        alert("Livro alugado!!");
                    })
                    .catch((error)=>{
                        alert("Erro: "+ error);
                    });
            }
            else{
                alert("Livro não disponível para locação!")
            }
        
        }
        else{
            alert("Não existe esse livro em nosso banco de dados");
        }

    })
    .catch((error)=>{
        alert("Erro: "+ error);
    });

 }
//-------------------------------------------------------------------------------------------------------------
// EVENTOS
if(confirmaAluguel == "pstv"){
    ReservarLivro();
}