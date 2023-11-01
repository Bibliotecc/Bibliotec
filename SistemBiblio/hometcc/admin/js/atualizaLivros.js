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
import { getDatabase, ref, set, get, child, onValue, update, remove, } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

const db = getDatabase();

// Aqui são todas as configurações necessárias para acessar o banco de dados. O que está dentro das chaves do import,
// são os metódos que executam a função ao qual recebem o nome. Dev. Lucas Moreira

//Referências URL
var urlAtual = window.location.href;
var urlClass = new URL(urlAtual);
var nameLivro = urlClass.searchParams.get("name");


var btnEditar = document.getElementById("bntEditar");

// Referências aos campos tanto do FIREBASE quanto no FORMULÁRIO de alteração
var nomeLivro = document.getElementById('nomeLivro');
var nomeAutor = document.getElementById("nomeAutor");
var editora = document.getElementById("editora");
var genLivro = document.getElementById("genLivro");
var nomeColecao = document.getElementById("nomeColecao");
var idioma = document.getElementById("idioma");
var tipoItem = document.getElementById("tipoItem");
var lançamento = document.getElementById("lançamento");
var edicao = document.getElementById("edição");
var numExemplar = document.getElementById("numExemplar");
var numTombo =  document.getElementById("numTombo");
var numPagina = document.getElementById("numPagina");
var CDD = document.getElementById("CDD");
var Cutter = document.getElementById("Cutter");
var ISBN = document.getElementById("ISBN");
var dataAquisicao = document.getElementById("dataAquisicao");
var volume = document.getElementById("volume");



var nickLivro; // criado fora da função para ser usado em qualquer uma
function buscaDados(livro){
    var arrayLivro = livro.find((element) => element.nomeLivro == nameLivro);
     nickLivro = arrayLivro.idLivro;
// Acima eu tratei a array do livro que bate com o "pesquisado". Use console.log(arrayLivro) para ver

     const dbref = ref(db, "livros/" + nickLivro);
     if (nomeLivro.value === "") { //o sinal de = três verifica significa que ele verifica se o valor é igual e se o tipo também é
        Swal.fire({
            title: 'Erro',
            text: 'Por favor, insira o nome do livro',
            icon: 'error'
        });
        return;
    }

     Swal.fire({
        title: 'Deseja buscar por: "'+nameLivro+'" ?',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        confirmButtonText: 'Sim, buscar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return new Promise((resolve, reject) => {
                onValue(dbref, (snapshot) => {
                    const dados = snapshot.val();
                    if (dados) {
                        resolve(dados);
                    } else {
                        reject('Verifique o nome do livro');
                        closed;
                    }
                });
            });
        },
        allowOutsideClick: () => !Swal.isLoading()
    })
    .then((result) => {
        if (result.value) {
            preencherFormulario(result.value);
            Swal.fire({
                title: 'Encontrei os dados!',
                icon: 'success',
            });
        } else {
            Swal.fire({
                title: 'Busca cancelada',
                text: result.value,
                icon: 'error',
            });
        }
    });
} 

nomeLivro.value = nameLivro;
function preencherFormulario(dados){   
    genLivro.value = dados.gênero;
    nomeAutor.value = dados.nomeAutor;
    editora.value = dados.editora;
    nomeColecao.value = dados.nomeColecao;
    idioma.value = dados.idioma;
    tipoItem.value = dados.tipoItem;
    lançamento.value = dados.lançamento;
    edicao.value = dados.edicao;
    numExemplar.value = dados.numExemplar;
    numTombo.value = dados.numTombo;
    numPagina.value = dados.numPagina;
    CDD.value = dados.CDD;
    Cutter.value = dados.Cutter;
    ISBN.value = dados.ISBN;
    dataAquisicao.value = dados.dataAquisicao;
    volume.value = dados.volume;
    // COLOCA OS OUTROS CAMPOS AQ
}

function atualizaLivros() {
    var novoNomeLivro = nomeLivro.value;
    var novoGenLivro = genLivro.value;
    var novoNomeAutor = nomeAutor.value;
    var novoEditora = editora.value;
    var novoNomeColecao = nomeColecao.value;
    var novoIdioma = idioma.value;
    var novoTipoItem = tipoItem.value;
    var novoLançamento = lançamento.value;
    var novoEdicao = edicao.value;
    var novoNumExemplar = numExemplar.value;
    var novoNumTombo = numTombo.value;
    var novoNumPagina = numPagina.value;
    var novoCDD = CDD.value;
    var novoCutter = Cutter.value;
    var novoISBN = ISBN.value;
    var novoDataAquisicao = dataAquisicao.value;
    var novoVolume = volume.value;

const dbref = ref(db);
    update(child(dbref, "livros/"+nickLivro),{
        nomeLivro: novoNomeLivro,
        genLivro: novoGenLivro,
        nomeAutor: novoNomeAutor,
        editora: novoEditora,
        nomeColecao: novoNomeColecao,
        idioma: novoIdioma,
        tipoItem: novoTipoItem,
        lançamento: novoLançamento,
        edicao: novoEdicao,
        numExemplar: novoNumExemplar,
        numTombo: novoNumTombo,
        numPagina: novoNumPagina,
        CDD: novoCDD,
        Cutter: novoCutter,
        ISBN: novoISBN,
        dataAquisicao: novoDataAquisicao,
        volume: novoVolume

    }).then(function() {
        Swal.fire({
            title: 'Dados alterados!',
            icon: 'success',
        });
    }).catch(function(error) {
        Swal.fire({
            title: 'Erro ao alterar!',
            text: error,
            icon: 'error',
        });
    });
}

// CHAMAR A FUNÇÃO ATUALIZA LIVROS QUANDO PRESSIONAR O BOTÃO
btnEditar.addEventListener('click', atualizaLivros);


// EVENTOS SUSTENTAM O SISTEMA
function GetAllDataRealTime() {
    const dbref = ref(db, "livros");

    onValue(dbref, (snapshot) => {
        var livros = [];
        snapshot.forEach(childSnapshot => {
            livros.push(childSnapshot.val());
        });
        
        buscaDados(livros);
        
    })
}

window.onload = GetAllDataRealTime;