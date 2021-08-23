import React, { useState, useEffect, useContext } from 'react';
import {dashToComma} from '../utils/stringParsingThings'
// import { makeStyles } from '@material-ui/core/styles';
import {Table, Paper} from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell, { tableCellClasses } from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { styled } from '@material-ui/core/styles';
import { MoistureContext } from '../contexts/MoistureContext'

// import { DataGrid } from '@material-ui/data-grid';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
// const StyledTableCell = withStyles((theme) => ({
//   head: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   body: {
//     fontSize: 14,
//   },
// }))(TableCell);
// import { useDemoData } from '@material-ui/x-grid-data-generator';

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
// });

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function ObservationComponent(props) {
  const context = useContext(MoistureContext)
  const {station, fuelType} = props
  const [stationObs, setStationObs] = useState()
  const [latestOb, setLatestOb] = useState({Observation: '', Date: ''})
  useEffect(()=>{

    // console.log('obsCOntext', context)
    // console.log('obsCOntext', 'station', station, 'station obs', context.observedData[station], 'fuelType', dashToComma(fuelType),  'station fuel obs', context.observedData[props.station][fuelType])
    if(context.observedData[props.station][fuelType]){
      // console.log('trying commma', context.observedData[props.station][dashToComma(fuelType)])
      setStationObs(context.observedData[props.station][fuelType])
    }
    else{
      if(context.observedData[props.station][dashToComma(fuelType)]){
        setStationObs(context.observedData[props.station][dashToComma(fuelType)])
      }
      // console.log('trying commma', context.observedData[props.station][dashToComma(fuelType)])
    }
  },[context.observedData, station])
  useEffect(() =>{
    if(stationObs){
      setLatestOb({Observation: stationObs.obs[0], Date: stationObs.obDates[0]})
    }
    // console.log(station, fuelType, 'stationObs', stationObs)
  },[stationObs])

  useEffect(()=>{
    // console.log('station obs', stationObs)
  },[stationObs])
  // const {setter, label, optionList} = props
  const [selectedTime, setSelectedTime] = useState()
  const setTime = (period) =>{
    setSelectedTime(period)
  }
  // const classes = useStyles();
  // console.log('props', label)
  // const context = useContext(MoistureContext)
  // useEffect(() =>{
  //   context.setTimeFilters(selectedTime)
  // },[selectedTime])
  // console.log('new station', station)


  return (
    <>

      {stationObs && MakeObTable(stationObs)}

    </>
      
  );
}

const filterDate = (obDate, cutoffYear) =>{
  const year = obDate && new Date(obDate) && new Date(obDate).getFullYear >= cutoffYear ? true : false 
}
function MakeObTable(props){
  const {obDates, obs} = props
  // console.log('props', props, obDates, obs)
  const tableContents = []
  obs.map((currOb,i) => {
    if(i<20){tableContents.push(
          <StyledTableRow>
            <StyledTableCell  align="left">{obDates[i]}</StyledTableCell >
            <StyledTableCell  align="left">{currOb}% </StyledTableCell >
          </StyledTableRow>
        )}
  })
  return(
    <TableContainer component={Paper}>
      <Table style={{minWidth: 650}} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell >Date</StyledTableCell >
            <StyledTableCell  align="left">Value</StyledTableCell >
          </TableRow>
        </TableHead>
        <TableBody>
           {tableContents}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

// export default function XGridDemo() {
//   const { data } = useDemoData({
//     dataSet: 'Commodity',
//     rowLength: 100000,
//     editable: true,
//   });

//   return (
//     <div style={{ height: 520, width: '100%' }}>
//       <XGrid
//         {...data}
//         loading={data.rows.length === 0}
//         rowHeight={38}
//         checkboxSelection
//         disableSelectionOnClick
//       />
//     </div>
//   );
// }