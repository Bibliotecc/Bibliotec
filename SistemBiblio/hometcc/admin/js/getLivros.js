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
  var corpo = document.getElementById('livros-alocados-list');

function Livros(nomeLivro, gênero, dp){

    let hr = document.createElement("hr");
    let nL = document.createElement("p");
        nL.innerText = nomeLivro;


    corpo.appendChild(hr);              // Linha           //
    corpo.appendChild(nL);             // Nome Livro      //
  }

//----------------------------------------
var corpoS = document.getElementById('solictEmp');

function Emprestimos(nomeLivro, rm, dataPedido, idEmprestimo, statusEmp){
    if(statusEmp == "Pendente"){
        let hr = document.createElement("hr");
        let nL = document.createElement("p");
            nL.innerText = nomeLivro;
        let RM = document.createElement("p");
            RM.innerText = rm;
        let pedidoData = document.createElement("p");
            pedidoData.innerText = dataPedido;              
        let btn = document.createElement("button");
            btn.className = "btn";
            btn.innerText = "Confirmar";
            btn.addEventListener('click', function() {
                // Adicione a lógica de reserva aqui
                confirmaEmpres(idEmprestimo); // ou a função que desejo chamar ao clicar
            });    


        corpoS.appendChild(hr);              // Linha               //
        corpoS.appendChild(nL);             // Nome Livro          //
        corpoS.appendChild(RM);            //  RM                 //
        corpoS.appendChild(pedidoData);   //   pedidoData        //
        corpoS.appendChild(btn);         //    Botao Confirma   //
    }
    }

  function AddAllItemToLivros(livro){
   corpo.innerHTML="";
   livro.forEach(element => {
        Livros(element.nomeLivro, element.gênero, element.numExemplar);

   });
  }
  function AddAllItemToEmprestimos(emprestimos){
    corpoS.innerHTML="";
    emprestimos.forEach(element => {
        Emprestimos(element.livro, element.rm, element.dataPedido, element.idEmprestimo, element.statusEmp);
 
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
   
       GetAllLivros();
       GetAllEmprestimos();
   });
}
//GET ALL TEMPO REAL
function GetAllLivros(){
   const dbref = ref(db, "livros");

   onValue(dbref,(snapshot)=>{
       var livros =[];
       snapshot.forEach(childSnapshot => {

           livros.push(childSnapshot.val());
       });

       AddAllItemToLivros(livros);
   })
}
function GetAllEmprestimos(){
    const dbref = ref(db, "emprestimos");
 
    onValue(dbref,(snapshot)=>{
        var emprestimos =[];
        snapshot.forEach(childSnapshot => {
 
            emprestimos.push(childSnapshot.val());
        });
 
        AddAllItemToEmprestimos(emprestimos);
    })
 }

window.onload = GetAllDataOnce;

function confirmaEmpres(idEmprestimo) {
    const dbRef = ref(db);
  
    update(child(dbRef, "emprestimos/" + idEmprestimo), {
      statusEmp: "Emprestado"
    })
      .then(() => {
        Swal.fire(
          `Sucesso!`,
          'Empréstimo Autorizado!',
          `success`
        );
      })
      .catch(error => {
        Swal.fire(
          `Erro!`,
          'Erro ao autorizar empréstimo: ' + error,
          `error`
        );
      });
  }
  
