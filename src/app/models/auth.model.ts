export interface Login {
  email: string;
  password: string;
}
export interface Registration extends Login {
  firstName: string;
  lastName: string;
}

export interface Token {
  access_token: string;
}
