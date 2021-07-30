import styled, { css } from "styled-components";
import React, { useRef, useState } from "react";

const Navbar = ({ width }) => {
  return (
    <DesktopNav width={800}>
      <div className="logo">
        Great Basin Live Fuel Moisture Viewer
      </div>

    </DesktopNav>
  )
}

export default Navbar

const DesktopNav = styled.nav`
  background: #171f31;
  width: ${({ width }) => width ? width : '100%'};
  height: 40px;
  padding: 0px;
  display: flex;
  margin-bottom:5px;
  justify-content: space-between;
   .logo {
   	display: flex;
   	position: fixed;
    flex: 2;
    color: white;
    font-size: 22px;
    padding-top:5px;
    padding-left:10px;
  }
  font-family: "Montserrat", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
`