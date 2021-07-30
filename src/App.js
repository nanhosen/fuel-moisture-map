import  { Suspense, lazy, useEffect, useState } from 'react';
import './App.css';
const Container = lazy(() => import('react-bootstrap/Container'))
const Navbar = lazy(() => import('./components/Navbar'))
const Main = lazy(() => import('./components/Main'))
const MoistureProvider = lazy(() => import('./providers/MoistureProvider'))
// import Main from './components/Main'

// import { Nav } from 'react-bootstrap';
// import SmokeProvider from './providers/SmokeProvider'
// import Jumb from './components/Jumb'
// const SmokeProvider = React.lazy(() => import('./providers/SmokeProvider'))
// const Jumb = React.lazy(() => import('./components/Jumb'))
// const Main = React.lazy(() => import('./components/Main'))

function App() {
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight - 55)

  useEffect(() => {
    // console.log('height', height, width)
  },[height, width])

  useEffect(() => {
    function handleResize() {
      setHeight(window.innerHeight - 55)
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return _ => {
      window.removeEventListener('resize', handleResize)

    }
  })
  return (
    <div className="h-100 App" style={{ width: '100%', height: '100%', backgroundColor:'#F5F5F5' }}>
      <Suspense fallback={<div>Loading...</div>}>
        <MoistureProvider>
          {/*<Container fluid>*/}
          <Container fluid style={{paddingLeft: '0px', paddingRight:'0px'}}>
            <Navbar />
            <Main height = {height} width={width}/>
          </Container>
        </MoistureProvider>
      </Suspense>
    </div>
  );
}

export default App;
      // <Jumb />
      // <Header />