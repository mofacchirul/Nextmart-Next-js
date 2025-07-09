"use client";
// import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";

import Logo from "@/app/assets/Logo";
import { zodResolver } from "@hookform/resolvers/zod";


import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { loginSchema } from "./loginValidation";
import { loginuser, reChatChaTokenVerification } from "@/services/AuthServices";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import { useUser } from "@/context/UserContext";


export default function LoginForm() {
  const [recaptcha,setrecaptcha]=useState(false)
  const form = useForm({
    resolver: zodResolver(loginSchema)
  });
  const {setIsLoading}= useUser()
  const searchform= useSearchParams();
  const redirect=searchform.get("redirecPath")
  const router = useRouter()

  const {
    formState: { isSubmitting },
  } = form;
  



  const onSubmit :SubmitHandler<FieldValues> = async (data) => {
 try{
const res= await loginuser(data)
setIsLoading(true);
if(res?.success){
  form.reset();
  
  toast.success(res?.message)
  if(redirect){
    router.push(redirect)
  }
  else{
    router.push("/")
  }
}
else{
  toast.error(res.message || "Registration failed");
}

 }
 catch(err:any){
console.error("Registration Error:", err);

 }
  
  };


 const handleReCaptcha = async (value: string | null) => {
try{
const res = await reChatChaTokenVerification(value!);
if(res?.success){
setrecaptcha(true)
}
}
catch(err:any){
  console.error(err)
}
  
 }





  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
      <div className="flex items-center space-x-4 ">
        <Logo />
        <div>
          <h1 className="text-xl font-semibold">Login</h1>
          <p className="font-extralight text-sm text-gray-600">
            Join us today and start your journey!
          </p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <div className="py-2">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY!}
              onChange={handleReCaptcha}
              className="mx-auto"
            />
          </div>


          <Button
disabled={recaptcha ? false : true}
            type="submit"
            className="mt-5 w-full"
          >
            {isSubmitting ? "Logging...." : "login"}
          </Button>
        </form>
      </Form>
      <p className="text-sm text-gray-600 text-center my-3">
       Don not have an account ?
        <Link href="/register" className="text-primary">
          Register
        </Link>
      </p>
    </div>
  );
}