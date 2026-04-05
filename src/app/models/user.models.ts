

export interface UserRegister {
    userId: number;
    emailId: string;
    fullName: string;
    password: string;
}

export interface UserLogin {
    emailId: string;
    fullName: string;
}