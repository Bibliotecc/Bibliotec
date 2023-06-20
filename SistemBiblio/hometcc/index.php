<?php

     require __DIR__.'/vendor/autoload.php';
    use Kreait\Firebase\Factory;

    $factory = (new Factory())->withDatabaseUri('https://otccsb-default-rtdb.firebaseio.com');
     
    $database = $factory->createDatabase();
    $livros = $database->getReference('livros')->getSnapshot();

if(!empty($_GET['search']))
    {
        $pesquisa = $_GET['search'];
        $buscaLivro = $database->getReference('livros/'.$pesquisa)->getSnapshot();
    }
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <title>Bibliotec</title>
</head>
<body>
    <header>
        <div class="container">
            <nav class="menu">
                <ul>
                    <li> <a href="index.php"> <img src="img/logo/logotcc.png" alt="logotcc"> </a> </li>
                    <li>
                         <input type="text" name="txtBuscaLivro" id="txtBuscaLivro" placeholder="O que você esta procurando?"> 
                    </li>
                        <li class="dropdown"> <a href="#"> Filtros <img src="img/icons/seta.png" alt="" class="icon"> </a> 
                        <div class="dropdown-menu">
                            <a href="#"> Ação </a>
                            <a href="#"> Aventura </a>
                            <a href="#"> Romance </a>
                            <a href="#"> Comédia </a>
                            <a href="#">Ficção cientifica</a>
                        </div>
                    </li>
                    <li> <a href="login.html"> Login <img src="img/icons/login.png" alt="" class="icon"> </a> </li>
                </ul>
            </nav>
        </div>
    </header>
    <div class="background-fundo-all">
        <div class="container">
        <?php if(empty($pesquisa)){  ?>
            <h1> Romance </h1> 
        <?php } ?>
            <div class="container-books">
        <!--INICIO DO PHP FOR EACH PARA CATEGORIA ROMANCE-->
        <?php if(empty($pesquisa)){  // IF condicional da pesquisa! 
        foreach ($livros->getValue() as $livros) : ?>
            <div class="estil-books">
                    <img src="img/livros/<?php echo $livros['nomeLivro']?>.jpg" alt="">
                    <a href="aluguel.html"> Alugar </a>
            </div>
            <?php endforeach; }?> 
        <!--FIM DO PHP FOR EACH PARA A CATEGORIA ROMANCA-->    
             </div>
            <h1> Poesia </h1>
            <?php if(empty($pesquisa)){  // IF condicional da pesquisa! 
        foreach ($livros->getValue() as $livros) : ?>
            <div class="estil-books">
                    <img src="img/livros/<?php echo $livros['nomeLivro']?>.jpg" alt="">
                    <a href="aluguel.html"> Alugar </a>
            </div>
            <?php endforeach; }?> 
            </div>
        </div>
    </div>
    <footer>
        <div class="container">
            <div class="container-footer">
                <a href="#"> <img src="img/logo/facebook.png" alt=""> </a>
                <a href="#"> <img src="img/logo/instagram.png" alt=""> </a>
                <a href="#"> <img src="img/logo/twitter.png" alt=""> </a>
            </div>
        </div>
    </footer>
    <div class="end-page">
        <div class="container">
            <div class="container-desc">
                <div class="estil-titulo-endpage">
                    <h2> Criadores do Site </h2>
                    <h2> 3º Desenvolvimento de Sistemas </h2>
                </div>
                <div class="estil-endpage">
                    <p>Bruno</p>
                    <p>Diogo</p>
                    <p>Felipe</p>
                    <p>Gabriella</p>
                    <p>Livia</p>
                    <p>Lucas</p>
                    <p>Lucca</p>
                    <p>Pedro</p>    
                    <p>Renzo</p>
                </div>
            </div>
        </div>
    </div>
<script>
// pega valor do id pesquisar
var search = document.getElementById("txtBuscaLivro");

// verifico se a tecla pressionada é o enter
search.addEventListener("keydown", function(event)
{
    if (event.key == "Enter")
    {
        searchData();
    }
});

//crio a função, uma ação para o searchData()
function searchData()
{
    window.location = 'index.php?search='+search.value;
}
    </script>
</body>
</html>