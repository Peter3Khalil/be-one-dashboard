export type TranslationType = {
  ProductsPage: {
    products: string;
    addProductButton: string;
    searchPlaceholder: string;
    filterByCategory: string;
    searchForCategoryPlaceholder: string;
    deleteConfirmTitle: string;
    deleteConfirmDescription: string;
    table: {
      header: {
        name: string;
        price: string;
        category: string;
        status: string;
      };
    };
  };
  ProductDetailsPage: {
    title: string;
    productImages: string;
    inventoryByVariant: string;
    total: string;
    totalStocks: string;
    items: string;
    stock: string;
    itemsInStock: string;
    description: string;
    productNotFound: string;
    productNotFoundDescription: string;
    viewProducts: string;
    categories: string;
  };
  OrdersPage: {
    orders: string;
    filterByStatus: string;
    selectStatus: string;
    items: string;
    status: {
      pending: string;
      delivered: string;
      cancelled: string;
      refunded: string;
      all: string;
    };
    table: {
      header: {
        orderId: string;
        customerName: string;
        totalAmount: string;
        items: string;
        status: string;
      };
    };
  };
  OrderDetailsPage: {
    title: string;
    orderNumber: string;
    items: string;
    customerInformation: string;
    shippingAddress: string;
    orderItems: string;
    size: string;
    color: string;
    total: string;
    updateStatus: string;
    orderNotFound: string;
    orderNotFoundDescription: string;
    viewOrders: string;
  };
  CreateProductPage: {
    title: string;
    saveProductButton: string;
    productDetails: {
      sectionTitle: string;
      productName: string;
      price: string;
      description: string;
      category: string;
    };
    colorVariants: {
      sectionTitle: string;
      sectionDescription: string;
      emptyVariants: {
        title: string;
        description: string;
        addFirstVariant: string;
      };
      colorVariant: string;
      colorPlaceholder: string;
      availableSizes: string;
      stockPerSize: string;
      noSizesSelected: string;
      addVariant: string;
    };
    selectCategory: string;
  };
  EditProductPage: {
    title: string;
  };
  LoginPage: {
    title: string;
    login: string;
    email: string;
    password: string;
  };
  Global: {
    loading: string;
    next: string;
    previous: string;
    active: string;
    inactive: string;
    view: string;
    edit: string;
    delete: string;
    dragDrop: string;
    fileExtension: string;
    browseFiles: string;
    saving: string;
    cancel: string;
    actions: string;
    noItemsFound: string;
    logout: string;
    noResultsFound: string;
  };
  Sidebar: {
    dashboard: string;
    products: string;
    orders: string;
    customers: string;
  };
};
