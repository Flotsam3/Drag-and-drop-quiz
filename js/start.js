class Player {
    constructor(){
        this.buttonStart = document.querySelector('#button-start');
        this.buttonName = document.querySelector('#button-submit-name');
        this.buttonLevel = document.querySelector('#button-submit-level');
        this.buttonInfo = document.querySelector('#button-info');
        this.cube = document.querySelector('.cube');
        this.cubeFront = document.querySelector('.cube__side--front');
        this.cubeRight = document.querySelector('.cube__side--right');
        this.cubeLeft = document.querySelector('.cube__side--left');
        this.cubeBack = document.querySelector('.cube__side--back');
        this.svgRecStart = document.querySelector('.cube__side--front rect');
        this.svgRecRight = document.querySelector('.cube__side--right rect');
        this.svgRecTop = document.querySelector('.cube__side--top rect');
        this.scene = document.querySelector('.scene');
        this.pane = document.querySelector('.pane');
        this.aTag = document.querySelector('a');
        this.small = document.querySelector('small');
        this.playerName = "";
        this.playerLevel = "";
        
        this.buttonStart.addEventListener('click', ()=>{
            this.animateStart();
        });
    };

    animateStart(){
        this.buttonStart.classList.add('button-disabled');
        this.svgRecStart.classList.add('dynamic-border');
        this.small.style.visibility = 'hidden';
        
        setTimeout(() => {
            this.cube.classList.add('right');
            this.cubeRight.classList.add('dynamic-border');
            this.svgRecRight.classList.add('dynamic-border');
        }, 500);

        this.buttonName.addEventListener('click', ()=>{
            this.animateStartName();
        });
    };

    animateStartName(){
        const textHint = document.querySelector('.hint');
        this.playerName = document.querySelector('#name').value;
        const regex = /^[a-zA-Z]{2,20}$/;
    
        if (regex.test(this.playerName)){
            textHint.style.visibility = "hidden";
            this.buttonName.classList.add('button-disabled');
            this.svgRecTop.classList.add('dynamic-border');
            this.cube.classList.add('top');
        } else {
            document.querySelector('#name').classList.add('name-check');
            textHint.style.visibility = "visible";
            setTimeout(() => {
                document.querySelector('#name').classList.remove('name-check');
            }, 1000);
        };

        this.buttonLevel.addEventListener('click', ()=>{
            this.animateStartLevel();
        });
    };

    animateStartLevel(){
        this.playerLevel = document.querySelector('input[name = level]:checked').value
        let levelTime = 0;
        
        switch (this.playerLevel) {
            case 'easy':
                levelTime = 45;
                break;
            case 'fair':
                levelTime = 30;
                break;
            case 'challenging':
                levelTime = 20;
        };
                    
        this.buttonLevel.classList.add('button-disabled');
        this.cube.removeChild(this.cubeFront);
        this.cube.removeChild(this.cubeLeft);
        this.cube.removeChild(this.cubeRight);
        this.cube.removeChild(this.cubeBack);
        this.svgRecTop.classList.remove('dynamic-border');    
        this.scene.classList.add('--fade-out');
                    
        setTimeout(() => {
            const introText = document.querySelector('.pane p');
            introText.innerHTML = `Nice to have you here ${this.playerName}, </br></br> during this quiz you will be presented with five terms for each round and your task is to bring all of them into the right order by using drag and drop. </br></br> Each correctly assigned term will earn you five points.</br></br> Your preferred level of difficulty is "${this.playerLevel}", therefore you have ${levelTime} seconds to accomplish each round. </br></br></br><span>Have fun!</span>`
            this.buttonInfo.style.removeProperty('visibility');
            this.pane.classList.add('--fade-in');
            this.aTag.classList.add('--fade-in');
    
            const playerData = [this.playerName, levelTime];
            localStorage.setItem('userData', JSON.stringify(playerData));
            
            this.buttonStart.removeEventListener('click', ()=>{
                animateStart();
            });
            this.buttonName.removeEventListener('click', ()=>{
                animateStartName();
            });
            this.buttonLevel.removeEventListener('click', ()=>{
                animateStartLevel();
            });
        }, 2000);
    };
};

new Player();






