import { Page } from '@playwright/test';

export class ProductPage {
  constructor(private page: Page) {}

  async setQuantity(quantity: number) {
    // Asumiendo que hay un input numérico. Si son botones +/- deberás ajustarlo.
    const qtyInput = this.page.locator('input.quantity-input'); // Ajusta este selector a tu web
    if (await qtyInput.isVisible()) {
        await qtyInput.fill(quantity.toString());
    }}

  async addToCart() {
    await this.page.getByRole('button', { name: 'Agregar al carrito' }).click();
    await this.page.waitForTimeout(500); 
  }
}