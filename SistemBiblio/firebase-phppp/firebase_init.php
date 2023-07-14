<?php


require __DIR__.'/hometcc/vendor/autoload.php';
use Kreait\Firebase\Factory;

$factory = (new Factory())->withDatabaseUri('https://otccsb-default-rtdb.firebaseio.com');
 
$database = $factory->createDatabase();




/* require __DIR__.'/hometcc/vendor/autoload.php';
    use Kreait\Firebase\Factory;
    use Kreait\Firebase\ServiceAccount;

   // $admsdk = __FILE__.'admsdk.json';
    
    $serviceAccount = ServiceAccount::fromJsonFile(__DIR__.'credencidaisFB/admsdk.json');
    $firebase = (new Factory)
    ->withServiceAccount($serviceAccount)
    ->create();

    $database = $firebase->getDatabase();
    
    //->withDatabaseUri('https://otccsb-default-rtdb.firebaseio.com');
     */
?>
    