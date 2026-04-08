// fixtures/pomFixtures.ts
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DeliveryPage } from '../pages/DeliveryPage';
import { SearchPage } from '../pages/SearchPage';
import { ProductPage } from '../pages/ProductPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PromotionPage } from '../pages/PromotionPage';
import { ProductsApi } from '../src/api/ProductsApi';
type MyFixtures = {
  loginPage: LoginPage;
  deliveryPage: DeliveryPage;
  searchPage: SearchPage;
  productPage: ProductPage;
  checkoutPage: CheckoutPage;
  promotionPage: PromotionPage;
  productsApi: ProductsApi;
 
};
export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  deliveryPage: async ({ page }, use) => {
    await use(new DeliveryPage(page));
  },
  searchPage: async ({ page }, use) => {
    await use(new SearchPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  promotionPage: async ({ page }, use) => {
    await use(new PromotionPage(page));
  },
  productsApi: async ({ request }, use) => {
    // Instanciamos la clase pasando el 'request' de Playwright
    const productsApi = new ProductsApi(request);
    await use(productsApi);
  },
});

export { expect } from '@playwright/test';