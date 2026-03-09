import { APIRequestContext, APIResponse } from '@playwright/test';

export class BaseApi {
  protected request: APIRequestContext;
  private authToken?: string;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * Setea token Bearer para siguientes requests
   */
  setAuthToken(token: string) {
    this.authToken = token;
  }

  /**
   * Headers base del API
   */
  private getHeaders() {
    const headers: Record<string, string> = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    return headers;
  }

  /**
   * GET
   */
  protected async get(endpoint: string): Promise<APIResponse> {
    return this.request.get(endpoint, {
      headers: this.getHeaders(),
    });
  }

  /**
   * POST
   */
  protected async post(endpoint: string, body?: any): Promise<APIResponse> {
    return this.request.post(endpoint, {
      headers: this.getHeaders(),
      data: body,
    });
  }

  /**
   * PUT
   */
  protected async put(endpoint: string, body?: any): Promise<APIResponse> {
    return this.request.put(endpoint, {
      headers: this.getHeaders(),
      data: body,
    });
  }

  /**
   * DELETE
   */
  protected async delete(endpoint: string): Promise<APIResponse> {
    return this.request.delete(endpoint, {
      headers: this.getHeaders(),
    });
  }
}