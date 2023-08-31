require('dotenv').config()
const fs = require('fs').promises
const oauth = btoa(`${process.env.CLIENTID}:${process.env.OASECRET}`)
const apiKey = process.env.APIKEY
const axios = require('axios')
const url = process.env.APISERVER
const headers = {
  headers: {
    "X-API-Key": apiKey
  }  
}

let token_data = {}
let refreshed_token_data = {}

const userId = (process.argv[2]) ? process.argv[2] : ''

async function getCall(endpoint) {
  return await axios.get(`${url}${endpoint}`, headers)
}

async function postCall(endpoint, data) {
  return await axios.post(`${url}${endpoint}`, data, headers)
}


async function retrieve() {
  const results = await axios.get("https://www.bungie.net/platform/Destiny/Manifest/InventoryItem/1274330687/", {
    headers: {
      "X-API-Key": apiKey
    }
  });

  console.log(JSON.stringify(results.data, null, 2))
}

async function user() {
  const url = `https://www.bungie.net/Platform/User/GetMembershipsById/${userId}/254`
  const results = await axios.get(url, headers)
  // const results = await axios.get(`https://www.bungie.net/Platform/User/GetBungieNetUserById/${process.env.USERID}/`, {
  //   headers: {
  //     "X-API-Key": apiKey
  //   }
  // });

  console.log(results.data)
  return results.data
}

async function memberIds() {
  const endpoint=`/User/GetMembershipIds/`
  const results = await axios.get(`${url}${endpoint}`, headers)

  console.log(results.data)
}

async function getPlayerInfo(prefix, code) {
  results = await postCall(`/Destiny2/SearchDestinyPlayerByBungieName/All/`, {displayName: prefix, displayNameCode: code})
  return results.data
}


async function getToken(code) {
  let response, tokenTime, tokenExpires, refreshExpires
  headers.headers.Authorization = `Basic ${oauth}`
  headers.headers['Content-Type'] = 'application/x-www-form-urlencoded'

  const params = new URLSearchParams({
    "grant_type": "authorization_code",
    "code": code
  })

  try {
    response = await axios.post(`${process.env.TOKENURL}`, params, headers)
    console.log(response.data)
    tokenTime = new Date()
    tokenExpires = new Date(tokenTime.getTime() + (response.data.expires_in * 1000))
    refreshExpires = new Date(tokenTime.getTime() + response.data.refresh_expires_in)
    tokenTimeLocal = tokenTime.toLocaleString()
    tokenExpiresLocal = tokenExpires.toLocaleString()
    refreshExpiresLocal = refreshExpires.toLocaleString()

    token_data = {...response.data, ...{tokenTime, tokenExpires, refreshExpires}, localTimes: {tokenTimeLocal, tokenExpiresLocal, refreshExpiresLocal}}

    let output = JSON.stringify(token_data).replace("\\","")

    console.log(output)
    writeToken(output)
  } catch (err) {
    console.log(err)
  }
}

async function writeToken(data) {
  let date = new Date()
  let month = (date.getMonth() < 10) ? `0${date.getMonth()+1}` : date.getMonth()+1
  let hour = (date.getHours() < 10) ? `0${date.getHours()}` : date.getHours()
  let minutes = (date.getMinutes()) ? `0${date.getMinutes()}` : date.getMinutes()
  let seconds = (date.getSeconds() < 10) ? `0${date.getSeconds()}` : date.getSeconds()
  let filename = `${date.getFullYear()}${month}${date.getDate()}_${hour}${minutes}${seconds}.json`

  let destination = `./data/tokens/${filename}`
  let results1 = await fs.writeFile(destination, data)
  let results2 = await fs.writeFile('./data/tokens/current.json', data)

  // console.log(results1, results2)
  return (results1, results2)
}

async function readToken() {
  let file = await fs.readFile('./data/tokens/current.json')
  // let token = JSON.parse(JSON.stringify(file.toString()))
  let token = JSON.parse(file.toString())

  return token
}

async function refreshToken() {
  let response
  let token = await readToken()
  headers.headers.Authorization = `Bearer ${token.refresh_token}`

  const params = new URLSearchParams({
    "grant_type": "refresh_token",
    "refresh_token": `${token.refresh_token}`
  })

  try {
    response = await axios.post(`${process.env.TOKENURL}`, params, headers)
    refreshed_token_data = {...response.data}
    console.log(response.data)
  } catch(err) {
    console.log(err)
  }
}


// getPlayerInfo(process.argv[2], process.argv[3])
//   .then(x => console.log(JSON.stringify(x, null, 2)))

// user()
//   .then(x => console.log(x))

// memberIds()

// async function authorize() {
//   const endpoint = `https://www.bungie.net/en/OAuth/Authorize?client_id=${process.env.CLIENTID}&response_type=code&state=6i0mkLx79Hp91nzWVeHrzHG4`
//   let results

//   try {
//     results = await axios.get(endpoint, headers)
//     console.log(results.data)
//   } catch(err) {
//     console.log(err)
//   }
// }

// authorize()
// getToken('f88a842dab337961772f70c70c180b56')

getToken(process.argv[2])

// readToken()
//   // .then(x => console.log(JSON.parse(x)))
//   .then(x => console.log(x))
