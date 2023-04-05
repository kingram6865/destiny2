require('dotenv').config()
const apiKey = process.env.APIKEY
const axios = require('axios')
const url = process.env.APISERVER
const headers = {
  headers: {
    "X-API-Key": apiKey
  }  
}

const token = require('./data/tokens/current.json')

async function getMembershipIds() {
  let response
  const reqData = {
    "displayName": `${process.env.DISPLAYNAME}`,
    "displayNameCode": process.env.DISPLAYNAMECODE
  }

  let url = `${process.env.APISERVER}/Destiny2/SearchDestinyPlayerByBungieName/All/`
  try {
    response = await axios.post(url, reqData, headers)
    console.log(response.data)
  } catch(err) {
    console.log(err)
  }
}

getMembershipIds()