// data/asg/social/social_diversidad_inclusion.xlsx

const xslxPath = window.location.href.includes('github')
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
    menValues: '',
    womenValues: '' 
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
    contentThree.menValues = rows[1][0]
    contentThree.womenValues = rows[2][0]

})


const contentOneElements = document.querySelectorAll('#cont1__grid__item');

contentOneElements[0].firstElementChild.innerHTML = contentOne.womenValues[0]
contentOneElements[1].firstElementChild.innerHTML = contentOne.womenValues[1]
contentOneElements[2].firstElementChild.innerHTML = contentOne.womenValues[2]
contentOneElements[3].firstElementChild.innerHTML = '= ' + contentOne.womenValues[3]

contentOneElements[4].firstElementChild.innerHTML = contentOne.menValues[0]

contentOneElements[5].firstElementChild.innerHTML = contentOne.menValues[1]
contentOneElements[6].firstElementChild.innerHTML = contentOne.menValues[2]
contentOneElements[7].firstElementChild.innerHTML = '= ' + contentOne.menValues[3]


document.querySelector('#cont2__grid__item').firstElementChild.innerHTML = contentTwo.values

document.querySelector('.cont2__grid__item--result').firstElementChild.innerHTML = '= ' + contentTwo.result


document.querySelector('#cont3__grid__item').firstElementChild.innerHTML = contentThree.menValues

document.querySelector('.cont3__grid__item--women')
.firstElementChild
.innerHTML = contentThree.womenValues
// document.querySelector('.cont3__grid__item').firstElementChild.innerHTML = '= ' + contentThree.result


console.log(contentOne);
console.log(contentTwo);
console.log(contentThree);