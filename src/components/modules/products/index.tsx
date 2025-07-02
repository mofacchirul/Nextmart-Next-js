import ProductCard from "@/components/ui/core/ProductCard";
import { IProduct } from "@/types";
import FilterSidebar from "./filtersidebar";

const AllProducts = ({products}:{products:IProduct[]}) => {
    return (
        <div className='flex gap-8 my-10 container mx-auto'>
            <div>
                <FilterSidebar></FilterSidebar>
            </div>
            <div>
             <div className='grid my-4 grid-cols-2 lg:grid-cols-4 gap-5 items-center '>
                    {
                        products?.map((product:IProduct,idx:number)=>(<ProductCard key={idx} product={product}></ProductCard>))
                    }

                </div>
            </div>
        </div>
    );
};

export default AllProducts;