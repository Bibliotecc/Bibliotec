<?php
    require __DIR__.'/vendor/autoload.php';
    use Kreait\Firebase\Factory;
    $msg = '';
    if(isset($_POST['id']))
    {
        $factory = (new Factory())->withDatabaseUri('https://otccsb-default-rtdb.firebaseio.com');
        
        $database = $factory->createDatabase();
        $novoContato = [
            'nome' => $_POST['nome'],
            'email' => $_POST['email']
        ];

        $database->getReference('contatos/' . $_POST['id'])->set($novoContato);
   
        $msg = 'Contato adicionado com sucesso!';
    }
 ?>
<DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Firebase</title>
</head>
<body>
    <h2>PHP Firebase</h2>
    <p>
        <b><?php echo $msg ?></b>
    </p>
    <form action="" method="post">
        <p>  
            <label for="id">ID:</label>
            <input type="text" name="id" id="id"/>
        </p>  
        <p>  
            <label for="nome">Nome:</label>
            <input type="text" name="nome" id="nome"/>
        </p>  
        <p>  
            <label for="email">Email:</label>
            <input type="text" name="email" id="email"/>
        </p>
        <p>
            <input type="submit" value="Cadastrar">
        </p>  
    </form>
</body>
</html>