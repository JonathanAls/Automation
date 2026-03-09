// pages/SearchPage.ts
import { Page } from '@playwright/test';
import { Dictionary } from '../src/utils/dictionary';
import { ProductPage } from './ProductPage'; // Importamos para el tipado

export class SearchPage {
  constructor(private page: Page) {}

  async searchProduct(terminoAzar: string) {
    const searchInput = this.page.locator(Dictionary.selectors.search.input);
    await searchInput.fill(terminoAzar);
    await this.page.keyboard.press('Enter');
    
    // Esperamos a que aparezcan resultados antes de seguir
    await this.page.locator(Dictionary.selectors.search.productCard).first().waitFor({ timeout: 5000 });
  }

  async openRandomProduct() {
    const cards = this.page.locator(Dictionary.selectors.search.productCard);
    const count = await cards.count();
    const randomIndex = Math.floor(Math.random() * count);
    
    await cards.nth(randomIndex)
               .locator(Dictionary.selectors.search.productLink)
               .first()
               .click();
  }

  async addRandomProducts(maxItems: number, productPage: ProductPage) {
    const { searchTerms, config } = Dictionary.data;
    
    for (let i = 0; i < maxItems; i++) {
      const termino = searchTerms[Math.floor(Math.random() * searchTerms.length)];
      const cantidad = Math.floor(Math.random() * config.maxQty) + config.minQty;

      await this.searchProduct(termino);
      await this.openRandomProduct();

      // Validamos stock antes de intentar agregar
      const isAvailable = await this.page.getByRole('button', { name: 'Agregar al carrito' }).isEnabled();
      
      if (!isAvailable) {
        console.warn(`⚠️ "${termino}" sin stock, buscando otro...`);
        i--; // Reintentamos el turno
        await this.page.goto('/'); 
        continue;
      }

      await productPage.setQuantity(cantidad);
      await productPage.addToCart();
      console.log(`   ✅ Agregado al flujo: (${cantidad}) ${termino}`);
      
      // Regresamos al inicio para la siguiente búsqueda si no es el último
      if (i < maxItems - 1) await this.page.goto('/');
    }
  }
}