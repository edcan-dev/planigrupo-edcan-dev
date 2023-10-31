
const xslxPath = '../../data/inversionistas_input.xlsx'
const response = await fetch(xslxPath);

const xlsx = await response.blob();

readXlsxFile(xlsx, { sheet: 1 }).then(function(rows) {
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