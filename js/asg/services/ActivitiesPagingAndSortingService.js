import {
  renderGridByCategory,
  renderGridByYear,
  activities,
} from "./ActivitiesGridService.js";


const href = window.location.href;

if(href.includes('asg.html')) {
  homePagination();
} else
if(href.includes('asg-social.html')) {
  socialPagination();
}
if(href.includes('asg-ambiental.html') || href.includes('asg-sustentabilidad.html')) {
  ambientalPagination();
}


function homePagination() {
  
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
    pageCount: 5,
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
}

function socialPagination() {
  
  var ele = document.getElementById("pagingContainer");
  if (ele) {
    ele.style.visibility = "visible";
  }

  const socialActivities = activities.filter(act => act.category === 'Social');

  console.log(socialActivities.length);
  
  var pager = new ej.grids.Pager({
    pageSize: Math.floor(socialActivities.length / 6),
    pageCount: 5,
    totalRecordsCount: socialActivities.length,
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
}

function ambientalPagination() {
  
  var ele = document.getElementById("pagingContainer");
  if (ele) {
    ele.style.visibility = "visible";
  }

  const socialActivities = activities.filter(act => act.category === 'Ambiental');

  console.log(socialActivities.length);

  var pager = new ej.grids.Pager({
    pageSize: Math.floor(socialActivities.length / 6),
    pageCount: 5,
    totalRecordsCount: 24,
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
}