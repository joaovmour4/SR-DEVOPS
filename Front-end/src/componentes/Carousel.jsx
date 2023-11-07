import React from 'react';
import img0 from "../img/ru0.jpg";
import img1 from "../img/ru1.JPG";
import img2 from "../img/ru2.JPG";
import img3 from "../img/ru3.JPG";
import img4 from "../img/ru4.JPG";
import img5 from "../img/ru5.JPG";


export default function Carousel(){ 
    return (
        <section className='w-3/5 h-screen flex items-center'>
            <img src={img0} alt=""/>
            <img src={img1} alt=""/>
            <img src={img2} alt=""/>
            <img src={img3} alt=""/>
            <img src={img4} alt=""/>
            <img src={img5} alt=""/>
        </section>
    )
}




