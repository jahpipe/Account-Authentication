import { Document } from "mongoose";

export type ROLE = "admin" | "users";


export interface AccountType extends Document {
  username: string;
  password: string;
  role: ROLE;
  email: string;
  passwordChecker(passwordValidator: string): Promise<boolean>;
}
