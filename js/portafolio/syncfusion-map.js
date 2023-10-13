import { key } from './registration.js'

import { mexico_map } from './mexico-datasource.js'

ej.base.registerLicense(key)
 
 var map = new ej.maps.Maps({
    /* titleSettings: {
        text: 'Poc Planigrupo',
    }, */
    selectionSettings: {
        enable: true,
        fill: 'blue',
        border: { color: 'white', width: 16}
     },
    zoomSettings:{
        enable:false,
        zoomFactor:1
    },
    centerPosition: {
        latitude: 24.54244147012483,
        longitude: -100.62646484375
    },
   layers: [{
        shapeData: mexico_map,
        dataSource: [
            {  "Country": "Mexico", "Mexico": "true"}
        ],
        shapePropertyPath: 'name',
        shapeDataPath: 'Country',
        highlightSettings: {
            enable: true,
            fill: '#0096A9',
         },
        shapeSettings: {
            colorValuePath: 'Mexico',
            colorMapping: [
            {
                value: 'true', color: '#0096A9'
            },
            {
                value: 'Non-Permanent', color: '##0096A9'
            }],
            border: {
                color: 'white',
                width: 1
            }
        }
        }
    ]
});

map.appendTo('#element');