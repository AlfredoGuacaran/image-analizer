import {
  ImageAnnotation,
  ImageCategory,
  UnanalyzedImage,
} from '@/interfaces/image-analiyzer';

export type GetUnanalyzedImagesResponse = UnanalyzedImage[];

export type GetImageCategoriesResponse = ImageCategory[];

export type PostImageAnnotationsBody = ImageAnnotation;

export interface PostImageAnnotationsResponse {
  message: string;
}
