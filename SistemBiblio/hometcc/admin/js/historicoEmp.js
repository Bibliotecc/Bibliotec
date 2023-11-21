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
    if (psq === rm || psq === nomeLivro || psq === usuNome  || psq == "" || psq == null){        
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
        const tdAltera = document.createElement("td");
        const btnAltera = document.createElement("i");
            btnAltera.className = "fa-solid fa-pencil";
            btnAltera.cl = "fa-solid fa-pencil";
            btnAltera.addEventListener('click', function() {
                alteraStatus(idEmprestimo, statusEmp); // ou a função que desejo chamar ao clicar
            });

        tdAltera.appendChild(btnAltera);
        tr.appendChild(tdRm);
        tr.appendChild(tdNomeAluno);
        tr.appendChild(tdNomeLivro);
        tr.appendChild(tdData);
        tr.appendChild(tdDataDev);
        tr.appendChild(tdStatus);
        tr.appendChild(tdAltera);
    
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

function alteraStatus(idEmprestimo, statusEmp){
    Swal.fire({
        title: 'O Que Deseja Fazer?',
        html:   '<label for="selecao">Escolha uma opção:</label> <br>'+
        '<p> Atualmente ela está: '+statusEmp+'. <br>'+
        '<select id="selecao">'+
        '<option value="Pendente">Pendente</option>'+
        '<option value="Emprestado">Emprestado</option>'+
        '<option value="Devolvido">Devolvido</option>'+
        '<option value="Atrasado">Atrasado</option>'+
        '</select>',
        showDenyButton: true,
        confirmButtonColor: '#FF8C00',
        confirmButtonText: 'Alterar',
        denyButtonText: 'Sair',
    }).then((result) => {
        if (result.isConfirmed) {
            var select = document.getElementById('selecao');
            var valorSelecionado = select.options[select.selectedIndex].value;
            atualizaEmp(idEmprestimo, valorSelecionado);
        }
    });

}
function atualizaEmp(idEmprestimo, valorSelecionado){
    const dbRef = ref(db);

    update(child(dbRef, "emprestimos/" + idEmprestimo), {
        statusEmp: valorSelecionado
    })
        .then(() => {
        Swal.fire(
            `Concluído!`,
            'Status Alterado',
            'success'
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

window.onload = GetAllDataOnce;
