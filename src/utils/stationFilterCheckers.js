import {spaceToPercent, dashToComma, checkIfMatches} from './stringParsingThings'

const msHour = 1000 * 60 * 60
const msDay = msHour * 24
const msWeek = msDay * 7

const twoWeeks = msWeek * 2
const oneMonth = msWeek * 4
const subtractAmount = {
  twoWeeks, 
  oneMonth
}

export function checkFuelType(currSiteFuelTypes, selectedFuelArray){
	// console.log('currSiteFuelTypes in utils', currSiteFuelTypes)
	// console.log('selectedFuelArray in utils', selectedFuelArray)
	const returnObject = {status: false}
	selectedFuelArray.map(currFuel=>{
		// console.log('currFuel', currFuel)
		const nameToComma = dashToComma(currFuel)
		const matches = checkIfMatches(currSiteFuelTypes, currFuel)
		if(matches){
			returnObject.status = true
		}
	})
	return returnObject.status
}

export function checkStationName(selectedSites, currSitename){
	return checkIfMatches(selectedSites, currSitename)
}

// export function compareValThreshold(processedObs, colorFilterType, valFilters){
// 	const returnObj = {status:null}
// 		if(parseFloat(valFilters[fuel])){
// 			if(processedObs.latestObObject){
// 				for(var fuel in valFilters){
// 		      const thresh = parseFloat(valFilters[fuel])
// 		      const latestOb = parseFloat(processedObs.latestObObject[fuel])
// 		      const threshPadding = 0
// 		      if(!isNaN(latestOb) && !isNaN(thresh)){
// 		        if( latestOb > thresh + threshPadding){
// 		          statusObj[colorFilterType] = 'above'
// 		        }
// 		        else if(latestOb == thresh){
// 		          statusObj[colorFilterType] = 'at'
// 		        }
// 		        else{
// 		          statusObj[colorFilterType] = 'below'
// 		        }
// 		      }
// 		    }

// 			}
// 		}
// }	

// function compareValThresh(processedObs, colorFilterType, valFilters){

// }
// compareVal(processedObs, colorFilterType, valFilters)
export function compareVal(processedObs, colorFilterType, threshold, fuelToCompare){
	// console.log('processedObs', processedObs, 'colorFilterType', colorFilterType, 'threshold', threshold, 'fuelToCompare', fuelToCompare)
	const statusObj={[colorFilterType]:null}
	if(!processedObs.latestObObject){
		// console.log('no obs')
	}
	else{
		if(colorFilterType == "threshold"){
			// for(var fuel in valFilters){
	      const thresh = parseFloat(threshold)
	      const latestOb = parseFloat(processedObs.latestObObject[fuelToCompare])
	      const threshPadding = 0
	      if(!isNaN(latestOb) && !isNaN(thresh)){
	        if( latestOb > thresh + threshPadding){
	          statusObj[colorFilterType] = 'above'
	        }
	        else if(latestOb == thresh){
	          statusObj[colorFilterType] = 'at'
	        }
	        else{
	          statusObj[colorFilterType] = 'below'
	        }
	      }
	    // }

		}
		else if(colorFilterType == 'average'){
			// if(processedObs){
			// // console.log('processedObs', processedObs.comparedToNormal)

			// // console.log('obs hereee', processedObs.comparedToNormal[fuelToCompare])
			// }
			const avgVal = processedObs.comparedToNormal[fuelToCompare]
			if(avgVal){
				// console.log('avgVal', avgVal)
				if(avgVal > 1){
					statusObj[colorFilterType] = 'above'
				}
				else if(avgVal >= -1 && avgVal <= 1){
					statusObj[colorFilterType] = 'at'
				}
				else if(avgVal < -1){
					statusObj[colorFilterType] = 'below'
				}
			}
		}

	}
	// console.log('resut', statusObj)
	
	return statusObj
}

