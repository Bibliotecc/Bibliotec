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
//
const pegaData = new Date();

// Adiciona 10 dias à data atual
pegaData.setDate(pegaData.getDate());

// Obter informações específicas da nova data (ano, mês, dia, etc.)
const ano = pegaData.getFullYear();
const mes = pegaData.getMonth() + 1; // Lembre-se que os meses começam do zero
const dia = pegaData.getDate();
const horas = pegaData.getHours();
const minutos = pegaData.getMinutes();
const segundos = pegaData.getSeconds();
const dataHoje = `${dia.toString().padStart(2, '0')}-${mes.toString().padStart(2, '0')}-${ano} ${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;

//
const corpo = document.getElementById('corpo');
function Emprestimos(nomeLivro, usuNome, rm, dataPedido, dataPrazo ,idEmprestimo, statusEmp) {
    if(dataPrazo > dataPedido){
        statusEmp = "Atrasado";        
    }
    if(statusEmp == "Emprestado" || statusEmp == "Atrasado"){
    const tr = document.createElement("tr");
    const tdRm = document.createElement("td");
    const tdNomeAluno = document.createElement("td");
    const tdNomeLivro = document.createElement("td");
    const tdData = document.createElement("td");
    const tdStatus = document.createElement("td");
    const tdBtn = document.createElement("td");
    const btnConfirmar = document.createElement("img");  

    tdRm.innerText = rm;
    tdNomeAluno.innerText = usuNome;
    tdNomeLivro.innerText = nomeLivro;
    tdData.innerText = dataPedido;
    tdStatus.innerText = statusEmp;
    btnConfirmar.className = "btn";
    btnConfirmar.innerText = "Confirmar";
    btnConfirmar.src="../img/icons/aceitar.png";
    btnConfirmar.addEventListener('click', function() {

        atualizaEmpres(idEmprestimo, "Devolvido", "success", "Empréstimo Devolvido!"); // ou a função que desejo chamar ao clicar
    });
    //tdRecusar.innerText = dataAquisicao;

    tdBtn.appendChild(btnConfirmar);

    tr.appendChild(tdRm);
    tr.appendChild(tdNomeAluno);
    tr.appendChild(tdNomeLivro);
    tr.appendChild(tdData);
    tr.appendChild(tdStatus);
    tr.appendChild(tdBtn);


    corpo.appendChild(tr);
    }}
        
function AddAllItemToEmprestimos(emprestimos){
        corpo.innerHTML="";
        emprestimos.forEach(element => {
            Emprestimos(element.livro, element.usuNome,element.rm, element.dataPedido, element.dataPrazo, element.idEmprestimo, element.statusEmp);
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

function atualizaEmpres(idEmprestimo, statusEmp, sweet, texto) {
const dbRef = ref(db);

update(child(dbRef, "emprestimos/" + idEmprestimo), {
    dataDevolu: dataHoje,
    statusEmp: statusEmp
})
    .then(() => {
    Swal.fire(
        `Concluído!`,
        texto,
        sweet
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