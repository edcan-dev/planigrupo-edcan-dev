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
