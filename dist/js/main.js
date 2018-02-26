'use strict';

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
