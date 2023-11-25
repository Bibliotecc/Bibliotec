// Import the functions you need from the SDKs you need
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

import { getDatabase, ref, set, get, child, onValue, update, remove } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";
// Inicia Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getDatabase();

//-------------------------------------------------------------------REFERÊNCIAS 
var nomeLivro = document.getElementById("nomeLivro");
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
var ISBN =document.getElementById("ISBN");
var dataAquisicao = document.getElementById("dataAquisicao");
var volume = document.getElementById("volume");
//-------------------------------------------------------------------
//var imgLivros = document.getElementById("imgLivros");

//-----------------------------------------------------------------Referencia Botão
var btnCadastrar = document.getElementById("btnCadastrar");
//-------------------------------------------



function InsertLivroAutor(newId, newAutorId, urlImg){
    console.log(newId);
    console.log(newAutorId);
    if(newId == undefined || newId == null){
        newId = 1;
    }

    set(ref(db, "livros/"+newId),{
        idLivro: newId,
        nomeLivro: nomeLivro.value,
        autorId: newAutorId,
        editora: editora.value,
        gênero: genLivro.value,
        nomeColecao: nomeColecao.value,
        idioma: idioma.value,
        tipoItem: tipoItem.value,
        lançamento: lançamento.value,
        edição: edicao.value,
        numExemplar: numExemplar.value,
        numDisponivel: numExemplar.value,
        numTombo: numTombo.value,
        CDD: CDD.value,
        Cutter: Cutter.value,
        ISBN: ISBN.value,
        dataAquisicao: dataAquisicao.value,
        numPagina: numPagina.value,        
        volume: volume.value,
        urlImg: ""
    })
    .then(()=>{
        Swal.fire('Conseguimos Inserir os Dados do Livro!',newId, 'success');
        salvaImagem(newId);
        
    })
    .catch((error)=>{
        Swal.fire('Erro ao inserir!', ' :( Provavelmente foi um erro no servidor,Linha 77,veja: '+error, 'error');
    }); 
//----------------------------------------------------------------------------------------------------------------


}

function InsertLivro(newId, autalIdAutor){
    
    console.log(newId);
    if(newId == undefined || newId == null){
        newId = 1;
    }

    set(ref(db, "livros/"+newId),{
        idLivro: newId,
        nomeLivro: nomeLivro.value,
        autorId: autalIdAutor,
        editora: editora.value,
        gênero: genLivro.value,
        nomeColecao: nomeColecao.value,
        idioma: idioma.value,
        tipoItem: tipoItem.value,
        lançamento: lançamento.value,
        edição: edicao.value,
        numExemplar: numExemplar.value,
        numDisponivel: numExemplar.value,
        numTombo: numTombo.value,
        CDD: CDD.value,
        Cutter: Cutter.value,
        ISBN: ISBN.value,
        dataAquisicao: dataAquisicao.value,
        numPagina: numPagina.value,        
        volume: volume.value,
        urlImg: ""   
    })
    .then(()=>{
        salvaImagem(newId);
        Swal.fire('Conseguimos Inserir os Dados do Livro!', '','success');
    })
    .catch((error)=>{
        Swal.fire('Erro ao inserir!', ' :( Provavelmente foi um erro no servidor,Linha 123, veja: '+error, 'error');
    }); 

}

function GetUltimoId(){
    const dbref = ref(db);
    get(child(dbref, "livros"))
    .then((snapshot)=>{
        var livros =[];

        snapshot.forEach(childSnapshot => {
            livros.push(childSnapshot.val());
        });

        console.log(livros);

        var newIdLivros = livros[livros.length - 1].idLivro + 1;
        Swal.fire('Conseguimos gerar o novo ID do Livro! Próxima fase ->','Linha 141', 'success');
        console.log("Peguei o ID do Livro: "+ newIdLivros);
        setTimeout(function(){verificaAutorExiste(newIdLivros)}, 3000);
        
        
    })
    .catch(()=>{
        Swal.fire('Não existe livros! Sinônimo de primeiro cadastro! Bem Vindo!','Linha 156', 'success');
        setTimeout(function(){verificaAutorExiste(1)}, 7000);
        
    }); 
    
}

function verificaAutorExiste(newIdLivros) {
    const dbref = ref(db);
    console.log("Entrei no verifica com o ID do Livro: " + newIdLivros);

    get(child(dbref, "autores"))
        .then((snapshot) => {
            if (snapshot.exists()) {
                var autores = [];
                snapshot.forEach((childSnapshot) => {
                    autores.push(childSnapshot.val());
                });

                var nAutor = autores.find((autor) => autor.autorNome === nomeAutor.value);

                if (nAutor) {
                    console.log(nAutor.autorId);
                    InsertLivro(newIdLivros, nAutor.autorId);
                    Swal.fire('Esse autor já está cadastrado! Esse é ID dele: Aguarde a próxima notificação', 'success');
                    
                } else {
                
                    var novoAutorId = autores.length + 1;

                    update(ref(db, "autores/" + novoAutorId), {
                        autorId: novoAutorId,
                        autorNome: nomeAutor.value
                    })
                    .then(() => {
                        console.log("Cria tabela Autores!");
                        Swal.fire('Conseguimos gerar o novo ID para esse autor não cadastrado! Aguarde a próxima notificação', 'success');
                        InsertLivro(newIdLivros, novoAutorId);
                    })
                    .catch((error) => {
                        Swal.fire('Erro ao inserir!', ' :( Provavelmente foi um erro no servidor, Linha 189, veja: ' + error, 'error');
                    });                  
                }
            } else {
                var newAutorId = 1;
                set(ref(db, "autores/" + newAutorId), {
                    autorId: newAutorId,
                    autorNome: nomeAutor.value
                })
                    .then(() => {
                        console.log("Cria tabela Autores!");
                        Swal.fire('Conseguimos Inserir o Autor na Tabela Autores!', '', 'success');
                        InsertLivro(newIdLivros, newAutorId);
                    })
                    .catch((error) => {
                        Swal.fire('Erro ao inserir!', ' :( Provavelmente foi um erro no servidor, Linha 178, veja: ' + error, 'error');
                    });
            }
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
//EVENTOS
btnCadastrar.addEventListener('click', GetUltimoId);
//btnCadastrar.addEventListener('click', tst);








// NOTAS :
/*
    22/08/2023 ---- 20h36 
            Esse arquivo está funcionando corretamente! É necessário ajustar detalhes. 

    Dev. Lucas Moreira :>
    27/09/2023 ---- 22h50 
            Esse arquivo está funcionando corretamente! É necessário ajustar detalhes das informações do livro. 

    Dev. Lucas Moreira :>
    
    FUNCTIONS
    function limparString(txt) {
        return txt.toLowerCase().normalize('NFD').replace(/[^\w\s\u0300-\u036f]/gi, '');
    }
    function PadraoValue(texto){
        var textoPadrao;
        // Limpa a string do texto
        return textoPadrao = limparString(texto);
    }

*/