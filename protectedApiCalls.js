/**
 * Author: K. Ingram
 * Date: 2023 02 21
 * Description: These Bungie API endpoints require authentication through Bungie's OAuth implementation
 * so this set of tasks will need to reference the current token to return data.
 * 
 */

const token = require('./data/tokens/current.json')
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

async function getInventory() {
  
}