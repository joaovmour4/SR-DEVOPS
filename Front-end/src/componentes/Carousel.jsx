import React, { useState, useEffect } from 'react';
import img0 from "../img/ru0.jpg";
import img1 from "../img/ru1.JPG";
import img2 from "../img/ru2.JPG";
import img3 from "../img/ru3.JPG";
import img4 from "../img/ru4.JPG";
import img5 from "../img/ru5.JPG";

export default function Carousel() {
  const [contador, setContador] = useState(0);
  const imagens = [img0, img1, img2, img3, img4, img5];

  useEffect(() => {
    const interval = setInterval(() => {
      setContador((contador + 1) % imagens.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [contador, imagens.length]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full transform translate-x-[-100%] transition-transform duration-500"
           style={{ backgroundImage: `url(${imagens[(contador - 1 + imagens.length) % imagens.length]})` }} />
      <div className="absolute top-0 left-0 w-full h-full transform transition-transform duration-500"
           style={{ backgroundImage: `url(${imagens[contador]})` }} />
      <div className="absolute top-0 left-0 w-full h-full transform translate-x-[100%] transition-transform duration-500"
           style={{ backgroundImage: `url(${imagens[(contador + 1) % imagens.length]})` }} />
    </div>
  );
}
