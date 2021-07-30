import { useState, useEffect } from 'react';
import TabContent from './TabContent'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'



function StationTabs(props) {
  const stations = props.stations;
  const defaultKey = stations[0]
  const [key, setKey] = useState(defaultKey);





	useEffect(() =>{
	  	setKey(props.stations[0])
	  },[props])



  // console.log('defaultKey', defaultKey)
  const innerTabs = stations.map((station,i) =>
    <Tab eventKey = {station} title={station} key={i}><TabContent station={station} /></Tab>
  );
  return (
  	<Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
  		{innerTabs}
  	</Tabs>
  );
}

export default function MakeTabs(props){
	const stationArray = props.stns
	// console.log('MakeTabsstns', props.stns, stationArray)
	return(
		<StationTabs stations={stationArray} />
	)
}

