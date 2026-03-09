import { APIRequestContext } from '@playwright/test';

export class CartApi {
  private readonly baseUrl = 'https://dev.alsuperapi.com/cart';

  constructor(private request: APIRequestContext, private token: string) {}

  async deleteCart() {
    const response = await this.request.delete(this.baseUrl, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok()) {
      throw new Error(`Error API: ${response.status()}`);
    }
    
    const body = await response.json();
    console.log(`🧹 API: ${body.data?.message}`);
    return body;
  }
}