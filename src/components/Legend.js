// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
import React, {  useEffect, useState,  useContext } from 'react';
import { MoistureContext } from '../contexts/MoistureContext'
// import Accordion from 'react-bootstrap/Accordion'
// import { MoistureContext } from '../contexts/MoistureContext'
// import Card from 'react-bootstrap/Card'
// import Form from 'react-bootstrap/Form'
// import { useAccordionButton } from 'react-bootstrap/AccordionButton';
// import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';
import {Accordion, AccordionDetails, AccordionSummary, Typography, Card, CardActions, CardContent, CardMedia, List, ListItem, Box } from '@material-ui/core'
import CircleSharpIcon from '@material-ui/icons/CircleSharp';
import Icon from '@material-ui/core/Icon';
import SvgIcon from '@material-ui/core/SvgIcon';
import { red, lightGreen, lightBlue } from '@material-ui/core/colors';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// const theme = createTheme({
//   palette: {
//     primary: {
//       // Purple and green play nicely together.
//       main: red[900],
//       legend:'orange'
//     },
//     secondary: {
//       // This is green.A700 as hex.
//       main: '#11cb5f', 
//     },
//   },
const filterItems = {
  none:{
    textAr: ["Station Present", "Station Missing"],
    colorAr:['#5F6A6A', 'rgba(66, 60, 60, 0.04)']
  },
  noColor:{
    textAr: ["Station Meets Filter Criteria", "Station Missing/Doesn't Meet Criteria"],
    colorAr:['#5F6A6A', 'rgba(66, 60, 60, 0.04)']
  },
  average:{
    textAr: ["No Data", "Below Average", "At Average", "Above Average"],
    colorAr:['rgba(66, 60, 60, 0.04)', '#B03A2E', '#A9DFBF', '#27AE60']
  },
  threshold:{
    textAr: ["No Data", "Below Threshold", "At Threshold", "Above Threshold"],
    colorAr:['rgba(66, 60, 60, 0.04)', '#27AE60', '#A9DFBF', '#B03A2E']
  }
}
export default function Legend(){
  const context=useContext(MoistureContext)
  const [legendType, setLegendType] = useState('none')
  const [filterInfo, setFilterInfo] = useState(filterItems['none'])

  useEffect(() =>{
    console.log('legendContext', context)
  },[context])
  useEffect(() =>{
    if(context.colorFilterType){
      setFilterInfo(filterItems[context.colorFilterType])
    }
    else{
      var filterCount = 0
      for(var filterType in context.allFilterStatus){
        const addAmt = context.allFilterStatus[filterType] ? 1 : 0
        filterCount = filterCount + addAmt
      }
      const setType = filterCount > 0 ? 'noColor' : 'none'
      setFilterInfo(filterItems[setType])
    }
  },[context.colorFilterType, context.allFilterStatus])
  const makeDots = filterInfo['textAr'].map((curr, i) =>{
    // return <ListItem justifyContent="center">{curr}<CircleSharpIcon sx={{color: filterInfo['colorAr'][i], outlineColor:'red'}}/></ListItem>
    return <ListItem justifyContent="center">{curr}<SvgIcon>
       <g><rect fill="none" height="24" width="24"/></g><g><g><circle cx="12" cy="12" fill={filterInfo['colorAr'][i]}  r="8"/><path fill="black" d="M12,2C6.47,2,2,6.47,2,12c0,5.53,4.47,10,10,10s10-4.47,10-10C22,6.47,17.53,2,12,2z M12,20c-4.42,0-8-3.58-8-8 c0-4.42,3.58-8,8-8s8,3.58,8,8C20,16.42,16.42,20,12,20z"/></g></g>

  </SvgIcon></ListItem>
  })
  return(
    <>
      <Card>
      <CardContent sx={{padding:'0px', pb:'0px', paddingBottom:'0px' }} style={{paddingBottom:'0px'}}>
       <List justifyContent="center" style={{ display: 'flex', flexDirection: 'row', padding: '0px', pb:'0px', justifyContent:'center' }}>
         {makeDots}
        </List>
      </CardContent>  
    </Card>
    </>
    );
}

// function MakeLegend(props){
//   return
// }

            // <ListItem justifyContent="center">Below Threshold<CircleSharpIcon sx={{color: red[900]}}/></ListItem>
            // <ListItem >At Threshold<CircleSharpIcon sx={{color: lightBlue[100]}}/></ListItem>
            // <ListItem >Above Threshold<CircleSharpIcon sx={{color: lightGreen[500]}}/></ListItem>

            // <g><rect fill="none" height="24" width="24"/></g><g><g><circle cx="12" cy="12" fill={filterInfo['colorAr'][i]}  r="8"/><path fill="black" d="M12,2C6.47,2,2,6.47,2,12c0,5.53,4.47,10,10,10s10-4.47,10-10C22,6.47,17.53,2,12,2z M12,20c-4.42,0-8-3.58-8-8 c0-4.42,3.58-8,8-8s8,3.58,8,8C20,16.42,16.42,20,12,20z"/></g></g>
