class TabsComponent {

    constructor(
        tabSelectorClass
    ) {
        this.tabSelectorClass = tabSelectorClass;
    }

    initialize() {

        document.querySelectorAll(this.tabSelectorClass)
        .forEach((tabSelector, index, list) => {    
            tabSelector.addEventListener('click',(ev) => {

                list.forEach(s => {
                    s.classList.remove('selected')
                    if(s.id === ev.target.id) s.classList.add('selected')
                })



                switch(ev.target.id) {

                    case 'tab_selector--info-finan--1':
                        document.querySelectorAll('.tab_content')
                        .forEach(tabContent => {
                            tabContent.classList.add('invisible');
                            if(tabContent.id.includes('1'))
                            {
                                tabContent.classList.remove('invisible');
                            }
                        });
                        break;
                    
                        case 'tab_selector--info-finan--2':
                        document.querySelectorAll('.tab_content')
                        .forEach(tabContent => {
                            tabContent.classList.add('invisible');
                            if(tabContent.id.includes('2'))
                            {
                                tabContent.classList.remove('invisible');
                            }
                        });
                        break;
                        case 'tab_selector--info-finan--3':
                        document.querySelectorAll('.tab_content')
                        .forEach(tabContent => {
                            tabContent.classList.add('invisible');
                            if(tabContent.id.includes('3'))
                            {
                                tabContent.classList.remove('invisible');
                            }
                        });
                        break;
                        case 'tab_selector--info-finan--4':
                        document.querySelectorAll('.tab_content')
                        .forEach(tabContent => {
                            tabContent.classList.add('invisible');
                            if(tabContent.id.includes('4'))
                            {
                                tabContent.classList.remove('invisible');
                            }
                        });
                        break;
                        case 'tab_selector--info-finan--5':
                        document.querySelectorAll('.tab_content')
                        .forEach(tabContent => {
                            tabContent.classList.add('invisible');
                            if(tabContent.id.includes('5'))
                            {
                                tabContent.classList.remove('invisible');
                            }
                        });
                        break;
                        case 'tab_selector--info-finan--6':
                        document.querySelectorAll('.tab_content')
                        .forEach(tabContent => {
                            tabContent.classList.add('invisible');
                            if(tabContent.id.includes('6'))
                            {
                                tabContent.classList.remove('invisible');
                            }
                        });
                        break;
                        case 'tab_selector--info-finan--7':
                        document.querySelectorAll('.tab_content')
                        .forEach(tabContent => {
                            tabContent.classList.add('invisible');
                            if(tabContent.id.includes('7'))
                            {
                                tabContent.classList.remove('invisible');
                            }
                        });
                        break;
                }
        
            })
        });

    }
}

const tabsComponent = new TabsComponent('.tab_selector--info-finan');
tabsComponent.initialize();


const tabsComponent2 = new TabsComponent('.tab_selector--i');
tabsComponent.initialize();