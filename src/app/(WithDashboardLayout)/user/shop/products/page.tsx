import ManageProducts from "@/components/modules/auth/shop/product";
import { getAllProducts } from "@/services/Product";

const ManageProductsPage =async () => {
  const { data, } = await getAllProducts();
  console.log(data);
  
    return (
        <div>
          <ManageProducts products={data}></ManageProducts>
        </div>
    );
};

export default ManageProductsPage;