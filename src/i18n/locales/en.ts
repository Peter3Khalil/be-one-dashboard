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
  ProductDetailsPage: {
    title: 'Product Details',
    productImages: 'Product Images',
    inventoryByVariant: 'Inventory by Variant',
    total: 'Total',
    totalStocks: 'Total Stocks',
    items: 'Items',
    stock: 'Stock',
    itemsInStock: 'Items in Stock',
    description: 'Description',
  },
  LoginPage: {
    title: 'Admin Dashboard',
    login: 'Login',
    email: 'Email',
    password: 'Password',
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
