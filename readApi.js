const api = require('./data/api/openapi-2.json')

const apiBasePath = "https://www.bungie.net/Platform"

function listLevel1(key) {
  let action = (key.length) ? key.length : key

  if (key.length) {
    return api[key]
  } else {
    return Object.keys(key)
  }

}

function listLevel2(parent, key) {
  let action = (key.length) ? key.length : key

  if (key.length) {
    return api[parent][key]
  } else {
    return Object.keys(api[parent][key])
  }

}

switch(process.argv[2]) {
  case '1':
    if (process.argv[3]) {
      console.log(listLevel1(process.argv[3]))
    } else {
      console.log(listLevel1(api))
    }
    break;
  case '2':
    console.log(listLevel2(process.argv[3], process.argv[4]))
    break;
  default:
    console.log('Choose 1 or 2')
}


