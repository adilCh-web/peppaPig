
var interval; // onclick to this variable its assigned as interval = setInterval(addTree,4000) when we start the game to generate every 4s the function ---- line 176
var coutingSeconds; //the variable coutingSeconds is assigned to a function countig seconds variable every second inside function starting()
var score = 0
var seconds = 0
let friend = false
var display = ""
let bonus = 1
var bonusDisplayed = false
var myFunction


/*putting all the images ids in plattformDisplayRows*/
let plattformDisplayRows = [[],[],[],[],[],[]];
let count = 0

for(let j =0;j<6;j++)
{
    
    for (let i=0;i<14;i++)
    {
        count+=1
        plattformDisplayRows[j].push("img"+count)
    }
}
/*------------------------------------*/

let startGame = false

var width = 1;
var height = 1
var previous_position = plattformDisplayRows[1][0];

// sounds 
const gameTheme = new Audio('./audio/PeppaPiThemeSong.mp3');
const oink = new Audio("./audio/peppa_oink.mp3")
const pepaMeetsGoerge = new Audio("./audio/george_dinosaur.mp3")
const gameOverSound = new Audio("./audio/gameOver.wav")
const bonusSound = new Audio("./audio/mixkit-arcade-video-game-pop-2887.wav")
const hitTheTree = new Audio("./audio/peppa_pig_doo_doo.mp3")
const muddypaddleSound = new Audio("./audio/mixkit-retro-arcade-game-over-470.wav") 
const bonusUsingSound = new Audio("./audio/bonusSound.wav") 
//images src variable
const peppaLeft = "/pepaPig/img/pepa_left.png"
const peppaRight = "/pepaPig/img/pepa_right.png"
var pepa = peppaLeft // by default left
const emptySpace = "/pepaPig/img/background.png"
const crash = "/pepaPig/img/crash.png"
const muddypaddle = "/pepaPig/img/muddypaddle.png"
const trees = 
[
    "/pepaPig/img/tree_3.png",
    "/pepaPig/img/tree_2.png",
    "/pepaPig/img/tree_4.png",
    "/pepaPig/img/tree_1.png"
]

const pepaFriends = ["/pepaPig/img/suzy_sheep.png",
                    "/pepaPig/img/danny_dog.png",
                    "/pepaPig/img/emily_elephant.png",
                    "/pepaPig/img/zoe_zebra.png",
                    "/pepaPig/img/pedro_pony.png",
                    "/pepaPig/img/fredy_fox.png",
                    "/pepaPig/img/rebecca_rabbit.png",
                    "/pepaPig/img/candy_cat.png"
                ]



