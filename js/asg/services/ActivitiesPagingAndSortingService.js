import { renderGrid, renderGridByYear} from "./ActivitiesGridService.js";


document.getElementById("category_select")
  .addEventListener("change", (ev) => {

    const value = ev.target.value;
    renderGrid(value)


  });

document.getElementById("year_select")
  .addEventListener("change", (ev) => {
    const value = ev.target.value;
    renderGridByYear(value)

});

