//list of active filters
//object with function to determine color for each filter
//use function for each active filter
//then do check thing array thing for acrive filters or seomthign
// do something to check number of sites displayed and number of sites filtered
//also message or soemthing if all filtered and why

import {fullSiteMetadata} from '../data/siteMetadataWithImages'
import { Circle as CircleStyle, Fill, Stroke, Style, Icon, Text } from 'ol/style.js'
import {dashToComma} from './stringParsingThings'
import {checkFuelType, obsProcess, timeCheck, checkStationName, compareVal} from './stationFilterCheckers'

// returnColorNew(activeFilters, feature, displayFuel, displaySites, timeFilters, valFilters, colorFilterType, observedData[feature.get('name')])
export default function returnColorNew(allFilterStatus, feature, selectedFuelArray, displaySites, timeFilters, valFilters, colorFilterType, observedData,  fuelForAverage){
	// console.log('this fuel for average', fuelForAverage)
	// console.log(activeFilters, feature, displayFuel, displaySites, timeFilters, valFilters, colorFilterType, observedData[feature.get('name')],fuelForAverage)
	// console.log('inputs', allFilterStatus, feature, displayFuel, displaySites, timeFilters, valFilters, colorFilterType, observedData)
	// console.log('timeFilters', timeFilters)
	const currSiteName = feature.get('name')
	const currSiteData = fullSiteMetadata[currSiteName]
	const currSiteFuelTypes = currSiteData?.fuels ? Object.keys(currSiteData.fuels) : []
	// console.log('currSiteFuelTypes', currSiteFuelTypes)
	const processedObs = obsProcess(observedData, currSiteFuelTypes)
	const processInfoObj = {
		fuelFilter:checkFuelType(currSiteFuelTypes, selectedFuelArray),
		stationNameFilter:checkStationName(displaySites, currSiteName),
		timeFilters:timeCheck(processedObs.obDateInfo, timeFilters), 
		obComparisonFilter: compareVal(processedObs, colorFilterType, valFilters, fuelForAverage)
	}

	const activeFilters = []
	const functionStatusObj={}	
	for(var filterName in allFilterStatus){
		if(allFilterStatus[filterName]){
			activeFilters.push(filterName)
			functionStatusObj[filterName]=processInfoObj[filterName]
		}
	}
	// console.log('functionStatusObj', functionStatusObj)
	// console.log('active filters', activeFilters)

	const colorObj = {color: '#5F6A6A'}
	var hasFalse = false
	activeFilters.map(currFilter=>{
		if(!functionStatusObj[currFilter]){
				hasFalse = true
			}
	})
	if(activeFilters.indexOf('obComparisonFilter')>=0){
		// console.log('activeFilters', activeFilters)
		const colorr = getManyColors(functionStatusObj.obComparisonFilter[colorFilterType], colorFilterType)
		if(colorr){
			colorObj.color = colorr
		}
		else{
			colorObj.color='rgba(66, 60, 60, 0.04)'
		}
	}
	if(hasFalse){
		colorObj.color = 'rgba(66, 60, 60, 0.04)'
		// colorObj.color = '#cfcfd0'
	}

	return colorObj.color

}
// function getManyColors(hasThresh, activeFilters, functionStatusObj){
// 	const colorObj = {color: '#cfcfd0'}
// 	const meetsOneFilter = 
// 	if(hasThresh){
// 		if(threshType == 'average'){
// 			console.log('going to figure this out')
// 		}
// 		else if(threshType == 'threshold')
// 	}
// 	else{
// 		activeFilters.map(currFilter=>{
// 			if(functionStatusObj[currFilter]){
// 				colorObj.color = '#454446'
// 			}
// 		})
// 	}
// 	return colorObj.color
// }
// var color = meetsFilters ? '#454446' : '#cfcfd0'

function getManyColors(status, type){
	// console.log('status', status, 'type', type)
	const colorObj={
		average:{
			above:'#27AE60',
			at:'#A9DFBF',
			below:'#B03A2E',
		},
		threshold:{
			above:'#B03A2E',
			at:'#A9DFBF',
			below:'#27AE60',
		}
	}
	// console.log('color', colorObj[type][status])
 return colorObj[type][status] 
}

function getManyColorsAverage(status){
	// console.log('status', status)
	const colorObj={
		above:'#1E8449',
		at:'#A9DFBF',
		below:'#145A32',
	}
 return colorObj[status] 
}