// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
import React, { Suspense, lazy, useRef, useEffect, useState, useCallback, useContext, forwardRef } from 'react';
import Accordion from 'react-bootstrap/Accordion'
import { MoistureContext } from '../contexts/MoistureContext'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

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
function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log('totally custom!'),
  );

  return (
    <div
      onClick={decoratedOnClick}
    >
      {children}
    </div>
  );
}

function Example() {
  // const context = useContext(MoistureContext)
  // useEffect(()=>{

  // console.log('this context', context)
  // },[context])
  return (
    <Accordion>
      <Card>
        <Card.Header>
          <CustomToggle eventKey="0">Customize Map (Click To Expand)
          </CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <FormPart />
          </Card.Body>
        </Accordion.Collapse>
      </Card>

    </Accordion>
  );
}

export default function MapOptions(){

  return(<><Example /></>);
}


function FormPart(){
    const context = useContext(MoistureContext)
  useEffect(()=>{

  // console.log('this context', context)
  },[context])
 const handleClick = (inside) =>{
   console.log('no it didnt', inside)
 }
 const innerThings = fuelTypes.map((fuelType, i) => {
   return(
           <Form.Check
            inline
            label={fuelType}
            name="group1"
            type={'radio'}
            id={`inline-radio-${i}`}
            onClick= {()=>context.setDisplayFuel(fuelType)}
          />
      )
 })
  return(
            <Form>
               {innerThings}
             </Form>  

   )
}


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