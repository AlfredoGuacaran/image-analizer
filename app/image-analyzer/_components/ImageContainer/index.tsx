'use client';

import React from 'react';
import { Image } from 'antd';
import styles from './styles.module.css';

export interface Annotation {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
}

interface ImageContainerProps {
  imageUrl?: string;
  annotations?: Annotation[];
}

const ImageContainer: React.FC<ImageContainerProps> = ({
  imageUrl = 'https://dummyimage.com/280/c4c4c4/ffffff&text=frame',
  annotations = [
    {
      id: '1',
      x: 275,
      y: 250,
      width: 100,
      height: 75,
      label: 'Sample Annotation',
    },
  ],
}) => {
  return (
    <div className={styles.imageContainer}>
      <Image
        src={imageUrl}
        alt="Uploaded image for analysis"
        className={styles.image}
        preview={false}
      />

      {annotations.map(annotation => (
        <div
          key={annotation.id}
          className={styles.annotation}
          style={{
            left: annotation.x,
            top: annotation.y,
            width: annotation.width,
            height: annotation.height,
          }}
          title={annotation.label}
        />
      ))}
    </div>
  );
};

export default ImageContainer;
