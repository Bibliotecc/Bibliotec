<?php
    include_once("../conect.php");
    include_once("form-livros.html");

//PEGANDO VALORES DO FORM-LIVRO

$nomeLivro = filter_input(INPUT_POST,'txtnomeLivro', FILTER_SANITIZE_STRING);
$genero = filter_input(INPUT_POST,'txtgênero', FILTER_SANITIZE_STRING);
$autor = filter_input(INPUT_POST,'txtautor', FILTER_SANITIZE_STRING);

// QUERY PARA INSERÇÃO

    $result_usuario = "INSERT INTO usuario (nomeLivro,disponibilidade,gênero,autor) values ('$nomeLivro', '0','$genero','$autor');";
    $resu_use = mysqli_query($conn, $result_usuario);

// TESTANDO RECEPÇÃO DAS VARIAVEIS. SE DER CERTO, ELE VAI FALAR O NOME DO LIVRO
    echo $nomeLivro;
    echo $genero;
    echo $autor;
   
?>