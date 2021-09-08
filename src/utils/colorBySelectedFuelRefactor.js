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
// olMap.addLayer(makeGeoJsonLayer(context.dataPoints, context.displayFuel, context.selectedSites, 'fuelMoisture', context.observedData, context.stnFuels, context.timeFilters, context.fuelValFilterObj, context.colorFilterType, context.allFilterStatus, context.fuelForAverage))
               // makeGeoJsonLayer(        data,               displayFuel,         displaySites,   id,                    observedData,          stationFuels,    timeFilters,         valFilters,               colorFilterType,         activeFilters,           fuelForAverage, trend) {
               	// returnColorNew(        activeFilters,   feature, displayFuel,       displaySites, timeFilters, valFilters, colorFilterType, observedData[feature.get('name')],fuelForAverage)
export default function returnColorNew(returnType, allFilterStatus, feature, selectedFuelArray, displaySites, timeFilters, valFilters, colorFilterType, observedData,  fuelForAverage, threshold){
		// console.log('returnType', returnType, 'allFilterStatus', allFilterStatus, 'feature', feature, 'selectedFuelArray', selectedFuelArray, 'displaySites', displaySites, 'timeFilters', timeFilters, 'valFilters', valFilters, 'colorFilterType', colorFilterType, 'observedData', observedData,  'fuelForAverage', fuelForAverage, threshold)
	// console.log('this fuel for average', fuelForAverage)
	// console.log(activeFilters, feature, displayFuel, displaySites, timeFilters, valFilters, colorFilterType, observedData[feature.get('name')],fuelForAverage)
	// console.log('inputs', allFilterStatus, feature, displayFuel, displaySites, timeFilters, valFilters, colorFilterType, observedData)
	// console.log('timeFilters', timeFilters)
	// console.log('allFilterStatus', allFilterStatus)
	const selectedFuel = selectedFuelArray && selectedFuelArray.length == 1 ? selectedFuelArray[0] : null
	// console.log('selectedFuel', selectedFuel)
	const currSiteName = feature.get('name')
	const currSiteData = fullSiteMetadata[currSiteName]
	const currSiteFuelTypes = currSiteData?.fuels ? Object.keys(currSiteData.fuels) : []
	// console.log('currSiteFuelTypes', currSiteFuelTypes)
	const processedObs = obsProcess(observedData, currSiteFuelTypes)
	const processInfoObj = {
		fuelFilter:checkFuelType(currSiteFuelTypes, selectedFuelArray),
		stationNameFilter:checkStationName(displaySites, currSiteName),
		timeFilters:timeCheck(processedObs.obDateInfo, timeFilters), 
		obComparisonFilter: compareVal(processedObs, colorFilterType, threshold, selectedFuel)
	}

	const activeFilters = []
	const functionStatusObj={}	
	for(var filterName in allFilterStatus){
		if(allFilterStatus[filterName]){
			activeFilters.push(filterName)
			functionStatusObj[filterName]=processInfoObj[filterName]
		}
	}

	const trendObj = {trend:false}
	if(processedObs['latesObTrend']){
		if( processedObs['latesObTrend'][selectedFuel] > 0){
			trendObj.trend = 'down'
		}
		else if( processedObs['latesObTrend'][selectedFuel] == 0){
			trendObj.trend='flat'
		}
		else if( processedObs['latesObTrend'][selectedFuel] <0){
			trendObj.trend='up'
		}

	// console.log('processedObs', processedObs['latesObTrend'][selectedFuel])
	}
	// console.log('active filters', activeFilters)

	const colorObj = {color: '#5F6A6A'}
	var hasFalse = false
	activeFilters.map(currFilter=>{
		// console.log('currFilter', currFilter, 'functionStatusObj', functionStatusObj, 'this', functionStatusObj[currFilter])
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

	return returnType == 'color' ? colorObj.color : trendObj.trend

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
// 
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
	// console.log('color', 'type', type, 'status', status, 'colorObj', colorObj)
 return colorObj[type][status] 
}
// 
function getManyColorsAverage(status){
	// console.log('status', status)
	const colorObj={
		above:'#1E8449',
		at:'#A9DFBF',
		below:'#145A32',
	}
 return colorObj[status] 
}