var acc = document.getElementsByClassName("accordion");
var i;


for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function(ev) {

    //const element = ev.target;
    let element;

    if(ev.target.type == 'submit') {
      element = ev.target
    } else {
      element = ev.target.parentElement
    }
    


    if(! element.classList.contains('active')) {

      document.querySelectorAll('.accordion')
      .forEach( acc =>{
        var panel = acc.nextElementSibling;
        try {
          acc.classList.remove('active')
          panel.style.maxHeight = null

          
        } catch(e) {
          
        }
      });
    
    } else {
      console.log('is selected');

    }


    this.classList.toggle('active');
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}



// RESPONSIVE SEC01 CONTENTS

document.querySelector('.inver_select_list__selector')
  .addEventListener('click', (ev) => {
    ev.target.classList.toggle('selected');
    ev.target.nextElementSibling.classList.toggle('active');
  })

document.querySelectorAll('.resp-carousel-selector')
  .forEach(selector => selector.addEventListener('click',() => {
    
    const selectedValue = selector.innerHTML;

    document.querySelector('.inver_select_list__content').classList.toggle('active')
    document.querySelector('.inver_select_list__selector').classList.toggle('selected');;

    const accordion =
    document.querySelector('.inver_select_list__selector');

    const accArray = accordion.innerHTML.split('')

    let currentContentTitle = ''

    for (let index = 0; index < accArray.length; index++) {
      const element = accArray[index];
      if(element != '<') {
        currentContentTitle += element
      } else {
        break;
      }
    }

    let newAccordionContent = accordion.innerHTML.replace(currentContentTitle, selectedValue)

    accordion.innerHTML = newAccordionContent

  }))



  try {

    document.querySelectorAll('.accordion > p').forEach(p => p.addEventListener('click',(ev)=> ev.preventDefault()))
    document.querySelectorAll('.accordion > small').forEach(small => small.addEventListener('click',(ev)=> ev.preventDefault()))

  } catch(e) { }