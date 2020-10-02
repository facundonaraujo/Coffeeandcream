export type Role = 'NORMALUSER' | 'ADMIN';

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  /* emailVerified?: boolean; */
  password?: string;
  role?: Role;
}
