import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { Button } from "../../button";
import { X } from "lucide-react";

type NMImageProps={
   imagepreview:string[],
   className?:string,
    setImageFile:Dispatch<SetStateAction<File[]>>,
    setImagepreview:Dispatch<SetStateAction<string[]>>

}

const IMagePreviewer = ({setImageFile,setImagepreview,className,imagepreview}:NMImageProps) => {

const handleRemove=(index:number)=>{
setImageFile((prev)=> prev.filter((_,idx)=> idx !== index) )
setImagepreview((prev)=> prev.filter((_,idx)=> idx !== index) )
}






    return (
        <div className={className}>
            {
                imagepreview.map((preview,index)=>(
                    <div key={index} className="relative w-36 rounded-md overflow-hidden border border-dashed border-gray-300 h- mb-4">
                        <Image src={preview} alt="Upload-logo" width={500} height={500}  /> 
                         
                   <Button onClick={()=>handleRemove(index)} size="sm" type="button" className="bg-red-300 hover:bg-red-400 absolute -top-0 h-6 p-0 rounded-full">
            <X className="w-4 h-4" />
                   </Button>




                                                   </div>
                )
            )
            }
            
        </div>
    );
};

export default IMagePreviewer;