require('dotenv').config()
const bungieBase = 'https://www.bungie.net/Platform/Destiny2'
const token = require('./data/tokens/current.json')
const access_token = token.access_token
const apiKey = process.env.APIKEY
const axios = require('axios')
const headers = {
  headers: {
    "X-API-Key": apiKey
  }  
}

// const oauth = Buffer.from(`${process.env.CLIENTID}:${process.env.OASECRET}`,'base64')
// console.log(oauth)

const url = "https://www.bungie.net/Platform/Destiny2/3/Profile/24300038/?components=PROFILES"

const params = new URLSearchParams({
	components: 'PROFILES,CHARACTERS,CHARACTERINVENTORIES'
})

async function profiles() {
  let response
  headers.headers.Authorization = `Bearer ${access_token}`
  headers.headers['Content-Type'] = 'application/x-www-form-urlencoded'

  // const params = new URLSearchParams({
  //   "scope": "ReadBasicUserProfile",
  //   "refresh_token": `${access_token}`
  // })

  const params = new URLSearchParams({
    "scope": "ReadBasicUserProfile",
    "refresh_token": `${token.refresh_token}`,
    "components": "PROFILES"
  })
  
  try {
    // This AJAX call retrieves Profile(100) and ProfileInventories(102)
    response = await axios.get('https://www.bungie.net/Platform/Destiny2/5/Profile/4611686018511662948/?components=100,102', headers)
    console.log(JSON.stringify(response.data, null, 2))
  } catch(err) {
    console.log(err)
  }
}


async function test() {
  let response
  headers.headers.Authorization = `Bearer ${access_token}`

  const params = new URLSearchParams({
    "scope": "ReadBasicUserProfile",
    "refresh_token": `${access_token}`
  })

  try {
    response = await axios.get('https://www.bungie.net/Platform/User/GetMembershipsForCurrentUser/', headers)
    console.log(JSON.stringify(response.data, null, 2))
  } catch(err) {
    console.log(err)
  }
}

// test()
profiles()