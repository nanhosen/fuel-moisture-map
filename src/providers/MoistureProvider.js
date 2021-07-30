

import React, { useState, useEffect } from 'react'
import { MoistureContext } from '../contexts/MoistureContext'
import axios from 'axios'
import {stnFuels} from '../data/fuelTypes'

export default function MapProvider({ children }) {
  const [map, setMap] = useState()
  const [windowHeight, setWindowHeight] = useState(window.innerHeight-55)
  const [dataPoints, setDataPoints] = useState()
  const [selection, setSelection] = useState()
  const [displayFuel, setDisplayFuel] = useState('All')
  const [pointLayer, setPointLayer] = useState()
  // const [activeContent, setActiveContent] = useState('aqMap') 
  // const [activeContent, setActiveContent] = useState('nrSfc') 

  useEffect(() => {
    const getPoints = async () => {
      // console.log('getting text data')
      const textData = await axios.get('https://fuel-moisture.s3.us-east-2.amazonaws.com/site-locations.geojson')
      // console.log('textData', textData)
      setDataPoints(textData.data)
    }
    getPoints()
  }, [])

  // useEffect(() => {
  // 	const getText = async() =>{
  // 		const textData = await axios.get('https://sxhwincc37.execute-api.us-west-1.amazonaws.com/dev/getInfo')
  // 		setTextInfo(textData.data)
  // 	}
  // 	const getAqiData = async() =>{
  // 		const airData = await axios.get('https://sxhwincc37.execute-api.us-west-1.amazonaws.com/dev/getAirQuality')
  // 		console.log('airData from provider', airData)
  // 		setAqiData(airData.data)
  // 	}
  // 	const getSmokeLayer = async() => {
  // 		const smokeData = await axios.get('https://s3-us-west-2.amazonaws.com/airfire-data-exports/hms/v1/geojson/latest_smoke.geojson')
  // 		console.log('smokeData from provider', smokeData)
  // 		setSmokeData(smokeData.data)
  // 	}
  // 	const getFires = async() => {
  // 		const latestFires = await axios.get('https://s3-us-west-2.amazonaws.com/airfire-data-exports/maps/NIFC/points/latest_nifc_points.geojson')
  // 		setFirePoints(latestFires.data)
  // 	}

  // 	getText()
  // 	getAqiData()
  // 	getSmokeLayer()
  // 	getFires()
  // },[])

  // const requestAndSet = async dataSourceInfo => {
  //   // console.log('dataSourceInfo', dataSourceInfo)
  //   const { url, setter } = dataSourceInfo
  //   let dataBack = await axios.get(url)
  //     .then(res => {
  //       // console.log('res', res.data, dataSourceInfo, res)
  //       setter(res.data)
  //     })
  // }

  // useEffect(() => {
  //   const urlObject = {
  //     textData: {
  //       url: 'https://sxhwincc37.execute-api.us-west-1.amazonaws.com/dev/getInfo/',
  //       setter: setTextInfo,
  //       name: 'TextData'
  //     },
  //     aqData: {
  //       url: 'https://sxhwincc37.execute-api.us-west-1.amazonaws.com/dev/getAirQuality',
  //       setter: setAqiData,
  //       name: 'aqData'
  //     },
  //     smokeLayer: {
  //       url: 'https://s3-us-west-2.amazonaws.com/airfire-data-exports/hms/v1/geojson/latest_smoke.geojson',
  //       setter: setSmokeData,
  //       name: 'smoke data'
  //     },
  //     fireData: {
  //       url: 'https://s3-us-west-2.amazonaws.com/airfire-data-exports/maps/NIFC/points/latest_nifc_points.geojson',
  //       setter: setFirePoints,
  //       name: 'fire data'
  //     },
  //     visiblityData: {
  //       url: 'https://sxhwincc37.execute-api.us-west-1.amazonaws.com/dev/metarData',
  //       setter: setVisiblityData,
  //       name: 'visibility data'
  //     }
  //   }
  //   async function getAllData() {
  //     const objKeys = Object.keys(urlObject)
  //     const returnedData = await Promise.allSettled(
  //       objKeys.map(dataType => {
  //         // console.log('dataType', dataType)
  //         requestAndSet(urlObject[dataType])
  //       })
  //     )
  //   }
  //   getAllData()

  // }, [])

  // useEffect(() => {
  //   if (textInfo && textInfo.updateTime) {

  //     setUpdateTime(new Date(textInfo.updateTime))
  //   }
  // }, [textInfo])

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      // setWindowSize({
      //   width: window.innerWidth,
      //   height: window.innerHeight,
      // });
      setWindowHeight(window.innerHeight-55)
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return (
    <MoistureContext.Provider value={{ map, setMap, windowHeight, dataPoints, selection, setSelection, stnFuels, displayFuel, setDisplayFuel, pointLayer, setPointLayer}}>
      {children}
    </MoistureContext.Provider>
  )
}
