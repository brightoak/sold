'use strict';

/*****

    1. adding class to <li> with dropdow in #nav
    2. slider in testimonials block
    3. adding animations to elements in current viewport
    4. Show navigation dropdown on mobile devices by click
    5. Contact Form Falidation
    6. ScrollTo
    7. Sticky Header
    8. How it works popup
    9. Custom select
    10. Quiz
    11. Slider Howsoon

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
    let headroom  = new Headroom(header);
    headroom.init();
    let body = document.querySelector('body');
    let bodyHeight = body.clientHeight;
    let windowHeight = window.outerHeight;
    let progressbar = header.querySelector('.js-progressbar');
    document.onscroll = (e) =>{
        let y = window.scrollY;
        progressbar.style.width = (y+windowHeight)/bodyHeight * 100 + '%';
    }
}

// 8. How it works popup
let howitworksPopup = document.querySelector('.howitworks-popup');
if (howitworksPopup){
    let popupOpener = document.querySelector('.popup-opener');
    let fader = document.createElement('span');
    let body = document.querySelector('body');
    let close = howitworksPopup.querySelector('.close');
    let popupLeft = window.outerWidth/2 - howitworksPopup.clientWidth/2 + 'px';
    let popupTop = window.outerHeight/2 - howitworksPopup.clientHeight/2 + 'px';

    howitworksPopup.style.left = popupLeft;
    howitworksPopup.style.top = popupTop;

    fader.setAttribute('id', 'fader');
    popupOpener.onclick = (e) => {
        e.preventDefault();
        body.appendChild(fader);
        howitworksPopup.classList.add('js-visible');
        popupLeft = window.outerWidth/2 - howitworksPopup.clientWidth/2 + 'px';
        popupTop = window.outerHeight/2 - howitworksPopup.clientHeight/2 + 'px';
        howitworksPopup.style.left = popupLeft;
        howitworksPopup.style.top = popupTop;
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

// 9. Custom Select
customSelect('.custom-select');

// 10. Quiz
let quiz = document.querySelector('.quiz-holder');
if (quiz){
    let width = quiz.clientWidth,
        steps = quiz.querySelectorAll('.quiz-step'),
        quizContainer = quiz.querySelector('.quiz-inner'),
        progressBar = document.querySelector('.quiz-progressbar'),
        activeStep = quiz.querySelector('.quiz-step.js-active'),
        dataAttr = activeStep.getAttribute('data-attr');

    let nextEl,
        prevEl,
        btn,
        back;
    

    steps.forEach((el) => {
        el.style.width = width + 'px';
        btn = el.querySelector('.btn');
        if (btn){
            btn.onclick = (e) => {
                goNext(e);
            };
        }
        back = el.querySelector('.back');
        if (back){
            back.onclick = (e) => {
                goBack(e);
            };
        }

        let boxHolder = el.querySelector('.boxes-holder');
        let boxes = el.querySelectorAll('.box');
        
        if (boxes.length > 0){
            boxes.forEach((box, index) => {
                box.onclick = () => {
                    let boxActive = boxHolder.querySelector('.js-active');
                    if (boxActive){
                        boxActive.classList.remove('js-active');
                    }
                    box.classList.add('js-active');

                    let btnDisabled = el.querySelector('.quiz-btns .disabled');
                    if (btnDisabled){
                        btnDisabled.classList.remove('disabled');
                    }
                };
            });
        }
    });

    window.onresize = () => {
        width = quiz.clientWidth;
        steps.forEach((el) => {
            el.style.width = width + 'px';
        });
        quizContainer.style.marginLeft = -width * dataAttr + 'px';
    };

    function goNext (e){
        e.preventDefault();
        activeStep = quiz.querySelector('.quiz-step.js-active');
        activeStep.classList.remove('js-active');
        activeStep.classList.add('js-completed');
        nextEl = activeStep.nextElementSibling;
        nextEl.classList.add('js-active');
        dataAttr = activeStep.getAttribute('data-attr');
        quizContainer.style.marginLeft = -width * dataAttr + 'px';
        progressBar.setAttribute('data-attr', dataAttr*1+1);
    }
    function goBack (e){
        e.preventDefault();
        activeStep = quiz.querySelector('.quiz-step.js-active');
        activeStep.classList.remove('js-active');
        prevEl = activeStep.previousElementSibling;
        prevEl.classList.remove('js-completed');
        prevEl.classList.add('js-active');
        dataAttr = prevEl.getAttribute('data-attr')*1-1;
        quizContainer.style.marginLeft = -width * dataAttr + 'px';
        progressBar.setAttribute('data-attr', dataAttr+1);
    }
}

// 11. Slider Howsoon
let sliderHowsoon = document.getElementById('slider-howsoon');
if (sliderHowsoon){
    // noUiSlider.create(sliderHowsoon, {
    //     range: {
    //         'min': 5,
    //         '35%': 35,
    //         '65%': 65,
    //         'max': 95
    //     },
    //     start: [5],
    //     snap: true,
    //     pips: { 
    //         mode: 'positions',
	// 	    values: [5,35,65,95],
    //         density: 25
    //     }
    // });

    // let pips = pipsSlider.querySelectorAll('.noUi-value');

    // function clickOnPip ( ) {
    //     var value = Number(this.getAttribute('data-value'));
    //     pipsSlider.noUiSlider.set(value);
    // }

    // for ( var i = 0; i < pips.length; i++ ) {
    //     // For this example. Do this in CSS!
    //     pips[i].style.cursor = 'pointer';
    //     pips[i].addEventListener('click', clickOnPip);
    // }
}