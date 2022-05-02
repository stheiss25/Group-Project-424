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

document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
        $el.classList.add('is-active');
    }

    function closeModal($el) {
        $el.classList.remove('is-active');
    }

    function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
            closeModal($modal);
        });
    }


    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);
        console.log($target);

        $trigger.addEventListener('click', () => {
            openModal($target);
        });
    });

    // Add a click event on various child elements to close the parent modal || .adv for closing modal to go to other modal
    (document.querySelectorAll(
        '.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button, .adv') || []).forEach((
        $close) => {
        const $target = $close.closest('.modal');

        $close.addEventListener('click', () => {
            closeModal($target);
        });
    });

    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
        const e = event || window.event;

        if (e.keyCode === 27) { // Escape key
            closeAllModals();
        }
    });
});

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

// for hiding buttons when logged in
let loggedoutlinks = document.querySelectorAll('.loggedout');
let loggedinlinks = document.querySelectorAll('.loggedin');

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

ouputbtn.addEventListener('click', () => {
    // console.log('output works')
    homecontent.classList.add('is-hidden')
    savedcontent.classList.add('is-hidden')
    createcontent.classList.add('is-hidden')
    outputcontent.classList.remove('is-hidden')
})

//num js (numpy for JS)
var a = nj.array([2, 3, 4])
console.log("num js output", a)

//Sign Up Modal
//grab the button
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


//Log in Modal
//grab the button
var login = document.querySelector("#login");
// attach click event
login.addEventListener('click', function () {
    //grab the modal
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

//Account Info Modal
//grab the button
var account = document.querySelector("#acctinfo");
// attach click event
account.addEventListener('click', function () {
    //grab the modal
    var accountmodal = document.querySelector("#account_info");
    //add the is active class
    accountmodal.classList.add('is-active');
})
//attach event on modal background
//grab the modal background
var accountinfobg = document.querySelector("#accountinfobg");
accountinfobg.addEventListener('click', function () {
    accountmodal.classList.remove('is-active');
})

//sign out
let logoutbtn = document.querySelector('#logout');

//attach a click event
logoutbtn.addEventListener('click', () => {
    auth.signOut()
        .then((msg) => {
            console.log("user signed out!");
        })
})


db.collection('users').get().then(response => {
    console.log(response.docs[0].data());
})
let final_save_btn = document.getElementById("final_save_btn")

function saveBond() {
    console.log("ffffff")
    db.collection("saved_bonds").add({
        test: "testtttt"
    }).then(console.log("ffffff"))
}
final_save_btn.addEventListener('click', function () {
    saveBond()
})

let login_form = document.querySelector('#login_form');
login_form.addEventListener('submit', (e) => {
    e.preventDefault();
    let email_ = document.querySelector('#login_email').value;
    let password_ = document.querySelector('#login_password').value;
    auth.signInWithEmailAndPassword(email_, password_)
        .then((userCredentials) => {
            console.log(userCredentials.user.email + " with the id " + userCredentials.user.uid + " is logged in");
            // user_id = userCredentials.user.uid;
            my_login_modal.classList.remove('is-active');
            login_form.reset();
            welcome_user();
        })
        .catch((e) => {

        })


})

// Navbar Burger (for small screens)
document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {

                console.log("burger CLICKED!")
                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });
    }

});

// signup
let signup_form = document.querySelector('#signup_form')

signup_form.addEventListener('submit', (e) => {
    e.preventDefault()

    var sign_up_modal = document.querySelector("#sign_up_modal");


    let name = document.querySelector('#signup_name').value;
    let email = document.querySelector('#signup_email').value;
    let s_class = document.querySelector('#signup_class').value;
    let password = document.querySelector('#signup_password').value;

    auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
        console.log('user created successfully');
        user = {
            name: name,
            class: s_class,
            id: userCredential.user.uid,
            email: email,
            password: password
        };

        db.collection("users").add(user).then((data) => {
            console.log("User added to database");
        })
        signup_form.reset()
    })



    sign_up_modal.classList.remove('is-active');
})

