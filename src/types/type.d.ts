import { Session } from "next-auth";

export interface Product {
  name: string;
  images: string;
  slug?: string;
  categories: string;
  price: number;
  countInStock?: number;
  description?: string;
}

export interface I_Products extends Product {
  addCartHandler?: React.MouseEventHandler<HTMLButtonElement>;
  buyProductHandler?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface I_ProductDetail extends I_Products {
  valueCart?: number;
  setTotalCart: React.Dispatch<React.SetStateAction<number>>;
}

export interface cartItems extends Product {
  quantity: number;
}

export interface Cart {
  cart: {
    cartItems: cartItems[];
  };
}