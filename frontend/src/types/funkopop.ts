export interface FunkoPop {
  id: number;
  personagem: string;
  casa: string;
  numeroColecao: number;
  // DECIMAL do Postgres chega como string via Sequelize ("49.90")
  preco: number | string;
  emEstoque: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface FunkoPopInput {
  personagem: string;
  casa: string;
  numeroColecao: number;
  preco: number;
  emEstoque: boolean;
}