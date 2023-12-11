interface Menu {
    category_name: string;
    dishes: Dishes[];
  }

  interface Dishes {
    dish_id: number;
    dish_name: string;
    dish_price: string;
    offer_price?: string;
    description: string;
    dish_photo?: string;
  }

export type {Menu, Dishes}
