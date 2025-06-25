import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthServices"
type Role= keyof typeof  roleBesduserRouter
const roleBesduserRouter={
   user:[/^\/user/,/^\/create-shop/],
   admin:[/^\/admin/]
}
const authRoutes= ["/login","/register"]

export const middleware= async(request:NextRequest)=>{
    const {pathname}= request.nextUrl;
   const userInfo= await getCurrentUser();
   if(!userInfo){
    if(authRoutes.includes(pathname)){
        return NextResponse.next()
    }
    else{
        return NextResponse.redirect(
            new URL (
                `http://localhost:3000/login?redirecPath=${pathname}`,
                request.url
            )
        )
    }
   }

   if(userInfo?.role && roleBesduserRouter[userInfo?.role as Role]){
   
const routes= roleBesduserRouter[userInfo?.role as Role];
if(routes.some((routes)=> pathname.match(routes))){
    return NextResponse.next()
}

   }
 return NextResponse.redirect(new URL('/',request.url) )

}
export const config = {
  matcher: [
    '/login', 
    '/create-shop',
    "/admin",
    "/admin/:page",
    "/user",
    "/user/:page"
],
}