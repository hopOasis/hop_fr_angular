export interface FetchedError {
  timestamp: string;
  path: string;
  errors: {
    password?: string;
    email?: string;
  };
}