export function obsProcess(observedData, stationFuelsArray){
	const statusObj = {
		obDateInfo:{ 
    fuelType: [],
    latestObDate: []
  	}
	}
	stationFuelsArray.map(currFuel=>{
		const nameToComma = dashToComma(currFuel)
		if(observedData){
			// console.log('observedData', observedData)
	    const fuelObs = observedData[currFuel] ? observedData[currFuel] : observedData[nameToComma]
	    const latestObDate = fuelObs && fuelObs['obDates'] && fuelObs['obDates'].length > 0 ? fuelObs['obDates'][0] : null
	    const previousObDate = fuelObs && fuelObs['obDates'] && fuelObs['obDates'].length > 0 ? fuelObs['obDates'][1] : null
	    const msTimeTwoWeeksAgo = new Date(latestObDate).getTime() - msWeek * 3
	    const consecutiveObDateDiff = new Date(latestObDate).getTime() - new Date(previousObDate).getTime()
	    const allowedDateDif = new Date(latestObDate).getTime() - msTimeTwoWeeksAgo
			const calcTrend = allowedDateDif - consecutiveObDateDiff >= 0		    
	    if (fuelObs){
	      const stnFuelAverages = fuelObs.averages ? fuelObs.averages : null
	        if(latestObDate){
	          const latestMonth = new Date(latestObDate).getMonth() + 1
	          const monthPart = new Date(latestObDate).getDate() < 15 ? 'first' : 'second'
	          console.log('stnFuelAverages', stnFuelAverages, 'latestMonth', latestMonth)
	          const averagesArray = stnFuelAverages[latestMonth] && stnFuelAverages[latestMonth][monthPart].length > 0 ? stnFuelAverages[latestMonth][monthPart] : null
	          // console.log(d'averagesArray', averagesArray, 'fuelObs', fuelObs)
	          const calculatedAvg = averagesArray ?  averagesArray.reduce((a, b) => parseFloat(a) + parseFloat(b)) / averagesArray.length : null
	          // const compareToNormal = fuelObs['obs'][0] ? calculatedAvg - parseFloat(fuelObs['obs'][0]) : null
	          const compareToNormal = fuelObs['obs'][0] && averagesArray ? parseFloat(fuelObs['obs'][0]) - calculatedAvg : null
	          statusObj.comparedToNormal ?  statusObj.comparedToNormal[currFuel] = compareToNormal : statusObj.comparedToNormal = {[currFuel]: compareToNormal}
	          // console.log('calculatedAvg', calculatedAvg, 'compareToNormal', compareToNormal, 'obval', fuelObs['obs'][0])
	        }
	      statusObj.obDateInfo.fuelType.push(currFuel)
	      statusObj.obDateInfo.latestObDate.push(latestObDate)
	      statusObj.latestObObject ?  statusObj.latestObObject[currFuel] = fuelObs['obs'][0] : statusObj.latestObObject = {[currFuel]: fuelObs['obs'][0]}
	      const valTrend = fuelObs['obs'][0] && fuelObs['obs'][1]  && calcTrend ?  fuelObs['obs'][1] - fuelObs['obs'][0] : false
	      statusObj.latesObTrend ? statusObj.latesObTrend[currFuel] = valTrend : statusObj.latesObTrend = {[currFuel]: valTrend}
	    }
	  }
	})
	return statusObj
}

export function timeCheck(obDateInfo, timeFilterValue){
	const returnObject = {status: false}
	// stationFuelsArray.map(currFuel=>{
	if(obDateInfo && obDateInfo.latestObDate){
		const toMsTime = obDateInfo.latestObDate.map(currOb => new Date(currOb).getTime()).sort()
    const newestDate = toMsTime[toMsTime.length - 1]
    const today = new Date().getTime()
    const oldestDate = today - subtractAmount[timeFilterValue]
    const isRecent = newestDate && newestDate >= oldestDate ? true : false				
		returnObject.status = newestDate && newestDate >= oldestDate ? true : false			
		// console.log('newestDate', newestDate, 'today', today, 'oldestDate', oldestDate, 'isRecent', isRecent, 'subtractAmount', subtractAmount, 'subtractAmount[timeFilterValue]', subtractAmount[timeFilterValue], timeFilterValue)
	// })
	}

	return returnObject.status
}
