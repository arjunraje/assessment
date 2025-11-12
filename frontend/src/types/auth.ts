
export interface LoginFormData {
  phone_number: string;
  password: string;
}


export interface User{
    user_id: string,
    phone_number: string,
    name: string,
    role: string
}

export interface AuthResponse{
    success: boolean,
    message: string,
    data: {
    user: User
    accessToken:string
    }
}
