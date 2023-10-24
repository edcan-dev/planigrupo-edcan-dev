import json from '../../data/inversionistas.vision.tab-contents.json' assert {type: 'json'};

class TabsComponent {
    constructor(
        data,
        selector
    ) {
        this.data = data;
        this.selector = selector;
    }

    configure() {
        document.querySelectorAll(this.selector).forEach(tab => tab.addEventListener('click', (ev)=> {


            const selectedTab = this.data.filter(content => ev.target.id.includes(content.tabId))[0]
            
            document.querySelectorAll('.tab-selector').forEach(tab => {
                tab.classList.remove('tab-selector--selected')
                if(tab.id.includes(selectedTab.tabId)) {
                    tab.classList.add('tab-selector--selected')
                }
            })

            document.querySelector('.vision_info_tabs__container__content__text').children.item(0).innerHTML = selectedTab.tabTitle
            document.querySelector('.vision_info_tabs__container__content__text').children.item(1).innerHTML = selectedTab.tabDescription

            document.querySelector('.vision_info_tabs__container__content__img').style.backgroundImage = "url('" + selectedTab.tabImageUrl  + "')";
        
        }))
    }
}


const tabsComp = new TabsComponent(json.contents,
    '.vision_info_tabs__container__selector > ul > .tab-selector')

tabsComp.configure();