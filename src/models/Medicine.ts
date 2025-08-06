export interface KindOfMedicine {
  id: number;
  code: string;
  name: string;
}

export interface UnitDetail {
  id: number;
  unitId: number;
  unitName: string;
  conversionUnit: number;
}

export interface Medicine {
  id: number;
  code: string;
  name: string;
  price: number;
  quantity: number;
  vat: number;
  note: string;
  maker: string;
  origin: string;
  retailProfit: number;
  activeElement: string;
  images: string[];
  kindOfMedicine: KindOfMedicine;
  unitDetails: UnitDetail[];
}