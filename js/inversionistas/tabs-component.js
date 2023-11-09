const response = await fetch('https://edcan-dev.github.io/planigrupo-edcan-dev/data/inversionistas.vision.tab-contents.json')
const json = await response.json();

// class TabsComponent {
//     constructor(
//         data,
//         selector
//     ) {
//         this.data = data;
//         this.selector = selector;
//     }

//     configure() {
//         document.querySelectorAll(this.selector).forEach(tab => tab.addEventListener('click', (ev)=> {


//             const selectedTab = this.data.filter(content => ev.target.id.includes(content.tabId))[0]
            
//             document.querySelectorAll('.tab-selector').forEach(tab => {
//                 tab.classList.remove('tab-selector--selected')
//                 if(tab.id.includes(selectedTab.tabId)) {
//                     tab.classList.add('tab-selector--selected')
//                 }
//             })

//             document.querySelector('.vision_info_tabs__container__content__text').children.item(0).innerHTML = selectedTab.tabTitle
//             document.querySelector('.vision_info_tabs__container__content__text').children.item(1).innerHTML = selectedTab.tabDescription

//             document.querySelector('.vision_info_tabs__container__content__img').style.backgroundImage = "url('" + selectedTab.tabImageUrl  + "')";
        
//         }))
//     }
// }


// const tabsComp = new TabsComponent(json.contents,
//     'subtab__tab')

// tabsComp.configure();


class TabsComponent {

    constructor(
        tabSelectorClass,
        dataSource
    ) {
        this.dataSource = dataSource;
        this.tabSelectorClass = tabSelectorClass;
    }

    initialize() {

        document.querySelectorAll(this.tabSelectorClass)
        .forEach(tabSelector => {    
            tabSelector.addEventListener('click',(ev) => {

                document.querySelectorAll('.subtab__tab').forEach(e => 
                    {
                        e.classList.remove('selected')
                        ev.target.classList.add('selected')
                    })

                switch(ev.target.id) {
                    case 'subtab__tab--1':
                        document.querySelectorAll('.inversionistas__tabs__tab--subtab__content__card')
                        .forEach(tabContent => {
                            tabContent.classList.add('invisible');

                            if(tabContent.id.includes('1')) {
                                tabContent.classList.remove('invisible');
                            }

                        });
                        break
                    case 'subtab__tab--2':
                        document.querySelectorAll('.inversionistas__tabs__tab--subtab__content__card')
                        .forEach(tabContent => {
                            tabContent.classList.add('invisible');
                            
                            if(tabContent.id.includes('2'))
                            {
                                tabContent.classList.remove('invisible');
                            }

                        });
                        break
                    case 'subtab__tab--3':
                        document.querySelectorAll('.inversionistas__tabs__tab--subtab__content__card')
                        .forEach(tabContent => {
                            tabContent.classList.add('invisible');
                            if(tabContent.id.includes('3'))
                            {
                                tabContent.classList.remove('invisible');
                            }

                        });
                        break
                    case 'subtab__tab--4':
                        document.querySelectorAll('.inversionistas__tabs__tab--subtab__content__card')
                        .forEach(tabContent => {
                            tabContent.classList.add('invisible');
                            if(tabContent.id.includes('4'))
                            {
                                tabContent.classList.remove('invisible');
                            }

                        });
                        break
                }
        
            })
        });

    }
}


const tabsComponent = new TabsComponent('.subtab__tab', json.contents);
tabsComponent.initialize();



class TabsComponentDisplayNone {

    constructor(
        tabSelector
    ) {
        this.tabSelector = tabSelector
    }

    initialize() {
        document.querySelectorAll(this.tabSelector).forEach(selector => selector.addEventListener('click',(ev) =>{

            document.querySelectorAll('.tab-selector').forEach(e => {
                    e.classList.remove('tab-selector--selected')
                    ev.target.classList.add('tab-selector--selected')
            })

            document.querySelectorAll('.inversionistas__tabs__tab--content')
            .forEach(content => {
                content.classList.add('inactive');
            })

            switch(ev.target.id) {
                case 'tab-selector--1':
                    document.querySelector('.inversionistas__tabs__tab--content--1').classList.remove('inactive');
                break;
                case 'tab-selector--2':
                    document.querySelector('.inversionistas__tabs__tab--content--2').classList.remove('inactive');
                break;
                case 'tab-selector--3':
                    document.querySelector('.inversionistas__tabs__tab--content--3').classList.remove('inactive');                    
                break;
                case 'tab-selector--4':
                    document.querySelector('.inversionistas__tabs__tab--content--4').classList.remove('inactive');

                break;
                case 'tab-selector--5':
                    document.querySelector('.inversionistas__tabs__tab--content--5').classList.remove('inactive');                    
                break;
            }
            

        }))
    }


}

const tabsComponentDisplayNone = new TabsComponentDisplayNone('.tab-selector');

tabsComponentDisplayNone.initialize();