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


// Referências aos campos tanto do FIREBASE quanto no FORMULÁRIO de alteração
var nomeLivro = document.getElementById('nomeLivro');
const dbrefLivro = ref(db, "livros/"+nomeLivro.value);
var genero = document.getElementById('genero');
// COLOCA OS OUTROS CAMPOS AQ

dbrefLivro.once('value').then(function(snapshot) {
    var dados = snapshot.val();
    nomeLivro.value = dados.nomeLivro;
    genero.value = dados.gênero;
    // COLOCA OS OUTROS CAMPOS AQ
}).catch(function(error) {
    console.log("NÃO BUSCOU OS DADOS: " + error);
    alert("NÃO BUSCOU OS DADOS: " + error);
});


function atualizaLivros() {
    var novoNomeLivro = nomeLivro.value;
    var novogenero = genero.value;


    update(child(dbref, "livros/"+nomeLivro.value),{

        nomeLivro: novoNomeLivro,
        gênero: novogenero
       // COLOCA OS OUTROS CAMPOS AQ
    }).then(function() {
        console.log("ALTERAÇÃO FEITA!");
        alert("ALTERAÇÃO FEITA!");
    }).catch(function(error) {
        console.error("ERRO AO ALTERAR: " + error);
        alert("ERRO AO ALTERAR: " + error);
    });
}

// CHAMAR A FUNÇÃO ATUALIZA LIVROS QUANDO PRESSIONAR O BOTÃO