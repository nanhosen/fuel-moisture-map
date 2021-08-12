import React, { Suspense, lazy, useRef, useEffect, useState, useCallback, useContext, forwardRef } from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/core/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Stack from '@material-ui/core/Stack';


export default function Tags(props) {
  const {setter, label, optionList} = props
  // console.log('props', label)
  // const context = useContext(MoistureContext)
  const [sites, setSites] = useState([])
  // useEffect(() =>{
  //   console.log('context', context)
  // },[context])

  useEffect(() =>{
    // console.log('sites', sites)
    // context.setSelectedSites(sites.map(curr => curr.name))
   setter(sites.map(curr => curr.name))
  },[sites])

  return (
      <Autocomplete
        multiple
        id="tags-standard"
        options={optionList}
        getOptionLabel={(option) => option.name}
        defaultValue={[]}
        onChange={(event, value, reason,details)=>{setSites(value)}}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label={label}
            placeholder=""
          />
        )}
      />
      
  );
}

