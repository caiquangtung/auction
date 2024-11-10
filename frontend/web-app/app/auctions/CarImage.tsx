'use client';
import React, { useState } from 'react';
import Image from 'next/image';

type CarImageProps = {
  imageURL: string;
};

const CarImage: React.FC<CarImageProps> = ({ imageURL }) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      src={imageURL}
      alt="Image of car"
      className={`
        object-cover transition duration-700 ease-in-out
        ${isLoading ? 'grayscale blur-2xl scale-110' : 'grayscale-0 blur-0 scale-100'}
        group-hover:opacity-75
      `}      
      onLoad={() => setLoading(false)}
      fill
    />
  );
};

export default CarImage;
