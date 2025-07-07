export interface UnanalyzedImage {
  id: string;
  url: string;
}
export interface ImageCategory {
  id: string;
  name: string;
}

export interface BoundingBox {
  topLeftX: number;
  topLeftY: number;
  width: number;
  height: number;
}

export interface Annotation {
  categoryId: number;
  boundingBoxes: BoundingBox[];
}

export interface ImageAnnotation {
  imageId: number;
  annotations: Annotation[];
}
