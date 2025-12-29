export type Category = {
  id: number;
  name: string;
};

export type GetCategoriesResponse = {
  data: Array<Category>;
  success: boolean;
};
