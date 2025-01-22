'use strict'

//Variables
let totBillAmt = document.getElementById("totBill");
let customTip = document.querySelector('.customTip');
let totPerson = document.querySelector('.totPerson');


//Total Bill Amt.
let billAmt = 0;
let givenTip = 0;
let totPeople = 0;

//Select tip
const tipPerc = document.querySelectorAll('.tip');
let tip = 0;
for (let i = 0; i < tipPerc.length; i++) {
    tipPerc[i].addEventListener('click', function () {
        tip = document.querySelector(`.tip${i}`).textContent;
    });
}

//Reset tip when custom tip select
customTip.addEventListener('click', function () {
    tip = 0;
})

//Calculate
let calculate = document.querySelector('.btnCalculate');
calculate.addEventListener('click', function () {

    //BillAmt
    billAmt = Number(totBillAmt.value);

    //tip
    if (!tip == 0) {
        givenTip = Number(tip);
    } else {
        givenTip = Number(customTip.value);
    }

    //Total Person
    totPeople = Number(totPerson.value);

    //Check All Value Entered
    if (billAmt > 0 && totPeople > 0) {

        //set value
        let splitTip = (((billAmt * givenTip) / 100) / totPeople);
        let splitBill = (billAmt / totPeople);
        let splitTotBillAmt = ((((billAmt * givenTip) / 100) + billAmt) / totPeople);

        document.getElementById("tipPerPerson").innerText = `₹${splitTip}`;

        document.getElementById("billPerPerson").innerText = `₹${splitBill}`;

        document.getElementById("totAmtPerPerson").innerText = `₹${splitTotBillAmt}`;

    } else {
        alert("Please enter correct value");
        location.reload();
    }
});


//Reset
const btnReset = document.querySelector('.btnReset');
btnReset.addEventListener('click', function () {
    location.reload();
});
