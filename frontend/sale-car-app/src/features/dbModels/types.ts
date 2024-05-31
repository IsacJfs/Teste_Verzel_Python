export interface Brand {
  nome: string;
  id: number;
}

export interface BrandList {
  Brands: Brand[];
  isLoading: boolean;
  error: string | null;
}

export interface Model {
  nome: string;
  idmarca: number;
  id: number;
}

export interface ModelList {
  Models: Model[];
  isLoading: boolean;
  error: string | null;
}
