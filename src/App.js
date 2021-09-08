import  { Suspense, lazy, useEffect, useState } from 'react'; 
import './App.css';
// const Container = lazy(() => import('react-bootstrap/Container'))
import { Container } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { purple, red } from '@material-ui/core/colors';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const Navbar = lazy(() => import('./components/Navbar'))
const Main = lazy(() => import('./components/Main'))
const MoistureProvider = lazy(() => import('./providers/MoistureProvider'))

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: red[900],
      legend:'orange'
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f', 
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

// import Main from './components/Main'

// import { Nav } from 'react-bootstrap';
// import SmokeProvider from './providers/SmokeProvider'
// import Jumb from './components/Jumb'
// const SmokeProvider = React.lazy(() => import('./providers/SmokeProvider'))
// const Jumb = React.lazy(() => import('./components/Jumb'))
// const Main = React.lazy(() => import('./components/Main'))

function App() {
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight - 180)

  useEffect(() => {
    // console.log('height', height, width)
  },[height, width])

  useEffect(() => {
    function handleResize() {
      setHeight(window.innerHeight - 180)
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
          {/*<Container fluid>*/}
          <Container maxWidth={false}>
            <Navbar />
        <MoistureProvider>
        <ThemeProvider theme={theme}>
            <Box sx={{pt:'10px'}}><Main height = {height} width={width}/></Box>
        </ThemeProvider>
        </MoistureProvider>
          </Container>
      </Suspense>
    </div>
  );
}

export default App;

// <Main height = {height} width={width}/>
      // <Jumb />
      // <Header />