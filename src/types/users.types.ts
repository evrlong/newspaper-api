export interface User {
   id: number;
   email: string;
   password_hash: string;
   created_at: Date;
}

export interface UserResponse {
   id: number;
   email: string;
   created_at: Date;
}

export interface CreateUserRequest {
   email: string;
   password: string;
}

export interface LogInUserRequest {
   email: string;
   password: string;
}

