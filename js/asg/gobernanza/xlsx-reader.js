const xslxPath = "https://edcan-dev.github.io/planigrupo-edcan-dev/data/asg/asg_actividades.xlsx";

const response = await fetch(xslxPath);
const xlsx = await response.blob();

class ActivityDetail {
  id;  
  title;
  imgUrl;
  description;
  category;
  dateString;
}

const gobernanzaActivities = [];
const searchedCategory = 'Gobernanza';

await readXlsxFile(xlsx, { sheet: 1 }).then(function (rows) {

  for (let i = 0; i < rows.length; i++) {
    const element = rows[i];
//    console.log(element);
    if(element[0] == searchedCategory) {
      gobernanzaActivities.push(element)
    }
  }
});

if(gobernanzaActivities.length == 0) {
  console.warn(`[NOT FOUND ACTIVITIES FOR ${ searchedCategory } CATEGORY]`);
 
  document.querySelector('.actividades').innerHTML =
  `
    <div class="actividades__notFound">
      <span>NO HAY ACTIVIDADES PARA LA CATEGORÍA ${ searchedCategory }</span>
    </div>
  `
}