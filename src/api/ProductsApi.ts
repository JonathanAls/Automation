import { BaseApi } from './BaseApi';

export class ProductsApi extends BaseApi {
  // Aquí definimos la ruta específica para este controlador
  private productsEndpoint = '/products';

  async getAllProducts() {
    // Usamos el método 'get' heredado de BaseApi
    return await this.get(this.productsEndpoint);
  }

  async getProductById(id: number) {
    return await this.get(`${this.productsEndpoint}/${id}`);
  }
}