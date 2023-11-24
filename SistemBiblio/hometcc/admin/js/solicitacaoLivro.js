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
function Emprestimos(nomeLivro, usuNome, rm, dataPedido, idEmprestimo, statusEmp) {
    if(statusEmp == "Pendente"){
    const tr = document.createElement("tr");
    const tdRm = document.createElement("td");
    const tdNomeAluno = document.createElement("td");
    const tdNomeLivro = document.createElement("td");
    const tdData = document.createElement("td");
    const tdBtn = document.createElement("td");
    const btnConfirmar = document.createElement("img");
    const tdBtnn = document.createElement("td");
    const btnRecusar = document.createElement("img");  

    tdRm.innerText = rm;
    tdNomeAluno.innerText = usuNome;
    tdNomeLivro.innerText = nomeLivro;
    tdData.innerText = dataPedido;
    btnConfirmar.className = "btn";
    btnConfirmar.innerText = "Confirmar";
    btnConfirmar.src="../img/icons/aceitar.png";
    btnConfirmar.addEventListener('click', function() {

        atualizaEmpres(idEmprestimo, "Emprestado", "success", "Empréstimo Autorizado!"); // ou a função que desejo chamar ao clicar
    });
    //tdRecusar.innerText = dataAquisicao;
    btnRecusar.className = "btn";
    btnRecusar.innerText = "Recusar";
    btnRecusar.src="../img/icons/cancelar.png";
    btnRecusar.addEventListener('click', function(){
        atualizaEmpres(idEmprestimo, "Recusado", "error", "Empréstimo Recusado!");
    });

    tdBtn.appendChild(btnConfirmar);
    tdBtnn.appendChild(btnRecusar);

    tr.appendChild(tdRm);
    tr.appendChild(tdNomeAluno);
    tr.appendChild(tdNomeLivro);
    tr.appendChild(tdData);
    tr.appendChild(tdBtn);
    tr.appendChild(tdBtnn);




    corpo.appendChild(tr);
    }}
        
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

const pegaData = new Date();

function atualizaEmpres(idEmprestimo, statusEmp, sweet, texto) {
const dbRef = ref(db);

const dataDevolucao = new Date(pegaData);
dataDevolucao.setDate(dataDevolucao.getDate() + 10);
// Obter informações específicas da data de devolução
const anoDevolucao = dataDevolucao.getFullYear();
const mesDevolucao = dataDevolucao.getMonth() + 1; // Lembre-se que os meses começam do zero
const diaDevolucao = dataDevolucao.getDate();
const horas = pegaData.getHours();
const minutos = pegaData.getMinutes();

// Formatar a data de devolução como uma string
const dataDevolucaoFormatada = `${diaDevolucao.toString().padStart(2, '0')}-${mesDevolucao.toString().padStart(2, '0')}-${anoDevolucao} ${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;

update(child(dbRef, "emprestimos/" + idEmprestimo), {
    dataPrazo: dataDevolucaoFormatada,
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