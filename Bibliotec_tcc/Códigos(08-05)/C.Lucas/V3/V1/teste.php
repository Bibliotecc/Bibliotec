<?php
    include_once("conect.php");
    include_once("index.html");


if(!empty($_GET['search']))
    {
        $data = $_GET['search'];
        $sql = "SELECT * FROM usuario WHERE ID LIKE '%$data%' or nome LIKE '%$data%' ORDER BY ID DESC";
    }
    else
    {
        $sql = "SELECT * FROM usuario ORDER BY ID DESC";
    }
    $result = $conn->query($sql);

?>
    <div class="m-5">
    <table class="table text-white table-bg">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Nome do Livro</th>
                <th scope="col">Disponibilidade</th>
            </tr>
        </thead>
        <tbody>
            <?php
                while($user_data = mysqli_fetch_assoc($result)) 
                {
                        echo "<tr>";
                        echo "<td>".$user_data['ID']."</td>";
                        echo "<td>".$user_data['nome']."</td>";
                    if ($user_data['dp'] == 1)
                    {
                        echo "<td>Indisponível</td>";
                    }
                    else
                    {
                        echo "<td>Disponível</td>";
                    }
                        echo "</tr>";
                }
            ?>
