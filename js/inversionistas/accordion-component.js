var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    
    this.classList.add('active');
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
    document.querySelector('.inver_select_list__content').classList.toggle('active')
  }))
