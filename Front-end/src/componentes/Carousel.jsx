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
    }, 2000)
    return () => clearInterval(interval);
  }, [contador]);

  return (
    <section className="w-4/5 h-5/6 md:w-4/5 sm:h-5/6 flex items-center">
      <img
        src={imagens[contador]}
        alt={`Imagem ${contador}`}
      />
    </section>
  );
}