function randomize(min, max) 
{ // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function minimizeNrOfTrees()
{
    for(let i =0;i<40;i++)
    {
        let idPic = "img"+randomize(1,84)
        if(trees.includes(document.getElementById(idPic).src) === true)
        {
            document.getElementById(idPic).src = emptySpace
        }
    }
    document.getElementById("treesLabel").innerHTML = "Numbers of Trees: " + nrOfTrees()  //update the numbers of trees
}

function nrOfTrees()
{
    let total = 0
    for(let i =1;i<85;i++)
    {
        let id = "img"+i
        if(trees.includes(document.getElementById(id).src) === true)
        {
            total+=1
        }
    }
    return total
}
/*
function resizePepaImg()
{
    for (let i =1;i<85;i++)
    {
        let id_ = "img"+i
        if (document.getElementById(id_).src === peppaLeft || document.getElementById(id_).src === peppaRight)
        {
            px +=5
            document.getElementById(id_).style.height= "80px"
            document.getElementById(id_).style.width= "80px"
            console.log("resized")
        }
    }
}
*/

function addTree()
{

    for (let i=0;i<3;i++)  //30 rows with tress (obstacle) 50%
    {
        let id_ = "img"+randomize(1,84)
        if((id_!=="img16")&& (id_!=="img15")&&(document.getElementById(id_).src!==peppaLeft)&&(document.getElementById(id_).src!==peppaRight) && (pepaFriends.includes(document.getElementById(id_).src) === false))
        {
            let picSrc = trees[randomize(0,3)]
            document.getElementById(id_).src = picSrc
        }
    }
    if(friend === false)
    {
        let idFriend = "img" + randomize(1,84)
        if((document.getElementById(idFriend).src!==peppaLeft)&&(document.getElementById(idFriend).src!==peppaRight))
        {
            document.getElementById(idFriend).src = pepaFriends[randomize(0,pepaFriends.length-1)];
            friend = true 
            // console.log(pepaFriends[randomize(0,pepaFriends.length-1)])
        }
    if (score >= 20)
    {
        let georgeId = "img" + randomize(1,84);
        if((document.getElementById(georgeId).src!==peppaLeft)&&(document.getElementById(georgeId).src!==peppaRight))
        {
            setTimeout(()=>{document.getElementById(georgeId).src = "./img/GoergeCry.gif"},2000); // goerge appear
            setTimeout(()=>{document.getElementById(georgeId).src = emptySpace},4000) // goarge dessapear 
        }
        
            
    }

    }

    document.getElementById("treesLabel").innerHTML = "Numbers of Trees: " + nrOfTrees() //update the numbers of trees

}

function stopFunctionAddTree() 
{
    clearInterval(interval);
}




function starting ()
{
    if (document.getElementById("start").textContent === "Stop") //By default is start .... so once it started zou can click again to stop the game 
    {
        stopFunctionAddTree()
        gameTheme.pause()
        clearInterval(coutingSeconds)
        startGame = false
        setTimeout(() => {
            for(let i =1;i<85;i++){document.getElementById("img"+i).src = emptySpace};
            document.getElementById("logo").src =  "./img/logo.png"
            document.getElementById("logo").style.display = "block";
            document.getElementById("treesLabel").innerHTML = "";
            document.getElementById("scoreLabel").innerHTML = "";
            document.getElementById("bonusLabel").innerHTML = "";
            document.getElementById("seconds").innerHTML = "";

          }, 3000);
          document.getElementById("start").innerHTML = "Start" // so once u click again you can restart a new game
        
    }
    
    else  // start the game for the first time 

    {

        gameTheme.play()
        gameTheme.loop =true;
        seconds = 0
        bonus = 0
        
        coutingSeconds = setInterval(()=>
        {
            seconds+=1;
            document.getElementById("seconds").innerHTML = seconds;
        },1000)
        setInterval(displayBonus,8000)
        interval = setInterval(addTree,4000)
        document.getElementById("start").innerHTML = "Stop"
        document.getElementById("scoreLabel").innerHTML = "Score: " + score
        document.getElementById("bonusLabel").innerHTML = "Bonus: " + bonus
        document.getElementById("treesLabel").innerHTML = "Numbers of Trees: 0" 
        document.getElementById("logo").style.display = "none"
        /*resetting everything after an end of a game*/
        width = 1;
        height = 1;
        for (let i =1;i<85;i++)
        {
            let id_ = "img"+i
            document.getElementById(id_).src = emptySpace
        }

        startGame = true
        //document.getElementById("img16").src = peppaRight;
        document.getElementById("img15").src = "./img/house.png";
    }

}

function usingBonus()
{
    if (bonus > 0)
    {
        bonus = bonus -1
        bonusUsingSound.play()
        document.getElementById("bonusLabel").innerHTML = "Bonus: "+ bonus
        for(let i =0;i<80;i++)
        {
            let idPic = "img"+randomize(1,84)
            if(trees.includes(document.getElementById(idPic).src) == true)
            {
                document.getElementById(idPic).src = emptySpace
            }
        }
    }
}

function displayBonus()
{
    let id_ = "img"+randomize(1,84)

    if((document.getElementById(id_).src!==peppaLeft)&&(document.getElementById(id_).src!==peppaRight) && (pepaFriends.includes(document.getElementById(id_).src) === false))
    {
        document.getElementById(id_).src = muddypaddle
        myFunction = ()=>{document.getElementById(id_).src = emptySpace}
        const promise = new Promise((resolve, reject) => {
            resolve(setTimeout(myFunction ,5000))
          });

        promise.then(() =>
          {
            clearTimeout(myFunction,4000)
          })
    }}
        






// Moving pea pig

function moveRight()
{
    if(startGame === true && width <13)
    {
    let position = plattformDisplayRows[height][width];

            if( document.getElementById(position).src === peppaRight)
            
            { 
                width+=1;
                console.log(height,width)
                position = plattformDisplayRows[height][width]
                oink.play()
            }

            if (document.getElementById(position).src === peppaLeft)
            {
    
                document.getElementById(position).src = "./img/pepa_right.png"
                position = plattformDisplayRows[height][width]
                console.log(height,width)
                oink.play()
            }


            if (document.getElementById(position).src == emptySpace)
                {

                    document.getElementById(previous_position).src = emptySpace;

                    document.getElementById(position).src = peppaRight;
                    
                }
            if (trees.includes(document.getElementById(position).src) == true)
                {
                    
                    document.getElementById("news").innerHTML = `You have: ${score} in ${seconds} seconds`+ "<br>" + display
                    display = document.getElementById("news").innerHTML

                    document.getElementById(position).src = crash
                    document.getElementById(previous_position).src = emptySpace;
                    gameTheme.pause()
                    hitTheTree.play()
                    gameOverSound.play()
                    stopFunctionAddTree()
                    clearInterval(coutingSeconds)
                    document.getElementById("seconds").textContent = ""
                    let imgGameOver = document.getElementById("logo")
                    imgGameOver.src = "./img/gameOver.png"
                    imgGameOver.style.display = "block"
                    document.getElementById("start").innerHTML = "Start" 
                    friend = false
                    
                    
                };

                if (pepaFriends.includes(document.getElementById(position).src) == true)
                {
                    document.getElementById(position).src = peppaRight
                    document.getElementById(previous_position).src = emptySpace;
                    friend = false
                    score+=1
                    document.getElementById("scoreLabel").innerHTML = "Score: " + score
                    bonusSound.play()
                    minimizeNrOfTrees()

                };

                if (document.getElementById(position).src == "./img/GoergeCry.gif")
                {

                    document.getElementById(previous_position).src = emptySpace;

                    document.getElementById(position).src = "./img/peppa_george_characters.png";
                    gameTheme.pause()
                    pepaMeetsGoerge.play()
                    stopFunctionAddTree()
                    
                }

                if(document.getElementById(position).src === muddypaddle)
                {
                    clearInterval(myFunction,0)
                    document.getElementById(position).src = pepa
                    document.getElementById(previous_position).src = emptySpace;
                    bonus+=1
                    document.getElementById("bonusLabel").innerHTML = "Bonus: " + bonus
                    muddypaddleSound.play()
                }
 
        previous_position = position;
        pepa = document.getElementById(position).src // variable pepa to keep the direction of the image position (right or left)

    }
}


function moveLeft()
{
if (startGame === true && width>0)
{
    let position = plattformDisplayRows[height][width];

        if(document.getElementById(position).src === peppaLeft) 
        { 
            width-=1;
            console.log(height,width)
            position = plattformDisplayRows[height][width]
        }

        if (document.getElementById(position).src === peppaRight)
        {

            document.getElementById(position).src = "./img/pepa_left.png"
            position = plattformDisplayRows[height][width]
            console.log(height,width)
            oink.play()
        }

        if (document.getElementById(position).src === emptySpace)
        {
            document.getElementById(previous_position).src = emptySpace;
            document.getElementById(position).src = "./img/pepa_left.png";
            oink.play()
        }

        if (trees.includes(document.getElementById(position).src) == true)
        {
            document.getElementById(position).src = crash
            document.getElementById(previous_position).src = emptySpace;
            gameTheme.pause()
            hitTheTree.play()
            gameOverSound.play()
            let imgGameOver = document.getElementById("logo")
            imgGameOver.src = "./img/gameOver.png"
            imgGameOver.style.display = "block"
            document.getElementById("start").innerHTML = "Start" // 
            stopFunctionAddTree()
            clearInterval(coutingSeconds)
            document.getElementById("seconds").textContent = ""
            friend = false
        };

        if (pepaFriends.includes(document.getElementById(position).src) == true)
        {
            document.getElementById(position).src = peppaLeft
            document.getElementById(previous_position).src = emptySpace;
            friend = false // emptying the array 
            score+=1
            document.getElementById("scoreLabel").innerHTML = "Score: " + score
            bonusSound.play()
            minimizeNrOfTrees()

        };

        if (document.getElementById(position).src == "./img/GoergeCry.gif")
        {

            document.getElementById(previous_position).src = emptySpace;

            document.getElementById(position).src = "./img/peppa_george_characters.png";
            gameTheme.pause()
            pepaMeetsGoerge.play()
            stopFunctionAddTree()
            
        }

        
        if(document.getElementById(position).src === muddypaddle)
        {
            clearInterval(myFunction,0)
            document.getElementById(position).src = pepa
            document.getElementById(previous_position).src = emptySpace;
            bonus+=1
            document.getElementById("bonusLabel").innerHTML = "Bonus: " + bonus
            muddypaddleSound.play()
        }


    previous_position = position;
    pepa = document.getElementById(position).src // variable pepa to keep the direction of the image position (right or left)

    }
}


function moveUp()
{
if (startGame === true && height >0)
    {

    let position = plattformDisplayRows[height][width];

            if (document.getElementById(position).src === peppaLeft || document.getElementById(position).src === peppaRight )
            { 
                height-=1;
                console.log(height,width)
                position = plattformDisplayRows[height][width]
                oink.play()
            }

            if (document.getElementById(position).src == emptySpace)
            {
                document.getElementById(position).src = pepa;

                document.getElementById(previous_position).src = emptySpace;
                    
            }
            if (trees.includes(document.getElementById(position).src) == true)
            {
                document.getElementById(position).src = crash
                document.getElementById(previous_position).src = emptySpace;
                gameTheme.pause()
                hitTheTree.play()
                gameOverSound.play()
                let imgGameOver = document.getElementById("logo")
                imgGameOver.src = "./img/gameOver.png"
                imgGameOver.style.display = "block"
                stopFunctionAddTree()
                clearInterval(coutingSeconds)
                document.getElementById("seconds").textContent = ""
                friend = false
            };

            if (pepaFriends.includes(document.getElementById(position).src) == true)
            {
                document.getElementById(position).src = pepa
                document.getElementById(previous_position).src = emptySpace;
                friend = false // emptying the array 
                score+=1
                document.getElementById("scoreLabel").innerHTML = "Score: " + score
                minimizeNrOfTrees()
                bonusSound.play()
                
            };

            if (document.getElementById(position).src == "./img/GoergeCry.gif")
            {

                document.getElementById(previous_position).src = emptySpace;

                document.getElementById(position).src = "./img/peppa_george_characters.png";
                gameTheme.pause()
                pepaMeetsGoerge.play()
                stopFunctionAddTree()
                document.getElementById("start").innerHTML = "Start" 
                
            }

        
            if(document.getElementById(position).src === muddypaddle)
            {
                clearInterval(myFunction,0)
                document.getElementById(position).src = pepa
                document.getElementById(previous_position).src = emptySpace;
                bonus+=1
                document.getElementById("bonusLabel").innerHTML = "Bonus: " + bonus
                muddypaddleSound.play()
            }


 

        previous_position = position;

    }
}
function moveDown()
{
    if ((startGame === true) && (height <5))
    {
    let position = plattformDisplayRows[height][width];
    

            if( 
            document.getElementById(position).src === peppaLeft || document.getElementById(position).src === peppaRight )
           { 
                height+=1;
                console.log(height,width)
                position = plattformDisplayRows[height][width]
                oink.play()
           }
    
            if (document.getElementById(position).src == emptySpace)
                {
    
                    document.getElementById(previous_position).src = emptySpace;
    
                    document.getElementById(position).src = pepa;

                }
            if (trees.includes(document.getElementById(position).src) == true)
                {
                    document.getElementById(position).src = crash
                    document.getElementById(previous_position).src = emptySpace;
                    gameTheme.pause()
                    hitTheTree.play()
                    gameOverSound.play()
                    let imgGameOver = document.getElementById("logo")
                    imgGameOver.src = "./img/gameOver.png"
                    imgGameOver.style.display = "block"
                    document.getElementById("start").innerHTML = "Start" 
                    stopFunctionAddTree()
                    clearInterval(coutingSeconds)
                    document.getElementById("seconds").textContent = ""
                    friend = false
                    
                };

                if (pepaFriends.includes(document.getElementById(position).src) == true)
                {
                    document.getElementById(position).src = pepa
                    document.getElementById(previous_position).src = emptySpace;
                    friend = false // emptying the array 
                    score+=1
                    document.getElementById("scoreLabel").innerHTML = "Score: " + score
                    minimizeNrOfTrees()
                    bonusSound.play()
                };

            if (document.getElementById(position).src == "./img/GoergeCry.gif")
                {

                document.getElementById(previous_position).src = emptySpace;
                document.getElementById(position).src = "./img/peppa_george_characters.png";
                gameTheme.pause() 
                pepaMeetsGoerge.play() 
                stopFunctionAddTree()
                }

            
                if(document.getElementById(position).src === muddypaddle)
                {
                    clearInterval(myFunction,0)
                    document.getElementById(position).src = pepa
                    document.getElementById(previous_position).src = emptySpace;
                    bonus+=1
                    document.getElementById("bonusLabel").innerHTML = "Bonus: " + bonus
                    muddypaddleSound.play()
                }
 
        
        previous_position = position;
    }
}






