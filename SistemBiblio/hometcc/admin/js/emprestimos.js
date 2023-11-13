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
  //------- Referencias -----------
  var corpoS = document.getElementById('solictEmp');

function AddItemToTable(nomeLivro, rm, dataPedido){

    let hr = document.createElement("hr");
    let nL = document.createElement("p");
        nL.innerText = nomeLivro;
    let RM = document.createElement("p");
        RM.innerText = rm;
    let pedidoData = document.createElement("p");
        pedidoData.innerText = dataPedido;              
    let btn = document.createElement("button");
        btn.innerText = "Confirmar";
        btn.onclick = function (){
            confirmaEmpres()
        }    


    corpoS.appendChild(hr);              // Linha               //
    corpoS.appendChild(nL);             // Nome Livro          //
    corpoS.appendChild(RM);            //  RM                 //
    corpoS.appendChild(pedidoData);   //   pedidoData        //
    corpoS.appendChild(btn);         //    Botao Confirma   //
  }

  function AddAllItemToTable(livro){
   corpoS.innerHTML="";
   livro.forEach(element => {
       AddItemToTable(element.livro, element.rm, element.dataPedido);

   });
  }

//-------- get all dados ---------
function GetAllDataOnce(){
   const dbref = ref(db);

   get(child(dbref, "emprestimos"))
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
   const dbref = ref(db, "emprestimos");

   onValue(dbref,(snapshot)=>{
       var livros =[];
       snapshot.forEach(childSnapshot => {

           livros.push(childSnapshot.val());
       });

       AddAllItemToTable(livros);
   })
}

window.onload = GetAllDataOnce;


function confirmaEmpres(){

}