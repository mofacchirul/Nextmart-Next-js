export interface IUser {
    userid: string;
    name: string;
    email: string;
   hasShop:boolean;
   isActive: boolean;
    role: "user" | "admin";
    iat?:number;
    exp?:number;
    
}