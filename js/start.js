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
const layer = document.querySelector('.layer');
// const quizInfo = document.querySelector('.quiz-info');
const scene = document.querySelector('.scene');
const pane = document.querySelector('.pane');
const aTag = document.querySelector('a');
const small = document.querySelector('small');

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
    buttonName.classList.add('button-disabled');
    svgRecTop.classList.add('dynamic-border');
    cube.classList.add('top');
}

buttonLevel.addEventListener('click', animateStartLevel);

function animateStartLevel(){
    buttonLevel.classList.add('button-disabled');
    cube.removeChild(cubeFront);
    cube.removeChild(cubeLeft);
    cube.removeChild(cubeRight);
    cube.removeChild(cubeBack);
    svgRecTop.classList.remove('dynamic-border');

    // setTimeout(() => {
    //     document.querySelector('.start').classList.add('slide-startpage');
    // }, 1500);
    
    scene.classList.add('--fade-out');
    
    setTimeout(() => {
        buttonInfo.style.removeProperty('visibility');
        pane.classList.add('--fade-in');
        aTag.classList.add('--fade-in');
        // buttonInfo.addEventListener('click', fadeOut);
    }, 2000);
}
