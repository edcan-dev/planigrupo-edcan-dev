document.querySelectorAll('.tab__selector')
    .forEach(selector => {
        selector.addEventListener('click',(ev)=> {

            document.querySelectorAll('.tab__selector').forEach(tabs => tabs.classList.remove('selected__tab'));
            selector.classList.add('selected__tab');

            const selectorValue = selector.id;

            let newActiveTab;


            switch(selectorValue) {
                case 'tab__selector--1':
                    newActiveTab = 'tabs___card--1';
                    break;
                case 'tab__selector--2':
                    newActiveTab = 'tabs___card--2';
                    break; 
                case 'tab__selector--3':
                    newActiveTab = 'tabs___card--3';
                    break;
                case 'tab__selector--4':
                    newActiveTab = 'tabs___card--4';
                    break;
                case 'tab__selector--5':
                    newActiveTab = 'tabs___card--5';
                    break;
            }
            changeActiveTab(newActiveTab);
        })
    })

function changeActiveTab(newTab) {
    document.querySelectorAll('.tabs___card')
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