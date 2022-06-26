
import React from "react";
import './Home.css';
import { Carousel } from 'react-bootstrap';

const Home = () => {
  return (
    <Carousel id="introCarousel" className="carousel slide carousel-fade shadow-2-strong">
      <Carousel.Item>
        <div className="mask d-flex justify-content-center align-items-center h-100">
          <div className="text-white text-center">
            <h1 className="mb-4 display-1 font-weight-bold ">NBA Fantasy GM</h1>
            <a className="btn btn-outline-light btn-lg m-2" href="https://www.youtube.com/watch?v=c9B4TPnak1A"
              role="button" rel="nofollow" target="">Build Team</a>
            <a className="btn btn-outline-light btn-lg m-2" href="https://mdbootstrap.com/docs/standard/"
              target="" role="button">Run Simulation</a>
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
            <a className="btn btn-outline-light btn-lg m-2" href="https://www.youtube.com/watch?v=c9B4TPnak1A"
              role="button" rel="nofollow" target="">Start</a>
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
            <a className="btn btn-outline-light btn-lg m-2" href="https://www.youtube.com/watch?v=c9B4TPnak1A"
              role="button" rel="nofollow" target="">Start</a>
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
