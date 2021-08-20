import { useState, useEffect, useContext,  Suspense, lazy } from 'react';
import TagFilter from './TagFilter'
import {TextField, Box, Tooltip, IconButton, Switch, FormLabel, FormControlLabel, InputAdornment   } from '@material-ui/core';
import Autocomplete from '@material-ui/core/Autocomplete';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { MoistureContext } from '../contexts/MoistureContext'
import PositionedSnackbar from './FormSnackbar'
import AlertDialog from './AlertDialog'
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   textField: {
//     marginLeft: theme.spacing(1),
//     marginRight: theme.spacing(1),
//     width: '25ch',
//   },
// }));
 const classes = {
 	  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: '1px',
    marginRight: '1px',
    width: '25ch',
  },
 }

export default function ColorByThresholdContent(props){

	const context = useContext(MoistureContext)
	const[filterObject, setFilterObject] = useState({})
	const [filterArray, setFilterArray] = useState([])
	const [numRows, setNumRows] = useState(1)
	const [valueArray, setValueArray] = useState([])
	const [filterValue, setFilterValue] = useState()
	const [selectedFuel, setSelectedFuel] = useState()
	const [averageFuel, setAverageFuel] = useState()
	

	useEffect(() => {
		// console.log('filterObject', filterObject)
		// context.setFuelValFilterObj(filterObject)
	},[filterObject])

	useEffect(() => {
		// console.log('filterArray changed', filterArray)
	},[filterArray])

	useEffect(() => {
		// console.log('numRows', numRows)
	},[numRows])

	useEffect(()=>{
		// console.log('context chagned', context)
	},[context])

	useEffect(()=>{
		const newFuel = selectedFuel == undefined ? null : selectedFuel
		// console.log('testObj', {[selectedFuel]:filterValue}, 'newFuel', newFuel)
		context.setFuelValFilterObj({[selectedFuel]:filterValue})
	},[filterValue, selectedFuel])

	useEffect(() =>{
		context.setFuelForAverage(averageFuel)
	},[averageFuel])

	const {fuelOptionList} = props
	const handleChange = (e, type, index)=>{
		console.log('i changed', type, e.target.textContent, e.target.value)
		const fuelType = e.target.textContent
		const val = type == 'value' ? e.target.value : undefined
		// console.log('val', val, !val)
		if(type == 'fuel'){
			setSelectedFuel(fuelType ? fuelType : null)
			if(fuelType){
				if(filterObject[fuelType]){
					console.log('uh oh, fuel aready there')
				}

				else{
				// setFilterObject({...filterObject, [fuelType]:{}})
				const newArray = filterArray
				newArray[index] = fuelType
				// console.log('newArray addint go filger array', newArray)
				setFilterArray(newArray)
				// setFilterObject({[fuelType]:null})
				}
			}
			else{
				setFilterObject({})
				setFilterArray([])
			}
		}
		else if(type == 'average'){
			const fuelTypeAvg = e.target.textContent
			console.log('fuelTypeAvg', fuelTypeAvg)
			setAverageFuel(fuelTypeAvg ? fuelTypeAvg : null)
		}
		else if(type == 'value'){
			setFilterValue(checkNum(val) ? val : null)
		}
		else if(type == 'value' && checkNum(val)){
			const newArray = [...valueArray]
			newArray[index] = val
			// console.log('newArray addint go filger array', newArray)
			setValueArray(newArray)
			if(filterArray.length>0){

				const valFuelType = filterArray[index]
				// if(filterObject[valFuelType]){
					// filterObject[valFuelType] = val
					// console.log('going to be setting')
					setFilterObject({...filterObject, [valFuelType]:val})
				// }
			}
			// if(val)
		}
		else if(type == 'val' && !val){
			setValueArray([])
		}
	}
	const changeRow = (augmentVal, type)=>{
		// console.log('i changed', augmentVal, type)
		const newVal = numRows + augmentVal >= 1 ? numRows + augmentVal : 1
		setNumRows(newVal)
		if(type == 'remove'){
			
			// console.log('delete type', augmentVal, numRows, type, filterObject, filterArray)
			const fuelTypeToDelete = numRows > 1 ? filterArray[newVal] : null
				// console.log('delte this fuel type', fuelTypeToDelete)

			if(fuelTypeToDelete){
				const newFilterObj = {...filterObject}
				// console.log('delte this fuel type', fuelTypeToDelete, 'newFilterObj', newFilterObj)
				delete newFilterObj[fuelTypeToDelete]
				// console.log('newFilterObj del', newFilterObj)
				setFilterObject(newFilterObj)
				const newFilterArray = [...filterArray]
				// console.log('setting FIlter Array', filterArray, newFilterArray)
				setFilterArray(removeItemOnce(newFilterArray, fuelTypeToDelete))
			}

		}
	}
	const componentAr = []
	let i=0
	while(i+1<=numRows){
		componentAr.push(<DropdownComponent changeHandler = {handleChange}  optionList = {fuelOptionList} index={i}  selectedFuel={selectedFuel}/>)
		i++
	}

	return(
		<>
			{
				componentAr
			}

		</>
	)
}


