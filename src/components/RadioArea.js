import React, { useState, useEffect, useContext } from 'react';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { MoistureContext } from '../contexts/MoistureContext'

export default function RadioArea(props) {
  const context = useContext(MoistureContext)
  // const {setter, label, optionList} = props
  const [selectedTime, setSelectedTime] = useState()
  const setTime = (period) =>{
    // console.log('setTime function triggered', period)
    setSelectedTime(period)
  }
  // console.log('props', label)
  // const context = useContext(MoistureContext)
  useEffect(() =>{
    // console.log('set time triggere from radio area component', props)
    context.setTimeFilters(selectedTime)
  },[selectedTime])

  // useEffect(() =>{
  //   // console.log('sites', sites)
  //   // context.setSelectedSites(sites.map(curr => curr.name))
  //  setter(sites.map(curr => curr.name))
  // },[sites])

  return (
    <FormControl component="fieldset">
      <RadioGroup row aria-label="timeAndObs" name="row-radio-buttons-group" defaultValue="all">
        <FormControlLabel value="twoWeeks" control={<Radio />} label="Past Two Weeks" value="twoWeeks" onChange={e=>{setTime('twoWeeks')}}/>
        <FormControlLabel value="oneMonth" control={<Radio />} label="Past Month" value="oneMonth" onChange={e=>{setTime('oneMonth')}}/>
        <FormControlLabel value="allTimes" control={<Radio />} label="All Times" value="all"  onChange={e=>{setTime(null)}}/>
      </RadioGroup>
    </FormControl>
      
  );
}

