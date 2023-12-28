import { key } from './registration.js'
import { propertiesGrid } from './properties-grid.js'

/* import { mexico_map } from './mexico-datasource.js' */
import { mexico_map } from './mexico_geogson.js'

// ej.base.registerLicense(key)
ej.base.registerLicense('key')

const states = [
  "Baja California",
  "Baja California Sur",
  "Campeche",
  "Cancun",
  "Chihuahua",
  "Coahuila",
  "Hidalgo",
  "Jalisco",
  "México",
  "Michoacán",
  "Nayarit",
  "Nuevo León",
  "Oaxaca",
  "Puebla",
  "Sonora",
  "San Luis Potosí",
  "Tamaulipas",
  "Quintana Roo",
  "San Luis Potosí",
  "Querétaro"
]

const filtered = {...mexico_map}

filtered.features = 
mexico_map.features.filter(
  (state) => states.includes(state.properties.name))

var map = new ej.maps.Maps({
  shapeSelected: function(args) {
    var shape = (args.shapeData).name;
    propertiesGrid.filterByStateFromMap(shape)
    
  },
  
  height: '600px',
  width: '900px',
  layers: [
    
    {
      shapeData: mexico_map,
      dataSource: [
        { "State": "Baja California", "Membership": "Permanent" },
        { "State": "Baja California Sur", "Membership": "Permanent" },
        { "State": "Campeche", "Membership": "Permanent" },
        { "State": "Chihuahua", "Membership": "Permanent" },
        { "State": "Coahuila", "Membership": "Permanent" },
        { "State": "Hidalgo", "Membership": "Permanent" },
        { "State": "Jalisco", "Membership": "Permanent" },
        { "State": "México", "Membership": "Permanent" },
        { "State": "Michoacán", "Membership": "Permanent" },
        { "State": "México", "Membership": "Permanent" },
        { "State": "Nayarit", "Membership": "Permanent" },
        { "State": "Nuevo León", "Membership": "Permanent" },
        { "State": "Oaxaca", "Membership": "Permanent" },
        { "State": "Puebla", "Membership": "Permanent" },
        { "State": "Sonora", "Membership": "Permanent" },
        { "State": "San Luis Potosí", "Membership": "Permanent" },
        { "State": "Tamaulipas", "Membership": "Permanent" },
        { "State": "Quintana Roo", "Membership": "Permanent" },
        { "State": "San Luis Potosí", "Membership": "Permanent" },
        { "State": "Querétaro", "Membership": "Permanent" }
/*         { "State": "Sinaloa", "Membership": "Non-Permanent" }
 */      ],
      shapePropertyPath: "name",
      shapeDataPath: 'State',
      shapeSettings: {
        fill: '#eae9e8',
        colorValuePath: 'Membership',
        colorMapping: [
          {
            value: 'Permanent', color: '#316DB5'
          },
          {
            value: 'Non-Permanent', color: '# 0096A9'
          }],

        // Border de cada forma
        border: {
          color: '#DDD',
          width: 1
        }

      }
    },
    {
      shapeData: filtered,
      type: 'subLayer',
      dataSource: [
        { "State": "Baja California", "Membership": "Permanent" },
        { "State": "Baja California Sur", "Membership": "Permanent" },
        { "State": "Campeche", "Membership": "Permanent" },
        { "State": "Chihuahua", "Membership": "Permanent" },
        { "State": "Coahuila", "Membership": "Permanent" },
        { "State": "Hidalgo", "Membership": "Permanent" },
        { "State": "Jalisco", "Membership": "Permanent" },
        { "State": "México", "Membership": "Permanent" },
        { "State": "Michoacán", "Membership": "Permanent" },
        { "State": "México", "Membership": "Permanent" },
        { "State": "Nayarit", "Membership": "Permanent" },
        { "State": "Nuevo León", "Membership": "Permanent" },
        { "State": "Oaxaca", "Membership": "Permanent" },
        { "State": "Puebla", "Membership": "Permanent" },
        { "State": "Sonora", "Membership": "Permanent" },
        { "State": "San Luis Potosí", "Membership": "Permanent" },
        { "State": "Tamaulipas", "Membership": "Permanent" },
        { "State": "Quintana Roo", "Membership": "Permanent" },
        { "State": "San Luis Potosí", "Membership": "Permanent" },
        { "State": "Querétaro", "Membership": "Permanent" }
/*         { "State": "Sinaloa", "Membership": "Non-Permanent" }
 */      ],
      shapePropertyPath: "name",
      shapeDataPath: 'State',
      highlightSettings: {
        enable: true,
        fill: '#66C0CB',
        border: { color: 'white', width: 2 }
      },
      selectionSettings: {
        enable: true,
        fill: '#0096A9',
        border: { color: 'white', width: 1 }

      },
      tooltipSettings: {
        visible: true,
        valuePath: 'name'
      },
      shapeSettings: {
        fill: '#D22730',

        colorValuePath: 'Membership',
        colorMapping: [
          {
            value: 'Permanent', color: '#8C827A'
          },
          {
            value: 'Non-Permanent', color: '#316DB5'
          }],

        // Border de cada forma
        border: {
          color: '#DDD',
          width: 1
        }

      }
    }
  ]
});
map.appendTo('#element');



document.getElementById('element_LayerIndex_1_shapeIndex_16_dataIndex_1').dispatchEvent(new Event('shapeSelected'))