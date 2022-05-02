function createTable(nper, periods, ib, actualpayments, intpayment, fb) {
    
    for(let i = 0; i < periods*nper; i++){
        tablebody.innerHTML += ("<tr><td>" + (i+1) + "</td>" + "<td>" + ib[i] + "</td>" + "<td>" + actualpayments[i] + "</td>" + "<td>" + intpayment[i] + "</td>" + "<td>" + fb[i] + "</td>" + "</tr>")
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
let homebtnlogo = document.querySelector('#homebtnlogo')
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

homebtnlogo.addEventListener('click', () => {
    // console.log('home logo works')
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