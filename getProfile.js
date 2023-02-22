require('dotenv').config()
const token = require('./data/tokens/current.js')
const access_token = token.access_token
const apiKey = process.env.APIKEY
const axios = require('axios')
const headers = {
  headers: {
    "X-API-Key": apiKey,
    "Authorization": access_token
  }  
}

console.log(token)

// const oauth = btoa(`${process.env.CLIENTID}:${process.env.OASECRET}`)

// async function execute() {
//   try {
//     response = await axios.get('https://www.bungie.net/Platform/Destiny2/5/Profile/4611686018511662948/?components=102', headers)
//     console.log(JSON.stringify(response.data, null, 2))
//   } catch(err) {
//     console.log(err)
//   }  
// }

// execute()