import {
  renderGridByCategory,
  renderGridByYear,
  activities,
} from "./ActivitiesGridService.js";

document.getElementById("category_select").addEventListener("change", (ev) => {
  const value = ev.target.value;
  renderGridByCategory(value);
});

document.getElementById("year_select").addEventListener("change", (ev) => {
  const value = ev.target.value;
  renderGridByYear(value);
});

var ele = document.getElementById("container");
if (ele) {
  ele.style.visibility = "visible";
}

var pager = new ej.grids.Pager({
  pageSize: activities.length / 21,
  pageCount: 21,
  totalRecordsCount: activities.length,
  locale: 'es-MX'
});

pager.appendTo("#Pager");
pager.addEventListener("click", (ev) => {
  console.log(ev.currentPage);

  document
    .querySelectorAll(".grid_page")
    .forEach((page) => page.classList.add("inactive"));

  document
    .getElementById("grid_page--" + ev.currentPage)
    .classList.remove("inactive");

  // document.querySelector(`#grid_page--${ ev.currentPage }`).classList.remove('inactive');
});
