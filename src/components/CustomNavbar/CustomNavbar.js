import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './CustomNavbar.css';

function CustomNavbar() {
  return (
    <Navbar scrolling="true" dark="true" expand="md" fixed="top" className="shadow-sm">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer className="home-css" to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/team">
            <Nav.Link>Team Builder</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/simulator">
            <Nav.Link>Simulator</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/roster">
            <Nav.Link>Rosters</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default CustomNavbar;