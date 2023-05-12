 <?php /*
include_once("conect.php");
// FAZER INCLUDE DE AUTENTICAÇÃO


if(!empty($_GET['search']))
{
    $data = $_GET['search'];
    $sql = "SELECT * FROM usuario WHERE ID LIKE 'a%' or nome LIKE 'a%' ORDER BY nome ASC";
}
else
{
    $sql = "SELECT * FROM usuario ORDER BY ID ASC";
}
$result = $conn->query($sql);
*/
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
                    <li> <a href="#"> <img src="img/logotcc.png" alt="logotcc"> </a> </li>
                    <li> 
                        <input type="text" name="txtBuscaLivro" id="txtBuscaLivro" placeholder="O que você esta procurando?"> </li>
                    <li> <a href="#"> Filtros <img src="img/icons/seta.png" alt="" class="icon"> </a> </li>
                    <li> <a href="#"> Login <img src="img/icons/login.png" alt="" class="icon"> </a> </li>
                </ul>
            </nav>
        </div>
    </header>
</body>
</html>