import { Suspense, lazy, useRef, useEffect, useContext, useState } from 'react';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js'
import XYZ from 'ol/source/XYZ'
import VectorSource from 'ol/source/Vector.js'
import GeoJSON from 'ol/format/GeoJSON';
import View from 'ol/View';
import Map from 'ol/Map';
import '../App.css'
import createTextStyle from '../utils/getText'
import returnColor from '../utils/colorBySelectedFuel'
import returnColorNew from '../utils/colorBySelectedFuelRefactor'
import {Box, Grid, Paper, Card, Typography, CardContent} from '@material-ui/core';
import SvgIcon from '@material-ui/core/SvgIcon';

import { MoistureContext } from '../contexts/MoistureContext'
import { Circle as CircleStyle, Fill, Stroke, Style, Icon, Text } from 'ol/style.js'
import * as olSize from 'ol/size';
// const icon = require('ugh/nodata.png')
// console.log('icon', icon)
// const Map = lazy(() => import('ol/Map'))
// const View = lazy(() => import('ol/View'))


var mapboxLayer = new TileLayer({
  source: new XYZ({
    url: 'https://api.mapbox.com/styles/v1/nanhosen/ckcxziwe017vi1imsnzt1aucp/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibmFuaG9zZW4iLCJhIjoiY2ppZGExdDZsMDloNzN3cGVoMjZ0NHR5YyJ9.RYsPZGmajXULk-WtqvBNpQ'
    // url: 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibmFuaG9zZW4iLCJhIjoiY2ppZGExdDZsMDloNzN3cGVoMjZ0NHR5YyJ9.RYsPZGmajXULk-WtqvBNpQ'
  })
})
function makeGeoJsonLayer(data, displayFuel, displaySites, id, observedData, stationFuels, timeFilters, valFilters, colorFilterType, activeFilters, fuelForAverage, threshold, trend) {
  // if (!data) {
  //   // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
  // }
  // else (
  //   // console.log('nowImhere')
  // )
  // // console.log('data', data)g
  // console.log('makeGeoJsonLayer time', timeFilters)

  var dataSource = new VectorSource({
    features: (new GeoJSON()).readFeatures(data, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    })
  });

  const styleFunction = (feature, resolution) => {
  // console.log('average hereeee', fuelForAverage)  
  // console.log('observedData', observedData)
    // const categoryColor = returnColor(feature, displayFuel, displaySites, observedData[feature.get('name')], timeFilters, valFilters, colorFilterType)
    // const newColorThing = returnColorNew(activeFilters, feature, displayFuel, displaySites, timeFilters, valFilters, colorFilterType, observedData[feature.get('name')],fuelForAverage)
    // console.log(activeFilters, feature, displayFuel, displaySites, timeFilters, valFilters, colorFilterType, observedData[feature.get('name')],fuelForAverage)
    const categoryColor = returnColorNew('color', activeFilters, feature, displayFuel, displaySites, timeFilters, valFilters, colorFilterType, observedData[feature.get('name')],fuelForAverage, threshold)
    // console.log('categoryColor', categoryColor)
    // console.log('newColorThing', newColorThing)


    return new Style({
      image: new CircleStyle({
        radius: 10,
        fill: new Fill({
          color: categoryColor
        }),
        stroke: new Stroke({
          color: 'black',
          width: 0.5
        })
      }),
      text: createTextStyle(feature, resolution)
    })
  }

  const styleFunctionIconMap = (feature, resolution) => {
    const categoryColor = returnColorNew('trend', activeFilters, feature, displayFuel, displaySites, timeFilters, valFilters, colorFilterType, observedData[feature.get('name')],fuelForAverage)
    // console.log('dir', categoryColor)
    var rotation = 0
    var scale = 0.01
    if(categoryColor == 'up'){
      rotation = 3.1 //should be 3.1
      scale = 0.6
    }
    else if(categoryColor == 'down'){
      rotation = 0 //down i zero
      scale = 0.6
    }
    else if(categoryColor == 'flat'){
      rotation = 55 //should be 55
      scale = 0.6
    }
    const svgIcon = <SvgIcon>
             <g><rect fill="none" height="24" width="24"/></g><g><g><circle cx="12" cy="12" fill={categoryColor}  r="8"/><path fill="black" d="M12,2C6.47,2,2,6.47,2,12c0,5.53,4.47,10,10,10s10-4.47,10-10C22,6.47,17.53,2,12,2z M12,20c-4.42,0-8-3.58-8-8 c0-4.42,3.58-8,8-8s8,3.58,8,8C20,16.42,16.42,20,12,20z"/></g></g>

        </SvgIcon>
        var svgg = '<svg width="120" height="120" version="1.1" xmlns="http://www.w3.org/2000/svg">'
    + '<circle cx="5" cy="5" r="5"/>'
    + '</svg>';
    return new Style({
      image: new Icon(/** @type {olx.style.IconOptions} */ ({
            // anchor: [0.5, 0.5],
            crossOrigin: 'anonymous',
            src: 'https://fuel-moisture.s3.us-east-2.amazonaws.com/arrow_downward_black_24dp.svg',
            // src: 'data:image/svg+xml;utf8,' + svgg,
            color: 'black',
            scale:scale,
            rotation: rotation,
            opacity: 5
            // img: undefined,
            // imgSize: img ? [img.width, img.height] : undefined
          })),
        text: createTextStyle(feature,resolution)
    })
  }

  return new VectorLayer({
    source: dataSource,
    wrapX: false,
    minResolution: 0,
    maxResolution: 400000,
    visible: true,
    style: trend ? styleFunctionIconMap : styleFunction,
    id: id
  })

}

