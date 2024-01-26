export interface UserResponse {
    user: {
        id?: number;
        email: string;
        token: string;
        username: string;
        password: string;
        image?: string;
        bio?: string;
    }
}