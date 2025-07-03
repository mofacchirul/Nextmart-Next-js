import ManageProducts from "@/components/modules/auth/shop/product";
import { getAllProducts } from "@/services/Product";
const ManageProductsPage =async ({searchParams}:{ searchParams:Promise<{page:string}>}) => {
    const {page}= await searchParams
  const { data,meta } = await getAllProducts(page,"1");

 
    return (
        <div>
          <ManageProducts products={data} meta={meta} ></ManageProducts>
        </div>
    );
};

export default ManageProductsPage;