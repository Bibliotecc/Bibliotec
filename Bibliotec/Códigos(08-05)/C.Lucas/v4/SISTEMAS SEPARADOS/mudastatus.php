<?php 
include_once ("conect.php");
// FAZER INCLUDE DE AUTENTICÃO


//PEGANDO ID QUE TA VINDO DA URL DA OUTRA PÁGINA    
if(isset($_GET["ID"]) && isset($_GET["disponibilidade"]))
{
    $sqlUpdate = "UPDATE usuario SET disponibilidade = ".$_GET['disponibilidade']." WHERE ID = ".intval($_GET['ID']);
}    

    $resuult = mysqli_query($conn, $sqlUpdate);
    header("Location: tst.php?msg=deubom".$resuult);
?>