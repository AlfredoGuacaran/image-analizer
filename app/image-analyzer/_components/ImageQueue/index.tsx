'use client';

import React from 'react';
import { Typography, List, Avatar } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import styles from './styles.module.css';

const { Title } = Typography;

export interface QueueItem {
  id: string;
  name: string;
  thumbnail?: string;
}

interface ImageQueueProps {
  queueItems?: QueueItem[];
  onItemClick?: (item: QueueItem) => void;
}

const ImageQueue: React.FC<ImageQueueProps> = ({
  queueItems = Array.from({ length: 10 }, (_, i) => ({
    id: `${i + 1}`,
    name: `Image ${i + 1}`,
    thumbnail: undefined,
  })),
  onItemClick,
}) => {
  return (
    <div className={styles.imageQueue}>
      <Title level={2} className={styles.queueTitle}>
        Next images in queue:
      </Title>

      <List
        className={styles.queueList}
        grid={{
          gutter: 16,
          xs: 2,
          sm: 3,
          md: 4,
          lg: 5,
          xl: 6,
          xxl: 8,
        }}
        dataSource={queueItems}
        renderItem={item => (
          <List.Item
            className={styles.queueItem}
            onClick={() => onItemClick?.(item)}
          >
            <div className={styles.queueItemContent}>
              <Avatar
                size={64}
                icon={<PictureOutlined />}
                src={item.thumbnail}
                className={styles.queueItemAvatar}
              />
              <div className={styles.queueItemName}>{item.name}</div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ImageQueue;
