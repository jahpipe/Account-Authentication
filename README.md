
# 📄 Account Authentication Service Documentation

This service provides user **registration** and **login** features using **Node.js**, **Express**, **MongoDB (Mongoose)**, and **JWT tokens**. Passwords are hashed using **bcrypt**. Tokens include **access** and **refresh** tokens. 

---

## 📦 Project Structure (Simplified)

```
src/
├── models/
│   └── AccountModel.ts
├── services/
│   └── AccountServices.ts
├── controllers/
│   └── AccountController.ts
├── router/
│   └── AccountRouter.ts
├── config/
│   └── jwt.ts
├── dbconfig/
│   └── dbConfig.ts
├── type/
│   └── AccountType.ts
└── server.ts
```

---

## 🔐 Authentication Flow

### 1. **Registration**
- **Path**: `POST /api/register`
- **Service**: `register(data)`
- **Validates** if the username already exists.
- If not, saves the new account with hashed password.

### 2. **Login**
- **Path**: `POST /api/login`
- **Service**: `login(data)`
- Verifies user existence and checks password.
- Returns:
  - `accessToken` (15 mins)
  - `refreshToken` (7 days, stored as HTTP-only cookie)

---

## 🧠 Core Files

### 📁 `AccountModel.ts`
- Mongoose schema for accounts
- Uses `bcrypt` to hash passwords on save
- Includes an instance method `passwordChecker()`

```ts
AccountSchema.pre("save", async function () {...});
AccountSchema.methods.passwordChecker = async function (password) {...};
```

### 📁 `AccountType.ts`
TypeScript interface used with Mongoose for typing account documents.

```ts
export interface AccountType extends Document {
  username: string;
  password: string;
  role: "admin" | "users";
  email: string;
  passwordChecker(passwordValidator: string): Promise<boolean>;
}
```

### 📁 `AccountServices.ts`
Provides `register()` and `login()` logic:

#### `register(data)`
- Throws error if username exists.
- Creates new account and saves it.

#### `login(data)`
- Verifies credentials.
- Signs and returns tokens + account info.

---

### 📁 `AccountController.ts`
Handles incoming requests and responses.

#### `registerController`
- Calls service and sends success or error response.

#### `loginController`
- Calls login service
- Sets refresh token as HTTP-only cookie
- Sends accessToken and account data in response

---

### 📁 `jwt.ts`
Utility functions for signing tokens.

```ts
signAccesToken(payload) => 15m token
signRefreshToken(payload) => 7d token
token(payload) => basic signed token
```

---

## 🌐 Environment Setup

### `.env`
```env
PORT=5000
JWT_TOKEN=SuperSecretKey
MONGOSE_CONNECTION=mongodb://localhost:27017/Authentacation
JWT_SECRET=JwtSecretKey
```

### `server.ts`
- Loads environment variables
- Sets up middleware, routes, and starts the server

```ts
app.use("/api", AccountRouter);
```

---

## 🍪 Token Handling
- **AccessToken**: Returned in response body
- **RefreshToken**: Sent as HTTP-only cookie

```ts
res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000
});
```

---

## 🚀 To Do / Improve
- Add refresh token route
- Add logout (clear cookie)
- Add password reset feature
- Add role-based route protection middleware

---

## ✅ Ready Endpoints
| Method | Endpoint       | Description        |
|--------|----------------|--------------------|
| POST   | `/api/register`| Register new user  |
| POST   | `/api/login`   | Login existing user|

---

For contributions or enhancements, extend `AccountServices.ts` and create middleware for token validation.
