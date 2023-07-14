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

var formentrar = document.querySelector('#entrar')
var formcadastrar = document.querySelector('#cadastrar-se')

var btncolor = document.querySelector('.btncolor')

document.querySelector('#btnentrar').addEventListener('click',()=>{
  formentrar.style.left = "25px"
  formcadastrar.style.left = "450px"
  btncolor.style.left = "0px"
  btncolor.style.width = "100px"
});

document.querySelector('#cadastrar').addEventListener('click',()=>{
  formentrar.style.left = "-450px"
  formcadastrar.style.left = "25px"
  btncolor.style.left = "105px"
  btncolor.style.width = "134px"
});

var validaForm = document.getElementById('ValidaForm');

function ValidaForm(){
  var usuEmail = document.getElementById('txtusuEmail');
  var usuSenha = document.getElementById('txtusuSenha');
  var usuSenha2 = document.getElementById('txtusuSenha2');
  var usuNome = document.getElementById('txtusuNome');
 
  var usuNomeVal = usuNome.value;
  var usuEmailVal = usuEmail.value;
  var usuSenhaVal = usuSenha.value;
  var usuSenha2Val = usuSenha2.value;

if(!usuNomeVal){
  Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Digite seu nome completo, por favor! ',
  })
  return false;
}

if(!usuEmailVal){
  Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'E-mail não pode ficar em branco!',
  })
  return false;
}

if(!usuSenhaVal){
  Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Senhas não pode ficar em branco!',
  })
  return false;
}

if(!usuSenha2Val){
  Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Confirmação de senha não pode ficar em branco!',
  })
  return false;
}

if(usuSenhaVal && usuSenha2Val && (usuSenhaVal != usuSenha2Val)) {
  Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Senhas não são iguais!',
  })
  return false;
}
  
  Swal.fire({
    title: 'Você deseja salvar seus dados?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Salvar',
    denyButtonText: `Não Salvar`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      VerificaContaExistente();
    } else if (result.isDenied) {
      Swal.fire('Dados não salvos', '', 'error')
    }
  })

 //------- REFERENCIAS -----------
var usuEmail = document.getElementById("txtusuEmail");
var usuNome = document.getElementById("txtusuNome");
// var usuSenha = document.getElementById("txtusuSenha");

//--------------- VERIFICA EXISTENCIA DE CONTA ------------
function VerificaContaExistente(){
  const dbRef = ref(db);
  get(child(dbRef, "usuário/"+usuNome.value)).then((snapshot)=>{
    if(snapshot.exists()){
      Swal.fire('Dados Já Existentes!', '', 'error')
    }
    else{
      RegistreUsuario();
    }
  })
}
// -------------- REGISTRA USERS --------------------------
function RegistreUsuario(){
  const dbRef = ref(db);
      set(ref(db, "usuário/"+usuNome.value),
      {
        email: usuEmail.value,
        password: cripSenha()
      })
      .then(()=>{
        Swal.fire('Dados Salvos!', '', 'success')
      })
      .catch((error)=>{
        alert("Erro: "+ error);
    });
  }


}
validaForm.addEventListener('click', ValidaForm);
// Info.: O ValidaForm está funcionando corretamente, se houver alguma dúvida, fale com Dev. Lucas Moreira Ferreira

