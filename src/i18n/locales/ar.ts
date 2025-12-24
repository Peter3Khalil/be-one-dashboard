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
  Global: {
    next: 'التالي',
    previous: 'السابق',
  },
} satisfies TranslationType;
