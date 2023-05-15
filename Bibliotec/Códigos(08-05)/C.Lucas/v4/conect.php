<?php
    $dbHost = 'localhost';
    $dbUsername = 'root';
    $dbPassword = '1234'; // NA ESCOLA USAR 1234, EM CASA A SENHA É VAZIA
    $dbName = 'teste';
    $porta = '3307'; // NA ESCOLA USAR 3307, EM CASA USAR 3306
    
    $conn = new mysqli($dbHost,$dbUsername,$dbPassword,$dbName,$porta);

?>