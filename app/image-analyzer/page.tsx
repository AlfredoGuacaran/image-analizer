'use client';

import React from 'react';
import { StoreProvider } from '@/redux/StoreProvider';
import { QueryClientProvider } from '@/lib/query/QueryClientProvider';
import ImageAnalyzer from './_components/ImageAnalyzer';

export default function ImageAnalyzerPage() {
  return (
    <StoreProvider>
      <QueryClientProvider>
        <ImageAnalyzer />
      </QueryClientProvider>
    </StoreProvider>
  );
}
