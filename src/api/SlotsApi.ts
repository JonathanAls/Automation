// src/api/SlotsApi.ts
import { APIRequestContext } from '@playwright/test';

export class SlotsApi {
  // El endpoint base que me proporcionaste
  private readonly baseUrl = 'https://prod-lam.alsuperapi.com/get-slots';

  constructor(private request: APIRequestContext, private token: string) {}

  async getAvailableSlots(day: string = 'TOD') {
    const response = await this.request.get(`${this.baseUrl}?day=${day}`, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok()) {
      throw new Error(`❌ Error al consultar Slots: ${response.status()}`);
    }

    return await response.json();
  }
}