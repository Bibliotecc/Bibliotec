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
// --------------------INICIO LOGIN--------------------------------------------------------------------------
var loginForm = document.getElementById('LoginForm');
function LoginForm(){
  var rm = document.getElementById('txtRM');
  var usuSenhaL = document.getElementById('txtusuSenhaL');

  var rmVal = rm.value;
  var usuSenhaLVal = usuSenhaL.value;

if(!rmVal){
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
          console.log(decPass(dbpass));
          if(decPass(dbpass) == usuSenhaL.value){
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

