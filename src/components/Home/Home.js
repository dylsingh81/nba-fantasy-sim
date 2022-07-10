
import React from "react";
import './Home.css';
import { Carousel } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav } from 'react-bootstrap';

const Home = () => {
  return (
    <Carousel id="introCarousel" className="carousel slide carousel-fade shadow-2-strong">
      <Carousel.Item>
        <div className="mask d-flex justify-content-center align-items-center h-100">
          <div className="text-white text-center">
            <h1 className="mb-4 display-1 font-weight-bold ">NBA Fantasy GM</h1>
            <div className="row">

              <LinkContainer to="/team" className="col col-md-4 offset-md-2">
                <Nav.Link>
                  <button className="btn btn-outline-light btn-lg m-2">Build Team</button>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/simulator" className="col col-md-6">
                <Nav.Link>
                  <button className="btn btn-outline-light btn-lg m-2">Run Simulation</button>
                </Nav.Link>
              </LinkContainer>
            </div>
          </div>
        </div>
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>

        <div className="mask d-flex justify-content-center align-items-center h-100">
          <div className="text-white text-center">
            <h1 className="mb-3 display-2">Build your Squad</h1>
            <h5 className="mb-4">Use a $50 budget to build the perfect squad</h5>
            <LinkContainer to="/team">
              <Nav.Link>
                <button className="btn btn-outline-light btn-lg m-2">Start</button>
              </Nav.Link>
            </LinkContainer>
          </div>
        </div>

        <Carousel.Caption>
          <p>Test your LeGM skills in the Team Builder</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>

        <div className="mask d-flex justify-content-center align-items-center h-100">
          <div className="text-white text-center">
            <h1 className="mb-3 display-2">Run a Simulation</h1>
            <h5 className="mb-4">Use built teams to see the results of a H2H matchup</h5>
            <LinkContainer to="/simulator">
                <Nav.Link>
                  <button className="btn btn-outline-light btn-lg m-2">Start</button>
                </Nav.Link>
              </LinkContainer>
          </div>
        </div>

        <Carousel.Caption>
          <p>Upload two teams and see the resulting stats of a simulated game between them</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

  );
};

export default Home;
