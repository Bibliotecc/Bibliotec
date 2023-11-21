import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-storage.js";

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
const storage = getStorage(app);

// Aqui são todas as configurações necessárias para acessar o banco de dados. O que está dentro das chaves do import,
// são os metódos que executam a função ao qual recebem o nome. Dev. Lucas Moreira

//Referências URL
var urlAtual = window.location.href;
var urlClass = new URL(urlAtual);
var nameLivro = urlClass.searchParams.get("name");


var btnEditar = document.getElementById("bntEditar");

// Referências aos campos tanto do FIREBASE quanto no FORMULÁRIO de alteração
var nomeLivro = document.getElementById('nomeLivro');
var nameAutor = document.getElementById("nomeAutor");
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
var idLivro;
var autorId = document.getElementById("autorId");


var nickLivro;
var nomeAutor; // criado fora da função para ser usado em qualquer uma
function buscaDados(livro, autores){
    var arrayLivro = livro.find((element) => element.nomeLivro == nameLivro);
     nickLivro = arrayLivro.idLivro;
     var idAutor = arrayLivro.autorId;
     var arrayAutor = autores.find((element) => element.autorId == idAutor); // Nome do Autor
     nomeAutor = arrayAutor.autorNome; // Acima eu tratei a array do livro que bate com o "pesquisado". Use console.log(arrayLivro) para ver
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
        title: 'buscando por:"'+nameLivro+'" ',
        confirmButtonText: 'ok',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return new Promise((resolve, reject) => {
                onValue(dbref, (snapshot) => {
                    const dados = snapshot.val();
                    if (dados) {
                            console.log(nomeAutor);
                        resolve(dados, nomeAutor, autores);
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
            preencherFormulario(result.value, nomeAutor, autores);
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
var autoress;
var nAutor;
function preencherFormulario(dados, nomeAutor, autores){

    autoress = autores;
    nAutor = autores.find((element) => element.autorNome == nomeAutor); // Nome do Autor
    idAutor =  nAutor.autorId;

    
    console.log(idAutor);

    autorId.value =  idAutor + " (Permanece o ID do autor cadastrado, até edita-lo)";
    idLivro = dados.idLivro; 
    genLivro.value = dados.gênero;
    nameAutor.value = nomeAutor;
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
var idAutor;
function atualizaLivros() {
    const dbref = ref(db);

    var novoNomeLivro;
    var novoGenLivro; 
    var novoIdAutor; 
    var novoEditora;
    var novoIdioma;
    var novoNomeColecao;
    var novoTipoItem; 
    var novoLançamento; 
    var novoEdicao; 
    var novoNumExemplar; 
    var novoNumTombo; 
    var novoNumPagina; 
    var novoCDD;
    var novoCutter; 
    var novoISBN; 
    var novoDataAquisicao; 
    var novoVolume;

    var nAutorr = autoress.find((element) => element.autorNome == nameAutor.value); // Nome do Autor
    var idAutorNovo =  nAutorr.autorId;

    novoNomeLivro = nomeLivro.value;
    novoGenLivro = genLivro.value;
    novoIdAutor = idAutorNovo;
    novoEditora = editora.value;
    novoNomeColecao = nomeColecao.value;
    novoIdioma = idioma.value;
    novoTipoItem = tipoItem.value;
    novoLançamento = lançamento.value;
    novoEdicao = edicao.value;
    novoNumExemplar = numExemplar.value;
    novoNumTombo = numTombo.value;
    novoNumPagina = numPagina.value;
    novoCDD = CDD.value;
    novoCutter = Cutter.value;
    novoISBN = ISBN.value;
    novoDataAquisicao = dataAquisicao.value;
    novoVolume = volume.value;

    update(child(dbref, "livros/"+nickLivro),{
        nomeLivro: novoNomeLivro,
        genLivro: novoGenLivro,
        autorId : novoIdAutor,
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
        volume: novoVolume,
    }).then(function() {
        salvaImagem(idLivro);
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
function salvaImagem(idLivro) {
    const dbref = ref(db);
    // Obtém o elemento de entrada de arquivo pelo ID
    const inputFile = document.querySelector("#imgLivro");
    var urlImg;
    // Verifica se um arquivo foi selecionado
    if (inputFile.files.length > 0) {
        // Pega o primeiro arquivo do input
        const imgLivro = inputFile.files[0];
        
        // Referência para o local onde você deseja armazenar o arquivo no Storage
        const storageRe = storageRef(storage, 'img/livros/' + imgLivro.name);
        
        // Faz o upload do arquivo
        uploadBytes(storageRe, imgLivro)
            .then((snapshot) => {
                console.log("Sucesso ao salvar imagem!");
                // Obtém a URL do arquivo após o upload
                return getDownloadURL(snapshot.ref);
            })
            .then((downloadURL) => {
                 urlImg = downloadURL;
                console.log('Imagem disponível em:', urlImg);
                update(child(dbref, "livros/"+idLivro),{
                    urlImg: downloadURL
                }).then(() => {
                    console.log("Dados de 'livros' atualizados com sucesso!");
                  })
                  .catch(error => {
                    console.error("Erro ao atualizar dados de 'livros': ", error);
                  });
            })
            .catch((error) => {
                console.log("Erro ao salvar imagem!", error);
            });
    } else {
        console.error("Nenhum arquivo selecionado!");
    }
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
        
        buscaAutor(livros);
        
    })
}
function buscaAutor(livros){
    const dbref = ref(db, "autores");

    onValue(dbref, (snapshot) => {
        var autores = [];
        snapshot.forEach(childSnapshot => {
            autores.push(childSnapshot.val());
        });
        
        buscaDados(livros, autores);
        
    })
}
window.onload = GetAllDataRealTime;