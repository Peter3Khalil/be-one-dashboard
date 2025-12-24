import type { TranslationType } from '../translation.type';

export default {
  ProductsPage: {
    products: 'Products',
    addProductButton: 'Add Product',
    searchPlaceholder: 'Search for a product...',
    filterByCategory: 'Filter by Category',
    searchForCategoryPlaceholder: 'Search for a category...',
    table: {
      header: {
        name: 'Name',
        price: 'Price',
        category: 'Category',
        status: 'Status',
      },
    },
  },
  Global: {
    next: 'Next',
    previous: 'Previous',
    active: 'Active',
    inactive: 'Inactive',
    view: 'View',
    edit: 'Edit',
    delete: 'Delete',
  },
  Sidebar: {
    dashboard: 'Dashboard',
    products: 'Products',
    orders: 'Orders',
    customers: 'Customers',
  },
} satisfies TranslationType;
