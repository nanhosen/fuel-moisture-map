import {fullSiteMetadata} from '../data/siteMetadataWithImages'
import { Circle as CircleStyle, Fill, Stroke, Style, Icon, Text } from 'ol/style.js'

export default function returnColor(feature, displayFuel) {
  // console.log('fuel ty[e', displayFuel, feature.get('name'))
  const currSiteData = fullSiteMetadata[feature.get('name')]
  const currSiteFuelTypes = currSiteData?.fuels ? Object.keys(currSiteData.fuels) : null
  const hasFuel = currSiteFuelTypes ? currSiteFuelTypes.indexOf(displayFuel) : null
  // if(hasFuel>=0){

  // console.log(hasFuel,  displayFuel, feature.get('name'))
  // }
  return hasFuel>=0 || displayFuel == 'All' ? '#454446' : '#cfcfd0'


};
