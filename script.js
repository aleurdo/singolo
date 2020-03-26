// Constants
const HEADER = document.getElementById("header")
const HEADER_HEIGHT = HEADER.offsetHeight;
const MENU = document.getElementById('navigation');
const FILTERS = document.getElementById('filter_list');
const BUTTON = document.getElementById('submit_button');
const OK_BUTTON = document.getElementById('message_ok');
const PORTFOLIO = document.getElementById('portfolio_images');

// Anchors
const HEADER_ANCHOR = document.getElementById("main_wrapper")
const SERVICES_ANCHOR = document.getElementById('service_wrapper');
const PORTFOLIO_ANCHOR = document.getElementById('portfolio_wrap');
const ABOUT_ANCHOR = document.getElementById('about_us_container');
const CONTACT_ANCHOR = document.getElementById('top_container');


// Listeners
// - Menu click
MENU.addEventListener('click', onMenuEvent);
// - on page scroll
window.addEventListener("scroll", onWindowsScroll)

function onMenuEvent(event) {
    if (event.target.tagName == 'A') {
        removeLinkActive();
        addLinkActive(event.target.id);
    }
}

function removeLinkActive() {
    MENU.querySelectorAll('a').forEach(el => el.classList.remove('active'));
}

function addLinkActive(element) {
    document.getElementById(element).classList.add('active');
}

function onWindowsScroll() {
    updateHeaderparameters()
    updateActiveMenu()
}

function updateHeaderparameters() {
    if (window.pageYOffset > 100) {
        HEADER.classList.add("header_opacity_half");
        HEADER.classList.remove("header_opacity_full");
    } else {
        HEADER.classList.remove("header_opacity_full");
        HEADER.classList.add("header_opacity_half");
    }
}

function updateActiveMenu() {
    if (window.scrollY < SERVICES_ANCHOR.offsetTop + HEADER_HEIGHT) {
        removeLinkActive();
        addLinkActive('menu_item_home');
    }
    if (window.scrollY >= SERVICES_ANCHOR.offsetTop + HEADER_HEIGHT) {
        removeLinkActive();
        addLinkActive('menu_item_services');
    }
    if (window.scrollY >= PORTFOLIO_ANCHOR.offsetTop + HEADER_HEIGHT) {
        removeLinkActive();
        addLinkActive('menu_item_portfolio');
    }
    if (window.scrollY >= ABOUT_ANCHOR.offsetTop + 1100) {
        removeLinkActive();
        addLinkActive('menu_item_about');
    }
    if (window.scrollY >= CONTACT_ANCHOR.offsetTop + HEADER_HEIGHT) {
        removeLinkActive();
        addLinkActive('menu_item_contact');
    }
}

function goToAnchor(anchor) {
    document.getElementById(anchor).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
    return false;
}

//   Sliders
var sliderList = document.getElementsByClassName("slider");
var slideIndex = 1;
initSlide(slideIndex);

function plusDivs(n) {
    if (n == -1) {
        console.log('-1');
        hideSlideDivs(n, 'to-left');
        showSlideDivs(slideIndex += n, 'from-right');
    } else {
        console.log('1');
        hideSlideDivs(n, 'to-right');
        showSlideDivs(slideIndex += n, 'from-left');
    }
    // showDivs(slideIndex += n, n);
}

function initSlide(n, d = "") {
    console.log("direction:" + d);

    var i;
    let direction;
    // var x = document.getElementsByClassName("slider");
    if (n > sliderList.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = sliderList.length; }


    // for (i = 0; i < x.length; i++) {
    //     x[i].style.display = "none";
    // }
    // x[slideIndex - 1].style.display = "block";
    for (i = 0; i < sliderList.length; i++) {
        // console.log(i);
        sliderList[i].classList.remove('slider_slide_active');
    }
    sliderList[slideIndex - 1].classList.add('slider_slide_active');
};

function showSlideDivs(n, a) {
    if (n > sliderList.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = sliderList.length; }
    console.log('active:' + (slideIndex - 1));

    sliderList[slideIndex - 1].classList.add('next', a);
    sliderList[slideIndex - 1].addEventListener('animationend', function() {
        this.classList.remove('next', a);
        this.classList.add('slider_slide_active');
    })

    // sliderList[slideIndex - 1].classList.add('slider_slide_active');
};

function hideSlideDivs(n, a) {
    console.log('passive: ' + ((slideIndex - 1)))
    sliderList[slideIndex - 1].classList.add(a);
    sliderList[slideIndex - 1].addEventListener('animationend', function() {
        this.classList.remove('slider_slide_active', a);
    })


    // sliderList[slideIndex -1].classList.remove('slider_slide_active');

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



OK_BUTTON.addEventListener('click', (event) => {
    document.getElementById('message_container').classList.add('hidden')

});


function myFunction() {

    var validEmail = ValidateEmail(document.getElementById('email').value);
    if (validEmail == false) {
        return
    }
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

    document.getElementById("form").reset();

}

// Validation

function ValidateEmail(inputText) {

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.match(mailformat)) {
        return true;
    } else {
        alert("You have entered an invalid email address!");
        return false;
    }

}


// Media