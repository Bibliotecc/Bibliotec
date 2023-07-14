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
import {getDatabase, ref, set, get, child, onValue,update, remove } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

const db = getDatabase();

//------- REFERENCIAS -----------

// ---------- INSERT FUNCTION ---------------------------

// ---------- SELECT FUNCTION ---------------------------

//  GET ALL 
   var cDescBooks = document.getElementById('desc-livro-content');
   
   var urlAtual = window.location.href;
   var urlClass = new URL(urlAtual);
   var alugarLivro = urlClass.searchParams.get("alugar");

function AddItemToTable(nomeLivro){
   console.log(alugarLivro);

   if(alugarLivro == nomeLivro){
        let img = document.createElement("img");
            img.src = "img/livros/"+nomeLivro+".jpg";

        let divEspecLivro = document.createElement("div");
            divEspecLivro.className = 'espec-estil-livro';
            
            let h3 = document.createElement("h3");
                h3.innerText = nomeLivro;
            
            let p = document.createElement("p");
                p.innerText = 'Essa é especificação do Livro';

            let a = document.createElement("a");
                a.innerText = 'Alugar';
                a.href = "aluguel.html?alugar="+nomeLivro;


        divEspecLivro.appendChild(h3);
        divEspecLivro.appendChild(p);
        divEspecLivro.appendChild(a);


        cDescBooks.appendChild(img);
        cDescBooks.appendChild(divEspecLivro);
    }
  } 
  function AddAllItemToTable(livro){
   cDescBooks.innerHTML="";
   livro.forEach(element => {
       AddItemToTable(element.nomeLivro);

   });
  }
//-------- get all dados ---------
function GetAllDataOnce(){
   const dbref = ref(db);

   get(child(dbref, "livros"))
   .then((snapshot)=>{
       var livros =[];

       snapshot.forEach(childSnapshot => {

           livros.push(childSnapshot.val());
       });
   
       GetAllDataRealTime();
   });
}
//GET ALL TEMPO REAL
function GetAllDataRealTime(){
   const dbref = ref(db, "livros");

   onValue(dbref,(snapshot)=>{
       var livros =[];
       snapshot.forEach(childSnapshot => {

           livros.push(childSnapshot.val());
       });

       AddAllItemToTable(livros);
   }) 
}

window.onload = GetAllDataOnce;

// EVENTOS
//insBtn.addEventListener('click', InserirDados);
//slctBtn.addEventListener('click', SelecionarDados);
// filtroFc.addEventListener('click', SelecionarDadosFiltro);
