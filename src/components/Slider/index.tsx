"use client";

import { FC, useState } from "react";
import styles from "./styles.module.scss";

type ImageType = {
  id: number;
  image: string;
};

type SliderProps = {
  images: ImageType[];
};

const Slider: FC<SliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={styles.slider}>
      <button onClick={prevImage}>Previous</button>
      <img src={images[currentIndex].image} alt={`Image ${currentIndex + 1}`} />
      <button onClick={nextImage}>Next</button>
    </div>
  );
};

export default Slider;
