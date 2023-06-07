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

function ValidaForm(){
  var usuEmail = document.getElementById('txtusuEmail');
  var usuSenha = document.getElementById('txtusuSenha');
  var usuSenha2 = document.getElementById('txtusuSenha2');

  var usuEmailVal = usuEmail.value;
  var usuSenhaVal = usuSenha.value;
  var usuSenha2Val = usuSenha2.value;

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
      Swal.fire('Salvo', '', 'success')
    } else if (result.isDenied) {
      Swal.fire('Dados não salvos', '', 'error')
    }
  })
}
