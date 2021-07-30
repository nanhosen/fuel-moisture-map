// import { Suspense, lazy, useRef, useEffect, useContext } from 'react';
import {  Vector as VectorLayer } from 'ol/layer.js'
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


function makeGeoJsonLayer(data, displayFuel) {
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
    style: styleFunction
  })

}

