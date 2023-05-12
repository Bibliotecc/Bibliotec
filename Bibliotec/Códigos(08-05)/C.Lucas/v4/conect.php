<?php
    $dbHost = 'localhost';
    $dbUsername = 'root';
    $dbPassword = ''; // NA ESCOLA USAR 1234
    $dbName = 'teste';
    $porta = '3306'; // NA ESCOLA USAR 3307
    
    $conn = new mysqli($dbHost,$dbUsername,$dbPassword,$dbName,$porta);

?>