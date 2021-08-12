// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
import React, {  useEffect, useState,  useContext } from 'react';
// import Accordion from 'react-bootstrap/Accordion'
import { MoistureContext } from '../contexts/MoistureContext'
// import Card from 'react-bootstrap/Card'
// import Form from 'react-bootstrap/Form'
// import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';
import {Accordion, AccordionDetails, AccordionSummary, Typography, Card, CardActions, CardContent, CardMedia } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/core/Autocomplete';
// import { styled, useTheme } from '@material-ui/core/styles';
// import Box from '@material-ui/core/Box';
// import MuiDrawer from '@material-ui/core/Drawer';
// import MuiAppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import List from '@material-ui/core/List';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
import {stnFuels} from '../data/fuelTypes'
import TagFilter from './TagFilter'
import RadioArea from './RadioArea'
import ColorByThresholdContent from './ColorByThresholdContentSingleRow'

const stnNames = []
for(var name in stnFuels){
  stnNames.push({name})
}
// console.log('stnNames', stnNames)


///okay, material UI is way better. Thinking will do persistent drawer on left hand side of page. Can click to expand and will have accordion with tabs for filter by 
//station and filter by fuel type. Instead of radio buttons will be text box with autocomplete. Would be cool to have multiople checkboxes on autocomplete thing so that coul
//see multiople stations or muliople fuel types. can also have a color by whatever thing for when I get live data in. 


const fuelTypes = [
  'Sagebrush-Mountain Big',
  '1000-Hour',
  'Douglas-Fir',
  'Duff (DC)',
  'Pine-Ponderosa',
  'Sagebrush-Threetip',
  'Sedge-Geyers',
  '10-Hour',
  'Bitterbrush-Antelope',
  'Juniper-Rocky Mountain',
  'Sagebrush-Basin Big',
  'Juniper-Utah',
  'Sagebrush-Wyoming Big',
  '100-Hour',
  'Pine-Lodgepole',
  'Oak-Gambel',
  'Pinyon-Twoneedle',
  'Wheatgrass-Crested',
  'Manzanita-Greenleaf',
  '1-Hour',
  'Ceanothus-Redstem',
  'Willow-Yellow',
  'Mahogany-Curl-Leaf Mountain',
  'Pinegrass',
  'Sagebrush-Silver',
  'Snowberry-Mountain',
  'Serviceberry-Utah',
  'Bilberry-Dwarf',
  'Sedge-Elk',
  'Fescue-Idaho',
  'Fir-Subalpine',
  'Spruce-Engelmann',
  'Fir-Grand',
  'Bitterbrush-Desert',
  'Needlegrass-Green',
  'Sagebrush-Black',
  'Ninebark-Pacific',
  'Willow-Scoulers',
  'Fir-White',
  'Whortleberry-Grouse',
  'Cherry-Choke',
  'Wildrye-Basin',
  'Maple-Bigtooth',
  'Sagebrush-Bigelows',
  'Aspen-Quaking',
  'Spruce-Blue',
  'Willow-Undergreen',
  'Douglas-Fir Rocky Mountain',
  'Buffaloberry-Silver',
  'Pine-Rocky Mountain Lodgepole',
  'Cheatgrass',
  'Huckleberry-Thinleaf',
  'Forage kochia',
  'Pinyon-Singleleaf',
  'Rocky Mountain Fir-Subalpine',
  'Juniper-Western',
  'Beargrass-Common',
  'Snowberry-Western',
  'Mahogany-Alderleaf Mountain',
  'Pine-Limber',
  'Yellow Rabbitbrush'
]


const fuelTypeObjThing = fuelTypes.sort().map(currType =>{return({name:currType})})
// console.log(fuelTypeObjThing, 'asdf')

// function CustomToggle({ children, eventKey }) {
//   const decoratedOnClick = useAccordionButton(eventKey, () =>
//     // console.log('totally custom!'),
//   );

//   return (
//     <div
//       onClick={decoratedOnClick}
//     >
//       {children}
//     </div>
//   );
// }

