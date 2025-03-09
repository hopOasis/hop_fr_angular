export interface FetchedError {
  timestamp: string;
  path: string;
  errors: {
    lastName?: string;
    firstName?: string;
    password?: string;
    email?: string;
  };
}
