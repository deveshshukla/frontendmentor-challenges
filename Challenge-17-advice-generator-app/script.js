'use strict';

let adviceNum = document.querySelector('#advice-number');
let txtAdvice = document.querySelector('#advice-text');
let btnDice = document.querySelector('#dice-btn');

btnDice.addEventListener('click', () => {
    fetch('https://api.adviceslip.com/advice')
    .then((response) => {
        return response.json();

    }).then((data) => {
        adviceNum.innerHTML = `${data.slip.id}`;
        txtAdvice.innerHTML = `${data.slip.advice}`;

    }).catch((err) => console.log('Err: ',err));
});

