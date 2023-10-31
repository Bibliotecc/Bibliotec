function validaSenha(){
    var novaSenha = document.getElementById('newPass');
    var novaSenhaConfirma = document.getElementById('newPassVal');

    var senha = novaSenha.value;
    var senhaConfirma = novaSenhaConfirma.value;

    if(senha != senhaConfirma) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Senhas não conferem!',
          })
          return false;
    }
}