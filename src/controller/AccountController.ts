import { Request, Response } from "express"
import * as AccountServices from "../services/AccountServices"



export const registerController = async (req: Request, res: Response) =>{
    try{
        const account = await AccountServices.register(req.body)
        if(account) return res.status(200).json({message: "register succesfull"})
    }catch(error: any){
        res.status(401).json({message: "fail to register", error})
    }
}

export const loginController = async (req: Request, res: Response) => {
  try {
    const { account, accessToken, refreshToken } = await AccountServices.login(req.body);

    // Set refresh token as HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,             // true for production (HTTPS)
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // Return access token and account info in response
    res.status(200).json({
      message: "Login successful",
      account,
      accessToken
    });

  } catch (error: any) {
    res.status(401).json({ message: "Fail to login", error: error.message });
  }
};
