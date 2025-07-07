'use client';

import React from 'react';
import { Col, Typography } from 'antd';
import { styles } from './styles';
import { selectActiveImage } from '@/redux/selectors/annotationSelectors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { BoundingBox } from '@/interfaces/image-analiyzer';
import { setDrawnBoundingBox } from '@/redux/features/annotationSlice';
import BoundingBoxDrawer from '../BoundigBoxDrawer';

const BoundingBoxDrawerContainer = () => {
  const activeImage = useAppSelector(selectActiveImage);

  const dispatch = useAppDispatch();

  const handleDrawBoundingBox = (boundingBox: BoundingBox | null) => {
    dispatch(setDrawnBoundingBox({ boundingBox }));
  };

  return (
    <Col style={styles.imageContainer}>
      {activeImage ? (
        <BoundingBoxDrawer
          imageUrl={activeImage.url}
          onBoundingBoxChange={handleDrawBoundingBox}
        />
      ) : (
        <Typography.Text style={{ color: 'white' }}>
          There are no more images to annotate
        </Typography.Text>
      )}
    </Col>
  );
};

export default BoundingBoxDrawerContainer;
