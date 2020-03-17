const MENU = document.getElementById('navigation');
const FILTERS = document.getElementById('filter_list');
const PORTFOLIO = document.getElementById('portfolio_images');
const BUTTON = document.getElementById('submit_button');
const OK_BUTTON = document.getElementById('message_ok');

// header
MENU.addEventListener('click', (event) => {
    if (event.target.tagName == 'A') {
        MENU.querySelectorAll('a').forEach(el => el.classList.remove('active'));
        event.target.classList.add('active');
    }

});


function goToAnchor(anchor) {
    var loc = document.location.toString().split('#')[0];
    document.location = loc + '#' + anchor;
    return false;
}

//   Sliders
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("slider");
    if (n > x.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = x.length }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex - 1].style.display = "block";
};

// Switch screens of the phones
function switchPhoneState(element) {
    const screenSwitch = document.getElementById(element);
    // screenSwitch.classList.add("phonePowerOff")
    if (screenSwitch.classList.contains("phonePowerOff")) {
        screenSwitch.classList.remove("phonePowerOff")
    } else {
        screenSwitch.classList.add("phonePowerOff")
    }
}

// filter list
function buttonhandler(event) {
    if (event.target.tagName === 'SPAN' && !event.target.classList.contains('button_active')) {
        FILTERS.querySelectorAll('span').forEach(el => {
            el.classList.remove('active_list');
        });
        let portSliders = PORTFOLIO.querySelectorAll('img');
        PORTFOLIO.insertAdjacentElement('afterbegin', portSliders[portSliders.length - 1]);
        PORTFOLIO.querySelectorAll('img').forEach(el => {
            el.classList.remove('active_list');
        });
        let elem = event.target;
        elem.classList.add('active_list');
    }
};

FILTERS.addEventListener('click', buttonhandler);
PORTFOLIO.addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') {
        PORTFOLIO.querySelectorAll('img').forEach(el => {
            el.classList.remove('active-list-img');
        });
        event.target.classList.add('active-list-img');
    }
});

// get a quote

BUTTON.addEventListener('click', (event) => {
    const subject = document.getElementById('subject').value;
    if (subject == '') {
        document.getElementById('message_result').innerHTML = "Without subject"
    } else {
        document.getElementById('message_result').innerText = "Subject:  " + subject;

    };



    const description = document.getElementById('description').value;
    if (description == '') {
        document.getElementById('message_description').innerHTML = "Without description"
    } else {
        document.getElementById('message_description').innerHTML = "Description:  " + description;
    };
    document.getElementById('message_container').classList.remove('hidden');
    document.getElementById('message_block').classList.remove('hidden');

});

OK_BUTTON.addEventListener('click', (event) => {
    document.getElementById('message_container').classList.add('hidden')

});