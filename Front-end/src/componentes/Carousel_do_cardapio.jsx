import React from 'react';
import Slider from 'react-slick';

const CarouselCardapio = () => {
  // Configurações do carrossel
  const configuracoesCarrossel = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    className: 'center',
  };

  return (
    <div className="container col-span-full border border-gray-300 rounded mb-4">
      <Slider {...configuracoesCarrossel}>
        <div className="w-full h-64 md:h-96 lg:h-96 overflow-hidden">
          <img src="https://source.unsplash.com/800x600/?food" alt="Comida 1" className="w-full h-full object-cover" />
        </div>
        <div className="w-full h-64 md:h-96 lg:h-96 overflow-hidden">
          <img src="https://source.unsplash.com/800x600/?meal" alt="Comida 2" className="w-full h-full object-cover" />
        </div>
        {/* Adicione mais imagens conforme necessário */}
      </Slider>
    </div>
  );
}

export default CarouselCardapio;
