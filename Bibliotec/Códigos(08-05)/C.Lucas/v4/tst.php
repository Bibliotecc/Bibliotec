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
<div class="m-5">
<table class="table text-white table-bg">
    <thead>
        <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome do Livro</th>
            <th scope="col">Capa do Livro</th>
            <th scope="col">Disponibilidade</th>
            <th scope="col">ESTÁ Indisponível(IND) OU Disponível(DIS) ?</th>
        </tr>
    </thead>
    <tbody>
        <?php
            while($user_data = mysqli_fetch_assoc($result)) 
            {
                    echo "<tr>";
                    echo "<td>".$user_data['ID']."</td>";
                    echo "<td>".$user_data['nomeLivro']."</td>";
                    echo "<td>";
                    if (!empty($user_data['nomeLivro']))
                        {
        ?>
                            <img class="img1" src="imglivros/<?php echo $user_data['nomeLivro']?>.jpg" alt="imgLivro">
                            <style>
                                .img1{
                                    width: 155px;
                                }
                            </style>
        <?php
                        } echo "</td>";
            if ($user_data['disponibilidade'] == 1)
                {
                    echo "<td>Indisponível</td>";
                }
            else
                {
                    echo "<td>Disponível</td>";
                }
                    
        
            echo "<td>"; 
        ?>
            <div class="ms">
                <style>
                    .ms{
                        text-align: center;
                    }
                </style>
                <a href="mudastatus.php?ID=<?php echo $user_data['ID']?>&disponibilidade=1">IND</a>
                
                <a href="mudastatus.php?ID=<?php echo $user_data['ID']?>&disponibilidade=0">DIS</a>
            </div>
        <?php        
            echo "</td>";  
            echo "</tr>"; 
            } 
        ?>