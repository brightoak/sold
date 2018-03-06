'use strict';

// 1. adding class to <li> with dropdow in #nav

var nav = document.querySelectorAll('.nav-holder');
if (nav.length > 0) {
    for (var i = 0; i < nav.length; i++) {
        var drops = nav[i].querySelectorAll('.drop');
        for (var j = 0; j < drops.length; j++) {
            drops[j].parentNode.classList.add('js-dropdown');
        }
    }
}

// 2. slider in testimonials block
var quotesSlider = document.getElementById('quotes-slider');
if (quotesSlider) {
    tns({
        container: quotesSlider,
        items: 1,
        mode: "gallery",
        speed: 700,
        axis: 'horizontal',
        lazyload: true
    });
}

// 3. adding animations to elements in current viewport
var sections = document.querySelectorAll('.js-flyin');
if (sections.length > 0) {
    inView();
    window.onscroll = function () {
        inView();
    };
}
function inView() {
    if (window.innerWidth > 768) {
        sections.forEach(function (section) {
            if (inViewport(section, { offset: -300 })) {
                section.classList.add('js-inview');
            }
        });
    }
}

// 4. show navigation dropdown on mobile devices by click
var navHolder = document.querySelector('.nav-holder');
var opener = navHolder.querySelector('.opener');
if (opener) {
    opener.onclick = function () {
        navHolder.classList.toggle('opened');
    };
    window.onresize = function () {
        if (navHolder.classList.contains('opened')) {
            navHolder.classList.remove('opened');
        }
    };
}

// 4. Contact Form Falidation
var contactForm = document.querySelector('.contact-form');
contactForm.querySelector('.btn').onclick = function () {
    contactFormValidation();
};
function contactFormValidation() {
    var fields = contactForm.querySelectorAll('.required');
    var validForm = true;
    fields.forEach(function (field) {
        if (field.classList.contains('js-error')) {
            field.classList.remove('js-error');
            field.parentNode.removeChild(field.parentNode.querySelector('.error-text'));
        }
        if (field.value.length < 3) {
            var errorText = field.parentNode.querySelector('label').textContent + ' is required!';
            validationError(field, errorText);
            validForm = false;
        } else {
            if (field.getAttribute('type') === 'email') {
                var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!regex.test(field.value.toLowerCase())) {
                    var _errorText = field.parentNode.querySelector('label').textContent + ' is not valid!';
                    validationError(field, _errorText);
                    validForm = false;
                }
            }
        }
    });
    if (validForm) {
        // contactForm.submit();
        contactForm.classList.add('js-validform');
    }
}

function validationError(field, errorText) {
    field.classList.add('js-error');
    var p = document.createElement("p");
    p.appendChild(document.createTextNode(errorText));
    p.classList.add('js-error-text');
    field.parentNode.appendChild(p);
}