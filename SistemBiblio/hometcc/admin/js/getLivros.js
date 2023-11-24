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
  var tblLivros = document.getElementById('qntdLivro');
  var numberLivro = document.getElementById('numberLivro');
function Livros(qntdadeLivros){

    let h3 = document.createElement("h3");
        h3.innerText = "Quantidade de Livros Cadastrados";
    let nL = document.createElement("p");
        nL.innerText = qntdadeLivros;

      tblLivros.appendChild(h3);              // Linha           //
      numberLivro.appendChild(nL);             // Nome Livro      //
  }

//----------------------------------------
var tblemprestimos = document.getElementById('qntdEmp');
var numberEmp = document.getElementById('numberEmp');
var tblSolicitcao = document.getElementById('qntdSlct');
var numberSlct = document.getElementById('numberSlct');
var tblAtraso = document.getElementById('qntdAtr');
var numberAtr = document.getElementById('numberAtr');

function Emprestimos(qntdadeEmprestimos, qntdSolicitada, qntdAtraso){

    let h31 = document.createElement("h3");
        h31.innerText = "Quantidade de Livros Emprestados";
    let nL = document.createElement("p");
        nL.innerText = qntdadeEmprestimos;

    let h32 = document.createElement("h3");  
        h32.innerText = "Quantidade de Livros Solicitados";
    let nL2 = document.createElement("p");
        nL2.innerText = qntdSolicitada;

    let h33 = document.createElement("h3");  
        h33.innerText = "Quantidade de Devoluções Atrasadas";
    let nL3 = document.createElement("p");
        nL3.innerText = qntdAtraso;

        tblemprestimos.appendChild(h31);
        numberEmp.appendChild(nL);

        tblSolicitcao.appendChild(h32);
        numberSlct.appendChild(nL2);

        tblAtraso.appendChild(h33);
        numberAtr.appendChild(nL3);
    }

  function AddAllItemToLivros(livro){
    tblLivros.innerHTML="";
        var qntdLivros = 1;
    
        livro.forEach(element => {
          qntdLivros = qntdLivros;
        });
    
        // qntdLivros = qntdLivros + 1;
        Livros(qntdLivros);
        console.log(qntdLivros);
  }
  function AddAllItemToEmprestimos( emprestimos) {
    tblemprestimos.innerHTML = "";
    numberEmp.innerHTML = "";
    tblSolicitcao.innerHTML = "";
    numberSlct.innerHTML = "";
    tblAtraso.innerHTML = "";
    numberAtr.innerHTML = "";

    var qntdEmprestada = 0;
    var qntdSolicitada = 0;
    var qntdAtraso = 0;

    emprestimos.forEach(element => {
        // Verifica se o livro está emprestado
        if (element.statusEmp === "Emprestado") {
            qntdEmprestada = qntdEmprestada + 1;
        }
        if(element.statusEmp === "Pendente"){
          qntdSolicitada = qntdSolicitada + 1;
        }
        if(element.statusEmp === "Atrasado"){
          qntdAtraso = qntdAtraso + 1;
        }
    });

    // Chama a função Emprestimos passando apenas a quantidade de livros emprestados
    Emprestimos(qntdEmprestada, qntdSolicitada, qntdAtraso);
    console.log(qntdEmprestada, qntdSolicitada, qntdAtraso);
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
  
