(async function fetchValue() {

    /* const API_KEY = '22f0e2c0dd65d51cbecdc3dd4edb9b';
     */const API_KEY = 'dev';

    const actionResponse = await fetch('https://api.databursatil.com/v1/precios?token=' + API_KEY + '&emisora_serie=PLANI*&bolsa=BMV');

    const cbfisResponse = await fetch('https://api.databursatil.com/v1/precios?token=' + API_KEY + '&emisora_serie=PLANICK12&bolsa=BMV');

    const actionData = await actionResponse.json();
    const cbfisData = await cbfisResponse.json();

    setValues(actionData.BMV.ultimo, '.actionIntValue', '.actionDecimalValue');
    setValues(cbfisData.BMV.ultimo, '.cbfisIntValue', '.cbfisDecimalValue');
}());

function setValues(value, intElement, decElement) {

    const intValue = Math.floor(value);
    const decimalValue = value - intValue;

    document.querySelectorAll(intElement)
        .forEach( element => element.innerHTML = intValue)
    document.querySelectorAll(decElement)
        .forEach( element => element.innerHTML = clearDigits(decimalValue.toFixed(2)))
}

function clearDigits( value ) {
    const stringValue = value.toString()
    return stringValue.substring(1, stringValue.length)
}