function Example(props) {
  const [collapseId, setCollapseId] = useState()
  const [isClosed, setIsClosed] = useState(true)
  // const [showNav, setShowNav] = useState(false);

  const context = useContext(MoistureContext)

  useEffect(() =>{
    // console.log('isClosed', isClosed)
    if(isClosed){
      setCollapseId('')
    }
    else(
      setCollapseId('navbarCollapse1')
     )
  },[isClosed])

  useEffect(() =>{
    // console.log('collapseId', collapseId)
  },[collapseId])

  // const toggle = useCallback(() => {
  //   // console.log('toggle')
  //   setIsClosed(v => !v);
  // }, []);
  // const context = useContext(MoistureContext)
  // useEffect(()=>{

  // console.log('this context', context)
  // },[context])
  return (
     // <MDBContainer>
     <>
     <Accordion>
      <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${props.i}a-content`}
          id={`panel${props.i}a-header`}
      >
        <Typography>Filter by Fuel Type</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TagFilter setter={context.setDisplayFuel} label={'Fuel Type'} optionList = {fuelTypeObjThing} />
      </AccordionDetails> 
    </Accordion>
    <Accordion>
      <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${props.i}a-content`}
          id={`panel${props.i}a-header`}
      >
        <Typography>Filter by Station Name</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TagFilter setter={context.setSelectedSites} label={'Station Name'} optionList = {stnNames} />
      </AccordionDetails> 
    </Accordion>
    <Accordion>
      <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${props.i}a-content`}
          id={`panel${props.i}a-header`}
      >
        <Typography>Filter by Time</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <RadioArea />
      </AccordionDetails> 
    </Accordion>
    <Accordion>
      <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${props.i}a-content`}
          id={`panel${props.i}a-header`}
      >
        <Typography>Color Station Based on Threshold</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ColorByThresholdContent fuelOptionList = {fuelTypeObjThing}/>
      </AccordionDetails> 
    </Accordion>

    </>
  );
}

export default function MapOptions(props){

  return(
    <>
      <Accordion>
      <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${props.i}a-content`}
          id={`panel${props.i}a-header`}
      >
        <Typography>Map Options</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Example />
      </AccordionDetails> 
    </Accordion>
    </>
    );
}


    // <MDBAccordion flush >
    //   <MDBAccordionItem collapseId='flush-collapse1' headerTitle='Filter by Fuel Type' className="mt-0 mb-0">
    //     {/*<FormPart />*/}
    //     <TagFilter setter={context.setDisplayFuel} label={'Fuel Type'} optionList = {fuelTypeObjThing} />
    //   </MDBAccordionItem>
    //   <MDBAccordionItem collapseId='flush-collapse2' headerTitle='Filter by Station Name'>
    //     <TagFilter setter={context.setSelectedSites} label={'Station Name'} optionList = {stnNames} />
    //   </MDBAccordionItem>
    //   <MDBAccordionItem collapseId='flush-collapse2' headerTitle='Filter by Time/Observation Value'>
    //     <RadioArea />
    //   </MDBAccordionItem>
      
    // </MDBAccordion>




// function NameFilter(){
//    return(
//             <Form>
//                <Autocomplete
//                   disablePortal
//                   id="combo-box-demo"
//                   options={['The Godfather', 'Pulp Fiction']}
//                   sx={{ width: 300 }}
//                   renderInput={(params) => <TextField {...params} label="Movie" />}
//                 />
//              </Form>  

//    )

// }

// function FormPart(){
//     const context = useContext(MoistureContext)
//   useEffect(()=>{

//   // console.log('this context', context)
//   },[context])
//  const handleClick = (inside) =>{
//    // console.log('no it didnt', inside)
//  }
//  const innerThings = fuelTypes.map((fuelType, i) => {
//    return(
//            <Form.Check
//             inline
//             key={i}
//             label={fuelType}
//             name="group1"
//             type={'radio'}
//             id={`inline-radio-${i}`}
//             onClick= {()=>context.setDisplayFuel(fuelType)}
//           />
//       )
//  })
//   return(
//             <Form>
//                {innerThings}

//              </Form>  

//    )
// }


                // <Form>
                //   <div key={`inline-radio`} className="mb-3">
                    // <Form.Check
                    //   inline
                    //   label="Sagebrush-Wyoming Big"
                    //   name="group1"
                    //   type={'radio'}
                    //   id={`inline-radio-1`}
                    //   onClick= {()=>context.setDisplayFuel('Sagebrush-Wyoming Big')}
                    // />
                //   </div>
                //   <div key={`inline-radio`} className="mb-3">
                //     <Form.Check
                //       inline
                //       label="All Fuels"
                //       name="group1"
                //       type={'radio'}
                //       id={`inline-radio-2`}
                //       onClick= {()=>context.setDisplayFuel('All')}
                //     />
                //   </div>
                //   <div key={`inline-radio`} className="mb-3">
                //     <Form.Check
                //       inline
                //       label="Pinyon-Singleleaf"
                //       name="group1"
                //       type={'radio'}
                //       id={`inline-radio-3`}
                //       onClick= {()=>context.setDisplayFuel('Pinyon-Singleleaf')}
                //     />
                //   </div>
                // </Form>  

// function FormPart(){
//   return(
//                 <Form>
//               {['checkbox', 'radio'].map((type) => (
//                 <div key={`inline-${type}`} className="mb-3">
//                   <Form.Check
//                     inline
//                     label="1"
//                     name="group1"
//                     type={type}
//                     id={`inline-${type}-1`}
//                   />
//                   <Form.Check
//                     inline
//                     label="2"
//                     name="group1"
//                     type={type}
//                     id={`inline-${type}-2`}
//                   />
//                   <Form.Check
//                     inline
//                     disabled
//                     label="3 (disabled)"
//                     type={type}
//                     id={`inline-${type}-3`}
//                   />
//                 </div>
//               ))}
//             </Form>
//    )
// }