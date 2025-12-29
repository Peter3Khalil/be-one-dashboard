import type { TranslationType } from '../translation.type';

export default {
  ProductsPage: {
    products: 'Products',
    addProductButton: 'Add Product',
    searchPlaceholder: 'Search for a product...',
    filterByCategory: 'Filter by Category',
    searchForCategoryPlaceholder: 'Search for a category...',
    deleteConfirmTitle: 'Are you sure?',
    deleteConfirmDescription:
      'This action cannot be undone. This will permanently delete the product and remove all associated data.',
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
    productNotFound: 'Product Not Found',
    productNotFoundDescription:
      'Sorry, we could not find the product you are looking for.',
    viewProducts: 'View Products',
    categories: 'Categories',
  },
  LoginPage: {
    title: 'Admin Dashboard',
    login: 'Login',
    email: 'Email',
    password: 'Password',
  },
  CreateProductPage: {
    title: 'Create Product',
    saveProductButton: 'Save Product',
    productDetails: {
      sectionTitle: 'Product Details',
      productName: 'Product Name',
      price: 'Price',
      description: 'Description',
      category: 'Category',
    },
    colorVariants: {
      sectionTitle: 'Color Variants',
      sectionDescription: 'Add different color variants for your product.',
      emptyVariants: {
        title: 'No Color Variants',
        description:
          'You have not added any color variants for this product yet.',
        addFirstVariant: 'Add First Color Variant',
      },
      colorVariant: 'Color Variant',
      colorPlaceholder: 'Enter color name (e.g., Red, Navy Blue)',
      availableSizes: 'Available Sizes',
      stockPerSize: 'Stock per Size',
      noSizesSelected: 'Click on sizes above to add stock entries',
      addVariant: 'Add Color Variant',
    },
    selectCategory: 'Select Category',
  },
  Global: {
    loading: 'Loading...',
    next: 'Next',
    previous: 'Previous',
    active: 'Active',
    inactive: 'Inactive',
    view: 'View',
    edit: 'Edit',
    delete: 'Delete',
    browseFiles: 'Browse files',
    dragDrop: 'Drag and drop files here to upload',
    fileExtension: 'JPEG, PNG, up to 2MB',
    saving: 'Saving...',
    cancel: 'Cancel',
  },
  Sidebar: {
    dashboard: 'Dashboard',
    products: 'Products',
    orders: 'Orders',
    customers: 'Customers',
  },
} satisfies TranslationType;
