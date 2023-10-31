function validaSenha(event){
    event.preventDefault();
    var novaSenha = document.getElementById('newPass');
    var novaSenhaConfirma = document.getElementById('newPassVal');
    var atualSenha = document.getElementById('oldPass');

    var senha = novaSenha.value != null;
    var senhaAtual = atualSenha.value != null;
    var senhaConfirma = novaSenhaConfirma.value != null;

    if(!senhaAtual){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Senha atual não pode ficar em branco!',
          })
          return false;
    }

    if(!senha){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Senhas não pode ficar em branco!',
          })
          return false;
    }

    if(!senhaConfirma){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Confirmação de senha não pode ficar em branco!',
          })
          return false;
    }

    if(senha != senhaConfirma) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Senhas não conferem!',
          })
          return false;
    }
}