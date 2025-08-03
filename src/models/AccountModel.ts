import mongoose, { Schema, Model } from "mongoose";
import { AccountType } from "../type/AccountType";
import bcrypt from "bcrypt";

// Schema definition
const AccountSchema: Schema<AccountType> = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["admin", "users"] },
    email: { type: String, required: true },
  },
  {
    toJSON: {
      transform: (_doc, ret: any) => {
        delete ret.password; // Hide password from API responses
        return ret;
      },
    },
  }
);

// ✅ Pre-save hook to hash password
AccountSchema.pre<AccountType>("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next(); 
});

// ✅ Instance method for password comparison
AccountSchema.methods.passwordChecker = async function (
  passwordValidator: string
): Promise<boolean> {
  return bcrypt.compare(passwordValidator, this.password);
};

// ✅ Create and export mode
export const AccountModel: Model<AccountType> = mongoose.model<AccountType>(
  "Account",
  AccountSchema
);

export default AccountModel;
