
<?php

     require __DIR__.'/hometcc/vendor/autoload.php';
    use Kreait\Firebase\Factory;

    $factory = (new Factory)->withDatabaseUri('https://otccsb-default-rtdb.firebaseio.com');
     
    $database = $factory->createDatabase();
    $livros = $database->getReference('livros')->getSnapshot();
    $buscaLivro = $database;
   
 
?>

<!DOCTYPE html>
<html>
<head>
    <title>Pesquisa no Firebase</title>
</head>
<body>

<?php foreach($livros->getValue() as $livros) : 
            if($livros['gênero'] == 'Romance'){
    ?>
        <p>
            Nome do Livro: <?php echo $livros['nomeLivro'] ?> <br>
            Nome do Autor: <?php echo $livros['autor'] ?> <br>
            Gênero: <?php echo $livros['gênero']; }?>
        </p>
    <?php endforeach; ?>

<br>
<br>
<br>
        <input type="text" name="query" id="query" placeholder="Digite sua pesquisa...">


    <script>
// pega valor do id pesquisar
var query = document.getElementById("query");

// verifico se a tecla pressionada é o enter
query.addEventListener("keydown", function(event)
{
    if (event.key == "Enter")
    {
        searchData();
    }
});

//crio a função, uma ação para o searchData()
function searchData()
{
    window.location = 'index.php?query='+query.value;
}
    </script>
</body>
</html>
