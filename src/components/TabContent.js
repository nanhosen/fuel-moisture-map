import { useState, useEffect, useContext,  Suspense, lazy } from 'react';
import {imageLinks} from '../data/stationImages'
import {siteMetadata} from '../data/siteMetadata'
import {fullSiteMetadata} from '../data/siteMetadataWithImages'
// import CardColumns from 'react-bootstrap/CardColumns'
// import Card from 'react-bootstrap/Card'
// import Accordion from 'react-bootstrap/Accordion'
import {Accordion, AccordionDetails, AccordionSummary, Typography, Card, CardActions, CardContent, CardMedia } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import ListGroup from 'react-bootstrap/ListGroup'
// import Button from 'react-bootstrap/Button'
// import { MDBBtn } from 'mdb-react-ui-kit';
import {Button, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
// import { MoistureContext } from '../contexts/MoistureContext'
import { MoistureContext } from '../contexts/MoistureContext'
// const MoistureContext = lazy(() => import('../contexts/MoistureContext'))
const ObservationComponent = lazy(() => import('./ObservationComponent'))


// sx={{ border: '1px dashed #A3BCB6', color:"#3C403D", bgcolor:"#DADED4" }}
const useStyles = makeStyles({
  root: {
  	border: '1px dashed #A3BCB6',
  	color:"#3C403D", 
  	backgroundColor:"#FFFFFF",
  	"&:hover": {
		  backgroundColor: '#DADED4',
		  border: '1px #A3BCB6',
		  color:"#3C403D", 
		}
  },
});


export default function TabContent(props){
  const context = useContext(MoistureContext)
  const [fuels, setFuels] = useState()
  const [hasImages, setHasImages] = useState()
  const [linkUrl, setLinkUrl] = useState(false)
  const [linkInfo, setLinkInfo] = useState()

  const classes = useStyles();
  // const [station, setStation]
  useEffect(() =>{
  	// console.log('context', context)
  },[context])



   useEffect(() =>{
   	if(props.station && context.stnFuels){
   		// console.log(context.stnFuels[props.station])
   		if(context.stnFuels[props.station]){
   			setFuels(context.stnFuels[props.station])
   		}
   		if(imageLinks[props.station]){
   			// console.log(imageLinks[props.station])
   			setHasImages(true)
   		}
   	}
   },[props, context.stnFuels]) 

   useEffect(()=>{
   	console.log('new metadata', fullSiteMetadata[props.station])
   	if(siteMetadata[props.station]){
   		setLinkUrl(true)
   		setLinkInfo(siteMetadata[props.station])
   	}
   },[props.station])

	return(
		<>	
			<Suspense fallback={<div>Loading...</div>}>
				{linkUrl && 
					<Box>
						<Button sx={{mb:'10px'}} className={classes.root} href= {`http://www.wfas.net/nfmd/add_data/add_site_data.php?gacc=${linkInfo.gacc}&state=${linkInfo.state}&grup=${linkInfo.grup.replace(/ /g, '%20')}&site=${props.station.replace(/ /g, '%20')}`} target="blank" variant="outlined"  >Add Station Data (links to the NFMD)</Button>
					</Box>
				}		
				{
					fullSiteMetadata[props.station] && <MakeAccordionNewest station={props.station} fuels={fullSiteMetadata[props.station].fuels} />
				}
			</Suspense>	
		</>
	)
}



// the lame one will return this one
///////////////////////////////////////////////
// outer
///////////////////////////////////////

function MakeAccordionNewest(props){
	const [expanded, setExpanded] = useState()

	const handleChange = (panel) => (event, newExpanded) => {
		// console.log('handleChange', event, panel, newExpanded)
    setExpanded(newExpanded ? panel : false);
  };
  useEffect(()=>{
  	setExpanded()
  },[props.station])

	const fuels = props && props.fuels ?  Object.keys(props.fuels) : []
	// console.log('fuels', fuels, props.fuels)
	const accordionInner = fuels.map((currFuel, i) => {
		// console.log('props.fuels[currFuel]', props.fuels[currFuel])
		return (
		  <Accordion expanded={expanded === `panel${i}`} onChange={handleChange(`panel${i}`)}>
				<AccordionSummary
	          expandIcon={<ExpandMoreIcon />}
	          aria-controls={`panel${props.i}a-content`}
	          id={`panel${props.i}a-header`}
	      >
	      	<Typography>{currFuel}</Typography>
	      </AccordionSummary>
	      <AccordionDetails>
					<MakeAccordionNewInside fuelType={currFuel} station ={props.station} imageLinks={props.fuels[currFuel].imageLinks}/>
				</AccordionDetails>	
			</Accordion>
		)
	})
	return(
		<>
				{accordionInner}
		</>

	)
}
//////////////////////////////////
	// inner
/////////////////////////////
function MakeAccordionNewInside(props){
	const imageLinks = props.imageLinks
	const [expanded, setExpanded] = useState()

	const handleChange = (panel) => (event, newExpanded) => {
		// console.log('handleChange', event, panel, newExpanded)
    setExpanded(newExpanded ? panel : false);
  };
  useEffect(()=>{
  	setExpanded()
  },[props.station])

	const innerCards = imageLinks.map((currLink, i)=>{
		return(
			<Card key={i}>
				<a href={`http://www.wfas.net/nfmd/graphs/${currLink}`} target="blank">
					<CardMedia
		        component="img"
		        alt="NFMD Chart"
		        image={`http://www.wfas.net/nfmd/graphs/${currLink}`}
		        title="NFMD Chart"
		      />
	      </a>
		  </Card>
		    // <Card.Img variant="top" src={`http://www.wfas.net/nfmd/graphs/${currLink}`} />
		)
	})
	return(
		<>
			  <Accordion key={`1a`} expanded={expanded === `panel1`} onChange={handleChange(`panel1`)}>
			  	<AccordionSummary
	          expandIcon={<ExpandMoreIcon />}
	          aria-controls={`panel1a-content`}
	          id={`panel1a-header`}
	        >
			    	<Typography>Observations</Typography>
			    </AccordionSummary>	
			    <AccordionDetails>
				    <ObservationComponent station={props.station} fuelType={props.fuelType}/>

			    </AccordionDetails>
			  </Accordion> 
			  <Accordion key={`1b`} expanded={expanded === `panel2`} onChange={handleChange(`panel2`)}>
			  	<AccordionSummary
	          expandIcon={<ExpandMoreIcon />}
	          aria-controls={`panel1b-content`}
	          id={`panel1b-header`}
	        >
			    	<Typography>Charts</Typography>
			    </AccordionSummary>	
			    <AccordionDetails>
			    {/*Site Fuels: { fuels && fuels.toString().replace(/,/g, ', ')}*/}
			     {innerCards}

			    </AccordionDetails>
			  </Accordion> 
		  </>

	)
}

// function MakeAccordionNewLame(props){

// 	const fuels = props && props.fuels ?  Object.keys(props.fuels) : []
// 	// console.log('fuels', fuels, props.fuels)
// 	const accordionInner = fuels.map((currFuel, i) => {
// 		// console.log('props.fuels[currFuel]', props.fuels[currFuel])
// 		return (
// 			<MakeAccordionSingleFuel fuel={currFuel} imageLinks={props.fuels[currFuel].imageLinks} key={i} />
// 		)
// 	})
// 	return(
// 		<>
// 			{accordionInner}
// 		</>

// 	)
// }


// function MakeAccordionSingleFuel(props){
// 	const imageLinks = props.imageLinks
// 	const innerCards = imageLinks.map((currLink, i)=>{
// 		return(
// 			<Card key={i}>
// 		    <a href={`http://www.wfas.net/nfmd/graphs/${currLink}`} target="blank"><Card.Img variant="top" src={`http://www.wfas.net/nfmd/graphs/${currLink}`} /></a>
// 		  </Card>
// 		)
// 	})
// 	return(
// 		<>
// 			<Accordion >
// 		  	<AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls={`panel1a-content`}
//           id={`panel1a-header`}
//         >
// 		    	<Typography>{props.fuel}</Typography>
// 		    </AccordionSummary>	
// 		    <AccordionDetails>
// 		    	<MakeAnAccordion i={1} header={'Observations'} content={'Observations will go here'}/>
// 		    	<Accordion>
// 		    		<AccordionSummary
// 		          expandIcon={<ExpandMoreIcon />}
// 		          aria-controls={`panel3a-content`}
// 		          id={`panel3a-header`}
// 		        >
// 				    	<Typography>Charts</Typography>
// 				    </AccordionSummary>	
// 				    <AccordionDetails>
// 				    	<CardColumns>
// 								{innerCards}
// 							</CardColumns>
// 				    </AccordionDetails>

// 		    	</Accordion>
							    	
// 		    </AccordionDetails>
// 		  </Accordion> 
// 		</>

// 	)
// }


// function MakeAnAccordion(props){
// 	return(
// 		<Accordion>
// 			<AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls={`panel${props.i}a-content`}
//           id={`panel${props.i}a-header`}
//       >
//       	<Typography>{props.header}</Typography>
//       </AccordionSummary>
//       <AccordionDetails>
// 				{props.content}
// 			</AccordionDetails>	
// 		</Accordion>
// 	)
// }

// function MakeCardColumnSingle(props){
// 	// console.log('props', props)
// 	const fuels = props.fuels
// 	const linkInfo = props.setLinkInfo
// 	const imageLinks = props.imageLinks
// 	// console.log('image links here', imageLinks)
// 	const innerCards = imageLinks.map((currLink, i)=>{
// 		return(
// 			<Card key={i}>
// 		    <a href={`http://www.wfas.net/nfmd/graphs/${currLink}`} target="blank"><Card.Img variant="top" src={`http://www.wfas.net/nfmd/graphs/${currLink}`} /></a>
// 		  </Card>
// 		)
// 	})
// 	return(
// 		<CardColumns>
// 			{innerCards}
// 		</CardColumns>	

// 	)
// }

// 			// // <a href="http://www.wfas.net/nfmd/add_data/add_site_data.php?gacc=EGBC&state=UT&grup=Fillmore%20Field%20Office&site=Black%20Cedar" target="blank">add data</a>
// 			// // <br />
// 			// // <img src="http://www.wfas.net/nfmd/graphs/img_Sagebrush,%20Mountain%20Big_Black%20Cedar_bimonthly.png" />
// 			//             https://www.wfas.net/nfmd/graphs/img_Cassia%20Sage_Sagebrush,%20Silver_bimonthly.png
// 			//             https://www.wfas.net/nfmd/graphs/img_Sagebrush,%20Mountain%20Big_Cassia%20Sage_bimonthly.png
// 			//             https://www.wfas.net/nfmd/graphs/img_Cassia%20Sage_Fescue,%20Idaho_bimonthly.png
// 			//             https://www.wfas.net/nfmd/graphs/img_Bostetter_Pine,%20Lodgepole_bimonthly.png

// function MakeCardColumn(props){
// 	// console.log('props', props)
// 	const fuels = props.fuels
// 	const linkInfo = props.setLinkInfo
// 	const imageLinks = props.imageLinks
// 	// console.log('image links here', imageLinks)
// 	const innerCards = imageLinks.map((currLink, i)=>{
// 		return(
// 			<Card key={i}>
// 		    <a href={`http://www.wfas.net/nfmd/graphs/${currLink}`} target="blank"><Card.Img variant="top" src={`http://www.wfas.net/nfmd/graphs/${currLink}`} /></a>
// 		  </Card>
// 		)
// 	})
// 	return(
// 		<CardColumns>
// 			{innerCards}
// 		</CardColumns>	

// 	)
// }



// function MakeFuelList(props){
// 	const fuels=props.stnFuel
// 	const innerList = fuels.map((currFuel, i) => <ListGroup.Item key={i}>{currFuel}</ListGroup.Item>)
// 	return(
// 		<>
// 		<ListGroup horizontal={'lg'}>
// 			{innerList}
// 		</ListGroup>
// 		</>
// 	)
// }

// // function MakeCardColumn(props){
// // 	console.log('props', props)
// // 	const fuels = props.fuels
// // 	const linkInfo = props.setLinkInfo
// // 	const imageLinks = props.imageLinks
// // 	console.log('image links here', imageLinks)
// // 	const innerCards = imageLinks.map((currLink, i)=>{
// // 		return(
// // 			<Card key={i}>
// // 		    <Card.Img variant="top" src={`http://www.wfas.net/nfmd/graphs/${currLink}`} />
// // 		    <Card.Body>
// // 		      <Card.Title>Card title that wraps to a new line</Card.Title>
// // 		      <Card.Text>
// // 		        This is a longer card with supporting text below as a natural lead-in to
// // 		        additional content. This content is a little bit longer.
// // 		      </Card.Text>
// // 		    </Card.Body>
// // 		  </Card>
// // 		)
// // 	})
// // 	return(
// // 		<CardColumns>
// // 			{innerCards}
// // 		</CardColumns>	

// // 	)
// // }

// 				      // {fuels && <MakeFuelList stnFuel={fuels} />}



// 				// <Accordion defaultActiveKey="0">
// 				//   <Accordion.Item eventKey="0">
// 				//     <Accordion.Header>Site Fuels</Accordion.Header>
// 				//     <Accordion.Body>
// 				//     {/*Site Fuels: { fuels && fuels.toString().replace(/,/g, ', ')}*/}
// 				//     {fuels && <MakeFuelList stnFuel={fuels} />}

// 				//     </Accordion.Body>
// 				//   </Accordion.Item>
// 				//   <Accordion.Item eventKey="1">
// 				//     <Accordion.Header>Fuel Images</Accordion.Header>
// 				//     <Accordion.Body>
// 				//       {hasImages && <MakeCardColumn fuels={fuels} imageLinks={imageLinks[props.station]} />}
// 				//     </Accordion.Body>
// 				//   </Accordion.Item>
// 				//   <Accordion.Item eventKey="2">
// 				//     <Accordion.Header>Input Site Data</Accordion.Header>
// 				//     <Accordion.Body>
// 				//       {linkUrl && <a href={`http://www.wfas.net/nfmd/add_data/add_site_data.php?gacc=${linkInfo.gacc}&state=${linkInfo.state}&grup=${linkInfo.grup.replace(/ /g, '%20')}&site=${props.station.replace(/ /g, '%20')}`} target="blank">NFMD Input Link</a>}
// 				//     </Accordion.Body>
// 				//   </Accordion.Item>
// 				// </Accordion>  





// // function MakeAccordion(props){

// // 	const fuels = props && props.fuels ?  Object.keys(props.fuels) : []
// // 	// console.log('fuels', fuels, props.fuels)
// // 	const accordionInner = fuels.map((currFuel, i) => {
// // 		// console.log('props.fuels[currFuel]', props.fuels[currFuel])
// // 		return (
// // 		  <Accordion.Item eventKey={`"${i}"`}>
// // 		    <Accordion.Header>{currFuel}</Accordion.Header>
// // 		    <Accordion.Body>
// // 		    {/*Site Fuels: { fuels && fuels.toString().replace(/,/g, ', ')}*/}
// // 		     {<MakeCardColumn fuels={fuels} imageLinks={props.fuels[currFuel].imageLinks} />}

// // 		    </Accordion.Body>
// // 		  </Accordion.Item>

// // 		)
// // 	})
// // 	return(
// // 		<>
// // 			<Accordion flush>
// // 				<div id='here' style={{height:'200px'}}>
// // 				{accordionInner}
// // 				</div>
// // 			</Accordion>
// // 		</>

// // 	)
// // }				

// function MakeAccordion(props){

// 	const fuels = props && props.fuels ?  Object.keys(props.fuels) : []
// 	// console.log('fuels', fuels, props.fuels)
// 	const accordionInner = fuels.map((currFuel, i) => {
// 		// console.log('props.fuels[currFuel]', props.fuels[currFuel])
// 		return (
// 		  <Accordion key={i}>
// 		  	<AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls={`panel${i}a-content`}
//           id={`panel${i}a-header`}
//         >
// 		    	<Typography>{currFuel}</Typography>
// 		    </AccordionSummary>	
// 		    <AccordionDetails>
// 		    {/*Site Fuels: { fuels && fuels.toString().replace(/,/g, ', ')}*/}
// 		     {<MakeCardColumn fuels={fuels} imageLinks={props.fuels[currFuel].imageLinks} />}

// 		    </AccordionDetails>
// 		  </Accordion> 
// 		)
// 	})
// 	return(
// 		<>
// 				<div id='here' style={{height:'200px'}}>
// 				{accordionInner}
// 				</div>
// 		</>

// 	)
// }