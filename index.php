<?php
session_start();
?>
<style>
<?php
include 'styles.css';
?>
</style>
<?php
session_start();
if(isset($_POST["Username"])&&isset($_POST["Password"])){

    echo "<script>console.log('HELP HELP 1')</script>";
    $conn = new mysqli("127.0.0.1","arsenii","webpass","tetris");


    // Check connection
    if ($conn->connect_error) {
        echo "<script>isConencted(false)</script>";
        echo "<script>console.log('HELP HELP')</script>";
        die("Connection failed: " . $conn->connect_error);
    }


    $username = $_POST['Username'];
    $password = $_POST['Password'];


    $findUsr = "SELECT * FROM Users WHERE UserName = '$username' and Password = '$password' ";

    $result = $conn->query($findUsr);

    if ($result->num_rows == 1) {
        // output data of each row
        $user = $result->fetch_assoc();
        $_SESSION['login'] = $user['UserName'];
        $_SESSION['password'] = $user['Password'];


    } else {

        if($result->num_rows >1) {
            echo "Multiple results Error";
        }

        if(isset($_POST['firstName'])&&isset($_POST['lastName'])) {


            $firstName = $_POST['firstName'];
            $lastName = $_POST['lastName'];
            $display = $_POST['display'];
            if($display=='yes'){
                $display = 1;
            }
            if($display == 'no'){
                $display = 0;
            }


            $sql = "INSERT INTO Users VALUES ('$username', '$firstName','$lastName','$password', '$display')";
                if ( mysqli_query($conn, $sql) ) {
                    $_SESSION['login'] = $username;
                    $_SESSION['password'] = $password;
                } else {
                    echo "Error: ". mysqli_error($conn);
                }
        }
        else {
            echo "No user with this combination username/password was found";
        }
    }
}
?>

<ul class = "navbar">
    <a class = "left" href="index.php" name = "home">Home</a>
    <a class = "right" name = "tetris" href="tetris.php">Play Tetris</a>
    <a class = "right" href="leaderboard.php" name = "leaderboard">Leaderboard</a>
</ul>

<div class = "main">
    <div id ="login">
        <?php
        session_start();
        if(isset($_SESSION['login']))
        {
            echo "<div id ='register'>
                  <div id = 'welcome'><text>Welcome to Tetris</text></div>
                  <a href='tetris.php' class='button'>Click here to play</a>
                  </div>";
        }
        else{
            echo "<div id ='register'>
                  <div>Please login to play</div>
                  <form action='index.php' method='post'>
                  <div id = 'registerForm'>
                  <input type='text' name='Username' placeholder='username' required>
                        <input type='password' name='Password' placeholder='password' required>
                        <input type='submit' value='login'>
                        </form>
                        </div>
                        <div>
                         Don’t have a user account? <a href='register.php'>Register now</a> 
              </div>
              </div>";
        }
        ?>
    </div>
</div>
<script>
    function isConencted(v)}{
        if(!v){
            console.log("not connected")
        }
        else{
            console.log("connected");
        }
    }
</script>
