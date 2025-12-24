export type TranslationType = {
  ProductsPage: {
    products: string;
    addProductButton: string;
    searchPlaceholder: string;
    filterByCategory: string;
    searchForCategoryPlaceholder: string;
    table: {
      header: {
        name: string;
        price: string;
        category: string;
        status: string;
      };
    };
  };
  Global: {
    next: string;
    previous: string;
    active: string;
    inactive: string;
    view: string;
    edit: string;
    delete: string;
  };
  Sidebar: {
    dashboard: string;
    products: string;
    orders: string;
    customers: string;
  };
};
