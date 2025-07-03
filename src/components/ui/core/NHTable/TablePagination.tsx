import React, { useState } from 'react';
import { Button } from '../../button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';


const TablePagination = ({totalpage}:{totalpage:number}) => {
const router= useRouter()
const pathname= usePathname()
    const [currentpage,setcurrentpage]= useState(1)
   
    const handleprev = ()=>{
        if(currentpage > 1){
            setcurrentpage( currentpage - 1)
            router.push(`${pathname}?page=${currentpage - 1}`)
        }
    }
    const handleNext = ()=>{
        if(currentpage < totalpage){
            setcurrentpage( currentpage + 1)
            router.push(`${pathname}?page=${currentpage + 1}`)
        }
    }
    return (
        <div className='flex items-center justify-center gap-5 my-10'>
            <Button onClick={handleprev} disabled={currentpage ===1 }  size="sm" variant="outline" className='flex justify-center items-center w-8 h-8 rounded-full'>
                 <ArrowLeft></ArrowLeft>
            </Button>
          
                {
                    [...Array(totalpage)].map((_,idx)=>(
                        <Button onClick={()=>{setcurrentpage(idx+1)
                            router.push(`${pathname}?page=${idx + 1}`)
                        }} key={idx}size="sm" variant={currentpage === idx +1 ? "default" : "outline"} className='flex justify-center items-center w-8 h-8 rounded-full' >
                            {idx + 1}
                        </Button>
                    ))
                }
               
           
           
            <Button onClick={handleNext} disabled={currentpage === totalpage}   size="sm" variant="outline" className='flex justify-center items-center w-8 h-8 rounded-full'>
              <ArrowRight></ArrowRight>
            </Button>
        </div>
    );
};

export default TablePagination;