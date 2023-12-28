(function heroStartAnim() {

})()

document.querySelectorAll('.main__hero__text__p-gray')
    .forEach(bar => {
        bar.style.marginRight = '30vw';
        bar.style.marginLeft = '0px';
    })
    
document.querySelectorAll('.main__hero__text__p-blue')
    .forEach(bar => {
        bar.style.marginRight = '0vw';
        bar.style.marginLeft = '100px';
    })

// document.querySelector('.main__hero__text__p-exp').style.opacity = '1';

setTimeout(() => document.querySelectorAll('.main__hero__text__p-bar').forEach(bar => bar.classList.add('restored--bar')), 1000)