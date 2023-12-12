import {propertiesGrid } from './properties-grid.js';
const xslxPath = './../../data/portafolio/plazas.xlsx';
//const xslxPath = 'https://edcan-dev.github.io/planigrupo-edcan-dev/data/portafolio/plazas.xlsx';

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
    /**string[]*/
  tenantsName;

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

await readXlsxFile(xlsx, { sheet: 1 }).then(async function(rows) {

  rows.shift();

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];

    const detail = new PropertyDetail();
    detail.id = row[0];
    detail.name = row[1];
    detail.location = `${row[3]}, ${row[2]}`;
    detail.address = row[4 ]
    detail.startDate = row[7];
    detail.rentableArea = row[8];
    detail.portfolioPercentage = row[10];
     
    detail.totalSurface = row[23];
    detail.usedRate = row[11];
    detail.comercialArea = row[8];
    detail.playground = row[14];
    detail.type = row[15];
    detail.parking = row[13];

    detail.phoneNumber = row[16];
    detail.webSite = row[18];

    detail.iFrameSrc = row[5];
    detail.logoImageUrl = `https://planigrupo.blob.core.windows.net/planigrupo/assets/images/portafolio/property_logo/${ row[20] }`;
    detail.directoryImageUrl = `https://planigrupo.blob.core.windows.net/planigrupo/assets/images/portafolio/property_directory/${ row[21] }`;
    detail.heroImageUrl = HERO_IMG_FOLDER + row[22];

    detail.cinema = 'Sí';

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

      const tenantsIdentifier = detail.id + ' ' + detail.name;
      const foundAnchors = [];
      const foundSubAnchors = [];

      fourthPageRows.forEach(row => {
        if(tenantsIdentifier == row[1] && row[6] === 'ANCLA') {
          foundAnchors.push(row[7]);
        }
        if(tenantsIdentifier == row[1] && row[6] === 'SUBANCLA') {
          foundSubAnchors.push(row[7]);
        }
      });
      detail.anchors = foundAnchors;
      detail.subAnchors = foundSubAnchors;
    })

    propertiesArray.push(detail);

  }

  /* propertiesArray = await rows.map(async (row) => {
    const detail = new PropertyDetail();
    detail.id = row[0];
    detail.name = row[1];
    detail.location = `${row[3]}, ${row[2]}`;
    detail.address = row[4 ]
    detail.startDate = row[7];
    detail.rentableArea = row[8];
    detail.portfolioPercentage = row[10];
     
    detail.totalSurface = row[23];
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

    detail.cinema = 'Sí';

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

      const tenantsIdentifier = detail.id + ' ' + detail.name;
      const foundAnchors = [];

      fourthPageRows.forEach(row => {
        if(tenantsIdentifier == row[1] && row[6] === 'ANCLA') {
          foundAnchors.push(row[7]);
        }
      });
      detail.anchors = foundAnchors;
    })

    return detail;
  
  }) */


})


console.info('[READ XLSX]')
const screenElement = document.querySelector('.screen')
screenElement.classList.add('screen-hidden')
configureTenantCombo(propertiesArray)



export async function getPropertyDetailByKey( key ) {
  console.log('FETCHING ' + key);
  return propertiesArray;
}

async function configureTenantCombo(props) {
  document.querySelector('#tenant-selector')
    .addEventListener('change',async (ev)=> {

      const matchedIds =  [];
      const value = ev.target.value;


       await propertiesArray.forEach( async(promise) => {
        await promise.then(
          data => {
            if(data.tenants.includes(value)) {
              matchedIds.push(data);
            }
          }
        )
      })

      propertiesGrid.filterByTenant(matchedIds, value)

  })
}