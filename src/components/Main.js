import { Suspense, lazy, useRef,  useState, useContext, useEffect } from 'react';
// import Card from 'react-bootstrap/Card'
// import Tabs from 'react-bootstrap/Tabs'
// import Tab from 'react-bootstrap/Tab'
// import Form from 'react-bootstrap/Form'
// import ListGroup from 'react-bootstrap/ListGroup'
// import ListGroupItem from 'react-bootstrap/ListGroupItem'
// import Accordion from 'react-bootstrap/Accordion'
import '../App.css'
import { MoistureContext } from '../contexts/MoistureContext'
import MapOptions from './DropdownMapOptions'
import Legend from './Legend'
import { MDBRow, MDBCol, MDBCard, MDBCardBody,  MDBCardText, MDBContainer } from "mdb-react-ui-kit";
import {Box, Grid, Paper, Card, Typography, CardContent} from '@material-ui/core';
// import MoistureMap from './MoistureMap.js'
// import Drawer from '@material-ui/core/Drawer';
// import Button from '@material-ui/core/Button';
// import Slide from '@material-ui/core/Slide';
// import { styled, useTheme } from '@material-ui/core/styles';
const Container = lazy(() => import('react-bootstrap/Container'))
// const Nav = lazy(() => import('react-bootstrap/Nav'))
const InfoComponent = lazy(()=>import('./InfoComponent'))
const MoistureMap = lazy(() => import('./MoistureMap'))
// const LeftDrawer = lazy(() => import('./LeftDrawer'))
// const Row = lazy(() => import('react-bootstrap/Row'))
// const Col = lazy(() => import('react-bootstrap/Col'))

// const drawerWidth = 240;


function Main(props) {
  const windowHeight = props.height
  const colRef = useRef(null)
  // const [width, setWidth] = useState()
  const context = useContext(MoistureContext)

  useEffect(()=>{
    // console.log('fuelValFilterObj', context.fuelValFilterObj, )
  },[context.fuelValFilterObj])

  // const [isOpen, setIsOpen] = useState(true);
  // const [drawerWidth, setDrawerWidth] = useState(0.1)
  // const [maxWidth, setMaxWidth] = useState(5)
// 
  // const toggle = () => {
  //   setIsOpen(!isOpen);
  // }

  // useEffect(()=>{
  //   setMaxWidth(isOpen ? 10 : 5)
  //   setDrawerWidth(isOpen ? 20 : 1)
  // },[isOpen])

  // useEffect(()=>{
  //   if(colRef.current?.clientWidth){
  //     setWidth(colRef.current.clientWidth)
  //   }
  // },[props])

  // useEffect(()=>{
  //   // console.log('main context', context, !context.selection)
  // },[context])

  return (
    <div className="h-100 App" style={{ width: '100%', height: '100%' }}>
      <Suspense fallback={<div>Loading...</div>}>
        <Box fluid  >
          <Grid container spacing={1} >
            <Grid item md={6}  ref={colRef}>
              <Paper ref={colRef}>

                {/*<MDBCardBody>*/}
                <MapOptions />

                <MoistureMap height={windowHeight}  width={props.width} className="h-100"></MoistureMap>
                {context.colorFilterType && <Box sx={{position:'relative', bottom:'0px'}}><Legend  /></Box>}
                
                {/*</MDBCardBody>*/}
              </Paper>
            </Grid>
            <Grid item md={6}>
              <Paper>
                    <Suspense fallback={<div>Loading...</div>}>
                      {(() => {
                        if (context.selection) {
                          return <InfoComponent />
                        } else {
                          return (
                            <>
                              <Card>
                                <CardContent>
                                <Typography sx={{ fontSize: 16 }}>
                                  Click Station on Map to View Fuel Images and Information
                                </Typography>
                                <hr />
                                <Typography sx={{ fontSize: 16 }}>
                                  Zoom in to see Station Names.
                                </Typography>
                                </CardContent>
                              </Card>
                            </>
                          )
                        }
                      })()}
                    </Suspense>
                </Paper>
              </Grid>   
          </Grid>
        </Box>      
      </Suspense>
    </div>
  );
}

export default Main;

