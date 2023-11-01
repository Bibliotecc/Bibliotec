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
import { getDatabase, ref, set, get, child, onValue, update, remove } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

const db = getDatabase();

// Aqui são todas as configurações necessárias para acessar o banco de dados. O que está dentro das chaves do import,
// são os metódos que executam a função ao qual recebem o nome. Dev. Lucas Moreira

var btnEditar = document.getElementById("bntEditar");
// Referências aos campos tanto do FIREBASE quanto no FORMULÁRIO de alteração
var nomeLivro = document.getElementById('nomeLivro');
const dbrefLivro = ref(db, "livros/"+nomeLivro.value);
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


// COLOCA OS OUTROS CAMPOS AQ

dbrefLivro.once('value').then(function(snapshot) {
    var dados = snapshot.val();
    nomeLivro.value = dados.nomeLivro;
    genLivro.value = dados.genLivro;
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
}).catch(function(error) {
    console.log("NÃO BUSCOU OS DADOS: " + error);
    alert("NÃO BUSCOU OS DADOS: " + error);
});


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

    update(child(dbref, "livros/"+nomeLivro.value),{

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
        console.log("ALTERAÇÃO FEITA!");
        alert("ALTERAÇÃO FEITA!");
    }).catch(function(error) {
        console.error("ERRO AO ALTERAR: " + error);
        alert("ERRO AO ALTERAR: " + error);
    });
}

// CHAMAR A FUNÇÃO ATUALIZA LIVROS QUANDO PRESSIONAR O BOTÃO
btnEditar.addEventListener('click', atualizaLivros);