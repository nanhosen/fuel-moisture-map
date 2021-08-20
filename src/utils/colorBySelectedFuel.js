import {fullSiteMetadata} from '../data/siteMetadataWithImages'
import { Circle as CircleStyle, Fill, Stroke, Style, Icon, Text } from 'ol/style.js'
import {dashToComma} from './stringParsingThings'
import {checkFuelType, obsProcess, timeCheck} from './stationFilterCheckers'



export default function returnColor(feature, selectedFuelTypes, selectedSites, observedData, timeFilters, valFilters) {
  // console.log('valFilters', valFilters)
  // console.log('feature, selectedFuelTypes, selectedSites', feature, selectedFuelTypes, selectedSites, observedData, timeFilters)
  const msMinute = 60000
  const hour = msMinute * 60
  const day = hour * 24
  const week = day * 7
  const twoWeeks = week * 2
  const oneMonth = week * 4
  const subtractAmount = {
    twoWeeks, 
    oneMonth
  }
  const currSiteName = feature.get('name')
  // console.log('currSiteName', currSiteName, currSiteName == "Donnelly Gulch", currSiteName == selectedSites[0])
  const currSiteData = fullSiteMetadata[currSiteName]
  const statusObj = {
    name: checkIfMatches(selectedSites, currSiteName),
    fuelType: false,
    time: false,
    latestObObject: false,
    filterResult: false,
    fuelsFiltered: selectedFuelTypes.length > 0 ? true : false,
    namesFiltered: selectedSites.length > 0 ? true : false,
    timesFiltered: timeFilters ? true : false
  }
  // console.log('status obj heeeeeeee', statusObj)
  // var color = '#cfcfd0'
  // const currSiteFuelTypes = currSiteData?.fuels ? Object.keys(currSiteData.fuels) : null
  const obDateInfo = { 
    fuelType: [],
    latestOb: []
  }
  const currSiteFuelTypes = currSiteData?.fuels ? Object.keys(currSiteData.fuels) : []

  // console.log('currSiteFuelTypes', currSiteFuelTypes, observedData)
  currSiteFuelTypes.map(currFuel=>{
    const nameToComma = dashToComma(currFuel)
    if(observedData){

      const fuelObs = observedData[currFuel] ? observedData[currFuel] : observedData[nameToComma]
        // console.log('nameToComma', nameToComma, 'data', fuelObs)
      // console.log('hi!!!!!!!!!!!!!!!!!!!!!!!!!!!!', observedData)
      const latestOb = fuelObs && fuelObs['obDates'] && fuelObs['obDates'].length > 0 ? fuelObs['obDates'][0] : null
      const previousOb = fuelObs && fuelObs['obDates'] && fuelObs['obDates'].length > 0 ? fuelObs['obDates'][1] : null
            if (fuelObs){
        const stnFuelAverages = fuelObs.averages ? fuelObs.averages : null
          if(latestOb){
            const latestMonth = new Date(latestOb).getMonth() + 1
            const monthPart = new Date(latestOb).getDate() < 15 ? 'first' : 'second'
            const averagesArray = stnFuelAverages[latestMonth][monthPart]
            const calculatedAvg = averagesArray.reduce((a, b) => parseFloat(a) + parseFloat(b)) / averagesArray.length
            const compareToNormal = fuelObs['obs'][0] ? calculatedAvg - parseFloat(fuelObs['obs'][0]) : null
            statusObj.comparedToNormal ?  statusObj.comparedToNormal[currFuel] = compareToNormal : statusObj.comparedToNormal = {[currFuel]: compareToNormal}
        console.log('station', currSiteName, 'most recet ob',latestOb, 'avg',  calculatedAvg, fuelObs['obs'][0], compareToNormal)
          }
        // console.log('latest and previous', latestOb, previousOb)
        obDateInfo.fuelType.push(currFuel)
        obDateInfo.latestOb.push(latestOb)
      // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@^^^^^^^^^^^^^^^^^^^^&&&&&&&&&&&&&&&&&&&&&&', obDateInfo)

        // console.log(fuelObs['obDates'][0])
        // console.log('latest ob', observedData)
        statusObj.latestObObject ?  statusObj.latestObObject[currFuel] = fuelObs['obs'][0] : statusObj.latestObObject = {[currFuel]: fuelObs['obs'][0]}
        // console.log('statusObject', statusObj)
        const valTrend = fuelObs['obs'][0] && fuelObs['obs'][1] ?  fuelObs['obs'][1] - fuelObs['obs'][0] : false
        // console.log('latest ob',  fuelObs['obs'][0])
        statusObj.latesObTrend ? statusObj.latesObTrend[currFuel] = valTrend : statusObj.latesObTrend = {[currFuel]: valTrend}
        // console.log('previous ob',  fuelObs['obs'][1])
      }
      // console.log('^^^^^^^^^^^^^^^^^^^^&&&&&&&&&&&&&&&&&&&&&&', obDateInfo)
    }
    // console.log('obDateInfo', obDateInfo)
    const matches = checkIfMatches(selectedFuelTypes, currFuel)
    // console.log('real fuel answer', matches)

    if(matches){
      // console.log('matches################!####################################################') 

      statusObj.fuelType = true
    }
  })

  // console.log('statusObj', statusObj)
  // console.log('new fuel thing', obsProcess(observedData, currSiteFuelTypes))
  // console.log('new return thing', checkFuelType(currSiteFuelTypes, selectedFuelTypes))
  // console.log(statusObj.fuelType == checkFuelType(currSiteFuelTypes, selectedFuelTypes))

  if(timeFilters){
    // console.log('obby ob ehere', obDateInfo)
    if(obDateInfo.fuelType.indexOf("Sagebrush-Mountain Big") >= 0){
      // console.log('FUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU')
    }
    const toMsTime = obDateInfo.latestOb.map(currOb => new Date(currOb).getTime()).sort()
    const newestDate = toMsTime[toMsTime.length - 1]
    const today = new Date().getTime()
    const oldestDate = today - subtractAmount[timeFilters]
    // console.log('oldestDate', oldestDate, timeFilters, 'obDateInfoHere', obDateInfo)
    const isRecent = newestDate && newestDate >= oldestDate ? true : false
    
    // if(statusObj.fuelsFiltered){
    //   // if(selectedFuelTypes.length > 0){
    //   console.log('length', selectedFuelTypes.length, selectedFuelTypes)

    //     selectedFuelTypes.map(currFuel => {
    //       console.log('hi')
    //       const obIndex = obDateInfo.fuelType.indexOf(currFuel)
    //       const fuelObTime = obDateInfo.latestOb[obIndex]
    //       if(currFuel == "Sagebrush-Mountain Big" && statusObj.fuelType == true){
    //         console.log('here', 'obDateInfo', obDateInfo, 'currFuel', currFuel, 'statusObj', statusObj, 'obDateInfo', obDateInfo)
    //       console.log('fuelObTime', fuelObTime, 'curFuel', currFuel, 'selectedSites', selectedSites)
    //       }
    //       if(fuelObTime){
    //         console.log('i exist!!!!!')
    //       }
    //       if(new Date(fuelObTime).getTime() >= oldestDate){
    //         statusObj.time = true
    //       }
    //       else{
    //         statusObj.time = false
    //       }
    //     })
    //   // }
    // }
    // else{
      if(isRecent){
      statusObj.time = true
    // console.log('newestDate', new Date(newestDate), isRecent, newestDate)
    // console.log('today', today, 'oldestDate', oldestDate)
    }
    // }
  }

  // console.log('obs process resuot', obsProcess(observedData, currSiteFuelTypes))
  const newTimeThing = timeCheck(obsProcess(observedData, currSiteFuelTypes).obDateInfo, timeFilters)
  if(statusObj.time == newTimeThing){
  // console.log('orig time filter ', statusObj)
  // console.log('new gime filter', timeCheck(obsProcess(observedData, currSiteFuelTypes).obDateInfo, timeFilters))
  // console.log('i workeddd')

  }
  else{
    // console.log('i am lame')
  }

  // const hasFuel = currSiteFuelTypes ? currSiteFuelTypes.indexOf(selectedFuelTypes) : null
  // var  hasName = false
  // const hasName = checkIfMatches(selectedSites, currSiteName)
  // if(hasName){
  //   statusObj.name = true
  // }
  // var hasFuel = false
  // if(statusObj.name || statusObj.fuelType){

  //   console.log('statusObj', statusObj, 'currSiteName', currSiteName, 'selectedFuelTypes', selectedFuelTypes, 'selectedSites', selectedSites, 'currSiteFuelTypes', currSiteFuelTypes)
  // }
  // selectedSites.map(currSite =>{
  //   if(currSiteName == currSite){
  //     console.log('match!', currSite, currSiteName)
  //     hasName = true
  //   }
  // })
  // if(selectedSites.length > 0){
  //   if(hasFuel > 0 || hasName){
  //     color = '#454446'
  //   }
  // }
  // else{
  //   color = hasFuel>=0 || selectedFuelTypes == 'All'  ? '#454446' : '#cfcfd0'
  // }
  // if(getColor(statusObj) !== color && statusObj.fuelType){

  // console.log('Not equeal, new color', getColor(statusObj), 'oldColor', color)
  // }

  // if(hasFuel>=0){

  // console.log(hasFuel,  selectedFuelTypes, feature.get('name'))
  // }
  // return hasFuel>=0 || selectedFuelTypes == 'All' || hasName ? '#454446' : '#cfcfd0'
  // return color
  // console.log('new thing', checkOptions(statusObj), 'old thing', getColor(statusObj))
  if(valFilters && statusObj.latestObObject){
    // console.log('both here', valFilters, statusObj)
    for(var fuel in valFilters){
      const threshold = parseFloat(valFilters[fuel])
      const latestOb = parseFloat(statusObj.latestObObject[fuel])
      // console.log('the filter value is ', threshold,  threshold)
      // console.log('the most recent ob is', latestOb,  latestOb)
      const thresholdPadding = 0
      if(!isNaN(latestOb) && !isNaN(threshold)){
        // console.log('notNan', latestOb)
        if( latestOb > threshold + thresholdPadding){
          statusObj.filterResult = 'above'
          // console.log('above')
        }
        else if(latestOb == threshold){
          statusObj.filterResult = 'at'
          // console.log('at')
        }
        else{
          statusObj.filterResult = 'below'
          // console.log('below')
          // console.log('the filter value is ', threshold,  threshold)
      // console.log('the most recent ob is', latestOb,  latestOb)
        }
      }
    }
  // console.log('statusObj', statusObj)
  }
  const meetsFilters = checkOptions(statusObj)
  var color = meetsFilters ? '#454446' : '#cfcfd0'
  if(statusObj.filterResult){
    const status = statusObj.filterResult
    if(meetsFilters){
      if(status == 'above'){
        color = '#9ACD32'
      }
      else if(status == 'at'){
        color = '#B0E0E6'
      }
      else if(status == 'below'){
        color = '#A52A2A'
      }

    }

  }
  // else{
  //   color = checkOptions(statusObj) == true ? '#454446' : '#cfcfd0'
  // }

  // return checkOptions(statusObj) == true ? '#454446' : '#cfcfd0'
  return color


};


