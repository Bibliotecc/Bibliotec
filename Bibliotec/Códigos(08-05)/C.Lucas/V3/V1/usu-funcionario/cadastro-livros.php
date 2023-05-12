<?php
    include_once("../conect.php");
    include_once("form-livros.html");

//PEGANDO VALORES DO FORM-LIVRO

$nomeLivro = filter_input(INPUT_POST,'txtnomeLivro', FILTER_SANITIZE_STRING);

// QUERY PARA INSERÇÃO

    $result_usuario = "INSERT INTO usuario (nome,dp) values ('$nomeLivro', '0');";
    $resu_use = mysqli_query($conn, $result_usuario);

    echo $nomeLivro;
   
?>