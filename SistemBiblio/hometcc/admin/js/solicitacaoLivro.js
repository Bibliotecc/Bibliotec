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

const corpo = document.getElementById('corpo');
function Emprestimos(nomeLivro, rm, dataPedido, idEmprestimo, statusEmp) {
    if(statusEmp == "Pendente"){
    const tr = document.createElement("tr");
    const tdRm = document.createElement("td");
    const tdNomeAluno = document.createElement("td");
    const tdNomeLivro = document.createElement("td");
    const tdData = document.createElement("td");
    const btnConfirmar = document.createElement("img");
    const btnRecusar = document.createElement("td");  

    tdRm.innerText = rm;
    tdNomeAluno.innerText = "usuNome";
    tdNomeLivro.innerText = nomeLivro;
    tdData.innerText = dataPedido;
    btnConfirmar.className = "btn";
    btnConfirmar.innerText = "Confirmar";
    btnConfirmar.src="../img/icons/aceitar.png";
    btnConfirmar.addEventListener('click', function() {

        confirmaEmpres(idEmprestimo); // ou a função que desejo chamar ao clicar
    });
    //tdRecusar.innerText = dataAquisicao;


    tr.appendChild(tdRm);
    tr.appendChild(tdNomeAluno);
    tr.appendChild(tdNomeLivro);
    tr.appendChild(tdData);
    tr.appendChild(btnConfirmar);




    corpo.appendChild(tr);
    }}
        
    function AddAllItemToEmprestimos(emprestimos){
        corpo.innerHTML="";
        emprestimos.forEach(element => {
            Emprestimos(element.livro, element.rm, element.dataPedido, element.idEmprestimo, element.statusEmp);

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