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
// --------------INICIO REDEFINIR SENHA----------------------------------------------------------------------
var validaForm = document.getElementById('ValidaForm');
function updateSenha(){
  var rm = document.getElementById('usuRM');
  var usuSenha = document.getElementById('usuSenha');
  var confirmaSenha = document.getElementById('confirmaSenha');
  if(!rm.value){
    Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Preencha o campo RM, por favor! ',
    })
    return false;
  }
  
  if(!usuSenha.value){
    Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'A senha não pode ficar em branco!',
    })
    return false;
  }
  if(!confirmaSenha.value){
    Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'A coonfirmação de senha não pode ficar em branco!',
    })
    return false;
  }
  if(confirmaSenha.value != usuSenha.value){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'As Senhas não conferem!',
        })
}
if (usuSenha.value == confirmaSenha.value) {
  const dbRef = ref(db);
  get(child(dbRef, "UsuarioAutomatico/usuarios/" + rm.value)).then((snapshot) => {
    if (snapshot.exists()) {
      let dbpass = snapshot.val().password;
      console.log(decPass(dbpass));

      if (snapshot.val().primAcesso == true) {
        const dbref = ref(db);
        update(child(dbref, "UsuarioAutomatico/usuarios/" + rm.value), {
          password: cripSenha(),
          primAcesso: false
        }).then(() => {
          Swal.fire({
            title: "Bom trabalho!",
            text: "Sua senha foi alterada!",
            icon: "success",
            confirmButtonText: "Ok"
          }).then((result) => {
            if (result.isConfirmed){
              window.location = './index.html';
            }
          });
        }).catch(error => {
          Swal.fire(
            `Erro!`,
            'Erro ao redefinir senha: ' + error,
            `error`
          );
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'A Senha Já Foi Redefinida!',
        });
      }
    }
  });
}
}

validaForm.addEventListener('click', updateSenha);

