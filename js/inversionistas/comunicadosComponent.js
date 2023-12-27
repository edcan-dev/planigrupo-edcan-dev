document.querySelectorAll('.tab_decade__grid__item__list__item')
.forEach(
  item => {
    item.addEventListener('click', (ev) => {
      item.classList.toggle('selected');
      item.children.item(1).classList.toggle('inactive');  
      
      const selector = item.children.item(0);
      const arrow = selector.children.item(1);

      if(item.classList.contains('selected')) {
        /*console.log(selector);*/
        arrow.classList.remove('fa-chevron-right');
        arrow.classList.add('fa-chevron-down');

      } else {
        arrow.classList.add('fa-chevron-right');
        arrow.classList.remove('fa-chevron-down');
      }


    })
  }
)