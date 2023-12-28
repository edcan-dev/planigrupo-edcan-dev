document.querySelectorAll('.main__comer__right__tab_selector > ul > div')
    .forEach(selector => {
        selector.addEventListener('click',(ev)=> {

            document.querySelectorAll('.main__comer__right__tab_selector > ul > div').forEach(tabs => tabs.classList.remove('selected__tab'));
            selector.classList.add('selected__tab');

            const selectorValue = selector.id;


            console.log(selectorValue);

            let newActiveTab;


            switch(selectorValue) {
                case 'tab__selector--1':
                    newActiveTab = 'main__comer__right__tab_content--1';
                    break;
                case 'tab__selector--2':
                    newActiveTab = 'main__comer__right__tab_content--2';
                    break; 
                case 'tab__selector--3':
                    newActiveTab = 'main__comer__right__tab_content--3';
                    break;
                case 'tab__selector--4':
                    newActiveTab = 'main__comer__right__tab_content--4';
                    break;
                case 'tab__selector--5':
                    newActiveTab = 'main__comer__right__tab_content--5';
                    break;
            }
            changeActiveTab(newActiveTab);
        })
    })

function changeActiveTab(newTab) {
    document.querySelectorAll('.main__comer__right__tab_content')
        .forEach(tab => {
            console.log(tab);
            if(tab.classList.contains(newTab)) {
                tab.classList.add('active');
                tab.classList.remove('inactive');
            } else {
                tab.classList.remove('active');
                tab.classList.add('inactive');
            }
        })
}