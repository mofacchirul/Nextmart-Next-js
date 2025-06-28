import { Dispatch, SetStateAction } from "react";
import { Input } from "../../input";

import { cn } from "@/lib/utils";
type NMImageProps={
   label?:string,
   className?:string,
 setImageFile:Dispatch<SetStateAction<[] | File[]>>,
    setImagepreview:Dispatch<SetStateAction<[] | string[]>>
}


const NMImage = ({setImageFile,setImagepreview,label= "Upload Images",className}:NMImageProps) => {
  

    
    const handlechange= (event:React.ChangeEvent<HTMLInputElement>)=>{
        const files= event.target.files![0];

        setImageFile((prev)=>[...prev,files])

        if(files){
            const reader = new FileReader();
            reader.onloadend=()=>{
                setImagepreview((prev)=> [...prev, reader.result as string]);
            }
            reader.readAsDataURL(files);
        }
        event.target.value=""
        
    }
    return (
        <div className={cn("flex flex-col items-center justify-center w-full  gap-4", className)}>
            <Input className="hidden" onChange={handlechange} multiple type="file" id="image-uploder" accept="image/*" />
            <label className="w-full h-36 md:size-36 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-center text-sm text-gray-500 hover:bg-gray-50 transition" htmlFor="image-uploder" >
          {label}
            </label>
           
        </div>
    );
};

export default NMImage;