var input = document.getElementById('input')
input.addEventListener('change', function() {
  readXlsxFile(input.files[0], { sheet: 2 }).then(function(rows) {

    rows.forEach(row => {
        console.log(row);
    });
  })
})