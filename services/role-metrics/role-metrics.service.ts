import { HttpClient } from '@/lib/http/types';
import { roleMetricsUrls } from './const/urls';
import { httpClient } from '@/lib/http/client-factory';
import {
  GetUnanalyzedImagesResponse,
  GetImageCategoriesResponse,
  PostImageAnnotationsBody,
  PostImageAnnotationsResponse,
} from './interfaces/role-metrics.interface';

export class RoleMetricsServices {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = httpClient;
  }

  async getUnanalyzedImages() {
    const response = await this.httpClient.get<GetUnanalyzedImagesResponse>(
      roleMetricsUrls.GET_UNANALYZED_IMAGES
    );
    return response;
  }

  async getImageCategories() {
    const response = await this.httpClient.get<GetImageCategoriesResponse>(
      roleMetricsUrls.GET_IMAGE_CATEGORIES
    );
    return response;
  }

  async postImageAnnotations(body: PostImageAnnotationsBody) {
    const response = await this.httpClient.post<PostImageAnnotationsResponse>(
      roleMetricsUrls.POST_IMAGE_ANNOTATIONS,
      body
    );
    return response;
  }
}
