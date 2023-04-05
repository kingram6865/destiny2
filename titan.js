const resource = require('./inspectTables')
const titan = require('./data/responses/2023/0330/getCharacter_Titan.json')

function character(){
  let info = Object.keys(titan.Response)
  console.log(info)
}

function equipment() {
  titan.Response.equipment.data.items.forEach(item => {
    resource.itemDefinition(item.itemHash)
    // console.log(item.id)
  })

}

// character()
equipment()