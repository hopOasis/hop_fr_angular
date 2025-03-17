export interface Token {
  access_token: string;
}
export interface TokenStore extends Token {
  isAuth: boolean;
}
export interface ParsedToken {
  exp: number;
}
