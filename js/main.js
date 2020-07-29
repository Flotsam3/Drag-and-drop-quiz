const loadUserData = JSON.parse(localStorage.getItem("userData"));
const playerName = loadUserData[0];
const levelTime = loadUserData[1];
const audio = new Audio('audio/5-sec-countdown.mp3');
const buttonCard = document.querySelector('#button-card')
const card = document.querySelector('.card__content');
const myTimer = document.querySelector('.countdown');
const infoText = document.querySelector('.info p');
let barText = document.querySelectorAll('.bar');
let rankIndex = [0, 1, 2, 3, 4];
let rankIndexComputer = [0, 1, 2, 3, 4];
let selectionComputer = [];
let quizRound = 0;
let randomNumber = 0;
let randomNumberComputer = 0;
let roundText = document.querySelector('.round');
let finishedQuiz = false;

infoText.textContent = `Get ready to start ${playerName}!`;
myTimer.textContent = levelTime;

getExerciseData();

function getExerciseData(){
    fetch('data-demo.json')
    .then((response) => {
        return response.json();
    })
    .then((exerciseData) => {
        
        roundText.textContent = `${quizRound} | ${exerciseData.length}`

        buttonCard.addEventListener('click', rotateCard);

        function showExerciseInfo(){
            infoText.textContent = exerciseData[quizRound].text;
            roundText.textContent = `${quizRound + 1} | ${exerciseData.length}`
            fillBars();
        }
        
        function fillBars(){
            rankIndex = [0, 1, 2, 3, 4];
            rankIndexComputer = [0, 1, 2, 3, 4];
            selectionComputer = [];

            for (let i = 0; i < 5; i++) {
                randomNumber = Math.floor(Math.random() * rankIndex.length);
                randomNumberComputer = Math.floor(Math.random() * rankIndexComputer.length);
                barText[i].innerHTML += exerciseData[quizRound].options[rankIndex[randomNumber]]; // fill bars with terms
                selectionComputer.push(rankIndexComputer[randomNumberComputer]); // fill array with random numbers for the computer answers
                rankIndex.splice(randomNumber, 1);
                rankIndexComputer.splice(randomNumberComputer, 1);
            }
        }

        function rotateCard(){  
            if (card.classList.contains('card--rotate')){
                card.classList.remove('card--rotate');
                
                if (quizRound + 1 === exerciseData.length){ // If quiz is finished
                    const playerScore = document.querySelector('.player-value');
                    const averageScore = parseInt(playerScore.textContent) / exerciseData.length;
                    const medalOne = exerciseData.length * 25 * 33 / 100;
                    const medalTwo = exerciseData.length * 25 * 66 / 100;
                    console.log(medalOne);
                    console.log(medalTwo);
                    console.log(playerScore.textContent);

                    finishedQuiz = true;
                    document.querySelector('.book').style.display = "none";
                    buttonCard.style.visibility = "hidden";
                    infoText.textContent = `You did it, you just finished the quiz! You scored ${averageScore} points on average.`;
                    if (playerScore.textContent < medalOne){
                        document.querySelector('.medal1').classList.remove('hidden');
                    } else if (playerScore.textContent < medalTwo) {
                        document.querySelector('.medal1').classList.remove('hidden');
                        document.querySelector('.medal2').classList.remove('hidden');
                    } else {
                        document.querySelector('.medal1').classList.remove('hidden');
                        document.querySelector('.medal2').classList.remove('hidden');
                        document.querySelector('.medal3').classList.remove('hidden');
                    };
                }
                resetCard();
                
            } else {
                buttonCard.disabled = true;
                buttonCard.classList.remove('button-card-active');
                buttonCard.classList.add('button-card-disabled');
                showExerciseInfo();
                card.classList.add('card--rotate');
                countdown();
            }
        }

        function countdown(){
            let myTime = levelTime;
            
            const myCountdown = setInterval(() => {
                if (myTime === 5){
                    myTimer.style.color = "#e44803";
                    audio.play();
                    audio.volume = 0.1;
                }
                myTimer.textContent = myTime;
                myTime--;
                if (myTime < 0){
                    clearInterval(myCountdown);
                    barText.forEach((element)=>{
                        element.setAttribute('draggable', 'false');
                        element.classList.remove('draggable');
                    });
                    showSolution();
                }
            }, 1000);
        }
        
        function showSolution(){
            let barText = document.querySelectorAll('.bar');
            let solution = document.querySelectorAll('.solution');
            const number = document.querySelectorAll('.number');
            const playerScore = document.querySelector('.player-value');
            let playerScoreCounter = parseInt(playerScore.textContent);
            const computerScore = document.querySelector('.comp-value');
            let computerScoreCounter = parseInt(computerScore.textContent);
            const searchString = exerciseData[quizRound];
            let fullHouse = 0;
            
            solution.forEach((element, index) => {
                const answerIndex = searchString.options.indexOf(barText[index].childNodes[2].nodeValue); // Index of the answer inside the JSON data
                element.childNodes[0].nodeValue = searchString.solutions[answerIndex];
                number[index].textContent = searchString.rank[answerIndex];
                
                if (barText[index].childNodes[2].nodeValue === exerciseData[quizRound].options[index]) { // Check if the player got the right answer
                    fullHouse++;
                    playerScoreCounter += 5;
                    element.style.backgroundColor = '#3282b8';
                } else {
                    element.style.backgroundColor = '#e44803';
                };
                
                if (selectionComputer[index] === index) {
                    computerScoreCounter += 5;
                }

                setTimeout(() => {
                    element.style.visibility = "visible";
                    element.classList.add('solution--slide');
                }, 1500 * index);
            });
            
            const delay = new Promise( (resolve, reject) => {
                setTimeout(() => {
                    playerScore.textContent = playerScoreCounter;
                    computerScore.textContent = computerScoreCounter;
                    if (fullHouse === 5) {
                        document.querySelector('.card__back').classList.add('full-house');
                    }
                    resolve();
                }, 8000);
                });
                
            delay.then( () => {
                return new Promise(function(resolve, reject) { 
                        buttonCard.disabled = false;
                        buttonCard.classList.remove('button-card-disabled');
                        buttonCard.classList.add('button-card-active');
                        resolve();
                });
            }).then( () => {
                setTimeout(() => {
                    console.log('Function three running');
                }, 1000);
            }); 
        }

        function resetCard() {
            let solution = document.querySelectorAll('.solution');
            myTimer.style.color = "#3282b8";
            quizRound++;

            if(finishedQuiz === false) {
                infoText.textContent = `Get ready for round ${quizRound + 1}, ${playerName}!`
            }

            solution.forEach(element => {
                element.classList.add('solution--fade-out');
                element.style.visibility = "hidden";
                element.classList.remove('solution--slide');
                element.classList.remove('solution--fade-out');
            });

            document.querySelector('.card__back').classList.remove('full-house');

            barText.forEach((element)=>{
                element.setAttribute('draggable', 'true');
                element.classList.add('draggable');
            });

            for (let i = 0; i < 5; i++) {
                barText[i].childNodes[2].nodeValue = ""; // Remove names from the bars
            }
        }
    })
}





