const loadUserData = JSON.parse(localStorage.getItem("userData"));
const playerName = loadUserData[0];
const levelTime = loadUserData[1];
const audio = new Audio('audio/5-sec-countdown.mp3');
const buttonCard = document.querySelector('#button-card')
const card = document.querySelector('.card__content');
const myTimer = document.querySelector('.timer span');
const infoText = document.querySelector('.info p');
const barText = document.querySelectorAll('.bar');
let rankIndex = [0, 1, 2, 3, 4];
let quizRound = 0;
let randomNumber = 0;

infoText.textContent = `Get ready to start ${playerName}!`;
myTimer.textContent = levelTime;

getExerciseData();

function getExerciseData(){
    fetch('data.json')
    .then((response) => {
        return response.json();
    })
    .then((exerciseData) => {
        console.log(exerciseData);
        console.log(exerciseData[0].options[1]);
        
        buttonCard.addEventListener('click', rotateCard);

        function showExerciseInfo(){
            infoText.textContent = exerciseData[quizRound].text;
            fillBars();
        }
        
        function fillBars(){
            for (let i = 0; i < 5; i++) {
                randomNumber = Math.floor(Math.random() * rankIndex.length);
                barText[i].innerHTML += exerciseData[quizRound].options[rankIndex[randomNumber]];
                rankIndex.splice(randomNumber, 1);
            }
        }

        function rotateCard(){
        
            if (card.classList.contains('card--rotate')){
                showExerciseInfo();
                card.classList.remove('card--rotate');
            } else {
                showExerciseInfo();
                card.classList.add('card--rotate');
            }
            
            countdown();
        }

        function countdown(){
            let myTime = levelTime;
            console.log('reached countdown');
            
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
                    console.log('timer below zero');
                    showSolution();
                }
            }, 1000);
        }
        
        function showSolution(){
            console.log('reached solution');
            const solution = document.querySelectorAll('.solution');
            solution.forEach((element, index) => {
                
                setTimeout(() => {
                    element.style.visibility = "visible";
                    element.classList.add('solution--slide');
                }, 1500 * index);
            });
        
        }
    })
}





