
function start() {

    // returns random key from Set or Map
    function getRandomKey(collection) {
        let keys = Array.from(collection.keys());
        return keys[Math.floor(Math.random() * keys.length)];
    }

    console.log("HDAIFHDF");
    let currentBlock;
    let score = 0;
    let block;
    let currentBlockId;
    const ids = new Map([
        ["L", [ [1,1],[1,2],[1,3],[2,3] ]],
        ["Z", [ [1,1],[2,1],[2,2],[3,2] ]],
        ["S", [ [1,2],[2,1],[2,2],[3,1] ]],
        ["T", [ [1,1],[2,1],[2,2],[3,1] ]],
        ["O", [ [1,1],[1,2],[2,1],[2,2] ]],
        ["I", [[1,1],[1,2],[1,3],[1,4] ]]
    ]);

    const rotations = new Map([
        ["L", [ [ [1,1],[1,2],[1,3],[2,3] ]  ,[ [0,2],[1,2],[2,2],[2,1] ], [ [1,1],[2,1],[2,2,],[2,3] ], [ [0,2],[0,1],[1,1],[2,1] ]   ]],
        ["Z", [ [ [1,1],[2,1],[2,2],[3,2] ] , [ [3,1],[3,2],[2,2],[2,3] ], [ [1,1],[2,1],[2,2],[3,2]] ,[ [3,1],[3,2],[2,2],[2,3] ] ]] ,
        ["S", [ [ [1,2],[2,1],[2,2],[3,1] ] , [ [2,1],[2,2],[3,2],[3,3] ],[ [1,2],[2,1],[2,2],[3,1] ],[ [2,1],[2,2],[3,2],[3,3] ]  ] ],
        ["T", [ [ [1,1],[2,1],[2,2],[3,1] ],  [[2,1],[2,2],[3,2],[2,3]], [ [2,1],[1,2],[2,2],[3,2] ],[ [3,1],[2,2],[3,2],[3,3] ] ]],
        ["0", [  [ [1,1],[2,1],[2,2],[3,1] ],[ [1,1],[2,1],[2,2],[3,1] ],[ [1,1],[2,1],[2,2],[3,1] ],[ [1,1],[2,1],[2,2],[3,1] ]]],
        ["I", [ [ [1,1],[1,2],[1,3],[1,4] ], [ [1,2],[2,2],[3,2],[4,2] ] , [ [1,1],[1,2],[1,3],[1,4] ] ,[ [1,2],[2,2],[3,2],[4,2] ] ]]])

    const grid = new Array(20);
    for (let i = 0;i<20;i++) {
        let arrayToAdd = new Array(10);
        grid[i] = arrayToAdd;
    }
    document.onkeydown = function(e) {
        var k = e.keyCode;
        if(k == 38) {
            return false;
        }
    }
    let mainDiv = document.createElement('div');
    let button = document.getElementById("startButton");
    let finishScreen = document.getElementById("finishScreen");
    let scoreHtml = document.getElementById("scoreCount");
    let myMusic= document.getElementById("music");
    myMusic.play();
    myMusic.loop = true;
    if(button !== null){
        button.remove()
    }
    if(finishScreen!==null){
        finishScreen.remove()
    }
    mainDiv.setAttribute('id','tetris-bg');
    let login = document.getElementById('login');
    login.append(mainDiv);


    document.addEventListener("keyup",moveBlock);

    function moveBlock(e){
        let legit;

        console.log("Detected a keyup");

        switch(e.keyCode){

            case 39:

                legit = true;
                for(coordinate of currentBlock){
                    if((1+coordinate[1]>=10) || (((grid[coordinate[0]][coordinate[1]+1]) != null)
                        &&
                        (grid[coordinate[0]][coordinate[1]+1]) != "F")){

                        legit = false;
                        break;
                    }

                }
                if(legit) {
                    divArrayId = 0;
                    for(coordinate of currentBlock){
                        coordinate[1] +=1;
                        divArray[divArrayId].style.transform = "translate("+coordinate[1]*30+"px,"+coordinate[0]*30+"px)";
                        divArrayId+=1;
                    }
                }
                break;

            case 37:


                legit = true;
                for(coordinate of currentBlock){
                    if((coordinate[1]-1<0) || (((grid[coordinate[0]][coordinate[1]-1]) != null)
                        &&
                        (grid[coordinate[0]][coordinate[1]-1]) != "F")){

                        legit = false;
                        break;
                    }
                }
                if(legit) {
                    divArrayId = 0;
                    for(coordinate of currentBlock){
                        coordinate[1] -=1;
                        divArray[divArrayId].style.transform = "translate("+coordinate[1]*30+"px,"+coordinate[0]*30+"px)";
                        divArrayId+=1;
                    }

                }
                break;
            case 40:

                clearInterval(timerId);
                timerId = setInterval(fallingDown, 1000);
                fallingDown();

                break;
            case 38:
                e.preventDefault();
                let newCoordinates = rotations.get(currentBlockId)[(rotationCount+1)%4];

                let oldCoordinates = rotations.get(currentBlockId)[rotationCount];
                let changeCoordinates = new Array(currentBlock.length);
                legit = true;
                for(i =0;i<currentBlock.length;i++){
                    changeCoordinates[i] = new Array(2);
                    changeCoordinates[i][0] = newCoordinates[i][0]-oldCoordinates[i][0];
                    changeCoordinates[i][1] = newCoordinates[i][1] - oldCoordinates[i][1];

                    if(currentBlock[i][0]+changeCoordinates[i][0] <0||currentBlock[i][0]+changeCoordinates[i][0] >19) {
                        console.log("notLegit");
                        legit = false;
                        break;
                    }
                    if(currentBlock[i][1]+changeCoordinates[i][1] <0||currentBlock[i][1]+changeCoordinates[i][1] >9){
                        console.log("notLegit1");
                        legit = false;
                        break;
                    }
                    let testY = currentBlock[i][0]+changeCoordinates[i][0];
                    let testX = currentBlock[i][1]+changeCoordinates[i][1];
                    console.log(changeCoordinates[i]);
                    if( (grid[testY][testX] != null)&&(grid[testY][testX] != 'F')){

                        console.log("notLegit");
                        legit = false;
                        break;
                    }
                }
                if(legit){
                    console.log("legit");
                    for(i = 0;i<currentBlock.length;i++){

                        currentBlock[i][0] = currentBlock[i][0]+changeCoordinates[i][0]
                        currentBlock[i][1] = currentBlock[i][1]+changeCoordinates[i][1]

                        divArray[i].style.transform = "translate("+currentBlock[i][1]*30+"px,"+currentBlock[i][0]*30+"px)";
                    }
                    rotationCount +=1;
                    rotationCount = rotationCount%4;
                    console.log('New rotation: ' + rotationCount);

                }

                break;


                //spinning


        }
    }



    function fallingDown() {

        for(coordinate of currentBlock) {
            if((1+coordinate[0]>=20) || (((grid[coordinate[0]+1][coordinate[1]]) != null)
                &&
                (grid[coordinate[0]+1][coordinate[1]]) != "F")) {

                //fill with id of currentBlockId
                // change divs
                divArrayId =0;
                for(coordinate of currentBlock){
                    let el = divArray[divArrayId];

                    el.style.transform = "";
                    el.style.left = coordinate[1]*30+"px";
                    el.style.top = coordinate[0]*30+"px";
                    grid[coordinate[0]][coordinate[1]] = divArray[divArrayId].id;
                    divArrayId+=1;
                }
                console.log("Met an obstacle");
                console.log(currentBlock);
                checkRow();
                clearInterval(timerId);
                createGame();
                return;

            }
        }
        for(coordinate of currentBlock) {
            grid[coordinate[0]][coordinate[1]] = null;
        }

        divArrayId = 0;
        for(coordinate of currentBlock) {
            coordinate[0]+=1;
            grid[coordinate[0]][coordinate[1]] = "F";

            let block = divArray[divArrayId];
            divArrayId+=1;
            block.style.transform = "translate("+coordinate[1]*30+"px,"+coordinate[0]*30+"px)";

        }

        //console.table(grid);
    }

    function checkRow() {

        for(i =0 ;i<grid.length;i++){
            let filled = true;

            for(j=0;j<10;j++) {
                let block = grid[i][j];
                if(block==null||block == "F"){
                    filled = false;
                    break;
                }
            }

            if(filled) {
                console.log("Row "+i+" is empty");
                for (let j = 0; j  < grid[i].length; j++) {
                    let elem = document.getElementById(grid[i][j]);
                    console.log("Removing element: "+j);
                    elem.remove();
                    grid[i][j] = null;
                    //lower all objects
                    //update their look
                }
                for(j = i-1;j>=0;j--) {


                    for(k = 0; k<grid[j].length;k++){

                        if(grid[j][k]!=null&&grid[j][k]!='F'){
                            grid[j+1][k] = grid[j][k];
                            let elem = document.getElementById(grid[j+1][k]);
                            elem.style.top = (j+1)*30+"px";
                            elem.style.left = k*30+"px";
                            grid[j][k] = null;

                        }
                    }

                }


            }
        }
    }

    function createGame() {

        startIndex = Math.floor(Math.random()*7);
        heightIndex = 0;

        currentBlockId = getRandomKey(ids);

        rotationCount = 0;
        block = ids.get(currentBlockId);

        currentBlock = new Array();

        console.log("creating a block")
        score+=1;

        scoreHtml.innerText = score;

        for (i = 0;i<block.length;i++){
            currentBlock[i] = new Array(2);
            for(j=0;j<2;j++){
                currentBlock[i][j] = block[i][j];
            }
        }

        divArray = new Array(currentBlock.length);
        divArrayId = 0;

        for ( coordinate of currentBlock) {
            coordinate[0] -=1;
            coordinate[1] +=startIndex-1;
            if(grid[coordinate[0]][coordinate[1]]!=null&&grid[coordinate[0]][coordinate[1]]!="F") {
                console.log("Game Over");
                mainDiv.remove();
                for (let i = 0;i<20;i++) {
                    let arrayToAdd = new Array(10);
                    grid[i] = arrayToAdd;
                }
                scoreHtml.innerText = 0;
                let finishScreen = document.createElement("div");
                finishScreen.setAttribute("id","finishScreen");
                finishScreen.innerHTML = "<div id = 'over' >Game Over!</div>" +
                    "<div id = 'overScore'>Your score: "+score+ "</div>" +
                    "<div><button id = 'startButton2' onclick=start()>Start the game </button></div>";
                login.append(finishScreen);
                myMusic.pause();


                const url = 'leaderboard.php';
                const formData = new FormData();
                formData.append('score', score);

                fetch(url, { method: 'POST', body: formData })
                    .then(function (response) {
                        return response.text();
                    })
                    .then(function (body) {
                        console.log(body);
                    });


                score = 0;

                //start new or create a button


                return;
            }
            grid[coordinate[0]][coordinate[1]] = "F";

            let block = document.createElement("div");
            block.setAttribute('class','tetrisBlock '+currentBlockId);
            block.setAttribute('id',globalIdCount);
            globalIdCount+=1;


            block.style.transform = "translate("+coordinate[1]*30+"px,"+coordinate[0]*30+"px)";


            divArray[divArrayId] = block;

            divArrayId+=1;


            mainDiv.append(block);

        }
        console.table(grid);

        timerId = setInterval(fallingDown, 1000);
    }
    let startIndex;
    let heightIndex = 0;
    let divArray;
    let divArrayId;
    let globalIdCount = 0;
    let timerId;
    let rotationCount;
    createGame();

            //set divs to what we want them to be




                //listener to down button if so -> clearTimeout().not_moved = false;

                //listener to right and left.If the left or right key are pressed

                    // the currentBlock should be moved (within the bounds of the grid and
                    // without overlapping existing pieces) and the ”block” div elements
                    // updated using the transform: translate(x,y) css attribute.

                //

            //change div


            //If the coordinates are empty
            // • the coordinates of currentBlock on the tetris grid array should be moved down
            // by one on the vertical axis. The div elements position should also be updated.
            // (b) If the coordinates are not empty
            // • The div blocks represented by currentBlock on the tetris grid array
            // should be set with the div position attribute.
            // • The program should check if any rows of the tetris grid are complete.
            // If they are, that row should be removed and the position of all rows above moved down in



}
//start();