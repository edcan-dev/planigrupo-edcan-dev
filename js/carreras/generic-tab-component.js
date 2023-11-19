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

const tabs = new GenericTabsComponent('.tab-selector','.tab-content').initialize();