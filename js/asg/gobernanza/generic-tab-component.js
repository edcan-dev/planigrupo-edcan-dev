class GenericTabsComponent {
  constructor(tabsSelector, tabsContentSelector) {
    this.tabsSelector = tabsSelector;
    this.tabsContentSelector = tabsContentSelector;
  }

  initialize() {
    document.querySelectorAll(this.tabsSelector).forEach((selector, i, list) =>
      selector.addEventListener("click", (ev) => {
        list.forEach((s) => {
          s.classList.remove("selected");
          if (s.id === ev.target.id) s.classList.add("selected");
        });

        const tabContents = document.querySelectorAll(this.tabsContentSelector);

        const idCharArray = ev.target.id.split("");
        const idNumber = idCharArray.pop();

        tabContents.forEach((contents) => {
          contents.classList.add("inactive");
          if (contents.id.includes(idNumber))
            contents.classList.remove("inactive");
        });
      })
    );
  }
 
  initializeWithPreviousAndNext() {
    this.initialize();
  
  }
  

}


class GobernanzaTabComponent extends GenericTabsComponent {
  

}

const goberTabs = new GenericTabsComponent('.gober_asg_selector','.gober_asg_content').initialize();

const goberSubtabs = new GenericTabsComponent(
  '.gober_asg_content--second__tabs__selector__item',
  '.gober_asg_content--second__tabs__content'
).initialize();

const susSection2Subtabs = new GenericTabsComponent(
  '.susAsg_contSecond_topics__tabs__selectors',
  '.susAsg_contSecond_topics__tabs__contents').initialize();



const susSection3Subtabs = new GenericTabsComponent(
  '.thirdSection__slider__selector',
  '.thirdSection__slider__content'
).initializeWithPreviousAndNext();