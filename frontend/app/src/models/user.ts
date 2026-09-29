export interface UserBase {
  email: string;
}

export interface User extends UserBase {
  id: string;
  first_name: string;
  last_name: string;
}

export interface UserLogin extends UserBase {
  password: string;
}

export interface UserRegister extends UserBase {
  first_name: string;
  last_name: string;
  password: string;
}
