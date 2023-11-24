interface Menu {
    category_name: string;
    dishes: Dishes[];
  }

  interface Dishes {
    dish_id: number;
    dish_name: string;
    dish_price: string;
    description: string;
  }

export type {Menu, Dishes}
