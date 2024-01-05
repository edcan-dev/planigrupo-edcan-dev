import { activitiesReaderService } from "../services/XSLXActivitiesReaderService.js";


if(window.location.href.includes('asg-ambiental'))
renderAmbientalFeaturedActivities();

async function renderAmbientalFeaturedActivities() {

  let featuredActivities = []

  const socialURLPrefix = 'https://planigrupo.blob.core.windows.net/planigrupo/assets/images/asg/ambiental/';

  const selector = '.featuredProperties_grid_item';
  const elementsList = document.querySelectorAll(selector);

  await activitiesReaderService.getAmbientalFeaturedActivities().then(result => {
    featuredActivities = result;
  })

  featuredActivities.forEach((activity, index) => {

    const element = elementsList.item(index);
    
    element.firstElementChild.style.backgroundImage = `url(${ socialURLPrefix + activity.image })`;

    element.lastElementChild.firstElementChild.innerHTML = activity.description;

  })

  



}