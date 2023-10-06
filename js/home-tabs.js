document.querySelectorAll('.tab__selector')
    .forEach(selector => {
        selector.addEventListener('click',()=> {
            const selectorValue = selector.id;

            let newActiveTab;

            switch(selectorValue) {
                case 'tab__selector--1':
                    newActiveTab = 'tabs__card--1';
                    break;
                case 'tab__selector--2':
                    newActiveTab = 'tabs__card--2';
                    break; 
                case 'tab__selector--3':
                    newActiveTab = 'tabs__card--3';
                    break;
                case 'tab__selector--4':
                    newActiveTab = 'tabs__card--4';
                    break;
            }
            changeActiveTab(newActiveTab);
        })
    })

function changeActiveTab(newTab) {
    document.querySelectorAll('.tabs__card')
        .forEach(tab => {
            if(tab.classList.contains(newTab)) {
                tab.classList.add('active');
                tab.classList.remove('inactive');
            } else {
                tab.classList.remove('active');
                tab.classList.add('inactive');
            }
        })
}