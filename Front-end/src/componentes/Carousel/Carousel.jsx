import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img0 from '../img/ru0.jpg';
import img1 from '../img/ru1.JPG';
import img2 from '../img/ru2.JPG';
import img3 from '../img/ru3.JPG';
import img4 from '../img/ru4.JPG';
import img5 from '../img/ru5.JPG';

const Carrossel = () => {
  const [contador, setContador] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const sliderRef = useRef(null);
  const imagens = [img0, img1, img2, img3, img4, img5];

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoplay) {
        setContador((contador + 1) % imagens.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [contador, imagens.length, autoplay]);

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${className} cursor-pointer hover:opacity-100`}
        style={{ ...style, display: 'block', zIndex: 1 }}
        onClick={() => {
          setAutoplay(false);
          onClick();
        }}
      />
    );
  };

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${className} cursor-pointer hover:opacity-100`}
        style={{ ...style, display: 'block', zIndex: 1 }}
        onClick={() => {
          setAutoplay(false);
          onClick();
        }}
      />
    );
  };

  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '0',
    slidesToShow: 1,
    speed: 500,
    focusOnSelect: true,
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (current, next) => setContador(next),
  };

  const handleThumbnailClick = (index) => {
    setContador(index);
    setAutoplay(true);
    sliderRef.current.slickGoTo(index); // Ir para o slide correspondente ao índice clicado
  };

  return (
    <div className="w-3/4 mx-auto mt-4 relative">
      <Slider {...settings} ref={sliderRef}>
        {imagens.map((imagem, index) => (
          <div key={index} className={`flex items-center justify-center h-96`}>
            <img
              src={imagem}
              alt={`Imagem ${index + 1}`}
              className="rounded-lg shadow-md object-cover w-full h-full"
            />
          </div>
        ))}
      </Slider>
      <PrevArrow onClick={() => setContador((contador - 1 + imagens.length) % imagens.length)} />
      <NextArrow onClick={() => setContador((contador + 1) % imagens.length)} />
      <div className="flex mt-4 justify-center">
        {imagens.map((imagem, index) => (
          <div key={index} onClick={() => handleThumbnailClick(index)} className="w-10 h-10 mx-1 cursor-pointer">
            <img
              src={imagem}
              alt={`Imagem ${index + 1}`}
              className={`rounded-md shadow-md object-cover w-full h-full ${
                index === contador ? 'border-2 border-blue-500' : ''
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carrossel;
