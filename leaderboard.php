<?php
session_start();
if(isset($_POST["score"])){
    $username = $_SESSION['login'];
    $password = $_SESSION['password'];

    $score = $_POST['score'];
    $conn = new mysqli("127.0.0.1","arsenii","webpass","tetris");


    // Check connection
    if ($conn->connect_error) {
        echo "<script>isConencted(false)</script>";
        echo "<script>console.log('HELP HELP')</script>";
        die("Connection failed: " . $conn->connect_error);
    }
    $findUsr = "SELECT * FROM Users WHERE UserName = '$username' and Password = '$password' ";

    $result = $conn->query($findUsr);


    $user = $result->fetch_assoc();

    if($user['Display'] == 1){

        $insertResults = "INSERT INTO Scores (Username,Score) VALUES ('$username', '$score');";
        if ( mysqli_query($conn, $insertResults) ) {
            echo 'new record is set';
        } else {
            echo "Error: ". mysqli_error($conn);
        }
    }
}
?>

<style>
    <?php
    include 'styles.css';
    ?>
</style>


<ul class = "navbar">
    <a class = "left" href="index.php" name = "home">Home</a>
    <a class = "right" name = "tetris" href="tetris.php">Play Tetris</a>
    <a class = "right" href="leaderboard.php" name = "leaderboard">Leaderboard</a>
</ul>

<div class = "main">
    <div id = 'login'>
        <table id = 'scoreTable'>
            <tr><th>Username</th>
                <th>Score</th>
            </tr>
        <?php
        session_start();

        $sql = "SELECT * FROM Scores ORDER BY Score DESC";
        $conn = new mysqli("127.0.0.1","arsenii","webpass","tetris");

        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            // output data of each row
            while ($row = $result->fetch_assoc()) {
                if($_SESSION['login'] == $row['Username']){

                    echo "<tr id='own'>";
                    echo "<td>".$row['Username']."</td>";
                    echo "<td>".$row['Score']."</td></tr>";
                }else {

                    echo "<tr><td>".$row['Username']."</td><td>".$row['Score']."</td></tr>";
                }
            }
        }
        ?>
        </table>
    </div>

</div>
