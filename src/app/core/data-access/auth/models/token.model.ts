export interface Token {
  access_token: string;
}
// export interface TokenData extends Token {
//   expirationDate: number;
// }
export interface ParsedToken {
  exp: number;
}
