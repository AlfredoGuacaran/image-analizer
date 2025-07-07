'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Button, Typography } from 'antd';
import { BoundingBox } from '@/interfaces/image-analiyzer';
const { Text } = Typography;

interface BoundingBoxDrawerProps {
  imageUrl: string;
  onBoundingBoxChange?: (box: BoundingBox | null) => void;
}

const BoundingBoxDrawer: React.FC<BoundingBoxDrawerProps> = ({
  imageUrl,
  onBoundingBoxChange,
}) => {
  const [currentBox, setCurrentBox] = useState<BoundingBox | null>(null);

  useEffect(() => {
    setCurrentBox(null);
  }, [imageUrl]);

  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });

  const [imageLoaded, setImageLoaded] = useState(false);
  const [originalImageSize, setOriginalImageSize] = useState({
    width: 0,
    height: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const convertToOriginalPixels = useCallback(
    (displayBox: BoundingBox): BoundingBox => {
      if (
        !imageRef.current ||
        !originalImageSize.width ||
        !originalImageSize.height
      ) {
        return displayBox;
      }

      const displayedRect = imageRef.current.getBoundingClientRect();
      const scaleX = originalImageSize.width / displayedRect.width;
      const scaleY = originalImageSize.height / displayedRect.height;

      return {
        topLeftX: Math.round(displayBox.topLeftX * scaleX),
        topLeftY: Math.round(displayBox.topLeftY * scaleY),
        width: Math.round(displayBox.width * scaleX),
        height: Math.round(displayBox.height * scaleY),
      };
    },
    [originalImageSize]
  );

  const getRelativeCoordinates = useCallback((e: React.MouseEvent) => {
    if (!imageRef.current || !containerRef.current) return { x: 0, y: 0 };

    const rect = imageRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!imageLoaded) return;

      e.preventDefault();
      const coords = getRelativeCoordinates(e);
      setIsDrawing(true);
      setStartPoint(coords);
      setCurrentBox(null);
      onBoundingBoxChange?.(null);
    },
    [imageLoaded, getRelativeCoordinates, onBoundingBoxChange]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDrawing || !imageLoaded) return;

      const coords = getRelativeCoordinates(e);
      const box: BoundingBox = {
        topLeftX: Math.min(startPoint.x, coords.x),
        topLeftY: Math.min(startPoint.y, coords.y),
        width: Math.abs(coords.x - startPoint.x),
        height: Math.abs(coords.y - startPoint.y),
      };

      setCurrentBox(box);
    },
    [isDrawing, startPoint, getRelativeCoordinates, imageLoaded]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDrawing) return;

    setIsDrawing(false);
    if (currentBox && currentBox.width > 5 && currentBox.height > 5) {
      const originalPixelBox = convertToOriginalPixels(currentBox);
      onBoundingBoxChange?.(originalPixelBox);
    } else {
      setCurrentBox(null);
      onBoundingBoxChange?.(null);
    }
  }, [isDrawing, currentBox, onBoundingBoxChange, convertToOriginalPixels]);

  const handleUndo = useCallback(() => {
    setCurrentBox(null);
    onBoundingBoxChange?.(null);
  }, [onBoundingBoxChange, currentBox]);

  const handleImageLoad = useCallback(() => {
    if (imageRef.current) {
      setOriginalImageSize({
        width: imageRef.current.naturalWidth,
        height: imageRef.current.naturalHeight,
      });
      setImageLoaded(true);
    }
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        padding: '16px',
      }}
    >
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          display: 'inline-block',
          border: '2px solid #d9d9d9',
          borderRadius: '8px',
          overflow: 'hidden',
          cursor: isDrawing ? 'crosshair' : 'default',
        }}
      >
        <img
          ref={imageRef}
          src={imageUrl}
          alt="Bounding box target"
          style={{
            display: 'block',
            maxWidth: '100%',
            maxHeight: '384px',
            objectFit: 'contain',
          }}
          onLoad={handleImageLoad}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          draggable={false}
        />

        {currentBox && (
          <div
            style={{
              position: 'absolute',
              border: '2px solid #ff4d4f',
              backgroundColor: 'rgba(255, 77, 79, 0.1)',
              pointerEvents: 'none',
              left: `${currentBox.topLeftX}px`,
              top: `${currentBox.topLeftY}px`,
              width: `${currentBox.width}px`,
              height: `${currentBox.height}px`,
            }}
          />
        )}
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <Button
          type="primary"
          danger
          onClick={handleUndo}
          disabled={!currentBox}
        >
          Undo Box
        </Button>
      </div>

      {
        <div
          style={{
            fontSize: '14px',
            color: '#666',
            backgroundColor: '#f5f5f5',
            padding: '8px',
            borderRadius: '4px',
            textAlign: 'center',
          }}
        >
          <Text strong>Display Box:</Text>
          <br />
          TopLeft: ({currentBox?.topLeftX.toFixed(0) || '0'},{' '}
          {currentBox?.topLeftY.toFixed(0) || '0'})<br />
          Size: {currentBox?.width.toFixed(0) || '0'} ×{' '}
          {currentBox?.height.toFixed(0) || '0'}
          <br />
          <Text strong style={{ color: '#1890ff' }}>
            Original Pixels:
          </Text>
          <br />
          {(() => {
            const originalBox = convertToOriginalPixels(
              currentBox || { topLeftX: 0, topLeftY: 0, width: 0, height: 0 }
            );
            return `TopLeft: (${originalBox.topLeftX}, ${originalBox.topLeftY}) | Size: ${originalBox.width} × ${originalBox.height}`;
          })()}
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            Image: {originalImageSize.width} × {originalImageSize.height} px
          </Text>
        </div>
      }
    </div>
  );
};

export default BoundingBoxDrawer;
