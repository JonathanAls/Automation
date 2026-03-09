import { Page } from '@playwright/test';
import { Dictionary } from '../src/utils/dictionary';

export class DeliveryPage {
  constructor(private page: Page) {}

  async pickStoreWithoutPurchase(zipCode: string) {
    await this.page.locator(Dictionary.selectors.delivery.optionPickup).click();
    const input = this.page.locator(Dictionary.selectors.delivery.inputCP);
    await input.fill(Dictionary.data.locations.chihuahua);
    await this.page.locator(Dictionary.selectors.delivery.btnContinuar).click();
    await this.page.locator(Dictionary.selectors.delivery.campusStore).click();

    const btnContinuar = this.page.locator(Dictionary.selectors.delivery.btnContinuar);
    if (await btnContinuar.isVisible()) {
        await btnContinuar.click();
    }
    console.log(`📍 Ubicación establecida correctamente en el CP: ${zipCode}`);
  }
}