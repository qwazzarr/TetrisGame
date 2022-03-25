<style>
    <?php
    include 'styles.css';
    ?>
</style>
<audio  id="music">
    <source src="./assets/iLoveThisGirl.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
</audio>

<script>
    <?php
        include 'tetrisScript.js';
    ?>
</script>

<ul class = "navbar">
    <a class = "left" href="index.php" name = "home">Home</a>
    <a class = "right" name = "tetris" href="tetris.php">Play Tetris</a>
    <a class = "right" href="leaderboard.php" name = "leaderboard">Leaderboard</a>
</ul>

<div class = "main">
    <div id = "login">
        <button id ="startButton" onclick=start()>Start the game </button>
    </div>

</div>
<div id = 'score'>
    <div id = 'scoreText'>Score</div>
    <div id = 'scoreCount'>0</div>
</div>




