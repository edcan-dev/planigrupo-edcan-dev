class GenericTabsComponent {


    constructor(tabsSelector, tabsContentSelector) {
        this.tabsSelector = tabsSelector;
        this.tabsContentSelector = tabsContentSelector;
    }

    initialize() {
        document.querySelectorAll(this.tabsSelector)
            .forEach((selector, i, list) => selector.addEventListener('click',
                (ev) => {

                    list.forEach(s => {
                        s.classList.remove('selected');
                        if (s.id === ev.target.id) s.classList.add('selected')
                    })

                    const tabContents = document.querySelectorAll(this.tabsContentSelector);

                    const idCharArray = ev.target.id.split('');
                    const idNumber = idCharArray.pop();

                    tabContents.forEach(contents => {
                        contents.classList.add('inactive');
                        if (contents.id.includes(idNumber)) contents.classList.remove('inactive');
                    })
                }));

    }

}

const genericTabsComponent = new GenericTabsComponent('.gobierno-tab__selector', '.gobierno-tab__content').initialize();

const informacionTabsComponent = new GenericTabsComponent('.tab_selector--info-finan', '.tab_content').initialize()

const coberturaTabs = new GenericTabsComponent('.tab__selector--cobertura','.tab__content--cobertura').initialize();

const responsiveSection1TabsComponent = new GenericTabsComponent('.inver_tabs--selector','.inver_tabs_content').initialize();

const responseGlobalTabs = new GenericTabsComponent('.resp-tab-selector','.resp-tab-content').initialize();

const responsiveSection2TabsComponent = new GenericTabsComponent('.second_section_tab--selector','.second_section_tab--content').initialize();

const gobiernoRespTabsComponent = new GenericTabsComponent('.gobierno__tab__selector','.gobierno__tab__content').initialize();

const inversionistasSubtabs = new GenericTabsComponent('.subtab__tab','.inversionistas__tabs__tab--subtab__content__card').initialize();

const informacionAnchorTabs = new GenericTabsComponent('.main_tab__selector','.inversionistas__tabs__tab--content').initialize();

// Sincronizar selectores principales y subtabs
const mainSelectors = document.querySelectorAll('.tab-selector'); 
document.querySelectorAll('.main_tab__selector')
    .forEach(selector => {
        selector.addEventListener('click', (ev)=> {
            const idCharArray = ev.target.id.split('');
            const idNumber = idCharArray.pop();

            const mainSelector = new Array(...mainSelectors).
            find(ms => 
                {
                    ms.classList.remove('tab-selector--selected')
                    return ms.id.includes(idNumber)
                });
            mainSelector.classList.add('tab-selector--selected')
        })
    })

const comunicadosTabs = new GenericTabsComponent(
    '.tab_decade__selector__item',
    '.tab_decade__grid__row'
).initialize();