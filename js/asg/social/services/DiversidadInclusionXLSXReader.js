// data/asg/social/social_diversidad_inclusion.xlsx

const xslxPath = window.location.href.startsWith("https")
  ? "https://edcan-dev.github.io/planigrupo-edcan-dev/data/asg/social/social_diversidad_inclusion.xlsx"
  : "../../../data/asg/social/social_diversidad_inclusion.xlsx";

const response = await fetch(xslxPath);
const xlsx = await response.blob();

const contentOne = {
    title: '',
    globes: [],
    menValues: [],
    womenValues: []
};
const contentTwo = {
    title: '',
    values: '',
    result: '' 
}
const contentThree = {
    title: '',
    values: '',
    result: '' 
}

await readXlsxFile(xlsx, { sheet: 1 }).then(function (rows) {

    
    contentOne.title = rows[0][0];
    contentOne.globes = [
        rows[1][0],
        rows[1][1],
        rows[1][2]
    ]
    contentOne.womenValues = [
        rows[2][0],
        rows[2][1],
        rows[2][2],
        rows[2][3]
    ]
    contentOne.menValues = [
        rows[3][0],
        rows[3][1],
        rows[3][2],
        rows[3][3]
    ]
})
await readXlsxFile(xlsx, { sheet: 2 }).then(function (rows) {

    contentTwo.title = rows[0][0];
    contentTwo.values = rows[1][0]
    contentTwo.result = rows[1][1]

})
await readXlsxFile(xlsx, { sheet: 3 }).then(function (rows) {
    
    contentThree.title = rows[0][0];
    contentThree.values = rows[1][0]
    contentThree.result = rows[1][1]

})

console.log(contentOne);
console.log(contentTwo);
console.log(contentThree);