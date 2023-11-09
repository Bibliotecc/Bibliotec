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

//----------------------SOLICITAÇÃO DE SENHA-------------------------------------------------
var solictSenha = document.getElementById("solictSenha");
solictSenha.addEventListener('click', solicitaSenha);
function solicitaSenha(){
  Swal.fire({
    title: "Preencha os campos, será rápido!",
    html: 
          '<input id="inEmail" type="text" class="swal2-input" placeholder="Email Instirucional"> <br>' +
          '<input id="rm" type="text" class="swal2-input" placeholder="RM">',
    showCancelButton: true,
    confirmButtonText: "Look up",
    showLoaderOnConfirm: true,
    preConfirm: function () {
        return new Promise(function (resolve) {
          resolve([
                validaEmail($('#inEmail').val(), $('#rm').val())
          ])
        })  
    }});
}

function validaEmail(email, rm){
    const dbRef = ref(db);
    get(child(dbRef, "UsuarioAutomatico/emails/"+rm)).then((snapshot)=>{
      if(snapshot.exists()){
        let emailInst = snapshot.val();
        var emailTu = emailInst.usuEmailInstitucional
        console.log(emailTu);
        if(emailTu == email){
          geraPassword(email, rm);
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Não existe usuário cadastrado com esse email!!',
            })
        }
      }
      else{
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Não existe usuário cadastrado com esse RM!!',
              })
      }
    });
  }
  
function geraPassword(email, rm) { //GERA SENHA
      var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJLMNOPQRSTUVWXYZ!@#$%^&*()+?><:{}[]"; //TODOS CARACTERES
      var passwordLength = 6; //TAMANHO DA SENHA
      var password = "";
  
      for (var i = 0; i < passwordLength; i++) { // VAI ADD ENQUANTO NÃO ATINGIR 6
        var randomNumber = Math.floor(Math.random() * chars.length); // BIBLIOTECA MATH PARA FAZER CALCULOS
        password += chars.substring(randomNumber, randomNumber + 1);
      }
      SolicitaReset(email,password, rm);
    }
  
async function SolicitaReset(email,password, rm){ 
          if (email) {
          $.ajax({
              type:"POST",
              url:'https://sitedoaugusto.com/bibliotec/get_pass.php',
              data:{
                  email: email,
                  senha: password
              },crossDomain: true,
              beforeSend: function() {
                  Swal.fire({
                      title: 'Aguarde!',
                      text: 'Estamos esperando enquanto o servidor responde!',
                      icon: 'info'
                  });
                  Swal.showLoading()
              },
              success: function(retorno){
                  console.log(retorno);
                  if(retorno == 0){
                      Swal.fire(
                          'Oh.. Oh... |:´(',
                          'Não existe usuário cadastrado com esse email!',
                          'warning'
                      )
                  }if(retorno == 1){
                      const dbref = ref(db);
                      update(child(dbref, "UsuarioAutomatico/usuarios/"+rm),{
                          password: password
                      }).then(() => {
                          Swal.fire(
                              `Sucesso!`,
                              `Senha temporária definida e orientações enviadas para o email: ${email}`,
                              `success`)
                        })
                        .catch(error => {
                          Swal.fire(
                              `Erro!`,
                              'Erro ao definir senha temporária: ' + error,
                              `error`)
                        });
                  }else{
                      Swal.fire(
                          `Erro`,
                          `Não foi possível realizar sua solicitação! Verifique se o email informado está correto!`,
                          `error`)
                  }
              }
          });
          
          }
      }

    //   var body = "seu email é "+email+"<br>sua senha temporária é :"+senha;
    //   var body2 = `<a href"sitedoaugusto.com">Clique aqui</a>`