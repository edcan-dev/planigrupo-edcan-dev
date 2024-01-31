const xslxPath = '../../data/inversionistas_input.xlsx';
const language = document.head.querySelector("[property~=language][content]").content;

const response = await fetch(xslxPath);

const xlsx = await response.blob();

await readXlsxFile(xlsx, { sheet: 1 }).then(function(rows) {

  window.innerWidth < 1000 ? 
    populateInformacionFinancieraResponsiveTable(rows) :
    populateInformacionFinancieraTable(rows);
})


function populateInformacionFinancieraTable( rows ) {


  document.querySelectorAll('.tr--head__th').forEach((th, i) => {
    th.innerHTML = rows[0][i]
  })

  const bodyTr = document.querySelectorAll('.tr--body');


  for (let i = 0; i < rows.length; i++) {
    
    if(i === 0) continue;

    const row = rows[i];

    
    const children  = bodyTr[i - 1].children 

    for (let i = 0; i < children.length; i++) {
      const element = children[i];
      element.innerHTML = row[i]
    }

  }

  // rows.forEach((row, i) => {

  //   if(i === 0) return;
    
  //   const child  = bodyTr[i - 1].children 

  //   row.forEach((cell, i) => {

  //     child.item(i).innerHTML = cell
      
  //   });
  // });
}

function populateInformacionFinancieraResponsiveTable( rows ) {

  document.querySelectorAll('.tr--head__th--resp').forEach((th, i) => {
    th.innerHTML = rows[0][i]
  })

  const bodyRowsList = document.querySelectorAll('.tr--body--resp');

  rows.shift();

  bodyRowsList.forEach(
    (row, rowIndex) => {
      const cells = row.children

      for(let i = 0;  i < cells.length; i++) {
        cells.item(i).innerHTML = rows[rowIndex][i]
      }

    }
  )
  
}


if(language == 'english') {
  document.querySelector('#inversionistas__tabs__tab--content--2 > div.section--table > div > table > tbody > tr:nth-child(1) > td.tr--body__th.col-1st').innerHTML = 'Net Income';
  document.querySelector('#inversionistas__tabs__tab--content--2 > div.section--table > div > table > tbody > tr:nth-child(2) > td.tr--body__th.col-1st').innerHTML = 'Estimate for uncollectible accounts[4]';
  document.querySelector('#inversionistas__tabs__tab--content--2 > div.section--table > div > table > tbody > tr:nth-child(3) > td.tr--body__th.col-1st').innerHTML = 'Total Net Income';
  document.querySelector('#inversionistas__tabs__tab--content--2 > div.section--table > div > table > tbody > tr:nth-child(5) > td.tr--body__th.col-1st').innerHTML = 'NOI Margin[2]';
  document.querySelector('#inversionistas__tabs__tab--content--2 > div.section--table > div > table > tbody > tr:nth-child(7) > td.tr--body__th.col-1st').innerHTML = 'EBITDA Margin[2]';
  document.querySelector('#inversionistas__tabs__tab--content--2 > div.section--table > div > table > tbody > tr:nth-child(8) > td.tr--body__th.col-1st').innerHTML = 'FFO[3]';
  document.querySelector('#inversionistas__tabs__tab--content--2 > div.section--table > div > table > tbody > tr:nth-child(9) > td.tr--body__th.col-1st').innerHTML = 'Adjusted FFO';
  document.querySelector('#inversionistas__tabs__tab--content--2 > div.section--table > div > table > tbody > tr:nth-child(10) > td.tr--body__th.col-1st').innerHTML = 'Total Debt (Millons)';
} 