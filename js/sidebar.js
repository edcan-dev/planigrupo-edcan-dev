document.querySelector('.header__bars').onclick = function(ev) {

  if(document.querySelector('#sidebar-container')
  .style.marginLeft != '0px') {
    document.querySelector('#sidebar-container').style.marginLeft = '0';
    document.querySelector('#sidebar-container').style.zIndex = '3'
  } else {

    document.querySelector('#sidebar-container').style.marginLeft = '-50vw';
    document.querySelector('#sidebar-container').style.zIndex = '-1';
    document.querySelector('.navbar__responsive__list--second').style.left = '10%'
  }
}                                                                                                           


let activeTab = ''

document.querySelector('#nav__item--nosotros').
onclick = function(ev) {


  if(activeTab == 'nosotros') {
    activeTab = '';
    ev.target.style.backgroundColor = '#FFF';
    document.querySelector('.navbar__responsive__list--second').style.left = '10%'
  } else { 
    activeTab = 'nosotros';
    ev.target.style.backgroundColor = '#D5D9DB';
    document.querySelector('.navbar__responsive__list--second').style.left = '50vw'
  }
}