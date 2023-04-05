const sqlite3 = require('sqlite3');
const { open } = require('sqlite')

// async function destinySeasonDefinition() {
//   try {
//     sqlite3.verbose()
//     const db = await dbConnect()
//     const results = await getSeasonDefinitions(db)
//   } catch(err){
//     console.log(err)
//   }
// }

async function getTableData(table) {
  try {
    sqlite3.verbose()
    const db = await dbConnect()
    const SQL = `SELECT * FROM ${table}`
    const rows = await db.all(SQL)
    return rows
  } catch(err) {
    console.error(err)
    throw err
  }
}


// async function getSeasonDefinitions(db) {
//   const results = []
//   try {
//     const SQL = "SELECT * FROM DestinySeasonDefinition"
//     const row = await db.all(SQL)
//     // console.log(Object.keys(row[0].json))
//     // console.log(JSON.parse(row[0].json))
//     row.forEach(element => {
//       // console.log(element.id, element.name)
//       results.push(JSON.parse(element.json))
//       // console.log(data.seasonNumber, data.displayProperties.name)
//     });
//     results.sort((a, b) => { return (a.seasonNumber < b.seasonNumber) ? -1 : ((a.seasonNumber > b.seasonNumber) ? 1 : 0)})
//     results.forEach(item => console.log(item.seasonNumber, item.displayProperties.name, item.displayProperties.name))
//   } catch(err) {
//     console.error(err)
//     throw err
//   }
// }


function dbConnect() {
return open({
  filename: './data/responses/Manifest.content',
  driver: sqlite3.Database
})
}

module.exports = {
  getTableData
}