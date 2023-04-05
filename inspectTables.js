const { getTableData } = require('./manifest')

const tables = [
  'DestinyAchievementDefinition',
  'DestinyActivityDefinition',
  'DestinyActivityGraphDefinition',
  'DestinyActivityModeDefinition',
  'DestinyActivityModifierDefinition',
  'DestinyActivityTypeDefinition',
  'DestinyArtifactDefinition',
  'DestinyBondDefinition',
  'DestinyBreakerTypeDefinition',
  'DestinyChecklistDefinition',
  'DestinyClassDefinition',
  'DestinyCollectibleDefinition',
  'DestinyDamageTypeDefinition',
  'DestinyDestinationDefinition',
  'DestinyEnergyTypeDefinition',
  'DestinyEquipmentSlotDefinition',
  'DestinyEventCardDefinition',
  'DestinyFactionDefinition',
  'DestinyGenderDefinition',
  'DestinyGuardianRankConstantsDefinition',
  'DestinyGuardianRankDefinition',
  'DestinyHistoricalStatsDefinition',
  'DestinyInventoryBucketDefinition',
  'DestinyInventoryItemDefinition',
  'DestinyItemCategoryDefinition',
  'DestinyItemTierTypeDefinition',
  'DestinyLoadoutColorDefinition',
  'DestinyLoadoutConstantsDefinition',
  'DestinyLoadoutIconDefinition',
  'DestinyLoadoutNameDefinition',
  'DestinyLocationDefinition',
  'DestinyLoreDefinition',
  'DestinyMaterialRequirementSetDefinition',
  'DestinyMedalTierDefinition',
  'DestinyMetricDefinition',
  'DestinyMilestoneDefinition',
  'DestinyObjectiveDefinition',
  'DestinyPlaceDefinition',
  'DestinyPlugSetDefinition',
  'DestinyPowerCapDefinition',
  'DestinyPresentationNodeDefinition',
  'DestinyProgressionDefinition',
  'DestinyProgressionLevelRequirementDefinition',
  'DestinyRaceDefinition',
  'DestinyRecordDefinition',
  'DestinyReportReasonCategoryDefinition',
  'DestinyRewardSourceDefinition',
  'DestinySackRewardItemListDefinition',
  'DestinySandboxPatternDefinition',
  'DestinySandboxPerkDefinition',
  'DestinySeasonDefinition',
  'DestinySeasonPassDefinition',
  'DestinySocialCommendationDefinition',
  'DestinySocialCommendationNodeDefinition',
  'DestinySocketCategoryDefinition',
  'DestinySocketTypeDefinition',
  'DestinyStatDefinition',
  'DestinyStatGroupDefinition',
  'DestinyTalentGridDefinition',
  'DestinyTraitDefinition',
  'DestinyUnlockDefinition',
  'DestinyVendorDefinition',
  'DestinyVendorGroupDefinition'
]

function sortBy(sortKey) {
  return (a, b) => {return (a[sortKey] < b[sortKey]) ? -1 : ((a[sortKey] > b[sortKey]) ? 1 : 0)}
}

async function seasonDefinition() {
  const results = []
  try {
    const seasons = await getTableData('DestinySeasonDefinition')
    seasons.forEach(element => {
      // console.log(element.id, element.name)
      results.push(JSON.parse(element.json))
      // console.log(data.seasonNumber, data.displayProperties.name)
    });
    results.sort((a, b) => { return (a.seasonNumber < b.seasonNumber) ? -1 : ((a.seasonNumber > b.seasonNumber) ? 1 : 0)})
    results.forEach(item => console.log(item.seasonNumber, item.displayProperties.name, item.displayProperties.description))
  } catch(err) {
    console.log(err)
  }
}

async function itemCategory(term) {
  // const results = []
  let results, result
  try {
    const category = await getTableData('DestinyItemCategoryDefinition')
    result = category.filter(item => item.id === term)
    results = {...JSON.parse(result[0].json), id: result[0].id}
    console.log(results)
    // category.forEach(item => {
    //   let data = JSON.parse(item.json)
    //   results.push({
    //     ...data, id: item.id
    //   })
    // })
    // results.sort(sortBy('index'))
    // // console.log(results)
    return results
  } catch(err) {
    console.log(err)
  }
}

async function itemTier() {
  const results = []
  try {
    const tier = await getTableData('DestinyItemTierTypeDefinition')
    tier.forEach(item => {
      let data = JSON.parse(item.json)
      results.push({
        ...data, id: item.id 
      })
    })
    // console.log(results)
    return results
  } catch(err) {
    console.log(err)
  }
}

async function itemActivity(term) {
  let results, result
  try {
    const activity = await getTableData('DestinyActivityDefinition')
    // console.log(item.id === -2080000434)
    result = activity.filter(item => item.id === term)
    results = {...JSON.parse(result[0].json), id: result[0].id}
    console.log(results)
  } catch(err) {
    console.log(err)
  }
}

async function itemDefinition(id) {
  let results, result
  const term = id >> 32
  try {
    const definition = await getTableData(`DestinyInventoryItemDefinition`)
    result = definition.filter(item => item.id === term)
    const data = JSON.parse(result[0].json)
    console.log(Object.keys(data))
    // console.log(JSON.parse(result[0].json))
    // console.log(result)
    // definition.forEach(x => {
    //   let data = JSON.parse(x.json)
      
    //   console.log(x.id, data)
    // })
    // console.log(result)
  } catch(err) {
    console.log(err)
  }
}

// async function main(){
//   // seasonDefinition()
//   // itemCategory(process.argv[2])
//   // itemTier()
//   // itemActivity(-2143693236)
//   itemDefinition(process.argv[2])
// }

// main()

module.exports = {
  itemCategory,
  itemTier,
  seasonDefinition,
  itemActivity,
  itemDefinition
}