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
function exportCSV(data, name) {
    data.unshift(["Month", "Initial Balance", "Payment", "Interest", "Final Balance"])
    data.unshift(["", "", "Debt Payment Table", "", ""])
    let csv = "data:text/csv;charset=utf-8,";
    for (let i = 0; i < data.length; i++) {
        csv += (data[i] + "\r\n");
    }
    var encodedUri = encodeURI(csv);

    //credit to isherwood on stack overflow
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", name + ".csv");
    document.body.appendChild(link);
    link.click();
}

// for hiding buttons when logged in
let loggedoutlinks = document.querySelectorAll('.loggedout');
let loggedinlinks = document.querySelectorAll('.loggedin');

// function to see if user is signed in and what they can see
function hideButtons(user) {
    //check if user is passed to the function (user is signed in)
    if (user) {
        // show all the loggedin links
        loggedinlinks.forEach((link) => {
            link.classList.remove('is-hidden');
        })

        // hide all the loggedout links
        loggedoutlinks.forEach((link) => {
            link.classList.add('is-hidden');
        })
    }
    // no user is passed to the function (user is signed out)
    else {
        // show all the loggedout links
        loggedoutlinks.forEach((link) => {
            link.classList.remove('is-hidden');
        })
        // hide all the loggedin links
        loggedinlinks.forEach((link) => {
            link.classList.add('is-hidden');
        })
    }
}

auth.onAuthStateChanged((user) => {
    // check if user is signed in or signed out
    if (user) {

        hideButtons(user);
    } else {

        hideButtons();
    }
})

// btns for navigation
let homebtn = document.querySelector('#homebtn')
let homebtnlogo = document.querySelector('#homebtnlogo')
let savedbtn = document.querySelector('#savedbtn')
let createbtn = document.querySelector('#createbtn')
let ouputbtn = document.querySelector('#outputbtn')
let startbtn = document.querySelector('#startbtn')

let homecontent = document.querySelector('#homecontent')
let savedcontent = document.querySelector('#savedcontent')
let createcontent = document.querySelector('#createcontent')
let outputcontent = document.querySelector('#outputcontent')

homebtn.addEventListener('click', () => {

    homecontent.classList.remove('is-hidden')
    savedcontent.classList.add('is-hidden')
    createcontent.classList.add('is-hidden')
    outputcontent.classList.add('is-hidden')
    saved_bond_table.innerHTML = ""
})

homebtnlogo.addEventListener('click', () => {

    homecontent.classList.remove('is-hidden')
    savedcontent.classList.add('is-hidden')
    createcontent.classList.add('is-hidden')
    outputcontent.classList.add('is-hidden')
    saved_bond_table.innerHTML = ""

})

savedbtn.addEventListener('click', () => {

    homecontent.classList.add('is-hidden')
    savedcontent.classList.remove('is-hidden')
    createcontent.classList.add('is-hidden')
    outputcontent.classList.add('is-hidden')
    saved_bond_table.innerHTML = ""

    displaySavedBonds()
})

createbtn.addEventListener('click', () => {

    homecontent.classList.add('is-hidden')
    savedcontent.classList.add('is-hidden')
    createcontent.classList.remove('is-hidden')
    outputcontent.classList.add('is-hidden')
    saved_bond_table.innerHTML = ""

})

ouputbtn.addEventListener('click', () => {

    homecontent.classList.add('is-hidden')
    savedcontent.classList.add('is-hidden')
    createcontent.classList.add('is-hidden')
    outputcontent.classList.remove('is-hidden')
    saved_bond_table.innerHTML = ""

})

startbtn.addEventListener('click', () => {

    homecontent.classList.add('is-hidden')
    savedcontent.classList.add('is-hidden')
    createcontent.classList.remove('is-hidden')
    outputcontent.classList.add('is-hidden')
    saved_bond_table.innerHTML = ""

})

let cancel_btn = document.getElementById("cancel_bond")
cancel_btn.addEventListener('click', (e) => {
    homecontent.classList.remove('is-hidden')
    savedcontent.classList.add('is-hidden')
    createcontent.classList.add('is-hidden')
    outputcontent.classList.add('is-hidden')
    saved_bond_table.innerHTML = ""
})

// signup
let signup_form = document.querySelector('#signup_form')

