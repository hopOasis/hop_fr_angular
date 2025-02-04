import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public BASE_URL = signal('https://hopoasis.onrender.com');
}
