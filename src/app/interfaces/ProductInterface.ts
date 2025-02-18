import { ResponseInterface } from './ResponeInterface';

export interface ProductResponse extends ResponseInterface<Product[]> {}

export interface Product {
  drinkName: string;
  drinkPrice: number;
  drinkImageUrl: string;
  specialDrinkPrice: string;
  storeName: string;
}
