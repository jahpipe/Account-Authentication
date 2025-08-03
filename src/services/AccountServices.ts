import AccountModel from "../models/AccountModel";
import { AccountType } from "../type/AccountType";
import Jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fall back";

export const register = async (data: {
  username: string,
  password: string,
  role: 'admin' | 'users',
  email: string
}): Promise<AccountType> => {
  const exsit = await AccountModel.findOne({ username: data.username });
  if (exsit) {
    throw new Error("Account already exists!");
  }

  const newAccount = new AccountModel(data);
  await newAccount.save();
  return newAccount;
};

export const login = async (data: {
  username: string,
  password: string,
  email: string
}): Promise<{ account: AccountType, accessToken: string, refreshToken: string }> => {
  const account = await AccountModel.findOne({ username: data.username });
  if (!account) {
    throw new Error("Username is incorrect!");
  }

  const passwordIsValid = await account.passwordChecker(data.password);
  if (!passwordIsValid) {
    throw new Error("Password is incorrect! Please try again.");
  }

  const accessToken = Jwt.sign(
    { id: account._id, role: account.role },
    JWT_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = Jwt.sign(
    { id: account._id, role: account.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { account, accessToken, refreshToken };
};
