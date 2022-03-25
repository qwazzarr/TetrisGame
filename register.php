<style>
    <?php
    include 'styles.css';
    session_start();
    ?>
</style>

<ul class = "navbar">
    <a class = "left" href="index.php" name = "home">Home</a>
    <a class = "right" name = "tetris" href="tetris.php">Play Tetris</a>
    <a class = "right" href="leaderboard.php" name = "leaderboard">Leaderboard</a>
</ul>


<div class = "main">
    <div id ="login">
        <?php

            echo "<div id ='register'>
                  <div>Create an account</div>
                  <form action='index.php' method='post'>
                  <div id = 'registerForm'>
                  
                  <label for='firstname'>First Name:</label>
                  <input id = 'firstname' type='text' name='firstName' placeholder='First Name' onkeyup='check()' required>
                  <label for='lastname'>Last Name:</label>
                  <input id = 'lastname' type='text' name='lastName' placeholder='Last Name' onkeyup='check()' required>
                  <label for='username'>Username:</label>
                  <input id = 'username' type='text' name = 'Username' placeholder='username' onkeyup='check()' required>
                  <label for='password'>Password:</label>
                  <input type ='password' id = 'password' name = 'Password' placeholder= 'Password' onkeyup='check()' required>
                   <label for='confirm_password'>Confirm password:</label>
                  <input type='password' id = 'confirm_password' name='confirmPassword' placeholder='Confirm password' onkeyup='check()' required>
                  <span id='message'></span>
                  Display Scores on leaderboard:<br>
                  <label>
                  Yes:<input type='radio' name='display' value='yes'>
                  </label>
                  <label>
                  No:<input type='radio' name='display' value = 'no'>
                  </label>
                 
                      
                        <input type='submit' value='Register' id = 'submit'>
                        </form>
                        </div>
                  </div>
                        ";
        ?>
    </div>
</div>
<script>
    var check = function() {
        if (document.getElementById('password').value ==
            document.getElementById('confirm_password').value) {
            document.getElementById('message').style.color = 'green';
            document.getElementById('message').innerHTML = '';
            document.getElementById('submit').disabled = false;
        } else {
            document.getElementById('message').style.color = 'red';
            document.getElementById('message').innerHTML = 'Passwords are not matching';
            document.getElementById('submit').disabled = true;
            return;
        }
        let password = document.getElementById("password");
        let lastname = document.getElementById("lastname");
        let firstname = document.getElementById("firstname");
        let username = document.getElementById("username");
        if((password.value.length >40)||(lastname.value.length>40)||(firstname.value.length>40)||(username.value.length>40)){
            document.getElementById('message').style.color = 'red';
            document.getElementById('message').innerHTML = 'Symbol limits are 40';
            document.getElementById('submit').disabled = true;
            return;
        }
        else {
            document.getElementById('message').style.color = 'green';
            document.getElementById('message').innerHTML = '';
            document.getElementById('submit').disabled = false;
        }
    }

    var checkWords = function () {

    }
</script>