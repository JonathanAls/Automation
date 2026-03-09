import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
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
  await page.getByText('Con compra mínima').click();
  await page.getByText('Sin compra mínima').click();
  await page.getByRole('textbox', { name: 'Ingresa un código postal' }).click();
  await page.getByRole('textbox', { name: 'Ingresa un código postal' }).fill('31125');
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.getByText('Alsuper Plus Campus').click();
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.getByText('1 $').click();
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.locator('#mat-dialog-2 svg').click();
  await page.getByRole('tab', { name: 'Viernes Febrero' }).click();
  await page.locator('div:nth-child(28) > .mat-focus-indicator').click();
});