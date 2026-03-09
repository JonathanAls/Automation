import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Recording...
  await page.goto('https://alsuper.com/');
  await page.locator('.mat-form-field-infix.ng-tns-c128574513-6').click();
  await page.getByRole('textbox', { name: 'Correo electrónico' }).fill('xwdxjona@gmail.com');
  await page.getByRole('textbox', { name: 'Correo electrónico' }).press('Tab');
  await page.getByRole('textbox', { name: 'Contraseña' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('T');
  await page.getByRole('textbox', { name: 'Contraseña' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Testing456!');
  await page.getByRole('textbox', { name: 'Contraseña' }).press('Enter');
  await page.getByRole('button', { name: 'Ingresar' }).click();
  await page.goto('https://alsuper.com/');
  await page.getByRole('img').nth(1).click();
  await page.getByRole('textbox', { name: 'Ingresa un código postal' }).click();
  await page.getByRole('textbox', { name: 'Ingresa un código postal' }).fill('1125');
  await page.locator('div').filter({ hasText: /^Ingresa un código postal \*$/ }).nth(2).dblclick();
  await page.getByRole('textbox', { name: 'Ingresa un código postal' }).click();
  await page.getByRole('textbox', { name: 'Ingresa un código postal' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Ingresa un código postal' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Ingresa un código postal' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Ingresa un código postal' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Ingresa un código postal' }).fill('31125');
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.getByText('Paseo de las Facultades y San').click();
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.getByRole('textbox', { name: 'Buscar en Alsuper' }).click();
  await page.getByRole('textbox', { name: 'Buscar en Alsuper' }).fill('detergente');
  await page.getByRole('textbox', { name: 'Buscar en Alsuper' }).press('Enter');
  await page.locator('app-product-card').filter({ hasText: '$36.90 $41.90 Detergente' }).getByRole('link').click();
});