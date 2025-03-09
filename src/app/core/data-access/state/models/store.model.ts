import { Token } from '../../auth/models/token.model';
import { CartResponse } from '../../cart/models/cart-response.model';
import { UserInfo } from '../../user/models/user-info.model';

export interface StoreData {
  token: Token;
  auth: { isAuth: boolean };
  authModal: { isOpened: boolean };
  cart: { cartDetails: CartResponse | null };
  user: { userInfo: UserInfo | null };
  cartModal: { isOpened: boolean };
}
