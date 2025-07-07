import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectAnnotationState = (state: RootState) => state.annotation;
export const selectUnanalyzedImagesQueue = (state: RootState) =>
  state.annotation.unanalyzedImagesQueue;
export const selectActiveImage = (state: RootState) =>
  state.annotation.activeImage;
export const selectSelectedCategory = (state: RootState) =>
  state.annotation.selectedCategory;
export const selectDrawnBoundingBox = (state: RootState) =>
  state.annotation.drawnBoundingBox;

export const selectIsAnnotationReady = createSelector(
  [selectActiveImage, selectSelectedCategory, selectDrawnBoundingBox],
  (activeImage, selectedCategory, drawnBoundingBox) =>
    activeImage !== null &&
    selectedCategory !== null &&
    drawnBoundingBox !== null
);
