import type { TranslationType } from '../translation.type';

export default {
  ProductsPage: {
    products: 'المنتجات',
    addProductButton: 'إضافة منتج',
    searchPlaceholder: 'ابحث عن منتج...',
    filterByCategory: 'تصفية حسب الفئة',
    searchForCategoryPlaceholder: 'ابحث عن فئة...',
    table: {
      header: {
        name: 'الاسم',
        price: 'السعر',
        category: 'الفئة',
        status: 'الحالة',
      },
    },
  },
  ProductDetailsPage: {
    title: 'تفاصيل المنتج',
    productImages: 'صور المنتج',
    inventoryByVariant: 'المخزون حسب النوع',
    total: 'الإجمالي',
    totalStocks: 'إجمالي المخزون',
    items: 'العناصر',
    stock: 'المخزون',
    itemsInStock: 'العناصر في المخزون',
    description: 'الوصف',
  },
  Global: {
    next: 'التالي',
    previous: 'السابق',
    active: 'نشط',
    inactive: 'غير نشط',
    view: 'عرض',
    edit: 'تعديل',
    delete: 'حذف',
  },
  Sidebar: {
    dashboard: 'اللوحة الرئيسية',
    products: 'المنتجات',
    orders: 'الطلبات',
    customers: 'العملاء',
  },
} satisfies TranslationType;
