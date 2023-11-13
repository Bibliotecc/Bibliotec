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

var validaForm = document.getElementById('ValidaForm');
var usuRM = document.getElementById('txtRM');
var usuSenha = document.getElementById('txtusuSenha');

function ValidaForm(){

//   var usuNomeVal = usuNome.value;
//   var usuEmailVal = usuEmail.value;
//   var usuSenhaVal = usuSenha.value;
//   var usuSenha2Val = usuSenha2.value;

// if(!usuNomeVal){
//   Swal.fire({
//   icon: 'error',
//   title: 'Oops...',
//   text: 'Digite seu nome completo, por favor! ',
//   })
//   return false;
// }

// if(!usuEmailVal){
//   Swal.fire({
//   icon: 'error',
//   title: 'Oops...',
//   text: 'E-mail não pode ficar em branco!',
//   })
//   return false;
// }

// if(!usuSenhaVal){
//   Swal.fire({
//   icon: 'error',
//   title: 'Oops...',
//   text: 'Senhas não pode ficar em branco!',
//   })
//   return false;
// }

// if(!usuSenha2Val){
//   Swal.fire({
//   icon: 'error',
//   title: 'Oops...',
//   text: 'Confirmação de senha não pode ficar em branco!',
//   })
//   return false;
// }

// if(usuSenhaVal && usuSenha2Val && (usuSenhaVal != usuSenha2Val)) {
//   Swal.fire({
//   icon: 'error',
//   title: 'Oops...',
//   text: 'Senhas não são iguais!',
//   })
//   return false;
// }
  
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


//--------------- VERIFICA EXISTENCIA DE CONTA ------------
function VerificaContaExistente(){
  const dbRef = ref(db);
  console.log("chamado")
  get(child(dbRef, "UsuárioAutomatico/"+usuRM.value)).then((snapshot)=>{
    console.log("2");
    if(snapshot.exists()){
      console.log("3");
      if(snapshot.val().password == usuDataNasc.value){
        usuSenha.value = snapshot.val().usuNome;
        alert("Seu nome cadastrado é: "+snapshot.val().usuNome);
      }
    }
    else{
      alert("RM inválido");
    }
  })
}
// -------------- REGISTRA USERS --------------------------
function RegistreUsuario(){
  const dbRef = ref(db);
      set(ref(db, "usuário/"+usuNome.value),
      {
        usuNome: usuNome.value,
        usuDataNasc: usuDataNasc,
        usuCurso: usuCurso,
        usuRM: usuRM,
        usuTelefone: usuTelefone,
        usuEndereço: usuEndereço,
        usuCPF: usuCPF,
        usuEmail: usuEmail,
        password: cripSenha(),
        typeUser: "leitor"
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

// --------------------INICIO LOGIN--------------------------------------------------------------------------
var loginForm = document.getElementById('LoginForm');
function LoginForm(){
  var rm = document.getElementById('txtusuNomeL');
  var usuSenhaL = document.getElementById('txtusuSenhaL');

  var usuNomeVal = rm.value;
  var usuSenhaLVal = usuSenhaL.value;

if(!usuNomeVal){
  Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Preencha o campo nome, por favor! ',
  })
  return false;
}

if(!usuSenhaLVal){
  Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'A senha não pode ficar em branco!',
  })
  return false;
}

  const dbRef = ref(db);
      get(child(dbRef, "UsuarioAutomatico/usuarios/"+rm.value)).then((snapshot)=>{
        if(snapshot.exists()){
          let dbpass = snapshot.val().password;
          console.log(dbpass);
          if(dbpass == usuSenhaL.value){
            if(snapshot.val().primAcesso == true){
              window.location = "./primeiroAcesso.html";
            }
            else{
              Login(snapshot.val());
            }
          }
          else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Senha Incorreta Amigo Leitor!',
              })
          }
        }
      });
}
function Login(user){
  localStorage.setItem('keepLoggedIn', 'yes');
  localStorage.setItem('user', JSON.stringify(user));
  if(user.typeUser == "admin" ){
    window.location = 'admin/index.html';
  }
  else{
    window.location ='index.html';
  }
}

loginForm.addEventListener('click', LoginForm);
// --------------------FIM LOGIN-----------------------------------------------------------------------------