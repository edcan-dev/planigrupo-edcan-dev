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
}


const asgHomeTabs = new GenericTabsComponent(
  ".asg_tab_selector",
  ".asg_tab_content"
).initialize();

// Change ASG Home Image
document.querySelectorAll(".asg_tab_selector").forEach((selector) => {
  selector.addEventListener("click", () => {

    let url = (() => {
      switch (selector.id) {
        case "asg_tab_selector--1":
          return "https://planigrupo.blob.core.windows.net/planigrupo/assets/images/asg/asg_que_estamos.PNG";
        case "asg_tab_selector--2":
          return "https://planigrupo.blob.core.windows.net/planigrupo/assets/images/asg/asg_para_que.PNG";
        case "asg_tab_selector--3":
          return "https://planigrupo.blob.core.windows.net/planigrupo/assets/images/asg/asg_quienes.PNG";
        case "asg_tab_selector--4":
          return "https://planigrupo.blob.core.windows.net/planigrupo/assets/images/asg/asg_materialidad.PNG";
        default:
          re;
      }
    })();

    document.getElementById("tabs__img").style.backgroundImage =
      "url('" + url + "')";
  });
});
