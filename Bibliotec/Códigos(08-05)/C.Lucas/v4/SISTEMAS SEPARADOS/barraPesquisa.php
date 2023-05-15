<?php 
include_once("conect.php");
// FAZER INCLUDE DE AUTENTICÃO


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

?>