document.querySelectorAll('.historia__timeline__selector')
    .forEach((selector, index, list) => {
        selector
            .addEventListener('click',() => {

                list.forEach(sel => {

                    sel.classList.remove('historia__timeline__selector--selected');

                    if(sel.classList.contains(selector.classList[1])) {
                        sel.classList.add('historia__timeline__selector--selected')
                        setActiveTab(selector.classList[1])
                    }
                })
                    
                    

            })
    })

function setActiveTab(selected) {
    document.querySelectorAll('.historia__card')
        .forEach(tab => {

        tab.classList.add('inactive');

        console.log(selected);

            switch(selected) {

                case 'historia__timeline__selector--1':
                    activateTab('.historia__card--tab1')
                break;
                case 'historia__timeline__selector--2':
                    activateTab('.historia__card--tab2')
                break;
                case 'historia__timeline__selector--3':
                    activateTab('.historia__card--tab3')
                break;

                case 'historia__timeline__selector--4':
                    activateTab('.historia__card--tab4')
                break;

                case 'historia__timeline__selector--5':
                    activateTab('.historia__card--tab5')
                break;

                case 'historia__timeline__selector--6':
                    activateTab('.historia__card--tab6')
                break;
            }

        })
}

function activateTab(tab) {
    console.log(tab);
    document.querySelector(tab).classList.add('active')
    document.querySelector(tab).classList.remove('inactive')
}   