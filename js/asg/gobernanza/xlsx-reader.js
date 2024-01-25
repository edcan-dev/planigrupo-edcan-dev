if (true) {
  const searchedCategory = "Gobernanza";
  console.warn(`[NOT FOUND ACTIVITIES FOR ${searchedCategory} CATEGORY]`);

  document.querySelector(".actividades").innerHTML = `
  <div class="actividades__notFound">
  <span>No hay actividades para la categoría ${searchedCategory}</span>
  </div>
  `;
}