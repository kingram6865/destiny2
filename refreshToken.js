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

