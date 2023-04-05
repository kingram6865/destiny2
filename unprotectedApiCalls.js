/**
 * Author: K. Ingram
 * Date: 2023 02 21
 * Description: These Bungie API endpoints do not require authentication.
 * 
 */

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

async function retrieveInventoryItem(id) {
  // Sample "https://www.bungie.net/platform/Destiny/Manifest/InventoryItem/1274330687/"
  let results
  try {
    results = await axios.get(`https://www.bungie.net/platform/Destiny/Manifest/InventoryItem/${id}/`, headers);
    console.log(JSON.stringify(results.data, null, 2))
  } catch(err) {
    console.log(err)
  } finally {
    return results.data
  }
}

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