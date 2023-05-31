var formentrar = document.querySelector('#entrar')
var formcadastrar = document.querySelector('#cadastrar-se')
var btncolor = document.querySelector('.btncolor')

  document.querySelector('#btnentrar').addEventListener('click',()=>{
    formentrar.style.left = "25px"
    formcadastrar.style.left = "450px"
    btncolor.style.left = "0px"
  })

  document.querySelector('#cadastrar').addEventListener('click',()=>{
    formentrar.style.left = "-450px"
    formcadastrar.style.left = "25px"
    btncolor.style.left = "120px"
  })