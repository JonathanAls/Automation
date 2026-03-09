import { Page, expect } from '@playwright/test';

export class PromotionPage {
  constructor(private page: Page) {}
  async skipPromotion(){
    const promotionPage = this.page.getByText('Promociones');
     await expect(promotionPage).toBeVisible({ timeout: 10000 });
     await this.page.getByRole('button', { name: 'Continuar' }).click();
  }
  }
