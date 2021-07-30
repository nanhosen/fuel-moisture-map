import { Suspense, lazy, useRef, useEffect, useContext } from 'react';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js'
import XYZ from 'ol/source/XYZ'
import VectorSource from 'ol/source/Vector.js'
import GeoJSON from 'ol/format/GeoJSON';
import { Container } from 'react-bootstrap';
import View from 'ol/View';
import Map from 'ol/Map';
import '../App.css'
import createTextStyle from '../utils/getText'
import returnColor from '../utils/colorBySelectedFuel'

import { MoistureContext } from '../contexts/MoistureContext'
import { Circle as CircleStyle, Fill, Stroke, Style, Icon, Text } from 'ol/style.js'
// const Map = lazy(() => import('ol/Map'))
// const View = lazy(() => import('ol/View'))


var mapboxLayer = new TileLayer({
  source: new XYZ({
    url: 'https://api.mapbox.com/styles/v1/nanhosen/ckcxziwe017vi1imsnzt1aucp/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibmFuaG9zZW4iLCJhIjoiY2ppZGExdDZsMDloNzN3cGVoMjZ0NHR5YyJ9.RYsPZGmajXULk-WtqvBNpQ'
    // url: 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibmFuaG9zZW4iLCJhIjoiY2ppZGExdDZsMDloNzN3cGVoMjZ0NHR5YyJ9.RYsPZGmajXULk-WtqvBNpQ'
  })
})

function makeGeoJsonLayer(data, displayFuel, id) {
  // if (!data) {
  //   // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
  // }
  // else (
  //   // console.log('nowImhere')
  // )
  // // console.log('data', data)g


  var dataSource = new VectorSource({
    features: (new GeoJSON()).readFeatures(data, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    })
  });

  const styleFunction = (feature, resolution) => {
    const categoryColor = returnColor(feature, displayFuel)
    return new Style({
      image: new CircleStyle({
        radius: 6,
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

  return new VectorLayer({
    source: dataSource,
    wrapX: false,
    minResolution: 0,
    maxResolution: 400000,
    visible: true,
    style: styleFunction,
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

  useEffect(()=>{
    // console.log('context', context)
    if(context.dataPoints){
      const alreadyThere = checkForLayer(olMap, 'fuelMoisture')
      if(alreadyThere && alreadyThere.length >0){
        console.log('need to remove', alreadyThere)
        alreadyThere.map(currLayer => olMap.removeLayer(currLayer))
        console.log('layers now', olMap.getLayers())
      }
      olMap.addLayer(makeGeoJsonLayer(context.dataPoints, context.displayFuel, 'fuelMoisture'))
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
  }, [context.dataPoints, context.displayFuel])

  useEffect(()=>{
    console.log('map', olMap.getLayers())
  },[olMap])


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
    <Container fluid style={{ height: `${props.height}px` }} className="noPadding">
      <div id="map" ref={mapContainer} style={{ height: `${props.height}px`}}>
        <div className="absBotRight"></div> </div>
    </Container>
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