let fileURL = null;
if (window.location.href.includes("github")) {
  fileURL =
    "https://edcan-dev.github.io/planigrupo-edcan-dev/data/blog_layout.xlsx";
} else {
  fileURL = "../../../data/blog_layout.xlsx";
}

let xlsx = null;

await fetch(fileURL)
  .then(response => response.blob())
  .then(blob => xlsx = blob);
  
readXlsxFile(xlsx, { sheet: 1 }).then(async function(rows) {

  console.log(rows);

})
