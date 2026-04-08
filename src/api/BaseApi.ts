import { APIRequestContext, APIResponse } from '@playwright/test';

export class BaseApi {
  // 1. Debemos declarar las propiedades aquí arriba para que TS sepa que existen
  protected request: APIRequestContext;
  protected baseUrl: string;

  // 2. Agregamos el tipo 'APIRequestContext' al parámetro 'request'
  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseUrl = 'https://prod.alsuperapi.com/'; 
  }

  // 3. Tipamos 'endpoint' como string y las 'options' como objeto
  async get(endpoint: string, options: object = {}): Promise<APIResponse> {
    const response = await this.request.get(`${this.baseUrl}${endpoint}`, options);
    return response;
  }

  // 4. Tipamos 'data' como 'any' (cualquier cosa) para permitir diferentes bodies
  async post(endpoint: string, data: any, options: object = {}): Promise<APIResponse> {
    const response = await this.request.post(`${this.baseUrl}${endpoint}`, {
      data,
      ...options,
    });
    return response;
  }

  async put(endpoint: string, data: any, options: object = {}): Promise<APIResponse> {
    const response = await this.request.put(`${this.baseUrl}${endpoint}`, {
      data,
      ...options,
    });
    return response;
  }

  async delete(endpoint: string, options: object = {}): Promise<APIResponse> {
    const response = await this.request.delete(`${this.baseUrl}${endpoint}`, options);
    return response;
  }
}