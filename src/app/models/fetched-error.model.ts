export interface FetchedError {
  timestamp: string;
  path: string;
  errors: {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string;
  };
}