function DropdownComponent(props){
	// console.log('heree', props)
	const[isValDisabled, setIsValDisabled] = useState(true)
	const changeHandler = props.changeHandler
	const [showInside, setShowInside] = useState(false)
	const [showInsideAverage, setShowInsideAverage] = useState(false)
	const [showAverage, setShowAverage] = useState(false)
	const [showThresh, setShowThresh] = useState(false)
	const [elementSelected, setElementSelected] = useState(null)
	const [alertVisible, setAlertVisible] = useState(false)


	const context = useContext(MoistureContext)
	useEffect(()=>{
		const isDisabled = !props.selectedFuel ? true : false
		// console.log('isDisabled', isDisabled)
		setIsValDisabled(isDisabled)
	},[props.selectedFuel])
	const handleChange = (e)=>{
		// console.log('changed switch', e)
		if(e == 'avg'){
			console.log('average satte', showAverage, context)
			if(!showAverage && context.displayFuel.length>0){
				// console.log('I am going to remove stuff in selected fuel thing')
				setAlertVisible(true)
			}
			if(showAverage){
				console.log('i am going to remove average seelected fuel')
				context.setFuelForAverage()
			}
			setShowAverage(!showAverage)
		}
		else{
			setShowThresh(!showThresh)
			if(showThresh){
				console.log('i am remove selected thresh things')
				context.setFuelValFilterObj({undefined:undefined})
			}
		}
	}
	useEffect(()=>{
		if(showAverage){
			setShowThresh(false)
		}
	},[showAverage])

	useEffect(()=>{
		if(showAverage){
			context.setColorFilterType('average')
		}
		else{
			context.setColorFilterType(showThresh ? 'threshold' : null)
		}
	},[showAverage, showThresh])
	useEffect(()=>{
		if(showThresh){
			setShowAverage(false)
			setShowInside(true)
		}
		else{
			setShowInside(false)
		}
	},[showThresh])

useEffect(()=>{
		if(showAverage){
			setShowThresh(false)
			setShowInsideAverage(true)
		}
		else{
			setShowInsideAverage(false)
		}
	},[showAverage])

	const index = props.index
	return (
    <div className={classes.root}>
      <div>
      	<Box sx={{ display: 'flex', alignItems: 'flex-end', pb:'10px' }}>
	    		<FormControlLabel  control={<Switch checked={showAverage} onChange={e=>{handleChange('avg')}} />} label="Color By Comparison To Average" />
	    	</Box>
       	<Box
		      component="form"
		      sx={{ display: 'flex', alignItems: 'flex-end', pb:'10px' }}
		      noValidate
		    >
		    	{ showInsideAverage && 
			  		<>
			
						  <Autocomplete
							  disablePortal
							  id="combo-box-demo"
							  options={props.optionList}
							  size="small"
							  getOptionLabel={(option) => option.name}
							  renderInput={(params) => <TextField {...params} label="Fuel Type" />}
							  fullWidth = {true}
							  onChange={(e)=>{changeHandler(e, 'average', index)}}
							/>

				  </>  
				}
	    </Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', pb:'10px' }}>
    		<FormControlLabel control={<Switch  checked={showThresh} onChange={e=>{handleChange('thresh')}}/>} label="Color By Percent Threshold" />
    	</Box>
       <Box
		      component="form"
		      sx={{ display: 'flex', alignItems: 'flex-end', pb:'10px' }}
		      noValidate
		    >
			  { showInside && 
			  	<>
			
					  <Autocomplete
						  disablePortal
						  id="combo-box-demo"
						  options={props.optionList}
						  size="small"
						  getOptionLabel={(option) => option.name}
						  renderInput={(params) => <TextField {...params} label="Fuel Type" />}
						  fullWidth = {true}
						  onChange={(e)=>{changeHandler(e, 'fuel', index)}}
						/>
			      <TextField
			        id="outlined-number"
			        label="Threshold Value(%)"
			        // helperText="enter value in percent"
			        inputProps={{
		            startAdornment: <InputAdornment position="end">%</InputAdornment>,
		          }}
			        disabled={isValDisabled}
			          size="small"
			          onChange={(e)=>{changeHandler(e, 'value', index)}}
			          sx={{ml:'3px'}}
			      />

			  </>  
			}

	    </Box>
      </div>
    </div>
  );
}

// function DropdownInside(props){
// 	const inProps = props.props
// 	return(
// 		<>
			
