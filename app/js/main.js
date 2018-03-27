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
      dataAttr = activeStep.getAttribute('data-attr'),
      rangerInputs = quiz.querySelectorAll('.js-ranger-input');

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

  createSlider();

  function updateSliderContent(dataattr){
    activeStep = quiz.querySelector('.quiz-step.js-active');

    let activeH = activeStep.querySelector('.slider-content .js-active');
    if (activeH){
      activeH.classList.remove('js-active');
      let nextActiveH = activeStep.querySelector('.holder[data-attr="'+dataattr+'"');
      nextActiveH.classList.add('js-active');
    }
  }

  window.onresize = () => {
      width = quiz.clientWidth;
      steps.forEach((el) => {
          el.style.width = width + 'px';
      });
  };

  function goNext (e){
      e.preventDefault();
      activeStep = quiz.querySelector('.quiz-step.js-active');
      activeStep.classList.remove('js-active');
      activeStep.classList.add('js-completed');
      nextEl = activeStep.nextElementSibling;
      nextEl.classList.add('js-active');
      dataAttr = activeStep.getAttribute('data-attr');
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
      progressBar.setAttribute('data-attr', dataAttr+1);
  }

  function getNumber(node, value) {
    return parseInt(node.getAttribute(value), 10);
  }

  // -- Prevent text selection while dragging
  function pauseEvent(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    }

    if (e.preventDefault) {
      e.preventDefault();
    }

    e.cancelBubble = true;
    e.returnValue = false;
    return false;
  }

  let now = function now() {
    return new Date().getTime();
  };

  function debounce(func, wait, immediate) {
    let timeout = undefined,
        args = undefined,
        context = undefined,
        timestamp = undefined,
        result = undefined;
    if (null == wait) wait = 100;

    function later() {
      let last = now() - timestamp;

      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function debounced() {
      context = this;
      args = arguments;
      timestamp = now();
      let callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  }

  function setInitialPosition(min, max, initValue) {
    let initial = isNaN(initValue) ? 0 : initValue;
    let range = max - min;
    let percent = Math.round((initial - min) * 100 / range);
    return percent;
  }

  function handlePosition(offset, width) {
    let min = 0;
    let max = 100;
    let ratio = Math.min(Math.max(offset / width, min), 1);
    let range = max - min;
    let percent = Math.round(ratio * range + min);
    return percent;
  }

  function handlePositionSteps(offset, width, min, max, stepWidth) {
    let ratio = Math.min(Math.max(offset / width, 0), 1);
    let range = max - min;
    let currentStep = Math.round(ratio * range / stepWidth);
    let percent = currentStep * stepWidth / range * 100;
    return percent;
  }

  function eventHandler(obj, fn, event, flag, update) {
    if (flag === undefined) flag = true;

    fn(event);
    obj.isMoving = flag;
    obj.animationFrame = window.requestAnimationFrame(update);
    obj.offset = event.pageX - obj.dimensions.left;
  }

  function handleValue(min, max, percentage) {
    let maxRange = max - min;
    return Math.round(percentage * maxRange / 100 + min);
  }

  function setValueInDom(el, value) {
    el.textContent = value;
  }

  function setAttributeInDom(el, attr, value) {
    return el.setAttribute(attr, value);
  }

  function createSlider() {
    let sliderNodeList = document.getElementsByClassName('js-ranger');
    let sliderInputNodeList = document.getElementsByClassName('js-ranger-input');
    let sliderTrackNodeList = document.getElementsByClassName('js-ranger-track');

    // -- Prevent the script to be excecuted if the required DOM
    // -- Implementation is wrong
    if (sliderNodeList.length <= 0 || sliderInputNodeList.length < sliderNodeList.length || sliderTrackNodeList.length < sliderNodeList.length) {
      return;
    }

    let sliderList = Array.prototype.slice.call(sliderNodeList);
    let setDebouncedValue = debounce(setValueInDom, 10);
    let setDebouncedAttr = debounce(setAttributeInDom, 40);

    sliderList.forEach(function (slider, i, array) {
      let inputEl = slider.querySelector('.js-ranger-input');
      let trackEl = slider.querySelector('.js-ranger-track');
      let distanceEl = slider.querySelector('.js-ranger-distance');
      let valueEl = slider.querySelector('.js-ranger-value');
      let indicatorEL = slider.querySelector('.js-ranger-indicator');

      let ranger = {
        isMoving: false,
        min: getNumber(inputEl, 'data-min'),
        max: getNumber(inputEl, 'data-max'),
        value: getNumber(inputEl, 'value'),
        steps: getNumber(inputEl, 'data-step'),
        offset: 0,
        curretValue: 0,
        dimensions: trackEl.getBoundingClientRect()
      };

      let init = function init() {
        let initialPosition = setInitialPosition(ranger.min, ranger.max, ranger.value) + '%';

        distanceEl.style.width = initialPosition;

        if (indicatorEL !== null) {
          setValueInDom(valueEl, ranger.value);
          indicatorEL.style.left = initialPosition;
        }

        // -- Set the steps fractions in DOM only if required
        if (!isNaN(ranger.steps)) {
          let sliderFractionsEl = document.createElement('div');
          let fractionCount = (ranger.max - ranger.min) / ranger.steps;
          let fractionDistance = 100 / fractionCount;
          let _i = undefined;

          sliderFractionsEl.classList.add('Slider-steps');
          slider.appendChild(sliderFractionsEl);

          for (_i = fractionCount - 1; _i >= 1; _i--) {
            let fraction = document.createElement('span');
            fraction.classList.add('Slider-fraction');

            fraction.style.left = fractionDistance * _i + '%';
            sliderFractionsEl.appendChild(fraction);
          }
        }

        window.addEventListener('resize', function () {
          ranger.dimensions = trackEl.getBoundingClientRect();
        });
      };

      init();

      let onMouseDown = function onMouseDown(e) {
        eventHandler(ranger, pauseEvent, e, true, update);

        if (!isNaN(ranger.steps)) {
          ranger.currentPosition = handlePositionSteps(ranger.offset, ranger.dimensions.width, ranger.min, ranger.max, ranger.steps);
        } else {
          ranger.currentPosition = handlePosition(ranger.offset, ranger.dimensions.width);
        }

        ranger.currentValue = handleValue(ranger.min, ranger.max, ranger.currentPosition);
      };

      let onMouseMove = function onMouseMove(e) {
        if (ranger.isMoving) {
          eventHandler(ranger, pauseEvent, e, true, update);

          if (!isNaN(ranger.steps)) {
            ranger.currentPosition = handlePositionSteps(ranger.offset, ranger.dimensions.width, ranger.min, ranger.max, ranger.steps);
          } else {
            ranger.currentPosition = handlePosition(ranger.offset, ranger.dimensions.width);
          }

          ranger.currentValue = handleValue(ranger.min, ranger.max, ranger.currentPosition);
        }
      };

      let onMouseUp = function onMouseUp(e) {
        if (ranger.isMoving) {
          window.cancelAnimationFrame(ranger.animationFrame);
          ranger.isMoving = false;
          update(null, false);
        }

        if (ranger.currentValue){
          updateSliderContent(ranger.currentValue);
        }
      };

      // let onTouchstart = function onTouchstart(e) {
      //   eventHandler(ranger, pauseEvent, e, true, updateMobile);

      //   if (!isNaN(ranger.steps)) {
      //     ranger.currentPosition = handlePositionSteps(ranger.offset, ranger.dimensions.width, ranger.min, ranger.max, ranger.steps);
      //   } else {
      //     ranger.currentPosition = handlePosition(ranger.offset, ranger.dimensions.width);
      //   }

      //   ranger.currentValue = handleValue(ranger.min, ranger.max, ranger.currentPosition);
      // };

      // let onTouchmove = function onTouchmove(e) {
      //   if (ranger.isMoving) {
      //     eventHandler(ranger, pauseEvent, e, true, updateMobile);

      //     if (!isNaN(ranger.steps)) {
      //       ranger.currentPosition = handlePositionSteps(ranger.offset, ranger.dimensions.width, ranger.min, ranger.max, ranger.steps);
      //     } else {
      //       ranger.currentPosition = handlePosition(ranger.offset, ranger.dimensions.width);
      //     }

      //     ranger.currentValue = handleValue(ranger.min, ranger.max, ranger.currentPosition);
      //   }
      // };

      let onTouchend = function onTouchend(e) {
        if (ranger.isMoving) {
          window.cancelAnimationFrame(ranger.animationFrame);
          ranger.isMoving = false;
          updateMobile();
        }

        if (ranger.currentValue){
          updateSliderContent(ranger.currentValue);
        }
      };

      // -- Write only function responsible for the updates of the
      // -- slider components
      let update = function update(timeStamp) {
        let loop = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

        if (loop) {
          ranger.animationFrame = window.requestAnimationFrame(update);
        }

        slider.classList.toggle('is-moving', ranger.isMoving);
        distanceEl.style.width = ranger.currentPosition + '%';
        setDebouncedAttr(inputEl, 'value', ranger.currentValue);

        if (indicatorEL !== null) {
          setDebouncedValue(valueEl, ranger.currentValue);
          indicatorEL.style.left = ranger.currentPosition + '%';
        }
      };

      let updateMobile = function updateMobile() {
        slider.classList.toggle('is-moving', ranger.isMoving);
        distanceEl.style.width = ranger.currentPosition + '%';
        setDebouncedAttr(inputEl, 'value', ranger.currentValue);
        alert(ranger.currentPosition);

        if (indicatorEL !== null) {
          setDebouncedValue(valueEl, ranger.currentValue);
          indicatorEL.style.left = ranger.currentPosition + '%';
        }
      };

      slider.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mousemove', debounce(onMouseMove, 10));
      window.addEventListener('mouseup', onMouseUp);

      if ('ontouchstart' in window) {
        slider.addEventListener('touchend', onTouchend);
      }
    });
  }

  // Quiz question on mobiles
  if (window.innerWidth < 501) {
    let questions = quiz.querySelectorAll('.question');
    if (questions.length > 0){
      questions.forEach((question) => {
        question.onclick = (e) => {
          question.classList.toggle('js-visible')
        }
      });
    }
  }
}