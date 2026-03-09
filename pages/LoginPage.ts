import { Page } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://alsuper-dev.alsuperapi.com/');
  }

  async login(email: string, password: string): Promise<string> {
    const loginResponsePromise = this.page.waitForResponse(response => 
      response.url().includes('/auth/login') && response.status() === 201
    );

    await this.page.getByRole('textbox', { name: 'Correo electrónico' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Contraseña' }).fill(password);
    await this.page.getByRole('button', { name: 'Ingresar' }).click();

   const response = await loginResponsePromise;
   const body = await response.json();
   const token = body.data?.[0]?.jwt;

if (!token){
  console.error('Estructura recibida:', JSON.stringify(body));
  throw new Error("No se encontró el campo Token");
  }
  return token;
  }}