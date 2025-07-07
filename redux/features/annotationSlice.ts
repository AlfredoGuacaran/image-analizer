import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AnnotationState,
  SetDrawnBoundingBoxPayload,
  SetSelectedCategoryPayload,
  SetUnanalyzedImagesQueuePayload,
} from '../types/annotation';

const initialState: AnnotationState = {
  unanalyzedImagesQueue: [],
  activeImage: null,
  selectedCategory: null,
  drawnBoundingBox: null,
};

const annotationSlice = createSlice({
  name: 'annotation',
  initialState,
  reducers: {
    setUnanalyzedImagesQueue: (
      state,
      action: PayloadAction<SetUnanalyzedImagesQueuePayload>
    ) => {
      state.unanalyzedImagesQueue = action.payload.images;
      state.activeImage = action.payload.images[0];
    },
    setNextImage: state => {
      state.selectedCategory = null;
      state.drawnBoundingBox = null;
      if (state.unanalyzedImagesQueue.length > 0) {
        state.unanalyzedImagesQueue.shift();
        state.activeImage = state.unanalyzedImagesQueue[0];
      } else {
        state.activeImage = null;
      }
    },
    setSelectedCategory: (
      state,
      action: PayloadAction<SetSelectedCategoryPayload>
    ) => {
      state.selectedCategory = action.payload.category;
    },
    setDrawnBoundingBox: (
      state,
      action: PayloadAction<SetDrawnBoundingBoxPayload>
    ) => {
      state.drawnBoundingBox = action.payload.boundingBox;
    },
    clearAnnotation: state => {
      state.activeImage = state.unanalyzedImagesQueue[0];
      state.selectedCategory = null;
      state.drawnBoundingBox = null;
    },
  },
});

export const {
  setUnanalyzedImagesQueue,
  setNextImage,
  setSelectedCategory,
  setDrawnBoundingBox,
  clearAnnotation,
} = annotationSlice.actions;
export default annotationSlice.reducer;
