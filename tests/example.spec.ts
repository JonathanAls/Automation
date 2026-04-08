import { test } from '@playwright/test';
import { LoginPage, DeliveryPage, SearchPage, ProductPage, CheckoutPage, PromotionPage } from '../pages/Index';
import { CartApi } from '../src/api/CartApi';
import { Dictionary } from '../src/utils/dictionary';
import { SlotsApi } from '../src/api/SlotsApi';

test('Flujo de Compra Aleatoria', async ({ page, request }) => {
  const login = new LoginPage(page);
  const delivery = new DeliveryPage(page);
  const search = new SearchPage(page);
  const product = new ProductPage(page);
  const checkout = new CheckoutPage(page);
  const promotion = new PromotionPage(page);
  
  // 1. Login
  const sessionToken = await test.step('Login', async () => {
    await login.goto();
    const token = await login.login(process.env.USER_EMAIL!, process.env.USER_PASS!);
    return token;
  });

  // 2. Selección de modo PickUp
  await test.step('Configurar Entrega', async () => {
    await delivery.pickStoreWithoutPurchase(Dictionary.data.locations.chihuahua);
  });

  // 3. Agregación de productios
  await test.step('Selección de Productos', async () => {
    const qty = Math.floor(Math.random() * Dictionary.data.config.maxProductsPerTest) + 1;
    await search.addRandomProducts(qty, product);
  });

  // 4. Compra
    await test.step('Realizar la compra', async () => {
    await checkout.openCart();
    await promotion.skipPromotion();
    await checkout.selectSlot();
    await checkout.buy();
  });

   // 5. Cancelación
    await test.step('Cancelar la compra realizada', async () =>{
    await checkout.cancelOrder();
    await checkout.verifyOrderCanceled();
    })

  // 6. Limpieza de carrito
    const cartApi = new CartApi(request, sessionToken);
    await cartApi.deleteCart();
});

test('Consulta de disponibilidad de Slots vía API', async ({ page, request }) => {
  const login = new LoginPage(page);
  const delivery = new DeliveryPage(page);

  await login.goto();
  const sessionToken = await login.login(
    process.env.USER_EMAIL!,
    process.env.USER_PASS!
  );

  const slotsApi = new SlotsApi(request, sessionToken);
 await test.step('Configurar Entrega', async () => {
    await delivery.pickStoreWithoutPurchase(Dictionary.data.locations.chihuahua);
  });

  await test.step('Contar slots disponibles', async () => {
    const rawResponse = await slotsApi.getAvailableSlots('TOD');

    // 1. CORRECCIÓN DE RUTA: Según tu log es data.data
    const slotsArray = rawResponse.data?.data;

    if (Array.isArray(slotsArray)) {
      // 2. CORRECCIÓN DE FILTRO: El API devuelve "avaliable slots" (con el typo del servidor)
      const availableSlots = slotsArray.filter(
        (s: any) => s.status === "avaliable slots"
      );

      console.log('\n===========================================');
      console.log(`📅 DÍA: HOY (TOD)`);
      console.log(`📊 TOTAL ENCONTRADOS: ${slotsArray.length}`);
      console.log(`✅ DISPONIBLES REALES: ${availableSlots.length}`);
      console.log('===========================================\n');

      if (availableSlots.length > 0) {
        console.log(`🕐 Próximo horario: ${availableSlots[0].hour.replace('_', ' a ')}`);
      }
    } else {
      console.error('❌ No se pudo encontrar el listado de slots. Estructura inesperada.');
    }
  });
});