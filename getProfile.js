require('dotenv').config()
const fs = require('fs').promises
const token = require('./data/tokens/current.json')
const access_token = token.access_token
const apiKey = process.env.APIKEY
const axios = require('axios')
const headers = {
  headers: {
    "X-API-Key": apiKey,
    "Authorization": access_token
  }  
}

async function writeProfile(data) {
  let date = new Date()
  let month = (date.getMonth() < 10) ? `0${date.getMonth()}` : date.getMonth()
  let day = (date.getDate() < 10) ? `0${date.getDate()}` : date.getDate()
  let hour = (date.getHours() < 10) ? `0${date.getHours()}` : date.getHours()
  let minutes = (date.getMinutes()) ? `0${date.getMinutes()}` : date.getMinutes()
  let seconds = (date.getSeconds() < 10) ? `0${date.getSeconds()}` : date.getSeconds()

  let filename = `getProfile_${date.getFullYear()}${month}${day}_${hour}${minutes}${seconds}.json`

  let destination = `./data/responses/${date.getFullYear()}/${filename}`
  let results = await fs.writeFile(destination, data)
  let results2 = await fs.writeFile('./data/responses/profile.json', data)

  return (results, results2)
}


async function characterInfo() {
  let results
  // https://www.bungie.net/Platform/Destiny2/{{membership_type}}/Profile/{{membership_id}}?components=200,201,202,203,204,205,206
  let endpoint = `https://www.bungie.net/Platform/Destiny2/5/Profile/4611686018511662948?components=200,201,202,203,204,205,206`
  try {
    results = await axios.get(endpoint, headers)
  } catch (err) {
    console.log(err)
  }

  return results.data
}

async function execute() {
  let profileData = await characterInfo()
  writeProfile(JSON.stringify(profileData))
}

execute()

// characterInfo()
//   .then(x => console.log(x))