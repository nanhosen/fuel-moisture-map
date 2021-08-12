// import styled, { css } from "styled-components";
// import React, { useRef, useState } from "react";

// const Navbar = ({ width }) => {
//   return (
//     <DesktopNav width={800}>
//       <div className="logo">
//         Great Basin Live Fuel Moisture Viewer
//       </div>

//     </DesktopNav>
//   )
// }

// export default Navbar

// const DesktopNav = styled.nav`
//   background: #171f31;
//   width: ${({ width }) => width ? width : '100%'};
//   height: 60px;
//   padding: 0px;
//   display: flex;
//   margin-bottom:5px;
//   justify-content: space-between;
//    .logo {
//    	display: flex;
//    	position: fixed;
//     flex: 2;
//     color: white;
//     font-size: 30px;
//     padding-top:5px;
//     padding-left:10px;
//   }
//   font-family: "Montserrat", sans-serif;
//     -webkit-font-smoothing: antialiased;
//     -moz-osx-font-smoothing: grayscale;
// `

import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function HideAppBar(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
          <AppBar>
            <Box sx={{bgcolor: '#3C403D'}}>
              <Toolbar>
                <Typography variant="h6" component="div">
                  Great Basin Live Fuel Moisture Viewer
                </Typography>
              </Toolbar>
            </Box>
          </AppBar>
      </HideOnScroll>
      <Toolbar />

    </React.Fragment>
  );
}
