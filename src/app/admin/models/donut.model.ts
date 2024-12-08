export interface Donut {
  id: string;
  name: string;
  icon: string;
  promo?: 'new' | 'limited';
  price: number;
  description: string;
}
