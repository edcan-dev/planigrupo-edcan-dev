//const xslxPath = './../../data/inversionistas_input.xlsx';
const xslxPath = 'https://edcan-dev.github.io/planigrupo-edcan-dev/data/inversionistas_input.xlsx';
const response = await fetch(xslxPath);

const xlsx = await response.blob();

readXlsxFile(xlsx, { sheet: 1 }).then(function(rows) {

  window.innerWidth < 1000 ? 
    populateInformacionFinancieraResponsiveTable(rows) :
    populateInformacionFinancieraTable(rows);
})


function populateInformacionFinancieraTable( rows ) {

  document.querySelectorAll('.tr--head__th').forEach((th, i) => {
    th.innerHTML = rows[0][i]
  })

  const bodyTr = document.querySelectorAll('.tr--body');

  rows.forEach((row, i) => {

    if(i === 0) return;
    
    const child  = bodyTr[i - 1].children 

    row.forEach((cell, i) => {

      child.item(i).innerHTML = cell
      
    });
  });
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