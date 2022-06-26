
import React from "react";
import './Home.css';
import { Carousel } from 'react-bootstrap';

const Home = () => {
  return (
    <Carousel id="introCarousel" className="carousel slide carousel-fade shadow-2-strong">
      <Carousel.Item>
        <div className="mask d-flex justify-content-center align-items-center h-100">
          <div className="text-white text-center">
            <h1 className="mb-3">Learn Bootstrap 5 with MDB</h1>
            <h5 className="mb-4">Best & free guide of responsive web design</h5>
            <a className="btn btn-outline-light btn-lg m-2" href="https://www.youtube.com/watch?v=c9B4TPnak1A"
              role="button" rel="nofollow" target="_blank">Start tutorial</a>
            <a className="btn btn-outline-light btn-lg m-2" href="https://mdbootstrap.com/docs/standard/"
              target="_blank" role="button">Download MDB UI KIT</a>
          </div>
        </div>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>

        <div className="mask d-flex justify-content-center align-items-center h-100">
          <div className="text-white text-center">
            <h1 className="mb-3">Learn Bootstrap 5 with MDB</h1>
            <h5 className="mb-4">Best & free guide of responsive web design</h5>
            <a className="btn btn-outline-light btn-lg m-2" href="https://www.youtube.com/watch?v=c9B4TPnak1A"
              role="button" rel="nofollow" target="_blank">Start tutorial</a>
            <a className="btn btn-outline-light btn-lg m-2" href="https://mdbootstrap.com/docs/standard/"
              target="_blank" role="button">Download MDB UI KIT</a>
          </div>
        </div>

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>

        <div className="mask d-flex justify-content-center align-items-center h-100">
          <div className="text-white text-center">
            <h1 className="mb-3">Learn Bootstrap 5 with MDB</h1>
            <h5 className="mb-4">Best & free guide of responsive web design</h5>
            <a className="btn btn-outline-light btn-lg m-2" href="https://www.youtube.com/watch?v=c9B4TPnak1A"
              role="button" rel="nofollow" target="_blank">Start tutorial</a>
            <a className="btn btn-outline-light btn-lg m-2" href="https://mdbootstrap.com/docs/standard/"
              target="_blank" role="button">Download MDB UI KIT</a>
          </div>
        </div>

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

  );
};

export default Home;
