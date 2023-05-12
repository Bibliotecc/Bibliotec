var formentrar = document.querySelector('#entrar')
var formcadastrar = document.querySelector('#cadastrar')
var btncolor = document.querySelector('.buttonsform')

  document.querySelector('.form-control-login').addEventListener('click',()=>{
    formentrar.style.left = "25px"
    formcadastrar.style.left = "450px"
    btncolor.style.left = "0px"
  })

  document.querySelector('.form-control-cadastro').addEventListener('click',()=>{
    formentrar.style.left = "-450px"
    formcadastrar.style.left = "25px"
    btncolor.style.left = "110px"
  })