var olMap = new Map({
  layers: [
    mapboxLayer,
  ],
  target: null,
  view: new View({
    center: [-12704445.597223, 5053404.813990], //coordinates in EPSG3857 (x, y). Get new ones here: https://epsg.io/map#srs=3857&x=-12578783.122722&y=4902242.944054&z=10&layer=streets
    zoom: 6,
    projection: 'EPSG:3857'
  })
})

function MoistureMap(props){
  const mapContainer = useRef(null)
  const context = useContext(MoistureContext)
  const [timeFilterState, setTimeFilterState] = useState(context.timeFilters)
  const [fuelForAverage, setFuelForAverage] = useState()
  // const [activeFilters, setActiveFilters] = useState({
  //       fuelFilter: false,
  //       stationNameFilter: false,
  //       timeFilters: false,
  //       obComparisonFilter: false
  //     })

  useEffect(()=>{
    // const newObj = {...activeFilters}
    const newObj = {...context.allFilterStatus}
    const valIsSet = context.fuelValFilterObj
    // console.log('newObja', newObj, 'activeFilters', activeFilters)
    // const valIsPresent = valIsSet && !valIsSet[Object.keys(valIsSet)] || Object.keys(valIsSet) == 'null' ? false : true
    // console.log('context in here', context)
    if(context.colorFilterType){

              // console.log('effing color filter type', context.colorFilterType)
    }
    // console.log('should all be false', activeFilters, 'context.displayFuel.length', context.displayFuel.length)
    const fuelForAverage = context.displayFuel && context.displayFuel.length == 1 ? context.displayFuel[0] : null
    // console.log('fuelforavg', fuelForAverage, 'context.colorFilterType', context.colorFilterType, 'context.threshold', context.threshold,' !context.threshold', !context.threshold) 
    if(fuelForAverage && context.colorFilterType == 'average'){
      // console.log('what the fuuuuu')
      newObj['obComparisonFilter'] = true
    }
    else if(context.colorFilterType == 'threshold' && context.threshold && context.displayFuel.length == 1){
      newObj['obComparisonFilter'] = true
    }
    else{
      newObj['obComparisonFilter'] = false
    }
    context.displayFuel.length > 0 ? newObj['fuelFilter'] = true : newObj['fuelFilter'] = false 
    context.selectedSites && context.selectedSites.length > 0 ? newObj['stationNameFilter'] = true : newObj['stationNameFilter'] = false 
    typeof context.timeFilters == 'string' ? newObj['timeFilters'] = true : newObj['timeFilters'] = false 
    // context.colorFilterType == 'threshold' && valIsPresent || context.colorFilterType == 'average' && fuelForAverage ? newObj['obComparisonFilter'] = true : newObj['obComparisonFilter'] = false 
    // console.log('newobjb', newObj, 'activeFilters', activeFilters)
    // console.log('newobjb', newObj)
    // setActiveFilters(newObj)  
    context.setAllFilterStatus(newObj)

  },[context.selectedSites, context.timeFilters, context.displayFuel, context.colorFilterType, context.fuelValFilterObj, context.threshold, context.fuelForAverage])
  // useEffect(()=>{
  //   context.setAllFilterStatus(activeFilters)
  // },[activeFilters])

  useEffect(()=>{
    // console.log('context', context)
    if(context.dataPoints){
      const alreadyThere = checkForLayer(olMap, 'fuelMoisture')
      const alreadyThere1 = checkForLayer(olMap, 'trend')
      if(alreadyThere && alreadyThere.length >0){
        // console.log('need to remove', alreadyThere)
        alreadyThere.map(currLayer => olMap.removeLayer(currLayer))
        // console.log('layers now', olMap.getLayers())
      }
      if(alreadyThere1 && alreadyThere1.length >0){
        // console.log('need to remove', alreadyThere1)
        alreadyThere1.map(currLayer => olMap.removeLayer(currLayer))
        // console.log('layers now', olMap.getLayers())
      }
    // console.log('averageeeeeeeee', context.fuelForAverage)
      // console.log('sending this to addlayerthing', context.dataPoints, context.displayFuel, context.selectedSites, 'fuelMoisture', context.observedData, context.stnFuels, context.timeFilters, context.fuelValFilterObj)
      olMap.addLayer(makeGeoJsonLayer(context.dataPoints, context.displayFuel, context.selectedSites, 'fuelMoisture', context.observedData, context.stnFuels, context.timeFilters, context.fuelValFilterObj, context.colorFilterType, context.allFilterStatus, fuelForAverage, context.threshold))
      if(context.showArrows){

        olMap.addLayer(makeGeoJsonLayer(context.dataPoints, context.displayFuel, context.selectedSites, 'trend', context.observedData, context.stnFuels, context.timeFilters, context.fuelValFilterObj, context.colorFilterType, context.allFilterStatus, fuelForAverage, context.threshold, 'trend'))
      }
    }
    // const mapLayers = olMap.getLayers()?.array_
    // if(mapLayers){
    //   console.log('mapLayers', mapLayers)
    //   mapLayers.map(currLayer => {
    //     console.log(currLayer?.values_.id)
    //   })
    // }
    // else{
    //   // console.log('no data points here')
    // }
  }, [context.dataPoints, context.displayFuel, context.selectedSites, context.observedData, context.stnFuels, context.timeFilters, context.fuelValFilterObj, context.colorFilterType, context.allFilterStatus, context.fuelForAverage, context.threshold, context.showArrows])

  useEffect(()=>{
    // console.log('map', olMap.getLayers())
  },[olMap])

  useEffect(()=>{
    // console.log('context full update', context)
  },[context])

  useEffect(()=>{

    if(context.displayFuel.length !== 1){
      context.setColorFilterType(undefined)
    }
  },[context.displayFuel])


  useEffect(() => {
    // console.log('mapRef', mapContainer)
    // console.log('mapRef', mapContainer.current)
    olMap.setTarget(mapContainer.current)
    olMap.on('click', evt => {
      // console.log('clicked on the map', evt)
      const features = olMap.getFeaturesAtPixel(evt.pixel)
      // const layers = olMap.getLayers()
      if(features){
        // console.log('found features!', features)
        const names = features.map(currFeature =>{
          return currFeature.get('name') ? currFeature.get('name') : 'no name'
        })
        // console.log('names', names)
        context.setSelection(names && names.length>0 ? names : null)
      }
    })

    

  }, [])

  return (
    // <Container fluid style={{ height: `${props.height}px` }} className="noPadding">
    <>
      <div id="map" ref={mapContainer} style={{ height: `${props.height}px`}}></div>
    </>
    // </Container>
  )
}

export default MoistureMap

function checkForLayer(olMap, id){
  const mapLayers = olMap.getLayers()?.array_
  var matchingLayers
    if(mapLayers){
      matchingLayers = mapLayers.filter(currLayer => currLayer?.values_.id == id )

    }
  return matchingLayers    

}