'use client';

import React from 'react';
import { ImageAnalyzer } from './_components';
import type { Option, QueueItem } from './_components';

const ImageAnalyzerPage: React.FC = () => {
  const handleOptionSelect = (option: Option) => {
    // Handle option selection
  };

  const handleDiscard = () => {
    // Handle discard action
  };

  const handleConfirm = () => {
    // Handle confirm action
  };

  const handleQueueItemClick = (item: QueueItem) => {
    // Handle queue item click
  };

  return (
    <ImageAnalyzer
      onOptionSelect={handleOptionSelect}
      onDiscard={handleDiscard}
      onConfirm={handleConfirm}
      onQueueItemClick={handleQueueItemClick}
    />
  );
};

export default ImageAnalyzerPage;
