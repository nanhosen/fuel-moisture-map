import { useState, useEffect, useContext } from 'react';
import { MoistureContext } from '../contexts/MoistureContext'
import {imageLinks} from '../data/stationImages'
import {siteMetadata} from '../data/siteMetadata'
import {fullSiteMetadata} from '../data/siteMetadataWithImages'
import CardColumns from 'react-bootstrap/CardColumns'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'


export default function TabContent(props){
  const context = useContext(MoistureContext)
  const [fuels, setFuels] = useState()
  const [hasImages, setHasImages] = useState()
  const [linkUrl, setLinkUrl] = useState(false)
  const [linkInfo, setLinkInfo] = useState()
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
   	// console.log('new metadata', fullSiteMetadata[props.station])
   	if(siteMetadata[props.station]){
   		setLinkUrl(true)
   		setLinkInfo(siteMetadata[props.station])
   	}
   },[props.station])

	return(
		<>	
		{linkUrl && <Button href= {`http://www.wfas.net/nfmd/add_data/add_site_data.php?gacc=${linkInfo.gacc}&state=${linkInfo.state}&grup=${linkInfo.grup.replace(/ /g, '%20')}&site=${props.station.replace(/ /g, '%20')}`} target="blank" variant="outline-dark">Update Station Data</Button>}
		{
			fullSiteMetadata[props.station] && <MakeAccordion fuels={fullSiteMetadata[props.station].fuels} />
		}
		</>
	)
}


function MakeAccordion(props){
	const fuels = Object.keys(props.fuels)
	// console.log('fuels', fuels, props.fuels)
	const accordionInner = fuels.map((currFuel, i) => {
		// console.log('props.fuels[currFuel]', props.fuels[currFuel])
		return (
		  <Accordion.Item eventKey={`"${i}"`}>
		    <Accordion.Header>{currFuel}</Accordion.Header>
		    <Accordion.Body>
		    {/*Site Fuels: { fuels && fuels.toString().replace(/,/g, ', ')}*/}
		     {<MakeCardColumn fuels={fuels} imageLinks={props.fuels[currFuel].imageLinks} />}

		    </Accordion.Body>
		  </Accordion.Item>

		)
	})
	return(
		<>
			<Accordion flush>
				{accordionInner}
			</Accordion>
		</>

	)
}

			// // <a href="http://www.wfas.net/nfmd/add_data/add_site_data.php?gacc=EGBC&state=UT&grup=Fillmore%20Field%20Office&site=Black%20Cedar" target="blank">add data</a>
			// // <br />
			// // <img src="http://www.wfas.net/nfmd/graphs/img_Sagebrush,%20Mountain%20Big_Black%20Cedar_bimonthly.png" />
			//             https://www.wfas.net/nfmd/graphs/img_Cassia%20Sage_Sagebrush,%20Silver_bimonthly.png
			//             https://www.wfas.net/nfmd/graphs/img_Sagebrush,%20Mountain%20Big_Cassia%20Sage_bimonthly.png
			//             https://www.wfas.net/nfmd/graphs/img_Cassia%20Sage_Fescue,%20Idaho_bimonthly.png
			//             https://www.wfas.net/nfmd/graphs/img_Bostetter_Pine,%20Lodgepole_bimonthly.png

function MakeCardColumn(props){
	// console.log('props', props)
	const fuels = props.fuels
	const linkInfo = props.setLinkInfo
	const imageLinks = props.imageLinks
	// console.log('image links here', imageLinks)
	const innerCards = imageLinks.map((currLink, i)=>{
		return(
			<Card key={i}>
		    <Card.Img variant="top" src={`http://www.wfas.net/nfmd/graphs/${currLink}`} />
		  </Card>
		)
	})
	return(
		<CardColumns>
			{innerCards}
		</CardColumns>	

	)
}

function MakeFuelList(props){
	const fuels=props.stnFuel
	const innerList = fuels.map((currFuel, i) => <ListGroup.Item key={i}>{currFuel}</ListGroup.Item>)
	return(
		<>
		<ListGroup horizontal={'lg'}>
			{innerList}
		</ListGroup>
		</>
	)
}

// function MakeCardColumn(props){
// 	console.log('props', props)
// 	const fuels = props.fuels
// 	const linkInfo = props.setLinkInfo
// 	const imageLinks = props.imageLinks
// 	console.log('image links here', imageLinks)
// 	const innerCards = imageLinks.map((currLink, i)=>{
// 		return(
// 			<Card key={i}>
// 		    <Card.Img variant="top" src={`http://www.wfas.net/nfmd/graphs/${currLink}`} />
// 		    <Card.Body>
// 		      <Card.Title>Card title that wraps to a new line</Card.Title>
// 		      <Card.Text>
// 		        This is a longer card with supporting text below as a natural lead-in to
// 		        additional content. This content is a little bit longer.
// 		      </Card.Text>
// 		    </Card.Body>
// 		  </Card>
// 		)
// 	})
// 	return(
// 		<CardColumns>
// 			{innerCards}
// 		</CardColumns>	

// 	)
// }

				      // {fuels && <MakeFuelList stnFuel={fuels} />}



				// <Accordion defaultActiveKey="0">
				//   <Accordion.Item eventKey="0">
				//     <Accordion.Header>Site Fuels</Accordion.Header>
				//     <Accordion.Body>
				//     {/*Site Fuels: { fuels && fuels.toString().replace(/,/g, ', ')}*/}
				//     {fuels && <MakeFuelList stnFuel={fuels} />}

				//     </Accordion.Body>
				//   </Accordion.Item>
				//   <Accordion.Item eventKey="1">
				//     <Accordion.Header>Fuel Images</Accordion.Header>
				//     <Accordion.Body>
				//       {hasImages && <MakeCardColumn fuels={fuels} imageLinks={imageLinks[props.station]} />}
				//     </Accordion.Body>
				//   </Accordion.Item>
				//   <Accordion.Item eventKey="2">
				//     <Accordion.Header>Input Site Data</Accordion.Header>
				//     <Accordion.Body>
				//       {linkUrl && <a href={`http://www.wfas.net/nfmd/add_data/add_site_data.php?gacc=${linkInfo.gacc}&state=${linkInfo.state}&grup=${linkInfo.grup.replace(/ /g, '%20')}&site=${props.station.replace(/ /g, '%20')}`} target="blank">NFMD Input Link</a>}
				//     </Accordion.Body>
				//   </Accordion.Item>
				// </Accordion>  