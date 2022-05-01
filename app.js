function calcBondInformation(bnow, balloon, periods, nper, rper, nregims) {
    let rnow = rper / nper;
    let term = periods * nper;
    let ib = [term];
    let fb = [term];
    let intpayment = [term];

    paymentshape = [term]
    regime = 0
    change = shape[0][1]

    for (let i = 0; i < term; i++) {
        paymentshape[i] = paymentshape[i - 1] * (1 + shape[regime][0] / 100)
        if (i == change - 1 && regime < nregims - 1) {
            regime = regime + 1
            change = change + shape[regime][1]
        }
    }

    let F = getNPV(rnow, ib, )
    //this the bond factor
    //warning: npv does not discount first payment in numpy-financial unlike excel


    for (let i = 0; i < term; i++) {
        if (i == 0) {
            ib[i] = bnow
        } else {
            ib[i] = fb[i - 1]
        }
        intpayment[i] = ib[i] * rnow / 100
        fb[i] = ib[i] + intpayment[i] - actualpayments[i]
    }
}
/**
 * Calculates the Net Present Value of a given initial investment
 * cost and an array of cash flow values with the specified discount rate.
 *
 * @param {number} rate - The discount rate percentage
 * @param {number} initialCost - The initial investment
 * @param {array} cashFlows - An array of future payment amounts
 * @return {number} The calculated Net Present Value
 */
function getNPV(rate, initialCost, cashFlows) {
    var npv = initialCost;

    for (var i = 0; i < cashFlows.length; i++) {
        npv += cashFlows[i] / Math.pow(rate / 100 + 1, i + 1);
    }

    return npv;
}


//function to export data as CSV, should be used after button is clicked, data is a 2D array
function exportCSV(data) {
    let csv = "data:text/csv;charset=utf-8,";
    for (let i = 0; i < data.length; i++) {
        csv += (data[i] + "\r\n");
    }
    var encodedUri = encodeURI(csv);

    //credit to isherwood on stack overflow
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "my_data.csv");
    document.body.appendChild(link);
    link.click();
}

// btns for navigation
let homebtn = document.querySelector('#homebtn')
let savedbtn = document.querySelector('#savedbtn')
let createbtn = document.querySelector('#createbtn')
let ouputbtn = document.querySelector('#outputbtn')

let homecontent = document.querySelector('#homecontent')
let savedcontent = document.querySelector('#savedcontent')
let createcontent = document.querySelector('#createcontent')
let outputcontent = document.querySelector('#outputcontent')

homebtn.addEventListener('click', () => {
    // console.log('home works')
    homecontent.classList.remove('is-hidden')
    savedcontent.classList.add('is-hidden')
    createcontent.classList.add('is-hidden')
    outputcontent.classList.add('is-hidden')
})

savedbtn.addEventListener('click', () => {
    // console.log('saved works')
    homecontent.classList.add('is-hidden')
    savedcontent.classList.remove('is-hidden')
    createcontent.classList.add('is-hidden')
    outputcontent.classList.add('is-hidden')
})

createbtn.addEventListener('click', () => {
    // console.log('create works')
    homecontent.classList.add('is-hidden')
    savedcontent.classList.add('is-hidden')
    createcontent.classList.remove('is-hidden')
    outputcontent.classList.add('is-hidden')
})

outputbtn.addEventListener('click', () => {
    // console.log('output works')
    homecontent.classList.add('is-hidden')
    savedcontent.classList.add('is-hidden')
    createcontent.classList.add('is-hidden')
    outputcontent.classList.remove('is-hidden')
})

//num js (numpy for JS)
var a = nj.array([2, 3, 4])
console.log("num js output", a)

//npm financial
// import {
//     pv
// } from "./node_modules/financial";

// Sign Up Modal
// grab the button
var signup = document.querySelector("#signup");
// attach click event
signup.addEventListener('click', function () {
    //grab the modal
    var mymodal = document.querySelector("#sign_up_modal");
    //add the is active class
    mymodal.classList.add('is-active');
})
//attach event on modal background
//grab the modal background
var modalbg = document.querySelector("#signupmodalbg");
modalbg.addEventListener('click', function () {
    mymodal.classList.remove('is-active');
})


// Log in Modal
// grab the button
var login = document.querySelector("#login");
// attach click event
login.addEventListener('click', function () {
    //grab the modeal
    var loginmodal = document.querySelector("#login_modal");
    //add the is active class
    loginmodal.classList.add('is-active');
})
//attach event on modal background
//grab the modal background
var loginmodalbg = document.querySelector("#loginmodalbg");
loginmodalbg.addEventListener('click', function () {
    loginmodal.classList.remove('is-active');
})

//sign out
let logoutbtn = document.querySelector('#logoutbtn');

//attach a click event
logoutbtn.addEventListener('click', () => {
    auth.signOut()
        .then((msg) => {
            console.log("user signed out!");
        })
})