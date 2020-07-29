const buttonStart = document.querySelector('#button-start');
const buttonName = document.querySelector('#button-submit-name');
const buttonLevel = document.querySelector('#button-submit-level');
const buttonInfo = document.querySelector('#button-info');
const cube = document.querySelector('.cube');
const cubeFront = document.querySelector('.cube__side--front');
const cubeRight = document.querySelector('.cube__side--right');
const cubeLeft = document.querySelector('.cube__side--left');
const cubeBack = document.querySelector('.cube__side--back');
const svgRecStart = document.querySelector('.cube__side--front rect');
const svgRecRight = document.querySelector('.cube__side--right rect');
const svgRecTop = document.querySelector('.cube__side--top rect');
const scene = document.querySelector('.scene');
const pane = document.querySelector('.pane');
const aTag = document.querySelector('a');
const small = document.querySelector('small');
let playerName = "";
let playerLevel = "";

buttonStart.addEventListener('click', animateStart);

function animateStart(){
    buttonStart.classList.add('button-disabled');
    svgRecStart.classList.add('dynamic-border');
    small.style.visibility = 'hidden';
    
    setTimeout(() => {
        cube.classList.add('right');
        cubeRight.classList.add('dynamic-border');
        svgRecRight.classList.add('dynamic-border');
    }, 500);
}

buttonName.addEventListener('click', animateStartName);

function animateStartName(){
    textHint = document.querySelector('.hint');
    playerName = document.querySelector('#name').value;
    const regex = /^[a-zA-Z]{2,20}$/;

    if (regex.test(playerName)){
        textHint.style.visibility = "hidden";
        buttonName.classList.add('button-disabled');
        svgRecTop.classList.add('dynamic-border');
        cube.classList.add('top');
    } else {
        document.querySelector('#name').classList.add('name-check');
        textHint.style.visibility = "visible";
        setTimeout(() => {
            document.querySelector('#name').classList.remove('name-check');
        }, 1000);
    };
}

buttonLevel.addEventListener('click', animateStartLevel);


function animateStartLevel(){
    playerLevel = document.querySelector('input[name = level]:checked').value
    let levelTime = 0;
    
    switch (playerLevel) {
        case 'easy':
            levelTime = 45;
            break;
            case 'fair':
                levelTime = 30;
                break;
                case 'challenging':
                    levelTime = 20;
                }
                
                buttonLevel.classList.add('button-disabled');
                cube.removeChild(cubeFront);
                cube.removeChild(cubeLeft);
                cube.removeChild(cubeRight);
                cube.removeChild(cubeBack);
                svgRecTop.classList.remove('dynamic-border');    
                scene.classList.add('--fade-out');
                
                setTimeout(() => {
                    console.log(playerName);
                    console.log(playerLevel);
                    console.log(levelTime);
                    const introText = document.querySelector('.pane p');
                    introText.innerHTML = `Nice to have you here ${playerName}, </br></br> during this quiz you will be presented with five terms for each round and your task is to bring all of them into the right order by using drag and drop. </br></br> Each correctly assigned term will earn you five points.</br></br> Your prefered level of difficulty is "${playerLevel}", therefore you have ${levelTime} seconds to accomplish each round. </br></br></br><span>Have fun!</span>`
                    buttonInfo.style.removeProperty('visibility');
                    pane.classList.add('--fade-in');
                    aTag.classList.add('--fade-in');

                    const playerData = [playerName, levelTime];
                    localStorage.setItem(playerName, JSON.stringify(playerData));
                    
                    buttonStart.removeEventListener('click', animateStart);
                    buttonName.removeEventListener('click', animateStartName);
                    buttonLevel.removeEventListener('click', animateStartLevel);
                }, 2000);
}
