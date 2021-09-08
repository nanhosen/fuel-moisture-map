import { useState, useEffect } from 'react';
import TabContent from './TabContent'
import {Tabs, Tab, Box} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles'

// const theme = createTheme({
//   palette: {
//     primary: {
//       main : "#F8C471",
//     },
//   },
// })

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box >
          {children}
        </Box>
      )}
    </div>
  );
}


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


function StationTabs(props) {
  const stations = props.stations;
  const defaultKey = stations[0]
  const [key, setKey] = useState(defaultKey);
  const [value, setValue] = useState(0);
  const theme = useTheme()



  useEffect(() =>{
      setValue(0)
    },[props])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabTopsExample = stations.map((station,i) =>
    <Tab label= {station} {...a11yProps(i)} key={i} />
  );
  // console.log('defaultKey', defaultKey)
  const tabBottoms = stations.map((station,i) =>
    <TabPanel value={value} index={i}><TabContent station={station} key={`${i}a`}/></TabPanel>
  );
  return (
    <Box sx={{ width: '100%' }}>
      {/*<Paper>*/}
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor={theme.primary} indicatorColor="primary" sx={{pb:'10px'}}>
          {tabTopsExample}
        </Tabs>
          {tabBottoms}
    </Box>
  );
}

export default function MakeTabs(props){
  const stationArray = props.stns
  // console.log('MakeTabsstns', props.stns, stationArray)
  return(
    <StationTabs stations={stationArray} />
  )
}



// function StationTabs(props) {
//   const stations = props.stations;
//   const defaultKey = stations[0]
//   const [key, setKey] = useState(defaultKey);
//   const [value, setValue] = useState(defaultKey);





//   useEffect(() =>{
//     console.log('props', props)
//       setKey(props.stations[0])
//     },[props])



//   // console.log('defaultKey', defaultKey)
//   const innerTabs = stations.map((station,i) =>
//     <Tab eventKey = {station} title={station} key={i}><TabContent station={station} /></Tab>
//   );
//   return (
//     <Box sx={{ width: '100%' }}>
//       <Tabs
//         id="controlled-tab-example"
//         activeKey={key}
//         onSelect={(k) => setKey(k)}
//         className="mb-3"
//       >
//         {innerTabs}
//       </Tabs>
//     </Box>
//   );
// }

// export default function MakeTabs(props){
//   const stationArray = props.stns
//   // console.log('MakeTabsstns', props.stns, stationArray)
//   return(
//     <StationTabs stations={stationArray} />
//   )
// }

