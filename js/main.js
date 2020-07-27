const loadUserData = JSON.parse(localStorage.getItem("userData"));
const playerName = loadUserData[0];
const levelTime = loadUserData[1];
const audio = new Audio('audio/5-sec-countdown.mp3');
const buttonCard = document.querySelector('#button-card')
const card = document.querySelector('.card__content');
const myTimer = document.querySelector('.timer span');
const infoText = document.querySelector('.info p');
let barText = document.querySelectorAll('.bar');
let rankIndex = [0, 1, 2, 3, 4];
let rankIndexComputer = [0, 1, 2, 3, 4];
let selectionComputer = [];
let quizRound = 0;
let randomNumber = 0;
let randomNumberComputer = 0;

infoText.textContent = `Get ready to start ${playerName}!`;
myTimer.textContent = levelTime;

getExerciseData();

function getExerciseData(){
    fetch('data.json')
    .then((response) => {
        return response.json();
    })
    .then((exerciseData) => {
        
        buttonCard.addEventListener('click', rotateCard);

        function showExerciseInfo(){
            infoText.textContent = exerciseData[quizRound].text;
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
                resetCard();
                quizRound++;
            } else {
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
                
                setTimeout(() => {
                    playerScore.textContent = playerScoreCounter;
                    computerScore.textContent = computerScoreCounter;
                    if (fullHouse === 5) {
                        document.querySelector('.card__back').classList.add('full-house');
                    }
                }, 7500);
            });
        
        }

        function resetCard() {
            let solution = document.querySelectorAll('.solution');

            solution.forEach(element => {
                element.classList.add('solution--fade-out')
                element.style.visibility = "hidden";
                element.classList.remove('solution--slide');
            });

            document.querySelector('.card__back').classList.remove('full-house');

            for (let i = 0; i < 5; i++) {
                barText[i].childNodes[2].nodeValue = "";
            }
        }
    })
}





