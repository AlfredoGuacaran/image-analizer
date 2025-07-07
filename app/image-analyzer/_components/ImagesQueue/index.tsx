'use client';

import React, { useState } from 'react';
import { Typography, List, Image, Col } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import { styles } from './styles';
import { useAppSelector } from '@/redux/hooks';
import {
  selectActiveImage,
  selectUnanalyzedImagesQueue,
} from '@/redux/selectors/annotationSelectors';

const { Title } = Typography;

const ImagesQueue = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const activeImage = useAppSelector(selectActiveImage);
  const unanalyzedImages = useAppSelector(selectUnanalyzedImagesQueue);

  const getItemStyle = (itemId: string) => {
    const isActive = activeImage?.id === itemId;
    const isHovered = hoveredItem === itemId;

    if (isActive) {
      return styles.queueItemActive;
    }
    return isHovered ? styles.queueItemHover : styles.queueItem;
  };

  const getContentStyle = (itemId: string) => {
    const isActive = activeImage?.id === itemId;
    const isHovered = hoveredItem === itemId;

    if (isActive) {
      return styles.queueItemContentActive;
    }
    return isHovered ? styles.queueItemContentHover : styles.queueItemContent;
  };

  return (
    <Col style={styles.imageQueue}>
      <Title level={2} style={styles.queueTitle}>
        Next images in queue:
      </Title>

      <List
        style={styles.queueList}
        grid={{
          gutter: 16,
          xs: 2,
          sm: 3,
          md: 4,
          lg: 5,
          xl: 6,
          xxl: 8,
        }}
        dataSource={unanalyzedImages}
        renderItem={item => (
          <List.Item
            style={getItemStyle(item.id)}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div style={getContentStyle(item.id)}>
              <Image
                width={100}
                height={100}
                src={item.url}
                alt={`Image ${item.id}`}
                style={{
                  ...styles.queueItemImage,
                  objectFit: 'cover',
                  borderRadius: '6px',
                }}
                placeholder={
                  <div style={styles.imagePlaceholder}>
                    <PictureOutlined />
                  </div>
                }
                fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN"
                preview={false}
                loading="lazy"
              />
              <div style={styles.queueItemName}>{item.id}</div>
            </div>
          </List.Item>
        )}
      />
    </Col>
  );
};

export default ImagesQueue;