const checkIfMatches = (array, checkVal)=>{
  const statusObj = {exists: false}
  array.map(curr =>{
    if(curr == checkVal){
      statusObj.exists = true
    }
  })
  if(checkVal == "Sagebrush-Mountain Big"){

  // console.log('statuObj', statusObj, array, checkVal)
  }
  return statusObj.exists
}

const getColor = statusObj =>{
  const {name, fuelType, time, fuelsFiltered, namesFiltered, timesFiltered} = statusObj
  // console.log('status object', statusObj, !fuelsFiltered, !namesFiltered)
  const colorObj = {color: '#cfcfd0'}
  if(fuelsFiltered && namesFiltered && timesFiltered){
    if(fuelType && name && time){
      colorObj.color = '#454446'
    }
  }
  else if(fuelsFiltered && !namesFiltered){
    if(fuelType){
      colorObj.color = '#454446'
    }
  }
  else if(!fuelsFiltered && namesFiltered){
    if(name){
      colorObj.color = '#454446'
    }
  }
  else if(!fuelsFiltered && !namesFiltered){
    colorObj.color = '#454446'
  }

  return colorObj.color
}

const checkOptions = (inputObj)=>{
  const {name, fuelType, time, fuelsFiltered, namesFiltered, timesFiltered} = inputObj
  const filteredArray = [fuelsFiltered ? 1 : 0, namesFiltered ? 1 : 0, timesFiltered ? 1 : 0 ]
  const stateArray = [fuelType ? 1 : 0, name ? 1 : 0, time ? 1 : 0 ]
  // console.log(inputObj, filteredArray, stateArray, arrayEquals(filteredArray, stateArray))
  return arrayEquals(filteredArray, stateArray)
}

function arrayEquals(a, b) {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
}