// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
import React, {  useEffect, useState,  useContext } from 'react';
// import Accordion from 'react-bootstrap/Accordion'
// import { MoistureContext } from '../contexts/MoistureContext'
// import Card from 'react-bootstrap/Card'
// import Form from 'react-bootstrap/Form'
// import { useAccordionButton } from 'react-bootstrap/AccordionButton';
// import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';
import {Accordion, AccordionDetails, AccordionSummary, Typography, Card, CardActions, CardContent, CardMedia, List, ListItem, Box } from '@material-ui/core'
import CircleSharpIcon from '@material-ui/icons/CircleSharp';
import Icon from '@material-ui/core/Icon';
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
export default function Legend(props){

  return(
    <>
      <Card>
      <CardContent sx={{padding:'0px', pb:'0px', paddingBottom:'0px' }} style={{paddingBottom:'0px'}}>
       <List justifyContent="center" style={{ display: 'flex', flexDirection: 'row', padding: '0px', pb:'0px', justifyContent:'center' }}>
            <ListItem justifyContent="center">Below Threshold<CircleSharpIcon sx={{color: red[900]}}/></ListItem>
            <ListItem >At Threshold<CircleSharpIcon sx={{color: lightBlue[100]}}/></ListItem>
            <ListItem >Above Threshold<CircleSharpIcon sx={{color: lightGreen[500]}}/></ListItem>
        </List>
      </CardContent>  
    </Card>
    </>
    );
}

