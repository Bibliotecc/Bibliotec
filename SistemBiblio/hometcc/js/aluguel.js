// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";

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
import {getDatabase, ref, set, get, child, onValue,update, remove } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

const db = getDatabase();

//------- REFERENCIAS PARA OS EVENTOS -----------

// ---------- INSERT FUNCTION ---------------------------

// ---------- SELECT FUNCTION ---------------------------

// REFERÊNCIAS DO CONTAINER DE DESCRIÇÃO DO LIVRO 
    var cDescBooks = document.getElementById('desc-livro-content');
// REFERÊNCIAS PARA ADD O TITLE NO HEAD 
    var Head = document.getElementById('head');

// REFERÊNCIAS PARA PEGAR ELEMENTOS DA URL
   var urlAtual = window.location.href;
   var urlClass = new URL(urlAtual);
   var alugarLivro = urlClass.searchParams.get("alugar");
   var confirmaAluguel = urlClass.searchParams.get("confirmar");

//-------------------------------------------------------------------------------------------------------------
function AddItemToTable(nomeLivro){
   console.log(alugarLivro);
//Função Adiciona Itens no local desejado
   if(alugarLivro == nomeLivro){
//EXIBINDO CAPA DO LIVRO, DESCRIÇÃO E TÍTULO--------------------------------------------------------------------------
        let img = document.createElement("img");
            img.src = "img/livros/"+nomeLivro+".jpg";

        let divEspecLivro = document.createElement("div");
            divEspecLivro.className = 'espec-estil-livro';
            let h3 = document.createElement("h3");
                h3.innerText = nomeLivro;
            let p = document.createElement("p");
                p.innerText = 'Essa é especificação do Livro';
            let a = document.createElement("a");
                a.innerText = 'Alugar';
                a.href = 'aluguel.html?alugar='+nomeLivro+'&confirmar=pstv'; // pstv = positivo
                

        divEspecLivro.appendChild(h3);
        divEspecLivro.appendChild(p);
        divEspecLivro.appendChild(a);

        cDescBooks.appendChild(img);
        cDescBooks.appendChild(divEspecLivro);
//EXIBINDO TÍTULO DO LIVRO NO HEAD ---------------------------------------------------------------------------
        let title = document.createElement("title");
            title.innerText = nomeLivro+" - BiblioTec";

        Head.appendChild(title);
    }
  } 
//-------------------------------------------------------------------------------------------------------------
function AddAllItemToTable(livro){
   cDescBooks.innerHTML="";
   livro.forEach(element => {
       AddItemToTable(element.nomeLivro);

   });
  }
//-------------------------------------------------------------------------------------------------------------  
function GetAllDataOnce(){
    //-------- get all dados ---------
   const dbref = ref(db);

   get(child(dbref, "livros"))
   .then((snapshot)=>{
       var livros =[];

       snapshot.forEach(childSnapshot => {

           livros.push(childSnapshot.val());
       });
   
       GetAllDataRealTime();
   });
}
//-------------------------------------------------------------------------------------------------------------
function GetAllDataRealTime(){
  //GET ALL TEMPO REAL 
  const dbref = ref(db, "livros");

   onValue(dbref,(snapshot)=>{
       var livros =[];
       snapshot.forEach(childSnapshot => {

           livros.push(childSnapshot.val());
       });

       AddAllItemToTable(livros);
   }) 
}
//-------------------------------------------------------------------------------------------------------------
window.onload = GetAllDataOnce;
//-------------------------------------------------------------------------------------------------------------
var dp;
function ReservarLivro(){
    const dbref = ref(db);
//PRIMEIRO PEGA VALOR DE DISPONIBILIDADE (alugarLivro == nomeLivro)
console.log(alugarLivro);
    get(child(dbref,"livros/"+alugarLivro))
    .then((snapshot)=>{
        if(snapshot.exists()){
            dp = snapshot.val().dp;
            console.log(dp);
//ALUGANDO O LIVRO.            
            if(dp > 0){
                var dpNova = dp - 1;
                    set(ref(db, "livros/"+alugarLivro),{
                        dp: dpNova,
                        gênero: snapshot.val().gênero,
                        nomeLivro: snapshot.val().nomeLivro
                    })  
                    .then(()=>{
                        alert("Livro alugado!!");
                    })
                    .catch((error)=>{
                        alert("Erro: "+ error);
                    });
            }
            else{
                alert("Livro não disponível para locação!")
            }
        
        }
        else{
            alert("Não existe esse livro em nosso banco de dados");
        }

    })
    .catch((error)=>{
        alert("Erro: "+ error);
    });

 }

//-------------------------------------------------------------------------------------------------------------
// EVENTOS
if(confirmaAluguel == "pstv"){
    ReservarLivro();
}