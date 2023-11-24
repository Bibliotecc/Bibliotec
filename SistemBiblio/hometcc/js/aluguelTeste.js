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
import {getDatabase, ref, push, set, get, child, onValue, 
        update } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";

const db = getDatabase();
// REFERÊNCIAS PARA PEGAR ELEMENTOS DA URL
var urlAtual = window.location.href;
var urlClass = new URL(urlAtual);
var alugarLivro = urlClass.searchParams.get("alugar");
var confirmaAluguel = urlClass.searchParams.get("confirmar"); 

function GetAllDataOnce(){
    //-------- get all dados ---------
    const dbref = ref(db);

    // Declaração de variável para armazenar livros e autores
    var livros = [];
    var autores = [];

    // Obter dados dos livros
    get(child(dbref, "livros"))
        .then((livroSnapshot) => {
            livroSnapshot.forEach((childSnapshot) => {
                livros.push(childSnapshot.val());
            });

            // Obter dados dos autores
            return get(child(dbref, "autores"));
        })
        .then((autorSnapshot) => {
            autorSnapshot.forEach((childSnapshot) => {
                autores.push(childSnapshot.val());
            });

            // Encontrar o livro com base no nome 
            var livro = livros.find((element) => element.nomeLivro == alugarLivro);

            // Encontrar o autor com base no autorId do livro
            var autor = autores.find((element) => element.autorId == livro.autorId);
            console.log(autor);

            // Chama a função para adicionar os itens à tabela
            AddItemToTable(livro, autor);
        })
        .catch((error) => {
            console.error("Erro ao obter dados :", error);
        });
}
  //-------------------------------------------------------------------------------------------------------------

function AddItemToTable(livro, autor) {
        var nomeLivro = livro.nomeLivro;

    var cDescBooks = document.getElementById('desc-livro-content');

    // Criar elementos HTML para a capa, título e botão
    let img = document.createElement("img");
    img.src = livro.urlImg;
    
    let divEspecLivro = document.createElement("div");
    divEspecLivro.className = 'espec-estil-livro';
    
    let h3 = document.createElement("h3");
        h3.innerText = nomeLivro;
    
    let p = document.createElement("p");
    p.innerText = 'Sem descrição curta no momento';
    
    let a = document.createElement("a");
    a.innerText = 'Reservar';
    a.addEventListener('click', function() {
        // Adicione a lógica de reserva aqui
        verificaDisponibilidade(livro, autor); // ou a função que você deseja chamar ao clicar em Reservar
    });

    // Adicionar elementos criados ao DOM
    divEspecLivro.appendChild(h3);
    divEspecLivro.appendChild(p);
    divEspecLivro.appendChild(a);
    
    cDescBooks.appendChild(img);
    cDescBooks.appendChild(divEspecLivro);
//----------DESCRIÇÃO DO LIVRO---------------------------
var cEspecLivro = document.getElementById("container-especificacao-livro");

    var autorNome = autor.autorNome;
    var lançamento = livro.lançamento;
    var editora = livro.editora;
    var idioma = livro.idioma;
    var numPagina = livro.numPagina;


    //---->> 1  
let divItenEspec1 = document.createElement("div");
    divItenEspec1.className = 'itens-especificacao';
let h4A = document.createElement("h4");
    h4A.innerText = "Autor(a)";
let pA = document.createElement("p");
    pA.innerText = autorNome;
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
}



function verificaDisponibilidade(livro, autorID){
    let keepLoggedIn = localStorage.getItem("keepLoggedIn");
    
    

    var numDisponivel = livro.numDisponivel;
    var numExemplar = livro.numExemplar;

    if(keepLoggedIn == "yes"){
       var user = JSON.parse(localStorage.getItem('user'));
        var rm = user.usuRM;
        var usuNome = user.usuNome
        if(numDisponivel <= numExemplar && numDisponivel != 0){
            solicitaEmprestimo(livro, autorID, numDisponivel, rm, usuNome)
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Livro Indisponível',
                text: 'Desculpe, este livro está emprestado no momento. Consulte a biblioteca para mais informações.',
            });
        }
    }else{
        Swal.fire(
            `Erro!`,
            'Você precisa estar logado',
            `error`)
    }
}

function solicitaEmprestimo(livro, autor, numDisponivel, rm, usuNome){
    const dbRef = ref(db);

    const pegaData = new Date();
    const pegaData2 = new Date();
//  
// Adiciona 10 dias à data atual
pegaData2.setDate(pegaData2.getDate() + 10);

// Obter informações específicas da nova data (ano, mês, dia, etc.)
    const ano2 = pegaData2.getFullYear();
    const mes2 = pegaData2.getMonth() + 1; // Lembre-se que os meses começam do zero
    const dia2 = pegaData2.getDate();
    const horas2 = pegaData.getHours();
    const minutos2 = pegaData.getMinutes();
    const dataDaqui10Dias = `${dia2.toString().padStart(2, '0')}-${mes2.toString().padStart(2, '0')}-${ano2} ${horas2.toString().padStart(2, '0')}:${minutos2.toString().padStart(2, '0')}`;

//
    // Obter informações específicas da data (ano, mês, dia, etc.)
    const ano = pegaData.getFullYear();
    const mes = pegaData.getMonth() + 1; // Lembre-se que os meses começam do zero
    const dia = pegaData.getDate();
    const horas = pegaData.getHours();
    const minutos = pegaData.getMinutes();
    const segundos = pegaData.getSeconds();
    const dataHoje = `${dia.toString().padStart(2, '0')}-${mes.toString().padStart(2, '0')}-${ano} ${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;

    // Use push diretamente na referência para obter uma chave única
    const novoEmprestimoRef = push(child(dbRef, "emprestimos"));

    // Obtenha a chave única gerada por push()
    const novaChave = novoEmprestimoRef.key;

        const emprestimoData = {
            idEmprestimo: novaChave,
            livro: livro.nomeLivro,
            idLivro: livro.idLivro,
            autor: autor.autorNome,
            rm: rm,
            usuNome: usuNome,
            statusEmp: "Pendente",
            dataPedido: dataHoje,
            dataPrazo: dataDaqui10Dias,
            dataDevolu: "" 
        };
        const updateData = {};
        updateData[`emprestimos/${novaChave}`] = emprestimoData;
    update(dbRef, updateData)
        .then(() => {
                    update(child(dbRef, "livros/"+livro.idLivro),{
                        numDisponivel: numDisponivel - 1
                    });
                    Swal.fire({
                        title: "Empréstimo solicitado com sucesso!",
                        text: "Vamos prosseguir para a tela principal?",
                        showCancelButton: true,
                        confirmButtonText: "Sim!",
                        showLoaderOnConfirm: true,
                        preConfirm: function () {
                            return new Promise(function (resolve) {
                                resolve([
                                    window.location = "./index.html"
                                ])
                            })
                        }
                    });
        })
        .catch(error => {
            Swal.fire(
                `Erro!`,
                'Erro ao solicitar empréstimo: ' + error,
                `error`)
        });
  

}  

// --------- EVENTOS ---------
window.onload = GetAllDataOnce;