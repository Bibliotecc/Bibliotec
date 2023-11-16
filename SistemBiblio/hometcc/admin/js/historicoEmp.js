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

    // Initialize Firebase
const app = initializeApp(firebaseConfig);
import {getDatabase, ref, set, get, child, onValue,update, remove } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";
const db= getDatabase();

var urlAtual = window.location.href;

var urlPsq = new URL(urlAtual);
var psq = urlPsq.searchParams.get("psq");
var urlArray = urlAtual.split('/');
var ultimaBarra = urlArray[urlArray.length - 1];

const corpo = document.getElementById('corpo');
function Emprestimos(nomeLivro, usuNome, rm, dataPedido, idEmprestimo, statusEmp) {
    if (psq === rm || psq === nomeLivro || psq === usuNome){
        const tr = document.createElement("tr");
        const tdRm = document.createElement("td");
            tdRm.innerText = rm;
        const tdNomeAluno = document.createElement("td");
            tdNomeAluno.innerText = usuNome;
        const tdNomeLivro = document.createElement("td");
            tdNomeLivro.innerText = nomeLivro;
        const tdData = document.createElement("td");  
            tdData.innerText = dataPedido;
        const tdDataDev = document.createElement("td");
            tdDataDev.innerText = "--";    
        const tdStatus = document.createElement("td");  
            tdStatus.innerText = statusEmp;

        tr.appendChild(tdRm);
        tr.appendChild(tdNomeAluno);
        tr.appendChild(tdNomeLivro);
        tr.appendChild(tdData);
        tr.appendChild(tdDataDev);
        tr.appendChild(tdStatus);

        corpo.appendChild(tr);
    }
    }
        
    function AddAllItemToEmprestimos(emprestimos){
        corpo.innerHTML="";
        emprestimos.forEach(element => {
            Emprestimos(element.livro, element.usuNome,element.rm, element.dataPedido, element.idEmprestimo, element.statusEmp);

        });
   }
function GetAllDataOnce(){
const dbref = ref(db);

get(child(dbref, "livros"))
.then((snapshot)=>{
    var livros =[];

    snapshot.forEach(childSnapshot => {

        livros.push(childSnapshot.val());
    });

    GetAllEmprestimos();
});
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
