import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { ApiError } from "../utils/apiError";
import { createUser, findUserByPhone } from "../services/auth.service";
import { UserRole } from "../entities/User.entity";
import { instanceToPlain } from "class-transformer";
import { generateAccessToken } from "../utils/token";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {phone_number, password, name, role} = req.body;

        const user = await findUserByPhone(phone_number);
        if(user){
            throw new ApiError("Phone number already registered", 409)
        }
        
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await createUser({
            phone_number,
            password: hashedPassword,
            name,
            role: role || UserRole.USER
        })

        res.status(201).json({
            success: true,
            message: "User registration successful",
            data: instanceToPlain(newUser)
        })
   
    } catch (error) {
        next(error)
    }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {phone_number, password} = req.body
        const userFound = await findUserByPhone(phone_number);
        if(!userFound){
            throw new ApiError("user not found", 404);
        }

        const match = await bcrypt.compare(password, userFound.password);

        if(!match){
            throw new ApiError("Invalid credentials");
        }

        const accessToken = await generateAccessToken({
            user_id: userFound.user_id,
            name: userFound.name,
            role: userFound.role,
            phone_number: userFound.phone_number
        })

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: {
                user: instanceToPlain(userFound),
                accessToken
            }
        })
       
    } catch (error) {
        next(error)
    }
}