function updateInfo(id, new_name, new_class, new_email, new_password) {
    let name = id.name;
    let email = id.email
    let password = id.password
    let a_class = id.class

    if (new_name !== null) {
        name = new_name
    }
    if (new_class !== null) {
        a_class = new_class
    }
    if (new_email !== null) {
        email = new_email
    }
    if (new_password !== null) {
        password = new_password
    }
    return id.update({
            name: name,
            password: password,
            class: a_class,
            email: email

        })
        .then(() => {
            console.log("Document successfully updated!");
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
}

let log_in = document.querySelector("#login_form");

log_in.addEventListener('submit', (e) => {
    var log_in_modal = document.querySelector("#login");
    log_in_modal.classList.remove('is-active');
})


let change_info = document.querySelector("#change_info");

change_info.addEventListener('submit', (e) => {

    var change_modal = document.querySelector("account_info");

    let new_name = document.querySelector('#change_name').value;
    let new_class = document.querySelector('#change_class').value;
    let new_email = document.querySelector('#change_email').value;
    let new_password = document.querySelector('#change_password').value;

    userdata.forEach((user) => {
        if (auth.currentUser.uid == user.data().id) {
            main_user = user;
            main_user_id = db.collection("Users").doc(user.id);
        }
    })

    updateInfo(main_user_id, new_name, new_class, new_email, new_password)

    change_modal.classList.remove('is-active');
    e.preventDefault();
})



var my_table = [7]
let outputbtn = document.getElementById("outputbtn")
outputbtn.addEventListener('click', (e) => {
    console.log("fffffffffffasdasdasdasdasd")
    let principal = Number(document.getElementById("loan_size").value)
    let int_rate = Number(document.getElementById("interest").value)
    let numPayments = Number(document.getElementById("payments").value)
    let term = Number(document.getElementById("periods").value)
    let balloon = Number(document.getElementById("balloon_payment").value)
    let regime_to_split = "5 20, 0 20, -5 20"
    getTable(principal, int_rate, numPayments, term, balloon, regime_to_split)
    //below is for spencer
    let graph = getPaymentShape(term, numPayments, regime_to_split)
})

let exportbtn = document.getElementById("export_button")
exportbtn.addEventListener('click', (e) => {
    console.log("exporting table to CSV....")
    my_table.unshift(["Month", "Initial Balance", "Payment", "Interest", "Final Balance"])
    my_table.unshift(["", "", "Debt Payment Table", "", ""])

    exportCSV(my_table)
})

//// for Spencer 
getPaymentShape(5, 12, "5 20, 0 20, -5 20")

function getPaymentShape(term, numPayments, regimes) {
    let regime_to_split = "5 20, 0 20, -5 20"
    // let regime_to_split = regimes

    let regime_array = regime_to_split.split(",")
    let shape = Array(regime_array.length)
    for (let i = 0; i < regime_array.length; i++) {
        shape[i] = regime_array[i].trim().split(" ")
        shape[i][0] = Number(shape[i][0])
        shape[i][1] = Number(shape[i][1])
    }
    let termLen = term * numPayments
    let month = Array(termLen).fill(null).map((_, i) => i + 1)
    let cf_pattern = Array(termLen).fill(1)
    let regime = 0
    let switch1 = shape[0][1]

    for (let i = 1; i < termLen; i++) {
        cf_pattern[i] = cf_pattern[i - 1] * (1 + shape[regime][0] / 100)
        if (i == switch1 - 1 && regime < shape.length - 1) {
            regime = regime + 1
            switch1 = switch1 + shape[regime][1]
        }
    }

    let graph_info = Array(termLen)
    for (let i = 0; i < termLen; i++) {
        graph_info[i] = [i + 1, cf_pattern[i]]
    }

    return graph_info;
}


function getTable(principal, int_rate, payments_per_period, periods, balloon_payment, regimes) {
    console.log("FfffffASfasdasd" + my_table)
    console.log(principal)
    console.log(balloon_payment)
    //let bnow = 100000000
    let bnow = principal
    //let rate = .10
    let rate = int_rate
    //let numPayments = 12
    let numPayments = payments_per_period
    //let term = 5
    let term = periods
    //let balloon = 20000000
    let balloon = balloon_payment
    //let regime_to_split = "5 10, 0 20, -5 20"
    let regime_to_split = regimes

    let regime_array = regime_to_split.split(",")
    let shape = Array(regime_array.length)
    for (let i = 0; i < regime_array.length; i++) {
        shape[i] = regime_array[i].trim().split(" ")
        shape[i][0] = Number(shape[i][0])
        shape[i][1] = Number(shape[i][1])
    }

    let termLen = term * numPayments
    let month = Array(termLen).fill(null).map((_, i) => i + 1)
    let cf_pattern = Array(termLen).fill(1)
    let regime = 0
    let switch1 = shape[0][1]



    for (let i = 1; i < termLen; i++) {
        cf_pattern[i] = cf_pattern[i - 1] * (1 + shape[regime][0] / 100)
        if (i == switch1 - 1 && regime < shape.length - 1) {
            regime = regime + 1
            switch1 = switch1 + shape[regime][1]
        }
    }

    let npv = getNPV(rate / 12, cf_pattern)
    let f = npv / (1 + (rate / 12))

    let payment1 = (bnow - balloon / Math.pow(((1 + rate / 12)), (term * 12))) / f
    console.log(f, npv)
    let payment = Array(termLen)

    for (let i = 0; i < termLen; i++) {
        payment[i] = payment1 * cf_pattern[i]
    }

    let startprincipal = Array(termLen)
    let endprincipal = Array(termLen)
    let interestpath = Array(termLen)
    for (let i = 0; i < termLen; i++) {
        if (i == 0) {
            startprincipal[0] = bnow
        } else {
            startprincipal[i] = endprincipal[i - 1]
        }
        interestpath[i] = startprincipal[i] * rate / 12
        endprincipal[i] = startprincipal[i] + interestpath[i] - payment[i]
    }

    my_table = Array(termLen)

    for (let i = 0; i < term * 12; i++) {
        my_table[i] = [month[i], startprincipal[i], payment[i], interestpath[i], endprincipal[i]]
    }
    console.log(my_table)

    function getNPV(rate, cashFlows) {
        var npv = 0;

        for (var i = 1; i < cashFlows.length; i++) {
            npv += cashFlows[i] / Math.pow(rate + 1, i);
        }

        npv += cashFlows[0]

        return npv;
    }

    let tablebody = document.getElementById("table_body")

    for (let i = 0; i < term * numPayments; i++) {
        tablebody.innerHTML += ("<tr><td>" + (i + 1) + "</td>" + "<td>" + startprincipal[i] + "</td>" + "<td>" + payment[
            i] + "</td>" + "<td>" + interestpath[i] + "</td>" + "<td>" + endprincipal[i] + "</td>" + "</tr>")
    }
}