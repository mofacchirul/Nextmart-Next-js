"use client";

import { Button } from "@/components/ui/button";
import NMImage from "@/components/ui/core/NMImage";
import IMagePreviewer from "@/components/ui/core/NMImage/IMagePreviewer";
import {
  Dialog,
  DialogContent,

  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createbrand } from "@/services/Brand";
// import { createCategoy } from "@/services/category";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";


const CreateBrand = () => {
    const [imageFile,setImageFile]= useState<File[]|[]>([])
      const [imagepreview,setImagepreview]= useState<string[]|[]>([])

      const form = useForm();
  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit :SubmitHandler<FieldValues> = async (data) => {
  const form=new FormData()
  form.append("data",JSON.stringify(data))

 form.append("logo",imageFile[0])

    const res = await createbrand(form);
    console.log(res);
    
    if(res?.success){
         
      toast.success(res.message)
    
    
     
    }
    else {
        toast.error(res.message);
      }


  }







    return (
        <div>
            <Dialog>
     <DialogTrigger asChild>
        <Button>Create Brand</Button>
      </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
         <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="name" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        
            <div className=" flex mt-5 justify-between items-center">
            <div className="">
              <FormField
                control={form.control}
                name="discription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discription</FormLabel>
                    <FormControl>
                      <Textarea

                        className="h-36 w-[340px] lg:w-72 "
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {
              imagepreview.length> 0 ?
              (            <IMagePreviewer className="mt-8" setImageFile={setImageFile} imagepreview={imagepreview} setImagepreview={setImagepreview}  ></IMagePreviewer>)
              :
              (
                <div className="mt-8">
                  
            <NMImage setImagepreview={setImagepreview} label="Upload Image" setImageFile={setImageFile}></NMImage>
                </div>
              )
            }




          </div>


          <Button

            type="submit"
            className="mt-5 w-full"
          >
            {isSubmitting ? "creating...." : "create"}
          </Button>
        </form>
      </Form>
    </DialogHeader>
  </DialogContent>
</Dialog>
        </div>
    );
};

export default CreateBrand;