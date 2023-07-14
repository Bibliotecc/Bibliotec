<?php

     require __DIR__.'/hometcc/vendor/autoload.php';
    use Kreait\Firebase\Factory;

    $factory = (new Factory())->withDatabaseUri('https://otccsb-default-rtdb.firebaseio.com');
     
    $database = $factory->createDatabase();
    $livros = $database->getReference('livros')->getSnapshot();
    $buscaLivro = $database;
   

?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consulta</title>
</head>
<body>
    <?php foreach ($livros->getValue() as $livros) : ?>
        <p>
            Nome do Livro: <?php echo $livros['nomeLivro'] ?> <br>
            Nome do Autor: <?php echo $livros['autor'] ?> <br>
            Gênero do Livro: <?php echo $livros['gênero'] ?>
        </p>
    <?php endforeach; ?>
</body>
</html>