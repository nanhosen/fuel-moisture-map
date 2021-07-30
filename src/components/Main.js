import { Suspense, lazy, useRef, useEffect, useState, useCallback, useContext } from 'react';
import MoistureMap from './MoistureMap.js'
import Card from 'react-bootstrap/Card'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Accordion from 'react-bootstrap/Accordion'
import '../App.css'
import { MoistureContext } from '../contexts/MoistureContext'
import MapOptions from './DropdownMapOptions'
const Container = lazy(() => import('react-bootstrap/Container'))
// const Nav = lazy(() => import('react-bootstrap/Nav'))
const InfoComponent = lazy(()=>import('./InfoComponent'))
// const MoistureMap = lazy(() => import('./Components/MoistureMap'))
const Row = lazy(() => import('react-bootstrap/Row'))
const Col = lazy(() => import('react-bootstrap/Col'))


function Main(props) {
  const windowHeight = props.height
  const colRef = useRef(null)
  const [width, setWidth] = useState()
  const context = useContext(MoistureContext)

  useEffect(()=>{
    if(colRef.current?.clientWidth){
      setWidth(colRef.current.clientWidth)
    }
  },[props])

  useEffect(()=>{
    // console.log('main context', context, !context.selection)
  },[context])

  return (
    <div className="h-100 App" style={{ width: '100%', height: '100%' }}>
      <Suspense fallback={<div>Loading...</div>}>
        <Container fluid >
          <Row >
            <Col md={6}  ref={colRef} >

              <Card>

              <Card.Body>
              <MapOptions />
                  <MoistureMap height={windowHeight}  className="h-100" />
                  </Card.Body>
              </Card>
            </Col>
            <Col md={6}> 
              <Card>
                <Card.Body>
                  <Suspense fallback={<div>Loading...</div>}>
                    {(() => {
                      if (context.selection) {
                        return <InfoComponent />
                      } else {
                        return <><ListGroup className="list-group-flush">
                          <ListGroupItem>Click Station on Map to View Fuel Images and Information</ListGroupItem>
                          <ListGroupItem>Zoom in to See Station Names. </ListGroupItem>
                        </ListGroup></>;
                      }
                    })()}
                  </Suspense>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Suspense>
    </div>
  );
}

export default Main;




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

