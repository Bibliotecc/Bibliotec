<?php
    include_once("../conect.php");
    include_once("form-livros.html");

//PEGANDO VALORES DO FORM-LIVRO

$nomeLivro = filter_input(INPUT_POST,'txtnomeLivro', FILTER_SANITIZE_STRING);
$genero = filter_input(INPUT_POST,'txtgênero', FILTER_SANITIZE_STRING);
$autor = filter_input(INPUT_POST,'txtautor', FILTER_SANITIZE_STRING);
$img = $_FILES['imglivro']['tmp_name'];
$tamanho = $_FILES['imglivro']['size'];
$tipo = $_FILES['imglivro']['type'];
$nome = $_FILES['imglivro']['name'];

$fp = fopen($imagem, "rb");
$conteudo = fread($fp, $tamanho);
$conteudo = addslashes($conteudo);
fclose($fp);

// QUERY PARA INSERÇÃO

    $result_usuario = "INSERT INTO usuario (nomeLivro,disponibilidade,gênero,autor,imagens) values ('$nomeLivro', '0','$genero','$autor','$img');";
    $resu_use = mysqli_query($conn, $result_usuario);

// TESTANDO RECEPÇÃO DAS VARIAVEIS. SE DER CERTO, ELE VAI FALAR O NOME DO LIVRO
    echo $nomeLivro;
    echo $genero;
    echo $autor ;
   
?>