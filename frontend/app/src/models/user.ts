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