signup_form.addEventListener('submit', (e) => {
    e.preventDefault()

    var sign_up_modal = document.querySelector("#sign_up_modal");


    let name = document.querySelector('#signup_name').value;
    let email = document.querySelector('#signup_email').value;
    let s_class = document.querySelector('#signup_class').value;
    let password = document.querySelector('#signup_password').value;
    let user = {}

    auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {

        user = {
            name: name,
            class: s_class,
            id: userCredential.user.uid,
            email: email,
            password: password
        };

        db.collection("users").add(user).then((data) => {

        })
    })

    signup_form.reset()
    sign_up_modal.classList.remove('is-active');
})

function updateInfo(id, new_name, new_class, new_email, new_password) {

    return id.update({
            name: new_name,
            password: new_password,
            class: new_class,
            email: new_email

        })
        .then(() => {

        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
}

let change_info = document.querySelector("#change_info");

change_info.addEventListener('submit', (e) => {


    let new_name = document.querySelector('#change_name').value;
    let new_class = document.querySelector('#change_class').value;
    let new_email = document.querySelector('#change_email').value;
    let new_password = document.querySelector('#change_password').value;

    let current_name = document.getElementById("name_label")
    let current_class = document.getElementById("class_label")
    let current_email = document.getElementById("email_label")
    let current_password = document.getElementById("password_label")





    let main_user_id = null;
    db.collection("users").get().then((data) => {

        let userdata = data.docs;

        userdata.forEach((user) => {
            if (auth.currentUser.uid == user.data().id) {
                current_name.innerHTML = "Name: " + user.data().name
                current_class.innerHTML = "Class: " + user.data().class
                current_email.innerHTML = "Email: " + user.data().email
                current_password.innerHTML = "Password: " + user.data().password
                if (new_name == "") {
                    new_name = user.data().name
                }
                if (new_password == "") {
                    new_password = user.data().password
                }
                if (new_email == "") {
                    new_email = user.data().email
                }
                if (new_class == "") {
                    new_class = user.data().class
                }
                main_user_id = db.collection("users").doc(user.id);
            }

        })

        updateInfo(main_user_id, new_name, new_class, new_email, new_password);
        userdata.forEach((user) => {
            if (auth.currentUser.uid == user.data().id) {
                current_name.innerHTML = "Name: " + new_name
                current_class.innerHTML = "Class: " + new_class
                current_email.innerHTML = "Email: " + new_email
                current_password.innerHTML = "Password: " + new_password
            }

        })
    })

    e.preventDefault();
})

let login_form = document.querySelector('#login_form');
login_form.addEventListener('submit', (e) => {

    var my_login_modal = document.querySelector("#login_modal");

    e.preventDefault();
    let email_ = document.querySelector('#login_email').value;
    let password_ = document.querySelector('#login_password').value;
    auth.signInWithEmailAndPassword(email_, password_)
        .then((userCredentials) => {

            welcome_user();
        })
        .catch((e) => {

        })
    login_form.reset();
    my_login_modal.classList.remove('is-active');

})

//Sign Up Modal
//grab the button
var signup = document.querySelector("#signup");
// attach click event
signup.addEventListener('click', function () {
    //grab the modal
    var mymodal = document.querySelector("#sign_up_modal");
    //add the is active class
    mymodal.classList.add('is-active');

    //attach event on modal background
    //grab the modal background
    var modalbg = document.querySelector("#signupmodalbg");
    modalbg.addEventListener('click', function () {
        mymodal.classList.remove('is-active');
    })
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

    //attach event on modal background
    //grab the modal background
    var loginmodalbg = document.querySelector("#loginmodalbg");
    loginmodalbg.addEventListener('click', function () {
        loginmodal.classList.remove('is-active');
    })
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


    let current_name = document.getElementById("name_label")
    let current_class = document.getElementById("class_label")
    let current_email = document.getElementById("email_label")
    let current_password = document.getElementById("password_label")

    db.collection("users").get().then((data) => {
        let userdata = data.docs;
        userdata.forEach((user) => {
            if (auth.currentUser.uid == user.data().id) {
                current_name.innerHTML = "Name: " + user.data().name
                current_class.innerHTML = "Class: " + user.data().class
                current_email.innerHTML = "Email: " + user.data().email
                current_password.innerHTML = "Password: " + user.data().password
            }

        })
    })


    //attach event on modal background
    //grab the modal background
    var accountinfobg = document.querySelector("#accountinfobg");
    accountinfobg.addEventListener('click', function () {
        accountmodal.classList.remove('is-active');
    })
})

//sign out
let logoutbtn = document.querySelector('#logout');

//attach a click event
logoutbtn.addEventListener('click', () => {
    auth.signOut()
        .then((msg) => {

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


var my_table = []
var principal = 0
var int_rate = 0
var numPayments = 0
var term = 0
var balloon = 0
var regime_to_split = ""
//implement balloon

let final_save_btn = document.getElementById("final_save_btn")
let save_modal = document.getElementById("save_modal")

function saveBond() {
    let name = document.getElementById("file_name").value
    db.collection("saved_bonds").add({
        file_name: name,
        email: firebase.auth().currentUser.email,
        date: new Date().toLocaleDateString(),
        timestamp: Date.now(),
        principal: principal,
        int_rate: int_rate,
        numPayments: numPayments,
        term: term,
        balloon: balloon,
        regime_to_split: regime_to_split
    })
}
save_modal.addEventListener('submit', (e) => {
    e.preventDefault()
    saveBond()
    save_modal.classList.remove('is-active');

})

let outputbtn = document.getElementById("outputbtn")
outputbtn.addEventListener('click', (e) => {
    isCreatingBond = true

    principal = Number(document.getElementById("loan_size").value)
    int_rate = Number(document.getElementById("interest").value)
    numPayments = Number(document.getElementById("payments").value)
    term = Number(document.getElementById("periods").value)
    balloon = Number(document.getElementById("balloon_payment").value)

    regime_to_split = document.getElementById("growth").value
    getTable(principal, int_rate, numPayments, term, balloon, regime_to_split)

    let graph1 = getPaymentShape(term, numPayments, regime_to_split)
})

let exportbtn = document.getElementById("export_csv")
exportbtn.addEventListener('click', (e) => {

    let export_name = document.getElementById("file_name_export").value


    exportCSV(my_table, export_name)
})



function getPaymentShape(term, numPayments, regimes) {

    let regime_to_split = regimes

    let regime_array = regime_to_split.split(",")
    let shape = Array(regime_array.length)
    for (let i = 0; i < regime_array.length; i++) {
        shape[i] = regime_array[i].trim().split(" ")
        shape[i][0] = Number(shape[i][0])
        shape[i][1] = Number(shape[i][1])
    }
    let termLen = term * numPayments

    let regime_sum = 0


    for (let i = 0; i < regime_array.length; i++) {
        regime_sum += Number(shape[i][1])
    }
    if (regime_sum != termLen) {
        if (regime_to_split != null && regime_to_split != 0) {
            alert("The length of your growth regimes does not add up to the number of payments.");
        }
    }
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

var isCreatingBond = false

function getTable(principal, int_rate, payments_per_period, periods, balloon_payment, regimes) {
    let tablebody = document.getElementById("table_body")
    tablebody.innerHTML = ""

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


    function getNPV(rate, cashFlows) {
        var npv = 0;

        for (var i = 1; i < cashFlows.length; i++) {
            npv += cashFlows[i] / Math.pow(rate + 1, i);
        }

        npv += cashFlows[0]

        return npv;
    }
    if (isCreatingBond == true) {


        for (let i = 0; i < term * numPayments; i++) {
            tablebody.innerHTML += ("<tr><td>" + (i + 1) + "</td>" + "<td>" + Number(startprincipal[i].toFixed(2)).toLocaleString('en-US') + "</td>" + "<td>" + Number(payment[
                    i].toFixed(2)).toLocaleString('en-US') + "</td>" + "<td>" + Number(interestpath[i].toFixed(2)).toLocaleString('en-US') + "</td>" +
                "<td>" + Number(endprincipal[i].toFixed(2)).toLocaleString('en-US') + "</td>" + "</tr>")
        }
        isCreatingBond = false
    }
}

// graph display on modal
let tograph = document.querySelector('#tograph')

tograph.addEventListener('click', () => {


    let numPayments = Number(document.getElementById("payments").value)
    let term = Number(document.getElementById("periods").value)
    let regime_to_split = document.getElementById("growth").value


    let graph1 = getPaymentShape(term, numPayments, regime_to_split)

    let xarray = []
    let yarray = []

    // x vals
    for (let i = 0; i < graph1.length; i++) {
        xarray.push(graph1[i][0])
    }

    // y vals
    for (let i = 0; i < graph1.length; i++) {
        yarray.push(graph1[i][1])
    }

    let dp = []
    for (let j = 0; j < xarray.length; j++) {
        dp.push({
            x: xarray[j],
            y: yarray[j]
        })
    }

    let interval = xarray.length / 6

    // display graph
    var c = new CanvasJS.Chart('graphdisplay', {
        zoomEnabled: true,

        axisX: {
            title: ' ',
            interval: interval
        },
        axisY: {
            title: '',
            valueFormatString: ' '
        },
        data: [{
            type: 'line',
            xValueType: 'area',
            dataPoints: dp
        }]
    })
    c.render()
})
// x = term
// y = numPaymentsx

//put bond info into saved bonds table
var saved_bond_table = document.getElementById("saved_bond_table")
var saved_matched_bonds

function displaySavedBonds() {
    db.collection("saved_bonds").get().then(doc => {
        saved_matched_bonds = []
        doc.forEach(entry => {
            if (entry.data().email == firebase.auth().currentUser.email) {
                saved_matched_bonds.push(entry.data())

            }
        })

        for (let i = 0; i < saved_matched_bonds.length; i++) {
            saved_bond_table.innerHTML += "<tr><th><div class='content is-large'>" + saved_matched_bonds[i].file_name +
                "</div></th>" + "<th><div class = 'content is-large'>" + saved_matched_bonds[i].date +
                "</th></div>" + "<th><button class = 'button viewbtn' id = 'temp_view_id'>View</button></th>" +
                '<th><button class = "button downloadbtn"' + 'id = "temp_download_id"' + '>' + 'Download CSV</button></th></tr>'
            document.getElementById('temp_download_id').id = ('download_' + saved_matched_bonds[i].email + saved_matched_bonds[i].timestamp)
            document.getElementById('temp_view_id').id = ('view_' + saved_matched_bonds[i].email + saved_matched_bonds[i].timestamp)

        }
        //for downloading csv
        var btns = document.getElementsByClassName('button downloadbtn')
        btns = Array.from(btns)
        btns.forEach(btn => {

            btn.addEventListener('click', event => {
                doc.forEach(entry => {
                    if (event.target.id == "download_" + entry.data().email + entry.data().timestamp) {

                        createAndDownloadTableCSV(entry.data())
                    }
                })
            });
           
        
        
            //for viewing
            var vbtns = document.getElementsByClassName('button viewbtn')

            vbtns = Array.from(vbtns)

            vbtns.forEach(vbtn => {
                vbtn.addEventListener('click', event => {

                    doc.forEach(entry => {
                        if (event.target.id == "view_" + entry.data().email + entry.data().timestamp) {
                            isCreatingBond = true
                            homecontent.classList.add('is-hidden')
                            savedcontent.classList.add('is-hidden')
                            createcontent.classList.add('is-hidden')
                            outputcontent.classList.remove('is-hidden')
                            saved_bond_table.innerHTML = ""

                            getTable(entry.data().principal, entry.data().int_rate, entry.data().numPayments,
                                entry.data().term, entry.data().balloon, entry.data().regime_to_split)

                        }
                    })


                })
            })


        });
    })
}

function createAndDownloadTableCSV(data) {

    getTable(data.principal, data.int_rate, data.numPayments, data.term, data.balloon, data.regime_to_split)
    exportCSV(my_table, data.file_name)
}
function createAndDownloadTablePDF(data) {

    getTable(data.principal, data.int_rate, data.numPayments, data.term, data.balloon, data.regime_to_split)
    var pdf_doc = new jsPDF()
    var name = data.file_name
    pdf_doc.autoTable({
      html: '#bond_table'
    })
    pdf_doc.save(name + '.pdf')
}

//go back/edit inputs
var goback = document.getElementById("go_back_button")
goback.addEventListener('click', (e) => {
    homecontent.classList.add('is-hidden')
    savedcontent.classList.add('is-hidden')
    createcontent.classList.remove('is-hidden')
    outputcontent.classList.add('is-hidden')
    saved_bond_table.innerHTML = ""
})

window.jsPDF = window.jspdf.jsPDF;
var pdfexp = document.getElementById("pdf_export")

      pdfexp.addEventListener('click', (e) => {
        var pdf_doc = new jsPDF()
        var name = document.getElementById("file_name_export").value
        pdf_doc.autoTable({
          html: '#bond_table'
        })
        pdf_doc.save(name + '.pdf')
})

