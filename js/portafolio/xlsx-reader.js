//const xslxPath = './../../data/portafolio/plazas.xlsx';
const xslxPath = 'https://edcan-dev.github.io/planigrupo-edcan-dev/data/portafolio/plazas.xlsx';

const response = await fetch(xslxPath);

const xlsx = await response.blob();
let results;

const HERO_IMG_FOLDER = 'https://planigrupo.blob.core.windows.net/planigrupo/assets/images/portafolio/property_hero/';

class PropertyDetail {

  id;
  name;
  location;
  phoneNumber;
  webSite;
  logoImageUrl;
  heroImageUrl;

  address;

  startDate;
  rentableArea;
  portfolioPercentage

  description;
    /**string[]*/
  tenants;

  directoryImageUrl;

  totalSurface; // empty
  usedRate;
  comercialArea;

  /**Si | No*/
  playground;
  type;

  storesNumber;

  /**Si | No*/
  parking;

  /**string[]*/
  anchors;
  /**string[]*/
  importantTenants;
  /**string[]*/
  subAnchors;

  cinema;

  iFrameSrc;


  constructor(
  ) {

  }

}

let propertiesArray = [];

await readXlsxFile(xlsx, { sheet: 1 }).then(function(rows) {

  rows.shift();

  propertiesArray = rows.map(async (row) => {
    const detail = new PropertyDetail();
    detail.id = row[0];
    detail.name = row[1];
    detail.location = `${row[3]}, ${row[2]}`;
    detail.address = row[4 ]
    detail.startDate = row[7];
    detail.rentableArea = row[8];
    detail.portfolioPercentage = row[10];
     
    detail.totalSurface = 'VACIO';
    detail.usedRate = row[11];
    detail.comercialArea = row[8];
    detail.playground = row[14];
    detail.type = row[15];
    detail.parking = row[13];

    detail.phoneNumber = row[16];
    detail.webSite = row[19];

    detail.iFrameSrc = row[5];
    detail.logoImageUrl = `https://planigrupo.blob.core.windows.net/planigrupo/assets/images/portafolio/property_logo/${ row[20] }`;
    detail.directoryImageUrl = `https://planigrupo.blob.core.windows.net/planigrupo/assets/images/portafolio/property_directory/${ row[21] }`;
    detail.heroImageUrl = HERO_IMG_FOLDER + row[22];


    await readXlsxFile(xlsx, { sheet: 2 }).then(function(secondPageRows) {
      const matchedRow = secondPageRows.find(row =>  row[0] === detail.id);
      detail.description = matchedRow[2];
      detail.storesNumber = matchedRow[3];
    })


    
    await readXlsxFile(xlsx, { sheet: 3 }).then(function(thirdPageRows) {

      let foundTenants = [];

      const startIndex = thirdPageRows.map(
        row =>  thirdPageRows.indexOf(
            thirdPageRows.find(row => row[0].includes(detail.id)))
      )[0]


      let tenantsFilled = false; 

      for (let index = 0; index < thirdPageRows.length; index++) {
        if(index <= startIndex || tenantsFilled) {
        } else {
          if(thirdPageRows[index][0].startsWith('P1')) {
            tenantsFilled = true;
          } else {
            foundTenants.push(thirdPageRows[index][1])
          }
        }
      }
      detail.tenants = foundTenants;
    })


    await readXlsxFile(xlsx, { sheet: 4 }).then(function(fourthPageRows) {

    })

    return detail;
  
  })


})

propertiesArray[1].then(prop => console.info('[READ XLSX]'))

export async function getPropertyDetailByKey( key ) {
  console.log('FETCHING ' + key);
  return propertiesArray;
  /* return propertiesArray.find(property => {


    const asu = property.then(data => {

      console.log(data.id);
      console.log(key);
      
      if(data.id == key) {
        matchedProperty = data;
        return data;
      }
    })

    asu.then( je => console.log(je)) */

/* 
    if(matchedProperty !== undefined) {
      return false;
    } else {
      return false;
    } */
}