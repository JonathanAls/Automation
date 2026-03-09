import { Page, expect } from '@playwright/test';
import { Dictionary } from '../src/utils/dictionary';

export class CheckoutPage {
  constructor(private page: Page) {}
    
 async openCart() {
    await this.page.locator(Dictionary.selectors.checkout.iconCart).click();
    const btnCoontinuar = this.page.getByRole('button', { name: 'Continuar' });
     await expect(btnCoontinuar).toBeVisible({ timeout: 10000 });
      await btnCoontinuar.click();
  }

  async selectSlot() {
    const tabLocator = this.page.locator(Dictionary.selectors.checkout.tabSlot);
    await tabLocator.first().waitFor({ state: 'visible', timeout: 10000 });
    const tabCount = await tabLocator.count();
    console.log(`🔎 Pestañas detectadas: ${tabCount}`);

  for (let i = 0; i < tabCount; i++) {
    const currentTab = tabLocator.nth(i);
    await currentTab.click();
    await this.page.waitForTimeout(1000);
    const availableBtns = this.page.locator(`${Dictionary.selectors.checkout.btnSeleccionarSlot}:enabled`);
    const btnCount = await availableBtns.count();

    if (btnCount > 0) {
      const randomIndex = Math.floor(Math.random() * btnCount);
      console.log(`🎲 Eligiendo slot al azar: #${randomIndex + 1} de ${btnCount} disponibles en pestaña ${i + 1}`);
      const selectedBtn = availableBtns.nth(randomIndex);
      const slotText = await selectedBtn.locator('..').locator('mat-label').first().innerText();
      console.log(`🎰 El slot elegido es: ${slotText}`);
      console.log(`✅ Slot aleatorio seleccionado exitosamente.`);
            await selectedBtn.click();
      return;
    }

    if (await availableBtns.isVisible()) {
      await availableBtns.click();
      console.log(`✅ Slot seleccionado en pestaña #${i + 1}`);
      return;
        }
      }
    } 

  async buy() {
    await this.page.locator(Dictionary.selectors.checkout.btnContinuarCompra).click();
    await this.page.getByText('Tarjeta de crédito/débito').last().click();
    await this.page.getByRole('button', { name: 'Comprar' }).click();
  }

  async cancelOrder() {
    await this.page.getByRole('button', { name: 'Ver seguimiento de mi pedido' }).click();
    await this.page.locator('div').filter({ hasText: 'Ayuda' }).nth(2).click();
    await this.page.getByRole('menuitem', { name: 'Cancelar pedido' }).click();
    await this.page.getByRole('radio', { name: 'No podre pasar a Pickup a' }).click(); 
    const btnCancelar = this.page.getByRole('button', { name: 'Cancelar pedido' });
    await btnCancelar.click();
    if (await btnCancelar.isVisible()) {
        await btnCancelar.click();
    } 
  }
  async verifyOrderCanceled() {
    const confirmationMessage = this.page.getByText('Pedido cancelado');
    await expect(confirmationMessage).toBeVisible({ timeout: 10000 });
    await this.page.getByRole('button', { name: 'Regresar a home' }).click();
    console.log('✅ Confirmado: El pedido se canceló y volvimos a Home.');
} 

   async continue() {
    await this.page.getByRole('button', { name: 'Continuar' }).click();
  }
}