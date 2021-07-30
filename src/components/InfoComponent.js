import { Suspense, lazy, useRef, useEffect, useState, useCallback, useContext } from 'react';
import { MoistureContext } from '../contexts/MoistureContext'
import MakeTabs from './MakeTabs'
import {stnFuels} from '../data/fuelTypes'
function InfoComponent(props){
	const context = useContext(MoistureContext)
	// console.log('stnFuels', props, stnFuels)
	useEffect(()=>{
		// console.log('context', context)
	},[context])
	return(
		<>
{/*			{context.selection ? JSON.stringify(context.selection) : 'no names brah'}
			<br />
			<a href="http://www.wfas.net/nfmd/add_data/add_site_data.php?gacc=EGBC&state=UT&grup=Fillmore%20Field%20Office&site=Black%20Cedar" target="blank">add data</a>
			<br />
			<img src="http://www.wfas.net/nfmd/graphs/img_Sagebrush,%20Mountain%20Big_Black%20Cedar_bimonthly.png" />*/}
			{context.selection && <MakeTabs stns={context.selection}/>}
		</>
	)
}

export default InfoComponent