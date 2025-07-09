"use client";

import Logo from "@/app/assets/Logo";
import { Button } from "@/components/ui/button";
import NMImage from "@/components/ui/core/NMImage";
import IMagePreviewer from "@/components/ui/core/NMImage/IMagePreviewer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getAllbrands } from "@/services/Brand";
import { getAllcategory } from "@/services/category";
import {  updateProduct } from "@/services/Product";
import { IBrand, Icategory, IProduct } from "@/types";
// import { Value } from "@radix-ui/react-select";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";

const UpdateProductForm = ({product}:{product:IProduct}) => {
  const form = useForm({
    defaultValues: {
      name:product?.name || "",
      description: product?.description || "",
      price:product?.price || "",
      category:product?.category?.name || "",
      brand: product?.brand?.name || "",
      stock:product?.stock || "",
      weight:product?.weight || "",
      availableColors: product?.availableColors?.map((color) => ({
        value: color,
      })) ||  [{ value: "" }],
      keyFeatures:  product?.keyFeatures?.map((feature) => ({
        value: feature,
      })) || [{ value: "" }],


      specification:  Object.entries(product?.specification || {}).map(
        ([key, value]) => ({ key, value })
      ) || [{key:"",value:""}],
    },
  });
   const {
    formState: { isSubmitting },
  } = form;

  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] =useState<string[] | []>(
    product?.imageUrls || []
  );
  const [categoris,setcategoris]=useState<Icategory[]|[]>([])
  const [brands,setbrands]=useState<IBrand[]|[]>([])
  const router = useRouter()    
  //  coler availablecolors
  const { append: appendcolor, fields: fieldscolor } = useFieldArray({
    control: form.control,
    name: "availableColors",
  });
  const addcolor = () => {
    appendcolor({ value : "" });
  };
               // KeyFeatures
 const {append:appendkeyFeatures,fields:fieldsFeatures}=useFieldArray({
  control:form.control,
  name:"keyFeatures"
 })



const addfeatures=()=>{
  appendkeyFeatures({
    value:""
  })
}


// specification
 
const {append:appendspec,fields:fieldsspec}=useFieldArray({
  control:form.control,
  name:"specification"
})
const addspec=()=>{
  appendspec({key:"",value:""})
}

useEffect(()=>{
  const fetchData=async()=>{
    const [categoriceData,brandData]=await Promise.all(
      [

        getAllcategory(),
 getAllbrands(),
      ]
    )
    setcategoris(categoriceData?.data)
    setbrands(brandData?.data)

  }
  fetchData()
},[])



  const onSubmit: SubmitHandler<FieldValues> =async (data) => {

    const availableColors= data?.availableColors.map((availableColor:{value:string})=>availableColor.value)
    const keyFeatures= data?.keyFeatures.map((keyFeature:{value:string})=>keyFeature.value)

  const specification:{[key:string]:string}={}
   data?.specification.forEach((item:{key:string,value:string}) => (
  specification[item.key]=item.value
));
const modifidata= {
  ...data,
  availableColors,
  keyFeatures,
  specification,
      price: parseFloat(data.price),
      stock: parseInt(data.stock),
      weight: parseFloat(data.stock),
}


 const formData = new FormData();
    formData.append("data",JSON.stringify(modifidata));

    for (const file of imageFiles) {
      formData.append("images", file);
    }



try{
const res = await updateProduct(formData,product?._id)
if(res?.success){
  toast.success(res.message)
  router.push("/user/shop/products")
}
else{
    toast.error(res.message)
    console.error(res?.message)
}

}
catch(err){
  console.error(err)
}
  };
  
  
  
  
  
  
  
  
  
  
  
  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-2xl p-5 ">
      <div className="flex items-center space-x-4 mb-5 ">
        <Logo />
        <h1 className="text-xl font-bold">Add Product</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center border-t border-b py-3 my-5">
            <p className="text-primary font-bold text-xl">Basic Information</p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Product Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                       {categoris.map((category) => (
                        <SelectItem key={category?._id} value={category?._id}>
                          {category?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Product Brand" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand?._id} value={brand?._id}>
                          {brand?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="my-5">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-36 resize-none"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-primary font-bold text-xl">Images</p>
            </div>
            <div className="flex gap-4 ">
              <NMImage
                setImageFile={setImageFiles}
                setImagepreview={setImagePreview}
                label="Upload Image"
                className="w-fit mt-0"
              />
              <IMagePreviewer
                className="flex flex-wrap gap-4"
                setImageFile={setImageFiles}
                imagepreview={imagePreview}
                setImagepreview={setImagePreview}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mt-5">
              <p className="text-primary font-bold text-xl">Available Colors</p>
              <Button
                variant="outline"
                className="size-10"
                onClick={addcolor}
                type="button"
              >
                <Plus className="text-primary"></Plus>
              </Button>
            </div>

            <div>
              {fieldscolor.map((fielcolor, index) => (
                <div key={fielcolor.id} className="mt-2">
                  <FormField
                    control={form.control}
                    name={`availableColors.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Color {index + 1}</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </div>



         <div>
          <div className="flex justify-between items-center mt-5">
            <p className="text-primary font-bold text-xl">Key Features</p>
            <Button onClick={addfeatures} type="button" variant="outline" className="size-10" >
              <Plus className="text-primary"></Plus>
            </Button>
          </div>
          <div>
            {
              fieldsFeatures.map((fieldeFeatur,index)=>(
                <div key={fieldeFeatur.id}>
                     <FormField
              control={form.control}
              name={`keyFeatures.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key Features {index +1 }</FormLabel>
                  <FormControl>
                 
                    <Input {...field} value={field.value || ""} />
                  
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
                </div>
              ))
            }
          </div>
          

         </div>



<div>
  <div className="flex justify-between items-center pb-2">
    <p className="font-bold text-xl mt-5 text-primary">Specification</p>
    <Button onClick={addspec} variant="outline" className="size-10" type="button">
      <Plus className="text-primary"></Plus>
    </Button>
  </div>
<div>
  {
    fieldsspec.map((spec,index)=>(
        <div key={spec.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 py-1">
    
             <FormField
              control={form.control}
              name={`specification.${index}.key`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Specification Name {index+1} </FormLabel>
                  <FormControl>
                 
                    <Input {...field} value={field.value || ""} />
                  
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
             name={`specification.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Specification Discription {index+1}</FormLabel>
                  <FormControl>
                 
                    <Input {...field} value={field.value || ""} />
                  
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
  </div>
    ))
  }
</div>
</div>





          <Button type="submit" className="mt-5 w-full" disabled={isSubmitting}>
            {isSubmitting ? "Adding Product....." : "Add Product"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateProductForm;
