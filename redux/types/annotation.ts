import {
  UnanalyzedImage,
  ImageCategory,
  BoundingBox,
} from '@/interfaces/image-analiyzer';

export interface AnnotationState {
  unanalyzedImagesQueue: UnanalyzedImage[];
  activeImage: UnanalyzedImage | null;
  selectedCategory: ImageCategory | null;
  drawnBoundingBox: BoundingBox | null;
}

export interface SetUnanalyzedImagesQueuePayload {
  images: UnanalyzedImage[];
}

export interface SetSelectedCategoryPayload {
  category: ImageCategory | null;
}

export interface SetDrawnBoundingBoxPayload {
  boundingBox: BoundingBox | null;
}
