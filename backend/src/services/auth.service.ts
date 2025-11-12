import { AppDataSource } from "../config/data-source"
import { User } from "../entities/User.entity"

const userRepo = AppDataSource.getRepository(User)

export const findUserByPhone = async (phone_number: string) => {
    return await userRepo.findOneBy({phone_number});
}

export const createUser = async (userData: Partial<User>) => {
    const user = userRepo.create(userData);
    userRepo.save(user)
    return user
}