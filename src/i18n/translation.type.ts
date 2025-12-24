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
  };
};
