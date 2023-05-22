import { request } from "../../services/request";
import { IRequestError, IRequestLogin, IUser } from "./types";

export function setUserLocalStorage(user: IUser | null) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function getUserLocalStorage(): IUser | null {
  const json = localStorage.getItem('user');

  if(!json) {
    return null;
  }

  const user = JSON.parse(json);

  return user ?? null;
}

const LoginRequest = async (email: string, password: string): Promise<IRequestError | IRequestLogin> => {
  const result = await request({ method: "post", url: 'auth/sign', data: { email, password } });
  
  if ('message' in result) {
    return result as IRequestError;
  }

  return result as IRequestLogin;
}

export { LoginRequest };