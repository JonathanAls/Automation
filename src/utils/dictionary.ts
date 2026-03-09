export const Dictionary = {
  // Localizadores agrupados por página
  selectors: {
    search: {
      input: 'input[placeholder="Buscar en Alsuper"]',
      productCard: 'app-product-card',
      productLink: 'role=link'
    },
    delivery: {
      optionPickup: 'div.as-delivery-option:has-text("Recoger en Tienda")',
      inputCP: 'role=textbox[name="Ingresa un código postal"]',
      btnVerTiendas: 'role=button[name="Ver tiendas"]',
      storeCard: '.as-store-card', // Selector del contenedor de cada tienda
      btnSeleccionarTienda: 'role=button[name="Seleccionar tienda"]',
      btnContinuar: 'role=button[name="Continuar"]',
      campusStore: 'div.as-store-tile:has-text("Alsuper Plus Campus")',
    },
    checkout: {
      iconCart: '[data-testid="iconCart"]',
      btnContinuar: 'role=button[name="Continuar"]',
      btnContinuarCompra: 'role=button[name="Continuar compra"]',
      tabSlot: 'mat-tab-header, .tablist, [role="tab"]',
      btnSeleccionarSlot: 'button:has-text("seleccionar")', // Quitamos el role para que sea más flexible con el :enabled      pagoTarjeta: 'text="Tarjeta de crédito/débito"',
      btnComprar: 'role=button[name="Comprar"]',
      btnSeguimiento: 'role=button[name="Ver seguimiento de mi pedido"]',
      btnAyuda: 'role=button[name="Ayuda"]', // Cambiamos el div genérico por el rol
      menuCancelar: 'role=menuitem[name="Cancelar pedido"]',
      radioMotivo: 'role=radio[name="No podre pasar a Pickup a"]',
      btnConfirmarCancelacion: 'role=button[name="Cancelar pedido"]',
      txtOrdenCancelada: 'text="Pedido cancelado"',
      btnRegresarHome: 'role=button[name="Regresar a home"]'
    },
    login: {
      email: 'role=textbox[name="Correo electrónico"]',
      password: 'role=textbox[name="Contraseña"]',
      submit: 'role=button[name="Ingresar"]'
    }
  },
  
  // Datos de prueba iniciales al azar
  data: {
    storeName:['Alsuper Plus Campus'],
    searchTerms: ['Detergente', 'Leche', 'Pan', 'Huevo','Cereal'],
    config: {
      maxProductsPerTest: 3,
      minQty: 1,
      maxQty: 3
    },
    locations: {
      chihuahua: '31125',
      cuauhtemoc: '31500',
      delicias: '33000'
    }
  }
    
}as const;