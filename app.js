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
let outputbtn = document.querySelector('#outputbtn')

// test btns
homebtn.addEventListener('click', () => {
    console.log('home works')
})

//num js (numpy for JS)
var a = nj.array([2, 3, 4])
console.log("num js output", a)