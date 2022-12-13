import React, { Component } from "react";
import Slider from "react-slick";
import './index.css'

export default class Fade extends Component {
  render() {
    const settings = {
      dots: true,
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1000,
    };
    return (
      <div>
        <Slider {...settings}>
          <div>
            <img className="carrusel" src="/images/1.jpg" alt=""/>
          </div>
          <div>
          <img className="carrusel" src="/images/2.jpg" alt=""/>
          </div>
          <div>
          <img className="carrusel" src="/images/3.jpg" alt=""/>
          </div>
        </Slider>
      </div>
    );
  }
}