'use client';

import React, { useEffect } from 'react';
import { Layout, Typography, Row, Space, Button } from 'antd';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import BoundingBoxDrawerContainer from '../BoundingBoxDrawerContainer';
import CategorySelector from '../CategorySelector';
import ImagesQueue from '../ImagesQueue';
import { styles } from './styles';
import {
  clearAnnotation,
  setNextImage,
  setUnanalyzedImagesQueue,
} from '@/redux/features/annotationSlice';
import { roleMetricsQueryKeys } from '@/services/role-metrics/const/urls';
import { GetUnanalyzedImagesResponse } from '@/services/role-metrics/interfaces/role-metrics.interface';
import { roleMetricsServices } from '@/services/role-metrics/role-metrics.service';
import {
  selectActiveImage,
  selectDrawnBoundingBox,
  selectIsAnnotationReady,
  selectSelectedCategory,
} from '@/redux/selectors/annotationSelectors';
import { BoundingBox, ImageAnnotation } from '@/interfaces/image-analiyzer';

const { Title } = Typography;
const { Content } = Layout;

const ImageAnalyzer = () => {
  const dispatch = useAppDispatch();
  const isAnnotationReady = useAppSelector(selectIsAnnotationReady);
  const activeImage = useAppSelector(selectActiveImage);
  const selectedCategory = useAppSelector(selectSelectedCategory);
  const drawnBoundingBox = useAppSelector(selectDrawnBoundingBox);

  const handleDiscard = () => {
    dispatch(clearAnnotation());
  };

  const { data: unanalyzedImages } = useQuery<GetUnanalyzedImagesResponse>({
    queryKey: [roleMetricsQueryKeys.GET_UNANALYZED_IMAGES],
    queryFn: () => roleMetricsServices.getUnanalyzedImages(),
  });

  useEffect(() => {
    if (unanalyzedImages) {
      dispatch(setUnanalyzedImagesQueue({ images: unanalyzedImages }));
    }
  }, [unanalyzedImages]);

  const annotationMutation = useMutation({
    mutationFn: (annotation: ImageAnnotation) =>
      roleMetricsServices.postImageAnnotations(annotation),
    onSuccess: () => dispatch(setNextImage()),
  });

  const handleConfirm = () => {
    const annotation: ImageAnnotation = {
      imageId: Number(activeImage?.id),
      annotations: [
        {
          categoryId: Number(selectedCategory?.id),
          boundingBoxes: [drawnBoundingBox as BoundingBox],
        },
      ],
    };
    annotationMutation.mutate(annotation);
  };

  return (
    <Layout style={styles.mainLayout}>
      <Content style={styles.mainContent}>
        <Title level={1} style={styles.title}>
          Image Analyzer
        </Title>

        <Row style={styles.analyzerContainer}>
          <BoundingBoxDrawerContainer />
          <CategorySelector />
        </Row>
        <Row justify="center">
          <Space style={styles.buttons}>
            <Button size="large" onClick={handleDiscard}>
              Discard
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={handleConfirm}
              disabled={!isAnnotationReady}
              loading={annotationMutation.isPending}
            >
              Confirm
            </Button>
          </Space>
        </Row>
        <ImagesQueue />
      </Content>
    </Layout>
  );
};

export default ImageAnalyzer;
