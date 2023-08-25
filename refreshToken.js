require('dotenv').config()
const token_data = require('./data/tokens/current.json')

const fs = require('fs').promises
const oauth = Buffer.from(`${process.env.CLIENTID}:${process.env.OASECRET}`,'base64')
const apiKey = process.env.APIKEY
const axios = require('axios')
const url = process.env.APISERVER
const headers = {
  headers: {
    "X-API-Key": apiKey
  }  
}

let refreshed_token_data = {}

async function retrieveCurrentToken() {
  let file = JSON.parse(await fs.readFile('./data/tokens/current.json'))
  return file
}

async function refreshToken() {
  let response
  let token_data = await retrieveCurrentToken()

  headers.headers.Authorization = `Bearer ${token_data.access_token}`

  const params = new URLSearchParams({
    "grant_type": "refresh_token",
    "refresh_token": `${token_data.refresh_token}`
  })

  console.log(params)
  // try {
  //   response = await axios.post(`${process.env.TOKENURL}`, params, headers)
  //   refreshed_token_data = {...response.data}
  //   console.log(response.data)
  // } catch(err) {
  //   console.log(err)
  // }
}

async function execute() {
  refreshToken()
}

execute()