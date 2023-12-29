document.querySelectorAll('.tab_decade__grid__item__list__item')
.forEach(
  (item, index, list) => {

    item.addEventListener('click', (ev) => {

      let isSelected = item.classList.contains('selected') ? true : false;



    list.forEach(i => {
      i.classList.remove('selected');
      i.children.item(1).classList.add('inactive'); 
    })

    if(isSelected) {
      item.classList.remove('selected');
      item.children.item(1).classList.add('inactive');  
    
    } else { 
      item.classList.toggle('selected');
      item.children.item(1).classList.toggle('inactive');  
    }
      
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