//   return (
//     <div className="h-100 App" style={{ width: '100%', height: '100%' }}>
//       <Suspense fallback={<div>Loading...</div>}>
//         <div className="d-flex bd-highlight example-parent">
//         <div className="p-2 flex-fill bd-highlight col-example" style={{minWidth:`1em`, maxWidth:`${maxWidth}em`}}>
//           <MDBCard  m={0}>
//             <Slide direction="right" in={true} mountOnEnter unmountOnExit>
//               <div className={'hum'}>
//                   side here
//               </div>
//             </Slide>
//           </MDBCard>
//         </div>
//         <div className="p-2 flex-fill bd-highlight col-example" style={{maxWidth:'50em'}}>
//               <MDBCard>

//               {/*<MDBCardBody>*/}
//               <MapOptions />
//               // <Button variant="contained" color="primary" onClick={toggle}>Toggle</Button>
//               {/*<LeftDrawer />*/}
//               <Slide direction="right" in={isOpen} mountOnEnter unmountOnExit>
//       <div className={'hum'}>
//         side here
//       </div>
//     </Slide>
//                   <MoistureMap height={windowHeight}  className="h-100"></MoistureMap>
//                   {/*</MDBCardBody>*/}
//               </MDBCard>
//           </div>
//           <div className="p-2 flex-fill bd-highlight col-example" style={{maxWidth:'50em'}}>     
//               <MDBCard>
//                 <MDBCardBody>
//                   <Suspense fallback={<div>Loading...</div>}>
//                     {(() => {
//                       if (context.selection) {
//                         return <InfoComponent />
//                       } else {
//                         return (
//                           <>
//                             <MDBCardText>Click Station on Map to View Fuel Images and Information</MDBCardText>
//                             <hr />
//                             <MDBCardText>Zoom in to see Station Names.</MDBCardText>
//                           </>
//                         )
//                       }
//                     })()}
//                   </Suspense>
//                 </MDBCardBody>
//               </MDBCard>
//           </div>    
//         </div>      
//       </Suspense>
//     </div>
//   );
// }

// export default Main;




  // return (
  //   <div className="h-100 App" style={{ width: '100%', height: '100%' }}>
  //     <Suspense fallback={<div>Loading...</div>}>
  //       <Container fluid >
  //         <Row >
  //           <Col md={6}  ref={colRef} >
  //             <Card>
  //             <Card.Body>
  //             <Card.Title>Card Title</Card.Title>
  //                 <MoistureMap height={windowHeight}  className="h-100" />
  //                 </Card.Body>
  //             </Card>
  //           </Col>
  //           <Col md={6}>
  //             <Card>
  //               <Card.Body>
  //                 <Suspense fallback={<div>Loading...</div>}>
  //                   <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
  //                     <Tab eventKey="home" title="Home">
  //                       <InfoComponent />
  //                     </Tab>
  //                     <Tab eventKey="profile" title="Profile">
  //                       !
  //                     </Tab>
  //                     <Tab eventKey="contact" title="Contact" disabled>
  //                       hello!
  //                     </Tab>
  //                   </Tabs>
  //                 <Card.Title>Card Title</Card.Title>
  //                   <InfoComponent />
  //                 </Suspense>
  //               </Card.Body>
  //             </Card>
  //           </Col>
  //         </Row>
  //       </Container>
  //     </Suspense>
  //   </div>
  // );


  // return (
  //   <div className="h-100 App" style={{ width: '100%', height: '100%' }}>
  //     <Suspense fallback={<div>Loading...</div>}>
  //       <Container fluid style={{paddingLeft: '0px', paddingRight:'0px'}} >
  //         <Row >
  //           <Col md={8} style={{paddingLeft: '0px', paddingRight:'0px'}} ref={colRef} >
  //             <Card>
  //             <Card.Body>
  //                 <MoistureMap height={windowHeight} width={width} className="h-100" />
  //                 </Card.Body>
  //             </Card>
  //           </Col>
  //           <Col md={4}>
  //             <Card>
  //               <Card.Body>
  //                 <Suspense fallback={<div>Loading...</div>}>
  //                   <InfoComponent />
  //                 </Suspense>
  //               </Card.Body>
  //             </Card>
  //           </Col>
  //         </Row>
  //       </Container>
  //     </Suspense>
  //   </div>
  // );