// 			  <Autocomplete
// 				  disablePortal
// 				  id="combo-box-demo"
// 				  options={props.optionList}
// 				  size="small"
// 				  getOptionLabel={(option) => option.name}
// 				  renderInput={(params) => <TextField {...params} label="Fuel Type" />}
// 				  fullWidth = {true}
// 				  onChange={(e)=>{changeHandler(e, 'fuel', index)}}
// 				/>
// 	      <TextField
// 	        id="outlined-uncontrolled"
// 	        label="Threshold Value(%)"
// 	        disabled={isValDisabled}
// 	          size="small"
// 	          onChange={(e)=>{changeHandler(e, 'value', index)}}
// 	          sx={{ml:'3px'}}
// 	      />

// 	  </>  
// 	)
// }

function DropdownComponentOriginal(props){
	console.log('heree', props)
	const[isValDisabled, setIsValDisabled] = useState(true)
	const changeHandler = props.changeHandler
	// const rowHandler = props.rowHandler
	useEffect(()=>{
		const isDisabled = !props.selectedFuel ? true : false
		setIsValDisabled(isDisabled)
	},[props.selectedFuel])
	const index = props.index
	return(
		<>
			<Box
	      component="form"
	      sx={{ display: 'flex', alignItems: 'flex-end', pb:'10px' }}
	      noValidate
	    >
			  <Autocomplete
				  disablePortal
				  id="combo-box-demo"
				  options={props.optionList}
				  size="small"
				  getOptionLabel={(option) => option.name}
				  renderInput={(params) => <TextField {...params} label="Fuel Type" />}
				  fullWidth = {true}
				  onChange={(e)=>{changeHandler(e, 'fuel', index)}}
				/>
	      <TextField
	        id="outlined-uncontrolled"
	        label="Threshold Value(%)"
	        disabled={isValDisabled}
	          size="small"
	          onChange={(e)=>{changeHandler(e, 'value', index)}}
	          sx={{ml:'3px'}}
	      />
	    </Box>

	  </>  
	)
}



// function DropdownComponent(props){
// 	// console.log('heree', props.optionList)
// 	const[isValDisabled, setIsValDisabled] = useState(true)
// 	const changeHandler = props.changeHandler
// 	const rowHandler = props.rowHandler
// 	const index = props.index
// 	return(
// <Box
//       component="form"
//       sx={{ display: 'flex', alignItems: 'flex-end', pb:'10px' }}
//       noValidate
//     >
// 		  <Autocomplete
// 			  disablePortal
// 			  id="combo-box-demo"
// 			  options={props.optionList}
// 			  size="small"
// 			  getOptionLabel={(option) => option.name}
// 			  renderInput={(params) => <TextField {...params} label="Fuel Type" />}
// 			  fullWidth = {true}
// 			  onChange={(e)=>{changeHandler(e, 'fuel', index)}}
// 			/>
//       <TextField
//         id="outlined-uncontrolled"
//         label="Threshold Value"
//         disabled={false}
//           size="small"
//           onChange={(e)=>{changeHandler(e, 'value', index)}}
//           sx={{ml:'3px'}}
//       />
//       <Tooltip title='Add Filter Row'>
//       	<IconButton onClick={(e)=>{rowHandler(1, 'add')}}>
// 		      <AddIcon 
// 		      	fontSize='medium'
		 				
// 		      />
// 		    </IconButton>  
//       </Tooltip>
//       <Tooltip title='Delete Filter Row'>
//       	<IconButton onClick={(e)=>{rowHandler(-1, 'remove')}}>
// 		      <RemoveIcon 
// 		      	fontSize='medium'
		 				
// 		      />
// 		    </IconButton>  
//       </Tooltip>
//     </Box>
// 	)
// }

		// <Box
  //     component="form"
  //     sx={{
  //       '& > :not(style)': { m: 1, width: '25ch' },
  //     }}
  //     noValidate
  //     autoComplete="off"
  //   >
		 //  <Autocomplete
			//   disablePortal
			//   id="combo-box-demo"
			//   options={props.optionList}
			//   size="small"
			//   getOptionLabel={(option) => option.name}
			//   renderInput={(params) => <TextField {...params} label="Fuel Type" />}
			// />
		//   <TextField
		//     id="outlined-uncontrolled"
		//     label="Uncontrolled"
		//     defaultValue="foo"
		//   />
		// </Box>




// xport default function ComboBox() {
//   return (
//     <Autocomplete
//       disablePortal
//       id="combo-box-demo"
//       options={top100Films}
//       sx={{ width: 300 }}
//       renderInput={(params) => <TextField {...params} label="Movie" />}
//     />
//   );
// }

// // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
// const top100Films = [
//   { name: 'The Shawshank Redemption', year: 1994 },
//   { name: 'The Godfather', year: 1972 },
//   { name: 'The Godfather: Part II', year: 1974 },
//   { name: 'The Dark Knight', year: 2008 },
//   { name: '12 Angry Men', year: 1957 }]

function checkNum(num){
	var isNum = true
    if(num == null || typeof num == 'boolean' || isNaN(num)){
    	isNum = false
    }
    return isNum
}

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}