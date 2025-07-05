'use client';

import React from 'react';
import { Layout, Typography } from 'antd';
import ImageContainer from '../ImageContainer';
import Sidebar from '../SideBar';
import ImageQueue from '../ImageQueue';
import styles from './styles.module.css';
import type { Option, QueueItem } from '../index';

const { Title } = Typography;
const { Content } = Layout;

interface ImageAnalyzerProps {
  onOptionSelect?: (option: Option) => void;
  onDiscard?: () => void;
  onConfirm?: () => void;
  onQueueItemClick?: (item: QueueItem) => void;
}

const ImageAnalyzer: React.FC<ImageAnalyzerProps> = ({
  onOptionSelect,
  onDiscard,
  onConfirm,
  onQueueItemClick,
}) => {
  return (
    <Layout className={styles.mainLayout}>
      <Content className={styles.mainContent}>
        <Title level={1} className={styles.title}>
          Image Analyzer
        </Title>

        <div className={styles.analyzerContainer}>
          <ImageContainer />
          <Sidebar
            onOptionSelect={onOptionSelect}
            onDiscard={onDiscard}
            onConfirm={onConfirm}
          />
        </div>

        <ImageQueue onItemClick={onQueueItemClick} />
      </Content>
    </Layout>
  );
};

export default ImageAnalyzer;
