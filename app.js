function calcBondInformation(bnow, balloon, periods, nper, rper, nregims){
    let rnow = rper/nper;
    let term = periods*nper;
    let ib = [term];
    let fb = [term];
    let intpayment = [term];

    

    for(let i = 0; i < term; i ++){
        if(i == 0){
            ib[i] = bnow
        }
        else{
            ib[i] = fb[i-1]
        }
        intpayment[i]=ib[i]*rnow/100
        fb[i]=ib[i]+intpayment[i]-actualpayments[i]
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