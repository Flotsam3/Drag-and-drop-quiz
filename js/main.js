const buttonCard = document.querySelector('#button-card')
const card = document.querySelector('.card__content');
const solution = document.querySelectorAll('.solution')

buttonCard.addEventListener('click', rotateCard);

function rotateCard(){
    console.log('läuft');
    card.classList.add('card--rotate');

    solution.forEach((element, index) => {

        // if (index === 0) {
        //     element.style.visibility = "visible";
        //     element.classList.add('solution--slide');
        // }
        
        setTimeout(() => {
            element.style.visibility = "visible";
            element.classList.add('solution--slide');
        }, 1500 * index);
    });
}
