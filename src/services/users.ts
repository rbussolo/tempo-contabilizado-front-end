
export interface FiltersUsers {
  page?: number;
  name?: string;
  email?: string;
  type?: string;
}

export interface UserType {
  client: string;
  seller: string;
  adm: string;
}

export const userTypeEnum: UserType = {
  client: "Cliente",
  seller: "Vendedor",
  adm: "Administrador"
}

export interface User {
  id?: number;
  name: string;
  email: string;
  type?: keyof UserType;
  password?: string;
}

export interface ListUsers {
  users?: User[];
  count: number;
  countPerPage: number;
}

export const EmptyUser: User = {
  name: "",
  email: "",
}
