'use strict';

/*****

    1. adding class to <li> with dropdow in #nav
    2. slider in testimonials block
    3. adding animations to elements in current viewport
    4. Show navigation dropdown on mobile devices by click
    5. Contact Form Falidation
    6. ScrollTo
    7. Sticky Nav
    8. How it works popup

****/


// 1. adding class to <li> with dropdow in #nav
let nav = document.querySelectorAll('.nav-holder');
if (nav.length > 0){
    for (let i=0; i < nav.length; i++){
        let drops = nav[i].querySelectorAll('.drop');
        for (let j=0; j < drops.length; j++){
            drops[j].parentNode.classList.add('js-dropdown');
        }
    }
}

// 2. slider in testimonials block
let quotesSlider = document.getElementById('quotes-slider');
if (quotesSlider){
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
let sections = document.querySelectorAll('.js-flyin');
if (sections.length > 0){
    inView();
    window.onscroll = () =>{
        inView();
    }
}
function inView(){
    if (window.innerWidth > 768) {
        sections.forEach((section) => {
            if (inViewport(section, { offset: -300 })) {
                section.classList.add('js-inview');
            }
        });
    }
}

// 4. Show navigation dropdown on mobile devices by click
let navHolder = document.querySelector('.nav-holder');
let opener = navHolder.querySelector('.opener');
if (opener){
    opener.onclick = () => {
        navHolder.classList.toggle('opened');
    }
    window.onresize = () => {
        if (navHolder.classList.contains('opened')){
            navHolder.classList.remove('opened');
        }
    }
}

// 5. Contact Form Falidation
let contactForm = document.querySelector('.contact-form');
if (contactForm){
    contactForm.querySelector('.btn').onclick = () => {
        contactFormValidation();
    }
}
function contactFormValidation(){
    let fields = contactForm.querySelectorAll('.required');
    let validForm = true;
    fields.forEach((field) => {
        if (field.classList.contains('js-error')){
            field.classList.remove('js-error');
            field.parentNode.removeChild(field.parentNode.querySelector('.js-error-text'));
        }
        if (field.value.length < 3){
            let errorText = field.parentNode.querySelector('label').textContent + ' is required!';
            validationError(field, errorText);
            validForm = false;
        }
        else{
            if (field.getAttribute('type') === 'email'){
                let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!regex.test(field.value.toLowerCase())){
                    let errorText = field.parentNode.querySelector('label').textContent + ' is not valid!';
                    validationError(field, errorText);
                    validForm = false;
                }
            }
        }
    });
    if (validForm){
        // contactForm.submit();
        contactForm.classList.add('js-validform')
    }
}

function validationError(field, errorText){
    field.classList.add('js-error');
    let p = document.createElement("p");
    p.appendChild(document.createTextNode(errorText));
    p.classList.add('js-error-text');
    field.parentNode.appendChild(p);
}

// 6. ScrollTo
new SmoothScroll('a.scrollto[href*="#"]');

// 7. Sticky Header
let header = document.getElementById('header');
if (header){
    let headerH = header.offsetHeight + 50;
    let body = document.querySelector('body');
    let bodyHeight = body.clientHeight;
    let windowHeight = window.outerHeight;
    let span = document.createElement('span');
    span.classList.add('js-progressbar');
    header.appendChild(span);
    document.onscroll = (e) =>{
        let y = window.scrollY;
        if (y > headerH){
            body.classList.add('js-sticky');
            span.style.width = (y+windowHeight)/bodyHeight * 100 + '%';
        }
        else{
            body.classList.remove('js-sticky');
        }
    }
}

// 8. How it works popup
let howitworksPopup = document.querySelector('.howitworks-popup');
if (howitworksPopup){
    let popupOpener = document.querySelector('.popup-opener');
    let fader = document.createElement('span');
    let body = document.querySelector('body');
    let close = howitworksPopup.querySelector('.close');
    let left = window.outerWidth/2 - howitworksPopup.clientWidth/2 + 'px';
    let top = window.outerHeight/2 - howitworksPopup.clientHeight/2 + 'px';

    howitworksPopup.style.left = left;
    howitworksPopup.style.top = top;

    fader.setAttribute('id', 'fader');
    popupOpener.onclick = (e) => {
        e.preventDefault();
        body.appendChild(fader);
        howitworksPopup.classList.add('js-visible');
        left = window.outerWidth/2 - howitworksPopup.clientWidth/2 + 'px';
        top = window.outerHeight/2 - howitworksPopup.clientHeight/2 + 'px';
        howitworksPopup.style.left = left;
        howitworksPopup.style.top = top;
    };
    if (howitworksPopup.classList.contains('js-visible')){

    }
    fader.onclick = () => {
        removePopup()
    };
    close.onclick = () => {
        removePopup()
    };
    window.onresize = () => {
        removePopup()
    };
    function removePopup(){
        if (howitworksPopup.classList.contains('js-visible')){
            howitworksPopup.classList.remove('js-visible');
            body.removeChild(fader);
        }
    }
}
